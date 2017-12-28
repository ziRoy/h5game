/**
 * Created by yinqing on 15-4-16.
 */
var async = (function () {
    function async() {
    }
    var __egretProto__ = async.prototype;
    /*------------- Collection -------------*/
    async.each = function (arr, iterator, callback) {
        if (!arr.length)
            return callback();
        var completed = 0;
        arr.forEach(function (x) {
            iterator(x, async.onlyOnce(done));
        });
        function done(err) {
            if (err) {
                callback(err);
                callback = function () {
                };
            }
            else {
                completed += 1;
                if (completed >= arr.length)
                    callback();
            }
        }
    };
    async.eachSeries = function (arr, iterator, callback) {
        if (!arr.length)
            return callback();
        var completed = 0;
        (function iterate() {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {
                    };
                }
                else {
                    completed += 1;
                    if (completed >= arr.length)
                        callback();
                    else
                        iterate();
                }
            });
        })();
    };
    async.eachLimit = function (arr, limit, iterator, callback) {
        var fn = async.eachLimitFn(limit);
        fn.apply(null, [arr, iterator, callback]);
    };
    async.map = function (arr, iterator, callback) {
        return async.collectResultFn.call(null, async.each, arr, iterator, callback);
    };
    async.mapSeries = function (arr, iterator, callback) {
        return async.collectResultFn.call(null, async.eachSeries, arr, iterator, callback);
    };
    async.mapLimit = function (arr, limit, iterator, callback) {
        return async.collectResultFn.call(null, async.eachLimitFn(limit), arr, iterator, callback);
    };
    /*------------- ﻿Control Flow -------------*/
    async.series = function (tasks, callback) {
        return async.callTaskFn.call(null, async.mapSeries, tasks, callback);
    };
    async.parallel = function (tasks, callback) {
        return async.callTaskFn.call(null, async.map, tasks, callback);
    };
    async.parallelLimit = function (tasks, limit, callback) {
        return async.callTaskFn.call(null, async.eachLimitFn(limit), tasks, callback);
    };
    async.waterfall = function (tasks, callback) {
        if (!tasks.length)
            return callback(null, []);
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback.apply(null, arguments);
                    callback = function () {
                    };
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next)
                        args.push(wrapIterator(next));
                    else
                        args.push(callback);
                    setTimeout(function () {
                        iterator.apply(null, args);
                    }, 0);
                }
            };
        };
        wrapIterator(async.iterator(tasks))(null);
    };
    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1) : null;
            };
            return fn;
        };
        return makeCallback(0);
    };
    async.callTaskFn = function (fn, tasks, callback) {
        fn(tasks, function (fn, callback) {
            if (!fn)
                return;
            fn(function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (args.length <= 1)
                    args = args[0]; // error occurs
                callback.call(null, err, args);
            });
        }, callback);
    };
    async.collectResultFn = function (fn, arr, iterator, callback) {
        var tmp = arr.map(function (x, i) {
            return { index: i, value: x };
        });
        var results = [];
        fn(tmp, function (x, callback) {
            iterator(x.value, function (err, v) {
                results[x.index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    async.eachLimitFn = function (limit) {
        return function (arr, iterator, callback) {
            if (!arr.length || limit <= 0)
                return callback();
            var completed = 0;
            var started = 0;
            var running = 0;
            (function replenish() {
                if (completed >= arr.length)
                    return callback();
                while (running < limit && started < arr.length) {
                    started += 1;
                    running += 1;
                    iterator(arr[started - 1], function (err) {
                        if (err) {
                            callback(err);
                            callback = function () {
                            };
                        }
                        else {
                            completed += 1;
                            running -= 1;
                            if (completed >= arr.length)
                                callback();
                            else
                                replenish();
                        }
                    });
                }
            })();
        };
    };
    async.onlyOnce = function (fn) {
        var called = false;
        return function () {
            if (called)
                throw new Error("Callback was already called.");
            called = true;
            fn.apply(null, arguments);
        };
    };
    return async;
})();
async.prototype.__class__ = "async";
//# sourceMappingURL=Async.js.map