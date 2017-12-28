/**
 * Created by yinqing on 15-2-28.
 */
class EffectFrameInfo
{
	public pngIdx	:number;	// int8
	public offsetX	:number;	// int32
	public offsetY	:number;	// int32
}

class SpccEffectConfig
{
	public frames		:Array<EffectFrameInfo> = [];
	public lessScale	:number;	// float
}

class SpccMovieClip extends  egret.DisplayObjectContainer
{
	private m_id		:number;
	private m_config	:SpccEffectConfig;
	private m_content	:egret.Bitmap;
	private m_curFrame	:number;
	private m_loop		:boolean;
	private m_fps		:number = 24;
	private m_frameCT	:number;
	private m_frameTT	:number;

	public RES_DIR		:string = "assets/effect";

	public constructor( id:number, cb:Function, target?:any )
	{
		super();
		this.m_id 		= id;
		this.m_content	= new egret.Bitmap();
		this.m_curFrame	= 0;
		this.m_frameTT	= 1000 / this.m_fps;
		this.m_frameCT 	= 0;

		this.addChild( this.m_content );

		new AssetGroup( "spcc_" + this.m_id )
			.appendRes( "spcc_" + this.m_id + "_config", "bin", this.RES_DIR + "/ef" + this.m_id + "/ef" + this.m_id + ".spcc" )
			.appendRes( "spcc_" + this.m_id + "_tex", "sheet", this.RES_DIR + "/ef" + this.m_id + "/ef" + this.m_id + "-hd.json" )
			.load( () => {
				this.m_config = this.loadConfig( new egret.ByteArray( RES.getRes( "spcc_" + this.m_id + "_config" ) ) );
				cb.call( target, this );
			} );
	}

	public play( loop:boolean = false ):void
	{
		this.m_loop = loop;
		egret.Ticker.getInstance().register( this.tick, this );
	}

	public stop():void
	{
		egret.Ticker.getInstance().unregister( this.tick, this );
	}

	private tick( time:number ):void
	{
		this.m_frameCT += time;
		if ( this.m_frameCT < this.m_frameTT ) return;

		var passFrame = Math.floor( this.m_frameCT / this.m_frameTT );
		this.m_frameCT -= this.m_frameTT * passFrame;
		var newFrame = this.m_curFrame + passFrame;

		var stop = false;
		var len = this.m_config.frames.length;

		if ( this.m_loop )
		{
			newFrame %= len;
		}
		else if ( newFrame >= len )
		{
			stop = true;
			if ( len > 0 ) newFrame = len - 1;
			else return;
		}

		this.setFrameIdx( newFrame );

		if ( stop )
		{
			this.dispatchEventWith( egret.Event.COMPLETE );
			this.stop();
		}
	}

	private setFrameIdx( idx:number ):void
	{
		if ( idx >= this.m_config.frames.length )
		{
			console.error( "Spcc Frame Idx Out Of Range, idx=" + idx + ", len=" + this.m_config.frames.length );
			return;
		}
		if ( this.m_curFrame == idx ) return;

		this.m_curFrame = idx;
		var info = this.m_config.frames[ idx ];

		if ( info.pngIdx == -1 )
		{
			this.m_content.texture = null;
		}
		else
		{
			this.m_content.texture = RES.getRes( "ef" + this.m_id + "_" + info.pngIdx );
			this.m_content.scaleX = this.m_content.scaleY = this.m_config.lessScale;
			this.m_content.x = info.offsetX;
			this.m_content.y = info.offsetY;
		}
	}

	private loadConfig( data:egret.ByteArray ):SpccEffectConfig
	{
		data.endian = egret.Endian.LITTLE_ENDIAN;

		function readFrame():EffectFrameInfo
		{
			var ret:EffectFrameInfo = new EffectFrameInfo();

			ret.pngIdx = data.readByte();
			if ( ret.pngIdx != -1 )
			{
				ret.offsetX = data.readInt();
				ret.offsetY = data.readInt();
			}
			return ret;
		}

		var out:SpccEffectConfig = new SpccEffectConfig();

		var frameCount = data.readUnsignedShort();
		for ( var i = 0; i < frameCount; i++ )
		{
			out.frames.push( readFrame() );
		}

		out.lessScale = data.readUnsignedInt() / 1000;
		return out;
	}
}