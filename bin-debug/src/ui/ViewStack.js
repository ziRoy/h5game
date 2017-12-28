var ViewStack = (function () {
    function ViewStack() {
    }
    var __egretProto__ = ViewStack.prototype;
    /**
     * 移动进来
     */
    ViewStack.moveInFromPos = function (view, posX) {
        this.uiStage.addElement(view);
        view.x = posX;
        egret.Tween.get(view).to({ x: 0 }, 300);
    };
    /**
     * 移动出去
     */
    ViewStack.moveOutToPos = function (view, posX) {
        var _this = this;
        egret.Tween.get(view).to({ x: posX }, 300).call(function () {
            _this.uiStage.removeElement(view);
        });
    };
    ViewStack.moveInNoAnim = function (view) {
        this.uiStage.addElement(view);
    };
    ViewStack.moveOutNoAnim = function (view) {
        this.uiStage.removeElement(view);
    };
    ViewStack.init = function (root) {
        this.root = root;
        this.uiStage = new egret.gui.UIStage();
        this.views = [];
        this.root.addChild(this.uiStage);
    };
    ViewStack.pushView = function (view, anim) {
        if (anim === void 0) { anim = true; }
        var stageWidth = egret.MainContext.instance.stage.stageWidth;
        var len = this.views.length;
        if (len > 0) {
            // 移除之前
            if (anim)
                this.moveOutToPos(this.views[len - 1], -stageWidth);
            else
                this.moveOutNoAnim(this.views[len - 1]);
        }
        // 添加
        this.views.push(view);
        if (anim)
            this.moveInFromPos(view, stageWidth);
        else
            this.moveInNoAnim(view);
    };
    ViewStack.popView = function (anim) {
        if (anim === void 0) { anim = true; }
        var stageWidth = egret.MainContext.instance.stage.stageWidth;
        var len = this.views.length;
        if (len > 0) {
            // 移除之前
            if (anim)
                this.moveOutToPos(this.views[len - 1], stageWidth);
            else
                this.moveOutNoAnim(this.views[len - 1]);
            this.views.pop();
            len--;
        }
        if (len > 0) {
            // 添加
            if (anim)
                this.moveInFromPos(this.views[len - 1], -stageWidth);
            else
                this.moveInNoAnim(this.views[len - 1]);
        }
    };
    return ViewStack;
})();
ViewStack.prototype.__class__ = "ViewStack";
//# sourceMappingURL=ViewStack.js.map