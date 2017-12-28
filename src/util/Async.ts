/**
 * Created by yinqing on 15-4-16.
 */

interface ErrorCallback
{
	( err?:Error ): void;
}
interface AsyncIterator<T>
{
	( item:T, callback:ErrorCallback ): void;
}
interface AsyncResultCallback<T>
{
	( err: Error, result?: T ): void;
}
interface AsyncResultArrayCallback<T>
{
	( err: Error, results: T[] ): void;
}
interface AsyncFunction<T>
{
	( callback: AsyncResultCallback<T> ): void;
}
interface AsyncResultIterator<T, R>
{
	( item:T, callback:AsyncResultCallback<R> ): void;
}

class async
{
	/*------------- Collection -------------*/

	public static each<T>( arr:T[], iterator:AsyncIterator<T>, callback:ErrorCallback ):void
	{
		if ( !arr.length ) return callback();
		var completed = 0;

		arr.forEach( ( x ) => { iterator( x, async.onlyOnce( done ) ); } );

		function done( err )
		{
			if ( err )
			{
				callback( err );
				callback = function (){};
			}
			else
			{
				completed += 1;
				if ( completed >= arr.length ) callback();
			}
		}
	}

	public static eachSeries<T>( arr: T[], iterator: AsyncIterator<T>, callback: ErrorCallback ):void
	{
		if ( !arr.length ) return callback();

		var completed = 0;
		(function iterate()
		{
			iterator( arr[completed], function ( err )
			{
				if ( err )
				{
					callback( err );
					callback = function (){};
				}
				else
				{
					completed += 1;
					if (completed >= arr.length) callback();
					else iterate();
				}
			});
		} )();
	}

	public static eachLimit<T>(arr: T[], limit: number, iterator: AsyncIterator<T>, callback: ErrorCallback): void
	{
		var fn = async.eachLimitFn( limit );
		fn.apply( null, [arr, iterator, callback] );
	}

	public static map<T, R>(arr: T[], iterator: AsyncResultIterator<T, R>, callback: AsyncResultArrayCallback<R>): any
	{
		return async.collectResultFn.call(null, async.each, arr, iterator, callback );
	}

	public static mapSeries<T, R>(arr: T[], iterator: AsyncResultIterator<T, R>, callback: AsyncResultArrayCallback<R>): any
	{
		return async.collectResultFn.call( null, async.eachSeries, arr, iterator, callback );
	}

	public static mapLimit<T, R>(arr: T[], limit: number, iterator: AsyncResultIterator<T, R>, callback: AsyncResultArrayCallback<R>): any
	{
		return async.collectResultFn.call( null, async.eachLimitFn(limit), arr, iterator, callback );
	}

	/*------------- ﻿Control Flow -------------*/

	public static series<T>(tasks: Array<AsyncFunction<T>>, callback: AsyncResultArrayCallback<T>): void
	{
		return async.callTaskFn.call( null, async.mapSeries, tasks, callback );
	}

	public static parallel<T>(tasks: Array<AsyncFunction<T>>, callback: AsyncResultArrayCallback<T>): void
	{
		return async.callTaskFn.call( null, async.map, tasks, callback );
	}

	public static parallelLimit<T>(tasks: Array<AsyncFunction<T>>, limit: number, callback: AsyncResultArrayCallback<T>): void
	{
		return async.callTaskFn.call( null, async.eachLimitFn(limit), tasks, callback );
	}

	public static waterfall(tasks: Function[], callback: Function ): void
	{
		if ( !tasks.length ) return callback( null, [] );

		var wrapIterator = function (iterator)
		{
			return function (err)
			{
				if (err)
				{
					callback.apply(null, arguments);
					callback = function () {};
				}
				else
				{
					var args = Array.prototype.slice.call(arguments, 1);
					var next = iterator.next();

					if (next) args.push(wrapIterator(next));
					else args.push(callback);

					setTimeout( function ()
					{
						iterator.apply( null, args );
					}, 0 );
				}
			};
		};
		wrapIterator( async.iterator( tasks ) )(null);
	}

	private static iterator( tasks:Function[] ):Function
	{
		var makeCallback = function (index)
		{
			var fn:any = function ()
			{
				if (tasks.length)
				{
					tasks[index].apply(null, arguments);
				}
				return fn.next();
			};
			fn.next = function ()
			{
				return (index < tasks.length - 1) ? makeCallback(index + 1): null;
			};
			return fn;
		};
		return makeCallback(0);
	}

	private static callTaskFn<T>( fn:Function, tasks: Array<AsyncFunction<T>>, callback?: AsyncResultArrayCallback<T> ):void
	{
		fn( tasks, ( fn, callback ) =>
		{
			if ( !fn ) return;
			fn( ( err ) =>
			{
				var args = Array.prototype.slice.call( arguments, 1 );
				if (args.length <= 1) args = args[0];	// error occurs
				callback.call(null, err, args);
			});
		}, callback );
	}

	private static collectResultFn<T, R>( fn:Function, arr: T[], iterator: AsyncResultIterator<T, R>, callback: AsyncResultArrayCallback<R>): any
	{
		var tmp = arr.map( (x, i) => { return { index: i, value: x }; } );

		var results = [];
		fn( tmp, ( x, callback ) =>
		{
			iterator( x.value, ( err, v ) =>
			{
				results[ x.index ] = v;
				callback( err );
			} );
		}, ( err ) =>
		{
			callback( err, results );
		} );
	}

	private static eachLimitFn( limit:number ):Function
	{
		return function ( arr, iterator, callback )
		{
			if ( !arr.length || limit <= 0 ) return callback();
			var completed 	= 0;
			var started 	= 0;
			var running 	= 0;

			(function replenish ()
			{
				if ( completed >= arr.length ) return callback();

				while ( running < limit && started < arr.length )
				{
					started += 1;
					running += 1;
					iterator( arr[started - 1], function ( err )
					{
						if ( err )
						{
							callback( err );
							callback = function () {};
						}
						else
						{
							completed 	+= 1;
							running 	-= 1;
							if ( completed >= arr.length ) callback();
							else replenish();
						}
					} );
				}
			})();
		};
	}

	private static onlyOnce( fn )
	{
		var called = false;
		return function ()
		{
			if ( called ) throw new Error( "Callback was already called." );
			called = true;
			fn.apply( null, arguments );
		}
	}
}




