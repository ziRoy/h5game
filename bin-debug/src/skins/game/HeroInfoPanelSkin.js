var skins;
(function (skins) {
    var game;
    (function (game) {
        var HeroInfoPanelSkin = (function (_super) {
            __extends(HeroInfoPanelSkin, _super);
            function HeroInfoPanelSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [640, 400]);
                this.elementsContent = [this.heroInfo_i(), this.resBar_i()];
            }
            var __egretProto__ = HeroInfoPanelSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return HeroInfoPanelSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.resBar_i = function () {
                var t = new egret.gui.SkinnableComponent();
                this.resBar = t;
                t.skinName = skins.game.ResBarSkin;
                return t;
            };
            __egretProto__.heroInfo_i = function () {
                var t = new egret.gui.SkinnableComponent();
                this.heroInfo = t;
                t.skinName = skins.game.hero.HeroListInfoSkin;
                return t;
            };
            HeroInfoPanelSkin._skinParts = ["heroInfo", "resBar"];
            return HeroInfoPanelSkin;
        })(egret.gui.Skin);
        game.HeroInfoPanelSkin = HeroInfoPanelSkin;
        HeroInfoPanelSkin.prototype.__class__ = "skins.game.HeroInfoPanelSkin";
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
//# sourceMappingURL=HeroInfoPanelSkin.js.map