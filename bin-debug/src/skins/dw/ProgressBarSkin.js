var skins;
(function (skins) {
    var dw;
    (function (dw) {
        var ProgressBarSkin = (function (_super) {
            __extends(ProgressBarSkin, _super);
            function ProgressBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.elementsContent = [this.track_i(), this.thumb_i(), this.labelDisplay_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ProgressBarSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ProgressBarSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["left", "maxDisplayedLines", "right", "size", "stroke", "strokeColor", "textAlign", "textColor", "verticalAlign", "verticalCenter"], [5, 1, 5, 20, 2, 0x000000, "center", 0xFFFFFF, "middle", 0]);
                return t;
            };
            __egretProto__.thumb_i = function () {
                var t = new egret.gui.UIAsset();
                this.thumb = t;
                this.__s(t, ["percentHeight", "scale9Grid", "source", "percentWidth"], [100, egret.gui.getScale9Grid("27,19,648,8"), "denglu_jd_2", 100]);
                return t;
            };
            __egretProto__.track_i = function () {
                var t = new egret.gui.UIAsset();
                this.track = t;
                this.__s(t, ["percentHeight", "scale9Grid", "source", "percentWidth"], [100, egret.gui.getScale9Grid("27,19,645,8"), "denglu_jd_1", 100]);
                return t;
            };
            ProgressBarSkin._skinParts = ["track", "thumb", "labelDisplay"];
            return ProgressBarSkin;
        })(egret.gui.Skin);
        dw.ProgressBarSkin = ProgressBarSkin;
        ProgressBarSkin.prototype.__class__ = "skins.dw.ProgressBarSkin";
    })(dw = skins.dw || (skins.dw = {}));
})(skins || (skins = {}));
//# sourceMappingURL=ProgressBarSkin.js.map