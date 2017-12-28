/**
 * Created by yulinjian on 15/7/7.
 */
var HeroItemRenderer = (function (_super) {
    __extends(HeroItemRenderer, _super);
    function HeroItemRenderer() {
        _super.call(this);
        this.touchChildren = true;
        this.skinName = "skins.game.hero.HeroItemRendererSkin";
    }
    var __egretProto__ = HeroItemRenderer.prototype;
    __egretProto__.dataChanged = function () {
        //var limitLv = Game.config.tables['hero'][this.data.id].unlockLv;
        //if( limitLv > Game.role.level ){
        //    this.picLock.visible = true;
        //}
        var hero = Game.heroController.findHero(this.data.id);
        if (hero) {
            if (hero.level > 0)
                this.picLock.visible = false;
            else
                this.picLock.visible = true;
        }
    };
    __egretProto__.childrenCreated = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchChild, this);
    };
    __egretProto__.touchChild = function () {
        Game.eventMgr.dispatch(EventMgr.CHOOSE_HERO, { id: this.data.id, Index: this.itemIndex });
    };
    __egretProto__.setGouVisible = function (visible) {
        this.picGou.visible = visible;
    };
    return HeroItemRenderer;
})(egret.gui.ItemRenderer);
HeroItemRenderer.prototype.__class__ = "HeroItemRenderer";
//# sourceMappingURL=HeroItemRenderer.js.map