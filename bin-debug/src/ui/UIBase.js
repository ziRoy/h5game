/**
 * 大小保持和stage一致
 */
//class StageGroup extends egret.gui.Group
//{
//	public constructor()
//	{
//		super()
//	}
//
//	private setStageSize()
//	{
//		var stage:egret.Stage = egret.MainContext.instance.stage
//		this.width = stage.stageWidth
//		this.height = stage.stageHeight
//	}
//
//	public _onAddToStage():void
//	{
//		super._onAddToStage()
//
//		this.setStageSize()
//		this.stage.addEventListener( egret.Event.RESIZE, this.setStageSize, this )
//	}
//
//	public _onRemoveFromStage():void
//	{
//		this.stage.removeEventListener( egret.Event.RESIZE, this.setStageSize, this )
//
//		super._onRemoveFromStage()
//	}
//}
var StageSkinnableContainer = (function (_super) {
    __extends(StageSkinnableContainer, _super);
    function StageSkinnableContainer() {
        _super.call(this);
    }
    var __egretProto__ = StageSkinnableContainer.prototype;
    __egretProto__.setStageSize = function () {
        var stage = egret.MainContext.instance.stage;
        this.width = stage.stageWidth;
        this.height = stage.stageHeight;
    };
    __egretProto__._onAddToStage = function () {
        _super.prototype._onAddToStage.call(this);
        this.setStageSize();
        this.stage.addEventListener(egret.Event.RESIZE, this.setStageSize, this);
    };
    __egretProto__._onRemoveFromStage = function () {
        this.stage.removeEventListener(egret.Event.RESIZE, this.setStageSize, this);
        _super.prototype._onRemoveFromStage.call(this);
    };
    return StageSkinnableContainer;
})(egret.gui.SkinnableContainer);
StageSkinnableContainer.prototype.__class__ = "StageSkinnableContainer";
//# sourceMappingURL=UIBase.js.map