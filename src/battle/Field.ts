/**
 * Created by yinqing on 15-2-28.
 */
class Avatar
{
	public constructor( id:number, config:Object, skin:number = 1 )
	{
		this.id		= id;
		this.skin	= skin;
		this.config	= config;
		this.view 	= new FlccMovieClip( id, skin, ( flcc ) => {
			this.loaded = true;
			flcc.setAction( this.actionName, this.actionLoop );
		} );

		var shadow = new egret.Bitmap( RES.getRes( "shadow" ) );
		shadow.anchorX = shadow.anchorY = 0.5;
		this.view.addChild( shadow );

		this.view.scaleX *= 0.75;
		this.view.scaleY *= 0.75;
	}

	public setAction( name:string, loop:boolean = false ):void
	{
		this.actionName = name;
		this.actionLoop = loop;

		if ( this.loaded )
		{
			this.view.setAction( this.actionName, this.actionLoop );
		}
	}

	public appendMove( name:string, target:Avatar, hitAction:boolean,
					   onHit:( cur:number, total:number ) => void,
					   onComp?: () => void )
	{
		this.moveQueue.push( { name:name, target:target, hitAction:hitAction, onHit:onHit, onComp:onComp } );
		//this.nextMove();
	}

	public start(cb:Function):void
	{
		this.nextMove(cb);
	}

	public hit():void
	{
		if ( this.actionName == "Action_Hit" )
		{
			this.setAction( "Action_Hit", false );
		}
		else if ( this.actionName == "Action_Stand" )
		{
			this.view.addEventListener( egret.Event.COMPLETE, () => {
				this.view.removeEventListener( egret.Event.COMPLETE, arguments.callee, this );
				this.setAction( "Action_Stand", true );
				this.nextMove();
			}, this );

			this.setAction( "Action_Hit", false );
		}
		else
		{
			return;
		}
	}

	private nextMove(cb?:Function):boolean
	{
		if ( this.moveQueue.length == 0 )
		{
			this.setAction( "Action_Stand", true );
			if( cb )
			{
				cb.call(null);
			}
			return false;
		}
		var move = this.moveQueue.shift();

		this.xuliRemove(); 		// 移除蓄力效果

		this.setAction( "Action_" + move.name );

		// 自身特效
		var effSelf = this.config[ move.name + "Display"].eff_self;
		if ( effSelf ) new Effect( effSelf ).playOn( this );

		// 目标特效
		var effTarget = this.config[ move.name + "Display" ].eff_target;
		if ( effTarget ) new Effect( effTarget ).playOn( move.target );

		var hitFrame = ( this.config[ move.name + "Display" ].hit || [0] );

		var scheduleHit = () => {
			var hitLen = hitFrame.length;
			for ( var i = 0; i < hitLen; i++ )
			{
				setTimeout( ( idx ) => {

					if ( idx == 0 )
					{
						var buff = this.config[ move.name + "Display" ].missile;
						if ( buff )
						{
							move.target.addBuff( buff[0], buff[2], buff[1] );
						}
					}

					if ( move.hitAction ) move.target.hit();
					if ( move.onHit ) move.onHit( idx, hitLen );

				}, hitFrame[i] * this.view.frameTime, i );
			}
		};

		var missile = this.config[ move.name + "Display" ].missile;
		if ( missile )	// 弹道式
		{
			var missileSpcc = new SpccMovieClip( missile[0], ( ef:SpccMovieClip ) => {
				ef.play( true );
			});

			var tp = new egret.Point();

			move.target.view.localToGlobal( 0, -move.target.view.height / 2, tp );
			this.view.globalToLocal( tp.x , tp.y, tp );

			egret.Tween.get( missileSpcc )
				.wait( missile[1] * this.view.frameTime )
				.call( () => {
					this.view.addChild( missileSpcc );
				}, this )
				.to( { y: -this.view.height / 2 }, 0 )
				.to( { x:tp.x, y:tp.y }, 500 )
				.call( () => {
					this.view.removeChild( missileSpcc );
					new Effect( missile[2] ).playOn( move.target );
					//scheduleHit();
				});
		}
		else
		{
			scheduleHit();
		}
		this.view.addEventListener( egret.Event.COMPLETE, () => {

			this.view.removeEventListener( egret.Event.COMPLETE, arguments.callee, this );

			if ( move.onComp ) move.onComp();

			this.nextMove(cb);

		}, this );
	}

	public addBuff( id:number, effId:number, duration:number ):void
	{
		var buff = this.buffMap[id];
		if ( buff )
		{
			clearTimeout( buff.clock );
			buff.clock = setTimeout( () => {
				this.removeBuff( id );
			}, duration );
		}
		else
		{
			this.buffMap[id] = {
				"eff" 	: new Effect( effId ).playOn( this, true ),
				"clock"	: setTimeout( () => {
					this.removeBuff( id );
				}, duration )
			};
		}
	}

	public removeBuff( id:number ):void
	{
		var buff = this.buffMap[id];
		if ( buff )
		{
			buff.eff.remove();
			clearTimeout( buff.clock );
			delete this.buffMap[id];
		}
	}

	public view			:FlccMovieClip;
	public id			:number;
	public skin			:number;
	public loaded		:boolean = false;

	public get busy():boolean
	{
		return this.actionName != "Action_Stand";
	}

	public xuliEffect()
	{
		if( !this.xulieff )
		{
			this.xulieff = new Effect(2034).playOn( this, true) ;
		}

	}

	public xuliRemove()
	{
		if( this.xulieff )
		{
			this.xulieff.remove();
			this.xulieff = null;
		}
	}

	private actionName	:string		= "";
	private actionLoop	:boolean	= false;

	private moveQueue	:any[]		= [];
	private config		:Object;
	private buffMap		:Object		= {};
	private xulieff		:Effect;

	public get name() { return "unknown"; }
}

class HeroAvatar extends Avatar
{
	private m_atk	:number;
	public constructor( id:number )
	{
		super( id, Game.config.tables["hero"][id] );

		this.m_atk = Game.config.tables['hero'][id].initAtk;
	}

	public get name() { return "hero" + this.id; }

	public get atk() { return this.m_atk; }
	public set atk( atk:number ) { this.m_atk = atk ; }
}

class MonsterAvatar extends Avatar
{
	private m_label  		:egret.gui.Label;
	private ClickLimitNumber:number = 5;
	public  m_ClickNumber	:number = this.ClickLimitNumber;
	private m_hpBar			:HpBar;

	private m_hpMax			:number = 100 ;
	private m_hpCur 		:number = this.m_hpMax;
	public  m_atk           :number;
	private m_monsterLv		:number;
	private m_monsterAtk    :Function;

	public constructor(id:number,lv:number,job:number,ty:number,round:number,cb:Function,config:Object = {} )
	{
		super(id, config );

		this.m_ClickNumber = this.ClickLimitNumber = round;
		this.m_monsterAtk = cb;

		this.m_label = new egret.gui.Label();
		this.m_label.text = this.m_ClickNumber.toString();
		this.m_label.textColor = 0xff0000;
		this.view.addChild( this.m_label );

		this.m_hpBar = new HpBar( new egret.Bitmap( RES.getRes( "hp_bar_red" ))
				, new egret.Bitmap( RES.getRes("hp_bar_bg")));
		this.m_hpBar.x = -50;
		this.m_hpBar.y = -70;
		this.view.addChild( this.m_hpBar );

		this.m_monsterLv = lv;
		this.m_hpMax = this.getHp( lv, job , ty) ;
		this.m_atk = this.getatk( lv, job , ty) ;
		this.m_hpCur = this.m_hpMax;

		this.updateMonsterHp();
	}
	public get name() { return "monster" + this.id; }

	private getHp(lv:number,job:number,ty:number):number
	{
		var config = Game.config.tables['monster_lv'][lv];
		var result = Game.config.tables['monster_type'][ty].Left / 10000 + 1;
		switch ( job ){
			case 1:
				result *= config.hp1;
				break;
			case 2:
				result *= config.hp2;
				break;
			case 3:
				result *= config.hp3;
				break;
			case 4:
				result *= config.hp4;
				break;
			default:
				return -1;
		}
		return Math.floor( result ) ;
	}

	private getatk(lv:number,job:number,ty:number):number
	{
		var config = Game.config.tables['monster_lv'][lv];
		var result = Game.config.tables['monster_type'][ty].Str / 10000 + 1;
		switch( job ){
			case 1:
				result *= config.attak1;
				break;
			case 2:
				result *= config.attak2;
				break;
			case 3:
				result *= config.attak3;
				break;
			case 4:
				result *= config.attak4;
				break;
			default :
				return -1;
		}
		return Math.floor( result );
	}

	public subClickNumber():void
	{
		this.m_ClickNumber -- ;
		if( this.m_ClickNumber <= 0 )
		{
			this.m_monsterAtk.call( null );
			this.m_ClickNumber = this.ClickLimitNumber;
		}
		this.m_label.text = this.m_ClickNumber.toString();
	}

	public getHpCur():number
	{
		return this.m_hpCur;
	}

	public setHpCur( hpCnt:number ):void
	{
		if( hpCnt < 0 ) hpCnt = 0;
		this.m_hpCur = Math.floor(hpCnt);
		this.updateMonsterHp();
	}

	public updateMonsterHp():void
	{
		this.m_hpBar.text = "HP:" + this.m_hpCur;
		this.m_hpBar.percent = this.m_hpCur / this.m_hpMax;
	}

}

class Effect
{
	public id	:number;
	public view	:SpccMovieClip;

	public constructor( id:number )
	{
		this.id = id;
	}

	public playOn( avatar:Avatar, loop:boolean = false ):Effect
	{
		this.view = new SpccMovieClip( this.id, ( ef:SpccMovieClip ) => {
			//ef.scaleX = avatar.view.scaleX;
			//ef.scaleY = avatar.view.scaleY;

			if ( !loop )
			{
				ef.addEventListener( egret.Event.COMPLETE, () => {
					ef.removeEventListener( egret.Event.COMPLETE, arguments.callee, this );
					ef.parent.removeChild( ef );
				}, this );
			}
			avatar.view.addChild( ef );
			ef.play( loop );
		});
		return this;
	}

	public playBlock( block:BasicBlock, loop:boolean = false ):Effect
	{
		this.view = new SpccMovieClip( this.id, ( ef:SpccMovieClip ) => {
			if( !loop )
			{
				ef.addEventListener( egret.Event.COMPLETE, () => {
					ef.removeEventListener( egret.Event.COMPLETE, arguments.callee, this );
					ef.parent.removeChild( ef );
				}, this );
			}
			block.m_view.addChild( ef );
			ef.play( loop );
		});
		return this;
	}

	public remove():void
	{
		if ( this.view.parent ) this.view.parent.removeChild( this.view );
	}
}

class MyModel
{
	public constructor( cb?:Function )
	{
		this.m_cb = cb;

		var heroWarriorConfig = Game.config.tables['hero'][Game.role.heroWarrior.id];
		var heroDefenderConfig = Game.config.tables['hero'][Game.role.heroDefender.id];
		var heroMageConfig = Game.config.tables['hero'][Game.role.heroMage.id];
		var heroPriestConfig = Game.config.tables['hero'][Game.role.heroPriest.id];

		this.hpMax = heroWarriorConfig.initHp + ( Game.role.heroWarrior.level - 1 ) * heroWarriorConfig.growHp
					+ heroDefenderConfig.initHp + ( Game.role.heroDefender.level - 1 ) * heroDefenderConfig.growHp
					+ heroMageConfig.initHp + ( Game.role.heroMage.level - 1 ) * heroMageConfig.growHp
					+ heroPriestConfig.initHp + ( Game.role.heroPriest.level - 1 ) * heroPriestConfig.growHp;

		this.dpMax = heroWarriorConfig.initDp + ( Game.role.heroWarrior.level - 1 ) * heroWarriorConfig.growDp
					+ heroDefenderConfig.initDp + ( Game.role.heroDefender.level - 1 ) * heroDefenderConfig.growDp
					+ heroMageConfig.initDp + ( Game.role.heroMage.level - 1 ) * heroMageConfig.growDp
					+ heroPriestConfig.initDp + ( Game.role.heroPriest.level - 1 ) * heroPriestConfig.growDp;

		this.atk = heroWarriorConfig.initAtk + ( Game.role.heroWarrior.level - 1 ) * heroWarriorConfig.growAtk
					+ heroDefenderConfig.initAtk + ( Game.role.heroDefender.level - 1 ) * heroDefenderConfig.growAtk
					+ heroMageConfig.initAtk + ( Game.role.heroMage.level - 1 ) * heroMageConfig.growAtk
					+ heroPriestConfig.initAtk + ( Game.role.heroPriest.level - 1 ) * heroPriestConfig.growAtk;

		this.m_hpCur = this.hpMax;
		this.m_dpCur = this.dpMax;
	}
	public get hpCur():number { return Math.floor(this.m_hpCur); }
	public set hpCur( v:number )
	{
		this.m_hpCur = Math.max( Math.min( v, this.hpMax ), 0 );
		if ( this.m_cb ) this.m_cb.call( null );
	}

	public get dpCur():number { return this.m_dpCur; }
	public set dpCur( v:number )
	{
		this.m_dpCur = Math.max( Math.min( v, this.dpMax ), 0 );
		if ( this.m_cb ) this.m_cb.call( null );
	}

	public hpMax	:number = 100;
	public dpMax	:number = 10;
	public atk		:number = 3;

	private m_cb	:Function;
	private m_hpCur	:number = this.hpMax;
	private m_dpCur	:number = this.dpMax;
}

//class EnemyModel
//{
//	public constructor( cb?:Function )
//	{
//		this.m_cb = cb;
//	}
//
//	public get hpCur():number { return this.m_hpCur; }
//	public set hpCur( v:number )
//	{
//		this.m_hpCur = Math.max( Math.min( v, this.hpMax ), 0 );
//		if ( this.m_cb )
//		{
//			this.m_cb.call( null );
//		}
//	}
//
//	public reload():void
//	{
//		this.hpMax = 3000;
//		this.hpCur = this.hpMax;
//		//this.atkTs = 0;
//	}
//
//	public hpMax	: number = 3000;
//	public atk		: number = 30;
//
//	private m_cb	:Function;
//	private m_hpCur	:number = this.hpMax;
//
//	public atkFunc		:Function;
//}

class MyEffectList
{
	public cnt 	 :number;
	public color :number;
	public large :boolean;
}

class Field extends egret.EventDispatcher
{
	public view			:egret.DisplayObjectContainer;
	public warrior		:HeroAvatar;
	public defender		:HeroAvatar;
	public mage			:HeroAvatar;
	public priest		:HeroAvatar;
	public monster		:MonsterAvatar[];
	public monster_num  :number;
	public stageIndex   :number = 0;
	public monster_list :any;
	public monster_lv 	:number;

	private m_context		:IBattleContext;
	//private m_heroConfig	:Object;

	//private	m_txtNxtAtk		:egret.TextField;
	private m_heroHpBar		:HpBar;
	private m_heroDpBar		:HpBar;

	private m_my		:MyModel;
	//private m_enemy		:EnemyModel;

	public constructor( context:IBattleContext )
	{
		super();
		this.m_context = context;
	}

	public load( cb:Function, target?:any ):void
	{
		new AssetGroup( "field" )
			.appendRes( "scene_top", RES.ResourceItem.TYPE_IMAGE, "assets/battle/scene/top.png" )
			.appendRes( "shadow", RES.ResourceItem.TYPE_IMAGE, "assets/battle/scene/shadow.png" )
			.appendRes( "battle_ui", "sheet", "assets/battle/ui/battle_ui.json" )
			.load( ()=>{
				this.build();
				cb.call( target );
			});
	}

	private build():void
	{
		this.m_my 	= new MyModel( () => { this.updateUI(); } );
		//this.m_enemy= new EnemyModel( () => { this.updateUI(); } );
		//this.m_enemy.atkFunc = () => { this.monsterAtk(); };

		this.view = new egret.DisplayObjectContainer();
		this.view.touchEnabled = this.view.touchChildren = false;

		var bg:egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes( "scene_top" );	// 480 * 320
		bg.width = 500;
		bg.x = ( 400 - 500 ) / 2;
		bg.y = 0;
		this.view.addChild( bg );

		this.warrior = new HeroAvatar( Game.role.heroWarrior.id );
		this.warrior.setAction( "Action_Stand", true );
		this.warrior.view.x = 190;
		this.warrior.view.y = 140;
		this.warrior.view.scaleX *= -1;
		this.view.addChild( this.warrior.view );

		this.mage = new HeroAvatar( Game.role.heroMage.id );
		this.mage.setAction( "Action_Stand", true );
		this.mage.view.x = 90;
		this.mage.view.y = 140;
		this.mage.view.scaleX *= -1;
		this.view.addChild( this.mage.view );

		this.priest = new HeroAvatar( Game.role.heroPriest.id );
		this.priest.setAction( "Action_Stand", true );
		this.priest.view.x = 60;
		this.priest.view.y = 225;
		this.priest.view.scaleX *= -1;
		this.view.addChild( this.priest.view );

		this.defender = new HeroAvatar( Game.role.heroDefender.id );
		this.defender.setAction( "Action_Stand", true );
		this.defender.view.x = 160;
		this.defender.view.y = 225;
		this.defender.view.scaleX *= -1;
		this.view.addChild( this.defender.view );

		this.m_heroHpBar = new HpBar( new egret.Bitmap( RES.getRes( "hp_bar_red" ) )
			, new egret.Bitmap( RES.getRes( "hp_bar_bg" ) ) );
		this.m_heroHpBar.x = 30;
		this.m_heroHpBar.y = 260;
		this.m_context.uiLayer.addChild( this.m_heroHpBar );

		this.m_heroDpBar = new HpBar( new egret.Bitmap( RES.getRes( "hp_bar_blue") ),
			new egret.Bitmap( RES.getRes( "hp_bar_bg" ) ) );
		this.m_heroDpBar.x = 260;
		this.m_heroDpBar.y = 260;
		this.m_context.uiLayer.addChild( this.m_heroDpBar );

		this.m_context.addEventListener( BoardEvent.ELIMINATE, this.onEliminate, this );
		this.m_context.addEventListener( BoardEvent.CLICK_EMPTY, this.onPenalty, this );
		this.m_context.addEventListener( BoardEvent.CLICK_WRONG, this.onPenalty, this );
		this.m_context.addEventListener( BoardEvent.CLICK_END, this.onClickEnd, this );
		this.m_context.addEventListener( BoardEvent.REDRAWMAINUI, this.reDrawMainUI, this);
		this.m_context.addEventListener( BoardEvent.CLICK_NUMBER, this.onClickNumber, this);
		this.m_context.addEventListener( BoardEvent.DEBUFF_ATK , this.debuffAtk, this);

		this.loadMonster();

		this.updateUI();
	}

	private onEliminate( evt:BoardEvent ):void
	{
		switch ( evt.data.color )
		{
			case BlockColor.Red:
				this.warriorAtk( evt.data.cnt, evt.data.large );
				break;
			case BlockColor.Blue:
				this.magerAtk( evt.data.cnt, evt.data.large );
				break;
			case BlockColor.Green:
				this.priestAtk( evt.data.cnt, evt.data.large );
				break;
			case BlockColor.Yellow:
				this.defenderAtk( evt.data.cnt, evt.data.large );
				break;
		}
	}

	private onClickEnd(): void
	{
		async.parallel( [
				(cb) => { this.warrior.start(cb); },
				(cb) => { this.priest.start(cb); },
				(cb) => { this.mage.start(cb); },
				(cb) => { this.defender.start(cb); }
			],
			( )  => {
				//this.m_context.dispatchEvent( new BoardEvent(BoardEvent.REDRAWMAINUI, {}));
			} );
	}

	private reDrawMainUI():void
	{
		this.m_context.board.reDrawMainUI();
	}

	private onPenalty( evt:BoardEvent ):void
	{
		//this.m_enemy.addProgress( 500 );
		console.log(" wrong or empty add cost minutes");
	}

	private warriorAtk( power:number, large:boolean ):void
	{
		this.warrior.appendMove( large ? "Skill2" : "Skill1", this.monster[this.monster_num-1], true, ( cur, total ) => {
			if( this.monster_num - 1 < 0 )
			{
				return ;
			}
			var monster_blood = this.monster[this.monster_num-1].getHpCur();
			var hurt = this.warrior.atk * ( 1 + Game.config.tables['formula'][4].param1 * Math.pow((power - 3),Game.config.tables['formula'][4].param2) );
			this.monster[this.monster_num-1].setHpCur( monster_blood - hurt );

			this.updateStageLevel();
		} );
		this.warrior.xuliEffect();
	}

	private magerAtk( power:number, large:boolean ):void
	{
		this.mage.appendMove( large ? "Skill2" : "Skill1", this.monster[this.monster_num-1], true, ( cur, total ) => {
			if( this.monster_num - 1 < 0 )
			{
				return ;
			}
			var monster_blood = this.monster[this.monster_num-1].getHpCur();
			var hurt = this.mage.atk * ( 1 + Game.config.tables['formula'][5].param1 * Math.pow((power - 3),Game.config.tables['formula'][5].param2) );
			this.monster[this.monster_num-1].setHpCur( monster_blood - hurt );

			this.updateStageLevel();
		} );
		this.mage.xuliEffect();
	}

	private priestAtk( power:number, large:boolean ):void
	{
		this.priest.appendMove( large ? "Skill2" : "Skill1", this.warrior, false, ( cur, total ) => {
			if( this.monster_num - 1 < 0 )
			{
				return ;
			}
			var monster_blood = this.monster[this.monster_num-1].getHpCur();
			var hurt = this.priest.atk * ( 1 + Game.config.tables['formula'][6].param1 * Math.pow((power - 3),Game.config.tables['formula'][6].param2) );
			this.monster[this.monster_num-1].setHpCur( monster_blood - hurt );

			this.updateStageLevel();
		} );
		this.priest.xuliEffect();
	}

	private defenderAtk( power:number, large:boolean ):void
	{
		this.defender.appendMove( large ? "Skill2" : "Skill1", this.monster[this.monster_num-1], false, ( cur , total ) => {
			this.m_my.hpCur += power * this.m_my.atk / total;
		});
		this.defender.xuliEffect();
	}

	private monsterAtk():void
	{
		for( var i = 0 ; i < this.monster_num; i ++ )
		{
			if( this.monster[i].m_ClickNumber > 0 ) continue;
			var cur_index =  i;
			this.monster[i].appendMove( "Skill1", this.warrior, true, ( cur, total) => {
				if ( this.m_my.dpCur > 0 )
				{
					this.m_my.dpCur -= this.monster[cur_index].m_atk * 0.5 / total;
					this.m_my.hpCur -= this.monster[cur_index].m_atk * 0.3 / total;
				}
				else
				{
					this.m_my.hpCur -= this.monster[cur_index].m_atk / total;
				}
				this.m_context.board.showMonsterSkill( Game.config.tables['monster_mode'][this.monster_list[this.stageIndex-1][cur_index].id].skill );

			});
			this.monster[i].start( null );
		}
	}

	private debuffAtk( evt:BoardEvent ):void
	{
		for( var i = 0; i < this.monster_num; i ++ )
		{
			this.m_my.hpCur -= ( this.monster[i].m_atk * Game.config.tables['formula'][20].param1 * evt.data.doison
			                  + this.monster[i].m_atk * Game.config.tables['formula'][21].param1 * evt.data.fire );
		}
		this.updateStageLevel();
	}

	private updateUI():void
	{
		this.m_heroHpBar.text = "HP:" + this.m_my.hpCur;
		this.m_heroHpBar.percent = this.m_my.hpCur / this.m_my.hpMax;

		this.m_heroDpBar.text = "DP:" + this.m_my.dpMax;
		this.m_heroDpBar.percent = this.m_my.dpCur / this.m_my.dpMax;

		this.updateStageLevel();
	}

	public updateStageLevel():void
	{
		var monsterIndex = this.monster_num - 1;


		if( this.monster[monsterIndex].getHpCur() > 0 )
		{
			return ;
		}

		if( this.monster[monsterIndex] && this.monster[monsterIndex].view.parent )
		{
			this.monster[monsterIndex].view.parent.removeChild( this.monster[monsterIndex].view );
			this.monster_num -- ;
		}

		if( this.m_my.hpCur <= 0 )
		{
			var result = new BattleResult( { stageName : "You Lose !!!! "} ) ;
			egret.gui.PopUpManager.addPopUp( result, true, true );
		}
		else if( this.monster_num <= 0 )
		{
			if( this.monster_num <= 0 && this.stageIndex >= this.monster_list.length )
			{
				var result = new BattleResult( { stageName : "You Win !"} );
				egret.gui.PopUpManager.addPopUp( result, true, true );
			}
			else if( this.monster_num <= 0 && this.stageIndex < this.monster_list.length )
			{
				this.loadMonster();
			}
		}
	}

	private loadMonster(): void
	{
		for( var i = 0; i < this.monster_num; i ++ )
		{
			if( this.monster[i] && this.monster[i].view.parent )
			{
				this.monster[i].view.parent.removeChild( this.monster[i].view );
			}
		}

		var result = -1;

		for( var i = 1; i <= 12; i ++ )
		{
			if( this.m_context.stageName == Game.config.tables['stage'][i].name )
			{
				result = i;
				break;
			}
		}
		var id = Game.config.tables['stage'][result].monsterId;

		this.monster_list = Game.config.tables['monster'][id].lstWave;
		this.monster_lv = Game.config.tables['monster'][id].level;
		this.monster_num = this.monster_list[ this.stageIndex ].length;

		this.monster = [];
		for( var i = 0 ; i < this.monster_num ; i ++ )
		{
			var monster = new MonsterAvatar(Game.config.tables['monster_mode'][this.monster_list[this.stageIndex][i].id].modelId,
				this.monster_lv,
				Game.config.tables['monster_mode'][this.monster_list[this.stageIndex][i].id].job,
				this.monster_list[this.stageIndex][i].type,
				Game.config.tables['monster_mode'][this.monster_list[this.stageIndex][i].id].round,
				() => { this.monsterAtk(); },
				Game.config.tables['monster_mode'][this.monster_list[this.stageIndex][i].id]
			);
			monster.setAction("Action_Stand", true);
			monster.view.x = 350;
			monster.view.y = 200 - ( i * 70 );
			this.monster.push( monster );
			this.view.addChild( monster.view );
		}

		this.stageIndex ++ ;

		// this.m_enemy.reload();
		// this.updateUI();
	}

	private onClickNumber( evt:BoardEvent ):void
	{
		for( var i = 0 ; i < this.monster_num; i ++ )
		{
			this.monster[i].subClickNumber();
		}
	}


}