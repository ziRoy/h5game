/**
 * Created by yinqing on 15-5-14.
 */
var ModuleBag = (function (_super) {
    __extends(ModuleBag, _super);
    function ModuleBag() {
        _super.call(this);
        this.skinName = "skins.ModuleBagSkin";
    }
    var __egretProto__ = ModuleBag.prototype;
    __egretProto__.childrenCreated = function () {
        var data = [];
        for (var i = 0; i < 13; i++) {
            data.push({ text: "" + i });
        }
        this.dgItem.dataProvider = new egret.gui.ArrayCollection(data);
        this.dgItem.itemRenderer = new egret.gui.ClassFactory(BagItemRender);
    };
    return ModuleBag;
})(StageSkinnableContainer);
ModuleBag.prototype.__class__ = "ModuleBag";
//# sourceMappingURL=ModuleBag.js.map