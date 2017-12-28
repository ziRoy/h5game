/**
 * Created by yinqing on 15-5-14.
 */

class DigView extends StageSkinnableContainer
{
	public picLeftIcon	:egret.gui.UIAsset;
	public dgDigItem	:egret.gui.DataGroup;

	public constructor()
	{
		super();
		this.skinName = "skins.game.dig.DigViewSkin";
	}

	public childrenCreated():void
	{
		this.picLeftIcon.scaleX = -1;
		var data = [];
		for ( var i = 0; i < 4; i++ )
		{
			data.push( {text: "" + i } );
		}

		this.dgDigItem.dataProvider = new egret.gui.ArrayCollection( data );
		this.dgDigItem.itemRenderer = new egret.gui.ClassFactory( DigItemRenderer );
	}

	public onDestroy():void
	{

	}
}