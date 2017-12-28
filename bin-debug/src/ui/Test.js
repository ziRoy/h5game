/**
 * Created by yinqing on 15-4-13.
 */
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.call(this);
        this.skinName = "skins.TestSkin";
    }
    var __egretProto__ = Test.prototype;
    __egretProto__.childrenCreated = function () {
        var _this = this;
        //this.pbProgress.value = 0;
        //this.btnStart.addEventListener( egret.TouchEvent.TOUCH_TAP, this.clickHandler, this );
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.pbProgress.value += 5;
        }, this);
        // TODO net demo
        Game.net.init('./src/share/cmd.proto', function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
            Game.net.addEventListener(egret.Event.CONNECT, function () {
                var vo = new Game.net.message['CS_Foo_echo']();
                vo.content = "hello server";
                vo.param = [100, 200, 300];
                Game.net.send(vo);
            }, _this);
            Game.net.addEventListener('SC_Foo_echo', function (evt) {
                console.log('result: %s', evt.data.content);
            }, _this);
            Game.net.connect('172.16.3.88', 7777);
        });
        // TODO csv config demo
        Game.config.load('./src/share/config/test.csv', function (err) {
            if (err) {
                console.log(err.message);
                return;
            }
            console.log("%j", Game.config.tables["test"][1]);
        });
    };
    return Test;
})(StageSkinnableContainer);
Test.prototype.__class__ = "Test";
//# sourceMappingURL=Test.js.map