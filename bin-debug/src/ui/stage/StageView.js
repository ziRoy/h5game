/**
 * Created by yinqing on 15-5-13.
 */
var StageView = (function (_super) {
    __extends(StageView, _super);
    function StageView() {
        _super.call(this);
        this.skinName = "skins.game.stage.StageViewSkin";
    }
    var __egretProto__ = StageView.prototype;
    __egretProto__.childrenCreated = function () {
        var _this = this;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (evt) {
            _this.addBattleStart(evt);
        }, this);
    };
    __egretProto__.onDestroy = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addBattleStart, this);
    };
    __egretProto__.addBattleStart = function (evt) {
        if (evt.target && evt.target.name) {
            var name = Game.config.tables['stage'][evt.target.name].name;
            var pop = new BattleStart({ stageName: name });
            egret.gui.PopUpManager.addPopUp(pop, true, true);
        }
    };
    return StageView;
})(StageSkinnableContainer);
StageView.prototype.__class__ = "StageView";
//# sourceMappingURL=StageView.js.map