/**
 * Created by yinqing on 15-4-13.
 */
var ProgressBar = (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar() {
        _super.call(this);
        this.thumb = null;
        this.track = null;
        this.labelDisplay = null;
        this.maxValue = 100;
        this.curValue = 0;
    }
    var __egretProto__ = ProgressBar.prototype;
    __egretProto__.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.update();
    };
    __egretProto__.updateDisplayList = function (unscaledWidth, unscaledHeight) {
        _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
        this.update();
    };
    Object.defineProperty(__egretProto__, "value", {
        get: function () {
            return this.curValue;
        },
        set: function (v) {
            if (isNaN(v))
                return;
            this.curValue = Math.min(Math.max(v, 0), this.maxValue);
            //this.validateProperties();
            this.invalidateDisplayList();
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.update = function () {
        if (!this.thumb || !this.track)
            return;
        var trackWidth = isNaN(this.track.width) ? 0 : this.track.width;
        trackWidth *= this.track.scaleX;
        var trackHeight = isNaN(this.track.height) ? 0 : this.track.height;
        trackHeight *= this.track.scaleY;
        var thumbWidth = Math.round((this.curValue / this.maxValue) * trackWidth);
        if (isNaN(thumbWidth) || thumbWidth < 0 || thumbWidth === Infinity)
            thumbWidth = 0;
        if (!this.thumb.mask)
            this.thumb.mask = new egret.Rectangle(0, 0, this.thumb.width, this.thumb.height);
        this.thumb.mask.width = thumbWidth;
        this.thumb.mask.height = trackHeight;
        var p = this.track.localToGlobal(0, 0);
        var thumbPos = this.globalToLocal(p.x, p.y);
        this.thumb.x = thumbPos.x;
        if (this.labelDisplay) {
            this.labelDisplay.text = this.curValue + "/" + this.maxValue;
        }
    };
    return ProgressBar;
})(egret.gui.SkinnableComponent);
ProgressBar.prototype.__class__ = "ProgressBar";
//# sourceMappingURL=ProgressBar.js.map