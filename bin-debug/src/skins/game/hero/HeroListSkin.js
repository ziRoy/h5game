var skins;
(function (skins) {
    var game;
    (function (game) {
        var hero;
        (function (hero) {
            var HeroListSkin = (function (_super) {
                __extends(HeroListSkin, _super);
                function HeroListSkin() {
                    _super.call(this);
                    this.__s = egret.gui.setProperties;
                    this.__s(this, ["height", "width"], [111, 400]);
                    this.elementsContent = [this.__1_i(), this.__2_i()];
                }
                var __egretProto__ = HeroListSkin.prototype;
                __egretProto__.__1_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["left", "source", "top"], [30, "bg_yingxiong_1", 2]);
                    return t;
                };
                __egretProto__.__2_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "left", "scale9Grid", "source", "top", "width"], [35, 65, egret.gui.getScale9Grid("13,12,84,6"), "bg_3", 8, 325]);
                    return t;
                };
                return HeroListSkin;
            })(egret.gui.Skin);
            hero.HeroListSkin = HeroListSkin;
            HeroListSkin.prototype.__class__ = "skins.game.hero.HeroListSkin";
        })(hero = game.hero || (game.hero = {}));
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
//# sourceMappingURL=HeroListSkin.js.map