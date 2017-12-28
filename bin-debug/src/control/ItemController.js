/**
 * Created by yinqing on 15-7-7.
 */
var ItemController = (function () {
    function ItemController() {
    }
    var __egretProto__ = ItemController.prototype;
    /**
     * 加物品
     * */
    __egretProto__.createItem = function (itemId, itemQty) {
        itemQty = Math.floor(itemQty);
        var config = Game.config.tables['item'][itemId];
        if (config === undefined) {
            console.log('item config not found, id=%d', itemId);
            return false;
        }
        if (config['type'] == 2 /* IMMEDIATE */) {
            // 立即使用转换为其他资源
            var rwd = new Reward();
            this.applyItem(itemId, itemQty, rwd);
            Game.controller.applyReward(rwd);
        }
        else {
            // 放入背包
            var item = this.findItem(itemId);
            if (item) {
                item.itemNum += itemQty;
            }
            else {
                item = new Item();
                item.itemId = itemId;
                item.itemNum = itemQty;
                Game.role.bag.push(item);
            }
        }
        return true;
    };
    /**
     * 计算box的内容到Reward，不改变Role数据
     * */
    __egretProto__.applyBox = function (boxIdx, rwd) {
        var groupMap = {};
        var itemConfigMap = Game.config.tables['box'];
        for (var k in itemConfigMap) {
            var config = itemConfigMap[k];
            if (config['boxIdx'] == boxIdx) {
                if (groupMap[config['group']]) {
                    groupMap[config['group']].push(config);
                }
                else {
                    groupMap[config['group']] = [config];
                }
            }
        }
        var applyEntry = function (config) {
            rwd.gold += config['money'];
            if (config['itemId']) {
                if (rwd.item[config['itemId']]) {
                    rwd.item[config['itemId']] += config['itemQty'];
                }
                else {
                    rwd.item[config['itemId']] = config['itemQty'];
                }
            }
        };
        for (var k in groupMap) {
            var group = groupMap[k];
            if (group.length == 1) {
                if (Tools.randomEither(group[0]['probability'])) {
                    applyEntry(group[0]);
                }
            }
            else {
                var choice = Tools.randomFactor(group, 'probability');
                applyEntry(choice);
            }
        }
        return true;
    };
    /**
     * 计算Item的内容到Reward，不改变Role数据
     * */
    __egretProto__.applyItem = function (itemId, itemQty, rwd) {
        var config = Game.config.tables['item'][itemId];
        if (config === undefined) {
            console.log('item config not found, id=%d', itemId);
            return false;
        }
        switch (config['effectType']) {
            case 1 /* GOLD */:
                rwd.gold += config['effectValue'] * itemQty;
                break;
            case 2 /* DIAMOND */:
                rwd.diamond += config['effectValue'] * itemQty;
                break;
            case 3 /* ENERGY */:
                rwd.energy += config['effectValue'] * itemQty;
                break;
            case 80001 /* BOX */:
                for (var i = 0; i < itemQty; i++) {
                    if (!this.applyBox(config['effectValue'], rwd))
                        return false;
                }
                break;
            default:
                console.log('invalid item effectType, type=%d', config['effectType']);
                return false;
        }
        return true;
    };
    __egretProto__.findItem = function (itemId) {
        for (var i = 0; i < Game.role.bag.length; i++) {
            if (Game.role.bag[i].itemId == itemId)
                return Game.role.bag[i];
        }
        return null;
    };
    /**
     * 扣除物品
     * */
    __egretProto__.removeItem = function (itemId, itemQty) {
        var item = this.findItem(itemId);
        if (item) {
            item.itemNum -= itemQty;
            if (item.itemNum <= 0) {
                Game.role.bag.splice(Game.role.bag.indexOf(item), 1);
            }
            Game.eventMgr.dispatch(EventMgr.BAG_UPDATE);
            return true;
        }
        else {
            console.log('error in removeItem');
            return false;
        }
    };
    /**
     * 获得物品拥有的数量
     * */
    __egretProto__.getItemQty = function (itemId) {
        var item = this.findItem(itemId);
        return item ? item.itemNum : 0;
    };
    /**
     * 使用物品
     * */
    __egretProto__.useItem = function (itemId, itemQty) {
        if (itemQty === void 0) { itemQty = 1; }
        var rwd = new Reward();
        var item = this.findItem(itemId);
        if (item == null) {
            console.log('item not found, id=%d', itemId);
            return false;
        }
        var config = Game.config.tables['item'][itemId];
        if (config === undefined) {
            console.log('item config not found, id=%d', itemId);
            return false;
        }
        if (config['type'] != 1 /* PERSISTENT */) {
            console.log('only persistent item type can be used');
            return false;
        }
        if (item.itemNum < itemQty) {
            console.log('not enough item, id=%d, qty=%d, req=%d', item.itemId, item.itemNum, itemQty);
            return false;
        }
        if (Game.role.level < config['level']) {
            console.log('role level not enough');
            return false;
        }
        if (!this.applyItem(itemId, itemQty, rwd))
            return false;
        console.log('use item result: %s', rwd.toString());
        // now execute
        Game.controller.applyReward(rwd);
        this.removeItem(itemId, itemQty);
        return true;
    };
    return ItemController;
})();
ItemController.prototype.__class__ = "ItemController";
//# sourceMappingURL=ItemController.js.map