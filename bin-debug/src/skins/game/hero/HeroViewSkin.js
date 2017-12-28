var skins;
(function (skins) {
    var game;
    (function (game) {
        var hero;
        (function (hero) {
            var HeroViewSkin = (function (_super) {
                __extends(HeroViewSkin, _super);
                function HeroViewSkin() {
                    _super.call(this);
                    this.__s = egret.gui.setProperties;
                    this.__s(this, ["height", "width"], [640, 400]);
                    this.elementsContent = [this.__1_i(), this.__81_i()];
                }
                var __egretProto__ = HeroViewSkin.prototype;
                Object.defineProperty(__egretProto__, "skinParts", {
                    get: function () {
                        return HeroViewSkin._skinParts;
                    },
                    enumerable: true,
                    configurable: true
                });
                __egretProto__.__11_i = function () {
                    var t = new egret.gui.UIAsset();
                    t.source = "icon_defend";
                    return t;
                };
                __egretProto__.__12_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__10_i();
                    t.elementsContent = [this.__11_i(), this.lblTeamDp_i()];
                    return t;
                };
                __egretProto__.__13_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "verticalAlign"], [5, "middle"]);
                    return t;
                };
                __egretProto__.__14_i = function () {
                    var t = new egret.gui.UIAsset();
                    t.source = "icon_attack";
                    return t;
                };
                __egretProto__.__15_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__13_i();
                    t.elementsContent = [this.__14_i(), this.lblTeamAtk_i()];
                    return t;
                };
                __egretProto__.__16_i = function () {
                    var t = new egret.gui.Group();
                    this.__s(t, ["horizontalCenter", "top", "verticalCenter"], [0, 0, 0]);
                    t.layout = this.__6_i();
                    t.elementsContent = [this.__9_i(), this.__12_i(), this.__15_i()];
                    return t;
                };
                __egretProto__.__17_i = function () {
                    var t = new egret.gui.Group();
                    t.percentWidth = 100;
                    t.elementsContent = [this.__5_i(), this.__16_i()];
                    return t;
                };
                __egretProto__.__18_i = function () {
                    var t = new egret.gui.TileLayout();
                    this.__s(t, ["columnWidth", "requestedColumnCount", "requestedRowCount", "rowHeight"], [88, 4, 1, 88]);
                    return t;
                };
                __egretProto__.__19_i = function () {
                    var t = new egret.gui.Group();
                    this.__s(t, ["horizontalCenter", "left", "verticalCenter"], [0, 20, 0]);
                    t.layout = this.__18_i();
                    t.elementsContent = [this.togDefender_i(), this.togWarrior_i(), this.togMage_i(), this.togPriest_i()];
                    return t;
                };
                __egretProto__.__1_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["percentHeight", "scale9Grid", "source", "percentWidth"], [100, egret.gui.getScale9Grid("50,75,300,450"), "bg", 100]);
                    return t;
                };
                __egretProto__.__20_i = function () {
                    var t = new egret.gui.Group();
                    this.__s(t, ["left", "top"], [30, 5]);
                    t.layout = this.__4_i();
                    t.elementsContent = [this.__17_i(), this.__19_i()];
                    return t;
                };
                __egretProto__.__21_i = function () {
                    var t = new egret.gui.Group();
                    this.__s(t, ["horizontalCenter", "verticalCenter", "percentWidth"], [0, 0, 100]);
                    t.elementsContent = [this.__3_i(), this.__20_i()];
                    return t;
                };
                __egretProto__.__22_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "scale9Grid", "source", "width"], [250, egret.gui.getScale9Grid("35,18,211,113"), "bg_2", 390]);
                    return t;
                };
                __egretProto__.__23_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [5, "left", "middle"]);
                    return t;
                };
                __egretProto__.__24_i = function () {
                    var t = new egret.gui.UIAsset();
                    t.source = "yingxiong_title";
                    return t;
                };
                __egretProto__.__25_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__24_i(), this.lblLv_i(), this.lblHeroName_i()];
                    return t;
                };
                __egretProto__.__26_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    t.verticalAlign = "middle";
                    return t;
                };
                __egretProto__.__27_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    t.horizontalAlign = "center";
                    return t;
                };
                __egretProto__.__28_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__27_i();
                    t.elementsContent = [this.picHeroIcon_i(), this.btnChangeHero_i()];
                    return t;
                };
                __egretProto__.__29_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "scale9Grid", "source", "width"], [160, egret.gui.getScale9Grid("29,19,179,62"), "bg_4", 230]);
                    return t;
                };
                __egretProto__.__2_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    this.__s(t, ["horizontalAlign", "verticalAlign"], ["center", "middle"]);
                    return t;
                };
                __egretProto__.__30_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    this.__s(t, ["gap", "horizontalAlign"], [15, "left"]);
                    return t;
                };
                __egretProto__.__31_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["horizontalAlign", "verticalAlign"], ["left", "middle"]);
                    return t;
                };
                __egretProto__.__32_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__31_i();
                    t.elementsContent = [this.normalskill_i(), this.lblNormalAttk_i()];
                    return t;
                };
                __egretProto__.__33_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["horizontalAlign", "verticalAlign"], ["left", "middle"]);
                    return t;
                };
                __egretProto__.__34_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__33_i();
                    t.elementsContent = [this.specialskill_i(), this.lblBiSha_i()];
                    return t;
                };
                __egretProto__.__35_i = function () {
                    var t = new egret.gui.Group();
                    this.__s(t, ["left", "top"], [15, 20]);
                    t.layout = this.__30_i();
                    t.elementsContent = [this.__32_i(), this.__34_i()];
                    return t;
                };
                __egretProto__.__36_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__29_i(), this.__35_i()];
                    return t;
                };
                __egretProto__.__37_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__26_i();
                    t.elementsContent = [this.__28_i(), this.__36_i()];
                    return t;
                };
                __egretProto__.__38_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [15, "center", "middle"]);
                    return t;
                };
                __egretProto__.__39_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "source", "width"], [30, "bg_4", 110]);
                    return t;
                };
                __egretProto__.__3_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["left", "scale9Grid", "source"], [20, egret.gui.getScale9Grid("49,13,274,17"), "yingxiong_bg_1"]);
                    return t;
                };
                __egretProto__.__40_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["left", "source", "top"], [10, "icon_attack", 5]);
                    return t;
                };
                __egretProto__.__41_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__39_i(), this.__40_i(), this.lblAttack_i()];
                    return t;
                };
                __egretProto__.__42_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "source", "width"], [30, "bg_4", 110]);
                    return t;
                };
                __egretProto__.__43_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["left", "source", "top"], [10, "icon_hp", 5]);
                    return t;
                };
                __egretProto__.__44_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__42_i(), this.__43_i(), this.lblHp_i()];
                    return t;
                };
                __egretProto__.__45_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "source", "width"], [30, "bg_4", 110]);
                    return t;
                };
                __egretProto__.__46_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["left", "source", "top"], [10, "icon_defend", 5]);
                    return t;
                };
                __egretProto__.__47_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__45_i(), this.__46_i(), this.lblDefend_i()];
                    return t;
                };
                __egretProto__.__48_i = function () {
                    var t = new egret.gui.Group();
                    t.percentWidth = 100;
                    t.layout = this.__38_i();
                    t.elementsContent = [this.__41_i(), this.__44_i(), this.__47_i()];
                    return t;
                };
                __egretProto__.__49_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__23_i();
                    t.elementsContent = [this.__25_i(), this.__37_i(), this.__48_i()];
                    return t;
                };
                __egretProto__.__4_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    t.gap = 10;
                    return t;
                };
                __egretProto__.__50_i = function () {
                    var t = new egret.gui.Group();
                    this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                    t.elementsContent = [this.__22_i(), this.__49_i()];
                    return t;
                };
                __egretProto__.__51_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "scale9Grid", "source", "width"], [105, egret.gui.getScale9Grid("35,18,211,113"), "bg_2", 390]);
                    return t;
                };
                __egretProto__.__52_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    this.__s(t, ["gap", "horizontalAlign", "verticalAlign"], [10, "center", "middle"]);
                    return t;
                };
                __egretProto__.__53_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["horizontalAlign", "verticalAlign"], ["center", "middle"]);
                    return t;
                };
                __egretProto__.__54_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "verticalAlign"], [10, "middle"]);
                    return t;
                };
                __egretProto__.__55_i = function () {
                    var t = new egret.gui.UIAsset();
                    t.source = "icon_attack";
                    return t;
                };
                __egretProto__.__56_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    t.horizontalAlign = "center";
                    return t;
                };
                __egretProto__.__57_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "source", "width"], [25, "bg_3", 75]);
                    return t;
                };
                __egretProto__.__58_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__57_i(), this.daojuOne_i()];
                    return t;
                };
                __egretProto__.__59_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__56_i();
                    t.elementsContent = [this.daoju_name1_i(), this.__58_i()];
                    return t;
                };
                __egretProto__.__5_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "left", "scale9Grid", "source", "width"], [30, 25, egret.gui.getScale9Grid("13,13,84,5"), "bg_3", 325]);
                    return t;
                };
                __egretProto__.__60_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__54_i();
                    t.elementsContent = [this.__55_i(), this.__59_i()];
                    return t;
                };
                __egretProto__.__61_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__60_i()];
                    return t;
                };
                __egretProto__.__62_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "verticalAlign"], [10, "middle"]);
                    return t;
                };
                __egretProto__.__63_i = function () {
                    var t = new egret.gui.UIAsset();
                    t.source = "icon_defend";
                    return t;
                };
                __egretProto__.__64_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    t.horizontalAlign = "center";
                    return t;
                };
                __egretProto__.__65_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "source", "width"], [25, "bg_3", 75]);
                    return t;
                };
                __egretProto__.__66_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__65_i(), this.daojuTwo_i()];
                    return t;
                };
                __egretProto__.__67_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__64_i();
                    t.elementsContent = [this.daoju_name2_i(), this.__66_i()];
                    return t;
                };
                __egretProto__.__68_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__62_i();
                    t.elementsContent = [this.__63_i(), this.__67_i()];
                    return t;
                };
                __egretProto__.__69_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__68_i()];
                    return t;
                };
                __egretProto__.__6_i = function () {
                    var t = new egret.gui.TileLayout();
                    this.__s(t, ["horizontalGap", "requestedColumnCount", "requestedRowCount"], [20, 3, 1]);
                    return t;
                };
                __egretProto__.__70_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "verticalAlign"], [10, "middle"]);
                    return t;
                };
                __egretProto__.__71_i = function () {
                    var t = new egret.gui.UIAsset();
                    t.source = "icon_hp";
                    return t;
                };
                __egretProto__.__72_i = function () {
                    var t = new egret.gui.VerticalLayout();
                    t.horizontalAlign = "center";
                    return t;
                };
                __egretProto__.__73_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.__s(t, ["height", "source", "width"], [25, "bg_3", 75]);
                    return t;
                };
                __egretProto__.__74_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__73_i(), this.daojuThree_i()];
                    return t;
                };
                __egretProto__.__75_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__72_i();
                    t.elementsContent = [this.daoju_name3_i(), this.__74_i()];
                    return t;
                };
                __egretProto__.__76_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__70_i();
                    t.elementsContent = [this.__71_i(), this.__75_i()];
                    return t;
                };
                __egretProto__.__77_i = function () {
                    var t = new egret.gui.Group();
                    t.elementsContent = [this.__76_i()];
                    return t;
                };
                __egretProto__.__78_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__53_i();
                    t.elementsContent = [this.__61_i(), this.__69_i(), this.__77_i()];
                    return t;
                };
                __egretProto__.__79_i = function () {
                    var t = new egret.gui.Group();
                    this.__s(t, ["top", "percentWidth"], [5, 100]);
                    t.layout = this.__52_i();
                    t.elementsContent = [this.__78_i(), this.btnHeroUpgrade_i()];
                    return t;
                };
                __egretProto__.__7_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "verticalAlign"], [5, "middle"]);
                    return t;
                };
                __egretProto__.__80_i = function () {
                    var t = new egret.gui.Group();
                    this.__s(t, ["horizontalCenter", "verticalCenter"], [0, 0]);
                    t.elementsContent = [this.__51_i(), this.__79_i()];
                    return t;
                };
                __egretProto__.__81_i = function () {
                    var t = new egret.gui.Group();
                    this.__s(t, ["bottom", "top", "percentWidth"], [60, 50, 100]);
                    t.layout = this.__2_i();
                    t.elementsContent = [this.__21_i(), this.__50_i(), this.__80_i()];
                    return t;
                };
                __egretProto__.__8_i = function () {
                    var t = new egret.gui.UIAsset();
                    t.source = "icon_hp";
                    return t;
                };
                __egretProto__.__9_i = function () {
                    var t = new egret.gui.Group();
                    t.layout = this.__7_i();
                    t.elementsContent = [this.__8_i(), this.lblTeamHp_i()];
                    return t;
                };
                __egretProto__.btnChangeHero_i = function () {
                    var t = new egret.gui.Button();
                    this.btnChangeHero = t;
                    t.setStyle("size", 22);
                    this.__s(t, ["height", "label", "width"], [50, "更换角色", 140]);
                    return t;
                };
                __egretProto__.btnHeroUpgrade_i = function () {
                    var t = new egret.gui.Button();
                    this.btnHeroUpgrade = t;
                    t.setStyle("size", 18);
                    this.__s(t, ["height", "label", "width"], [45, "升级", 115]);
                    return t;
                };
                __egretProto__.daojuOne_i = function () {
                    var t = new egret.gui.Label();
                    this.daojuOne = t;
                    this.__s(t, ["size", "text"], [18, "10/100"]);
                    return t;
                };
                __egretProto__.daojuThree_i = function () {
                    var t = new egret.gui.Label();
                    this.daojuThree = t;
                    this.__s(t, ["size", "text"], [18, "10/100"]);
                    return t;
                };
                __egretProto__.daojuTwo_i = function () {
                    var t = new egret.gui.Label();
                    this.daojuTwo = t;
                    this.__s(t, ["size", "text"], [18, "10/100"]);
                    return t;
                };
                __egretProto__.daoju_name1_i = function () {
                    var t = new egret.gui.Label();
                    this.daoju_name1 = t;
                    this.__s(t, ["size", "text", "textColor"], [18, "道具名称", 0x112244]);
                    return t;
                };
                __egretProto__.daoju_name2_i = function () {
                    var t = new egret.gui.Label();
                    this.daoju_name2 = t;
                    this.__s(t, ["size", "text", "textColor"], [18, "道具名称", 0x112244]);
                    return t;
                };
                __egretProto__.daoju_name3_i = function () {
                    var t = new egret.gui.Label();
                    this.daoju_name3 = t;
                    this.__s(t, ["size", "text", "textColor"], [18, "道具名称", 0x112244]);
                    return t;
                };
                __egretProto__.lblAttack_i = function () {
                    var t = new egret.gui.Label();
                    this.lblAttack = t;
                    this.__s(t, ["left", "size", "text", "textColor", "top"], [35, 18, "9999", 0x552532, 5]);
                    return t;
                };
                __egretProto__.lblBiSha_i = function () {
                    var t = new egret.gui.Label();
                    this.lblBiSha = t;
                    this.__s(t, ["height", "size", "text", "textColor", "width"], [60, 22, "必杀  222222 ", 0xFF0000, 135]);
                    return t;
                };
                __egretProto__.lblDefend_i = function () {
                    var t = new egret.gui.Label();
                    this.lblDefend = t;
                    this.__s(t, ["left", "size", "text", "textColor", "top"], [35, 18, "9999", 0x552532, 5]);
                    return t;
                };
                __egretProto__.lblHeroName_i = function () {
                    var t = new egret.gui.Label();
                    this.lblHeroName = t;
                    this.__s(t, ["left", "size", "text", "textColor", "top"], [80, 22, "hero.name", 0xFF0000, 5]);
                    return t;
                };
                __egretProto__.lblHp_i = function () {
                    var t = new egret.gui.Label();
                    this.lblHp = t;
                    this.__s(t, ["left", "size", "text", "textColor", "top"], [35, 18, "9999", 0x552532, 5]);
                    return t;
                };
                __egretProto__.lblLv_i = function () {
                    var t = new egret.gui.Label();
                    this.lblLv = t;
                    this.__s(t, ["left", "size", "text", "top"], [15, 19, "Lv.2", 5]);
                    return t;
                };
                __egretProto__.lblNormalAttk_i = function () {
                    var t = new egret.gui.Label();
                    this.lblNormalAttk = t;
                    this.__s(t, ["height", "size", "text", "textColor", "width"], [60, 22, "普通攻击     1212 11", 0xFF0000, 135]);
                    return t;
                };
                __egretProto__.lblTeamAtk_i = function () {
                    var t = new egret.gui.Label();
                    this.lblTeamAtk = t;
                    this.__s(t, ["size", "text", "textColor"], [18, "99999", 0x000000]);
                    return t;
                };
                __egretProto__.lblTeamDp_i = function () {
                    var t = new egret.gui.Label();
                    this.lblTeamDp = t;
                    this.__s(t, ["size", "text", "textColor"], [18, "99999", 0x000000]);
                    return t;
                };
                __egretProto__.lblTeamHp_i = function () {
                    var t = new egret.gui.Label();
                    this.lblTeamHp = t;
                    this.__s(t, ["size", "text", "textColor"], [18, "99999", 0x000000]);
                    return t;
                };
                __egretProto__.normalskill_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.normalskill = t;
                    this.__s(t, ["height", "left", "scale9Grid", "source", "width"], [45, 15, egret.gui.getScale9Grid("13,10,84,10"), "anniu_6", 45]);
                    return t;
                };
                __egretProto__.picHeroIcon_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.picHeroIcon = t;
                    this.__s(t, ["height", "source", "width"], [80, "zhucheng_gonghui", 140]);
                    return t;
                };
                __egretProto__.__10_i = function () {
                    var t = new egret.gui.HorizontalLayout();
                    this.__s(t, ["gap", "verticalAlign"], [5, "middle"]);
                    return t;
                };
                __egretProto__.specialskill_i = function () {
                    var t = new egret.gui.UIAsset();
                    this.specialskill = t;
                    this.__s(t, ["height", "scale9Grid", "source", "width"], [45, egret.gui.getScale9Grid("13,10,84,10"), "anniu_6", 45]);
                    return t;
                };
                __egretProto__.togDefender_i = function () {
                    var t = new egret.gui.ToggleButton();
                    this.togDefender = t;
                    this.__s(t, ["icon", "skinName"], ["zhucheng_gonghui", skins.dw.ButtonSkin]);
                    return t;
                };
                __egretProto__.togMage_i = function () {
                    var t = new egret.gui.ToggleButton();
                    this.togMage = t;
                    this.__s(t, ["icon", "skinName"], ["zhucheng_gonghui", skins.dw.ButtonSkin]);
                    return t;
                };
                __egretProto__.togPriest_i = function () {
                    var t = new egret.gui.ToggleButton();
                    this.togPriest = t;
                    this.__s(t, ["icon", "skinName"], ["zhucheng_gonghui", skins.dw.ButtonSkin]);
                    return t;
                };
                __egretProto__.togWarrior_i = function () {
                    var t = new egret.gui.ToggleButton();
                    this.togWarrior = t;
                    this.__s(t, ["icon", "skinName"], ["zhucheng_gonghui", skins.dw.ButtonSkin]);
                    return t;
                };
                HeroViewSkin._skinParts = ["lblTeamHp", "lblTeamDp", "lblTeamAtk", "togDefender", "togWarrior", "togMage", "togPriest", "lblLv", "lblHeroName", "picHeroIcon", "btnChangeHero", "normalskill", "lblNormalAttk", "specialskill", "lblBiSha", "lblAttack", "lblHp", "lblDefend", "daoju_name1", "daojuOne", "daoju_name2", "daojuTwo", "daoju_name3", "daojuThree", "btnHeroUpgrade"];
                return HeroViewSkin;
            })(egret.gui.Skin);
            hero.HeroViewSkin = HeroViewSkin;
            HeroViewSkin.prototype.__class__ = "skins.game.hero.HeroViewSkin";
        })(hero = game.hero || (game.hero = {}));
    })(game = skins.game || (skins.game = {}));
})(skins || (skins = {}));
//# sourceMappingURL=HeroViewSkin.js.map