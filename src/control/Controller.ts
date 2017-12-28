/**
 * Created by yulinjian on 15/6/30.
 */

class Controller extends egret.EventDispatcher
{
    public constructor()
    {
        super();
    }
    /**
     * 将 Reward 内容实装到 Role
     * */
    public applyReward( rwd:Reward ):boolean
    {
        if ( rwd.gold )
        {
            Game.role.gold += rwd.gold;
            Game.eventMgr.dispatch( EventMgr.GOLD_UPDATE );
        }
        if ( rwd.diamond )
        {
            Game.role.diamond += rwd.diamond;
            Game.eventMgr.dispatch( EventMgr.DIAMOND_UPDATE );
        }
        if ( rwd.item )
        {
            var dirty = false;
            for ( var itemId in rwd.item )
            {
                Game.itemController.createItem( itemId, rwd.item[itemId] );
                dirty = true;
            }
            if ( dirty ) Game.eventMgr.dispatch( EventMgr.BAG_UPDATE );
        }
        return true;
    }

}