/**
 * Created by yinqing on 15-4-21.
 */

enum BlockColor
{
	None = 0,
	Red,
	Blue,
	Green,
	Yellow,

	Total
}

enum BlockType
{
	Normal	= 0,
	Special	,
	Gift ,

	Total
}

enum DeBuffType
{
	None = 0 ,
	Firebuff ,
	Doisonbuff ,

	Total
}

class Block
{
	public static ID_INC = 0;

	protected m_context	:IBattleContext;
	public m_view	:egret.DisplayObjectContainer;

	public id		:number;
	public type		:BlockType;
	public color	:BlockColor;
	public width	:number;
	public height	:number;
	public x		:number;
	public y		:number;

    public flag     :boolean;
	public hflag	:boolean;
	public vflag	:boolean;
	public m_locked	:boolean;
	public m_debuff :DeBuffType;

	public constructor( context:IBattleContext , type:BlockType , color?:BlockColor )
	{
		this.m_context 	= context;
		this.id			= ++Block.ID_INC;
		this.type 		= type;
		this.color 		= color;

		this.m_locked = false;
		this.m_debuff = DeBuffType.None;

		//var ran:number = Math.floor(Math.random() * 10 );
		//if( ran >= 9 )
		//{
		//	this.m_locked = true;
		//}
		//else
		//{
		//	this.m_locked = false;
		//}

	}

	public init( args:Object ):void
	{

	}

	public dispose():void
	{
		var bs = this.m_context.board.blocks;
		for ( var i = 0; i < this.width; i++ )
		{
			for ( var j = 0; j < this.height; j++ )
			{
				if ( bs[this.x + i][this.y + j] == this )
				{
					bs[this.x + i][this.y + j] = null;
				}
			}
		}
		if ( this.m_view && this.m_view.parent )
		{
			this.m_view.parent.removeChild( this.m_view );
		}
	}

	public onTap( cb:Function ):void
	{
		cb.call( null );
	}

	public onDropDownComp( cb:Function ):void
	{
		cb.call( null );
	}

	public onElim( cb:Function ):void
	{
		cb.call( null );
	}

	public visit( fr:Block ):boolean
	{
		return false;
	}

	public setPosition( x:number, y:number, t?:number ):void
	{
		var bs = this.m_context.board.blockSize;

		this.x = x;
		this.y = y;
		var px = 4 + x * bs + bs / 2;
		var py = 4 + y * bs + bs;

		if ( t != undefined && t != 0 )
		{
			egret.Tween.get( this.m_view )
				.to( { x:px, y:py }, t )
				.to( { scaleY: 0.85}, 100 )
				.to( { scaleY: 1.0}, 100 );
		}
		else
		{
			this.m_view.x = px;
			this.m_view.y = py;
		}
	}

	public onLight(): void{}
	public onGray(): void{}
	public setLine( pos:Posi ):void {}
	public setHLine():void{}
	public setVLine():void{}
	public rmLine():void {}
	public rmHLine():void{}
	public rmVLine():void{}
	public removeLock():void{}
	public setlock():void{}
	public setDebuff( debufftype:DeBuffType ):void{}
	public rmDebuff():void{}
}

class BlockFactory
{
	public static context:IBattleContext;

	public static create( bt:BlockType, arg:Object ):Block
	{
		var ret:Block;
		switch ( bt )
		{
			case BlockType.Normal:
				ret = new BasicBlock( BlockFactory.context , BlockType.Normal ); break;
			case BlockType.Special:
				ret = new BasicBlock( BlockFactory.context , BlockType.Special , arg[0]); break;
			default :
				console.error( "invalid block type, type=%d", bt );
		}
		ret.init( arg );
		//console.log( 'create, type=%d', bt );

		return ret;
	}

	public static recycle( b:Block ):void
	{
		if(b.m_locked && b.m_locked == true )
		{
			b.removeLock();
			return ;
		}
		b.dispose();
	}
}

class BasicBlock extends Block
{
	protected m_light	:number;
	private m_line		:egret.Shape;
	private m_hLine 	:egret.Shape;
	private m_vLine		:egret.Shape;

	public init( args:Object ):void
	{
		this.width 	= 1;
		this.height = 1;
		this.color = ( args["color"] || Math.floor( Math.random() * ( BlockColor.Total - 1 ) ) + 1 );

		this.m_light 	= 0;

		this.m_view = new egret.DisplayObjectContainer();

		this.loadTexture();
		this.m_context.board.view.addChild( this.m_view );

        this.flag = false;
        this.hflag = false;
        this.vflag = false;
	}

	protected loadTexture():void
	{
		this.m_view.removeChildren();

		var map:egret.Bitmap = new egret.Bitmap();
		map.texture = RES.getRes( "block_" + this.color + "_" + this.type + "_" + this.m_light );
		this.m_view.addChild( map );

		if( this.m_locked == true )
		{
			this.setlock();
		}

		if( this.m_debuff == DeBuffType.Doisonbuff )
		{
			new Effect(102).playBlock( this , true );
		}
		else if( this.m_debuff == DeBuffType.Firebuff )
		{
			new Effect(101).playBlock( this , true );
		}

		this.m_view.anchorOffsetX = this.m_view.width / 2;
		this.m_view.anchorOffsetY = ( this.m_context.board.blockSize + this.m_view.height ) / 2;
	}

	public removeLock():void
	{
		this.m_view.removeChildAt(1);
		this.m_locked = false;
	}

	public setlock():void
	{
		if( this.m_locked == true )
		{
			var map2:egret.Bitmap = new egret.Bitmap();
			map2.texture = RES.getRes( "chain" );
			this.m_view.addChild( map2 );
		}
	}


	public onTap( cb:Function ):void
	{
		var f:any = this.m_context.board.createFlood().start( this );

		var neighbor:Block[] = f.getRes();
		var pt = f.getPt();

		if ( pt >= 3 )
		{
			var task = [];
			var wait = ( idx ) => {
				task.push( (cb) => { neighbor[idx].onElim(cb); } );
			};
			for ( var i = 0; i < neighbor.length; i++ ) wait(i);

			async.parallel( task, () => {
				this.m_context.dispatchEvent( new BoardEvent( BoardEvent.ELIMINATE, { cnt:pt, color: this.color, large:true } ) );
				cb.call( null );
			} );
		}
		else
		{
			cb.call( null );
		}
	}

	public onDropDownComp( cb:Function ):void
	{
		var x = this.x, y = this.y, bs = this.m_context.board.blocks;

		if ( x + 1 < this.m_context.board.w && y + 1 < this.m_context.board.h &&
			bs[x+1][y] && bs[x+1][y].type == this.type && bs[x+1][y].color == this.color &&
			bs[x][y+1] && bs[x][y+1].type == this.type && bs[x][y+1].color == this.color &&
			bs[x+1][y+1] && bs[x+1][y+1].type == this.type && bs[x+1][y+1].color == this.color )
		{
			//BlockFactory.recycle( bs[x][y] );
			//BlockFactory.recycle( bs[x+1][y] );
			//BlockFactory.recycle( bs[x][y+1] );
			//BlockFactory.recycle( bs[x+1][y+1] );
			//bs[x][y] = BlockFactory.create( BlockType.Big, { color:this.color } );
			//bs[x+1][y] = bs[x][y];
			//bs[x][y+1] = bs[x][y];
			//bs[x+1][y+1] = bs[x][y];
			//bs[x][y].setPosition( x, y );
		}
		//else if ( this.m_context.board.createFlood().start( this ).getRes().length >= 5 )
		//{
		//	if ( this.m_light == 0 )
		//	{
		//		this.m_light = 1;
		//		this.loadTexture();
		//	}
		//}
		else
		{
			if ( this.m_light == 1 )
			{
				this.m_light = 0;
				this.loadTexture();
			}
		}

		cb.call( null );
	}

	public onElim( cb:Function ):void
	{
		var anim = [];

		anim.push( ( cb ) =>
		{
			egret.Tween.get( this.m_view )
				.to( {scaleX : 1.2, scaleY : 1.2, alpha : 0.4}, 100 )
				.to( {scaleX : 0.5, scaleY : 0.5}, 200 )
				.call( cb );
		} );

		var target:HeroAvatar = null;
		switch ( this.color )
		{
			case BlockColor.Red:
				target = this.m_context.field.warrior;
				break;
			case BlockColor.Blue:
				target = this.m_context.field.mage;
				break;
			case BlockColor.Green:
				target = this.m_context.field.priest;
				break;
			case BlockColor.Yellow:
				target = this.m_context.field.defender;
				break;
		}

		if ( target )
		{
			var p:egret.Point = target.view.localToGlobal( 0, 0 );
			this.m_view.parent.globalToLocal( p.x, p.y, p );

			anim.push( ( cb ) =>
			{
				egret.Tween.get( this.m_view )
					.to( {x : p.x, y : p.y}, 300, egret.Ease.circOut )
					.call( cb )
			} );
		}

		if( this.m_locked == true )
		{
			anim = [];
		}

		async.parallel( anim, ( err ) =>
		{
			BlockFactory.recycle( this );
			cb.call( null );
		} );
	}

	public visit( fr:Block ):boolean
	{
		return fr.color == this.color;
	}

	public onLight():void
	{
		if( this.m_light == 0)
		{
			this.m_light = 1;
			this.loadTexture();
		}
	}

	public onGray():void
	{
		if( this.m_light == 1 )
		{
			this.m_light = 0 ;
			this.loadTexture();
		}
	}

	public setLine( pos:Posi ):void
	{
		var color = this.getRGB();

        this.m_line = new egret.Shape();
		this.m_line.graphics.lineStyle(4,  color );
		var size = this.m_context.board.blockSize;
		this.m_line.graphics.moveTo(( pos.x + 0.5 )* size , ( pos.y + 0.5 ) * size );
		this.m_line.graphics.lineTo( ( this.x + 0.5 ) * size , ( this.y + 0.5 ) * size );
		this.m_line.graphics.endFill();
		this.m_context.board.view.addChild( this.m_line );
	}

	public setHLine():void
	{
        if( this.hflag == true )
        {
            var color = this.getRGB();
            this.m_hLine = new egret.Shape();
            this.m_hLine.graphics.lineStyle(4, color);
            var size = this.m_context.board.blockSize;
            this.m_hLine.graphics.moveTo(( this.x + 1.5 )* size , ( this.y + 0.5 ) * size );
            this.m_hLine.graphics.lineTo( ( this.x + 0.5 ) * size , ( this.y + 0.5 ) * size );
            this.m_hLine.graphics.endFill();
            this.m_context.board.view.addChild( this.m_hLine );
        }
	}

	public setVLine():void
	{
        if( this.vflag == true )
        {
            var color = this.getRGB();
            this.m_vLine = new egret.Shape();
            this.m_vLine.graphics.lineStyle(4,  color );
            var size = this.m_context.board.blockSize;
            this.m_vLine.graphics.moveTo(( this.x + 0.5 )* size , ( this.y + 1.5 ) * size );
            this.m_vLine.graphics.lineTo( ( this.x + 0.5 ) * size , ( this.y + 0.5 ) * size );
            this.m_vLine.graphics.endFill();
            this.m_context.board.view.addChild( this.m_vLine );
        }
	}

	private getRGB():number
	{
		var color = 0xfffff;
		if( this.color == BlockColor.Blue )
		{
			color = 0x0000ff;
		}
		else if( this.color == BlockColor.Red )
		{
			color = 0xff0000;
		}
		else if( this.color == BlockColor.Green )
		{
			color = 0x00ff00;
		}
		else if( this.color == BlockColor.Yellow )
		{
			color = 0xeedc82;
		}
		return color;
	}

	public rmLine():void
	{
		if( this.m_line && this.m_line.parent )
		{
			this.m_line.graphics.clear();
			this.m_context.board.view.removeChild( this.m_line );
		}
	}

	public rmHLine():void
	{
		if( this.m_hLine && this.m_hLine.parent && this.hflag == true )
		{
			this.m_hLine.graphics.clear();
			this.m_context.board.view.removeChild( this.m_hLine );
            this.hflag = false;
		}
	}

	public rmVLine():void
	{
		if( this.m_vLine && this.m_vLine.parent && this.vflag == true)
		{
			this.m_vLine.graphics.clear();
			this.m_context.board.view.removeChild( this.m_vLine );
            this.vflag  = false;
		}
	}

	public setDebuff( bufftype:DeBuffType ):void
	{
		if( bufftype == DeBuffType.Doisonbuff )
		{
			new Effect(102).playBlock( this , true );
		}
		else if( bufftype == DeBuffType.Firebuff )
		{
			new Effect(101).playBlock( this , true );
		}
	}

}

//class BigBlock extends BasicBlock
//{
//	public init( args:Object ):void
//	{
//		this.width 	= 2;
//		this.height = 2;
//		this.type	= BlockType.Special;
//		this.color = ( args["color"] || Math.floor( Math.random() * ( BlockColor.Total - 1 ) ) + 1 );
//
//		this.m_view		= new egret.Bitmap();
//		this.loadTexture();
//		this.m_context.board.view.addChild( this.m_view );
//	}
//
//	protected loadTexture():void
//	{
//		(<egret.Bitmap>this.m_view).texture = RES.getRes( "block_" + this.color + "_" + 2 );
//		this.m_view.anchorOffsetX = ( this.m_view.width - this.m_context.board.blockSize ) / 2;
//		this.m_view.anchorOffsetY = this.m_view.height / 2;
//	}
//
//	public onDropDownComp( cb:Function ):void
//	{
//		cb.call( null );
//	}
//}
