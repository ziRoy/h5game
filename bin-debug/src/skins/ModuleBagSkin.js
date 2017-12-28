var skins;
(function (skins) {
    var ModuleBagSkin = (function (_super) {
        __extends(ModuleBagSkin, _super);
        function ModuleBagSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [640, 400]);
            this.elementsContent = [this.dgItem_i()];
        }
        var __egretProto__ = ModuleBagSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return ModuleBagSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.dgItem_i = function () {
            var t = new egret.gui.DataGroup();
            this.dgItem = t;
            this.__s(t, ["bottom", "horizontalCenter", "top"], [40, 0, 60]);
            t.layout = this.__1_i();
            return t;
        };
        __egretProto__.__1_i = function () {
            var t = new egret.gui.TileLayout();
            this.__s(t, ["orientation", "requestedColumnCount"], ["rows", 5]);
            return t;
        };
        ModuleBagSkin._skinParts = ["heroItem"];
        return ModuleBagSkin;
    })(egret.gui.Skin);
    skins.ModuleBagSkin = ModuleBagSkin;
    ModuleBagSkin.prototype.__class__ = "skins.ModuleBagSkin";
})(skins || (skins = {}));
//# sourceMappingURL=ModuleBagSkin.js.map