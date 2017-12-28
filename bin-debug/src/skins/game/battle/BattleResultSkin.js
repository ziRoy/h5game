var skins;
(function (skins) {
    var game;
    (function (game) {
        var battle;
        (function (battle) {
            var BattleResultSkin = (function (_super) {
                __extends(BattleResultSkin, _super);
                function BattleResultSkin() {
                    _super.call(this);
                    this.__s = egret.gui.setProperties;
                    this.__s(this, ["height", "width"], [300, 360]);
                    this.elementsContent = [this.__2_i()];
                }
                var __egretProto__ = BattleResultSkin.prototype;
                Object.defineProperty(__egretProto__, "skinParts", {
                    get: function () {
                        return BattleResultSkin._skinParts;
                    },
                    enumerable: true,
                    configurable: true
                });
                __egretProto__.__2_i = function () {
                    var t = new egret.gui.Panel();
                    this.__s(t, ["percentHeight", "skinName", "percentWidth"], [100, skins.dw.PanelSkin, 100]);
                    t.layout = this.__1_i();
                    t.elementsContent = [this.lblStageName_i(), this.btnOk_i()];
                    return t;
                };
                __egretProto__.btnOk_i = function () {
                    var t = new egret.gui.Button();
                    this.btnOk = t;
                    t.label = "确定";
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
                BattleResultSkin._skinParts = ["lblStageName", "btnOk"];
                return BattleResultSkin;
            })(egret.gui.Skin);
            battle.BattleResultSkin = BattleResultSkin;
            BattleResultSkin.prototype.__class__ = "skins.game.battle.BattleResultSkin";
        })(battle = game.battle || (game.battle = {}));
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
//# sourceMappingURL=BattleResultSkin.js.map