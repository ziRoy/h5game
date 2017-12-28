var skins;
(function (skins) {
    var game;
    (function (game) {
        var hero;
        (function (hero) {
            var HeroListInfoSkin = (function (_super) {
                __extends(HeroListInfoSkin, _super);
                function HeroListInfoSkin() {
                    _super.call(this);
                    this.__s = egret.gui.setProperties;
                    this.__s(this, ["height", "width"], [640, 400]);
                    this.elementsContent = [this.__3_i(), this.__42_i()];
                    this.states = [
                        new egret.gui.State("normal", []),
                        new egret.gui.State("disabled", [])
                    ];
                }
                var __egretProto__ = HeroListInfoSkin.prototype;
                Object.defineProperty(__egretProto__, "skinParts", {
                    get: function () {
                        return HeroListInfoSkin._skinParts;
                    },
                    enumerable: true,
                    configurable: true
                });
                __egretProto__.__11_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__6_i();
                    t.elementsContent = [this.lblHeroType_i(), this.__10_i()];
                    return t;
                };
                __egretProto__.__12_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    t.horizontalAlign = "center";
                    return t;
                };
                __egretProto__.__13_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    t.verticalAlign = "middle";
                    return t;
                };
                __egretProto__.__14_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    this.__s(t, ["gap", "horizontalAlign", "paddingTop"], [10, "center", 15]);
                    return t;
                };
                __egretProto__.__15_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "source", "width"], [30, "bg_3", 107]);
                    return t;
                };
                __egretProto__.__16_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["source", "top"], ["icon_attack", 5]);
                    return t;
                };
                __egretProto__.__17_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__15_i(), this.__16_i(), this.lblHeroAttack_i()];
                    return t;
                };
                __egretProto__.__18_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "source", "width"], [30, "bg_3", 107]);
                    return t;
                };
                __egretProto__.__19_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["source", "top"], ["icon_hp", 5]);
                    return t;
                };
                __egretProto__.__20_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__18_i(), this.__19_i(), this.lblHeroHp_i()];
                    return t;
                };
                __egretProto__.__21_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "source", "width"], [30, "bg_3", 107]);
                    return t;
                };
                __egretProto__.__22_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["source", "top"], ["icon_defend", 5]);
                    return t;
                };
                __egretProto__.__23_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__21_i(), this.__22_i(), this.lblHeroDefend_i()];
                    return t;
                };
                __egretProto__.__24_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__14_i();
                    t.elementsContent = [this.lblHeroLv_i(), this.lblHeroName_i(), this.__17_i(), this.__20_i(), this.__23_i()];
                    return t;
                };
                __egretProto__.__25_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__13_i();
                    t.elementsContent = [this.picHeroIcon_i(), this.__24_i()];
                    return t;
                };
                __egretProto__.__26_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    this.__s(t, ["gap", "horizontalAlign"], [10, "left"]);
                    return t;
                };
                __egretProto__.__27_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "scale9Grid", "source", "width"], [170, egret.gui.getScale9Grid("35,18,211,113"), "bg_2", 280]);
                    return t;
                };
                __egretProto__.__28_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    this.__s(t, ["horizontalAlign", "padding"], ["center", 10]);
                    return t;
                };
                __egretProto__.__29_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "verticalAlign"], [10, "middle"]);
                    return t;
                };
                __egretProto__.__30_i = function () {
                    var t = new egret.gui.UIAsset();
                    t.source = "anniu_5";
                    return t;
                };
                __egretProto__.__31_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__29_i();
                    t.elementsContent = [this.__30_i(), this.lblNormalDesc_i()];
                    return t;
                };
                __egretProto__.__32_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "verticalAlign"], [10, "middle"]);
                    return t;
                };
                __egretProto__.__33_i = function () {
                    var t = new egret.gui.UIAsset();
                    t.source = "anniu_5";
                    return t;
                };
                __egretProto__.__34_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__32_i();
                    t.elementsContent = [this.__33_i(), this.lblSpecialDesc_i()];
                    return t;
                };
                __egretProto__.__35_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__28_i();
                    t.elementsContent = [this.__31_i(), this.__34_i()];
                    return t;
                };
                __egretProto__.__36_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__27_i(), this.__35_i()];
                    return t;
                };
                __egretProto__.__37_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__26_i();
                    t.elementsContent = [this.lblUnlockDesc_i(), this.__36_i()];
                    return t;
                };
                __egretProto__.__38_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__12_i();
                    t.elementsContent = [this.__25_i(), this.__37_i()];
                    return t;
                };
                __egretProto__.__39_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__5_i();
                    t.elementsContent = [this.__11_i(), this.__38_i()];
                    return t;
                };
                __egretProto__.__3_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["percentHeight", "scale9Grid", "source", "percentWidth"], [100, egret.gui.getScale9Grid("50,75,300,450"), "bg", 100]);
                    return t;
                };
                __egretProto__.__40_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "padding", "verticalAlign"], [15, 5, "middle"]);
                    return t;
                };
                __egretProto__.__41_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__40_i();
                    t.elementsContent = [this.btnCancel_i(), this.btnConfirm_i()];
                    return t;
                };
                __egretProto__.__42_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__4_i();
                    t.elementsContent = [this.__39_i(), this.__41_i()];
                    return t;
                };
                __egretProto__.__4_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    this.__s(t, ["horizontalAlign", "paddingTop"], ["center", 65]);
                    return t;
                };
                __egretProto__.__5_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "verticalAlign"], [10, "middle"]);
                    return t;
                };
                __egretProto__.__6_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    this.__s(t, ["gap", "horizontalAlign", "padding"], [5, "center", 5]);
                    return t;
                };
                __egretProto__.__7_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["autoScale", "height", "scale9Grid", "source", "width"], [true, 450, egret.gui.getScale9Grid("35,18,211,113"), "bg_2", 95]);
                    return t;
                };
                __egretProto__.__8_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    this.__s(t, ["gap", "horizontalAlign"], [15, "center"]);
                    return t;
                };
                __egretProto__.__9_i = function () {
                    var t = new egret.gui.Scroller();
                    this.__s(t, ["height", "horizontalCenter", "top", "verticalScrollPolicy", "width"], [450, 0, 10, "auto", 95]);
                    t.viewport = this.heroItem_i();
                    return t;
                };
                __egretProto__.btnCancel_i = function () {
                    var t = new egret.gui.Button();
                    this.btnCancel = t;
                    t.setStyle("size", 22);
                    t.label = "取消";
                    return t;
                };
                __egretProto__.btnConfirm_i = function () {
                    var t = new egret.gui.Button();
                    this.btnConfirm = t;
                    t.setStyle("size", 22);
                    t.label = "确定";
                    return t;
                };
                __egretProto__.heroItem_i = function () {
                    var t = new egret.gui.DataGroup();
                    this.heroItem = t;
                    t.layout = this.__8_i();
                    return t;
                };
                __egretProto__.lblHeroAttack_i = function () {
                    var t = new egret.gui.Label();
                    this.lblHeroAttack = t;
                    this.__s(t, ["bold", "left", "size", "text", "textColor", "top"], [true, 25, 18, "99999", 0x124512, 5]);
                    return t;
                };
                __egretProto__.lblHeroDefend_i = function () {
                    var t = new egret.gui.Label();
                    this.lblHeroDefend = t;
                    this.__s(t, ["bold", "left", "size", "text", "textColor", "top"], [true, 25, 18, "99999", 0x124512, 5]);
                    return t;
                };
                __egretProto__.lblHeroHp_i = function () {
                    var t = new egret.gui.Label();
                    this.lblHeroHp = t;
                    this.__s(t, ["bold", "left", "size", "text", "textColor", "top"], [true, 25, 18, "99999", 0x124512, 5]);
                    return t;
                };
                __egretProto__.lblHeroLv_i = function () {
                    var t = new egret.gui.Label();
                    this.lblHeroLv = t;
                    this.__s(t, ["bold", "size", "text", "textColor"], [true, 18, "Lv.2", 0x124536]);
                    return t;
                };
                __egretProto__.lblHeroName_i = function () {
                    var t = new egret.gui.Label();
                    this.lblHeroName = t;
                    this.__s(t, ["bold", "size", "text", "textColor"], [true, 18, "英雄名字", 0x124536]);
                    return t;
                };
                __egretProto__.lblHeroType_i = function () {
                    var t = new egret.gui.Label();
                    this.lblHeroType = t;
                    this.__s(t, ["bold", "size", "text", "textColor"], [true, 18, "坦克", 0x001224]);
                    return t;
                };
                __egretProto__.lblNormalDesc_i = function () {
                    var t = new egret.gui.Label();
                    this.lblNormalDesc = t;
                    this.__s(t, ["bold", "height", "size", "text", "textColor", "width"], [true, 70, 18, "普通技能＊＊＊＊＊＊＊＊12", 0x123456, 180]);
                    return t;
                };
                __egretProto__.lblSpecialDesc_i = function () {
                    var t = new egret.gui.Label();
                    this.lblSpecialDesc = t;
                    this.__s(t, ["bold", "height", "size", "text", "textColor", "width"], [true, 70, 18, "特殊技能＊＊＊＊＊＊＊＊12", 0x123456, 180]);
                    return t;
                };
                __egretProto__.lblUnlockDesc_i = function () {
                    var t = new egret.gui.Label();
                    this.lblUnlockDesc = t;
                    this.__s(t, ["bold", "height", "size", "text", "textColor", "visible", "percentWidth"], [true, 30, 19, "解锁条件", 0x000000, true, 100]);
                    return t;
                };
                __egretProto__.picHeroIcon_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.picHeroIcon = t;
                    this.__s(t, ["height", "source", "width"], [192, "anniu_6", 161]);
                    return t;
                };
                __egretProto__.__10_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__7_i(), this.__9_i()];
                    return t;
                };
                HeroListInfoSkin._skinParts = ["lblHeroType", "heroItem", "picHeroIcon", "lblHeroLv", "lblHeroName", "lblHeroAttack", "lblHeroHp", "lblHeroDefend", "lblUnlockDesc", "lblNormalDesc", "lblSpecialDesc", "btnCancel", "btnConfirm"];
                return HeroListInfoSkin;
            })(egret.gui.Skin);
            hero.HeroListInfoSkin = HeroListInfoSkin;
            HeroListInfoSkin.prototype.__class__ = "skins.game.hero.HeroListInfoSkin";
        })(hero = game.hero || (game.hero = {}));
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
//# sourceMappingURL=HeroListInfoSkin.js.map