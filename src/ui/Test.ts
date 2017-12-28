/**
 * Created by yinqing on 15-4-13.
 */

class Test extends StageSkinnableContainer
{
	public constructor()
	{
		super();
		this.skinName = "skins.TestSkin";
	}

	public pbProgress:ProgressBar;

	public childrenCreated():void
	{
		//this.pbProgress.value = 0;
		//this.btnStart.addEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );
		this.touchEnabled = true;
		this.addEventListener( egret.TouchEvent.TOUCH_TAP, ( e:egret.TouchEvent ) => { this.pbProgress.value += 5; }, this );

		// TODO net demo
		Game.net.init( './src/share/cmd.proto', ( err:Error ) => {
			if ( err )
			{
				console.log( err.message );
				return;
			}
			Game.net.addEventListener( egret.Event.CONNECT, () => {

				var vo = new Game.net.message['CS_Foo_echo']();
				vo.content 	= "hello server";
				vo.param	= [100, 200, 300];
				Game.net.send( vo );

			}, this );

			Game.net.addEventListener( 'SC_Foo_echo', ( evt:egret.Event ) => {

				console.log( 'result: %s', evt.data.content );

			}, this );

			Game.net.connect( '172.16.3.88', 7777 );
		} );

		// TODO csv config demo
		Game.config.load( './src/share/config/test.csv', ( err:Error ) => {

			if ( err )
			{
				console.log( err.message );
				return;
			}
			console.log( "%j", Game.config.tables[ "test" ][ 1 ] );

		} );
	}

	//private clickHandler():void
	//{
	//	ViewStack.pushView( new egret.gui.UIAsset( new BattleScene() ) );
	//}
}