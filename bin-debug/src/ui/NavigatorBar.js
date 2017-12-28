/**
 * Created by yinqing on 15-5-13.
 */
var NavigatorBar = (function (_super) {
    __extends(NavigatorBar, _super);
    function NavigatorBar() {
        _super.call(this);
        this.skinName = "skins.game.NavigatorBarSkin";
    }
    var __egretProto__ = NavigatorBar.prototype;
    __egretProto__.childrenCreated = function () {
        this.btnStage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapStage, this);
        this.btnDig.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapDig, this);
    };
    __egretProto__.onTapStage = function (evt) {
        console.log('stage');
    };
    __egretProto__.onTapDig = function (evt) {
        console.log('dig');
    };
    return NavigatorBar;
})(StageSkinnableContainer);
NavigatorBar.prototype.__class__ = "NavigatorBar";
//# sourceMappingURL=NavigatorBar.js.map