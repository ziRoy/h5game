var skins;
(function (skins) {
    var NavigatorSkin = (function (_super) {
        __extends(NavigatorSkin, _super);
        function NavigatorSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [640, 400]);
            this.elementsContent = [this.__2_i()];
        }
        var __egretProto__ = NavigatorSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return NavigatorSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.__2_i = function () {
            var t = new egret.gui.Group();
            this.__s(t, ["bottom", "left"], [5, 5]);
            t.layout = this.__1_i();
            t.elementsContent = [this.btnStage_i(), this.btnDig_i(), this.btnHero_i(), this.btnBag_i(), this.btnTech_i()];
            return t;
        };
        __egretProto__.btnBag_i = function () {
            var t = new egret.gui.Button();
            this.btnBag = t;
            this.__s(t, ["icon", "label", "skinName"], ["zhucheng_wupinbeibao", "背包", skins.dw.IconLabelSkin]);
            return t;
        };
        __egretProto__.btnDig_i = function () {
            var t = new egret.gui.Button();
            this.btnDig = t;
            this.__s(t, ["icon", "label", "skinName"], ["zhucheng_gonghui", "挂机", skins.dw.IconLabelSkin]);
            return t;
        };
        __egretProto__.btnHero_i = function () {
            var t = new egret.gui.Button();
            this.btnHero = t;
            this.__s(t, ["icon", "label", "skinName"], ["zhucheng_haoyou", "英雄", skins.dw.IconLabelSkin]);
            return t;
        };
        __egretProto__.btnStage_i = function () {
            var t = new egret.gui.Button();
            this.btnStage = t;
            this.__s(t, ["icon", "label", "skinName"], ["zhucheng_buzheng", "冒险", skins.dw.IconLabelSkin]);
            return t;
        };
        __egretProto__.btnTech_i = function () {
            var t = new egret.gui.Button();
            this.btnTech = t;
            this.__s(t, ["icon", "label", "skinName"], ["zhucheng_gonglue", "科技", skins.dw.IconLabelSkin]);
            return t;
        };
        __egretProto__.__1_i = function () {
            var t = new egret.gui.HorizontalLayout();
            this.__s(t, ["horizontalAlign", "padding"], ["left", 10]);
            return t;
        };
        NavigatorSkin._skinParts = ["btnStage", "btnDig", "btnHero", "btnBag", "btnTech"];
        return NavigatorSkin;
    })(egret.gui.Skin);
    skins.NavigatorSkin = NavigatorSkin;
    NavigatorSkin.prototype.__class__ = "skins.NavigatorSkin";
})(skins || (skins = {}));
//# sourceMappingURL=NavigatorSkin.js.map