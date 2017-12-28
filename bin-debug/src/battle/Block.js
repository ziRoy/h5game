/**
 * Created by yinqing on 15-4-21.
 */
var BlockColor;
(function (BlockColor) {
    BlockColor[BlockColor["None"] = 0] = "None";
    BlockColor[BlockColor["Red"] = 1] = "Red";
    BlockColor[BlockColor["Blue"] = 2] = "Blue";
    BlockColor[BlockColor["Green"] = 3] = "Green";
    BlockColor[BlockColor["Yellow"] = 4] = "Yellow";
    BlockColor[BlockColor["Total"] = 5] = "Total";
})(BlockColor || (BlockColor = {}));
var BlockType;
(function (BlockType) {
    BlockType[BlockType["Normal"] = 0] = "Normal";
    BlockType[BlockType["Special"] = 1] = "Special";
    BlockType[BlockType["Gift"] = 2] = "Gift";
    BlockType[BlockType["Total"] = 3] = "Total";
})(BlockType || (BlockType = {}));
var DeBuffType;
(function (DeBuffType) {
    DeBuffType[DeBuffType["None"] = 0] = "None";
    DeBuffType[DeBuffType["Firebuff"] = 1] = "Firebuff";
    DeBuffType[DeBuffType["Doisonbuff"] = 2] = "Doisonbuff";
    DeBuffType[DeBuffType["Total"] = 3] = "Total";
})(DeBuffType || (DeBuffType = {}));
var Block = (function () {
    function Block(context, type, color) {
        this.m_context = context;
        this.id = ++Block.ID_INC;
        this.type = type;
        this.color = color;
        this.m_locked = false;
        this.m_debuff = 0 /* None */;
        //var ran:number = Math.floor(Math.random() * 10 );
        //if( ran >= 9 )
        //{
        //	this.m_locked = true;
        //}
        //else
        //{
        //	this.m_locked = false;
        //}
    }
    var __egretProto__ = Block.prototype;
    __egretProto__.init = function (args) {
    };
    __egretProto__.dispose = function () {
        var bs = this.m_context.board.blocks;
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                if (bs[this.x + i][this.y + j] == this) {
                    bs[this.x + i][this.y + j] = null;
                }
            }
        }
        if (this.m_view && this.m_view.parent) {
            this.m_view.parent.removeChild(this.m_view);
        }
    };
    __egretProto__.onTap = function (cb) {
        cb.call(null);
    };
    __egretProto__.onDropDownComp = function (cb) {
        cb.call(null);
    };
    __egretProto__.onElim = function (cb) {
        cb.call(null);
    };
    __egretProto__.visit = function (fr) {
        return false;
    };
    __egretProto__.setPosition = function (x, y, t) {
        var bs = this.m_context.board.blockSize;
        this.x = x;
        this.y = y;
        var px = 4 + x * bs + bs / 2;
        var py = 4 + y * bs + bs;
        if (t != undefined && t != 0) {
            egret.Tween.get(this.m_view).to({ x: px, y: py }, t).to({ scaleY: 0.85 }, 100).to({ scaleY: 1.0 }, 100);
        }
        else {
            this.m_view.x = px;
            this.m_view.y = py;
        }
    };
    __egretProto__.onLight = function () {
    };
    __egretProto__.onGray = function () {
    };
    __egretProto__.setLine = function (pos) {
    };
    __egretProto__.setHLine = function () {
    };
    __egretProto__.setVLine = function () {
    };
    __egretProto__.rmLine = function () {
    };
    __egretProto__.rmHLine = function () {
    };
    __egretProto__.rmVLine = function () {
    };
    __egretProto__.removeLock = function () {
    };
    __egretProto__.setlock = function () {
    };
    __egretProto__.setDebuff = function (debufftype) {
    };
    __egretProto__.rmDebuff = function () {
    };
    Block.ID_INC = 0;
    return Block;
})();
Block.prototype.__class__ = "Block";
var BlockFactory = (function () {
    function BlockFactory() {
    }
    var __egretProto__ = BlockFactory.prototype;
    BlockFactory.create = function (bt, arg) {
        var ret;
        switch (bt) {
            case 0 /* Normal */:
                ret = new BasicBlock(BlockFactory.context, 0 /* Normal */);
                break;
            case 1 /* Special */:
                ret = new BasicBlock(BlockFactory.context, 1 /* Special */, arg[0]);
                break;
            default:
                console.error("invalid block type, type=%d", bt);
        }
        ret.init(arg);
        //console.log( 'create, type=%d', bt );
        return ret;
    };
    BlockFactory.recycle = function (b) {
        if (b.m_locked && b.m_locked == true) {
            b.removeLock();
            return;
        }
        b.dispose();
    };
    return BlockFactory;
})();
BlockFactory.prototype.__class__ = "BlockFactory";
var BasicBlock = (function (_super) {
    __extends(BasicBlock, _super);
    function BasicBlock() {
        _super.apply(this, arguments);
    }
    var __egretProto__ = BasicBlock.prototype;
    __egretProto__.init = function (args) {
        this.width = 1;
        this.height = 1;
        this.color = (args["color"] || Math.floor(Math.random() * (5 /* Total */ - 1)) + 1);
        this.m_light = 0;
        this.m_view = new egret.DisplayObjectContainer();
        this.loadTexture();
        this.m_context.board.view.addChild(this.m_view);
        this.flag = false;
        this.hflag = false;
        this.vflag = false;
    };
    __egretProto__.loadTexture = function () {
        this.m_view.removeChildren();
        var map = new egret.Bitmap();
        map.texture = RES.getRes("block_" + this.color + "_" + this.type + "_" + this.m_light);
        this.m_view.addChild(map);
        if (this.m_locked == true) {
            this.setlock();
        }
        if (this.m_debuff == 2 /* Doisonbuff */) {
            new Effect(102).playBlock(this, true);
        }
        else if (this.m_debuff == 1 /* Firebuff */) {
            new Effect(101).playBlock(this, true);
        }
        this.m_view.anchorOffsetX = this.m_view.width / 2;
        this.m_view.anchorOffsetY = (this.m_context.board.blockSize + this.m_view.height) / 2;
    };
    __egretProto__.removeLock = function () {
        this.m_view.removeChildAt(1);
        this.m_locked = false;
    };
    __egretProto__.setlock = function () {
        if (this.m_locked == true) {
            var map2 = new egret.Bitmap();
            map2.texture = RES.getRes("chain");
            this.m_view.addChild(map2);
        }
    };
    __egretProto__.onTap = function (cb) {
        var _this = this;
        var f = this.m_context.board.createFlood().start(this);
        var neighbor = f.getRes();
        var pt = f.getPt();
        if (pt >= 3) {
            var task = [];
            var wait = function (idx) {
                task.push(function (cb) {
                    neighbor[idx].onElim(cb);
                });
            };
            for (var i = 0; i < neighbor.length; i++)
                wait(i);
            async.parallel(task, function () {
                _this.m_context.dispatchEvent(new BoardEvent(BoardEvent.ELIMINATE, { cnt: pt, color: _this.color, large: true }));
                cb.call(null);
            });
        }
        else {
            cb.call(null);
        }
    };
    __egretProto__.onDropDownComp = function (cb) {
        var x = this.x, y = this.y, bs = this.m_context.board.blocks;
        if (x + 1 < this.m_context.board.w && y + 1 < this.m_context.board.h && bs[x + 1][y] && bs[x + 1][y].type == this.type && bs[x + 1][y].color == this.color && bs[x][y + 1] && bs[x][y + 1].type == this.type && bs[x][y + 1].color == this.color && bs[x + 1][y + 1] && bs[x + 1][y + 1].type == this.type && bs[x + 1][y + 1].color == this.color) {
        }
        else {
            if (this.m_light == 1) {
                this.m_light = 0;
                this.loadTexture();
            }
        }
        cb.call(null);
    };
    __egretProto__.onElim = function (cb) {
        var _this = this;
        var anim = [];
        anim.push(function (cb) {
            egret.Tween.get(_this.m_view).to({ scaleX: 1.2, scaleY: 1.2, alpha: 0.4 }, 100).to({ scaleX: 0.5, scaleY: 0.5 }, 200).call(cb);
        });
        var target = null;
        switch (this.color) {
            case 1 /* Red */:
                target = this.m_context.field.warrior;
                break;
            case 2 /* Blue */:
                target = this.m_context.field.mage;
                break;
            case 3 /* Green */:
                target = this.m_context.field.priest;
                break;
            case 4 /* Yellow */:
                target = this.m_context.field.defender;
                break;
        }
        if (target) {
            var p = target.view.localToGlobal(0, 0);
            this.m_view.parent.globalToLocal(p.x, p.y, p);
            anim.push(function (cb) {
                egret.Tween.get(_this.m_view).to({ x: p.x, y: p.y }, 300, egret.Ease.circOut).call(cb);
            });
        }
        if (this.m_locked == true) {
            anim = [];
        }
        async.parallel(anim, function (err) {
            BlockFactory.recycle(_this);
            cb.call(null);
        });
    };
    __egretProto__.visit = function (fr) {
        return fr.color == this.color;
    };
    __egretProto__.onLight = function () {
        if (this.m_light == 0) {
            this.m_light = 1;
            this.loadTexture();
        }
    };
    __egretProto__.onGray = function () {
        if (this.m_light == 1) {
            this.m_light = 0;
            this.loadTexture();
        }
    };
    __egretProto__.setLine = function (pos) {
        var color = this.getRGB();
        this.m_line = new egret.Shape();
        this.m_line.graphics.lineStyle(4, color);
        var size = this.m_context.board.blockSize;
        this.m_line.graphics.moveTo((pos.x + 0.5) * size, (pos.y + 0.5) * size);
        this.m_line.graphics.lineTo((this.x + 0.5) * size, (this.y + 0.5) * size);
        this.m_line.graphics.endFill();
        this.m_context.board.view.addChild(this.m_line);
    };
    __egretProto__.setHLine = function () {
        if (this.hflag == true) {
            var color = this.getRGB();
            this.m_hLine = new egret.Shape();
            this.m_hLine.graphics.lineStyle(4, color);
            var size = this.m_context.board.blockSize;
            this.m_hLine.graphics.moveTo((this.x + 1.5) * size, (this.y + 0.5) * size);
            this.m_hLine.graphics.lineTo((this.x + 0.5) * size, (this.y + 0.5) * size);
            this.m_hLine.graphics.endFill();
            this.m_context.board.view.addChild(this.m_hLine);
        }
    };
    __egretProto__.setVLine = function () {
        if (this.vflag == true) {
            var color = this.getRGB();
            this.m_vLine = new egret.Shape();
            this.m_vLine.graphics.lineStyle(4, color);
            var size = this.m_context.board.blockSize;
            this.m_vLine.graphics.moveTo((this.x + 0.5) * size, (this.y + 1.5) * size);
            this.m_vLine.graphics.lineTo((this.x + 0.5) * size, (this.y + 0.5) * size);
            this.m_vLine.graphics.endFill();
            this.m_context.board.view.addChild(this.m_vLine);
        }
    };
    __egretProto__.getRGB = function () {
        var color = 0xfffff;
        if (this.color == 2 /* Blue */) {
            color = 0x0000ff;
        }
        else if (this.color == 1 /* Red */) {
            color = 0xff0000;
        }
        else if (this.color == 3 /* Green */) {
            color = 0x00ff00;
        }
        else if (this.color == 4 /* Yellow */) {
            color = 0xeedc82;
        }
        return color;
    };
    __egretProto__.rmLine = function () {
        if (this.m_line && this.m_line.parent) {
            this.m_line.graphics.clear();
            this.m_context.board.view.removeChild(this.m_line);
        }
    };
    __egretProto__.rmHLine = function () {
        if (this.m_hLine && this.m_hLine.parent && this.hflag == true) {
            this.m_hLine.graphics.clear();
            this.m_context.board.view.removeChild(this.m_hLine);
            this.hflag = false;
        }
    };
    __egretProto__.rmVLine = function () {
        if (this.m_vLine && this.m_vLine.parent && this.vflag == true) {
            this.m_vLine.graphics.clear();
            this.m_context.board.view.removeChild(this.m_vLine);
            this.vflag = false;
        }
    };
    __egretProto__.setDebuff = function (bufftype) {
        if (bufftype == 2 /* Doisonbuff */) {
            new Effect(102).playBlock(this, true);
        }
        else if (bufftype == 1 /* Firebuff */) {
            new Effect(101).playBlock(this, true);
        }
    };
    return BasicBlock;
})(Block);
BasicBlock.prototype.__class__ = "BasicBlock";
//class BigBlock extends BasicBlock
//{
//	public init( args:Object ):void
//	{
//		this.width 	= 2;
//		this.height = 2;
//		this.type	= BlockType.Special;
//		this.color = ( args["color"] || Math.floor( Math.random() * ( BlockColor.Total - 1 ) ) + 1 );
//
//		this.m_view		= new egret.Bitmap();
//		this.loadTexture();
//		this.m_context.board.view.addChild( this.m_view );
//	}
//
//	protected loadTexture():void
//	{
//		(<egret.Bitmap>this.m_view).texture = RES.getRes( "block_" + this.color + "_" + 2 );
//		this.m_view.anchorOffsetX = ( this.m_view.width - this.m_context.board.blockSize ) / 2;
//		this.m_view.anchorOffsetY = this.m_view.height / 2;
//	}
//
//	public onDropDownComp( cb:Function ):void
//	{
//		cb.call( null );
//	}
//}
//# sourceMappingURL=Block.js.map