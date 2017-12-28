var skins;
(function (skins) {
    var game;
    (function (game) {
        var tech;
        (function (tech) {
            var TechViewSkin = (function (_super) {
                __extends(TechViewSkin, _super);
                function TechViewSkin() {
                    _super.call(this);
                    this.__s = egret.gui.setProperties;
                    this.__s(this, ["height", "width"], [640, 400]);
                    this.elementsContent = [this.__1_i()];
                }
                var __egretProto__ = TechViewSkin.prototype;
                __egretProto__.__1_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "bg", 100]);
                    return t;
                };
                return TechViewSkin;
            })(egret.gui.Skin);
            tech.TechViewSkin = TechViewSkin;
            TechViewSkin.prototype.__class__ = "skins.game.tech.TechViewSkin";
        })(tech = game.tech || (game.tech = {}));
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
//# sourceMappingURL=TechViewSkin.js.map