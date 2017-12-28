var skins;
(function (skins) {
    var dw;
    (function (dw) {
        var LevelBarSkin = (function (_super) {
            __extends(LevelBarSkin, _super);
            function LevelBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.elementsContent = [this.track_i(), this.thumb_i(), this.labelDisplay_i()];
            }
            var __egretProto__ = LevelBarSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return LevelBarSkin._skinParts;
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
                this.__s(t, ["scale9Grid", "source", "x", "y"], [egret.gui.getScale9Grid("11,10,110,2"), "lv_bg_1", 3, 3]);
                return t;
            };
            __egretProto__.track_i = function () {
                var t = new egret.gui.UIAsset();
                this.track = t;
                this.__s(t, ["scale9Grid", "source"], [egret.gui.getScale9Grid("11,10,110,2"), "lv_bg"]);
                return t;
            };
            LevelBarSkin._skinParts = ["track", "thumb", "labelDisplay"];
            return LevelBarSkin;
        })(egret.gui.Skin);
        dw.LevelBarSkin = LevelBarSkin;
        LevelBarSkin.prototype.__class__ = "skins.dw.LevelBarSkin";
    })(dw = skins.dw || (skins.dw = {}));
})(skins || (skins = {}));
//# sourceMappingURL=LevelBarSkin.js.map