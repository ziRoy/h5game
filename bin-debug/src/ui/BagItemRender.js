/**
 * Created by yinqing on 15-5-14.
 */
var BagItemRender = (function (_super) {
    __extends(BagItemRender, _super);
    function BagItemRender() {
        _super.call(this);
        this.touchChildren = true;
        this.skinName = "skins.BagItemRendererSkin";
    }
    var __egretProto__ = BagItemRender.prototype;
    __egretProto__.dataChanged = function () {
        this.lblText.text = this.data.text;
    };
    return BagItemRender;
})(egret.gui.ItemRenderer);
BagItemRender.prototype.__class__ = "BagItemRender";
//# sourceMappingURL=BagItemRender.js.map