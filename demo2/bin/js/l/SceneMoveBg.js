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
var SceneMoveBg = /** @class */ (function (_super) {
    __extends(SceneMoveBg, _super);
    function SceneMoveBg() {
        return _super.call(this) || this;
    }
    SceneMoveBg.prototype.initMapData = function (e, i) {
        _super.prototype.initMapData.call(this, e, i), this.m_maxCellMove = Math.ceil(this.m_sceneBgVO.mapWidth / this.m_sceneBgVO.backWidth), this.m_maxRowMove = Math.ceil(this.m_sceneBgVO.mapHeight / this.m_sceneBgVO.backHeight);
    };
    SceneMoveBg.prototype.update = function (t) {
        void 0 === t && (t = !1);
        var e = SceneManager.ins.cam2;
        if (this.m_breviaryLoaded && (t || e && e.rending)) {
            this.m_moveLeft = .05 * e.moveTime, this.m_moveTop = 0, this.m_startX = this.m_moveLeft % this.m_sceneBgVO.moveWidth, this.m_startY = this.m_moveTop % this.m_sceneBgVO.moveHeight, this.m_endX = e.right % this.m_sceneBgVO.moveWidth, this.m_endY = e.bottom % this.m_sceneBgVO.moveHeight, this.m_startCell = Math.max(this.m_startX / PathManager.IMG_WH - 1, 0) >> 0, this.m_startRow = Math.max(this.m_startY / PathManager.IMG_WH - 1, 0) >> 0, this.m_endCell = Math.min(Math.ceil(this.m_endX / PathManager.IMG_WH), this.m_startCell + this.m_maxCell), this.m_endRow = Math.min(Math.ceil(this.m_endY / PathManager.IMG_WH), this.m_startRow + this.m_maxRow), this.c_startCell = Math.max(e.left / PathManager.IMG_WH - 1, 0), this.c_startRow = Math.max(e.top / PathManager.IMG_WH - 1, 0), this.c_endCell = Math.min(Math.ceil(e.right / PathManager.IMG_WH), this.m_maxCell), this.c_endRow = Math.min(Math.ceil(e.bottom / PathManager.IMG_WH), this.m_maxRow), this.c_moveX = e.left - this.m_moveLeft, this.c_moveY = e.top - this.m_moveTop;
            var i, n;
            (this.p_startCell != this.c_startCell || this.p_startRow != this.c_startRow || this.p_endCell != this.c_endCell || this.p_endRow != this.c_endRow || 2 == this.m_type && (this.p_left < 0 || this.p_top < 0 || this.p_moveX - this.c_moveX > this.p_left || this.c_moveX - this.p_moveX > PathManager.IMG_WH - this.p_left || this.p_moveY - this.c_moveY > this.p_top || this.c_moveY - this.p_moveY > PathManager.IMG_WH - this.p_top)) && (this.p_startCell = this.c_startCell, this.p_startRow = this.c_startRow, this.p_endCell = this.c_endCell, this.p_endRow = this.c_endRow, this.p_moveX = this.c_moveX, this.p_moveY = this.c_moveY, this.p_left = (e.left - this.m_moveLeft) % PathManager.IMG_WH, this.p_top = (e.top - this.m_moveTop) % PathManager.IMG_WH, this.p_left = this.p_left > PathManager.IMG_WH - 1 ? 0 : this.p_left, this.p_top = this.p_top > PathManager.IMG_WH - 1 ? 0 : this.p_top);
            for (var s = this.m_startRow; s <= this.m_endRow; s++)
                for (n = this.m_startCell; n <= this.m_endCell; n++)
                    i = this.getBlock(s, n), i.updPos(this.m_blockPoint.x, this.m_blockPoint.y), null == i.parent && this.addChild(i);
        }
    };
    SceneMoveBg.prototype.checkSceneBlocks = function (t, e) {
        var i = SceneManager.ins.cam2, n = Math.floor(t / PathManager.IMG_WH), s = Math.floor(e / PathManager.IMG_WH), a = Math.floor((t + PathManager.IMG_WH) / PathManager.IMG_WH), o = Math.floor(e / PathManager.IMG_WH), r = Math.floor((t + PathManager.IMG_WH) / PathManager.IMG_WH), h = Math.floor((e + PathManager.IMG_WH) / PathManager.IMG_WH), l = Math.floor(t / PathManager.IMG_WH), c = Math.floor((e + PathManager.IMG_WH) / PathManager.IMG_WH), u = Math.max(i.left / PathManager.IMG_WH - 1, 0), p = Math.max(i.top / PathManager.IMG_WH - 1, 0), d = Math.min(Math.ceil(i.right / PathManager.IMG_WH), this.m_maxCell), g = Math.min(Math.ceil(i.bottom / PathManager.IMG_WH), this.m_maxRow);
        return (u > n || n > d || p > s || s > g || this.m_sceneBgVO.types[1e4 * n + s] && 2 == this.m_sceneBgVO.types[1e4 * n + s]) && (u > a || a > d || p > o || o > g || this.m_sceneBgVO.types[1e4 * a + o] && 2 == this.m_sceneBgVO.types[1e4 * a + o]) && (u > r || r > d || p > h || h > g || this.m_sceneBgVO.types[1e4 * r + h] && 2 == this.m_sceneBgVO.types[1e4 * r + h]) && (u > l || l > d || p > c || c > g || this.m_sceneBgVO.types[1e4 * l + c] && 2 == this.m_sceneBgVO.types[1e4 * l + c]) ? !0 : !1;
    };
    SceneMoveBg.prototype.getblockPoint = function (t, e, i, n) {
        return this.m_blockPoint || (this.m_blockPoint = new Laya.Point), this.m_blockPoint.x = i > PathManager.IMG_WH * (t + 1) ? i - PathManager.IMG_WH * this.m_maxCellMove : i, this.m_blockPoint.y = n > PathManager.IMG_WH * (e + 1) ? n - PathManager.IMG_WH * this.m_maxRowMove : n, this.m_blockPoint;
    };
    return SceneMoveBg;
}(SceneBg));
//# sourceMappingURL=SceneMoveBg.js.map