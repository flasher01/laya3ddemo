var PathManager = /** @class */ (function () {
    function PathManager() {
    }
    PathManager.initManager = function () {
        this.m_mapModel = new astar.MapModel, this.m_astar = new astar.AStar(this.m_mapModel);
    };
    PathManager.initSceneData = function (e) {
        this.m_maxCell = Math.ceil(e.mapWidth / PathManager.TILE_WIDTH), this.m_maxRow = Math.ceil(e.mapHeight / PathManager.TILE_HEIGHT), this._path = e.paths, this._safe = e.safes, this.m_alpha = e.alphas, this.m_block = this.m_mapModel.map = e.blocks;
    };
    PathManager.getNineDirTitlePoint = function (t, e) {
        for (var i = new Array, n = TreasureManager.ins.CNM, s = TreasureManager.ins.CNM, a = t - Math.floor(n / 2), o = e - Math.floor(s / 2), r = new Laya.Point, h = 1; n >= h; h++)
            for (var l = 1; s >= l; l++)
                r.x = a + l, r.y = o + h, i.push(r), r = new Laya.Point;
        return i;
    };
    PathManager.getMaxCell = function () {
        return this.m_maxCell;
    };
    PathManager.getMaxRow = function () {
        return this.m_maxRow;
    };
    PathManager.findPath = function (t, e, i, n) {
        var s = this.hasBarrier(t, e, i, n);
        if (s) {
            var a = MapManager.ins.mapVO;
            return this.m_astar.find(new Laya.Point(t, e), new Laya.Point(i, n), a.mapType == MapType.OutdoorBoss || a.mapsubtyp == Mapsubtype.Border || a.mapsubtyp == Mapsubtype.DingShi ? 5e4 : 0);
        }
        return [new Laya.Point(i, n)];
    };
    PathManager.canWalk = function (t, e) {
        return this.m_mapModel ? !this.m_mapModel.isBlock(t, e) : null;
    };
    PathManager.canWalkByPixel = function (t, e) {
        return !this.m_mapModel.isBlock(t / this.TILE_WIDTH >> 0, e / this.TILE_HEIGHT >> 0);
    };
    PathManager.isPath = function (t, e) {
        return isNaN(t) || isNaN(e) || 0 > t || t >= this.m_maxCell || 0 > e || e >= this.m_maxRow || !this._path || !this._path[e] ? !1 : this._path[e][t];
    };
    PathManager.isSafe = function (t, e) {
        return isNaN(t) || isNaN(e) || 0 > t || t >= this.m_maxCell || 0 > e || e >= this.m_maxRow || !this._safe || !this._safe[e] ? !1 : this._safe[e][t];
    };
    PathManager.isAlpha = function (t, e) {
        return isNaN(t) || isNaN(e) || 0 > t || t >= this.m_maxCell || 0 > e || e >= this.m_maxRow || !this.m_alpha || !this.m_alpha[e] ? !1 : this.m_alpha[e][t];
    };
    PathManager.getDirection = function (t, e, i, n, s) {
        void 0 === s && (s = 8);
        var a;
        return 8 == s ? (a = (n - e) / (i - t), i >= t ? a > 1.5857974011816072 ? DirType.Bottom : a > .3443276132899952 ? DirType.BottomRight : a > -.3443276132899952 ? DirType.Right : a > -1.5857974011816072 ? DirType.TopRight : DirType.Top : -1.5857974011816072 >= a ? DirType.Bottom : -.3443276132899952 >= a ? DirType.BottomLeft : .3443276132899952 >= a ? DirType.Left : 1.5857974011816072 >= a ? DirType.TopLeft : DirType.Top) : a = i >= t ? n >= e ? DirType.BottomRight : DirType.TopRight : n >= e ? DirType.BottomLeft : DirType.TopLeft;
    };
    PathManager.pixPoi = function (t, e) {
        return new Laya.Point(t * this.TILE_WIDTH + .5 * this.TILE_WIDTH, e * this.TILE_HEIGHT + .5 * this.TILE_HEIGHT);
    };
    PathManager.tilPoi = function (t, e) {
        return new Laya.Point(t / this.TILE_WIDTH >> 0, e / this.TILE_HEIGHT >> 0);
    };
    PathManager.ranPoi = function (t, e, i, n) {
        void 0 === i && (i = 3), void 0 === n && (n = 0);
        var s = new Laya.Point(t, e);
        return Math.random() < .5 ? s.x += MathUtil.randRange(n, i) : s.x -= MathUtil.randRange(n, i), Math.random() < .5 ? s.y += MathUtil.randRange(n, i) : s.y -= MathUtil.randRange(n, i), this.m_mapModel.isBlock(s.x, s.y) && (s.x = t, s.y = e), s;
    };
    PathManager.pthPoi = function (t, e, i, n, s) {
        void 0 === s && (s = 3);
        var a = new Laya.Point(i, n);
        return i > t ? a.x -= MathUtil.randRange(0, s) : a.x += MathUtil.randRange(0, s), n > e ? a.y -= MathUtil.randRange(0, s) : a.y += MathUtil.randRange(0, s), this.m_mapModel.isBlock(a.x, a.y) && (a.x = i, a.y = n), a;
    };
    PathManager.linPoi = function (e, i, n, s, a) {
        void 0 === a && (a = 100);
        var o = MathUtil.getRadian(n * t.TILE_WIDTH, s * t.TILE_HEIGHT, e * t.TILE_WIDTH, i * t.TILE_HEIGHT), r = t.tilPoi(e * t.TILE_WIDTH - Math.round(a * Math.cos(o)), i * t.TILE_HEIGHT - Math.round(a * Math.sin(o)));
        return (r.x == e && r.y == i || this.m_mapModel.isBlock(r.x, r.y)) && (r.x = n, r.y = s), r;
    };
    PathManager.linPoi1 = function (e, i, n, s, a) {
        void 0 === a && (a = 100);
        for (var o, r = MathUtil.getRadian(e * t.TILE_WIDTH, i * t.TILE_HEIGHT, n * t.TILE_WIDTH, s * t.TILE_HEIGHT), h = Math.floor(a / 30), l = 1; h >= l; l++) {
            var c = t.tilPoi(n * t.TILE_WIDTH - Math.round(30 * l * Math.cos(r)), s * t.TILE_HEIGHT - Math.round(30 * l * Math.sin(r)));
            if (t.canWalk(c.x, c.y) && !t.isPath(c.x, c.y))
                o = c;
            else if (o)
                break;
        }
        return o || (o = new Laya.Point(n, s)), o;
    };
    PathManager.linPoi2 = function (e, i, n, s, a) {
        void 0 === a && (a = 100);
        for (var o, r = MathUtil.getRadian(e * t.TILE_WIDTH, i * t.TILE_HEIGHT, n * t.TILE_WIDTH, s * t.TILE_HEIGHT), h = Math.floor(a / 30), l = 1; h >= l; l++) {
            var c = t.tilPoi(n * t.TILE_WIDTH + Math.round(30 * l * Math.cos(r)), s * t.TILE_HEIGHT + Math.round(30 * l * Math.sin(r)));
            if (t.canWalk(c.x, c.y) && !t.isPath(c.x, c.y))
                o = c;
            else if (o)
                break;
        }
        return o || (o = new Laya.Point(n, s)), o;
    };
    PathManager.wlkPoi = function (e, i) {
        var n;
        if (!t.canWalk(i.x, i.y) || t.isPath(i.x, i.y))
            for (var s = MathUtil.getRadian(e.x * t.TILE_WIDTH, e.y * t.TILE_HEIGHT, i.x * t.TILE_WIDTH, i.y * t.TILE_HEIGHT), a = Math.floor(MathUtil.GetDistance(e.x * t.TILE_WIDTH, e.y * t.TILE_HEIGHT, i.x * t.TILE_WIDTH, i.y * t.TILE_HEIGHT) / 30), o = 1; a >= o; o++) {
                var r = t.tilPoi(i.x * t.TILE_WIDTH - Math.round(30 * o * Math.cos(s)), i.y * t.TILE_HEIGHT - Math.round(30 * o * Math.sin(s)));
                if (t.canWalk(r.x, r.y) && !t.isPath(r.x, r.y)) {
                    n = r;
                    break;
                }
            }
        else
            n = i;
        return n;
    };
    PathManager.neaPoi = function (e, i) {
        for (var n, s = MathUtil.getRadian(e.x * t.TILE_WIDTH, e.y * t.TILE_HEIGHT, i.x * t.TILE_WIDTH, i.y * t.TILE_HEIGHT), a = Math.floor(MathUtil.GetDistance(e.x * t.TILE_WIDTH, e.y * t.TILE_HEIGHT, i.x * t.TILE_WIDTH, i.y * t.TILE_HEIGHT) / 30), o = 1; a >= o; o++) {
            var r = t.tilPoi(i.x * t.TILE_WIDTH - Math.round(30 * o * Math.cos(s)), i.y * t.TILE_HEIGHT - Math.round(30 * o * Math.sin(s)));
            if (t.canWalk(r.x, r.y) && !t.isPath(r.x, r.y)) {
                n = r;
                break;
            }
        }
        return n || (n = r), n;
    };
    PathManager.getLenPointByRadian = function (e, i, n) {
        for (var s = e, a = n / 30, o = 1; a >= o; o++) {
            var r = t.tilPoi(e.x * t.TILE_WIDTH + Math.round(30 * o * Math.cos(i)), e.y * t.TILE_HEIGHT + Math.round(30 * o * Math.sin(i)));
            if (!t.canWalk(r.x, r.y) || t.isPath(r.x, r.y))
                break;
            s = r;
        }
        return s;
    };
    PathManager.getRangWalkPoint = function (e, i, n) {
        for (var s = 2 * i * n * 2; s > 0;) {
            var a = MathUtil.randRange(e.x - i, e.x + i), o = MathUtil.randRange(e.y - n, e.y + n);
            t.canWalk(a, o) && !t.isPath(a, o) && (e = new Laya.Point(a, o), s = 0), s--;
        }
        return e;
    };
    PathManager.hasBarrier = function (t, e, i, n) {
        if (t == i && e == n)
            return !1;
        var s, a, o, r, h, l, c = new Laya.Point(t + .5, e + .5), u = new Laya.Point(i + .5, n + .5), p = Math.abs(i - t), d = Math.abs(n - e), g = p > d ? !0 : !1;
        if (h = (c.y - u.y) / (c.x - u.x), l = c.y - h * c.x, g)
            for (a = Math.min(t, i), o = Math.max(t, i), s = a; o >= s; s++) {
                s == a && (s += .5);
                var f = this.getLineFunc1(c, u, h, l, s);
                r = this.getNodesUnderPoint(s, f);
                for (var m in r)
                    if (1 == r[m])
                        return !0;
                s == a + .5 && (s -= .5);
            }
        else
            for (a = Math.min(e, n), o = Math.max(e, n), s = a; o >= s; s++) {
                s == a && (s += .5);
                var y = this.getLineFunc2(c, u, h, l, s);
                r = this.getNodesUnderPoint(y, s);
                for (var m in r)
                    if (1 == r[m])
                        return !0;
                s == a + .5 && (s -= .5);
            }
        return !1;
    };
    PathManager.getNodesUnderPoint = function (t, e, i) {
        void 0 === i && (i = null);
        var n = [], s = t % 1 == 0, a = e % 1 == 0;
        return s && a ? (n[0] = this.getBlock(t - 1, e - 1), n[1] = this.getBlock(t, e - 1), n[2] = this.getBlock(t - 1, e), n[3] = this.getBlock(t, e)) : s && !a ? (n[0] = this.getBlock(t - 1, e), n[1] = this.getBlock(t, e)) : !s && a ? (n[0] = this.getBlock(t, e - 1), n[1] = this.getBlock(t, e)) : n[0] = this.getBlock(t, e), n;
    };
    PathManager.getBlock = function (t, e) {
        return e >>= 0, t >>= 0, this.m_block[e] && this.m_block[e].length > t ? this.m_block[e][t] : 1;
    };
    PathManager.getLineFunc1 = function (t, e, i, n, s) {
        if (t.x == e.x)
            throw new Error("两点所确定直线垂直于y轴，不能根据x值得到y值");
        return t.y == e.y ? t.y : i * s + n;
    };
    PathManager.getLineFunc2 = function (t, e, i, n, s) {
        if (t.x == e.x)
            return t.x;
        if (t.y == e.y)
            throw new Error("两点所确定直线垂直于y轴，不能根据x值得到y值");
        return (s - n) / i;
    };
    PathManager.clear = function () { };
    PathManager.TILE_WIDTH = 60;
    PathManager.TILE_HEIGHT = 30;
    PathManager.IMG_WH = 256;
    return PathManager;
}());
//# sourceMappingURL=PathManager.js.map