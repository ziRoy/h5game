/**
 * Created by yinqing on 15-5-14.
 */

class BagItemRenderer extends egret.gui.ItemRenderer
{
	public picItemIcon		:egret.gui.UIAsset;
	public lblItemName		:egret.gui.Label;
	public lblItemDesc		:egret.gui.Label;
	public lblItemNum		:egret.gui.Label;
	public btnUseItem		:egret.gui.Button;

	//private itemId:number;

	public constructor()
	{
		super();
		this.touchChildren = true;
		this.skinName = "skins.game.bag.BagItemRendererSkin";
	}

	public childrenCreated():void
	{
		this.btnUseItem.addEventListener( egret.TouchEvent.TOUCH_TAP, this.touchItemUse, this );
	}

	public onDestroy():void
	{
		this.btnUseItem.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.touchItemUse, this );
	}

	public dataChanged():void
	{
		var item:Item = <Item>this.data;
		var itemConfig = Game.config.tables['item'][item.itemId];

		if ( itemConfig !== undefined )
		{
			//this.picItemIcon
			this.lblItemName.text = itemConfig['name'];
			this.lblItemDesc.text = itemConfig['description'];
			this.lblItemNum.text = item.itemNum.toString();
			this.btnUseItem.enabled = true;
		}
	}

	private touchItemUse( evt:egret.TouchEvent ):void
	{
		Game.itemController.useItem( this.data.itemId );
	}
}

