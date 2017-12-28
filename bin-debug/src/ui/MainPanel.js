/**
 * Created by yinqing on 15-4-10.
 */
var MainPanel = (function (_super) {
    __extends(MainPanel, _super);
    function MainPanel() {
        _super.call(this);
        this.stageView = new StageView();
        this.digView = new DigView();
        this.heroView = new HeroView();
        this.bagView = new BagView();
        this.techView = new TechView();
        this.skinName = "skins.game.MainPanelSkin";
    }
    var __egretProto__ = MainPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.navigatorBar.btnStage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchStage, this);
        this.navigatorBar.btnDig.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchDig, this);
        this.navigatorBar.btnHero.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchHero, this);
        this.navigatorBar.btnBag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchBag, this);
        this.navigatorBar.btnTech.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchTech, this);
        Game.eventMgr.addListener(EventMgr.GOLD_UPDATE, this.goldUpdate.bind(this));
        this.switchStage();
        this.updateResbar();
    };
    __egretProto__.updateResbar = function () {
        this.resBar.lvProgress.setValue(13);
        this.resBar.rolelevel.text = Game.role.level.toString();
        this.resBar.lblEnergy.text = Game.role.energy.toString();
        this.resBar.lblGold.text = Game.role.gold.toString();
    };
    __egretProto__.switchStage = function () {
        if (this.stageView.stage == null) {
            if (this.content.numElements > 0) {
                var view = this.content.getElementAt(0);
                if (view)
                    view.onDestroy();
            }
            this.content.removeAllElements();
            this.content.addElement(this.stageView);
        }
    };
    __egretProto__.switchDig = function () {
        if (this.digView.stage == null) {
            if (this.content.numElements > 0) {
                var view = this.content.getElementAt(0);
                if (view)
                    view.onDestroy();
            }
            this.content.removeAllElements();
            this.content.addElement(this.digView);
        }
    };
    __egretProto__.switchHero = function () {
        if (this.heroView.stage == null) {
            if (this.content.numElements > 0) {
                var view = this.content.getElementAt(0);
                if (view)
                    view.onDestroy();
            }
            this.content.removeAllElements();
            this.content.addElement(this.heroView);
        }
    };
    __egretProto__.switchBag = function () {
        if (this.bagView.stage == null) {
            if (this.content.numElements > 0) {
                var view = this.content.getElementAt(0);
                if (view)
                    view.onDestroy();
            }
            this.content.removeAllElements();
            this.content.addElement(this.bagView);
        }
    };
    __egretProto__.switchTech = function () {
        if (this.techView.stage == null) {
            if (this.content.numElements > 0) {
                var view = this.content.getElementAt(0);
                if (view)
                    view.onDestroy();
            }
            this.content.removeAllElements();
            this.content.addElement(this.techView);
        }
    };
    __egretProto__.goldUpdate = function (evt) {
        this.resBar.lblGold.text = Game.role.gold.toString();
    };
    return MainPanel;
})(StageSkinnableContainer);
MainPanel.prototype.__class__ = "MainPanel";
//# sourceMappingURL=MainPanel.js.map