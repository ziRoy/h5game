/**
 * Created by yinqing on 15-5-13.
 */

class NavigatorBar extends StageSkinnableContainer
{
	public constructor()
	{
		super();
		this.skinName = "skins.game.NavigatorBarSkin";
	}

	public btnStage	:egret.gui.Button;
	public btnDig	:egret.gui.Button;
	public btnHero	:egret.gui.Button;
	public btnBag	:egret.gui.Button;
	public btnTech	:egret.gui.Button;

	public childrenCreated():void
	{
		this.btnStage.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTapStage, this );
		this.btnDig.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTapDig, this );
	}

	private onTapStage(evt):void
	{
		console.log( 'stage' );
	}

	private onTapDig(evt):void
	{
		console.log( 'dig' );
	}
}