var skins;
(function (skins) {
    var dw;
    (function (dw) {
        var PanelSkin = (function (_super) {
            __extends(PanelSkin, _super);
            function PanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [300, 400]);
                this.elementsContent = [this.__3_i(), this.moveArea_i(), this.contentGroup_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = PanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return PanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "left", "right", "scale9Grid", "source", "top"], [-4, -2, -2, egret.gui.getScale9Grid("43,10,869,46"), "zhuangbei_biaotilan", -2]);
                return t;
            };
            __egretProto__.contentGroup_i = function () {
                var t = new egret.gui.Group();
                this.contentGroup = t;
                this.__s(t, ["bottom", "clipAndEnableScrolling", "top", "percentWidth"], [0, true, 50, 100]);
                return t;
            };
            __egretProto__.moveArea_i = function () {
                var t = new egret.gui.Group();
                this.moveArea = t;
                this.__s(t, ["height", "left", "right"], [60, 0, 0]);
                t.elementsContent = [this.__4_i(), this.titleDisplay_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["bottom", "left", "right", "scale9Grid", "source", "top"], [0, 0, 0, egret.gui.getScale9Grid("40,26,401,394"), "zhuangbei_6", 0]);
                return t;
            };
            __egretProto__.titleDisplay_i = function () {
                var t = new egret.gui.Label();
                this.titleDisplay = t;
                this.__s(t, ["fontFamily", "left", "maxDisplayedLines", "minHeight", "right", "size", "textAlign", "textColor", "verticalAlign", "verticalCenter"], ["黑体-简 中等", 5, 1, 28, 5, 28, "center", 0xFFFFFF, "middle", -10]);
                return t;
            };
            PanelSkin._skinParts = ["titleDisplay", "moveArea", "contentGroup"];
            return PanelSkin;
        })(egret.gui.Skin);
        dw.PanelSkin = PanelSkin;
        PanelSkin.prototype.__class__ = "skins.dw.PanelSkin";
    })(dw = skins.dw || (skins.dw = {}));
})(skins || (skins = {}));
//# sourceMappingURL=PanelSkin.js.map