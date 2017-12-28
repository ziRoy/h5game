/**
 * Created by yinqing on 15-5-13.
 */
var BattleStage = (function (_super) {
    __extends(BattleStage, _super);
    function BattleStage() {
        _super.call(this);
        this.skinName = "skins.StageMapSkin";
    }
    var __egretProto__ = BattleStage.prototype;
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            if (evt.target && evt.target.name) {
                console.log("click stage: %s", evt.target.name);
                var pop = new BattleStart({ stageName: "关卡" + evt.target.name });
                egret.gui.PopUpManager.addPopUp(pop, true, true);
            }
        }, this);
    };
    return BattleStage;
})(StageSkinnableContainer);
BattleStage.prototype.__class__ = "BattleStage";
//# sourceMappingURL=StageMap.js.map