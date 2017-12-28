/**
 * Created by zmj on 15-4-28.
 */
var Config = (function () {
    function Config() {
        this.tables = {};
    }
    var __egretProto__ = Config.prototype;
    __egretProto__.load = function (path, cb) {
        var _this = this;
        var csvName = /([^/]+)\.csv/.exec(path);
        if (csvName)
            csvName = csvName[1];
        else
            cb(new Error('invalid path'));
        RES.getResByUrl(path, function (csvStr) {
            var res = Papa.parse(csvStr, { header: true, dynamicTyping: true, skipEmptyLines: true });
            if (res.errors.length > 0) {
                console.log("[Config] parse error: %j", res.error);
                return cb(new Error());
            }
            var rows = {};
            var len = res.data.length;
            for (var i = 0; i < len; i++) {
                var o = res.data[i];
                for (var k in o) {
                    if (o[k] === "")
                        o[k] = 0; // 空单元格视作0
                    var sp = /^json_(.+)/.exec(k);
                    if (sp) {
                        try {
                            o[sp[1]] = JSON.parse(o[k]);
                            o[k] = undefined;
                        }
                        catch (err) {
                            console.log('[Config] parse error: row=%d, col=%s', o["id"], k);
                            return cb(err);
                        }
                    }
                }
                if (o.hasOwnProperty('id')) {
                    rows[o.id] = o;
                }
            }
            _this.tables[csvName] = rows;
            cb(null);
        }, this, RES.ResourceItem.TYPE_TEXT);
    };
    return Config;
})();
Config.prototype.__class__ = "Config";
//# sourceMappingURL=Config.js.map