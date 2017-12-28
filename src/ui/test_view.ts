//class TestView extends StageGroup{
//    public constructor() {
//        super();
//
//        this.percentWidth = 100
//        this.percentHeight = 100
//
//        this.createScene()
//    }
//
//    private textContainer: egret.Sprite;
//    /**
//     * 创建游戏场景
//     */
//    private createGameScene(): void {
//
//        var sky: egret.Bitmap = this.createBitmapByName("bgImage");
//        this.addChild(sky);
//        var stageW: number = this.stage.stageWidth;
//        var stageH: number = this.stage.stageHeight;
//        sky.width = stageW;
//        sky.height = stageH;
//
//        var topMask: egret.Shape = new egret.Shape();
//        topMask.graphics.beginFill(0x000000, 0.5);
//        topMask.graphics.drawRect(0, 0, stageW, stageH);
//        topMask.graphics.endFill();
//        topMask.width = stageW;
//        topMask.height = stageH;
//        this.addChild(topMask);
//
//        var icon: egret.Bitmap = this.createBitmapByName("egretIcon");
//        icon.anchorX = icon.anchorY = 0.5;
//        this.addChild(icon);
//        icon.x = stageW / 2;
//        icon.y = stageH / 2 - 60;
//        icon.scaleX = 0.55;
//        icon.scaleY = 0.55;
//
//        var colorLabel: egret.TextField = new egret.TextField();
//        colorLabel.x = stageW / 2;
//        colorLabel.y = stageH / 2 + 50;
//        colorLabel.anchorX = colorLabel.anchorY = 0.5;
//        colorLabel.textColor = 0xffffff;
//        colorLabel.textAlign = "center";
//        colorLabel.text = "Hello Egret";
//        colorLabel.size = 20;
//        this.addChild(colorLabel);
//
//        var textContainer: egret.Sprite = new egret.Sprite();
//        textContainer.anchorX = textContainer.anchorY = 0.5;
//        this.addChild(textContainer);
//        textContainer.x = stageW / 2;
//        textContainer.y = stageH / 2 + 100;
//        textContainer.alpha = 0;
//
//        this.textContainer = textContainer;
//
//        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
//        RES.getResAsync("description", this.startAnimation, this)
//    }
//    /**
//     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
//     */
//    private createBitmapByName(name: string): egret.Bitmap {
//        var result: egret.Bitmap = new egret.Bitmap();
//        var texture: egret.Texture = RES.getRes(name);
//        result.texture = texture;
//        return result;
//    }
//    /**
//     * 描述文件加载成功，开始播放动画
//     */
//    private startAnimation(result: Array<any>): void {
//        var textContainer: egret.Sprite = this.textContainer;
//        var count: number = -1;
//        var self: any = this;
//        var change: Function = function () {
//            count++;
//            if (count >= result.length) {
//                count = 0;
//            }
//            var lineArr = result[count];
//
//            self.changeDescription(textContainer, lineArr);
//
//            var tw = egret.Tween.get(textContainer);
//            tw.to({ "alpha": 1 }, 200);
//            tw.wait(2000);
//            tw.to({ "alpha": 0 }, 200);
//            tw.call(change, this);
//        }
//
//        change();
//    }
//    /**
//     * 切换描述内容
//     */
//    private changeDescription(textContainer: egret.Sprite, lineArr: Array<any>): void {
//        textContainer.removeChildren();
//        var w: number = 0;
//        for (var i: number = 0; i < lineArr.length; i++) {
//            var info: any = lineArr[i];
//            var colorLabel: egret.TextField = new egret.TextField();
//            colorLabel.x = w;
//            colorLabel.anchorX = colorLabel.anchorY = 0;
//            colorLabel.textColor = parseInt(info["textColor"]);
//            colorLabel.text = info["text"];
//            colorLabel.size = 40;
//            textContainer.addChild(colorLabel);
//
//            w += colorLabel.width;
//        }
//    }
//
//    //private gameLayer: egret.DisplayObjectContainer;
//    //
//    //private guiLayer: egret.gui.UIStage;
//
//    /**
//     * 创建场景界面
//     */
//    private createScene(): void {
//        ////游戏场景层，游戏场景相关内容可以放在这里面。
//        //this.gameLayer = new egret.DisplayObjectContainer();
//        //this.addChild(this.gameLayer);
//        //var bitmap: egret.Bitmap = new egret.Bitmap();
//        //bitmap.texture = RES.getRes("gonggao_json.gonggao_logo");
//        //this.gameLayer.addChild(bitmap);
//
//        ////GUI的组件必须都在这个容器内部,UIStage会始终自动保持跟舞台一样大小。
//        //this.guiLayer = new egret.gui.UIStage();
//        //this.addChild(this.guiLayer);
//
//        // 返回按钮
//        var backBtn: egret.gui.Button = new egret.gui.Button();
//        backBtn.right = 0;
//        backBtn.top = 0;
//        backBtn.label = "返回";
//        backBtn.skinName = "skins.simple.DWBtnSkin"
//        backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
//            ViewStack.popView()
//        }, this);
//        this.addElement(backBtn);
//
//        //this.testPanel()
//        //this.testSound()
//        //this.testBattle()
//        //this.testRuntime()
//        //this.testOpenURL()
//        this.testHero()
//    }
//
//    private configList:Array<string> = ["fireworks","fire","sun","jellyfish"];
//    private configIndex:number = -1;
//    private textureList:Array<string> = ["blood","star","energy","magic"];
//    private textureIndex:number = 0;
//    private system:particle.ParticleSystem;
//    private btn1:egret.TextField;
//    private btn2:egret.TextField;
//
//    private onParticleResComplete(){
//        //this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
//
//        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this)
//
//        this.btn1 = new egret.TextField();
//        this.btn1.text = "换效果";
//        this.addChild(this.btn1);
//
//        this.btn1.x = 180;
//        this.btn1.width = 100;
//        this.btn1.height = 50;
//        this.btn1.touchEnabled = true;
//        this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeEffect, this);
//
//        this.btn2 = new egret.TextField();
//        this.btn2.text = "换纹理";
//        this.addChild(this.btn2);
//
//        this.btn2.x = 180;
//        this.btn2.y = 50;
//        this.btn2.width = 100;
//        this.btn2.height = 50;
//        this.btn2.touchEnabled = true;
//        this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeTexture, this);
//
//        this.initStarPool()
//        //this.changeEffect();
//    }
//
//    private onClick(event):void {
//        //if(event.target == this.btn1 || event.target == this.btn2) {
//        //    return;
//        //}
//        //this.system.emitterX = event.stageX;
//        //this.system.emitterY = event.stageY;
//
//        if(!this.stage) return
//
//        function randomByRange(start_, end_){
//            var nRand =Math.floor( Math.random() * (end_ - start_));
//            return (start_ + nRand);
//        }
//
//        for(var start = 0; start < this.stage.stageWidth; start += 50){
//            this.createStarSFX(start, randomByRange(event.stageY - 50, event.stageY + 50))
//        }
//    }
//
//    private changeEffect():void {
//        this.configIndex++;
//        if (this.configIndex >= this.configList.length) {
//            this.configIndex = 0;
//        }
//        var s = this.configList[this.configIndex];
//        var textureS = this.textureList[this.textureIndex];
//        var texture = RES.getRes(textureS);
//        var config = RES.getRes(s + "_json");
//
//        if (this.system) {
//            this.system.stop();
//            this.removeChild(this.system);
//        }
//
//        this.system = new particle.GravityParticleSystem(texture, config);
//        this.system.x = 100
//        this.system.y = 100
//        this.addChild(this.system);
//        this.system.start();
//    }
//
//    private starSFX: particle.ParticleSystem
//
//    private createStarSFX(x_, y_){
//        //var texture = RES.getRes(this.textureList[1])
//        //var config = RES.getRes(this.configList[0] + "_json")
//        //
//        //var starSFX : particle.GravityParticleSystem = new particle.GravityParticleSystem(texture, config)
//
//        var starSFX = this.getStarFromPool()
//        if(!starSFX) return
//
//        this.addChild(starSFX)
//        starSFX.start()
//
//        starSFX.x = x_
//        starSFX.y = y_
//        starSFX.emitterX = 0
//        starSFX.emitterY = 0
//
//        var tw = egret.Tween.get(starSFX)
//        tw.to({x: x_, y: y_ + 200}, 500).to({x: this.stage.stageWidth * 0.5, y: this.stage.stageHeight}, 500).call(function(){
//            starSFX.stop()
//        }, this).wait(10).call(function(){
//            this.removeChild(starSFX)
//            this.starList.push(starSFX)
//        }, this)
//    }
//
//    private starList:Array<particle.GravityParticleSystem> = [];
//
//    private initStarPool(){
//        var texture = RES.getRes(this.textureList[1])
//        var config = RES.getRes(this.configList[0] + "_json")
//
//        for(var idx = 0; idx < 100; ++idx) {
//
//            var starSFX : particle.GravityParticleSystem = new particle.GravityParticleSystem(texture, config)
//            //this.addChild(starSFX)
//            //starSFX.start()
//
//            starSFX.emitterX = 0
//            starSFX.emitterY = 0
//
//            this.starList.push(starSFX)
//        }
//    }
//
//    private getStarFromPool(){
//        if(this.starList.length > 0) {
//            return this.starList.pop()
//        }
//
//        return null
//    }
//
//    private changeTexture():void {
//        this.textureIndex++;
//        if (this.textureIndex >= this.textureList.length) {
//            this.textureIndex = 0;
//        }
//        var s = this.textureList[this.textureIndex];
//        var texture = RES.getRes(s);
//        this.system.changeTexture(texture);
//    }
//
//    private onButtonClick(event: egret.TouchEvent): void {
//        //egret.gui.Alert.show("这是一个GUI弹窗!", "弹窗")
//
//        //ViewStack.pushView(new Demo())
//        //this.stage.addChild( new Demo() );
//    }
//
//    private testSound(){
//        var se1: egret.gui.Button = new egret.gui.Button();
//        se1.left = 0;
//        se1.bottom = 0;
//        se1.label = "音乐";
//        se1.skinName = "skins.simple.DWBtnSkin"
//        se1.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
//            var music = SoundUtil.getSound("battle_victory.mp3", egret.Sound.MUSIC)
//            music.play()
//        }, this);
//        this.addElement(se1);
//
//        var se2: egret.gui.Button = new egret.gui.Button();
//        se2.left = 150;
//        se2.bottom = 0;
//        se2.label = "音效";
//        se2.skinName = "skins.simple.DWBtnSkin"
//        se2.addEventListener(egret.TouchEvent.TOUCH_TAP, function(){
//            var sound = SoundUtil.getSound("battle_mon_crazy.mp3")
//            sound.play()
//        }, this);
//        this.addElement(se2);
//    }
//
//    private testRuntime(){
//        var lbl = new egret.gui.Label()
//        lbl.text = egret.MainContext.runtimeType
//        lbl.horizontalCenter = 0
//        lbl.verticalCenter = 100
//        this.addElement(lbl)
//    }
//
//    private testParticle(){
//        // 加载例子资源
//        AssetMgr.registerRes({
//            "resources":
//                [
//                    {"name":"blood","type":"image","url":"assets/particle/blood.png"},
//                    {"name":"star","type":"image","url":"assets/particle/star.png"},
//                    {"name":"energy","type":"image","url":"assets/particle/energy.png"},
//                    {"name":"magic","type":"image","url":"assets/particle/magic.png"},
//                    {"name":"fireworks_json","type":"json","url":"assets/particle/fireworks.json"},
//                    {"name":"fire_json","type":"json","url":"assets/particle/fire.json"},
//                    {"name":"sun_json","type":"json","url":"assets/particle/sun.json"},
//                    {"name":"jellyfish_json","type":"json","url":"assets/particle/jellyfish.json"}
//                ],
//
//            "groups":
//                [
//                    {"name":"ppsystem","keys":"blood,star,energy,magic,fireworks_json,fire_json,sun_json,jellyfish_json"}
//                ]
//        })
//        AssetMgr.loadGroup("ppsystem", this.onParticleResComplete, this, null)
//    }
//
//    private testOpenURL(){
//        location.href = "http://www.baidu.com"
//    }
//
//    private testHero(){
//        // 英雄
//        var hero1 = new HeroAvatar(101);
//        hero1.setAction( "Action_Stand", true );
//        hero1.view.scaleX *= -1;
//        //hero1.view.scaleX *= 0.9;
//        //hero1.view.scaleY *= 0.9;
//
//        var asset: egret.gui.UIAsset = new egret.gui.UIAsset()
//        asset.source = hero1.view
//        asset.x = 100;
//        asset.y = 200;
//
//        this.addElement(asset)
//    }
//
//    private testBattle(){
//        var asset: egret.gui.UIAsset = new egret.gui.UIAsset()
//        asset.source = new BattleScene()
//        //asset.width = 400
//        //asset.height = 640
//        asset.touchEnabled = false
//        asset.touchChildren = true
//
//        this.addElement(asset)
//    }
//
//    private testPanel(){
//        var panel = new PanelTest()
//        this.addElement(panel)
//
//        var button: egret.gui.Button = new egret.gui.Button();
//        button.horizontalCenter = 0;
//        button.verticalCenter = 0;
//        button.label = "点击弹窗";
//        button.skinName = "skins.simple.DWBtnSkin"
//        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
//        //在GUI范围内一律使用addElement等方法替代addChild等方法。
//        this.addElement(button);
//    }
//}