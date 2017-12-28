/**
 * Created by yinqing on 15-5-14.
 */

class DigItemRenderer extends egret.gui.ItemRenderer
{
	public picDigIcon		:egret.gui.UIAsset;
	public lblDesc			:egret.gui.Label;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.skinName = "skins.game.dig.DigItemRendererSkin";
	}

	public dataChanged():void
	{
		console.log(" text ::: ",this.data.text );

		this.touchEnabled = true;
		this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTouch, this );
	}

	private onTouch( evt:egret.Event ):void
	{
		var tw = egret.Tween.get( this );
		tw.to({ scaleX: 0.8, scaleY:0.8 }, 100 ).to( { scaleX:1, scaleY:1}, 100 );

		console.log(" has Touched .. ");
	}
}