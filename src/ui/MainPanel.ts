/**
 * Created by yinqing on 15-4-10.
 */

class MainPanel extends StageSkinnableContainer
{
	public constructor()
	{
		super();
		this.skinName = "skins.game.MainPanelSkin";
	}

	public navigatorBar	:NavigatorBar;
	public resBar		:ResBar;
	public content		:egret.gui.Group;

	private stageView	:StageView 	= new StageView();
	private digView		:DigView	= new DigView();
	private heroView	:HeroView   = new HeroView();
	private bagView		:BagView	= new BagView();
	private techView 	:TechView 	= new TechView();


	public childrenCreated():void
	{
		this.navigatorBar.btnStage.addEventListener( egret.TouchEvent.TOUCH_TAP, this.switchStage, this );
		this.navigatorBar.btnDig.addEventListener( egret.TouchEvent.TOUCH_TAP, this.switchDig, this );
		this.navigatorBar.btnHero.addEventListener( egret.TouchEvent.TOUCH_TAP, this.switchHero, this );
		this.navigatorBar.btnBag.addEventListener( egret.TouchEvent.TOUCH_TAP, this.switchBag, this );
		this.navigatorBar.btnTech.addEventListener( egret.TouchEvent.TOUCH_TAP, this.switchTech, this );

		Game.eventMgr.addListener(EventMgr.GOLD_UPDATE, this.goldUpdate.bind(this) );

		this.switchStage();
		this.updateResbar();
	}

	private updateResbar():void
	{
		this.resBar.lvProgress.setValue(13);
		this.resBar.rolelevel.text = Game.role.level.toString();
		this.resBar.lblEnergy.text = Game.role.energy.toString();
		this.resBar.lblGold.text = Game.role.gold.toString();
	}

	private switchStage():void
	{
		if ( this.stageView.stage == null )
		{
			if( this.content.numElements > 0 )
			{
				var view:any = this.content.getElementAt(0);
				if( view ) view.onDestroy();
			}
			this.content.removeAllElements();
			this.content.addElement( this.stageView );
		}
	}

	private switchDig():void
	{
		if ( this.digView.stage == null )
		{
			if( this.content.numElements > 0 )
			{
				var view:any = this.content.getElementAt(0);
				if( view ) view.onDestroy();
			}
			this.content.removeAllElements();
			this.content.addElement( this.digView );
		}
	}

	private switchHero():void
	{
		if( this.heroView.stage == null )
		{
			if( this.content.numElements > 0 )
			{
				var view:any = this.content.getElementAt(0);
				if( view ) view.onDestroy();
			}
			this.content.removeAllElements();
			this.content.addElement( this.heroView );
		}
	}

	private switchBag():void
	{
		if ( this.bagView.stage == null )
		{
			if( this.content.numElements > 0)
			{
				var view:any = this.content.getElementAt(0);
				if( view ) view.onDestroy();
			}
			this.content.removeAllElements();
			this.content.addElement( this.bagView );
		}
	}

	private switchTech():void
	{
		if( this.techView.stage == null )
		{
			if( this.content.numElements > 0 )
			{
				var view:any = this.content.getElementAt(0);
				if( view ) view.onDestroy();
			}
			this.content.removeAllElements();
			this.content.addElement( this.techView );
		}
	}

	private goldUpdate(evt:DataEvent):void
	{
		this.resBar.lblGold.text = Game.role.gold.toString();
	}
}
