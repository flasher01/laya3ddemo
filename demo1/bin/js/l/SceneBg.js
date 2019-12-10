var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SceneBg = /** @class */ (function (_super) {
    __extends(SceneBg, _super);
    function SceneBg() {
        var _this = _super.call(this) || this;
        _this.p_left = -1;
        _this.p_top = -1;
        _this.m_type = 1;
        _this.m_destroyed = !1;
        _this.m_blocks = {};
        _this.m_blocksPool = [];
        _this.mouseEnabled = !0;
        SceneBg.blocksUrl[1] = {};
        SceneBg.blocksUrl[2] = {};
        SceneBg.blocksUrl[3] = {};
        SceneBg.blocks[1] = [];
        SceneBg.blocks[2] = [];
        SceneBg.blocks[3] = [];
        SceneBg.hangup[1] = [];
        SceneBg.hangup[2] = [];
        SceneBg.hangup[3] = [];
        _this.content2 = new Laya.Sprite;
        _this.content2.name = "content2";
        _this.content2.mouseEnabled = !0;
        _this.addChild(_this.content2);
        _this.content1 = new Laya.Sprite;
        _this.content1.name = "content1";
        _this.content1.mouseEnabled = !0;
        _this.addChild(_this.content1);
        return _this;
    }
    Object.defineProperty(SceneBg.prototype, "atlas", {
        get: function () {
            return this.m_atlas;
        },
        enumerable: true,
        configurable: true
    });
    SceneBg.prototype.setViewSize = function (t, i) {
        this.m_viewWidth = t, this.m_viewHeight = i, SceneBg.limtNum[1] = SceneBg.limtNum[2] = SceneBg.limtNum[3] = Laya.isMic ? CacheResUtils.getMapLimit() : GameModel.pc ? 100 : GameModel.ios ? Math.ceil(this.m_viewWidth / PathManager.IMG_WH) * Math.ceil(this.m_viewHeight / PathManager.IMG_WH) + 5 : Math.ceil(this.m_viewWidth / PathManager.IMG_WH) * Math.ceil(this.m_viewHeight / PathManager.IMG_WH) + 10;
    };
    SceneBg.prototype.initMapData = function (t, e) {
        (this.m_resourceID != e.id || this.m_destroyed) && (this.m_type = t, this.m_sceneBgVO = e, this.m_resourceID = e.id, this.m_resourcePath = PathDefine.MAP + this.m_resourceID + (3 == this.m_type ? "/move/" : 2 == this.m_type ? "/back/" : "/"), this.m_bgWidth = 3 == this.m_type ? this.m_sceneBgVO.moveWidth : 2 == this.m_type ? this.m_sceneBgVO.backWidth : this.m_sceneBgVO.mapWidth, this.m_bgHeight = 3 == this.m_type ? this.m_sceneBgVO.moveHeight : 2 == this.m_type ? this.m_sceneBgVO.backHeight : this.m_sceneBgVO.mapHeight, this.m_maxCell = this.m_bgWidth % PathManager.IMG_WH == 0 ? Math.floor(this.m_bgWidth / PathManager.IMG_WH) - 1 : Math.floor(this.m_bgWidth / PathManager.IMG_WH), this.m_maxRow = this.m_bgHeight % PathManager.IMG_WH == 0 ? Math.floor(this.m_bgHeight / PathManager.IMG_WH) - 1 : Math.floor(this.m_bgHeight / PathManager.IMG_WH), this.m_breviaryPath = this.m_resourcePath + "small.png", this.loadBreaviary());
    };
    SceneBg.prototype.loadBreaviary = function () {
        var t = Laya.loader.getRes(this.m_breviaryPath);
        t ? (this.m_breviaryLoaded = !0, this.m_breviary = new Laya.Texture(t)) : (this.m_breviaryLoaded = !1, Laya.loader.load(this.m_breviaryPath, Laya.Handler.create(this, this.onBreaviaryLoaded), null, Laya.Loader.IMAGE, LoadPriority.Level0));
    };
    SceneBg.prototype.onBreaviaryLoaded = function (t) {
        t && t.url == this.m_breviaryPath && (this.m_breviary = t, this.m_breviaryLoaded = !0, this.update(!0));
    };
    SceneBg.prototype.creatBreviary = function (t, e) {
        if (this.m_breviary) {
            var i = e < this.m_maxCell || this.m_bgWidth % PathManager.IMG_WH == 0 ? PathManager.IMG_WH : this.m_bgWidth % PathManager.IMG_WH, n = t < this.m_maxRow || this.m_bgHeight % PathManager.IMG_WH == 0 ? PathManager.IMG_WH : this.m_bgHeight % PathManager.IMG_WH, s = Laya.Texture.createFromTexture(this.m_breviary, 64 / this.m_bgWidth * e * PathManager.IMG_WH, 64 / this.m_bgHeight * t * PathManager.IMG_WH, 64 / this.m_bgWidth * i, 64 / this.m_bgHeight * n);
            return s.width = s.sourceWidth = i, s.height = s.sourceHeight = n, s;
        }
        return null;
    };
    SceneBg.prototype.update = function (t) {
        void 0 === t && (t = !1);
        var e = SceneManager.ins.cam2;
        if (this.m_breviaryLoaded && (t || e.rending)) {
            this.m_startX = Math.round(e.left * this.getRateX(e.width)), this.m_startY = Math.round(e.top * this.getRateY(e.height)), this.m_endX = this.m_startX + e.right - e.left, this.m_endY = this.m_startY + e.bottom - e.top, this.m_startCell = Math.max(Math.floor(this.m_startX / PathManager.IMG_WH), 0), this.m_startRow = Math.max(Math.floor(this.m_startY / PathManager.IMG_WH), 0), this.m_endCell = Math.min(Math.floor(this.m_endX / PathManager.IMG_WH), this.m_maxCell), this.m_endRow = Math.min(Math.floor(this.m_endY / PathManager.IMG_WH), this.m_maxRow), this.c_startCell = Math.max(Math.floor(e.left / PathManager.IMG_WH), 0), this.c_startRow = Math.max(Math.floor(e.top / PathManager.IMG_WH), 0), this.c_endCell = Math.min(Math.floor(e.right / PathManager.IMG_WH), this.m_maxCell), this.c_endRow = Math.min(Math.floor(e.bottom / PathManager.IMG_WH), this.m_maxRow), this.c_moveX = Math.round(e.left * (1 - this.getRateX(e.width))), this.c_moveY = Math.round(e.top * (1 - this.getRateY(e.height)));
            var i;
            if (this.p_startCell != this.c_startCell || this.p_startRow != this.c_startRow || this.p_endCell != this.c_endCell || this.p_endRow != this.c_endRow || 2 == this.m_type && (this.p_left < 0 || this.p_top < 0 || this.p_moveX - this.c_moveX > this.p_left || this.c_moveX - this.p_moveX > PathManager.IMG_WH - this.p_left || this.p_moveY - this.c_moveY > this.p_top || this.c_moveY - this.p_moveY > PathManager.IMG_WH - this.p_top)) {
                this.p_startCell = this.c_startCell, this.p_startRow = this.c_startRow, this.p_endCell = this.c_endCell, this.p_endRow = this.c_endRow, this.p_moveX = this.c_moveX, this.p_moveY = this.c_moveY, this.p_left = Math.round(e.left * (1 - this.getRateX(e.width)) % PathManager.IMG_WH), this.p_top = Math.round(e.top * (1 - this.getRateY(e.height)) % PathManager.IMG_WH), this.p_left = this.p_left > PathManager.IMG_WH - 1 ? 0 : this.p_left, this.p_top = this.p_top > PathManager.IMG_WH - 1 ? 0 : this.p_top;
                var n = 0, s = this.m_blocks;
                for (var a in s)
                    i = s[a], (i.row < this.m_startRow || i.row > this.m_endRow || i.cell < this.m_startCell || i.cell > this.m_endCell || 1 == this.m_type && 0 == this.m_sceneBgVO.types[i.row][i.cell] || 2 == this.m_type && this.checkSceneBlocks(i.cell * PathManager.IMG_WH - this.m_startX + e.left, i.row * PathManager.IMG_WH - this.m_startY + e.top)) && (i.destroy(), this.m_blocksPool.push(i), delete s[a], this.clearByKey(a), n++);
                n > 0 && this.awakeLoad(n);
            }
            this.content1.pos(this.m_startCell * PathManager.IMG_WH - this.m_startX, this.m_startRow * PathManager.IMG_WH - this.m_startY), this.content2.pos(this.m_startCell * PathManager.IMG_WH - this.m_startX + 1792, this.m_startRow * PathManager.IMG_WH - this.m_startY);
            for (var o = this.m_startRow; o <= this.m_endRow; o++)
                for (var r = this.m_startCell; r <= this.m_endCell; r++)
                    1 == this.m_type && 0 == this.m_sceneBgVO.types[o][r] || 2 == this.m_type && this.checkSceneBlocks(r * PathManager.IMG_WH - this.m_startX + e.left, o * PathManager.IMG_WH - this.m_startY + e.top) || (i = this.getBlock(o, r), o < this.m_startRow + 7 ? r < this.m_startCell + 7 ? (i.parent && i.parent != this.content1 && i.parent.removeChild(i), i.parent || this.content1.addChild(i), i.updPos((r - this.m_startCell) * PathManager.IMG_WH, (o - this.m_startRow) * PathManager.IMG_WH)) : (i.parent && i.parent != this.content2 && i.parent.removeChild(i), i.parent || this.content2.addChild(i), i.updPos((r - this.m_startCell) * PathManager.IMG_WH - 1792, (o - this.m_startRow) * PathManager.IMG_WH)) : Log.e("地图高度大于2048"));
        }
    };
    SceneBg.prototype.getBlock = function (t, e) {
        var i = t + "_" + e;
        if (this.m_blocks[i])
            return this.m_blocks[i];
        var n = this.m_blocksPool.length > 0 ? this.m_blocksPool.shift() : new SceneBlock(this);
        return n.initData(this.m_resourcePath, this.m_type, t, e), n.size(e < this.m_maxCell ? PathManager.IMG_WH : this.m_bgWidth % PathManager.IMG_WH, t < this.m_maxRow ? PathManager.IMG_WH : this.m_bgHeight % PathManager.IMG_WH), this.m_blocks[i] = n, n;
    };
    SceneBg.prototype.checkSceneBlocks = function (t, e) {
        var i = SceneManager.ins.cam2, n = Math.floor(t / PathManager.IMG_WH), s = Math.floor(e / PathManager.IMG_WH), a = Math.floor((t + PathManager.IMG_WH) / PathManager.IMG_WH), o = Math.floor(e / PathManager.IMG_WH), r = Math.floor((t + PathManager.IMG_WH) / PathManager.IMG_WH), h = Math.floor((e + PathManager.IMG_WH) / PathManager.IMG_WH), l = Math.floor(t / PathManager.IMG_WH), c = Math.floor((e + PathManager.IMG_WH) / PathManager.IMG_WH), u = Math.max(i.left / PathManager.IMG_WH - 1, 0), p = Math.max(i.top / PathManager.IMG_WH - 1, 0), d = Math.min(Math.ceil(i.right / PathManager.IMG_WH), Math.floor(this.m_sceneBgVO.mapWidth / PathManager.IMG_WH)), g = Math.min(Math.ceil(i.bottom / PathManager.IMG_WH), Math.floor(this.m_sceneBgVO.mapHeight / PathManager.IMG_WH));
        return (u > n || n > d || p > s || s > g || this.m_sceneBgVO.types[s] && 2 == this.m_sceneBgVO.types[s][n]) && (u > a || a > d || p > o || o > g || this.m_sceneBgVO.types[o] && 2 == this.m_sceneBgVO.types[o][a]) && (u > r || r > d || p > h || h > g || this.m_sceneBgVO.types[h] && 2 == this.m_sceneBgVO.types[h][r]) && (u > l || l > d || p > c || c > g || this.m_sceneBgVO.types[c] && 2 == this.m_sceneBgVO.types[c][l]) ? !0 : !1;
    };
    SceneBg.prototype.getRateX = function (t) {
        return 3 == this.m_type ? (this.m_sceneBgVO.moveWidth - t) / (this.m_sceneBgVO.mapWidth - t) : 2 == this.m_type ? (this.m_sceneBgVO.backWidth - t) / (this.m_sceneBgVO.mapWidth - t) : 1;
    };
    SceneBg.prototype.getRateY = function (t) {
        return 3 == this.m_type ? (this.m_sceneBgVO.moveHeight - t) / (this.m_sceneBgVO.mapHeight - t) : 2 == this.m_type ? (this.m_sceneBgVO.backHeight - t) / (this.m_sceneBgVO.mapHeight - t) : 1;
    };
    SceneBg.prototype.awakeLoad = function (t) {
        for (var i = SceneBg.hangup[this.m_type]; i.length > 0;) {
            var n = i.pop(), s = this.m_blocks[n];
            if (GameModel.isFoucus && s && s.state == LoadState.Handup && (s.awakeLoad(), t--), 0 >= t)
                break;
        }
    };
    SceneBg.prototype.clearByKey = function (t) {
        if (!this.m_blocks[t]) {
            if (SceneBg.blocksUrl[this.m_type][t]) {
                var i = SceneBg.blocksUrl[this.m_type][t];
                Laya.loader.cancelLoadByUrl(i), Laya.loader.clearRes(i), delete SceneBg.blocksUrl[this.m_type][t];
                var n = SceneBg.blocks[this.m_type].indexOf(i);
                -1 != n && SceneBg.blocks[this.m_type].splice(n, 1);
            }
            SceneBg.hangup[this.m_type][t] && delete SceneBg.hangup[this.m_type][t];
        }
    };
    SceneBg.prototype.clear = function (t) {
        if (void 0 === t && (t = !0), t)
            for (var i in SceneBg.blocksUrl)
                for (var n in SceneBg.blocksUrl[i])
                    this.clearByKey(n);
        else {
            var s, a = this.m_blocks;
            for (var i in a)
                s = a[i], s.destroy(), this.m_blocksPool.push(s), delete a[i], this.clearByKey(i);
        }
    };
    SceneBg.prototype.destroy = function () {
        this.m_destroyed = !0, this.m_breviary = null, this.m_breviaryLoaded = !1;
        var t, i, n = this.m_blocksPool, s = this.m_blocks;
        for (t in s)
            i = s[t], i.destroy(), n.push(i), delete s[t];
        this.clear(!1), SceneBg.blocksUrl = {}, SceneBg.blocksUrl[1] = {}, SceneBg.blocksUrl[2] = {},
            SceneBg.blocksUrl[3] = {}, SceneBg.blocks = {}, SceneBg.blocks[1] = [], SceneBg.blocks[2] = [],
            SceneBg.blocks[3] = [], SceneBg.hangup = {}, SceneBg.hangup[1] = [], SceneBg.hangup[2] = [],
            SceneBg.hangup[3] = [], Laya.loader.clearRes(this.m_breviaryPath), this.m_blocks = {},
            this.m_startCell = void 0, this.m_startRow = void 0, this.m_endCell = void 0,
            this.m_endRow = void 0, this.m_resourcePath = null, this.m_breviaryPath = null;
    };
    SceneBg.blocksUrl = {};
    SceneBg.blocks = {};
    SceneBg.hangup = {};
    SceneBg.limtNum = {};
    return SceneBg;
}(Laya.Sprite));
//# sourceMappingURL=SceneBg.js.map