var skins;
(function (skins) {
    var StageMapSkin = (function (_super) {
        __extends(StageMapSkin, _super);
        function StageMapSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [640, 400]);
            this.elementsContent = [this.__2_i()];
        }
        var __egretProto__ = StageMapSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return StageMapSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.__2_i = function () {
            var t = new egret.gui.Scroller();
            this.__s(t, ["horizontalScrollPolicy", "percentWidth"], ["auto", 100]);
            t.viewport = this.__1_i();
            return t;
        };
        __egretProto__.asBg_i = function () {
            var t = new egret.gui.UIAsset();
            this.asBg = t;
            t.source = "stage_bg_1";
            return t;
        };
        __egretProto__.btnStage1_i = function () {
            var t = new egret.gui.Button();
            this.btnStage1 = t;
            this.__s(t, ["icon", "label", "name", "skinName", "x", "y"], ["guanka_biaoji_putong", "", "1", skins.dw.IconLabelSkin, 103, 329]);
            return t;
        };
        __egretProto__.btnStage2_i = function () {
            var t = new egret.gui.Button();
            this.btnStage2 = t;
            this.__s(t, ["icon", "label", "name", "skinName", "x", "y"], ["guanka_biaoji_putong", "", "2", skins.dw.IconLabelSkin, 299, 239]);
            return t;
        };
        __egretProto__.btnStage3_i = function () {
            var t = new egret.gui.Button();
            this.btnStage3 = t;
            this.__s(t, ["icon", "label", "name", "skinName", "x", "y"], ["guanka_biaoji_putong", "", "3", skins.dw.IconLabelSkin, 387, 379]);
            return t;
        };
        __egretProto__.__1_i = function () {
            var t = new egret.gui.Group();
            t.elementsContent = [this.asBg_i(), this.btnStage1_i(), this.btnStage2_i(), this.btnStage3_i()];
            return t;
        };
        StageMapSkin._skinParts = ["asBg", "btnStage1", "btnStage2", "btnStage3"];
        return StageMapSkin;
    })(egret.gui.Skin);
    skins.StageMapSkin = StageMapSkin;
    StageMapSkin.prototype.__class__ = "skins.StageMapSkin";
})(skins || (skins = {}));
//# sourceMappingURL=StageMapSkin.js.map