
/*
* HeroInfoPanel.ts 中使用了这个类实现效果 这个只是声明
*/
class HeroListInfoView extends StageSkinnableContainer
{
    public lblHeroType      :egret.gui.Label;
    public heroItem         :egret.gui.DataGroup;
    public picHeroIcon      :egret.gui.UIAsset;
    public lblHeroLv        :egret.gui.Label;
    public lblHeroName      :egret.gui.Label;
    public lblHeroAttack    :egret.gui.Label;
    public lblHeroHp        :egret.gui.Label;
    public lblHeroDefend    :egret.gui.Label;
    public lblUnlockDesc    :egret.gui.Label;
    public lblNormalDesc    :egret.gui.Label;
    public lblSpecialDesc   :egret.gui.Label;

    public btnCancel   :egret.gui.Button;
    public btnConfirm  :egret.gui.Button;

    public constructor()
    {
        super();
        this.skinName = "skins.game.hero.HeroListInfoSkin";
    }

}