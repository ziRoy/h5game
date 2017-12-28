/**
 * Created by yinqing on 15-2-28.
 */
var EffectFrameInfo = (function () {
    function EffectFrameInfo() {
    }
    var __egretProto__ = EffectFrameInfo.prototype;
    return EffectFrameInfo;
})();
EffectFrameInfo.prototype.__class__ = "EffectFrameInfo";
var SpccEffectConfig = (function () {
    function SpccEffectConfig() {
        this.frames = [];
    }
    var __egretProto__ = SpccEffectConfig.prototype;
    return SpccEffectConfig;
})();
SpccEffectConfig.prototype.__class__ = "SpccEffectConfig";
var SpccMovieClip = (function (_super) {
    __extends(SpccMovieClip, _super);
    function SpccMovieClip(id, cb, target) {
        var _this = this;
        _super.call(this);
        this.m_fps = 24;
        this.RES_DIR = "assets/effect";
        this.m_id = id;
        this.m_content = new egret.Bitmap();
        this.m_curFrame = 0;
        this.m_frameTT = 1000 / this.m_fps;
        this.m_frameCT = 0;
        this.addChild(this.m_content);
        new AssetGroup("spcc_" + this.m_id).appendRes("spcc_" + this.m_id + "_config", "bin", this.RES_DIR + "/ef" + this.m_id + "/ef" + this.m_id + ".spcc").appendRes("spcc_" + this.m_id + "_tex", "sheet", this.RES_DIR + "/ef" + this.m_id + "/ef" + this.m_id + "-hd.json").load(function () {
            _this.m_config = _this.loadConfig(new egret.ByteArray(RES.getRes("spcc_" + _this.m_id + "_config")));
            cb.call(target, _this);
        });
    }
    var __egretProto__ = SpccMovieClip.prototype;
    __egretProto__.play = function (loop) {
        if (loop === void 0) { loop = false; }
        this.m_loop = loop;
        egret.Ticker.getInstance().register(this.tick, this);
    };
    __egretProto__.stop = function () {
        egret.Ticker.getInstance().unregister(this.tick, this);
    };
    __egretProto__.tick = function (time) {
        this.m_frameCT += time;
        if (this.m_frameCT < this.m_frameTT)
            return;
        var passFrame = Math.floor(this.m_frameCT / this.m_frameTT);
        this.m_frameCT -= this.m_frameTT * passFrame;
        var newFrame = this.m_curFrame + passFrame;
        var stop = false;
        var len = this.m_config.frames.length;
        if (this.m_loop) {
            newFrame %= len;
        }
        else if (newFrame >= len) {
            stop = true;
            if (len > 0)
                newFrame = len - 1;
            else
                return;
        }
        this.setFrameIdx(newFrame);
        if (stop) {
            this.dispatchEventWith(egret.Event.COMPLETE);
            this.stop();
        }
    };
    __egretProto__.setFrameIdx = function (idx) {
        if (idx >= this.m_config.frames.length) {
            console.error("Spcc Frame Idx Out Of Range, idx=" + idx + ", len=" + this.m_config.frames.length);
            return;
        }
        if (this.m_curFrame == idx)
            return;
        this.m_curFrame = idx;
        var info = this.m_config.frames[idx];
        if (info.pngIdx == -1) {
            this.m_content.texture = null;
        }
        else {
            this.m_content.texture = RES.getRes("ef" + this.m_id + "_" + info.pngIdx);
            this.m_content.scaleX = this.m_content.scaleY = this.m_config.lessScale;
            this.m_content.x = info.offsetX;
            this.m_content.y = info.offsetY;
        }
    };
    __egretProto__.loadConfig = function (data) {
        data.endian = egret.Endian.LITTLE_ENDIAN;
        function readFrame() {
            var ret = new EffectFrameInfo();
            ret.pngIdx = data.readByte();
            if (ret.pngIdx != -1) {
                ret.offsetX = data.readInt();
                ret.offsetY = data.readInt();
            }
            return ret;
        }
        var out = new SpccEffectConfig();
        var frameCount = data.readUnsignedShort();
        for (var i = 0; i < frameCount; i++) {
            out.frames.push(readFrame());
        }
        out.lessScale = data.readUnsignedInt() / 1000;
        return out;
    };
    return SpccMovieClip;
})(egret.DisplayObjectContainer);
SpccMovieClip.prototype.__class__ = "SpccMovieClip";
//# sourceMappingURL=SpccMovieClip.js.map