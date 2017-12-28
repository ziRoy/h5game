/**
 * Created by yinqing on 15-2-28.
 */
var BoardEvent = (function (_super) {
    __extends(BoardEvent, _super);
    function BoardEvent(type, data) {
        _super.call(this, type);
        this.data = data;
    }
    var __egretProto__ = BoardEvent.prototype;
    BoardEvent.ELIMINATE = "eliminate"; // 消除事件
    BoardEvent.CLICK_EMPTY = "click_empty"; // 点击了空格
    BoardEvent.CLICK_WRONG = "click_wrong"; // 点击了无法消除的格子
    BoardEvent.CLICK_END = "click_end"; // 全点完了
    BoardEvent.REDRAWMAINUI = "redraw_mainui"; // 重新画主界面
    BoardEvent.CLICK_NUMBER = "click_nunber"; // 消除次数
    BoardEvent.DEBUFF_ATK = "debuff_atk"; // 每点击一次 按照毒和火焰造成伤害
    return BoardEvent;
})(egret.Event);
BoardEvent.prototype.__class__ = "BoardEvent";
var BattleScene = (function (_super) {
    __extends(BattleScene, _super);
    function BattleScene(stageName) {
        var _this = this;
        _super.call(this);
        this.stageName = stageName;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, function (evt) {
            _this.adjustPositionByStageSize();
            _this.removeEventListener(egret.Event.ADDED_TO_STAGE, arguments.callee, _this);
            _this.prepare();
            // 注册窗口大小变换事件
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, _this.adjustPositionByStageSize, _this);
        }, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function (evt) {
            _this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, arguments.callee, _this);
            // 移除窗口大小变换事件
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, _this.adjustPositionByStageSize, _this);
        }, this);
    }
    var __egretProto__ = BattleScene.prototype;
    __egretProto__.adjustPositionByStageSize = function () {
        var w = this.stage.stageWidth, h = this.stage.stageHeight;
        var r = Math.min(w / 400, h / 640);
        this.scaleX = this.scaleY = r;
        this.x = (w - 400 * r) / 2;
        this.y = (h - 640 * r) / 2;
    };
    __egretProto__.prepare = function () {
        var _this = this;
        this.board = new Board(this);
        this.field = new Field(this);
        this.uiLayer = new egret.DisplayObjectContainer();
        async.series([
            function (cb) {
                _this.board.load(cb);
            },
            function (cb) {
                _this.field.load(cb);
            }
        ], function () {
            _this.run();
        });
        //this.board.load( ()=>{
        //	this.field.load( () => {
        //		this.run();
        //	})
        //} );
    };
    __egretProto__.run = function () {
        this.field.view.x = 0;
        this.field.view.y = 0;
        this.addChild(this.field.view);
        this.board.view.x = 0;
        this.board.view.y = 640 - 345;
        this.addChild(this.board.view);
        this.addChild(this.uiLayer);
        //var txt = new egret.TextField();
        //txt.strokeColor = 0xff0000;
        //txt.stroke = 3;
        //txt.text = "123";
        //txt.x = 100;
        //txt.y = 260;
        //this.addChild( txt );
    };
    return BattleScene;
})(egret.DisplayObjectContainer);
BattleScene.prototype.__class__ = "BattleScene";
//# sourceMappingURL=BattleScene.js.map