/**
 * Created by yinqing on 15-4-24.
 */
var NetClient = (function (_super) {
    __extends(NetClient, _super);
    function NetClient() {
        _super.apply(this, arguments);
    }
    var __egretProto__ = NetClient.prototype;
    __egretProto__.init = function (protoPath, cb) {
        var _this = this;
        ProtoBuf.loadProtoFile(protoPath, function (err, builder) {
            if (err)
                return cb(err);
            console.log('[NetClient] protocol loaded');
            _this.protoRoot = builder.build();
            _this.sock = new egret.WebSocket();
            _this.mapCodeName = {};
            _this.data = new egret.ByteArray();
            _this.data.endian = egret.Endian.LITTLE_ENDIAN;
            for (var k in _this.protoRoot) {
                var code = _this.protoRoot[k].$options.code;
                if (_this.mapCodeName[code])
                    return cb(new Error('duplicate cmd code ' + code));
                _this.mapCodeName[code] = k;
            }
            _this.sock.addEventListener(egret.Event.CONNECT, function (evt) {
                console.log("[NetClient] socket connected");
                _this.dispatchEventWith(egret.Event.CONNECT);
            }, null);
            _this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, function (evt) {
                console.log("[NetClient] socket data received");
                _this.sock.readBytes(_this.data, _this.data.length);
                while (_this.data.length > 0) {
                    _this.data.position = 0;
                    var packetLen = _this.data.readShort();
                    if (_this.data.length >= packetLen) {
                        var cmd = _this.data.readShort();
                        var tmp = new egret.ByteArray(new ArrayBuffer(packetLen - 4));
                        _this.data.readBytes(tmp, 0, packetLen - 4);
                        var name = _this.mapCodeName[cmd];
                        if (name !== undefined) {
                            var vo;
                            try {
                                vo = _this.protoRoot[name].decode(tmp.buffer);
                            }
                            catch (err) {
                                console.error('[NetClient] decode failed, cmd=%d', cmd);
                            }
                            console.log('[NetClient] receive packet, cmd=%s, data=%j', name, vo);
                            _this.dispatchEventWith(name, false, vo);
                        }
                        else {
                            console.error('[NetClient] command not found, cmd=%d', cmd);
                        }
                        var newData = new egret.ByteArray(new ArrayBuffer(_this.data.bytesAvailable));
                        _this.data.readBytes(newData);
                        _this.data = newData;
                    }
                    else {
                        break;
                    }
                }
            }, null);
            _this.sock.addEventListener(egret.Event.CLOSE, function (evt) {
                console.log('[NetClient] socket closed');
                _this.dispatchEventWith(egret.Event.CLOSE);
            }, null);
            _this.sock.addEventListener(egret.IOErrorEvent.IO_ERROR, function (evt) {
                console.log('[NetClient] socket io error');
                _this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR);
            }, null);
            _this.sock.type = egret.WebSocket.TYPE_BINARY;
            cb(null);
        });
    };
    __egretProto__.connect = function (host, port) {
        if (this.sock === undefined) {
            console.error('[NetClient] not initialized yet');
            return;
        }
        this.sock.connect(host, port);
    };
    __egretProto__.send = function (vo) {
        if (this.sock === undefined || !this.sock.connected) {
            console.error('[NetClient] socket connected yet');
            return;
        }
        var code;
        try {
            code = vo.$options.code;
        }
        catch (err) {
            console.log('[NetClient] not a valid protobuf message, data=%j', vo);
            return;
        }
        var bytes = new egret.ByteArray(vo.toArrayBuffer());
        var data = new egret.ByteArray(new ArrayBuffer(bytes.length + 4));
        data.endian = egret.Endian.LITTLE_ENDIAN;
        data.writeShort(bytes.length + 4);
        data.writeShort(code);
        data.writeBytes(bytes);
        this.sock.writeBytes(data);
        console.log('[NetClient] data sent, len=%d, data=%j', data.length, vo);
    };
    Object.defineProperty(__egretProto__, "message", {
        get: function () {
            return this.protoRoot;
        },
        enumerable: true,
        configurable: true
    });
    return NetClient;
})(egret.EventDispatcher);
NetClient.prototype.__class__ = "NetClient";
//# sourceMappingURL=NetClient.js.map