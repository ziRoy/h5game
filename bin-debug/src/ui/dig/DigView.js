/**
 * Created by yinqing on 15-5-14.
 */
var DigView = (function (_super) {
    __extends(DigView, _super);
    function DigView() {
        _super.call(this);
        this.skinName = "skins.game.dig.DigViewSkin";
    }
    var __egretProto__ = DigView.prototype;
    __egretProto__.childrenCreated = function () {
        this.picLeftIcon.scaleX = -1;
        var data = [];
        for (var i = 0; i < 4; i++) {
            data.push({ text: "" + i });
        }
        this.dgDigItem.dataProvider = new egret.gui.ArrayCollection(data);
        this.dgDigItem.itemRenderer = new egret.gui.ClassFactory(DigItemRenderer);
    };
    __egretProto__.onDestroy = function () {
    };
    return DigView;
})(StageSkinnableContainer);
DigView.prototype.__class__ = "DigView";
//# sourceMappingURL=DigView.js.map