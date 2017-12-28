var skins;
(function (skins) {
    var game;
    (function (game) {
        var hero;
        (function (hero) {
            var HeroItemRendererSkin = (function (_super) {
                __extends(HeroItemRendererSkin, _super);
                function HeroItemRendererSkin() {
                    _super.call(this);
                    this.__s = egret.gui.setProperties;
                    this.__s(this, ["height", "width"], [57, 57]);
                    this.elementsContent = [this.__5_i()];
                    this.states = [
                        new egret.gui.State("up", []),
                        new egret.gui.State("down", [
                            new egret.gui.SetProperty("__4", "source", "bg_4"),
                            new egret.gui.SetProperty("__5", "percentWidth", 90),
                            new egret.gui.SetProperty("__5", "percentHeight", 90)
                        ]),
                        new egret.gui.State("disabled", [
                            new egret.gui.SetProperty("__4", "source", "bg_4")
                        ])
                    ];
                }
                var __egretProto__ = HeroItemRendererSkin.prototype;
                Object.defineProperty(__egretProto__, "skinParts", {
                    get: function () {
                        return HeroItemRendererSkin._skinParts;
                    },
                    enumerable: true,
                    configurable: true
                });
                __egretProto__.__5_i = function () {
                    var t = new egret.gui.Group();
                    this.__5 = t;
                    this.__s(t, ["percentHeight", "horizontalCenter", "verticalCenter", "percentWidth"], [100, 0, 0, 100]);
                    t.elementsContent = [this.__4_i(), this.picGou_i(), this.picLock_i()];
                    return t;
                };
                __egretProto__.picGou_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.picGou = t;
                    this.__s(t, ["left", "source", "top", "visible"], [30, "gou", 30, false]);
                    return t;
                };
                __egretProto__.picLock_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.picLock = t;
                    this.__s(t, ["percentHeight", "source", "visible", "percentWidth"], [100, "suo", false, 100]);
                    return t;
                };
                __egretProto__.__4_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__4 = t;
                    this.__s(t, ["bottom", "left", "right", "scale9Grid", "source", "top"], [0, 0, 0, egret.gui.getScale9Grid("29,10,179,62"), "bg_4", 0]);
                    return t;
                };
                HeroItemRendererSkin._skinParts = ["picGou", "picLock"];
                return HeroItemRendererSkin;
            })(egret.gui.Skin);
            hero.HeroItemRendererSkin = HeroItemRendererSkin;
            HeroItemRendererSkin.prototype.__class__ = "skins.game.hero.HeroItemRendererSkin";
        })(hero = game.hero || (game.hero = {}));
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
//# sourceMappingURL=HeroItemRendererSkin.js.map