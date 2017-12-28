/**
 * Created by yinqing on 15-5-13.
 */

class BattleStart extends egret.gui.SkinnableContainer
{
	public lblStageName		:egret.gui.Label;
	public btnStart			:egret.gui.Button;
	public btnCancel		:egret.gui.Button;

	private info			:any;

	public constructor( info:any )
	{
		super();
		this.skinName 	= "skins.game.stage.StageStartSkin";
		this.info		= info;
	}

	public childrenCreated():void
	{
		this.lblStageName.text = this.info.stageName;

		this.btnStart.addEventListener( egret.TouchEvent.TOUCH_TAP, ( evt ) => {

			egret.gui.PopUpManager.removePopUp( this );

			var battleScene:any = new egret.gui.UIAsset( new BattleScene( this.info.stageName ) );
			battleScene.touchEnabled = battleScene.touchChildren = true;
			ViewStack.pushView( battleScene );

		}, this );

		this.btnCancel.addEventListener( egret.TouchEvent.TOUCH_TAP, ( evt ) => {

			egret.gui.PopUpManager.removePopUp( this );

		}, this );
	}
}