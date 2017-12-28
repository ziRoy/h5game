/**
 * Created by yinqing on 15-4-24.
 */

class NetClient extends egret.EventDispatcher
{
	private protoRoot	:any;
	private sock		:egret.WebSocket;
	private data		:egret.ByteArray;
	private mapCodeName	:{ [code:number]:string };

	public init( protoPath:string, cb:Function ):void
	{
		ProtoBuf.loadProtoFile( protoPath, ( err:Error, builder:any ) => {
			if ( err ) return cb( err );

			console.log( '[NetClient] protocol loaded' );

			this.protoRoot	= builder.build();
			this.sock		= new egret.WebSocket();
			this.mapCodeName= {};
			this.data		= new egret.ByteArray();
			this.data.endian = egret.Endian.LITTLE_ENDIAN;

			for ( var k in this.protoRoot )
			{
				var code = this.protoRoot[k].$options.code;
				if ( this.mapCodeName[code] ) return cb( new Error('duplicate cmd code ' + code ) );
				this.mapCodeName[code] = k;
			}

			this.sock.addEventListener( egret.Event.CONNECT, (evt:Event) => {
				console.log( "[NetClient] socket connected" );
				this.dispatchEventWith( egret.Event.CONNECT );
			}, null );

			this.sock.addEventListener( egret.ProgressEvent.SOCKET_DATA, ( evt:ProgressEvent ) => {

				console.log( "[NetClient] socket data received" );

				this.sock.readBytes( this.data, this.data.length );

				while ( this.data.length > 0 )
				{
					this.data.position = 0;
					var packetLen = this.data.readShort();
					if ( this.data.length >= packetLen )
					{
						var cmd = this.data.readShort();
						var tmp = new egret.ByteArray( new ArrayBuffer( packetLen - 4 ) );
						this.data.readBytes( tmp, 0, packetLen - 4 );

						var name = this.mapCodeName[cmd];

						if ( name !== undefined )
						{
							var vo;
							try
							{
								vo = this.protoRoot[name].decode( tmp.buffer );
							}
							catch ( err )
							{
								console.error( '[NetClient] decode failed, cmd=%d', cmd );
							}
							console.log( '[NetClient] receive packet, cmd=%s, data=%j', name, vo );
							this.dispatchEventWith( name, false, vo );
						}
						else
						{
							console.error( '[NetClient] command not found, cmd=%d', cmd );
						}

						var newData = new egret.ByteArray( new ArrayBuffer( this.data.bytesAvailable ) );
						this.data.readBytes( newData );
						this.data = newData;
					}
					else
					{
						break;
					}
				}
			}, null );

			this.sock.addEventListener( egret.Event.CLOSE, ( evt ) => {
				console.log( '[NetClient] socket closed' );
				this.dispatchEventWith( egret.Event.CLOSE );
			}, null );

			this.sock.addEventListener( egret.IOErrorEvent.IO_ERROR, ( evt ) => {
				console.log( '[NetClient] socket io error' );
				this.dispatchEventWith( egret.IOErrorEvent.IO_ERROR );
			}, null );

			this.sock.type = egret.WebSocket.TYPE_BINARY;

			cb( null );
		} );
	}

	public connect( host:string, port:number ):void
	{
		if ( this.sock === undefined )
		{
			console.error( '[NetClient] not initialized yet' );
			return;
		}
		this.sock.connect( host, port );
	}

	public send( vo:any ):void
	{
		if ( this.sock === undefined || !this.sock.connected )
		{
			console.error( '[NetClient] socket connected yet' );
			return;
		}

		var code;
		try
		{
			code = vo.$options.code;
		}
		catch( err )
		{
			console.log( '[NetClient] not a valid protobuf message, data=%j', vo );
			return;
		}

		var bytes = new egret.ByteArray( vo.toArrayBuffer() );

		var data = new egret.ByteArray( new ArrayBuffer( bytes.length + 4 ) );
		data.endian = egret.Endian.LITTLE_ENDIAN;
		data.writeShort( bytes.length + 4 );
		data.writeShort( code );
		data.writeBytes( bytes );
		this.sock.writeBytes( data );

		console.log( '[NetClient] data sent, len=%d, data=%j', data.length, vo );
	}

	public get message():any
	{
		return this.protoRoot;
	}

}


