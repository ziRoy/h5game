var skins;
(function (skins) {
    var game;
    (function (game) {
        var dig;
        (function (dig) {
            var DigItemRendererSkin = (function (_super) {
                __extends(DigItemRendererSkin, _super);
                function DigItemRendererSkin() {
                    _super.call(this);
                    this.__s = egret.gui.setProperties;
                    this.__s(this, ["height", "width"], [75, 180]);
                    this.elementsContent = [this.__4_i()];
                    this.states = [
                        new egret.gui.State("normal", []),
                        new egret.gui.State("disabled", [])
                    ];
                }
                var __egretProto__ = DigItemRendererSkin.prototype;
                Object.defineProperty(__egretProto__, "skinParts", {
                    get: function () {
                        return DigItemRendererSkin._skinParts;
                    },
                    enumerable: true,
                    configurable: true
                });
                __egretProto__.__4_i = function () {
                    var t = new egret.gui.Group();
                    this.__s(t, ["percentHeight", "percentWidth"], [100, 100]);
                    t.layout = this.__3_i();
                    t.elementsContent = [this.picDigIcon_i(), this.lblDesc_i()];
                    return t;
                };
                __egretProto__.lblDesc_i = function () {
                    var t = new egret.gui.Label();
                    this.lblDesc = t;
                    this.__s(t, ["size", "text", "textColor"], [22, "拯救企鹅", 0xff0000]);
                    return t;
                };
                __egretProto__.picDigIcon_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.picDigIcon = t;
                    t.source = "anniu_5";
                    return t;
                };
                __egretProto__.__3_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["paddingLeft", "verticalAlign"], [10, "middle"]);
                    return t;
                };
                DigItemRendererSkin._skinParts = ["picDigIcon", "lblDesc"];
                return DigItemRendererSkin;
            })(egret.gui.Skin);
            dig.DigItemRendererSkin = DigItemRendererSkin;
            DigItemRendererSkin.prototype.__class__ = "skins.game.dig.DigItemRendererSkin";
        })(dig = game.dig || (game.dig = {}));
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
//# sourceMappingURL=DigItemRendererSkin.js.map