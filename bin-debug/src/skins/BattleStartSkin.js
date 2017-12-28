var skins;
(function (skins) {
    var BattleStartSkin = (function (_super) {
        __extends(BattleStartSkin, _super);
        function BattleStartSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [300, 360]);
            this.elementsContent = [this.__4_i()];
        }
        var __egretProto__ = BattleStartSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return BattleStartSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.__2_i = function () {
            var t = new egret.gui.HorizontalLayout();
            this.__s(t, ["gap", "horizontalAlign"], [5, "center"]);
            return t;
        };
        __egretProto__.__3_i = function () {
            var t = new egret.gui.Group();
            t.layout = this.__2_i();
            t.elementsContent = [this.btnStart_i(), this.btnCancel_i()];
            return t;
        };
        __egretProto__.__4_i = function () {
            var t = new egret.gui.Panel();
            this.__s(t, ["percentHeight", "skinName", "percentWidth"], [100, skins.dw.PanelSkin, 100]);
            t.layout = this.__1_i();
            t.elementsContent = [this.lblStageName_i(), this.__3_i()];
            return t;
        };
        __egretProto__.btnCancel_i = function () {
            var t = new egret.gui.Button();
            this.btnCancel = t;
            t.label = "取消";
            return t;
        };
        __egretProto__.btnStart_i = function () {
            var t = new egret.gui.Button();
            this.btnStart = t;
            t.label = "开始";
            return t;
        };
        __egretProto__.lblStageName_i = function () {
            var t = new egret.gui.Label();
            this.lblStageName = t;
            this.__s(t, ["stroke", "strokeColor", "text"], [2, 0x0, "lblStageName"]);
            return t;
        };
        __egretProto__.__1_i = function () {
            var t = new egret.gui.VerticalLayout();
            this.__s(t, ["gap", "horizontalAlign", "paddingBottom", "verticalAlign"], [50, "center", 20, "bottom"]);
            return t;
        };
        BattleStartSkin._skinParts = ["lblStageName", "btnStart", "btnCancel"];
        return BattleStartSkin;
    })(egret.gui.Skin);
    skins.BattleStartSkin = BattleStartSkin;
    BattleStartSkin.prototype.__class__ = "skins.BattleStartSkin";
})(skins || (skins = {}));
//# sourceMappingURL=BattleStartSkin.js.map