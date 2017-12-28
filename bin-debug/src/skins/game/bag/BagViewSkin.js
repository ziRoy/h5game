var skins;
(function (skins) {
    var game;
    (function (game) {
        var bag;
        (function (bag) {
            var BagViewSkin = (function (_super) {
                __extends(BagViewSkin, _super);
                function BagViewSkin() {
                    _super.call(this);
                    this.__s = egret.gui.setProperties;
                    this.__s(this, ["height", "width"], [640, 400]);
                    this.elementsContent = [this.__1_i(), this.__3_i()];
                }
                var __egretProto__ = BagViewSkin.prototype;
                Object.defineProperty(__egretProto__, "skinParts", {
                    get: function () {
                        return BagViewSkin._skinParts;
                    },
                    enumerable: true,
                    configurable: true
                });
                __egretProto__.__2_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    this.__s(t, ["gap", "horizontalAlign"], [10, "center"]);
                    return t;
                };
                __egretProto__.__3_i = function () {
                    var t = new egret.gui.Scroller();
                    this.__s(t, ["bottom", "percentHeight", "horizontalCenter", "top", "verticalScrollPolicy"], [100, 100, 0, 70, "auto"]);
                    t.viewport = this.dgItem_i();
                    return t;
                };
                __egretProto__.dgItem_i = function () {
                    var t = new egret.gui.DataGroup();
                    this.dgItem = t;
                    t.layout = this.__2_i();
                    return t;
                };
                __egretProto__.__1_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "bg", 100]);
                    return t;
                };
                BagViewSkin._skinParts = ["dgItem"];
                return BagViewSkin;
            })(egret.gui.Skin);
            bag.BagViewSkin = BagViewSkin;
            BagViewSkin.prototype.__class__ = "skins.game.bag.BagViewSkin";
        })(bag = game.bag || (game.bag = {}));
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
//# sourceMappingURL=BagViewSkin.js.map