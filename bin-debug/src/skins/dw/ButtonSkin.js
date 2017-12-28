var skins;
(function (skins) {
    var dw;
    (function (dw) {
        var ButtonSkin = (function (_super) {
            __extends(ButtonSkin, _super);
            function ButtonSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.elementsContent = [this.__7_i()];
                this.states = [
                    new egret.gui.State("up", [
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0x111111)
                    ]),
                    new egret.gui.State("down", [
                        new egret.gui.SetProperty("__4", "source", "anniu_2"),
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0x222222),
                        new egret.gui.SetProperty("labelDisplay", "size", 22),
                        new egret.gui.SetProperty("__7", "percentWidth", 90),
                        new egret.gui.SetProperty("__7", "percentHeight", 90)
                    ]),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("__4", "source", "anniu_7"),
                        new egret.gui.SetProperty("labelDisplay", "textColor", 0xcccccc)
                    ])
                ];
            }
            var __egretProto__ = ButtonSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ButtonSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__5_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [0, "center", "middle"]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["bottom", "left", "right", "top"], [5, 5, 5, 5]);
                t.layout = this.__5_i();
                t.elementsContent = [this.iconDisplay_i(), this.labelDisplay_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.Group();
                this.__7 = t;
                this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                t.elementsContent = [this.__4_i(), this.__6_i()];
                return t;
            };
            __egretProto__.iconDisplay_i = function () {
                var t = new egret.gui.UIAsset();
                this.iconDisplay = t;
                return t;
            };
            __egretProto__.labelDisplay_i = function () {
                var t = new egret.gui.Label();
                this.labelDisplay = t;
                this.__s(t, ["fontFamily", "paddingLeft", "paddingRight", "size", "textAlign", "verticalAlign"], ["黑体-简 中等", 5, 5, 24, "center", "middle"]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__4 = t;
                this.__s(t, ["bottom", "left", "right", "scale9Grid", "source", "top"], [0, 0, 0, egret.gui.getScale9Grid("2,3,175,57"), "anniu_1", 0]);
                return t;
            };
            ButtonSkin._skinParts = ["iconDisplay", "labelDisplay"];
            return ButtonSkin;
        })(egret.gui.Skin);
        dw.ButtonSkin = ButtonSkin;
        ButtonSkin.prototype.__class__ = "skins.dw.ButtonSkin";
    })(dw = skins.dw || (skins.dw = {}));
})(skins || (skins = {}));
//# sourceMappingURL=ButtonSkin.js.map