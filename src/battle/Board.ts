/**
 * Created by yinqing on 15-2-28.
 */

class Posi
{
	public x :number;
	public y :number;
}

class Board
{
	public view         :egret.DisplayObjectContainer;
	public w			:number = 6;
	public h  			:number = 4;
	public blockSize	:number = 66;
	public blocks       :Block[][];

	private m_context	:IBattleContext;
	private m_blockCache:Block[];

	private m_initTime   :number = 0;

    //private m_eliminateSE;
	private m_dropTime	:number = 40;
	private m_leftWait  :number = 5;
	private m_reDraw 	:boolean = true;

	private m_touchlist :Posi[];
	private m_curPos 	:number;
	private m_prePos 	:number;

	private blockUpgrade:number;

	public constructor( context:IBattleContext )
	{
		this.m_context			= context;
		this.m_blockCache 		= [];
		BlockFactory.context	= context;

		this.m_touchlist 		= [];
        //this.m_eliminateSE = SoundUtil.getSound("battle_bubble_collect.mp3")
		this.blockUpgrade = Game.config.tables['formula'][3].param1;
	}

	public load( cb:Function, target?:any ):void
	{
		new AssetGroup( "board" )
			.appendRes( "board_bg", RES.ResourceItem.TYPE_IMAGE, "assets/battle/board/bg.png" )
			//.appendRes( "board_mask", RES.ResourceItem.TYPE_IMAGE, "assets/demo/board/mask.png" )
			.appendRes( "block", RES.ResourceItem.TYPE_SHEET, "assets/battle/board/block.json" )
			.load( ()=>{
				this.build();
				cb.call( target );
			});
	}

	private build():void
	{
		this.view = new egret.DisplayObjectContainer();

		var bg:egret.Bitmap = new egret.Bitmap();
		bg.texture = RES.getRes( "board_bg" );	// 500 * 400
		bg.x = ( 400 - 540 ) / 2;
		bg.y = ( 345 - 394 );  // ( 345 - 320 + 1 );
		this.view.addChild( bg );

		//var mask:egret.Bitmap = new egret.Bitmap();
		//mask.texture = RES.getRes( "board_mask" );	// 392 * 345
		//mask.x = 4;
		//mask.y = 4;
		//this.view.addChild( mask );

		this.blocks = [];

		for ( var i:number = 0; i < this.w; i++ )
		{
			var row = [];
			for ( var j:number = 0; j < this.h; j++ )
			{
				row.push( null );
			}
			this.blocks.push( row );
		}
		this.shuffle();

		this.view.touchEnabled = true;
		this.view.touchChildren = false;
		//this.view.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onBoardTap, this );
		this.view.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
		this.view.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
		this.view.addEventListener( egret.TouchEvent.TOUCH_END, this.onEnd, this);
	}

	private onBegin( evt:egret.TouchEvent ):void
	{
		this.onEnd();
		this.m_curPos = -1;
		this.m_prePos = -1;
	}

	private onMove( evt:egret.TouchEvent ):void
	{
		var bs = this.blocks;
		var x = Math.floor(evt.localX / this.blockSize);
		var y = Math.floor(evt.localY / this.blockSize);
		if ( x >= this.w || y >= this.h || x < 0 || y < 0 ) return;
		var pos_x = evt.localX - x * this.blockSize;
		var pos_y = evt.localY - y * this.blockSize;
		// 触摸到中间一圈才可以算是点击到了
		if( pos_x < 10 || pos_x > 57 || pos_y < 10 || pos_y > 57 )
		{
			return ;
		}

		if( bs[x][y] )
		{
			var pos:number = -1;
			var len = this.m_touchlist.length;
			for( var i = 0; i < len ; i ++ )
			{
				if( this.m_touchlist[i].x == x && this.m_touchlist[i].y == y )
				{
					pos = i;
					break;
				}
			}
			if( pos != -1 )
			{
				this.m_prePos = this.m_curPos;
				this.m_curPos = pos;
				if( len > 1 )
				{
					if( this.m_curPos == len - 2 && this.m_prePos == len - 1)
					{
						var x = this.m_touchlist[len-1].x;
						var y = this.m_touchlist[len-1].y;
						bs[x][y].onGray();
						bs[x][y].rmLine();
						this.m_touchlist.pop();
					}
				}
				return ;
			}

			if( len == 0 )
			{
				this.m_touchlist.push({x:x,y:y});
				bs[x][y].onLight();
			}
			else
			{
				var preX = this.m_touchlist[len-1].x;
				var preY = this.m_touchlist[len-1].y;

				if( Math.abs(x-preX) < 2 && Math.abs(y-preY) < 2 && bs[x][y].color == bs[preX][preY].color )
				{
					this.m_touchlist.push({x:x,y:y});
					bs[x][y].onLight();
					bs[x][y].setLine({x:preX,y:preY});
				}
			}
		}
	}

	private onEnd( evt?:egret.TouchEvent ):void
	{
		var bs = this.blocks;
		if ( this.m_touchlist.length < 3 )
		{
			for( var i = 0 ; i < this.m_touchlist.length; i ++ )
			{
				var x = this.m_touchlist[i].x;
				var y = this.m_touchlist[i].y;
				if( bs[x][y] )
				{
					bs[x][y].onGray();
					bs[x][y].rmLine();
				}
			}
			this.m_touchlist = [];
			return ;
		}

		var color;
		var pt = this.m_touchlist.length;
		var firX, firY;
		if ( this.m_touchlist.length > 0 )
		{
			firX =  this.m_touchlist[0].x;
			firY =  this.m_touchlist[0].y;
			if( bs[firX][firY] ){
				color = bs[firX][firY].color;
			}
		}

		var large = false;
		var task = ( cc:Function )=>{
            var coll = [];
            var resolve = ( x , y ) =>{
                coll.push( (cb) => { bs[x][y].rmLine(); bs[x][y].onElim(cb); } );
            };
            for( var i =0 ; i < this.m_touchlist.length; i ++ )
            {
                var x = this.m_touchlist[i].x;
                var y = this.m_touchlist[i].y;
				if( bs[x][y].type == BlockType.Special ) large = true;
                resolve(x,y);
            }

            async.parallel(coll,()=> {
				if( this.m_touchlist.length >= this.blockUpgrade )
				{
					var len = this.m_touchlist.length;
					var nx = this.m_touchlist[len-1].x;
					var ny = this.m_touchlist[len-1].y;
					var newB = BlockFactory.create(BlockType.Special,{color:color});
					newB.setPosition(nx,ny);
					bs[nx][ny] = newB;
				}
				this.m_touchlist = [];
                cc.call(null);
            });
		};

        this.view.touchEnabled = false;
		async.series( [
                (cb)=>{ task(cb); },
				(cb)=>{ this.m_context.dispatchEvent( new BoardEvent( BoardEvent.ELIMINATE, { cnt:pt, color: color, large:large } ) ); cb.call(null); },
				(cb)=>{ this.dropDown(cb); }
			],	() =>{
				this.onDropDownComp();
                this.view.touchEnabled = true;
		});
		this.onDebuffSend();

		this.m_context.dispatchEvent( new BoardEvent( BoardEvent.CLICK_NUMBER , {} ));
	}

	private onDebuffSend():void
	{
		var bs = this.blocks;
		var fire = 0 , doison = 0;
		for( var i = 0 ; i < this.w; i ++ )
		{
			for( var j = 0; j < this.h; j ++ )
			{
				if( bs[i][j] )
				{
					if( bs[i][j].m_debuff == DeBuffType.Firebuff ) fire ++;
					else if( bs[i][j].m_debuff == DeBuffType.Doisonbuff ) doison ++;
				}
			}
		}
		this.m_context.dispatchEvent( new BoardEvent( BoardEvent.DEBUFF_ATK , { fire:fire,doison:doison }));
	}

	//private onBoardTap( evt:egret.TouchEvent ):void
	//{
	//	var bs = this.blocks;
	//	var x = Math.floor(evt.localX / this.blockSize);
	//	var y = Math.floor(evt.localY / this.blockSize);
	//	if ( x >= this.w || y >= this.h ) return;
    //
	//	if ( !bs[x][y] )
	//	{
	//		this.m_context.dispatchEvent( new BoardEvent( BoardEvent.CLICK_EMPTY ) );
	//		return;
	//	}
    //
	//	this.view.touchEnabled = false;
    //
	//	async.series([
	//		(cb) => { bs[x][y].onTap(cb); },
	//		(cb) => { this.dropDown(cb); }
	//	], () => {
	//		this.onDropDownComp();
	//		this.view.touchEnabled = true;
	//	} );
	//}

	public dropDown( cc:Function ):void
	{
		var bs = this.blocks;
		var maxDeltaY = 0;

		// drop
		var drop = (cb:Function)=>{
			for ( var j = this.h - 1; j >= 0; j -- )
			{
				for ( var i = 0; i < this.w; i++ )
				{
					var b = bs[i][j];
					if ( b == null ) continue;

					var newY = b.y;
					while ( newY + b.height < this.h )
					{
						var emptyBelow = true;
						for ( var k = 0; k < b.width; k++ )
						{
							if ( bs[b.x + k][newY + b.height] != null )
							{
								emptyBelow = false;
								break;
							}
						}
						if ( emptyBelow ) newY++;
						else break;
					}
					if ( newY != b.y )
					{
						for ( var tx = b.x; tx < b.x + b.width; tx++ )
						{
							for ( var ty = b.y; ty < newY; ty++ )
							{
								bs[tx][ty] = null;
							}
							for ( var ty = newY; ty < newY + b.height; ty ++ )
							{
								bs[tx][ty] = b;
							}
						}
						b.setPosition( b.x, newY, ( newY - j ) * this.m_dropTime );
						maxDeltaY = Math.max( maxDeltaY, newY - j );
					}
				}
			}
			var time = new Date();
			setTimeout(cb,maxDeltaY * this.m_dropTime);
		}

		//this.dropGift( maxDeltaY + 1 );

		// check empty
        var all_empty = this.isEmpty();

		// left
		var check_left = ()=>{
			var columes_empty_status = [];
			var need_shift_left = [];
			if( !all_empty )
			{
				for ( var i = 0 ; i < this.w; i ++ )
				{
					columes_empty_status[i] = 0;
					var is_empty:boolean = true;
					for( var j = 0 ; j < this.h; j ++ )
					{
						if( bs[i][j] )
						{
							is_empty = false ;
							break ;
						}
					}
					if( is_empty )
					{
						columes_empty_status[i] = 1;
					}
				}

				for( var i = 0 ; i < this.w; i ++ )
				{
					need_shift_left[i] = 0;
					if( columes_empty_status[i] == 0 ) // not empty 此列非空
					{
						for( var j = 0 ; j < i; j ++ )
						{
							need_shift_left[i] += columes_empty_status[j];
						}
					}
				}
				for( var i = 0 ; i < this.w; i ++ )
				{
					if( need_shift_left[i] > 0 )
					{
						for( j = 0; j < this.h; j ++ )
						{
							if( bs[i][j] )
							{
								var b = bs[i][j];
								var X = b.x;
								for( var ty = b.y; ty < b.y + b.height; ty ++ )
								{
									for( var tx = X ; tx < X + b.width; tx ++ )
									{
										bs[tx][ty] = null;
									}
									for( var tx = X - need_shift_left[i]; tx < X - need_shift_left[i] + b.width; tx ++ )
									{
										bs[tx][ty] = b;
									}
								}
								b.setPosition( X - need_shift_left[i] , b.y,  need_shift_left[i]  * this.m_dropTime );
							}
						}
					}
				}
			}
		}
		//setTimeout(check_left, ( maxDeltaY + this.m_leftWait )* this.m_dropTime);

		// fill
        var fill = (cb:Function) => {
			var delaty:number = 0 ;
			var time = new Date();
            for ( var i = 0; i < this.w; i++ )
            {
                var deepest = -1;
                for ( var j = 0; j < this.h; j++ )
                {
                    if ( bs[i][j] == null ) deepest = j;
                    else break;
                }
                for ( var t = 0; t <= deepest; t++ )
                {
                    var newB = BlockFactory.create( BlockType.Normal, {} );
					newB.setPosition( i, t -deepest - 1 );
                    newB.setPosition( i, t, ( t - newB.y ) * this.m_dropTime );
					delaty = Math.max(delaty,t-newB.y);
                    bs[i][t] = newB;
                }
            }
			setTimeout( cb , delaty * this.m_dropTime );
        };
		//setTimeout( fill, maxDeltaY * this.m_dropTime );

		var check = (cb:Function) =>{
			var time = new Date();
			if( this.m_initTime == 0 )
			{
				this.m_initTime = 1;
				cb.call(null);
				return ;
			}

			if( this.checkCanXC() )
			{
				this.checkXC(cb);
			}
			else if( !this.checkCanXC() )
			{
				this.m_context.dispatchEvent( new BoardEvent( BoardEvent.CLICK_END, {} ) );
				cb.call(null);
			}
		};

		this.m_reDraw = false;

		async.series([
			(cb)=>{ drop(cb); },
			(cb)=>{ fill(cb); },
			(cb)=>{ check(cb); },
			(cb)=>{ this.dropGift(fill, cb); }
		],()=>{
			cc.call(null);
			//setTimeout( function() { this }.bind( this ) ()=>{ this.cc.call()}, )
			//setTimeout(cc,maxDeltaY * this.m_dropTime );
		});

		// 音效
		//this.m_eliminateSE.play(false)
	}

	public createFlood():any
	{
		var visited:Object;
		var res:Block[];
		var st:Block;

		var ret:any = {};
		ret.next = ( b:Block, fr:Block ) =>
		{
			visited[b.id] = 1;
			if ( b == st || b.visit( fr ) )
			{
				res.push( b );
			}
			else
			{
				return;
			}
			var dir = [[-1,1],[-1,0],[-1,-1],[0,1],[0,-1],[1,1],[1,0],[1,-1]];
			var len = dir.length;
			for ( var i = 0; i < len; i++ )
			{
				var nx = b.x + dir[i][0], ny = b.y + dir[i][1];
				if ( nx < 0 || nx >= this.w || ny < 0 || ny >= this.h ) continue;

				var nb:Block = this.blocks[nx][ny];
				if ( !nb || visited[nb.id] ) continue;

				ret.next( nb, b );
			}
		};
		ret.start = ( b:Block ) =>
		{
			visited = {};
			if ( res )
			{
				var len = res.length;
				for ( var i = 0; i < len; i++ ) visited[res[i].id] = 1;
			}
			res = [];
			if ( !b || visited[b.id] ) return;

			st = b;
			ret.next( b, null );
			return ret;
		};
		ret.getRes = () => { return res; };
		ret.getPt = () => {
			var len = res.length, pt = 0;
			for ( var i = 0; i < len; i++ )
			{
				switch ( res[i].type )
				{
					case BlockType.Normal : pt += 1; break;
					case BlockType.Special: pt += 1; break;
				}
			}
			return pt;
		};
		return ret;
	}

	private onDropDownComp():void
	{
		var bs = this.blocks;

		var task = [];
		var wait = ( x, y ) => {
			task.push( (cb) => { bs[x][y].onDropDownComp(cb); } );
		};
		for ( var i = 0; i < this.w; i++ )
		{
			for ( var j = 0; j < this.h; j++ )
			{
				if ( bs[i][j] ) wait( i, j );
			}
		}

		async.parallel( task, () => {

			if ( this.checkEnd() )
			{
				this.shuffle();
			}
		} );
	}

	private recycleAll():void
	{
		var bs = this.blocks;
		for ( var i = 0; i < this.w; i++ )
		{
			for ( var j = 0; j < this.h; j++ )
			{
				if(bs[i][j]) BlockFactory.recycle( bs[i][j] );
			}
		}
	}

	private shuffle():void
	{
		var bs = this.blocks;
        var flag = true;
		if( this.isFull() )
		{
			this.recycleAll();
			this.m_context.board.view.touchEnabled = true;
            flag = false;
		}
		if( this.m_initTime == 0 )
		{
			this.reDrawMainUI();
		}
		else
		{
			this.m_context.dispatchEvent( new BoardEvent( BoardEvent.CLICK_END, {} ) );
            if( flag )
            {
                this.m_context.board.view.touchEnabled = false;
            }
		}
	}

	public reDrawMainUI():void
	{
		if( this.m_reDraw == false )
		{
			this.m_reDraw = true;
			this.m_context.board.view.touchEnabled = true;
		}
		this.dropDown( () => { this.onDropDownComp(); });
	}

	private checkEnd():boolean
	{
		var f:any = this.createFlood();
		for ( var i = 0; i < this.w; i++ )
		{
			for ( var j = 0; j < this.h; j++ )
			{
				f.start( this.blocks[i][j] );
				if ( f.getPt() >= 3 )
				{
					return false;
				}
			}
		}
		return true;
	}

    private isEmpty():boolean
    {
        var bs = this.blocks;
        for ( var i = 0 ; i < this.w; i ++ )
        {
            for( var j = 0 ; j < this.h; j ++ )
            {
                if( bs[i][j] ) return false;
            }
        }
        return true;
    }

    private isFull():boolean
    {
        var bs = this.blocks;
        for( var i = 0 ; i < this.w; i ++ )
        {
            for( var j = 0; j < this.h; j ++ )
            {
                if( !bs[i][j] ) return false;
            }
        }
        return true;
    }

    private dropGift( fill:Function , cb:Function):void
    {
        var bs = this.blocks;
        var ret_dropgift = () => {
			var delaty = 0 ;
			for( var i = 0 ; i < this.w; i ++ )
			{
				var j = this.h - 1;
				while( j >= 0 )
				{
					if( !bs[i][j] ) { j -- ; }
					if( bs[i][j].type == BlockType.Normal )	break;
					else if( bs[i][j].type == BlockType.Special )
					{
						BlockFactory.recycle(bs[i][j]);  // ?? 不会消失
						j -- ;
					}
				}
				for( var h = j; h >= 0 ; h -- )
				{
					if( bs[i][h] )
					{
						var newY = h;
						for( var l = h + 1; l < this.h; l ++ )
						{
							if( !bs[i][l] ) newY ++ ;
						}
						if( newY != h )
						{
							var b = bs[i][h];
							bs[i][h] = null;
							bs[i][newY] = null;
							bs[i][newY] = b;
							b.setPosition(i,newY,(newY-h)*this.m_dropTime);
							delaty = Math.max( newY-h,delaty );
						}
					}
				}
			}
			var time = new Date();
			setTimeout(()=>{ fill(cb) }, delaty * this.m_dropTime + 300 );  // ??

        };
		//ret_dropgift();    // 2015-6-19 11.03
		setTimeout( ret_dropgift , 300 );
    }

	private checkCanXC():boolean
	{
		if( !this.isFull() )
		{
			return false ;
		}
		var bs = this.blocks;
		for( var i = 0; i < this.w; i ++ )
		{
			for( var j = 0; j < this.h; j ++ )
			{
				if( i + 2 < this.w && bs[i][j].visit(bs[i+1][j]) && bs[i][j].visit(bs[i+2][j]))
				{
					return true;
				}
				if( j + 2 < this.h && bs[i][j].visit(bs[i][j+1]) && bs[i][j].visit(bs[i][j+2]))
				{
					return true;
				}
			}
		}
		return false;
	}

    private checkXC(cb:Function):void
    {
        var bs = this.blocks;

		for( var i = 0 ; i < this.w; i ++ )
		{
			for( var j = 0 ; j < this.h; j ++ )
			{
				if( !bs[i][j] ) continue;

				var nx = i + 1;
				while( nx < this.w ) {
					if( bs[nx][j].visit(bs[i][j]) && !bs[nx][j].hflag )
					{
						nx ++ ;
					}
					else
					{
						break ;
					}
				}

				var ny = j + 1;
				while( ny < this.h )
				{
					if( bs[i][ny].visit(bs[i][j] ) && !bs[i][ny].vflag )
					{
						ny ++ ;
					}
					else
					{
						break ;
					}
				}

				if( nx - i >= 3 )
				{
					for( var x = i ; x < nx - 1; x ++ )
					{
						bs[x][j].hflag = true ;
					}
					for( var x = i ; x < nx; x ++ )
					{
						bs[x][j].flag = true ;
					}
				}

				if( ny - j >= 3 )
				{
					for( var y = j; y < ny - 1; y ++ )
					{
						bs[i][y].vflag = true;
					}
					for( var y = j; y < ny; y ++ )
					{
						bs[i][y].flag = true;
					}
				}
			}
		}

		for( var i = 0 ; i < this.w; i ++ )
		{
			for( var j = 0; j < this.h; j ++ )
			{
				if( bs[i][j].hflag == true )
				{
					bs[i][j].setHLine();
				}
				if( bs[i][j].vflag == true )
				{
					bs[i][j].setVLine();
				}
			}
		}

		var visit = [];
		var target = [];
		for( var i = 0 ; i < this.w; i ++ )
		{
			for( var j = 0 ; j < this.h; j ++ )
			{
				if( bs[i][j].flag && !visit[bs[i][j].id] )
				{
					var pt = 0 ;
					var queue= [];
					var large = false;
					queue.push(bs[i][j]);
					visit[ bs[i][j].id ] = true;
					while( queue.length > 0 )
					{
						var rt = queue.pop();
						if( rt.hflag && !visit[bs[rt.x+1][rt.y].id ] ) {
							queue.push(bs[rt.x + 1][rt.y]);
							visit[bs[rt.x+1][rt.y].id ] = true;
							if( bs[rt.x+1][rt.y].type == BlockType.Special )
								large = true;
						}
						if( rt.vflag && !visit[ bs[rt.x][rt.y+1].id ] ) {
							queue.push(bs[rt.x][rt.y+1]);
							visit[ bs[rt.x][rt.y+1].id ] = true;
							if( bs[rt.x][rt.y+1].type == BlockType.Special )
								large = true;
						}
						pt ++ ;
					}
					if( pt > 0 )
					{
						this.m_context.dispatchEvent(new BoardEvent( BoardEvent.ELIMINATE, { cnt:pt, color: bs[i][j].color, large:large } ) );
					}
					if( pt >= this.blockUpgrade )
					{
						target.push({x:i,y:j,color:bs[i][j].color});
					}
				}
			}
		}

		var ret = (cc:Function)=>{

			var task = [];
			var func = ( x, y )=>{
				if( bs[x][y].flag )
				{
					task.push((cb)=> {
						bs[x][y].rmHLine();
						bs[x][y].rmVLine();
						bs[x][y].onElim(cb);
					});
				}
			};
			for( var i = 0 ; i < this.w; i ++ )
			{
				for( var j = 0 ; j < this.h; j ++ )
				{
					func( i , j );
				}
			}
			var XC = (cb)=>
			{
				async.parallel(task,()=>{
						cb.call(null);
				});
			};
			var tarGet = (cb) => {
				var tar = [];
				for( var t = 0 ; t < target.length; t ++ )
				{
					var nx = target[t].x;
					var ny = target[t].y;
					var color = target[t].color;
					tar.push((cc)=>{
						var newB = BlockFactory.create(BlockType.Special,{color:color});
						bs[nx][ny] = null ;
						newB.setPosition(nx,ny);
						bs[nx][ny] = newB;
						var time = new Date();
						cc.call();
					});
				}
				async.parallel(tar,() => {
					 cb.call(null);
				});
			};
			async.series( [
					(cb) => { XC(cb); },
					(cb) => { tarGet(cb); },
					(cb) => { this.dropDown(cb); }
				],	() =>{
					cc.call(null);
				}
			);
		};

		setTimeout(()=>{ret(cb)} , 300);
    }

	private setBlockLocks( locknum:number ):void
	{
		var num = 0, unlock = 0 ;
		var bs = this.blocks;

		for( var i = 0; i < this.w; i ++ )
		{
			for( var j = 0 ; j < this.h; j ++ )
			{
				if( !bs[i][j].m_locked ) unlock ++ ;
			}
		}
		locknum = Math.min( unlock, locknum );

		while( num < locknum )
		{
			var ran_w = Math.floor( Math.random() * 10 ) % this.w;
			var ran_h = Math.floor( Math.random() * 10 ) % this.h;
			if( bs[ran_w][ran_h].m_locked == true ) continue;
			num ++ ;
			bs[ran_w][ran_h].m_locked = true;
			bs[ran_w][ran_h].setlock();
		}
	}

	private setDebuff( effnum:number , type:DeBuffType ):void
	{
		var num = 0 , undebuff = 0;
		var bs = this.blocks;
		for( var i = 0 ; i < this.w; i ++ )
		{
			for( var j = 0 ; j < this.h; j ++ )
			{
				if( bs[i][j].m_debuff == DeBuffType.None ) undebuff ++ ;
			}
		}
		effnum = Math.min( effnum, undebuff );
		while( num < effnum )
		{
			var ran_w = Math.floor( Math.random() * 10 ) % this.w;
			var ran_h = Math.floor( Math.random() * 10 ) % this.h;
			if( bs[ran_w][ran_h].m_debuff != DeBuffType.None ) continue;
			num ++ ;
			bs[ran_w][ran_h].m_debuff = type;
			bs[ran_w][ran_h].setDebuff(type);
		}
	}

	public showMonsterSkill( skillId:number ):void
	{
		var bs = this.blocks;
		switch( skillId )
		{
			case 1:
				break;
			case 2:
				this.setBlockLocks(3);
				break;
			case 3:
				this.setBlockLocks(5);
				break;
			case 4:
				this.setBlockLocks(7);
				break;
			case 5:
				this.setDebuff(3,DeBuffType.Doisonbuff);
				break;
			case 6:
				this.setDebuff(3,DeBuffType.Firebuff);
				break;
			case 7:
				break;
			case 8:
				break;
			case 9:
				break;
			default:
				break;
		}
	}

}
