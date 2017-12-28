/**
 * Created by yinqing on 15-2-27.
 */

class FrameInfo
{
	public a		:number;	// float
	public b		:number;	// float
	public c		:number;	// float
	public d		:number;	// float
	public tx		:number;	// float
	public ty		:number;	// float
	public alpha	:number;	// float
	public frameId	:number;	// uint8
}

class SymbolInfo
{
	public skinId	:number;	// uint8
	public partId	:number;	// uint8
	public frameId	:number;	// uint8
	public offset	:egret.Point = new egret.Point();
}

class PartInfo
{
	public partId	:number;			// uint8
	public frames	:Array<FrameInfo> = [];
}

class ActionInfo
{
	public name			:string;
	public totalFrame	:number;	// uint16
	public parts		:Array<PartInfo> = [];
}

class GroupInfo
{
	public groupId	:number;	// uint8
	public partIds	:Array<number> = [];
}

class FlccSkeletonConfig
{
	public symbols	:Array<SymbolInfo> = [];
	public actions	:Array<ActionInfo> = [];
	public groups	:Object = {};		// <groupId, GroupInfo>
	public lessScale:number;		// float
}

class FlccSpriteNode extends egret.Bitmap
{
	private m_a		:number;
	private m_b		:number;
	private m_c		:number;
	private m_d		:number;
	private m_tx	:number;
	private m_ty	:number;

	public skinTag	:number;
	public frameTag	:number;

	public setMatrix( a:number, b:number, c:number, d:number, tx:number, ty:number ):void
	{
		this.m_a = a;
		this.m_b = b;
		this.m_c = c;
		this.m_d = d;
		this.m_tx= tx;
		this.m_ty= ty;
	}

	public setFrame( name:string ):void
	{
		this.texture = RES.getRes( name );
	}

	_getMatrix( parentMatrix?:egret.Matrix ):egret.Matrix
	{
		if ( !parentMatrix )
		{
			parentMatrix = egret.Matrix.identity.identity();
		}

		parentMatrix.append( this.m_a, this.m_b, this.m_c, this.m_d, this.m_tx, this.m_ty );
		var p = this._getOffsetPoint();
		parentMatrix.append( 1, 0, 0, 1, -p.x, -p.y );
		return parentMatrix;
	}
}

class FlccMovieClip extends egret.DisplayObjectContainer
{
	private m_curAction	:ActionInfo;
	private m_fps		:number	= 24;
	private m_modelId	:number;
	private m_config	:FlccSkeletonConfig;
	private m_skinId	:number;
	private m_curFrame	:number;
	private m_loop		:boolean;
	private m_content	:egret.DisplayObjectContainer;
	private m_partSpriteMap:Object = {};	// < partId, Node >

	private m_frameCT	:number;
	private m_frameTT	:number;

	// test
	//private m_cache		:any = {};

	public RES_DIR		:string = "assets/model";

	public constructor( modelId:number, skinId:number, cb:Function, target?:any )
	{
		super();
		this.m_modelId 	= modelId;
		this.m_skinId	= skinId;
		this.m_content	= new egret.DisplayObjectContainer();
		this.m_frameTT	= 1000 / this.m_fps;
		this.m_frameCT	= 0;
		this.addChild( this.m_content );

		new AssetGroup( "flcc_" + this.m_modelId )
			.appendRes( "flcc_" + this.m_modelId, "bin", this.RES_DIR + "/" + this.m_modelId + "/" + this.m_modelId + ".flcc" )
			.load( () => {

				this.m_config = this.loadConfig( new egret.ByteArray( RES.getRes( "flcc_" + this.m_modelId ) ) );

				this.m_content.scaleX /= this.m_config.lessScale;
				this.m_content.scaleY /= this.m_config.lessScale;

				var ag = new AssetGroup( "flcc_" + this.m_modelId + "_" + this.m_skinId );
				for ( var gid in this.m_config.groups )
				{
					ag.appendRes( "flcc_" + this.m_modelId + "_" + this.m_skinId + "_" + gid, "sheet",
						this.RES_DIR + "/" + this.m_modelId + "/" + this.m_skinId + "_" + gid + "-hd.json" );
				}
				ag.load( () => {

					//var len = this.m_config.actions.length;
					//for ( var i = 0; i < len; i++ )
					//{
					//	var action = this.m_config.actions[i];
					//	var frameCache = [];
					//
					//	this.setAction( action.name );
					//	this.stop();
					//	for ( var j = 0; j < action.totalFrame; j++ )
					//	{
					//		this.m_curFrame = j;
					//		this.updateMovieClip();
					//
					//		var tex:egret.RenderTexture = new egret.RenderTexture();
					//		tex.drawToTexture( this.m_content );
					//		//console.log( this.m_modelId, action.name, j, tex.textureWidth, tex.textureHeight );
					//		frameCache.push( tex );
					//	}
					//
					//	this.m_cache[ action.name ] = frameCache;
					//}
					//this.m_curAction = null;

					cb.call( target, this );
				} );
			} );
	}

	public setAction( name:string, loop:boolean = false, restart:boolean = true ):void
	{
		if ( name == "" ) return;
		if ( this.m_curAction && this.m_curAction.name == name )
		{
			return this.play( loop, restart );
		}

		var len = this.m_config.actions.length;
		for ( var i = 0; i < len; i++ )
		{
			if ( this.m_config.actions[i].name == name )
			{
				this.m_curAction 	= this.m_config.actions[i];
				this.m_curFrame 	= 0;
				this.m_loop			= loop;

				//if ( this.m_cache[ name ] )
				//{
				//	this.m_content.removeChildren();
				//	this.m_partSpriteMap = {};
				//	this.m_content.addChild( new egret.Bitmap() );
				//}
				//else
				//{
					var zOrder = 0;
					var partLen = this.m_curAction.parts.length;
					for ( var j = 0; j < partLen; j++ )
					{
						var pi = this.m_curAction.parts[j];
						if ( this.m_partSpriteMap[ pi.partId ] === undefined )
						{
							var node:FlccSpriteNode = this.createSpritePart( pi.partId, this.m_skinId );
							if ( node )
							{
								this.addPart( pi.partId, node, zOrder++ );
							}
						}
					}

					for ( var k in this.m_partSpriteMap )
					{
						var remove = true;
						for ( var j = 0 ; j < partLen; j++ )
						{
							if ( this.m_curAction.parts[j].partId == k )
							{
								remove = false;
								break;
							}
						}
						if ( remove )
						{
							this.removePart( k );
						}
					}

					this.updateMovieClip();
				//}
				return this.play( loop, restart );
			}
		}
	}

	public play( loop:boolean = false, restart:boolean = false ):void
	{
		if ( restart ) this.m_curFrame = 0;
		this.m_loop = loop;
		egret.Ticker.getInstance().register( this.tick, this );
	}

	public stop():void
	{
		egret.Ticker.getInstance().unregister( this.tick, this );
	}

	public get frameTime():number
	{
		return this.m_frameTT;
	}

	private createSpritePart( partId:number, skinId:number, frameId?:number ):FlccSpriteNode
	{
		var si:SymbolInfo = this.findSymbolConfig( partId, skinId, frameId );
		if ( si )
		{
			var ret = new FlccSpriteNode();
			ret.setFrame( this.getFrameName( skinId, partId, si.frameId ) );
			ret.anchorOffsetX = si.offset.x / this.m_config.lessScale;
			ret.anchorOffsetY = si.offset.y / this.m_config.lessScale;
			ret.name 	= partId.toString();
			ret.skinTag = skinId;
			ret.frameTag = si.frameId;
			return ret;
		}
		console.error( "FlccSpriteNode Create Failed, skinId=" + skinId + ", partId=" + partId + ", frameId=" + frameId );
		return this.createSpritePart( partId, skinId );
	}

	private getFrameName( skinId:number, partId:number, frameId:number ):string
	{
		return this.m_modelId + "_" + skinId + "_" + partId + "_" + frameId;
	}

	private addPart( partId:number, sprite:FlccSpriteNode, zOrder:number ):void
	{
		sprite.name = partId.toString();
		this.m_partSpriteMap[ partId ] = sprite;
		this.m_content.addChildAt( sprite, zOrder );
	}

	private removePart( partId:number ):void
	{
		var node = this.m_partSpriteMap[ partId ];
		if ( node === undefined ) return;

		this.m_content.removeChild( node );
		delete this.m_partSpriteMap[ partId ];
	}

	private updateMovieClip():void
	{
		if ( !this.m_curAction ) return;

		var oriCurFrame = this.m_curFrame;
		if ( this.m_curFrame >= this.m_curAction.totalFrame )
		{
			if ( this.m_curAction.totalFrame > 0 ) this.m_curFrame = this.m_curAction.totalFrame - 1;
			else return;
		}

		//if ( this.m_cache[ this.m_curAction.name ] )
		//{
		//	( <egret.Bitmap>this.m_content.getChildAt( 0 ) ).texture = this.m_cache[ this.m_curAction.name ][ this.m_curFrame ];
		//	return;
		//}

		var len = this.m_curAction.parts.length;
		for ( var i = 0; i < len; i++ )
		{
			var pi = this.m_curAction.parts[i];
			var node:FlccSpriteNode = <FlccSpriteNode>this.m_content.getChildByName( pi.partId.toString() );
			if ( !node ) continue;

			var fi:FrameInfo = pi.frames[ this.m_curFrame ];
			if ( node.frameTag != fi.frameId )
			{
				node.setFrame( this.getFrameName( node.skinTag, pi.partId, fi.frameId ) );
				node.frameTag = fi.frameId;

				// reset anchor
				var si:SymbolInfo = this.findSymbolConfig( pi.partId, node.skinTag, fi.frameId );
				if ( si )
				{
					node.anchorOffsetX = si.offset.x * this.m_config.lessScale;
					node.anchorOffsetY = si.offset.y * this.m_config.lessScale;
				}
			}

			node.setMatrix(
				fi.a ,
				fi.b ,
				fi.c ,
				fi.d ,
				fi.tx* this.m_config.lessScale,
				fi.ty* this.m_config.lessScale );
			node.alpha = fi.alpha;
		}

		this.m_curFrame = oriCurFrame;
	}

	private tick( time:number ):void
	{
		if ( !this.m_curAction ) return;
		this.m_frameCT += time;
		if ( this.m_frameCT < this.m_frameTT ) return;

		var passFrame = Math.floor( this.m_frameCT / this.m_frameTT );
		this.m_frameCT -= this.m_frameTT * passFrame;
		this.m_curFrame += passFrame;

		var stop = false;

		if ( this.m_loop )
		{
			this.m_curFrame %= this.m_curAction.totalFrame;
		}
		else if ( this.m_curFrame >= this.m_curAction.totalFrame )
		{
			stop = true;
			if ( this.m_curAction.totalFrame > 0 ) this.m_curFrame = this.m_curAction.totalFrame - 1;
			else return;
		}

		this.updateMovieClip();

		if ( stop )
		{
			this.stop();
			this.dispatchEventWith( egret.Event.COMPLETE );
		}
	}

	private findSymbolConfig( partId:number, skinId:number, frameId?:number ):SymbolInfo
	{
		var len = this.m_config.symbols.length;
		var candidate:SymbolInfo = null;

		for ( var i = 0; i < len; i++ )
		{
			var s = this.m_config.symbols[i];
			if ( s.partId == partId && s.skinId == skinId )
			{
				if ( candidate == null ) candidate = s;
				if ( frameId != undefined && s.frameId == frameId ) return s;
			}
		}
		return candidate;
	}

	private loadConfig( data:egret.ByteArray ):FlccSkeletonConfig
	{
		data.endian = egret.Endian.LITTLE_ENDIAN;

		function readSymbol():SymbolInfo
		{
			var ret = new SymbolInfo();

			ret.skinId 	= data.readUnsignedByte();
			ret.partId 	= data.readUnsignedByte();
			ret.frameId = data.readUnsignedByte();
			ret.offset.x = data.readInt();
			ret.offset.y = data.readInt();
			return ret;
		}

		function readGroup():GroupInfo
		{
			var ret = new GroupInfo();
			ret.groupId = data.readUnsignedByte();

			var partCount = data.readUnsignedByte();
			for ( var i = 0; i < partCount; i++ )
			{
				ret.partIds.push( data.readUnsignedByte() );
			}
			return ret;
		}

		function readFrame():FrameInfo
		{
			var ret = new FrameInfo();
			ret.a = data.readInt() / 1000;
			ret.b = data.readInt() / 1000;
			ret.c = data.readInt() / 1000;
			ret.d = data.readInt() / 1000;
			ret.tx = data.readInt() / 1000;
			ret.ty = data.readInt() / 1000;
			ret.alpha = data.readInt() / 1000;
			ret.frameId = data.readUnsignedByte();
			return ret;
		}

		function readPart( nFrame:number ):PartInfo
		{
			var ret = new PartInfo();
			ret.partId = data.readUnsignedByte();

			for ( var i = 0; i < nFrame; i++ )
			{
				ret.frames.push( readFrame() );
			}
			return ret;
		}

		function readAction():ActionInfo
		{
			var ret = new ActionInfo();

			var l = 0, p = data.position;

			while ( data.readUnsignedByte() ) l++;
			data.position = p;
			ret.name = data.readUTFBytes( l );
			data.readUnsignedByte();
			ret.totalFrame = data.readUnsignedShort();

			var partCount = data.readUnsignedByte();
			for ( var i = 0 ; i < partCount; i++ )
			{
				ret.parts.push( readPart( ret.totalFrame ) );
			}
			return ret;
		}

		var out = new FlccSkeletonConfig();

		var symbolCount = data.readUnsignedShort();
		for ( var i = 0; i < symbolCount; i++ )
		{
			out.symbols.push( readSymbol() );
		}

		var groupCount = data.readUnsignedByte();
		for ( var i = 0; i < groupCount; i++ )
		{
			var gi:GroupInfo = readGroup();
			out.groups[ gi.groupId ] = gi;
		}

		var actionCount = data.readUnsignedByte();
		for ( var i = 0; i < actionCount; i++ )
		{
			out.actions.push( readAction() );
		}

		out.lessScale = data.readInt() / 1000;

		return out;
	}
}

