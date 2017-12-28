/**
 * Created by yinqing on 15-4-17.
 */
var Log = (function () {
    function Log() {
    }
    var __egretProto__ = Log.prototype;
    Log.init = function () {
        var nativeLog = console.log;
        var nativeError = console.error;
        var nativeWarn = console.warn;
        console.log = function () {
            nativeLog.call(console, Log.format.apply(null, arguments));
        };
        console.error = function () {
            nativeError.call(console, Log.format.apply(null, arguments));
        };
        console.warn = function () {
            nativeWarn.call(console, Log.format.apply(null, arguments));
        };
    };
    Log.format = function (f) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var arg = arguments;
        if (!(typeof f === 'string')) {
            return Array.prototype.slice.call(arg).join(' ');
        }
        var idx = 1;
        var len = arg.length;
        var str = String(f).replace(/%[sdj%]/g, function (x) {
            if (x === '%%')
                return '%';
            if (idx >= len)
                return x;
            switch (x) {
                case '%s':
                    return String(arg[idx++]);
                case '%d':
                    return String(Number(arg[idx++]));
                case '%j':
                    try {
                        return JSON.stringify(arg[idx++]);
                    }
                    catch (_) {
                        return '[Circular]';
                    }
                default:
                    return x;
            }
        });
        for (var x = arg[idx]; idx < len; x = arg[++idx]) {
            str += ' ' + x;
        }
        return str;
    };
    return Log;
})();
Log.prototype.__class__ = "Log";
//# sourceMappingURL=Log.js.map