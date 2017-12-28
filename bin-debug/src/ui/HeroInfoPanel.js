var HeroInfoPanel = (function (_super) {
    __extends(HeroInfoPanel, _super);
    function HeroInfoPanel(heroId) {
        _super.call(this);
        this.skinName = "skins.game.HeroInfoPanelSkin";
        this.curHeroId = heroId;
    }
    var __egretProto__ = HeroInfoPanel.prototype;
    __egretProto__.childrenCreated = function () {
        var _this = this;
        this.heroInfo.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cancel, this);
        this.heroInfo.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirm, this);
        Game.eventMgr.addListener(EventMgr.GOLD_UPDATE, this.goldUpdate.bind(this));
        var info = Game.config.tables['hero'];
        var job = Game.config.tables['hero'][this.curHeroId].job;
        var index = 0;
        var data = [];
        for (var id in info) {
            if (info[id].job == job) {
                if (id == this.curHeroId)
                    this.lastItemIndex = index;
                else {
                    index++;
                }
                data.push({ id: id });
            }
        }
        this.heroInfo.heroItem.dataProvider = new egret.gui.ArrayCollection(data);
        this.heroInfo.heroItem.itemRenderer = new egret.gui.ClassFactory(HeroItemRenderer);
        Game.eventMgr.addListener(EventMgr.CHOOSE_HERO, function (evt) {
            _this.chooseHero.call(_this, evt);
        });
        this.updateResbar();
        this.showHeroInfo(this.curHeroId, this.lastItemIndex);
    };
    __egretProto__.onDestroy = function () {
        var _this = this;
        this.heroInfo.btnCancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cancel, this);
        this.heroInfo.btnConfirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirm, this);
        Game.eventMgr.removeListener(EventMgr.GOLD_UPDATE, this.goldUpdate.bind(this));
        Game.eventMgr.removeListener(EventMgr.CHOOSE_HERO, function (evt) {
            _this.chooseHero.call(_this, evt);
        });
    };
    __egretProto__.updateResbar = function () {
        this.resBar.lvProgress.setValue(31);
        this.resBar.rolelevel.text = Game.role.level.toString();
        this.resBar.lblEnergy.text = Game.role.energy.toString();
        this.resBar.lblGold.text = Game.role.gold.toString();
    };
    __egretProto__.cancel = function () {
        this.onDestroy();
        ViewStack.popView();
        ViewStack.pushView(new MainPanel());
    };
    __egretProto__.confirm = function () {
        // 更换英雄
        if (this.chooseHeroId && this.chooseHeroId != this.curHeroId) {
            Game.heroController.changeHero(this.curHeroId, this.chooseHeroId);
        }
        this.onDestroy();
        ViewStack.popView();
        ViewStack.pushView(new MainPanel());
    };
    __egretProto__.goldUpdate = function (evt) {
        this.resBar.lblGold.text = Game.role.gold.toString();
    };
    __egretProto__.chooseHero = function (evt) {
        var heroId = evt.data.id;
        var itemIndex = evt.data.Index;
        var item = this.heroInfo.heroItem.getElementAt(itemIndex);
        if (item)
            item.setGouVisible(true);
        this.showHeroInfo(heroId, itemIndex);
    };
    __egretProto__.showHeroInfo = function (heroId, itemIndex) {
        if (this.lastItemIndex != -1 && this.lastItemIndex != itemIndex) {
            var item = this.heroInfo.heroItem.getElementAt(this.lastItemIndex);
            item.setGouVisible(false);
        }
        this.lastItemIndex = itemIndex;
        this.chooseHeroId = heroId;
        var limitLevel = Game.config.tables['hero'][heroId].unlockLv;
        var islocked = false;
        this.heroInfo.lblUnlockDesc.visible = false;
        if (Game.role.level < limitLevel) {
            islocked = true;
            this.heroInfo.lblUnlockDesc.visible = true;
        }
        var heroAvatar = new HeroAvatar(Game.config.tables['hero'][heroId].modelId); // ?? 有些人物的模型没有
        heroAvatar.setAction("Action_Stand", true);
        heroAvatar.view.x = 65;
        heroAvatar.view.y = 160;
        if (heroAvatar && heroAvatar.view)
            this.heroInfo.picHeroIcon.source = heroAvatar.view;
        var hero = Game.heroController.findHero(heroId);
        var config = Game.config.tables['hero'][hero.id];
        this.heroInfo.lblHeroLv.text = "Lv." + hero.level.toString();
        this.heroInfo.lblHeroName.text = config.name;
        if (hero.level <= 0) {
            this.heroInfo.lblHeroAttack.text = config.initAtk.toString();
            this.heroInfo.lblHeroHp.text = config.initHp.toString();
            this.heroInfo.lblHeroDefend.text = config.initDp.toString();
            this.heroInfo.lblUnlockDesc.visible = true;
        }
        else {
            this.heroInfo.lblHeroAttack.text = (config.initAtk + config.growAtk * (hero.level - 1)).toString();
            this.heroInfo.lblHeroHp.text = (config.initHp + config.growHp * (hero.level - 1)).toString();
            this.heroInfo.lblHeroDefend.text = (config.initDp + config.growDp * (hero.level - 1)).toString();
            this.heroInfo.lblUnlockDesc.visible = false;
        }
    };
    return HeroInfoPanel;
})(StageSkinnableContainer);
HeroInfoPanel.prototype.__class__ = "HeroInfoPanel";
//# sourceMappingURL=HeroInfoPanel.js.map