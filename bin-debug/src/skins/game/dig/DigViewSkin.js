var skins;
(function (skins) {
    var game;
    (function (game) {
        var dig;
        (function (dig) {
            var DigViewSkin = (function (_super) {
                __extends(DigViewSkin, _super);
                function DigViewSkin() {
                    _super.call(this);
                    this.__s = egret.gui.setProperties;
                    this.__s(this, ["height", "width"], [640, 400]);
                    this.elementsContent = [this.__1_i(), this.__23_i()];
                }
                var __egretProto__ = DigViewSkin.prototype;
                Object.defineProperty(__egretProto__, "skinParts", {
                    get: function () {
                        return DigViewSkin._skinParts;
                    },
                    enumerable: true,
                    configurable: true
                });
                __egretProto__.__11_i = function () {
                    var t = new egret.gui.UIAsset();
                    t.source = "gonglue_jiantou";
                    return t;
                };
                __egretProto__.__12_i = function () {
                    var t = new egret.gui.Group();
                    t.percentWidth = 100;
                    t.layout = this.__3_i();
                    t.elementsContent = [this.picLeftIcon_i(), this.__10_i(), this.__11_i()];
                    return t;
                };
                __egretProto__.__13_i = function () {
                    var t = new egret.gui.Rect();
                    this.__s(t, ["height", "strokeAlpha", "strokeColor", "strokeWeight", "percentWidth"], [130, 1, 0x0, 3, 95]);
                    return t;
                };
                __egretProto__.__14_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "verticalAlign"], [20, "center"]);
                    return t;
                };
                __egretProto__.__15_i = function () {
                    var t = new egret.gui.Spacer();
                    t.width = 40;
                    return t;
                };
                __egretProto__.__16_i = function () {
                    var t = new egret.gui.Button();
                    this.__s(t, ["height", "label", "width"], [30, "+", 30]);
                    return t;
                };
                __egretProto__.__17_i = function () {
                    var t = new egret.gui.Group();
                    t.percentWidth = 100;
                    t.layout = this.__14_i();
                    t.elementsContent = [this.__15_i(), this.pbProgress_i(), this.__16_i()];
                    return t;
                };
                __egretProto__.__18_i = function () {
                    var t = new egret.gui.TileLayout();
                    this.__s(t, ["orientation", "requestedColumnCount"], ["rows", 2]);
                    return t;
                };
                __egretProto__.__19_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    return t;
                };
                __egretProto__.__1_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "bg", 100]);
                    return t;
                };
                __egretProto__.__20_i = function () {
                    var t = new egret.gui.Label();
                    this.__s(t, ["size", "text", "percentWidth"], [18, "123456789012345678901234567890", 80]);
                    return t;
                };
                __egretProto__.__21_i = function () {
                    var t = new egret.gui.Button();
                    this.__s(t, ["height", "label", "width"], [50, "使用", 80]);
                    return t;
                };
                __egretProto__.__22_i = function () {
                    var t = new egret.gui.Group();
                    t.percentWidth = 100;
                    t.layout = this.__19_i();
                    t.elementsContent = [this.__20_i(), this.__21_i()];
                    return t;
                };
                __egretProto__.__23_i = function () {
                    var t = new egret.gui.Group();
                    this.__s(t, ["bottom", "top", "percentWidth"], [60, 50, 100]);
                    t.layout = this.__2_i();
                    t.elementsContent = [this.__12_i(), this.__13_i(), this.__17_i(), this.dgDigItem_i(), this.__22_i()];
                    return t;
                };
                __egretProto__.__2_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    t.horizontalAlign = "center";
                    return t;
                };
                __egretProto__.__3_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["horizontalAlign", "verticalAlign"], ["center", "middle"]);
                    return t;
                };
                __egretProto__.__4_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    return t;
                };
                __egretProto__.__5_i = function () {
                    var t = new egret.gui.Button();
                    this.__s(t, ["icon", "skinName"], ["zhucheng_renwu", skins.dw.IconLabelSkin]);
                    return t;
                };
                __egretProto__.__6_i = function () {
                    var t = new egret.gui.Button();
                    this.__s(t, ["icon", "skinName"], ["zhucheng_renwu", skins.dw.IconLabelSkin]);
                    return t;
                };
                __egretProto__.__7_i = function () {
                    var t = new egret.gui.Button();
                    this.__s(t, ["icon", "skinName"], ["zhucheng_renwu", skins.dw.IconLabelSkin]);
                    return t;
                };
                __egretProto__.__8_i = function () {
                    var t = new egret.gui.Button();
                    this.__s(t, ["icon", "skinName"], ["zhucheng_renwu", skins.dw.IconLabelSkin]);
                    return t;
                };
                __egretProto__.__9_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__4_i();
                    t.elementsContent = [this.__5_i(), this.__6_i(), this.__7_i(), this.__8_i()];
                    return t;
                };
                __egretProto__.dgDigItem_i = function () {
                    var t = new egret.gui.DataGroup();
                    this.dgDigItem = t;
                    t.percentWidth = 100;
                    t.layout = this.__18_i();
                    return t;
                };
                __egretProto__.pbProgress_i = function () {
                    var t = new ProgressBar();
                    this.pbProgress = t;
                    this.__s(t, ["height", "skinName", "value", "percentWidth"], [30, skins.dw.ProgressBarSkin, 30, 50]);
                    return t;
                };
                __egretProto__.picLeftIcon_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.picLeftIcon = t;
                    t.source = "gonglue_jiantou";
                    return t;
                };
                __egretProto__.__10_i = function () {
                    var t = new egret.gui.Scroller();
                    this.__s(t, ["horizontalScrollPolicy", "percentWidth"], ["auto", 80]);
                    t.viewport = this.__9_i();
                    return t;
                };
                DigViewSkin._skinParts = ["picLeftIcon", "pbProgress", "dgDigItem"];
                return DigViewSkin;
            })(egret.gui.Skin);
            dig.DigViewSkin = DigViewSkin;
            DigViewSkin.prototype.__class__ = "skins.game.dig.DigViewSkin";
        })(dig = game.dig || (game.dig = {}));
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
//# sourceMappingURL=DigViewSkin.js.map