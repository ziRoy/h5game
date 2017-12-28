/**
 * Created by yinqing on 15-5-13.
 */
var Navigator = (function (_super) {
    __extends(Navigator, _super);
    function Navigator() {
        _super.call(this);
        this.skinName = "skins.NavigatorSkin";
    }
    var __egretProto__ = Navigator.prototype;
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
    return Navigator;
})(StageSkinnableContainer);
Navigator.prototype.__class__ = "Navigator";
//# sourceMappingURL=Navigator.js.map