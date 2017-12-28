/**
 * Created by yinqing on 15-2-28.
 */
var Posi = (function () {
    function Posi() {
    }
    var __egretProto__ = Posi.prototype;
    return Posi;
})();
Posi.prototype.__class__ = "Posi";
var Board = (function () {
    function Board(context) {
        this.w = 6;
        this.h = 4;
        this.blockSize = 66;
        this.m_initTime = 0;
        //private m_eliminateSE;
        this.m_dropTime = 40;
        this.m_leftWait = 5;
        this.m_reDraw = true;
        this.m_context = context;
        this.m_blockCache = [];
        BlockFactory.context = context;
        this.m_touchlist = [];
        //this.m_eliminateSE = SoundUtil.getSound("battle_bubble_collect.mp3")
        this.blockUpgrade = Game.config.tables['formula'][3].param1;
    }
    var __egretProto__ = Board.prototype;
    __egretProto__.load = function (cb, target) {
        var _this = this;
        new AssetGroup("board").appendRes("board_bg", RES.ResourceItem.TYPE_IMAGE, "assets/battle/board/bg.png").appendRes("block", RES.ResourceItem.TYPE_SHEET, "assets/battle/board/block.json").load(function () {
            _this.build();
            cb.call(target);
        });
    };
    __egretProto__.build = function () {
        this.view = new egret.DisplayObjectContainer();
        var bg = new egret.Bitmap();
        bg.texture = RES.getRes("board_bg"); // 500 * 400
        bg.x = (400 - 540) / 2;
        bg.y = (345 - 394); // ( 345 - 320 + 1 );
        this.view.addChild(bg);
        //var mask:egret.Bitmap = new egret.Bitmap();
        //mask.texture = RES.getRes( "board_mask" );	// 392 * 345
        //mask.x = 4;
        //mask.y = 4;
        //this.view.addChild( mask );
        this.blocks = [];
        for (var i = 0; i < this.w; i++) {
            var row = [];
            for (var j = 0; j < this.h; j++) {
                row.push(null);
            }
            this.blocks.push(row);
        }
        this.shuffle();
        this.view.touchEnabled = true;
        this.view.touchChildren = false;
        //this.view.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onBoardTap, this );
        this.view.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.view.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.view.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
    };
    __egretProto__.onBegin = function (evt) {
        this.onEnd();
        this.m_curPos = -1;
        this.m_prePos = -1;
    };
    __egretProto__.onMove = function (evt) {
        var bs = this.blocks;
        var x = Math.floor(evt.localX / this.blockSize);
        var y = Math.floor(evt.localY / this.blockSize);
        if (x >= this.w || y >= this.h || x < 0 || y < 0)
            return;
        var pos_x = evt.localX - x * this.blockSize;
        var pos_y = evt.localY - y * this.blockSize;
        // 触摸到中间一圈才可以算是点击到了
        if (pos_x < 10 || pos_x > 57 || pos_y < 10 || pos_y > 57) {
            return;
        }
        if (bs[x][y]) {
            var pos = -1;
            var len = this.m_touchlist.length;
            for (var i = 0; i < len; i++) {
                if (this.m_touchlist[i].x == x && this.m_touchlist[i].y == y) {
                    pos = i;
                    break;
                }
            }
            if (pos != -1) {
                this.m_prePos = this.m_curPos;
                this.m_curPos = pos;
                if (len > 1) {
                    if (this.m_curPos == len - 2 && this.m_prePos == len - 1) {
                        var x = this.m_touchlist[len - 1].x;
                        var y = this.m_touchlist[len - 1].y;
                        bs[x][y].onGray();
                        bs[x][y].rmLine();
                        this.m_touchlist.pop();
                    }
                }
                return;
            }
            if (len == 0) {
                this.m_touchlist.push({ x: x, y: y });
                bs[x][y].onLight();
            }
            else {
                var preX = this.m_touchlist[len - 1].x;
                var preY = this.m_touchlist[len - 1].y;
                if (Math.abs(x - preX) < 2 && Math.abs(y - preY) < 2 && bs[x][y].color == bs[preX][preY].color) {
                    this.m_touchlist.push({ x: x, y: y });
                    bs[x][y].onLight();
                    bs[x][y].setLine({ x: preX, y: preY });
                }
            }
        }
    };
    __egretProto__.onEnd = function (evt) {
        var _this = this;
        var bs = this.blocks;
        if (this.m_touchlist.length < 3) {
            for (var i = 0; i < this.m_touchlist.length; i++) {
                var x = this.m_touchlist[i].x;
                var y = this.m_touchlist[i].y;
                if (bs[x][y]) {
                    bs[x][y].onGray();
                    bs[x][y].rmLine();
                }
            }
            this.m_touchlist = [];
            return;
        }
        var color;
        var pt = this.m_touchlist.length;
        var firX, firY;
        if (this.m_touchlist.length > 0) {
            firX = this.m_touchlist[0].x;
            firY = this.m_touchlist[0].y;
            if (bs[firX][firY]) {
                color = bs[firX][firY].color;
            }
        }
        var large = false;
        var task = function (cc) {
            var coll = [];
            var resolve = function (x, y) {
                coll.push(function (cb) {
                    bs[x][y].rmLine();
                    bs[x][y].onElim(cb);
                });
            };
            for (var i = 0; i < _this.m_touchlist.length; i++) {
                var x = _this.m_touchlist[i].x;
                var y = _this.m_touchlist[i].y;
                if (bs[x][y].type == 1 /* Special */)
                    large = true;
                resolve(x, y);
            }
            async.parallel(coll, function () {
                if (_this.m_touchlist.length >= _this.blockUpgrade) {
                    var len = _this.m_touchlist.length;
                    var nx = _this.m_touchlist[len - 1].x;
                    var ny = _this.m_touchlist[len - 1].y;
                    var newB = BlockFactory.create(1 /* Special */, { color: color });
                    newB.setPosition(nx, ny);
                    bs[nx][ny] = newB;
                }
                _this.m_touchlist = [];
                cc.call(null);
            });
        };
        this.view.touchEnabled = false;
        async.series([
            function (cb) {
                task(cb);
            },
            function (cb) {
                _this.m_context.dispatchEvent(new BoardEvent(BoardEvent.ELIMINATE, { cnt: pt, color: color, large: large }));
                cb.call(null);
            },
            function (cb) {
                _this.dropDown(cb);
            }
        ], function () {
            _this.onDropDownComp();
            _this.view.touchEnabled = true;
        });
        this.onDebuffSend();
        this.m_context.dispatchEvent(new BoardEvent(BoardEvent.CLICK_NUMBER, {}));
    };
    __egretProto__.onDebuffSend = function () {
        var bs = this.blocks;
        var fire = 0, doison = 0;
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                if (bs[i][j]) {
                    if (bs[i][j].m_debuff == 1 /* Firebuff */)
                        fire++;
                    else if (bs[i][j].m_debuff == 2 /* Doisonbuff */)
                        doison++;
                }
            }
        }
        this.m_context.dispatchEvent(new BoardEvent(BoardEvent.DEBUFF_ATK, { fire: fire, doison: doison }));
    };
    //private onBoardTap( evt:egret.TouchEvent ):void
    //{
    //	var bs = this.blocks;
    //	var x = Math.floor(evt.localX / this.blockSize);
    //	var y = Math.floor(evt.localY / this.blockSize);
    //	if ( x >= this.w || y >= this.h ) return;
    //
    //	if ( !bs[x][y] )
    //	{
    //		this.m_context.dispatchEvent( new BoardEvent( BoardEvent.CLICK_EMPTY ) );
    //		return;
    //	}
    //
    //	this.view.touchEnabled = false;
    //
    //	async.series([
    //		(cb) => { bs[x][y].onTap(cb); },
    //		(cb) => { this.dropDown(cb); }
    //	], () => {
    //		this.onDropDownComp();
    //		this.view.touchEnabled = true;
    //	} );
    //}
    __egretProto__.dropDown = function (cc) {
        var _this = this;
        var bs = this.blocks;
        var maxDeltaY = 0;
        // drop
        var drop = function (cb) {
            for (var j = _this.h - 1; j >= 0; j--) {
                for (var i = 0; i < _this.w; i++) {
                    var b = bs[i][j];
                    if (b == null)
                        continue;
                    var newY = b.y;
                    while (newY + b.height < _this.h) {
                        var emptyBelow = true;
                        for (var k = 0; k < b.width; k++) {
                            if (bs[b.x + k][newY + b.height] != null) {
                                emptyBelow = false;
                                break;
                            }
                        }
                        if (emptyBelow)
                            newY++;
                        else
                            break;
                    }
                    if (newY != b.y) {
                        for (var tx = b.x; tx < b.x + b.width; tx++) {
                            for (var ty = b.y; ty < newY; ty++) {
                                bs[tx][ty] = null;
                            }
                            for (var ty = newY; ty < newY + b.height; ty++) {
                                bs[tx][ty] = b;
                            }
                        }
                        b.setPosition(b.x, newY, (newY - j) * _this.m_dropTime);
                        maxDeltaY = Math.max(maxDeltaY, newY - j);
                    }
                }
            }
            var time = new Date();
            setTimeout(cb, maxDeltaY * _this.m_dropTime);
        };
        //this.dropGift( maxDeltaY + 1 );
        // check empty
        var all_empty = this.isEmpty();
        // left
        var check_left = function () {
            var columes_empty_status = [];
            var need_shift_left = [];
            if (!all_empty) {
                for (var i = 0; i < _this.w; i++) {
                    columes_empty_status[i] = 0;
                    var is_empty = true;
                    for (var j = 0; j < _this.h; j++) {
                        if (bs[i][j]) {
                            is_empty = false;
                            break;
                        }
                    }
                    if (is_empty) {
                        columes_empty_status[i] = 1;
                    }
                }
                for (var i = 0; i < _this.w; i++) {
                    need_shift_left[i] = 0;
                    if (columes_empty_status[i] == 0) {
                        for (var j = 0; j < i; j++) {
                            need_shift_left[i] += columes_empty_status[j];
                        }
                    }
                }
                for (var i = 0; i < _this.w; i++) {
                    if (need_shift_left[i] > 0) {
                        for (j = 0; j < _this.h; j++) {
                            if (bs[i][j]) {
                                var b = bs[i][j];
                                var X = b.x;
                                for (var ty = b.y; ty < b.y + b.height; ty++) {
                                    for (var tx = X; tx < X + b.width; tx++) {
                                        bs[tx][ty] = null;
                                    }
                                    for (var tx = X - need_shift_left[i]; tx < X - need_shift_left[i] + b.width; tx++) {
                                        bs[tx][ty] = b;
                                    }
                                }
                                b.setPosition(X - need_shift_left[i], b.y, need_shift_left[i] * _this.m_dropTime);
                            }
                        }
                    }
                }
            }
        };
        //setTimeout(check_left, ( maxDeltaY + this.m_leftWait )* this.m_dropTime);
        // fill
        var fill = function (cb) {
            var delaty = 0;
            var time = new Date();
            for (var i = 0; i < _this.w; i++) {
                var deepest = -1;
                for (var j = 0; j < _this.h; j++) {
                    if (bs[i][j] == null)
                        deepest = j;
                    else
                        break;
                }
                for (var t = 0; t <= deepest; t++) {
                    var newB = BlockFactory.create(0 /* Normal */, {});
                    newB.setPosition(i, t - deepest - 1);
                    newB.setPosition(i, t, (t - newB.y) * _this.m_dropTime);
                    delaty = Math.max(delaty, t - newB.y);
                    bs[i][t] = newB;
                }
            }
            setTimeout(cb, delaty * _this.m_dropTime);
        };
        //setTimeout( fill, maxDeltaY * this.m_dropTime );
        var check = function (cb) {
            var time = new Date();
            if (_this.m_initTime == 0) {
                _this.m_initTime = 1;
                cb.call(null);
                return;
            }
            if (_this.checkCanXC()) {
                _this.checkXC(cb);
            }
            else if (!_this.checkCanXC()) {
                _this.m_context.dispatchEvent(new BoardEvent(BoardEvent.CLICK_END, {}));
                cb.call(null);
            }
        };
        this.m_reDraw = false;
        async.series([
            function (cb) {
                drop(cb);
            },
            function (cb) {
                fill(cb);
            },
            function (cb) {
                check(cb);
            },
            function (cb) {
                _this.dropGift(fill, cb);
            }
        ], function () {
            cc.call(null);
            //setTimeout( function() { this }.bind( this ) ()=>{ this.cc.call()}, )
            //setTimeout(cc,maxDeltaY * this.m_dropTime );
        });
        // 音效
        //this.m_eliminateSE.play(false)
    };
    __egretProto__.createFlood = function () {
        var _this = this;
        var visited;
        var res;
        var st;
        var ret = {};
        ret.next = function (b, fr) {
            visited[b.id] = 1;
            if (b == st || b.visit(fr)) {
                res.push(b);
            }
            else {
                return;
            }
            var dir = [[-1, 1], [-1, 0], [-1, -1], [0, 1], [0, -1], [1, 1], [1, 0], [1, -1]];
            var len = dir.length;
            for (var i = 0; i < len; i++) {
                var nx = b.x + dir[i][0], ny = b.y + dir[i][1];
                if (nx < 0 || nx >= _this.w || ny < 0 || ny >= _this.h)
                    continue;
                var nb = _this.blocks[nx][ny];
                if (!nb || visited[nb.id])
                    continue;
                ret.next(nb, b);
            }
        };
        ret.start = function (b) {
            visited = {};
            if (res) {
                var len = res.length;
                for (var i = 0; i < len; i++)
                    visited[res[i].id] = 1;
            }
            res = [];
            if (!b || visited[b.id])
                return;
            st = b;
            ret.next(b, null);
            return ret;
        };
        ret.getRes = function () {
            return res;
        };
        ret.getPt = function () {
            var len = res.length, pt = 0;
            for (var i = 0; i < len; i++) {
                switch (res[i].type) {
                    case 0 /* Normal */:
                        pt += 1;
                        break;
                    case 1 /* Special */:
                        pt += 1;
                        break;
                }
            }
            return pt;
        };
        return ret;
    };
    __egretProto__.onDropDownComp = function () {
        var _this = this;
        var bs = this.blocks;
        var task = [];
        var wait = function (x, y) {
            task.push(function (cb) {
                bs[x][y].onDropDownComp(cb);
            });
        };
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                if (bs[i][j])
                    wait(i, j);
            }
        }
        async.parallel(task, function () {
            if (_this.checkEnd()) {
                _this.shuffle();
            }
        });
    };
    __egretProto__.recycleAll = function () {
        var bs = this.blocks;
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                if (bs[i][j])
                    BlockFactory.recycle(bs[i][j]);
            }
        }
    };
    __egretProto__.shuffle = function () {
        var bs = this.blocks;
        var flag = true;
        if (this.isFull()) {
            this.recycleAll();
            this.m_context.board.view.touchEnabled = true;
            flag = false;
        }
        if (this.m_initTime == 0) {
            this.reDrawMainUI();
        }
        else {
            this.m_context.dispatchEvent(new BoardEvent(BoardEvent.CLICK_END, {}));
            if (flag) {
                this.m_context.board.view.touchEnabled = false;
            }
        }
    };
    __egretProto__.reDrawMainUI = function () {
        var _this = this;
        if (this.m_reDraw == false) {
            this.m_reDraw = true;
            this.m_context.board.view.touchEnabled = true;
        }
        this.dropDown(function () {
            _this.onDropDownComp();
        });
    };
    __egretProto__.checkEnd = function () {
        var f = this.createFlood();
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                f.start(this.blocks[i][j]);
                if (f.getPt() >= 3) {
                    return false;
                }
            }
        }
        return true;
    };
    __egretProto__.isEmpty = function () {
        var bs = this.blocks;
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                if (bs[i][j])
                    return false;
            }
        }
        return true;
    };
    __egretProto__.isFull = function () {
        var bs = this.blocks;
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                if (!bs[i][j])
                    return false;
            }
        }
        return true;
    };
    __egretProto__.dropGift = function (fill, cb) {
        var _this = this;
        var bs = this.blocks;
        var ret_dropgift = function () {
            var delaty = 0;
            for (var i = 0; i < _this.w; i++) {
                var j = _this.h - 1;
                while (j >= 0) {
                    if (!bs[i][j]) {
                        j--;
                    }
                    if (bs[i][j].type == 0 /* Normal */)
                        break;
                    else if (bs[i][j].type == 1 /* Special */) {
                        BlockFactory.recycle(bs[i][j]); // ?? 不会消失
                        j--;
                    }
                }
                for (var h = j; h >= 0; h--) {
                    if (bs[i][h]) {
                        var newY = h;
                        for (var l = h + 1; l < _this.h; l++) {
                            if (!bs[i][l])
                                newY++;
                        }
                        if (newY != h) {
                            var b = bs[i][h];
                            bs[i][h] = null;
                            bs[i][newY] = null;
                            bs[i][newY] = b;
                            b.setPosition(i, newY, (newY - h) * _this.m_dropTime);
                            delaty = Math.max(newY - h, delaty);
                        }
                    }
                }
            }
            var time = new Date();
            setTimeout(function () {
                fill(cb);
            }, delaty * _this.m_dropTime + 300); // ??
        };
        //ret_dropgift();    // 2015-6-19 11.03
        setTimeout(ret_dropgift, 300);
    };
    __egretProto__.checkCanXC = function () {
        if (!this.isFull()) {
            return false;
        }
        var bs = this.blocks;
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                if (i + 2 < this.w && bs[i][j].visit(bs[i + 1][j]) && bs[i][j].visit(bs[i + 2][j])) {
                    return true;
                }
                if (j + 2 < this.h && bs[i][j].visit(bs[i][j + 1]) && bs[i][j].visit(bs[i][j + 2])) {
                    return true;
                }
            }
        }
        return false;
    };
    __egretProto__.checkXC = function (cb) {
        var _this = this;
        var bs = this.blocks;
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                if (!bs[i][j])
                    continue;
                var nx = i + 1;
                while (nx < this.w) {
                    if (bs[nx][j].visit(bs[i][j]) && !bs[nx][j].hflag) {
                        nx++;
                    }
                    else {
                        break;
                    }
                }
                var ny = j + 1;
                while (ny < this.h) {
                    if (bs[i][ny].visit(bs[i][j]) && !bs[i][ny].vflag) {
                        ny++;
                    }
                    else {
                        break;
                    }
                }
                if (nx - i >= 3) {
                    for (var x = i; x < nx - 1; x++) {
                        bs[x][j].hflag = true;
                    }
                    for (var x = i; x < nx; x++) {
                        bs[x][j].flag = true;
                    }
                }
                if (ny - j >= 3) {
                    for (var y = j; y < ny - 1; y++) {
                        bs[i][y].vflag = true;
                    }
                    for (var y = j; y < ny; y++) {
                        bs[i][y].flag = true;
                    }
                }
            }
        }
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                if (bs[i][j].hflag == true) {
                    bs[i][j].setHLine();
                }
                if (bs[i][j].vflag == true) {
                    bs[i][j].setVLine();
                }
            }
        }
        var visit = [];
        var target = [];
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                if (bs[i][j].flag && !visit[bs[i][j].id]) {
                    var pt = 0;
                    var queue = [];
                    var large = false;
                    queue.push(bs[i][j]);
                    visit[bs[i][j].id] = true;
                    while (queue.length > 0) {
                        var rt = queue.pop();
                        if (rt.hflag && !visit[bs[rt.x + 1][rt.y].id]) {
                            queue.push(bs[rt.x + 1][rt.y]);
                            visit[bs[rt.x + 1][rt.y].id] = true;
                            if (bs[rt.x + 1][rt.y].type == 1 /* Special */)
                                large = true;
                        }
                        if (rt.vflag && !visit[bs[rt.x][rt.y + 1].id]) {
                            queue.push(bs[rt.x][rt.y + 1]);
                            visit[bs[rt.x][rt.y + 1].id] = true;
                            if (bs[rt.x][rt.y + 1].type == 1 /* Special */)
                                large = true;
                        }
                        pt++;
                    }
                    if (pt > 0) {
                        this.m_context.dispatchEvent(new BoardEvent(BoardEvent.ELIMINATE, { cnt: pt, color: bs[i][j].color, large: large }));
                    }
                    if (pt >= this.blockUpgrade) {
                        target.push({ x: i, y: j, color: bs[i][j].color });
                    }
                }
            }
        }
        var ret = function (cc) {
            var task = [];
            var func = function (x, y) {
                if (bs[x][y].flag) {
                    task.push(function (cb) {
                        bs[x][y].rmHLine();
                        bs[x][y].rmVLine();
                        bs[x][y].onElim(cb);
                    });
                }
            };
            for (var i = 0; i < _this.w; i++) {
                for (var j = 0; j < _this.h; j++) {
                    func(i, j);
                }
            }
            var XC = function (cb) {
                async.parallel(task, function () {
                    cb.call(null);
                });
            };
            var tarGet = function (cb) {
                var tar = [];
                for (var t = 0; t < target.length; t++) {
                    var nx = target[t].x;
                    var ny = target[t].y;
                    var color = target[t].color;
                    tar.push(function (cc) {
                        var newB = BlockFactory.create(1 /* Special */, { color: color });
                        bs[nx][ny] = null;
                        newB.setPosition(nx, ny);
                        bs[nx][ny] = newB;
                        var time = new Date();
                        cc.call();
                    });
                }
                async.parallel(tar, function () {
                    cb.call(null);
                });
            };
            async.series([
                function (cb) {
                    XC(cb);
                },
                function (cb) {
                    tarGet(cb);
                },
                function (cb) {
                    _this.dropDown(cb);
                }
            ], function () {
                cc.call(null);
            });
        };
        setTimeout(function () {
            ret(cb);
        }, 300);
    };
    __egretProto__.setBlockLocks = function (locknum) {
        var num = 0, unlock = 0;
        var bs = this.blocks;
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                if (!bs[i][j].m_locked)
                    unlock++;
            }
        }
        locknum = Math.min(unlock, locknum);
        while (num < locknum) {
            var ran_w = Math.floor(Math.random() * 10) % this.w;
            var ran_h = Math.floor(Math.random() * 10) % this.h;
            if (bs[ran_w][ran_h].m_locked == true)
                continue;
            num++;
            bs[ran_w][ran_h].m_locked = true;
            bs[ran_w][ran_h].setlock();
        }
    };
    __egretProto__.setDebuff = function (effnum, type) {
        var num = 0, undebuff = 0;
        var bs = this.blocks;
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                if (bs[i][j].m_debuff == 0 /* None */)
                    undebuff++;
            }
        }
        effnum = Math.min(effnum, undebuff);
        while (num < effnum) {
            var ran_w = Math.floor(Math.random() * 10) % this.w;
            var ran_h = Math.floor(Math.random() * 10) % this.h;
            if (bs[ran_w][ran_h].m_debuff != 0 /* None */)
                continue;
            num++;
            bs[ran_w][ran_h].m_debuff = type;
            bs[ran_w][ran_h].setDebuff(type);
        }
    };
    __egretProto__.showMonsterSkill = function (skillId) {
        var bs = this.blocks;
        switch (skillId) {
            case 1:
                break;
            case 2:
                this.setBlockLocks(3);
                break;
            case 3:
                this.setBlockLocks(5);
                break;
            case 4:
                this.setBlockLocks(7);
                break;
            case 5:
                this.setDebuff(3, 2 /* Doisonbuff */);
                break;
            case 6:
                this.setDebuff(3, 1 /* Firebuff */);
                break;
            case 7:
                break;
            case 8:
                break;
            case 9:
                break;
            default:
                break;
        }
    };
    return Board;
})();
Board.prototype.__class__ = "Board";
//# sourceMappingURL=Board.js.map