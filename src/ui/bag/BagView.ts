/**
 * Created by yinqing on 15-5-14.
 */

class BagView extends StageSkinnableContainer
{
	public dgItem			:egret.gui.DataGroup;

	public constructor()
	{
		super();
		this.skinName = "skins.game.bag.BagViewSkin";
	}

	public onDestroy():void
	{
		Game.eventMgr.removeListener( EventMgr.BAG_UPDATE, this.update.bind(this) );
	}

	public childrenCreated():void
	{
		this.dgItem.dataProvider = new egret.gui.ArrayCollection( Game.role.bag );
		this.dgItem.itemRenderer = new egret.gui.ClassFactory( BagItemRenderer );

		Game.eventMgr.addListener( EventMgr.BAG_UPDATE, this.update.bind(this) );
	}

	public update( evt:DataEvent = null ):void
	{
		Tools.refreshList( this.dgItem );
	}
}
