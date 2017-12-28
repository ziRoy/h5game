/**
 * Created by yulinjian on 15/7/6.
 */
var HeroView = (function (_super) {
    __extends(HeroView, _super);
    function HeroView() {
        _super.call(this);
        this.skinName = "skins.game.hero.HeroViewSkin";
    }
    var __egretProto__ = HeroView.prototype;
    __egretProto__.childrenCreated = function () {
        var _this = this;
        this.togDefender.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDefender, this);
        this.togWarrior.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchWarrior, this);
        this.togMage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchMage, this);
        this.togPriest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchPriest, this);
        this.btnHeroUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.heroUpgrade, this);
        this.btnChangeHero.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeHero, this);
        Game.eventMgr.addListener(EventMgr.HERO_UPDATE, function () {
            _this.updateHeroInfo.call(_this);
        });
        this.chooseHero = Game.role.heroDefender;
        this.touchDefender();
        this.update();
    };
    __egretProto__.onDestroy = function () {
        var _this = this;
        this.togDefender.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDefender, this);
        this.togWarrior.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchWarrior, this);
        this.togMage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchMage, this);
        this.togPriest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchPriest, this);
        this.btnHeroUpgrade.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.heroUpgrade, this);
        this.btnChangeHero.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeHero, this);
        Game.eventMgr.removeListener(EventMgr.HERO_UPDATE, function () {
            _this.updateHeroInfo.call(_this);
        });
    };
    __egretProto__.update = function () {
        var heroWarriorConfig = Game.config.tables['hero'][Game.role.heroWarrior.id];
        var heroDefenderConfig = Game.config.tables['hero'][Game.role.heroDefender.id];
        var heroMageConfig = Game.config.tables['hero'][Game.role.heroMage.id];
        var heroPriestConfig = Game.config.tables['hero'][Game.role.heroPriest.id];
        var hp = heroWarriorConfig.initHp + (Game.role.heroWarrior.level - 1) * heroWarriorConfig.growHp + heroDefenderConfig.initHp + (Game.role.heroDefender.level - 1) * heroDefenderConfig.growHp + heroMageConfig.initHp + (Game.role.heroMage.level - 1) * heroMageConfig.growHp + heroPriestConfig.initHp + (Game.role.heroPriest.level - 1) * heroPriestConfig.growHp;
        var dp = heroWarriorConfig.initDp + (Game.role.heroWarrior.level - 1) * heroWarriorConfig.growDp + heroDefenderConfig.initDp + (Game.role.heroDefender.level - 1) * heroDefenderConfig.growDp + heroMageConfig.initDp + (Game.role.heroMage.level - 1) * heroMageConfig.growDp + heroPriestConfig.initDp + (Game.role.heroPriest.level - 1) * heroPriestConfig.growDp;
        var atk = heroWarriorConfig.initAtk + (Game.role.heroWarrior.level - 1) * heroWarriorConfig.growAtk + heroDefenderConfig.initAtk + (Game.role.heroDefender.level - 1) * heroDefenderConfig.growAtk + heroMageConfig.initAtk + (Game.role.heroMage.level - 1) * heroMageConfig.growAtk + heroPriestConfig.initAtk + (Game.role.heroPriest.level - 1) * heroPriestConfig.growAtk;
        this.lblTeamHp.text = hp.toString();
        this.lblTeamDp.text = dp.toString();
        this.lblTeamAtk.text = atk.toString();
    };
    __egretProto__.touchDefender = function () {
        this.togDefender.selected = true;
        this.togMage.selected = false;
        this.togPriest.selected = false;
        this.togWarrior.selected = false;
        this.actionHero("heroDefender");
        this.addHeroAvatar();
    };
    __egretProto__.touchWarrior = function () {
        this.togDefender.selected = false;
        this.togWarrior.selected = true;
        this.togMage.selected = false;
        this.togPriest.selected = false;
        this.actionHero("heroWarrior");
        this.addHeroAvatar();
    };
    __egretProto__.touchMage = function () {
        this.togDefender.selected = false;
        this.togWarrior.selected = false;
        this.togMage.selected = true;
        this.togPriest.selected = false;
        this.actionHero("heroMage");
        this.addHeroAvatar();
    };
    __egretProto__.touchPriest = function () {
        this.togDefender.selected = false;
        this.togWarrior.selected = false;
        this.togMage.selected = false;
        this.togPriest.selected = true;
        this.actionHero("heroPriest");
        this.addHeroAvatar();
    };
    __egretProto__.addHeroAvatar = function () {
        var modelId = Game.config.tables['hero'][this.chooseHero.id].modelId;
        this.heroAvatar = new HeroAvatar(modelId);
        this.heroAvatar.setAction("Action_Stand", true);
        this.heroAvatar.view.x = 50;
        this.heroAvatar.view.y = 75;
        this.picHeroIcon.source = this.heroAvatar.view;
    };
    __egretProto__.actionHero = function (who) {
        this.lblLv.text = "Lv." + Game.role[who].level.toString();
        var heroConfig = Game.config.tables['hero'][Game.role[who].id];
        this.lblHeroName.text = heroConfig.name;
        var hp = heroConfig.initHp + (Game.role[who].level - 1) * heroConfig.growHp;
        var dp = heroConfig.initDp + (Game.role[who].level - 1) * heroConfig.growDp;
        var atk = heroConfig.initAtk + (Game.role[who].level - 1) * heroConfig.growAtk;
        this.lblAttack.text = atk.toString();
        this.lblHp.text = hp.toString();
        this.lblDefend.text = dp.toString();
        this.chooseHero = Game.role[who];
        this.heroUpgradeInfo();
    };
    // 显示升级所需的物品
    __egretProto__.heroUpgradeInfo = function () {
        var quality = Game.config.tables["hero"][this.chooseHero.id].quality;
        console.log("id level ", this.chooseHero.id, this.chooseHero.level);
        var upgradeInfo = Game.config.tables["hero_upgrade"][this.chooseHero.level];
        this.upgradeNeedGold = upgradeInfo["costGold" + quality.toString()];
        this.upgradeItem1 = upgradeInfo["costItem" + quality.toString() + "1"];
        this.upgradeItem2 = upgradeInfo["costItem" + quality.toString() + "2"];
        this.upgradeItemNum1 = upgradeInfo["costQty" + quality.toString() + "1"];
        this.upgradeItemNum2 = upgradeInfo["costQty" + quality.toString() + "2"];
        var totalItem1 = Game.itemController.getItemQty(this.upgradeItem1);
        var totalItem2 = Game.itemController.getItemQty(this.upgradeItem2);
        this.daojuOne.text = this.upgradeNeedGold.toString() + "/" + Game.role.gold.toString();
        this.daojuTwo.text = this.upgradeItemNum1.toString() + "/" + totalItem1.toString();
        this.daojuThree.text = this.upgradeItemNum2.toString() + "/" + totalItem2.toString();
        // ?? 后面需要加上去的
        //this.daoju_name1.text = "金币";
        //this.daoju_name2.text = Game.config.tables['item'][this.upgradeItem1].name;
        //this.daoju_name3.text = Game.config.tables['item'][this.upgradeItem2].name;
        //if( Game.role.gold < this.upgradeNeedGold || totalItem1 < this.upgradeItemNum1 || totalItem2 < this.upgradeItemNum2 )
        //{
        //    this.btnHeroUpgrade.enabled = false;
        //}
    };
    __egretProto__.heroUpgrade = function () {
        Game.heroController.upgradeHero(this.chooseHero.id);
    };
    __egretProto__.updateHeroInfo = function () {
        this.update();
        if (this.chooseHero) {
            switch (this.chooseHero.id) {
                case Game.role.heroDefender.id:
                    this.touchDefender();
                    break;
                case Game.role.heroMage.id:
                    this.touchMage();
                    break;
                case Game.role.heroWarrior.id:
                    this.touchWarrior();
                    break;
                case Game.role.heroPriest.id:
                    this.touchPriest();
                    break;
                default:
                    break;
            }
        }
    };
    __egretProto__.changeHero = function () {
        ViewStack.popView();
        ViewStack.pushView(new HeroInfoPanel(this.chooseHero.id));
    };
    return HeroView;
})(StageSkinnableContainer);
HeroView.prototype.__class__ = "HeroView";
//# sourceMappingURL=HeroView.js.map