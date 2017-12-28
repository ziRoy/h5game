/**
 * Created by yulinjian on 15/7/8.
 */

class HeroController
{
    /* 加英雄 或者更新英雄等级 */
    public createHero(heroId:number, level:number):boolean
    {
        var config = Game.config.tables['hero'][heroId];

        if (config === undefined)
        {
            console.log("hero config noe found, id=%d", heroId);
            return false;
        }
        var hero = this.findHero( heroId );
        if( hero && level > hero.level )
        {
            hero.level = level;
        }
        else
        {
            hero = new Hero();
            hero.id = heroId;
            hero.level = level;
            Game.role.herolist.push( hero );
        }
        return true;
    }

    public findHero( heroId:number ):Hero
    {
        for( var i = 0 ; i < Game.role.herolist.length; i++ )
        {
            if( Game.role.herolist[i].id == heroId ) return Game.role.herolist[i];
        }
        return null;
    }

    /* 更换英雄 */
    public changeHero( preHeroId:number, curHeroId:number):boolean
    {
        var hero = this.findHero( curHeroId );
        if( hero && hero.level > 0 )
        {
            switch ( preHeroId )
            {
                case Game.role.heroDefender.id:
                    Game.role.heroDefender = hero;
                    break;
                case Game.role.heroWarrior.id:
                    Game.role.heroWarrior = hero;
                    break;
                case Game.role.heroMage.id:
                    Game.role.heroMage = hero;
                    break;
                case Game.role.heroPriest.id:
                    Game.role.heroPriest = hero;
                    break;
                default :
                    return false;
            }
            return true;
        }
        return false;
    }

    /*  升级英雄 */
    public upgradeHero( heroId:number ):boolean
    {
        var hero = this.findHero( heroId );
        if( !hero )
        {
            console.log(" HeroControl upgradeHero, heroId=%d is not exist.",heroId);
            return false;
        }
        var config = Game.config.tables['hero_upgrade'][hero.level];
        if( !config )
        {
            console.log(" HeroControl upgradeHero, heroLevel=%d is not exist.",hero.level);
            return false;
        }

        var quality = Game.config.tables['hero'][heroId].quality;

        var needGold = config["costGold" + quality.toString()];
        var needItemId1 = config["costItem" + quality.toString() + "1"];
        var needItemId2 = config["costItem" + quality.toString() + "2"];
        var needItemNum1 = config["costQty" + quality.toString() + "1"];
        var needItemNum2 = config["costQty" + quality.toString() + "2"];
        var totalItem1 = Game.itemController.getItemQty( needItemId1 );
        var totalItem2 = Game.itemController.getItemQty( needItemId2 );

        if( Game.role.gold < needGold || totalItem1 < needItemNum1 || totalItem2 < needItemNum2 )
        {
            console.log(" HeroControl upgradeHero, HeroUpgrade Item is not enough.. ");
            return false;
        }

        switch ( heroId )
        {
            case Game.role.heroDefender.id:
                if( this.createHero(heroId, Game.role.heroDefender.level+1 ) ){
                    Game.role.heroDefender = this.findHero( heroId );
                }
                break;
            case Game.role.heroWarrior.id:
                if( this.createHero(heroId, Game.role.heroWarrior.level+1 ) ){
                    Game.role.heroWarrior = this.findHero( heroId );
                }
                break;
            case Game.role.heroMage.id:
                if( this.createHero(heroId, Game.role.heroMage.level+1 )){

                    Game.role.heroMage = this.findHero( heroId );
                }
                break;
            case Game.role.heroPriest.id:
                if( this.createHero(heroId, Game.role.heroPriest.level+1 ) ){
                    Game.role.heroPriest = this.findHero( heroId );
                }
                break;
            default :
                console.log(" HeroControl upgradeHero, Hero not Found.. ");
                return false;
                break;
        }
        Game.role.gold -= needGold;
        Game.itemController.useItem( needItemId1 , needItemNum1 );
        Game.itemController.useItem( needItemId2 , needItemNum2 );

        Game.eventMgr.dispatch( EventMgr.HERO_UPDATE );
        return true;
    }

}