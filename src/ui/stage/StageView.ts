/**
 * Created by yinqing on 15-5-13.
 */

class StageView extends StageSkinnableContainer
{
	public constructor()
	{
		super();
		this.skinName = "skins.game.stage.StageViewSkin";
	}

	public childrenCreated():void
	{
		this.addEventListener( egret.TouchEvent.TOUCH_TAP, (evt:egret.TouchEvent )=> { this.addBattleStart(evt); }, this );
	}

	public onDestroy():void
	{
		this.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.addBattleStart, this );
	}

	private addBattleStart( evt:egret.TouchEvent):void
	{
		if( evt.target && evt.target.name )
		{
			var name = Game.config.tables['stage'][evt.target.name].name;
			var pop = new BattleStart( { stageName:name } );
			egret.gui.PopUpManager.addPopUp( pop, true, true );
		}
	}

}