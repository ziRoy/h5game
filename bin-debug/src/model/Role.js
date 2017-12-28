/**
 * Created by yinqing on 15-5-25.
 */
var Role = (function () {
    function Role() {
        /* 背包 （bug? 需要调用ArrayCollection.itemUpdated来更新，否则列表滚动会重置）*/
        this.bag = []; // egret.gui.ArrayCollection = new egret.gui.ArrayCollection();
        /* 存储某个英雄的等级 0代表未解锁 */
        this.herolist = [];
    }
    var __egretProto__ = Role.prototype;
    __egretProto__.init = function () {
        this.level = 1;
        this.exp = 0;
        this.energy = 40;
        this.gold = 122333;
        this.diamond = 123;
        this.heroWarrior = new Hero;
        this.heroDefender = new Hero;
        this.heroMage = new Hero;
        this.heroPriest = new Hero;
        for (var i = 1; i <= 9; i++) {
            Game.itemController.createItem(100 + i, Math.random() * 10 + 5);
        }
        for (var i = 1; i <= 4; i++) {
            var num = Math.floor(Math.random() * 10) % 6 + 1;
            for (var j = 1; j <= num; j++) {
                Game.heroController.createHero(i * 100 + j, Math.floor(Math.random() * 10) + 1);
            }
            for (var j = num + 1; j <= 6; j++) {
                Game.heroController.createHero(i * 100 + j, 0);
            }
        }
        this.heroWarrior = Game.heroController.findHero(101);
        this.heroDefender = Game.heroController.findHero(401);
        this.heroMage = Game.heroController.findHero(201);
        this.heroPriest = Game.heroController.findHero(301);
    };
    return Role;
})();
Role.prototype.__class__ = "Role";
//# sourceMappingURL=Role.js.map