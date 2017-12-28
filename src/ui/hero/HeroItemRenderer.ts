/**
 * Created by yulinjian on 15/7/7.
 */

class HeroItemRenderer extends egret.gui.ItemRenderer
{
    public picGou      :egret.gui.UIAsset;
    public picLock     :egret.gui.UIAsset;

    public constructor()
    {
        super();
        this.touchChildren = true;
        this.skinName = "skins.game.hero.HeroItemRendererSkin";
    }

    public dataChanged():void
    {
        //var limitLv = Game.config.tables['hero'][this.data.id].unlockLv;
        //if( limitLv > Game.role.level ){
        //    this.picLock.visible = true;
        //}
        var hero = Game.heroController.findHero( this.data.id );
        if( hero )
        {
            if( hero.level > 0 ) this.picLock.visible = false;
            else this.picLock.visible = true;
        }
    }

    public childrenCreated():void
    {
        this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.touchChild, this);
    }

    private touchChild():void
    {
        Game.eventMgr.dispatch( EventMgr.CHOOSE_HERO, { id: this.data.id, Index: this.itemIndex } );
    }

    public setGouVisible( visible:boolean ):void
    {
        this.picGou.visible = visible ;
    }

}