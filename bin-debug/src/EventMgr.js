/**
 * Created by yulinjian on 15/6/30.
 */
var DataEvent = (function (_super) {
    __extends(DataEvent, _super);
    function DataEvent(type, data) {
        _super.call(this, type);
        this.data = data;
    }
    var __egretProto__ = DataEvent.prototype;
    return DataEvent;
})(egret.Event);
DataEvent.prototype.__class__ = "DataEvent";
var EventMgr = (function (_super) {
    __extends(EventMgr, _super);
    function EventMgr() {
        _super.call(this);
    }
    var __egretProto__ = EventMgr.prototype;
    __egretProto__.addListener = function (eventName, cb) {
        this.addEventListener(eventName, cb, null);
    };
    __egretProto__.removeListener = function (eventName, cb) {
        this.removeEventListener(eventName, cb, null);
    };
    __egretProto__.dispatch = function (eventName, data) {
        if (data === void 0) { data = null; }
        this.dispatchEvent(new DataEvent(eventName, data));
        //Game.eventmgr.dispatch( EventMgr.BagUpdate );
    };
    EventMgr.BAG_UPDATE = "BAG_UPDATE"; // 使用物品
    EventMgr.HERO_UPDATE = "HERO_UPDATE"; //英雄升级
    EventMgr.GOLD_UPDATE = "GOLD_UPDATE"; //金币变化
    EventMgr.DIAMOND_UPDATE = "DIAMOND_UPDATE";
    EventMgr.CHOOSE_HERO = "CHOOSE_HERO"; //选择英雄
    return EventMgr;
})(egret.EventDispatcher);
EventMgr.prototype.__class__ = "EventMgr";
//# sourceMappingURL=EventMgr.js.map