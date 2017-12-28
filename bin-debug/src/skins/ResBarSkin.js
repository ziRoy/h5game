var skins;
(function (skins) {
    var ResBarSkin = (function (_super) {
        __extends(ResBarSkin, _super);
        function ResBarSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [640, 400]);
            this.elementsContent = [this.__8_i()];
        }
        var __egretProto__ = ResBarSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return ResBarSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.__2_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["height", "left", "scale9Grid", "source", "verticalCenter", "width"], [35, 6, egret.gui.getScale9Grid("23,17,376,63"), "tips_neirong", 5, 120]);
            return t;
        };
        __egretProto__.__3_i = function () {
            var t = new egret.gui.UIAsset();
            t.source = "ziyuan_liliangdian";
            return t;
        };
        __egretProto__.__4_i = function () {
            var t = new egret.gui.Group();
            t.elementsContent = [this.__2_i(), this.__3_i(), this.lblEnergy_i()];
            return t;
        };
        __egretProto__.__5_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["height", "left", "scale9Grid", "source", "top", "width"], [35, 6, egret.gui.getScale9Grid("23,17,376,63"), "tips_neirong", 15, 160]);
            return t;
        };
        __egretProto__.__6_i = function () {
            var t = new egret.gui.UIAsset();
            t.source = "ziyuan_gold";
            return t;
        };
        __egretProto__.__7_i = function () {
            var t = new egret.gui.Group();
            t.elementsContent = [this.__5_i(), this.__6_i(), this.lblGold_i()];
            return t;
        };
        __egretProto__.__8_i = function () {
            var t = new egret.gui.Group();
            this.__s(t, ["left", "top"], [5, 0]);
            t.layout = this.__1_i();
            t.elementsContent = [this.__4_i(), this.__7_i()];
            return t;
        };
        __egretProto__.lblEnergy_i = function () {
            var t = new egret.gui.Label();
            this.lblEnergy = t;
            this.__s(t, ["horizontalCenter", "size", "stroke", "strokeColor", "text", "verticalCenter"], [15, 18, 2, 0x0, "20/30", 5]);
            return t;
        };
        __egretProto__.lblGold_i = function () {
            var t = new egret.gui.Label();
            this.lblGold = t;
            this.__s(t, ["horizontalCenter", "size", "stroke", "strokeColor", "text", "verticalCenter"], [18, 18, 2, 0x0, "123456789", 7]);
            return t;
        };
        __egretProto__.__1_i = function () {
            var t = new egret.gui.HorizontalLayout();
            this.__s(t, ["horizontalAlign", "padding"], ["left", 5]);
            return t;
        };
        ResBarSkin._skinParts = ["lblEnergy", "lblGold"];
        return ResBarSkin;
    })(egret.gui.Skin);
    skins.ResBarSkin = ResBarSkin;
    ResBarSkin.prototype.__class__ = "skins.ResBarSkin";
})(skins || (skins = {}));
//# sourceMappingURL=ResBarSkin.js.map