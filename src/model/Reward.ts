/**
 * Created by yinqing on 15-7-7.
 */

class Reward
{
	public gold		:number	= 0;
	public diamond	:number = 0;
	public energy	:number = 0;
	public item		:Object	= {};

	public toString():string
	{
		var ret = "";
		if ( this.gold ) 	ret += '[gold]' + this.gold;
		if ( this.diamond )	ret += '[diamond]' + this.diamond;
		if ( this.energy ) 	ret += '[energy]' + this.energy;

		for ( var k in this.item )
		{
			ret += '[item]' + k + "*" + this.item[k];
		}
		return ret;
	}
}
