/**
 * Created by yinqing on 15-7-7.
 */
var Reward = (function () {
    function Reward() {
        this.gold = 0;
        this.diamond = 0;
        this.energy = 0;
        this.item = {};
    }
    var __egretProto__ = Reward.prototype;
    __egretProto__.toString = function () {
        var ret = "";
        if (this.gold)
            ret += '[gold]' + this.gold;
        if (this.diamond)
            ret += '[diamond]' + this.diamond;
        if (this.energy)
            ret += '[energy]' + this.energy;
        for (var k in this.item) {
            ret += '[item]' + k + "*" + this.item[k];
        }
        return ret;
    };
    return Reward;
})();
Reward.prototype.__class__ = "Reward";
//# sourceMappingURL=Reward.js.map