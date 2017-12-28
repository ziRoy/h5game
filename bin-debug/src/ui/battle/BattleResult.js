/**
 * Created by yulinjian on 15/5/29.
 */
var BattleResult = (function (_super) {
    __extends(BattleResult, _super);
    function BattleResult(info) {
        _super.call(this);
        this.skinName = "skins.game.battle.BattleResultSkin";
        this.info = info;
    }
    var __egretProto__ = BattleResult.prototype;
    __egretProto__.childrenCreated = function () {
        var _this = this;
        this.lblStageName.text = this.info.stageName;
        this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            egret.gui.PopUpManager.removePopUp(_this);
            ViewStack.popView(true);
        }, this);
    };
    return BattleResult;
})(egret.gui.SkinnableContainer);
BattleResult.prototype.__class__ = "BattleResult";
//# sourceMappingURL=BattleResult.js.map