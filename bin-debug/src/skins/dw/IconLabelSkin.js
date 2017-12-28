var skins;
(function (skins) {
    var dw;
    (function (dw) {
        var IconLabelSkin = (function (_super) {
            __extends(IconLabelSkin, _super);
            function IconLabelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.elementsContent = [this.__4_i()];
                this.states = [
                    new egret.gui.State("up", []),
                    new egret.gui.State("down", [
                        new egret.gui.SetProperty("iconDisplay", "percentWidth", 90),
                        new egret.gui.SetProperty("iconDisplay", "percentHeight", 90)
                    ]),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = IconLabelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return IconLabelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.iconDisplay_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconDisplay = t;
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                return t;
            };
            __egretProto__.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["bottom", "cacheAsBitmap", "fontFamily", "horizontalCenter", "size", "stroke", "strokeColor"], [0, true, "黑体-简 中等", 0, 18, 2, 0x0]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.Group();
                t.elementsContent = [this.iconDisplay_i(), this.labelDisplay_i()];
                return t;
            };
            IconLabelSkin._skinParts = ["iconDisplay", "labelDisplay"];
            return IconLabelSkin;
        })(egret.gui.Skin);
        dw.IconLabelSkin = IconLabelSkin;
        IconLabelSkin.prototype.__class__ = "skins.dw.IconLabelSkin";
    })(dw = skins.dw || (skins.dw = {}));
})(skins || (skins = {}));
//# sourceMappingURL=IconLabelSkin.js.map