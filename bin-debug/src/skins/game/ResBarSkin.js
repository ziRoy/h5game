var skins;
(function (skins) {
    var game;
    (function (game) {
        var ResBarSkin = (function (_super) {
            __extends(ResBarSkin, _super);
            function ResBarSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [640, 400]);
                this.elementsContent = [this.__10_i()];
            }
            var __egretProto__ = ResBarSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ResBarSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__1_i = function () {
                var t = new egret.gui.HorizontalLayout();
                this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [5, "left", "top"]);
                return t;
            };
            __egretProto__.__2_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "top"], ["lv_bg_2", -5]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Group();
                t.elementsContent = [this.lvProgress_i(), this.__2_i(), this.rolelevel_i()];
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width"], [egret.gui.getScale9Grid("2,3,129,20"), "lv_bg", 120]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "left", "scaleX", "scaleY", "source", "top"], [true, 5, 0.5, 0.5, "ziyuan_liliangdian", 2]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.Group();
                t.elementsContent = [this.__4_i(), this.__5_i(), this.lblEnergy_i()];
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width"], [egret.gui.getScale9Grid("2,3,129,20"), "lv_bg", 130]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["autoScale", "left", "scaleX", "scaleY", "source", "top"], [true, 5, 0.5, 0.5, "ziyuan_gold", 3]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.Group();
                t.elementsContent = [this.__7_i(), this.__8_i(), this.lblGold_i()];
                return t;
            };
            __egretProto__.lblEnergy_i = function () {
                var t = new egret.gui.Label();
                this.lblEnergy = t;
                this.__s(t, ["cacheAsBitmap", "horizontalCenter", "size", "stroke", "strokeColor", "text", "verticalCenter"], [true, 15, 18, 2, 0x0, "20/30", 0]);
                return t;
            };
            __egretProto__.lblGold_i = function () {
                var t = new egret.gui.Label();
                this.lblGold = t;
                this.__s(t, ["cacheAsBitmap", "horizontalCenter", "size", "stroke", "strokeColor", "text", "verticalCenter"], [true, 10, 18, 2, 0x0, "123456789", 0]);
                return t;
            };
            __egretProto__.lvProgress_i = function () {
                var t = new egret.gui.ProgressBar();
                this.lvProgress = t;
                this.__s(t, ["left", "skinName", "value"], [30, skins.dw.LevelBarSkin, 100]);
                return t;
            };
            __egretProto__.rolelevel_i = function () {
                var t = new egret.gui.Label();
                this.rolelevel = t;
                this.__s(t, ["bold", "size", "text", "textColor", "top", "x"], [true, 22, "1", 0xFF1111, 3, 13]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.Group();
                this.__s(t, ["left", "top"], [0, 5]);
                t.layout = this.__1_i();
                t.elementsContent = [this.__3_i(), this.__6_i(), this.__9_i()];
                return t;
            };
            ResBarSkin._skinParts = ["lvProgress", "rolelevel", "lblEnergy", "lblGold"];
            return ResBarSkin;
        })(egret.gui.Skin);
        game.ResBarSkin = ResBarSkin;
        ResBarSkin.prototype.__class__ = "skins.game.ResBarSkin";
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
//# sourceMappingURL=ResBarSkin.js.map