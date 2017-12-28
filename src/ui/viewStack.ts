class ViewStack
{
    private static uiStage :egret.gui.UIStage;
    private static root    :egret.DisplayObjectContainer;
    private static views   :egret.gui.IVisualElement[];

    /**
     * 移动进来
     */
    private static moveInFromPos( view:egret.gui.IVisualElement, posX:number ):void
    {
        this.uiStage.addElement( view );
        view.x = posX;
        egret.Tween.get( view ).to( { x:0 }, 300 );
    }

    /**
     * 移动出去
     */
    private static moveOutToPos( view:egret.gui.IVisualElement, posX:number ):void
    {
        egret.Tween.get( view ).to( { x:posX }, 300 )
                .call( () => { this.uiStage.removeElement( view ); } );
    }

    private static moveInNoAnim( view ):void
    {
        this.uiStage.addElement( view );
    }

    private static moveOutNoAnim( view ):void
    {
        this.uiStage.removeElement( view );
    }

    public static init( root:egret.DisplayObjectContainer ):void
    {
        this.root       = root;
        this.uiStage    = new egret.gui.UIStage();
        this.views      = [];
        this.root.addChild( this.uiStage );
    }

    public static pushView( view:egret.gui.IVisualElement, anim:boolean = true ):void
    {
        var stageWidth = egret.MainContext.instance.stage.stageWidth;
        var len = this.views.length;

        if ( len > 0 )
        {
            // 移除之前
            if ( anim ) this.moveOutToPos( this.views[ len - 1 ], -stageWidth );
            else this.moveOutNoAnim( this.views[ len - 1 ] );
        }
        // 添加
        this.views.push( view );

        if ( anim ) this.moveInFromPos( view, stageWidth );
        else this.moveInNoAnim( view );
    }

    public static popView( anim:boolean = true ):void
    {
        var stageWidth = egret.MainContext.instance.stage.stageWidth;
        var len = this.views.length;

        if ( len > 0 )
        {
            // 移除之前
            if ( anim ) this.moveOutToPos( this.views[ len - 1 ], stageWidth );
            else this.moveOutNoAnim( this.views[ len - 1 ] );

            this.views.pop();
            len--;
        }

        if ( len > 0 )
        {
            // 添加
            if ( anim ) this.moveInFromPos( this.views[ len - 1 ], -stageWidth );
            else this.moveInNoAnim( this.views[ len - 1 ] );
        }
    }
}