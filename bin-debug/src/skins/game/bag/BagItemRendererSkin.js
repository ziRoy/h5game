var skins;
(function (skins) {
    var game;
    (function (game) {
        var bag;
        (function (bag) {
            var BagItemRendererSkin = (function (_super) {
                __extends(BagItemRendererSkin, _super);
                function BagItemRendererSkin() {
                    _super.call(this);
                    this.__s = egret.gui.setProperties;
                    this.__s(this, ["height", "width"], [106, 385]);
                    this.elementsContent = [this.__3_i(), this.__16_i()];
                    this.states = [
                        new egret.gui.State("normal", []),
                        new egret.gui.State("disabled", [])
                    ];
                }
                var __egretProto__ = BagItemRendererSkin.prototype;
                Object.defineProperty(__egretProto__, "skinParts", {
                    get: function () {
                        return BagItemRendererSkin._skinParts;
                    },
                    enumerable: true,
                    configurable: true
                });
                __egretProto__.__11_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    this.__s(t, ["gap", "horizontalAlign"], [5, "center"]);
                    return t;
                };
                __egretProto__.__12_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    return t;
                };
                __egretProto__.__13_i = function () {
                    var t = new egret.gui.Label();
                    this.__s(t, ["bold", "size", "text", "textColor"], [true, 18, "拥有:", 0x224433]);
                    return t;
                };
                __egretProto__.__14_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__12_i();
                    t.elementsContent = [this.__13_i(), this.lblItemNum_i()];
                    return t;
                };
                __egretProto__.__15_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__11_i();
                    t.elementsContent = [this.__14_i(), this.btnUseItem_i()];
                    return t;
                };
                __egretProto__.__16_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__4_i();
                    t.elementsContent = [this.__10_i(), this.__15_i()];
                    return t;
                };
                __egretProto__.__3_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "bg_2", 100]);
                    return t;
                };
                __egretProto__.__4_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "padding", "verticalAlign"], [15, 13, "middle"]);
                    return t;
                };
                __egretProto__.__5_i = function () {
                    var t = new egret.gui.UIAsset();
                    t.source = "bg_4";
                    return t;
                };
                __egretProto__.__6_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "verticalAlign"], [15, "middle"]);
                    return t;
                };
                __egretProto__.__7_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    this.__s(t, ["gap", "horizontalAlign"], [5, "center"]);
                    return t;
                };
                __egretProto__.__8_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__7_i();
                    t.elementsContent = [this.lblItemName_i(), this.lblItemDesc_i()];
                    return t;
                };
                __egretProto__.__9_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__6_i();
                    t.elementsContent = [this.picItemIcon_i(), this.__8_i()];
                    return t;
                };
                __egretProto__.btnUseItem_i = function () {
                    var t = new egret.gui.Button();
                    this.btnUseItem = t;
                    this.__s(t, ["height", "label", "width"], [40, "使用", 120]);
                    return t;
                };
                __egretProto__.lblItemDesc_i = function () {
                    var t = new egret.gui.Label();
                    this.lblItemDesc = t;
                    this.__s(t, ["height", "size", "text", "width"], [60, 18, "物品名称物品描述描述描述描述描述", 140]);
                    return t;
                };
                __egretProto__.lblItemName_i = function () {
                    var t = new egret.gui.Label();
                    this.lblItemName = t;
                    this.__s(t, ["height", "size", "text", "textColor", "width"], [20, 18, "物品名称", 0xff0000, 140]);
                    return t;
                };
                __egretProto__.lblItemNum_i = function () {
                    var t = new egret.gui.Label();
                    this.lblItemNum = t;
                    this.__s(t, ["bold", "size", "text", "textColor"], [true, 18, "9999", 0x224433]);
                    return t;
                };
                __egretProto__.picItemIcon_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.picItemIcon = t;
                    t.source = "lv_bg_2";
                    return t;
                };
                __egretProto__.__10_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__5_i(), this.__9_i()];
                    return t;
                };
                BagItemRendererSkin._skinParts = ["picItemIcon", "lblItemName", "lblItemDesc", "lblItemNum", "btnUseItem"];
                return BagItemRendererSkin;
            })(egret.gui.Skin);
            bag.BagItemRendererSkin = BagItemRendererSkin;
            BagItemRendererSkin.prototype.__class__ = "skins.game.bag.BagItemRendererSkin";
        })(bag = game.bag || (game.bag = {}));
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
//# sourceMappingURL=BagItemRendererSkin.js.map