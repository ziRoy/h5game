/**
 * Created by zmj on 15-4-28.
 */

class Config
{
	public tables:{[name:string]:any} = {};

	public load( path:string, cb:Function ):void
	{
		var csvName:any = /([^/]+)\.csv/.exec( path );
		if ( csvName ) csvName = csvName[1];
		else cb( new Error( 'invalid path') );

		RES.getResByUrl( path, ( csvStr ) => {

			var res = Papa.parse( csvStr, { header:true, dynamicTyping:true, skipEmptyLines:true } );
			if ( res.errors.length > 0 )
			{
				console.log( "[Config] parse error: %j", res.error );
				return cb( new Error() );
			}

			var rows:{[id:number]:any} = {};

			var len = res.data.length;

			for ( var i = 0; i < len; i++ )
			{
				var o = res.data[i];
				for ( var k in o )
				{
					if ( o[k] === "" ) o[k] = 0;	// 空单元格视作0

					var sp = /^json_(.+)/.exec( k )
					if ( sp )
					{
						try
						{
							o[sp[1]] = JSON.parse( o[k] );
							o[k] = undefined;
						}
						catch ( err )
						{
							console.log( '[Config] parse error: row=%d, col=%s', o[ "id" ], k );
							return cb( err );
						}
					}
				}
				if ( o.hasOwnProperty( 'id' ) )
				{
					rows[o.id] = o;
				}
			}
			this.tables[csvName] = rows;
			cb( null );

		}, this, RES.ResourceItem.TYPE_TEXT );
	}
}
