/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        //egret.Profiler.getInstance().run();
        Log.init();
        Game.net = new NetClient();
        Game.config = new Config();
        Game.role = new Role();
        Game.eventMgr = new EventMgr();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onAddToStage = function (event) {
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        egret.Injector.mapClass("egret.gui.ISkinAdapter", egret.gui.DefaultSkinAdapter);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");
        ViewStack.init(this);
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json?r=" + Math.random(), "resource/");
        RES.loadConfig("resource/resource_ui.json?r=" + Math.random(), "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * Loading of configuration file is complete, start to pre-load the preload resource group
     */
    __egretProto__.onConfigComplete = function (event) {
        console.log('comp');
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
        //RES.loadGroup( "uires" );
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    __egretProto__.onResourceLoadComplete = function (event) {
        console.log('load comp ' + event.groupName);
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createScene();
        }
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    __egretProto__.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    __egretProto__.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    __egretProto__.loadConfig = function (name, cb) {
        Game.config.load('./src/share/config/' + name + '.csv', function (err) {
            if (err)
                return cb(err);
            console.log('load csv %s', name);
            cb(null);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    __egretProto__.createScene = function () {
        var _this = this;
        async.parallel([
            function (cb) {
                _this.loadConfig('box', cb);
            },
            function (cb) {
                _this.loadConfig('exp', cb);
            },
            function (cb) {
                _this.loadConfig('formula', cb);
            },
            function (cb) {
                _this.loadConfig('hero', cb);
            },
            function (cb) {
                _this.loadConfig('hero_upgrade', cb);
            },
            function (cb) {
                _this.loadConfig('item', cb);
            },
            function (cb) {
                _this.loadConfig('monster', cb);
            },
            function (cb) {
                _this.loadConfig('monster_lv', cb);
            },
            function (cb) {
                _this.loadConfig('monster_mode', cb);
            },
            function (cb) {
                _this.loadConfig('monster_type', cb);
            },
            function (cb) {
                _this.loadConfig('skill', cb);
            },
            function (cb) {
                _this.loadConfig('stage', cb);
            }
        ], function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
            console.log('load csv completed');
            Game.role.init();
            ViewStack.pushView(new MainPanel(), false);
        });
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
//# sourceMappingURL=Main.js.map