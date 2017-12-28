/**
 * Created by yulinjian on 15/6/30.
 */

class DataEvent extends egret.Event
{
    public data:any;

    public constructor(type: string, data?:any )
    {
        super( type );
        this.data = data;
    }

}

class EventMgr extends egret.EventDispatcher
{
    public static BAG_UPDATE        = "BAG_UPDATE";    // 使用物品
    public static HERO_UPDATE       = "HERO_UPDATE";   //英雄升级
    public static GOLD_UPDATE       = "GOLD_UPDATE";   //金币变化
    public static DIAMOND_UPDATE    = "DIAMOND_UPDATE";

    public static CHOOSE_HERO       = "CHOOSE_HERO";    //选择英雄

    public constructor()
    {
        super();
    }

    public addListener( eventName:string, cb:( data:any ) => void ):void
    {
        this.addEventListener( eventName, cb, null );
    }

    public removeListener( eventName:string, cb:( data:any ) => void ):void
    {
        this.removeEventListener( eventName, cb, null );
    }

    public dispatch( eventName, data:any = null ):void
    {
        this.dispatchEvent( new DataEvent( eventName, data ) );
        //Game.eventmgr.dispatch( EventMgr.BagUpdate );
    }
}

