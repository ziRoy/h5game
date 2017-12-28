/**
 * Created by yinqing on 15-3-2.
 */
var HpBar = (function (_super) {
    __extends(HpBar, _super);
    function HpBar(inner, outer) {
        _super.call(this);
        this.m_percent = 0;
        this.useTween = true;
        this.m_inner = inner;
        this.m_outer = outer;
        this.m_inner.anchorX = 0;
        this.m_inner.anchorY = 0.5;
        this.m_inner.x = (this.m_outer.width - this.m_inner.width) / 2;
        this.m_inner.mask = new egret.Rectangle(0, 0, this.m_inner.width, this.m_inner.height);
        this.m_outer.anchorX = 0;
        this.m_outer.anchorY = 0.5;
        this.m_text = new egret.TextField();
        this.m_text.textColor = 0xffffff;
        this.m_text.strokeColor = 0x000000;
        this.m_text.stroke = 1;
        this.m_text.size = this.m_inner.height;
        this.m_text.textAlign = egret.HorizontalAlign.LEFT;
        this.m_text.anchorX = 0;
        this.m_text.anchorY = 0.5;
        this.m_text.x = 15;
        this.m_text.cacheAsBitmap = true;
        this.addChild(this.m_outer);
        this.addChild(this.m_inner);
        this.addChild(this.m_text);
    }
    var __egretProto__ = HpBar.prototype;
    Object.defineProperty(__egretProto__, "percent", {
        set: function (p) {
            if (this.m_percent != p) {
                if (this.useTween) {
                    egret.Tween.removeTweens(this.m_inner.mask);
                    egret.Tween.get(this.m_inner.mask).to({ width: this.m_inner.width * p }, 300);
                }
                else {
                    this.m_inner.mask.width = this.m_inner.width * p;
                }
            }
            this.m_percent = p;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "text", {
        set: function (t) {
            this.m_text.text = t;
        },
        enumerable: true,
        configurable: true
    });
    return HpBar;
})(egret.DisplayObjectContainer);
HpBar.prototype.__class__ = "HpBar";
//# sourceMappingURL=HpBar.js.map