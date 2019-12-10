var ListenerVector = /** @class */ (function () {
    function ListenerVector() {
        this.idx = -1;
        this.cal = [];
        this.thi = [];
    }
    ListenerVector.prototype.push = function (t, e) {
        var i = this.getIdx(t, e);
        if (-1 == i) {
            if (this.cal.length != this.thi.length || this.cal.indexOf(t) >= 0 && this.thi.indexOf(e) >= 0) {
                console.log("监听添加异常");
            }
            this.cal.push(t);
            this.thi.push(e);
        }
    };
    ListenerVector.prototype.remove = function (t, e) {
        var i = this.getIdx(t, e);
        var bool;
        if (-1 != i) {
            this.cal.splice(i, 1);
            this.thi.splice(i, 1);
            this.idx > 0 && this.idx > i && this.idx--;
            bool = true;
        }
        else {
            if (this.cal.indexOf(t) >= 0 && this.thi.indexOf(e) >= 0) {
                console.log("监听移除异常");
            }
            bool = false;
        }
        return bool;
    };
    ListenerVector.prototype.getIdx = function (t, e) {
        for (var i = this.cal, n = this.thi, s = i.length - 1; s >= 0; s--)
            if (i[s] == t && n[s] == e)
                return s;
        return -1;
    };
    ListenerVector.prototype.dis = function (t, e, i) {
        var n = this.cal, s = this.thi;
        for (this.idx = n.length - 1; this.idx >= 0; this.idx--) {
            n[this.idx].call(s[this.idx], t, e, i);
        }
    };
    ListenerVector.prototype.destroy = function () {
        this.cal.length = 0;
        this.thi.length = 0;
        this.idx = -1;
    };
    ListenerVector.frees = [];
    return ListenerVector;
}());
//# sourceMappingURL=ListenerVector.js.map