var skins;
(function (skins) {
    var BagItemRendererSkin = (function (_super) {
        __extends(BagItemRendererSkin, _super);
        function BagItemRendererSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [64, 64]);
            this.elementsContent = [this.__5_i()];
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
        __egretProto__.__4_i = function () {
            var t = new egret.gui.UIAsset();
            t.source = "closebtn_disabled_png";
            return t;
        };
        __egretProto__.__5_i = function () {
            var t = new egret.gui.Group();
            t.layout = this.__3_i();
            t.elementsContent = [this.__4_i(), this.lblText_i()];
            return t;
        };
        __egretProto__.lblText_i = function () {
            var t = new egret.gui.Label();
            this.lblText = t;
            this.__s(t, ["size", "text"], [18, "123"]);
            return t;
        };
        __egretProto__.__3_i = function () {
            var t = new egret.gui.VerticalLayout();
            t.horizontalAlign = "center";
            return t;
        };
        BagItemRendererSkin._skinParts = ["lblText"];
        return BagItemRendererSkin;
    })(egret.gui.Skin);
    skins.BagItemRendererSkin = BagItemRendererSkin;
    BagItemRendererSkin.prototype.__class__ = "skins.BagItemRendererSkin";
})(skins || (skins = {}));
//# sourceMappingURL=BagItemRendererSkin.js.map