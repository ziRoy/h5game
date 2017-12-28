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

class StageSkinnableContainer extends egret.gui.SkinnableContainer
{
	public constructor()
	{
		super()
	}

	private setStageSize()
	{
		var stage:egret.Stage = egret.MainContext.instance.stage
		this.width = stage.stageWidth
		this.height = stage.stageHeight
	}

	public _onAddToStage():void
	{
		super._onAddToStage()
		this.setStageSize()
		this.stage.addEventListener( egret.Event.RESIZE, this.setStageSize, this )
	}

	public _onRemoveFromStage():void
	{
		this.stage.removeEventListener( egret.Event.RESIZE, this.setStageSize, this )
		super._onRemoveFromStage()
	}
}