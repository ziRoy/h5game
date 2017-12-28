var skins;
(function (skins) {
    var TestSkin = (function (_super) {
        __extends(TestSkin, _super);
        function TestSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [640, 400]);
            this.elementsContent = [this.pbProgress_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = TestSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return TestSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.pbProgress_i = function () {
            var t = new ProgressBar();
            this.pbProgress = t;
            this.__s(t, ["skinName", "value", "percentWidth", "x", "y"], [skins.dw.ProgressBarSkin, 30, 80, 44, 70]);
            return t;
        };
        TestSkin._skinParts = ["pbProgress"];
        return TestSkin;
    })(egret.gui.Skin);
    skins.TestSkin = TestSkin;
    TestSkin.prototype.__class__ = "skins.TestSkin";
})(skins || (skins = {}));
//# sourceMappingURL=TestSkin.js.map