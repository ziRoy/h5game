/**
 * Created by yinqing on 15-4-17.
 */

class Log
{
	public static init():void
	{
		var nativeLog 		= console.log;
		var nativeError		= console.error;
		var nativeWarn		= console.warn;

		console.log 	= () => { nativeLog.call( console, Log.format.apply( null, arguments ) ); };
		console.error 	= () => { nativeError.call( console, Log.format.apply( null, arguments ) ); };
		console.warn 	= () => { nativeWarn.call( console, Log.format.apply( null, arguments ) ); }
	}

	public static format( f, ...rest:any[] ):string
	{
		var arg = arguments;

		if ( !(typeof f === 'string') )
		{
			return Array.prototype.slice.call( arg ).join(' ');
		}

		var idx = 1;
		var len = arg.length;
		var str = String( f ).replace( /%[sdj%]/g, function ( x )
		{
			if ( x === '%%' ) return '%';
			if ( idx >= len ) return x;
			switch ( x )
			{
				case '%s':
					return String( arg[ idx++ ] );
				case '%d':
					return String( Number( arg[ idx++ ] ) );
				case '%j':
					try
					{
						return JSON.stringify( arg[ idx++ ] );
					}
					catch ( _ )
					{
						return '[Circular]';
					}
				default:
					return x;
			}
		} );
		for ( var x = arg[ idx ]; idx < len; x = arg[ ++idx ] )
		{
			str += ' ' + x;
		}
		return str;
	}

}