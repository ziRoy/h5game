/**
 * Created by yinqing on 15-5-13.
 */
var BattleStart = (function (_super) {
    __extends(BattleStart, _super);
    function BattleStart(info) {
        _super.call(this);
        this.skinName = "skins.BattleStartSkin";
        this.info = info;
    }
    var __egretProto__ = BattleStart.prototype;
    __egretProto__.childrenCreated = function () {
        var _this = this;
        this.lblStageName.text = this.info.stageName;
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            egret.gui.PopUpManager.removePopUp(_this);
            ViewStack.pushView(new egret.gui.UIAsset(new BattleScene()));
        }, this);
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            egret.gui.PopUpManager.removePopUp(_this);
        }, this);
    };
    return BattleStart;
})(egret.gui.SkinnableContainer);
BattleStart.prototype.__class__ = "BattleStart";
//# sourceMappingURL=BattleStart.js.map