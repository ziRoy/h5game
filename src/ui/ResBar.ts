/**
 * Created by yinqing on 15-5-13.
 */


class ResBar extends StageSkinnableContainer
{
	public lvProgress	:egret.gui.ProgressBar;
	public rolelevel	:egret.gui.Label;
	public lblEnergy	:egret.gui.Label;
	public lblGold		:egret.gui.Label;

	public constructor()
	{
		super();
		this.skinName = "skins.game.ResBarSkin";
	}

}