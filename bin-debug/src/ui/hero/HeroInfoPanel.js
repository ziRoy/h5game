var HeroInfoPanel = (function (_super) {
    __extends(HeroInfoPanel, _super);
    function HeroInfoPanel() {
        _super.call(this);
        this.skinName = "skins.game.HeroInfoPanelSkin";
    }
    var __egretProto__ = HeroInfoPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.heroInfo.cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancel, this);
        this.heroInfo.confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirm, this);
        this.updateResbar();
    };
    __egretProto__.updateResbar = function () {
        this.resBar.lvProgress.setValue(13);
        this.resBar.rolelevel.text = Game.role.level.toString();
        this.resBar.lblEnergy.text = Game.role.energy.toString();
        this.resBar.lblGold.text = Game.role.gold.toString();
    };
    __egretProto__.cancel = function () {
        console.log(" click cancel ");
        ViewStack.popView();
        ViewStack.pushView(new MainPanel());
    };
    __egretProto__.confirm = function () {
        console.log(" click confirm ");
        ViewStack.popView();
        ViewStack.pushView(new MainPanel());
    };
    return HeroInfoPanel;
})(StageSkinnableContainer);
HeroInfoPanel.prototype.__class__ = "HeroInfoPanel";
//# sourceMappingURL=HeroInfoPanel.js.map