/**
 * Created by yinqing on 15-5-14.
 */
var BagItemRenderer = (function (_super) {
    __extends(BagItemRenderer, _super);
    //private itemId:number;
    function BagItemRenderer() {
        _super.call(this);
        this.touchChildren = true;
        this.skinName = "skins.game.bag.BagItemRendererSkin";
    }
    var __egretProto__ = BagItemRenderer.prototype;
    __egretProto__.childrenCreated = function () {
        this.btnUseItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemUse, this);
    };
    __egretProto__.onDestroy = function () {
        this.btnUseItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchItemUse, this);
    };
    __egretProto__.dataChanged = function () {
        var item = this.data;
        var itemConfig = Game.config.tables['item'][item.itemId];
        if (itemConfig !== undefined) {
            //this.picItemIcon
            this.lblItemName.text = itemConfig['name'];
            this.lblItemDesc.text = itemConfig['description'];
            this.lblItemNum.text = item.itemNum.toString();
            this.btnUseItem.enabled = true;
        }
    };
    __egretProto__.touchItemUse = function (evt) {
        Game.itemController.useItem(this.data.itemId);
    };
    return BagItemRenderer;
})(egret.gui.ItemRenderer);
BagItemRenderer.prototype.__class__ = "BagItemRenderer";
//# sourceMappingURL=BagItemRenderer.js.map