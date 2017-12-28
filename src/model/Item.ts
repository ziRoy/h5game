/**
 * Created by yinqing on 15-7-6.
 */
class Item
{
	public itemId		:number;
	public itemNum		:number;
}

enum ItemType
{
	PERSISTENT	= 1,		// 可使用
	IMMEDIATE	= 2,		// 过程类，直接折合成其他资源（金币等）
	MATERIAL	= 3,		// 材料类，不可直接使用
	COMBINE		= 4,		// 合成类
}

enum ItemEffectType
{
	GOLD		= 1,
	DIAMOND		= 2,
	ENERGY		= 3,
	BOX			= 80001
}