/**
 * Created by yinqing on 15-5-14.
 */
var BagView = (function (_super) {
    __extends(BagView, _super);
    function BagView() {
        _super.call(this);
        this.skinName = "skins.game.bag.BagViewSkin";
    }
    var __egretProto__ = BagView.prototype;
    __egretProto__.onDestroy = function () {
        Game.eventMgr.removeListener(EventMgr.BAG_UPDATE, this.update.bind(this));
    };
    __egretProto__.childrenCreated = function () {
        this.dgItem.dataProvider = new egret.gui.ArrayCollection(Game.role.bag);
        this.dgItem.itemRenderer = new egret.gui.ClassFactory(BagItemRenderer);
        Game.eventMgr.addListener(EventMgr.BAG_UPDATE, this.update.bind(this));
    };
    __egretProto__.update = function (evt) {
        if (evt === void 0) { evt = null; }
        Tools.refreshList(this.dgItem);
    };
    return BagView;
})(StageSkinnableContainer);
BagView.prototype.__class__ = "BagView";
//# sourceMappingURL=BagView.js.map