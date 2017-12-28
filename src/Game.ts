/**
 * Created by yinqing on 15-4-27.
 */

class Game
{
	/* 全局变量 */

	static net		:NetClient;
	static config	:Config;

	/* model */
	static role		:Role;

	/* event */
	static eventMgr		:EventMgr;


	static controller		:Controller			= new Controller();
	static itemController	:ItemController		= new ItemController();
	static heroController	:HeroController	    = new HeroController();
}
