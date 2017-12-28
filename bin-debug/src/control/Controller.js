/**
 * Created by yulinjian on 15/6/30.
 */
var Controller = (function (_super) {
    __extends(Controller, _super);
    function Controller() {
        _super.call(this);
    }
    var __egretProto__ = Controller.prototype;
    /**
     * 将 Reward 内容实装到 Role
     * */
    __egretProto__.applyReward = function (rwd) {
        if (rwd.gold) {
            Game.role.gold += rwd.gold;
            Game.eventMgr.dispatch(EventMgr.GOLD_UPDATE);
        }
        if (rwd.diamond) {
            Game.role.diamond += rwd.diamond;
            Game.eventMgr.dispatch(EventMgr.DIAMOND_UPDATE);
        }
        if (rwd.item) {
            var dirty = false;
            for (var itemId in rwd.item) {
                Game.itemController.createItem(itemId, rwd.item[itemId]);
                dirty = true;
            }
            if (dirty)
                Game.eventMgr.dispatch(EventMgr.BAG_UPDATE);
        }
        return true;
    };
    return Controller;
})(egret.EventDispatcher);
Controller.prototype.__class__ = "Controller";
//# sourceMappingURL=Controller.js.map