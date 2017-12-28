/**
 * Created by yinqing on 15-5-14.
 */
var DigItemRenderer = (function (_super) {
    __extends(DigItemRenderer, _super);
    function DigItemRenderer() {
        _super.call(this);
        this.touchChildren = true;
        this.skinName = "skins.game.dig.DigItemRendererSkin";
    }
    var __egretProto__ = DigItemRenderer.prototype;
    __egretProto__.dataChanged = function () {
        console.log(" text ::: ", this.data.text);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    __egretProto__.onTouch = function (evt) {
        var tw = egret.Tween.get(this);
        tw.to({ scaleX: 0.8, scaleY: 0.8 }, 100).to({ scaleX: 1, scaleY: 1 }, 100);
        console.log(" has Touched .. ");
    };
    return DigItemRenderer;
})(egret.gui.ItemRenderer);
DigItemRenderer.prototype.__class__ = "DigItemRenderer";
//# sourceMappingURL=DigItemRenderer.js.map