/**
 * Created by yinqing on 15-7-7.
 */
var UITools = (function () {
    function UITools() {
    }
    var __egretProto__ = UITools.prototype;
    UITools.refreshList = function (list) {
        var pos = list.verticalScrollPosition;
        list.dataProvider.refresh();
        list.addEventListener(egret.Event.ENTER_FRAME, function () {
            list.removeEventListener(egret.Event.ENTER_FRAME, arguments.callee, null);
            list.verticalScrollPosition = pos;
        }, null);
    };
    return UITools;
})();
UITools.prototype.__class__ = "UITools";
//# sourceMappingURL=UITools.js.map