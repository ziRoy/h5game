/**
 * Created by yinqing on 15-7-6.
 */
var Item = (function () {
    function Item() {
    }
    var __egretProto__ = Item.prototype;
    return Item;
})();
Item.prototype.__class__ = "Item";
var ItemType;
(function (ItemType) {
    ItemType[ItemType["PERSISTENT"] = 1] = "PERSISTENT";
    ItemType[ItemType["IMMEDIATE"] = 2] = "IMMEDIATE";
    ItemType[ItemType["MATERIAL"] = 3] = "MATERIAL";
    ItemType[ItemType["COMBINE"] = 4] = "COMBINE";
})(ItemType || (ItemType = {}));
var ItemEffectType;
(function (ItemEffectType) {
    ItemEffectType[ItemEffectType["GOLD"] = 1] = "GOLD";
    ItemEffectType[ItemEffectType["DIAMOND"] = 2] = "DIAMOND";
    ItemEffectType[ItemEffectType["ENERGY"] = 3] = "ENERGY";
    ItemEffectType[ItemEffectType["BOX"] = 80001] = "BOX";
})(ItemEffectType || (ItemEffectType = {}));
//# sourceMappingURL=Item.js.map