/**
 * Created by yinqing on 15-2-28.
 */
var Avatar = (function () {
    function Avatar(id, config, skin) {
        var _this = this;
        if (skin === void 0) { skin = 1; }
        this.loaded = false;
        this.actionName = "";
        this.actionLoop = false;
        this.moveQueue = [];
        this.buffMap = {};
        this.id = id;
        this.skin = skin;
        this.config = config;
        this.view = new FlccMovieClip(id, skin, function (flcc) {
            _this.loaded = true;
            flcc.setAction(_this.actionName, _this.actionLoop);
        });
        var shadow = new egret.Bitmap(RES.getRes("shadow"));
        shadow.anchorX = shadow.anchorY = 0.5;
        this.view.addChild(shadow);
        this.view.scaleX *= 0.75;
        this.view.scaleY *= 0.75;
    }
    var __egretProto__ = Avatar.prototype;
    __egretProto__.setAction = function (name, loop) {
        if (loop === void 0) { loop = false; }
        this.actionName = name;
        this.actionLoop = loop;
        if (this.loaded) {
            this.view.setAction(this.actionName, this.actionLoop);
        }
    };
    __egretProto__.appendMove = function (name, target, hitAction, onHit, onComp) {
        this.moveQueue.push({ name: name, target: target, hitAction: hitAction, onHit: onHit, onComp: onComp });
        //this.nextMove();
    };
    __egretProto__.start = function (cb) {
        this.nextMove(cb);
    };
    __egretProto__.hit = function () {
        var _this = this;
        if (this.actionName == "Action_Hit") {
            this.setAction("Action_Hit", false);
        }
        else if (this.actionName == "Action_Stand") {
            this.view.addEventListener(egret.Event.COMPLETE, function () {
                _this.view.removeEventListener(egret.Event.COMPLETE, arguments.callee, _this);
                _this.setAction("Action_Stand", true);
                _this.nextMove();
            }, this);
            this.setAction("Action_Hit", false);
        }
        else {
            return;
        }
    };
    __egretProto__.nextMove = function (cb) {
        var _this = this;
        if (this.moveQueue.length == 0) {
            this.setAction("Action_Stand", true);
            if (cb) {
                cb.call(null);
            }
            return false;
        }
        var move = this.moveQueue.shift();
        this.xuliRemove(); // 移除蓄力效果
        this.setAction("Action_" + move.name);
        // 自身特效
        var effSelf = this.config[move.name + "Display"].eff_self;
        if (effSelf)
            new Effect(effSelf).playOn(this);
        // 目标特效
        var effTarget = this.config[move.name + "Display"].eff_target;
        if (effTarget)
            new Effect(effTarget).playOn(move.target);
        var hitFrame = (this.config[move.name + "Display"].hit || [0]);
        var scheduleHit = function () {
            var hitLen = hitFrame.length;
            for (var i = 0; i < hitLen; i++) {
                setTimeout(function (idx) {
                    if (idx == 0) {
                        var buff = _this.config[move.name + "Display"].missile;
                        if (buff) {
                            move.target.addBuff(buff[0], buff[2], buff[1]);
                        }
                    }
                    if (move.hitAction)
                        move.target.hit();
                    if (move.onHit)
                        move.onHit(idx, hitLen);
                }, hitFrame[i] * _this.view.frameTime, i);
            }
        };
        var missile = this.config[move.name + "Display"].missile;
        if (missile) {
            var missileSpcc = new SpccMovieClip(missile[0], function (ef) {
                ef.play(true);
            });
            var tp = new egret.Point();
            move.target.view.localToGlobal(0, -move.target.view.height / 2, tp);
            this.view.globalToLocal(tp.x, tp.y, tp);
            egret.Tween.get(missileSpcc).wait(missile[1] * this.view.frameTime).call(function () {
                _this.view.addChild(missileSpcc);
            }, this).to({ y: -this.view.height / 2 }, 0).to({ x: tp.x, y: tp.y }, 500).call(function () {
                _this.view.removeChild(missileSpcc);
                new Effect(missile[2]).playOn(move.target);
                //scheduleHit();
            });
        }
        else {
            scheduleHit();
        }
        this.view.addEventListener(egret.Event.COMPLETE, function () {
            _this.view.removeEventListener(egret.Event.COMPLETE, arguments.callee, _this);
            if (move.onComp)
                move.onComp();
            _this.nextMove(cb);
        }, this);
    };
    __egretProto__.addBuff = function (id, effId, duration) {
        var _this = this;
        var buff = this.buffMap[id];
        if (buff) {
            clearTimeout(buff.clock);
            buff.clock = setTimeout(function () {
                _this.removeBuff(id);
            }, duration);
        }
        else {
            this.buffMap[id] = {
                "eff": new Effect(effId).playOn(this, true),
                "clock": setTimeout(function () {
                    _this.removeBuff(id);
                }, duration)
            };
        }
    };
    __egretProto__.removeBuff = function (id) {
        var buff = this.buffMap[id];
        if (buff) {
            buff.eff.remove();
            clearTimeout(buff.clock);
            delete this.buffMap[id];
        }
    };
    Object.defineProperty(__egretProto__, "busy", {
        get: function () {
            return this.actionName != "Action_Stand";
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.xuliEffect = function () {
        if (!this.xulieff) {
            this.xulieff = new Effect(2034).playOn(this, true);
        }
    };
    __egretProto__.xuliRemove = function () {
        if (this.xulieff) {
            this.xulieff.remove();
            this.xulieff = null;
        }
    };
    Object.defineProperty(__egretProto__, "name", {
        get: function () {
            return "unknown";
        },
        enumerable: true,
        configurable: true
    });
    return Avatar;
})();
Avatar.prototype.__class__ = "Avatar";
var HeroAvatar = (function (_super) {
    __extends(HeroAvatar, _super);
    function HeroAvatar(id) {
        _super.call(this, id, Game.config.tables["hero"][id]);
        this.m_atk = Game.config.tables['hero'][id].initAtk;
    }
    var __egretProto__ = HeroAvatar.prototype;
    Object.defineProperty(__egretProto__, "name", {
        get: function () {
            return "hero" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "atk", {
        get: function () {
            return this.m_atk;
        },
        set: function (atk) {
            this.m_atk = atk;
        },
        enumerable: true,
        configurable: true
    });
    return HeroAvatar;
})(Avatar);
HeroAvatar.prototype.__class__ = "HeroAvatar";
var MonsterAvatar = (function (_super) {
    __extends(MonsterAvatar, _super);
    function MonsterAvatar(id, lv, job, ty, round, cb, config) {
        if (config === void 0) { config = {}; }
        _super.call(this, id, config);
        this.ClickLimitNumber = 5;
        this.m_ClickNumber = this.ClickLimitNumber;
        this.m_hpMax = 100;
        this.m_hpCur = this.m_hpMax;
        this.m_ClickNumber = this.ClickLimitNumber = round;
        this.m_monsterAtk = cb;
        this.m_label = new egret.gui.Label();
        this.m_label.text = this.m_ClickNumber.toString();
        this.m_label.textColor = 0xff0000;
        this.view.addChild(this.m_label);
        this.m_hpBar = new HpBar(new egret.Bitmap(RES.getRes("hp_bar_red")), new egret.Bitmap(RES.getRes("hp_bar_bg")));
        this.m_hpBar.x = -50;
        this.m_hpBar.y = -70;
        this.view.addChild(this.m_hpBar);
        this.m_monsterLv = lv;
        this.m_hpMax = this.getHp(lv, job, ty);
        this.m_atk = this.getatk(lv, job, ty);
        this.m_hpCur = this.m_hpMax;
        this.updateMonsterHp();
    }
    var __egretProto__ = MonsterAvatar.prototype;
    Object.defineProperty(__egretProto__, "name", {
        get: function () {
            return "monster" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.getHp = function (lv, job, ty) {
        var config = Game.config.tables['monster_lv'][lv];
        var result = Game.config.tables['monster_type'][ty].Left / 10000 + 1;
        switch (job) {
            case 1:
                result *= config.hp1;
                break;
            case 2:
                result *= config.hp2;
                break;
            case 3:
                result *= config.hp3;
                break;
            case 4:
                result *= config.hp4;
                break;
            default:
                return -1;
        }
        return Math.floor(result);
    };
    __egretProto__.getatk = function (lv, job, ty) {
        var config = Game.config.tables['monster_lv'][lv];
        var result = Game.config.tables['monster_type'][ty].Str / 10000 + 1;
        switch (job) {
            case 1:
                result *= config.attak1;
                break;
            case 2:
                result *= config.attak2;
                break;
            case 3:
                result *= config.attak3;
                break;
            case 4:
                result *= config.attak4;
                break;
            default:
                return -1;
        }
        return Math.floor(result);
    };
    __egretProto__.subClickNumber = function () {
        this.m_ClickNumber--;
        if (this.m_ClickNumber <= 0) {
            this.m_monsterAtk.call(null);
            this.m_ClickNumber = this.ClickLimitNumber;
        }
        this.m_label.text = this.m_ClickNumber.toString();
    };
    __egretProto__.getHpCur = function () {
        return this.m_hpCur;
    };
    __egretProto__.setHpCur = function (hpCnt) {
        if (hpCnt < 0)
            hpCnt = 0;
        this.m_hpCur = Math.floor(hpCnt);
        this.updateMonsterHp();
    };
    __egretProto__.updateMonsterHp = function () {
        this.m_hpBar.text = "HP:" + this.m_hpCur;
        this.m_hpBar.percent = this.m_hpCur / this.m_hpMax;
    };
    return MonsterAvatar;
})(Avatar);
MonsterAvatar.prototype.__class__ = "MonsterAvatar";
var Effect = (function () {
    function Effect(id) {
        this.id = id;
    }
    var __egretProto__ = Effect.prototype;
    __egretProto__.playOn = function (avatar, loop) {
        var _this = this;
        if (loop === void 0) { loop = false; }
        this.view = new SpccMovieClip(this.id, function (ef) {
            //ef.scaleX = avatar.view.scaleX;
            //ef.scaleY = avatar.view.scaleY;
            if (!loop) {
                ef.addEventListener(egret.Event.COMPLETE, function () {
                    ef.removeEventListener(egret.Event.COMPLETE, arguments.callee, _this);
                    ef.parent.removeChild(ef);
                }, _this);
            }
            avatar.view.addChild(ef);
            ef.play(loop);
        });
        return this;
    };
    __egretProto__.playBlock = function (block, loop) {
        var _this = this;
        if (loop === void 0) { loop = false; }
        this.view = new SpccMovieClip(this.id, function (ef) {
            if (!loop) {
                ef.addEventListener(egret.Event.COMPLETE, function () {
                    ef.removeEventListener(egret.Event.COMPLETE, arguments.callee, _this);
                    ef.parent.removeChild(ef);
                }, _this);
            }
            block.m_view.addChild(ef);
            ef.play(loop);
        });
        return this;
    };
    __egretProto__.remove = function () {
        if (this.view.parent)
            this.view.parent.removeChild(this.view);
    };
    return Effect;
})();
Effect.prototype.__class__ = "Effect";
var MyModel = (function () {
    function MyModel(cb) {
        this.hpMax = 100;
        this.dpMax = 10;
        this.atk = 3;
        this.m_hpCur = this.hpMax;
        this.m_dpCur = this.dpMax;
        this.m_cb = cb;
        var heroWarriorConfig = Game.config.tables['hero'][Game.role.heroWarrior.id];
        var heroDefenderConfig = Game.config.tables['hero'][Game.role.heroDefender.id];
        var heroMageConfig = Game.config.tables['hero'][Game.role.heroMage.id];
        var heroPriestConfig = Game.config.tables['hero'][Game.role.heroPriest.id];
        this.hpMax = heroWarriorConfig.initHp + (Game.role.heroWarrior.level - 1) * heroWarriorConfig.growHp + heroDefenderConfig.initHp + (Game.role.heroDefender.level - 1) * heroDefenderConfig.growHp + heroMageConfig.initHp + (Game.role.heroMage.level - 1) * heroMageConfig.growHp + heroPriestConfig.initHp + (Game.role.heroPriest.level - 1) * heroPriestConfig.growHp;
        this.dpMax = heroWarriorConfig.initDp + (Game.role.heroWarrior.level - 1) * heroWarriorConfig.growDp + heroDefenderConfig.initDp + (Game.role.heroDefender.level - 1) * heroDefenderConfig.growDp + heroMageConfig.initDp + (Game.role.heroMage.level - 1) * heroMageConfig.growDp + heroPriestConfig.initDp + (Game.role.heroPriest.level - 1) * heroPriestConfig.growDp;
        this.atk = heroWarriorConfig.initAtk + (Game.role.heroWarrior.level - 1) * heroWarriorConfig.growAtk + heroDefenderConfig.initAtk + (Game.role.heroDefender.level - 1) * heroDefenderConfig.growAtk + heroMageConfig.initAtk + (Game.role.heroMage.level - 1) * heroMageConfig.growAtk + heroPriestConfig.initAtk + (Game.role.heroPriest.level - 1) * heroPriestConfig.growAtk;
        this.m_hpCur = this.hpMax;
        this.m_dpCur = this.dpMax;
    }
    var __egretProto__ = MyModel.prototype;
    Object.defineProperty(__egretProto__, "hpCur", {
        get: function () {
            return Math.floor(this.m_hpCur);
        },
        set: function (v) {
            this.m_hpCur = Math.max(Math.min(v, this.hpMax), 0);
            if (this.m_cb)
                this.m_cb.call(null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "dpCur", {
        get: function () {
            return this.m_dpCur;
        },
        set: function (v) {
            this.m_dpCur = Math.max(Math.min(v, this.dpMax), 0);
            if (this.m_cb)
                this.m_cb.call(null);
        },
        enumerable: true,
        configurable: true
    });
    return MyModel;
})();
MyModel.prototype.__class__ = "MyModel";
//class EnemyModel
//{
//	public constructor( cb?:Function )
//	{
//		this.m_cb = cb;
//	}
//
//	public get hpCur():number { return this.m_hpCur; }
//	public set hpCur( v:number )
//	{
//		this.m_hpCur = Math.max( Math.min( v, this.hpMax ), 0 );
//		if ( this.m_cb )
//		{
//			this.m_cb.call( null );
//		}
//	}
//
//	public reload():void
//	{
//		this.hpMax = 3000;
//		this.hpCur = this.hpMax;
//		//this.atkTs = 0;
//	}
//
//	public hpMax	: number = 3000;
//	public atk		: number = 30;
//
//	private m_cb	:Function;
//	private m_hpCur	:number = this.hpMax;
//
//	public atkFunc		:Function;
//}
var MyEffectList = (function () {
    function MyEffectList() {
    }
    var __egretProto__ = MyEffectList.prototype;
    return MyEffectList;
})();
MyEffectList.prototype.__class__ = "MyEffectList";
var Field = (function (_super) {
    __extends(Field, _super);
    //private m_enemy		:EnemyModel;
    function Field(context) {
        _super.call(this);
        this.stageIndex = 0;
        this.m_context = context;
    }
    var __egretProto__ = Field.prototype;
    __egretProto__.load = function (cb, target) {
        var _this = this;
        new AssetGroup("field").appendRes("scene_top", RES.ResourceItem.TYPE_IMAGE, "assets/battle/scene/top.png").appendRes("shadow", RES.ResourceItem.TYPE_IMAGE, "assets/battle/scene/shadow.png").appendRes("battle_ui", "sheet", "assets/battle/ui/battle_ui.json").load(function () {
            _this.build();
            cb.call(target);
        });
    };
    __egretProto__.build = function () {
        var _this = this;
        this.m_my = new MyModel(function () {
            _this.updateUI();
        });
        //this.m_enemy= new EnemyModel( () => { this.updateUI(); } );
        //this.m_enemy.atkFunc = () => { this.monsterAtk(); };
        this.view = new egret.DisplayObjectContainer();
        this.view.touchEnabled = this.view.touchChildren = false;
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("scene_top"); // 480 * 320
        bg.width = 500;
        bg.x = (400 - 500) / 2;
        bg.y = 0;
        this.view.addChild(bg);
        this.warrior = new HeroAvatar(Game.role.heroWarrior.id);
        this.warrior.setAction("Action_Stand", true);
        this.warrior.view.x = 190;
        this.warrior.view.y = 140;
        this.warrior.view.scaleX *= -1;
        this.view.addChild(this.warrior.view);
        this.mage = new HeroAvatar(Game.role.heroMage.id);
        this.mage.setAction("Action_Stand", true);
        this.mage.view.x = 90;
        this.mage.view.y = 140;
        this.mage.view.scaleX *= -1;
        this.view.addChild(this.mage.view);
        this.priest = new HeroAvatar(Game.role.heroPriest.id);
        this.priest.setAction("Action_Stand", true);
        this.priest.view.x = 60;
        this.priest.view.y = 225;
        this.priest.view.scaleX *= -1;
        this.view.addChild(this.priest.view);
        this.defender = new HeroAvatar(Game.role.heroDefender.id);
        this.defender.setAction("Action_Stand", true);
        this.defender.view.x = 160;
        this.defender.view.y = 225;
        this.defender.view.scaleX *= -1;
        this.view.addChild(this.defender.view);
        this.m_heroHpBar = new HpBar(new egret.Bitmap(RES.getRes("hp_bar_red")), new egret.Bitmap(RES.getRes("hp_bar_bg")));
        this.m_heroHpBar.x = 30;
        this.m_heroHpBar.y = 260;
        this.m_context.uiLayer.addChild(this.m_heroHpBar);
        this.m_heroDpBar = new HpBar(new egret.Bitmap(RES.getRes("hp_bar_blue")), new egret.Bitmap(RES.getRes("hp_bar_bg")));
        this.m_heroDpBar.x = 260;
        this.m_heroDpBar.y = 260;
        this.m_context.uiLayer.addChild(this.m_heroDpBar);
        this.m_context.addEventListener(BoardEvent.ELIMINATE, this.onEliminate, this);
        this.m_context.addEventListener(BoardEvent.CLICK_EMPTY, this.onPenalty, this);
        this.m_context.addEventListener(BoardEvent.CLICK_WRONG, this.onPenalty, this);
        this.m_context.addEventListener(BoardEvent.CLICK_END, this.onClickEnd, this);
        this.m_context.addEventListener(BoardEvent.REDRAWMAINUI, this.reDrawMainUI, this);
        this.m_context.addEventListener(BoardEvent.CLICK_NUMBER, this.onClickNumber, this);
        this.m_context.addEventListener(BoardEvent.DEBUFF_ATK, this.debuffAtk, this);
        this.loadMonster();
        this.updateUI();
    };
    __egretProto__.onEliminate = function (evt) {
        switch (evt.data.color) {
            case 1 /* Red */:
                this.warriorAtk(evt.data.cnt, evt.data.large);
                break;
            case 2 /* Blue */:
                this.magerAtk(evt.data.cnt, evt.data.large);
                break;
            case 3 /* Green */:
                this.priestAtk(evt.data.cnt, evt.data.large);
                break;
            case 4 /* Yellow */:
                this.defenderAtk(evt.data.cnt, evt.data.large);
                break;
        }
    };
    __egretProto__.onClickEnd = function () {
        var _this = this;
        async.parallel([
            function (cb) {
                _this.warrior.start(cb);
            },
            function (cb) {
                _this.priest.start(cb);
            },
            function (cb) {
                _this.mage.start(cb);
            },
            function (cb) {
                _this.defender.start(cb);
            }
        ], function () {
            //this.m_context.dispatchEvent( new BoardEvent(BoardEvent.REDRAWMAINUI, {}));
        });
    };
    __egretProto__.reDrawMainUI = function () {
        this.m_context.board.reDrawMainUI();
    };
    __egretProto__.onPenalty = function (evt) {
        //this.m_enemy.addProgress( 500 );
        console.log(" wrong or empty add cost minutes");
    };
    __egretProto__.warriorAtk = function (power, large) {
        var _this = this;
        this.warrior.appendMove(large ? "Skill2" : "Skill1", this.monster[this.monster_num - 1], true, function (cur, total) {
            if (_this.monster_num - 1 < 0) {
                return;
            }
            var monster_blood = _this.monster[_this.monster_num - 1].getHpCur();
            var hurt = _this.warrior.atk * (1 + Game.config.tables['formula'][4].param1 * Math.pow((power - 3), Game.config.tables['formula'][4].param2));
            _this.monster[_this.monster_num - 1].setHpCur(monster_blood - hurt);
            _this.updateStageLevel();
        });
        this.warrior.xuliEffect();
    };
    __egretProto__.magerAtk = function (power, large) {
        var _this = this;
        this.mage.appendMove(large ? "Skill2" : "Skill1", this.monster[this.monster_num - 1], true, function (cur, total) {
            if (_this.monster_num - 1 < 0) {
                return;
            }
            var monster_blood = _this.monster[_this.monster_num - 1].getHpCur();
            var hurt = _this.mage.atk * (1 + Game.config.tables['formula'][5].param1 * Math.pow((power - 3), Game.config.tables['formula'][5].param2));
            _this.monster[_this.monster_num - 1].setHpCur(monster_blood - hurt);
            _this.updateStageLevel();
        });
        this.mage.xuliEffect();
    };
    __egretProto__.priestAtk = function (power, large) {
        var _this = this;
        this.priest.appendMove(large ? "Skill2" : "Skill1", this.warrior, false, function (cur, total) {
            if (_this.monster_num - 1 < 0) {
                return;
            }
            var monster_blood = _this.monster[_this.monster_num - 1].getHpCur();
            var hurt = _this.priest.atk * (1 + Game.config.tables['formula'][6].param1 * Math.pow((power - 3), Game.config.tables['formula'][6].param2));
            _this.monster[_this.monster_num - 1].setHpCur(monster_blood - hurt);
            _this.updateStageLevel();
        });
        this.priest.xuliEffect();
    };
    __egretProto__.defenderAtk = function (power, large) {
        var _this = this;
        this.defender.appendMove(large ? "Skill2" : "Skill1", this.monster[this.monster_num - 1], false, function (cur, total) {
            _this.m_my.hpCur += power * _this.m_my.atk / total;
        });
        this.defender.xuliEffect();
    };
    __egretProto__.monsterAtk = function () {
        var _this = this;
        for (var i = 0; i < this.monster_num; i++) {
            if (this.monster[i].m_ClickNumber > 0)
                continue;
            var cur_index = i;
            this.monster[i].appendMove("Skill1", this.warrior, true, function (cur, total) {
                if (_this.m_my.dpCur > 0) {
                    _this.m_my.dpCur -= _this.monster[cur_index].m_atk * 0.5 / total;
                    _this.m_my.hpCur -= _this.monster[cur_index].m_atk * 0.3 / total;
                }
                else {
                    _this.m_my.hpCur -= _this.monster[cur_index].m_atk / total;
                }
                _this.m_context.board.showMonsterSkill(Game.config.tables['monster_mode'][_this.monster_list[_this.stageIndex - 1][cur_index].id].skill);
            });
            this.monster[i].start(null);
        }
    };
    __egretProto__.debuffAtk = function (evt) {
        for (var i = 0; i < this.monster_num; i++) {
            this.m_my.hpCur -= (this.monster[i].m_atk * Game.config.tables['formula'][20].param1 * evt.data.doison + this.monster[i].m_atk * Game.config.tables['formula'][21].param1 * evt.data.fire);
        }
        this.updateStageLevel();
    };
    __egretProto__.updateUI = function () {
        this.m_heroHpBar.text = "HP:" + this.m_my.hpCur;
        this.m_heroHpBar.percent = this.m_my.hpCur / this.m_my.hpMax;
        this.m_heroDpBar.text = "DP:" + this.m_my.dpMax;
        this.m_heroDpBar.percent = this.m_my.dpCur / this.m_my.dpMax;
        this.updateStageLevel();
    };
    __egretProto__.updateStageLevel = function () {
        var monsterIndex = this.monster_num - 1;
        if (this.monster[monsterIndex].getHpCur() > 0) {
            return;
        }
        if (this.monster[monsterIndex] && this.monster[monsterIndex].view.parent) {
            this.monster[monsterIndex].view.parent.removeChild(this.monster[monsterIndex].view);
            this.monster_num--;
        }
        if (this.m_my.hpCur <= 0) {
            var result = new BattleResult({ stageName: "You Lose !!!! " });
            egret.gui.PopUpManager.addPopUp(result, true, true);
        }
        else if (this.monster_num <= 0) {
            if (this.monster_num <= 0 && this.stageIndex >= this.monster_list.length) {
                var result = new BattleResult({ stageName: "You Win !" });
                egret.gui.PopUpManager.addPopUp(result, true, true);
            }
            else if (this.monster_num <= 0 && this.stageIndex < this.monster_list.length) {
                this.loadMonster();
            }
        }
    };
    __egretProto__.loadMonster = function () {
        var _this = this;
        for (var i = 0; i < this.monster_num; i++) {
            if (this.monster[i] && this.monster[i].view.parent) {
                this.monster[i].view.parent.removeChild(this.monster[i].view);
            }
        }
        var result = -1;
        for (var i = 1; i <= 12; i++) {
            if (this.m_context.stageName == Game.config.tables['stage'][i].name) {
                result = i;
                break;
            }
        }
        var id = Game.config.tables['stage'][result].monsterId;
        this.monster_list = Game.config.tables['monster'][id].lstWave;
        this.monster_lv = Game.config.tables['monster'][id].level;
        this.monster_num = this.monster_list[this.stageIndex].length;
        this.monster = [];
        for (var i = 0; i < this.monster_num; i++) {
            var monster = new MonsterAvatar(Game.config.tables['monster_mode'][this.monster_list[this.stageIndex][i].id].modelId, this.monster_lv, Game.config.tables['monster_mode'][this.monster_list[this.stageIndex][i].id].job, this.monster_list[this.stageIndex][i].type, Game.config.tables['monster_mode'][this.monster_list[this.stageIndex][i].id].round, function () {
                _this.monsterAtk();
            }, Game.config.tables['monster_mode'][this.monster_list[this.stageIndex][i].id]);
            monster.setAction("Action_Stand", true);
            monster.view.x = 350;
            monster.view.y = 200 - (i * 70);
            this.monster.push(monster);
            this.view.addChild(monster.view);
        }
        this.stageIndex++;
        // this.m_enemy.reload();
        // this.updateUI();
    };
    __egretProto__.onClickNumber = function (evt) {
        for (var i = 0; i < this.monster_num; i++) {
            this.monster[i].subClickNumber();
        }
    };
    return Field;
})(egret.EventDispatcher);
Field.prototype.__class__ = "Field";
//# sourceMappingURL=Field.js.map