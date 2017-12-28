/**
 * Created by yinqing on 15-7-7.
 */

class Tools
{
	public static refreshList( list:egret.gui.DataGroup )
	{
		var pos = list.verticalScrollPosition;
		(<egret.gui.ArrayCollection>list.dataProvider).refresh();
		/* 当调用refresh后，egret会在下一帧将verticalScrollPosition赋值为0 */
		list.addEventListener( egret.Event.ENTER_FRAME, () => {
			list.removeEventListener( egret.Event.ENTER_FRAME, arguments.callee, null );
			list.verticalScrollPosition = pos;
		}, null );
	}

	// 随机万分比
	public static randomEither( prop:number ):boolean
	{
		return Math.random() * 10000 < prop;
	}

	// 按权值随机
	public static randomFactor( cand:Array<any>, key:string = undefined ):any
	{
		var sum = 0;
		for ( var i = 0; i < cand.length; i++ )
		{
			sum += ( key ? cand[i][key] : cand[i] );
		}

		if ( sum <= 0 ) return undefined;

		var r = Math.random();

		var min = 0, max = 0;
		for ( var i = 0; i < cand.length; i++ )
		{
			min = max;
			max += ( key ? cand[i][key] / sum : cand[i] / sum );
			if ( r >= min && r < max )
			{
				return key ? cand[i] : i;
			}
		}

		console.log( 'error in randomFactor' );
		return undefined;
	}
}


