/**
 * Created by yinqing on 15-2-27.
 */
var FrameInfo = (function () {
    function FrameInfo() {
    }
    var __egretProto__ = FrameInfo.prototype;
    return FrameInfo;
})();
FrameInfo.prototype.__class__ = "FrameInfo";
var SymbolInfo = (function () {
    function SymbolInfo() {
        this.offset = new egret.Point();
    }
    var __egretProto__ = SymbolInfo.prototype;
    return SymbolInfo;
})();
SymbolInfo.prototype.__class__ = "SymbolInfo";
var PartInfo = (function () {
    function PartInfo() {
        this.frames = [];
    }
    var __egretProto__ = PartInfo.prototype;
    return PartInfo;
})();
PartInfo.prototype.__class__ = "PartInfo";
var ActionInfo = (function () {
    function ActionInfo() {
        this.parts = [];
    }
    var __egretProto__ = ActionInfo.prototype;
    return ActionInfo;
})();
ActionInfo.prototype.__class__ = "ActionInfo";
var GroupInfo = (function () {
    function GroupInfo() {
        this.partIds = [];
    }
    var __egretProto__ = GroupInfo.prototype;
    return GroupInfo;
})();
GroupInfo.prototype.__class__ = "GroupInfo";
var FlccSkeletonConfig = (function () {
    function FlccSkeletonConfig() {
        this.symbols = [];
        this.actions = [];
        this.groups = {}; // <groupId, GroupInfo>
    }
    var __egretProto__ = FlccSkeletonConfig.prototype;
    return FlccSkeletonConfig;
})();
FlccSkeletonConfig.prototype.__class__ = "FlccSkeletonConfig";
var FlccSpriteNode = (function (_super) {
    __extends(FlccSpriteNode, _super);
    function FlccSpriteNode() {
        _super.apply(this, arguments);
    }
    var __egretProto__ = FlccSpriteNode.prototype;
    __egretProto__.setMatrix = function (a, b, c, d, tx, ty) {
        this.m_a = a;
        this.m_b = b;
        this.m_c = c;
        this.m_d = d;
        this.m_tx = tx;
        this.m_ty = ty;
    };
    __egretProto__.setFrame = function (name) {
        this.texture = RES.getRes(name);
    };
    __egretProto__._getMatrix = function (parentMatrix) {
        if (!parentMatrix) {
            parentMatrix = egret.Matrix.identity.identity();
        }
        parentMatrix.append(this.m_a, this.m_b, this.m_c, this.m_d, this.m_tx, this.m_ty);
        var p = this._getOffsetPoint();
        parentMatrix.append(1, 0, 0, 1, -p.x, -p.y);
        return parentMatrix;
    };
    return FlccSpriteNode;
})(egret.Bitmap);
FlccSpriteNode.prototype.__class__ = "FlccSpriteNode";
var FlccMovieClip = (function (_super) {
    __extends(FlccMovieClip, _super);
    function FlccMovieClip(modelId, skinId, cb, target) {
        var _this = this;
        _super.call(this);
        this.m_fps = 24;
        this.m_partSpriteMap = {}; // < partId, Node >
        // test
        //private m_cache		:any = {};
        this.RES_DIR = "assets/model";
        this.m_modelId = modelId;
        this.m_skinId = skinId;
        this.m_content = new egret.DisplayObjectContainer();
        this.m_frameTT = 1000 / this.m_fps;
        this.m_frameCT = 0;
        this.addChild(this.m_content);
        new AssetGroup("flcc_" + this.m_modelId).appendRes("flcc_" + this.m_modelId, "bin", this.RES_DIR + "/" + this.m_modelId + "/" + this.m_modelId + ".flcc").load(function () {
            _this.m_config = _this.loadConfig(new egret.ByteArray(RES.getRes("flcc_" + _this.m_modelId)));
            _this.m_content.scaleX /= _this.m_config.lessScale;
            _this.m_content.scaleY /= _this.m_config.lessScale;
            var ag = new AssetGroup("flcc_" + _this.m_modelId + "_" + _this.m_skinId);
            for (var gid in _this.m_config.groups) {
                ag.appendRes("flcc_" + _this.m_modelId + "_" + _this.m_skinId + "_" + gid, "sheet", _this.RES_DIR + "/" + _this.m_modelId + "/" + _this.m_skinId + "_" + gid + "-hd.json");
            }
            ag.load(function () {
                //var len = this.m_config.actions.length;
                //for ( var i = 0; i < len; i++ )
                //{
                //	var action = this.m_config.actions[i];
                //	var frameCache = [];
                //
                //	this.setAction( action.name );
                //	this.stop();
                //	for ( var j = 0; j < action.totalFrame; j++ )
                //	{
                //		this.m_curFrame = j;
                //		this.updateMovieClip();
                //
                //		var tex:egret.RenderTexture = new egret.RenderTexture();
                //		tex.drawToTexture( this.m_content );
                //		//console.log( this.m_modelId, action.name, j, tex.textureWidth, tex.textureHeight );
                //		frameCache.push( tex );
                //	}
                //
                //	this.m_cache[ action.name ] = frameCache;
                //}
                //this.m_curAction = null;
                cb.call(target, _this);
            });
        });
    }
    var __egretProto__ = FlccMovieClip.prototype;
    __egretProto__.setAction = function (name, loop, restart) {
        if (loop === void 0) { loop = false; }
        if (restart === void 0) { restart = true; }
        if (name == "")
            return;
        if (this.m_curAction && this.m_curAction.name == name) {
            return this.play(loop, restart);
        }
        var len = this.m_config.actions.length;
        for (var i = 0; i < len; i++) {
            if (this.m_config.actions[i].name == name) {
                this.m_curAction = this.m_config.actions[i];
                this.m_curFrame = 0;
                this.m_loop = loop;
                //if ( this.m_cache[ name ] )
                //{
                //	this.m_content.removeChildren();
                //	this.m_partSpriteMap = {};
                //	this.m_content.addChild( new egret.Bitmap() );
                //}
                //else
                //{
                var zOrder = 0;
                var partLen = this.m_curAction.parts.length;
                for (var j = 0; j < partLen; j++) {
                    var pi = this.m_curAction.parts[j];
                    if (this.m_partSpriteMap[pi.partId] === undefined) {
                        var node = this.createSpritePart(pi.partId, this.m_skinId);
                        if (node) {
                            this.addPart(pi.partId, node, zOrder++);
                        }
                    }
                }
                for (var k in this.m_partSpriteMap) {
                    var remove = true;
                    for (var j = 0; j < partLen; j++) {
                        if (this.m_curAction.parts[j].partId == k) {
                            remove = false;
                            break;
                        }
                    }
                    if (remove) {
                        this.removePart(k);
                    }
                }
                this.updateMovieClip();
                //}
                return this.play(loop, restart);
            }
        }
    };
    __egretProto__.play = function (loop, restart) {
        if (loop === void 0) { loop = false; }
        if (restart === void 0) { restart = false; }
        if (restart)
            this.m_curFrame = 0;
        this.m_loop = loop;
        egret.Ticker.getInstance().register(this.tick, this);
    };
    __egretProto__.stop = function () {
        egret.Ticker.getInstance().unregister(this.tick, this);
    };
    Object.defineProperty(__egretProto__, "frameTime", {
        get: function () {
            return this.m_frameTT;
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.createSpritePart = function (partId, skinId, frameId) {
        var si = this.findSymbolConfig(partId, skinId, frameId);
        if (si) {
            var ret = new FlccSpriteNode();
            ret.setFrame(this.getFrameName(skinId, partId, si.frameId));
            ret.anchorOffsetX = si.offset.x / this.m_config.lessScale;
            ret.anchorOffsetY = si.offset.y / this.m_config.lessScale;
            ret.name = partId.toString();
            ret.skinTag = skinId;
            ret.frameTag = si.frameId;
            return ret;
        }
        console.error("FlccSpriteNode Create Failed, skinId=" + skinId + ", partId=" + partId + ", frameId=" + frameId);
        return this.createSpritePart(partId, skinId);
    };
    __egretProto__.getFrameName = function (skinId, partId, frameId) {
        return this.m_modelId + "_" + skinId + "_" + partId + "_" + frameId;
    };
    __egretProto__.addPart = function (partId, sprite, zOrder) {
        sprite.name = partId.toString();
        this.m_partSpriteMap[partId] = sprite;
        this.m_content.addChildAt(sprite, zOrder);
    };
    __egretProto__.removePart = function (partId) {
        var node = this.m_partSpriteMap[partId];
        if (node === undefined)
            return;
        this.m_content.removeChild(node);
        delete this.m_partSpriteMap[partId];
    };
    __egretProto__.updateMovieClip = function () {
        if (!this.m_curAction)
            return;
        var oriCurFrame = this.m_curFrame;
        if (this.m_curFrame >= this.m_curAction.totalFrame) {
            if (this.m_curAction.totalFrame > 0)
                this.m_curFrame = this.m_curAction.totalFrame - 1;
            else
                return;
        }
        //if ( this.m_cache[ this.m_curAction.name ] )
        //{
        //	( <egret.Bitmap>this.m_content.getChildAt( 0 ) ).texture = this.m_cache[ this.m_curAction.name ][ this.m_curFrame ];
        //	return;
        //}
        var len = this.m_curAction.parts.length;
        for (var i = 0; i < len; i++) {
            var pi = this.m_curAction.parts[i];
            var node = this.m_content.getChildByName(pi.partId.toString());
            if (!node)
                continue;
            var fi = pi.frames[this.m_curFrame];
            if (node.frameTag != fi.frameId) {
                node.setFrame(this.getFrameName(node.skinTag, pi.partId, fi.frameId));
                node.frameTag = fi.frameId;
                // reset anchor
                var si = this.findSymbolConfig(pi.partId, node.skinTag, fi.frameId);
                if (si) {
                    node.anchorOffsetX = si.offset.x * this.m_config.lessScale;
                    node.anchorOffsetY = si.offset.y * this.m_config.lessScale;
                }
            }
            node.setMatrix(fi.a, fi.b, fi.c, fi.d, fi.tx * this.m_config.lessScale, fi.ty * this.m_config.lessScale);
            node.alpha = fi.alpha;
        }
        this.m_curFrame = oriCurFrame;
    };
    __egretProto__.tick = function (time) {
        if (!this.m_curAction)
            return;
        this.m_frameCT += time;
        if (this.m_frameCT < this.m_frameTT)
            return;
        var passFrame = Math.floor(this.m_frameCT / this.m_frameTT);
        this.m_frameCT -= this.m_frameTT * passFrame;
        this.m_curFrame += passFrame;
        var stop = false;
        if (this.m_loop) {
            this.m_curFrame %= this.m_curAction.totalFrame;
        }
        else if (this.m_curFrame >= this.m_curAction.totalFrame) {
            stop = true;
            if (this.m_curAction.totalFrame > 0)
                this.m_curFrame = this.m_curAction.totalFrame - 1;
            else
                return;
        }
        this.updateMovieClip();
        if (stop) {
            this.stop();
            this.dispatchEventWith(egret.Event.COMPLETE);
        }
    };
    __egretProto__.findSymbolConfig = function (partId, skinId, frameId) {
        var len = this.m_config.symbols.length;
        var candidate = null;
        for (var i = 0; i < len; i++) {
            var s = this.m_config.symbols[i];
            if (s.partId == partId && s.skinId == skinId) {
                if (candidate == null)
                    candidate = s;
                if (frameId != undefined && s.frameId == frameId)
                    return s;
            }
        }
        return candidate;
    };
    __egretProto__.loadConfig = function (data) {
        data.endian = egret.Endian.LITTLE_ENDIAN;
        function readSymbol() {
            var ret = new SymbolInfo();
            ret.skinId = data.readUnsignedByte();
            ret.partId = data.readUnsignedByte();
            ret.frameId = data.readUnsignedByte();
            ret.offset.x = data.readInt();
            ret.offset.y = data.readInt();
            return ret;
        }
        function readGroup() {
            var ret = new GroupInfo();
            ret.groupId = data.readUnsignedByte();
            var partCount = data.readUnsignedByte();
            for (var i = 0; i < partCount; i++) {
                ret.partIds.push(data.readUnsignedByte());
            }
            return ret;
        }
        function readFrame() {
            var ret = new FrameInfo();
            ret.a = data.readInt() / 1000;
            ret.b = data.readInt() / 1000;
            ret.c = data.readInt() / 1000;
            ret.d = data.readInt() / 1000;
            ret.tx = data.readInt() / 1000;
            ret.ty = data.readInt() / 1000;
            ret.alpha = data.readInt() / 1000;
            ret.frameId = data.readUnsignedByte();
            return ret;
        }
        function readPart(nFrame) {
            var ret = new PartInfo();
            ret.partId = data.readUnsignedByte();
            for (var i = 0; i < nFrame; i++) {
                ret.frames.push(readFrame());
            }
            return ret;
        }
        function readAction() {
            var ret = new ActionInfo();
            var l = 0, p = data.position;
            while (data.readUnsignedByte())
                l++;
            data.position = p;
            ret.name = data.readUTFBytes(l);
            data.readUnsignedByte();
            ret.totalFrame = data.readUnsignedShort();
            var partCount = data.readUnsignedByte();
            for (var i = 0; i < partCount; i++) {
                ret.parts.push(readPart(ret.totalFrame));
            }
            return ret;
        }
        var out = new FlccSkeletonConfig();
        var symbolCount = data.readUnsignedShort();
        for (var i = 0; i < symbolCount; i++) {
            out.symbols.push(readSymbol());
        }
        var groupCount = data.readUnsignedByte();
        for (var i = 0; i < groupCount; i++) {
            var gi = readGroup();
            out.groups[gi.groupId] = gi;
        }
        var actionCount = data.readUnsignedByte();
        for (var i = 0; i < actionCount; i++) {
            out.actions.push(readAction());
        }
        out.lessScale = data.readInt() / 1000;
        return out;
    };
    return FlccMovieClip;
})(egret.DisplayObjectContainer);
FlccMovieClip.prototype.__class__ = "FlccMovieClip";
//# sourceMappingURL=FlccMovieClip.js.map