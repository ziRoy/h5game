var AssetMgr = (function () {
    function AssetMgr() {
    }
    var __egretProto__ = AssetMgr.prototype;
    /**
     * 初始化
     * @param call_back_
     */
    AssetMgr.init = function (call_back_, target_) {
        // 下载版本文件
        RES.parseConfig({
            "resources": [
                { "name": this.vres_key, "type": "json", "url": "vres.manifest?v=" + Math.floor(Math.random() * 10000000) },
            ],
            "groups": [
                { "name": this.init_group_name, "keys": this.vres_key }
            ]
        }, "resource/");
        function onInitLoadComplete(event) {
            if (event.groupName == this.init_group_name) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onInitLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onInitLoadError, this);
                // 加载版本文件
                this.initVerMap();
                call_back_.call(target_);
            }
        }
        function onInitLoadError() {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onInitLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onInitLoadError, this);
            console.warn("asset mgr init load error");
        }
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onInitLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onInitLoadError, this);
        RES.loadGroup(this.init_group_name);
    };
    /**
     * 添加资源
     * @param res_
     */
    AssetMgr.registerRes = function (res_) {
        var res_list = res_["resources"];
        if (res_list) {
            for (var idx = 0; idx < res_list.length; ++idx) {
                res_list[idx].url = this.appendVer(res_list[idx].url);
            }
        }
        RES.parseConfig(res_, "resource/");
    };
    /**
     * 加载资源
     * @param name_
     * @param call_back_
     */
    AssetMgr.loadGroup = function (name_, call_back_, target_, prg_call_back_) {
        function onLoadComplete(event) {
            if (event.groupName == name_) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onLoadProgress, this);
                call_back_.call(target_);
            }
        }
        function onLoadError(event) {
            if (event.groupName == name_) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, onLoadProgress, this);
                console.warn("res group load error: " + name_);
            }
        }
        function onLoadProgress(event) {
            if (event.groupName == name_) {
                if (prg_call_back_) {
                    prg_call_back_.call(target_, event);
                }
            }
        }
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, onLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onLoadProgress, this);
        RES.loadGroup(name_);
    };
    AssetMgr.loadGroupFromJson = function (key_, url_, group_name_, call_back_, target_, prg_call_back_) {
        this.registerRes({
            "resources": [
                {
                    "name": key_,
                    "type": "json",
                    "url": url_
                }
            ]
        });
        function onJsonLoadComplete(data_, data_key_) {
            if (data_key_ == key_) {
                this.registerRes(data_);
                this.loadGroup(group_name_, call_back_, target_, prg_call_back_);
            }
        }
        RES.getResAsync(key_, onJsonLoadComplete, this);
    };
    AssetMgr.initVerMap = function () {
        this.ver_map = RES.getRes(this.vres_key);
    };
    //private static swf_assets_mgr;
    AssetMgr.appendVer = function (res_path_) {
        var ver_data = this.ver_map[res_path_];
        if (ver_data) {
            return res_path_ + "?v=" + ver_data;
        }
        else {
            return res_path_ + "?v=" + Math.random();
        }
    };
    //public static get swfAssetsMgr()
    //{
    //	if ( this.swf_assets_mgr === undefined ) this.swf_assets_mgr = new starlingswf.SwfAssetManager();
    //	return this.swf_assets_mgr;
    //}
    AssetMgr.init_group_name = "asset_mgr";
    AssetMgr.vres_key = "vres_manifest";
    AssetMgr.ver_map = {};
    return AssetMgr;
})();
AssetMgr.prototype.__class__ = "AssetMgr";
var AssetGroup = (function () {
    function AssetGroup(name) {
        this.name = name;
        this.config = {};
        this.config["resources"] = [];
    }
    var __egretProto__ = AssetGroup.prototype;
    __egretProto__.appendRes = function (name, type, url) {
        this.config["resources"].push({
            name: name,
            type: type,
            url: url
        });
        return this;
    };
    //public appendSwf( path:string ):AssetGroup
    //{
    //	if ( path.lastIndexOf( "/" ) != path.length - 1 ) path += "/";
    //	console.log( path + this.name + "/" + this.name + ".json" );
    //	console.log( path + this.name + "/" + this.name + "_swf.json" );
    //	return this
    //		.appendRes( this.name, "sheet", path + this.name + "/" + this.name + ".json" )
    //		.appendRes( this.name + "_swf", "json", path + this.name + "/" + this.name + "_swf.json" );
    //}
    __egretProto__.load = function (cb, target) {
        var len = this.config["resources"].length;
        if (len == 0) {
            cb.call(target);
            return;
        }
        var keys = "";
        for (var i = 0; i < len; i++) {
            if (i != 0)
                keys += ",";
            keys += this.config["resources"][i].name;
        }
        this.config["groups"] = [{ name: this.name, keys: keys }];
        AssetMgr.registerRes(this.config);
        AssetMgr.loadGroup(this.name, cb, target, null);
    };
    return AssetGroup;
})();
AssetGroup.prototype.__class__ = "AssetGroup";
//# sourceMappingURL=AssetMgr.js.map