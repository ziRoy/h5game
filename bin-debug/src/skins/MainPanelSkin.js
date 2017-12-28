var skins;
(function (skins) {
    var MainPanelSkin = (function (_super) {
        __extends(MainPanelSkin, _super);
        function MainPanelSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [640, 400]);
            this.elementsContent = [this.content_i(), this.resBar_i(), this.navigatorBar_i()];
        }
        var __egretProto__ = MainPanelSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return MainPanelSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.navigatorBar_i = function () {
            var t = new egret.gui.SkinnableComponent();
            this.navigatorBar = t;
            t.skinName = skins.NavigatorBarSkin;
            return t;
        };
        __egretProto__.resBar_i = function () {
            var t = new egret.gui.SkinnableComponent();
            this.resBar = t;
            t.skinName = skins.ResBarSkin;
            return t;
        };
        __egretProto__.content_i = function () {
            var t = new egret.gui.Group();
            this.content = t;
            this.__s(t, ["bottom", "horizontalCenter", "top", "percentWidth"], [0, 0, 0, 100]);
            return t;
        };
        MainPanelSkin._skinParts = ["content", "resBar", "navigatorBar"];
        return MainPanelSkin;
    })(egret.gui.Skin);
    skins.MainPanelSkin = MainPanelSkin;
    MainPanelSkin.prototype.__class__ = "skins.MainPanelSkin";
})(skins || (skins = {}));
//# sourceMappingURL=MainPanelSkin.js.map