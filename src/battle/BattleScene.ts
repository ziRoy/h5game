/**
 * Created by yinqing on 15-2-28.
 */

interface IBattleContext extends egret.IEventDispatcher
{
	board		:Board;
	field		:Field;
	uiLayer		:egret.DisplayObjectContainer;
	stageName 	:string;
}

class BoardEvent extends egret.Event
{
	public static ELIMINATE	= "eliminate";	// 消除事件
	public static CLICK_EMPTY = "click_empty";	// 点击了空格
	public static CLICK_WRONG = "click_wrong";	// 点击了无法消除的格子
	public static CLICK_END = "click_end";		// 全点完了
	public static REDRAWMAINUI = "redraw_mainui"; // 重新画主界面
	public static CLICK_NUMBER = "click_nunber";  // 消除次数
	public static DEBUFF_ATK = "debuff_atk";	 // 每点击一次 按照毒和火焰造成伤害

	public data:any;

	public constructor(type: string, data?:any )
	{
		super( type );
		this.data = data;
	}
}

class BattleScene extends egret.DisplayObjectContainer implements IBattleContext
{
	public board		:Board;
	public field		:Field;
	public uiLayer		:egret.DisplayObjectContainer;
	public stageName	:string;

	public constructor( stageName:string )
	{
		super();

		this.stageName = stageName;

		this.addEventListener(egret.Event.ADDED_TO_STAGE,
			( evt:egret.Event ) =>
			{
                this.adjustPositionByStageSize()

				this.removeEventListener( egret.Event.ADDED_TO_STAGE, arguments.callee, this );
				this.prepare();

                // 注册窗口大小变换事件
                egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.adjustPositionByStageSize, this)
			}, this );

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE,
            ( evt:egret.Event ) =>
            {
                this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, arguments.callee, this)

                // 移除窗口大小变换事件
                egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.adjustPositionByStageSize, this)
            }, this );
	}

    private adjustPositionByStageSize(){
        var w = this.stage.stageWidth, h = this.stage.stageHeight;
        var r = Math.min( w / 400, h / 640 );
        this.scaleX = this.scaleY = r;
        this.x = ( w - 400 * r ) / 2;
        this.y = ( h - 640 * r ) / 2;
    }

	private prepare():void
	{
		this.board = new Board( this );
		this.field = new Field( this );
		this.uiLayer = new egret.DisplayObjectContainer();

		async.series([
			(cb) => { this.board.load( cb ); },
			(cb) => { this.field.load( cb ); }
		], () => { this.run(); } );

		//this.board.load( ()=>{
		//	this.field.load( () => {
		//		this.run();
		//	})
		//} );
	}

	private run():void
	{
		this.field.view.x = 0;
		this.field.view.y = 0;
		this.addChild( this.field.view );

		this.board.view.x = 0;
		this.board.view.y = 640 - 345;
		this.addChild( this.board.view );

		this.addChild( this.uiLayer );

		//var txt = new egret.TextField();
		//txt.strokeColor = 0xff0000;
		//txt.stroke = 3;
		//txt.text = "123";
		//txt.x = 100;
		//txt.y = 260;
		//this.addChild( txt );
	}

}