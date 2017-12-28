/**
 * Created by yulinjian on 15/5/29.
 */

class BattleResult extends egret.gui.SkinnableContainer
{
    public lblStageName		:egret.gui.Label;
    public btnOk            :egret.gui.Button;

    private info			:any;

    public constructor( info:any )
    {
        super();
        this.skinName 	= "skins.game.battle.BattleResultSkin";
        this.info		= info;

    }

    public childrenCreated():void
    {
        this.lblStageName.text = this.info.stageName;

        this.btnOk.addEventListener( egret.TouchEvent.TOUCH_TAP, ( evt ) => {

            egret.gui.PopUpManager.removePopUp( this );
            ViewStack.popView( true );

        } , this );
    }
}