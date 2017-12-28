/**
 * Created by yinqing on 15-4-13.
 */

class ProgressBar extends egret.gui.SkinnableComponent
{
	private thumb			:egret.DisplayObject;
	private track			:egret.DisplayObject;
	private labelDisplay	:egret.gui.Label;

	public maxValue			:number;
	private curValue		:number;

	public constructor()
	{
		super();
		this.thumb = null;
		this.track = null;
		this.labelDisplay = null;

		this.maxValue = 100;
		this.curValue = 0;
	}

	public childrenCreated():void
	{
		super.childrenCreated();
		this.update();
	}
	public updateDisplayList( unscaledWidth:number, unscaledHeight:number ):void
	{
		super.updateDisplayList( unscaledWidth, unscaledHeight );
		this.update();
	}
	public set value( v:number )
	{
		if ( isNaN(v) ) return;
		this.curValue = Math.min( Math.max( v, 0 ), this.maxValue );
		//this.validateProperties();
		this.invalidateDisplayList();
	}

	public get value():number
	{
		return this.curValue;
	}

	private update():void
	{
		if ( !this.thumb || !this.track ) return;

		var trackWidth = isNaN(this.track.width) ? 0 : this.track.width;
		trackWidth *= this.track.scaleX;
		var trackHeight = isNaN(this.track.height) ? 0 : this.track.height;
		trackHeight *= this.track.scaleY;
		var thumbWidth = Math.round( ( this.curValue / this.maxValue ) * trackWidth );
		if ( isNaN(thumbWidth) || thumbWidth < 0 || thumbWidth === Infinity )
			thumbWidth = 0;

		if ( !this.thumb.mask ) this.thumb.mask = new egret.Rectangle( 0, 0, this.thumb.width, this.thumb.height );

		this.thumb.mask.width = thumbWidth;
		this.thumb.mask.height = trackHeight;

		var p = this.track.localToGlobal(0, 0);
		var thumbPos = this.globalToLocal( p.x, p.y );
		this.thumb.x = thumbPos.x;

		if ( this.labelDisplay )
		{
			this.labelDisplay.text = this.curValue + "/" + this.maxValue;
		}
	}
}