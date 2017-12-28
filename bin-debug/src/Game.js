/**
 * Created by yinqing on 15-4-27.
 */
var Game = (function () {
    function Game() {
    }
    var __egretProto__ = Game.prototype;
    Game.controller = new Controller();
    Game.itemController = new ItemController();
    Game.heroController = new HeroController();
    return Game;
})();
Game.prototype.__class__ = "Game";
//# sourceMappingURL=Game.js.map