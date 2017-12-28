/**
 * Created by yinqing on 15-5-25.
 */
class Role
{
	public constructor()
	{
	}

	public init():void
	{
		this.level	= 1;
		this.exp	= 0;
		this.energy = 40;
		this.gold   = 122333;
		this.diamond = 123;

		this.heroWarrior = new Hero;
		this.heroDefender = new Hero;
		this.heroMage = new Hero;
		this.heroPriest = new Hero;

		for( var i = 1; i <= 9; i ++ )
		{
			Game.itemController.createItem( 100 + i, Math.random() * 10 + 5 );
		}

		for( var i = 1; i <= 4; i++ )
		{
			var num = Math.floor( Math.random() * 10 )% 6 + 1;
			for( var j = 1; j <= num; j ++ )
			{
				Game.heroController.createHero( i * 100 + j , Math.floor( Math.random() * 10 ) + 1 );
			}
			for( var j = num + 1; j <= 6; j ++ )
			{
				Game.heroController.createHero( i * 100 + j, 0 );
			}
		}

		this.heroWarrior = Game.heroController.findHero( 101 );
		this.heroDefender = Game.heroController.findHero( 401 );
		this.heroMage = Game.heroController.findHero( 201 );
		this.heroPriest = Game.heroController.findHero( 301 );
	}

	public level	:number;		/* 角色等级 */
	public exp		:number;		/* 本级经验 */
	public energy	:number;		/* 当前能量 */
	public gold		:number;		/* 当前金币 */
	public diamond	:number;		/* 当前钻石 */

	public heroWarrior		:Hero;	/* 当前战士 */
	public heroDefender		:Hero;	/* 当前坦克 */
	public heroMage			:Hero;	/* 当前法师 */
	public heroPriest		:Hero;	/* 当前牧师 */

	/* 背包 （bug? 需要调用ArrayCollection.itemUpdated来更新，否则列表滚动会重置）*/
	public bag				:Array<Item> = [];// egret.gui.ArrayCollection = new egret.gui.ArrayCollection();

	/* 存储某个英雄的等级 0代表未解锁 */
	public herolist			:Array<Hero> = [];

	/* 已解锁的英雄 */
	public heroOwned		:{ [id:number]:boolean };
}
