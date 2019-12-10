/*
 * @Author: LiJun
 * @Date: 2018-10-23 15:41:47
 * @Last Modified by: LiJun
 * @Last Modified time: 2019-06-03 12:09:32
 */
/*
* name;
*/
var RESManager = /** @class */ (function () {
    function RESManager() {
        this.map = {};
        this.loadQueue = [];
        this.ref0List = [];
    }
    Object.defineProperty(RESManager, "instance", {
        get: function () {
            return RESManager._instance || (RESManager._instance = new RESManager), RESManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    RESManager.prototype.refRes = function (t) {
        var e = this.map[t];
        if (e) {
            if (e.inDList) {
                var i = this.ref0List.indexOf(e);
                e.inDList = !1, this.ref0List.splice(i, 1);
            }
        }
        else
            e = RESObj.create(), e && (e.val = t, this.map[t] = e, this.loadQueue.push(e), this.loadNext());
        e && e.refCount++;
        return e;
    };
    RESManager.prototype.reduceRes = function (t) {
        var e = this.map[t];
        return e && (e.refCount--,
            e.refCount <= 0 && (e.inDList || (e.ref0Time = DateUtils.getTimer(),
                e.inDList = !0,
                this.ref0List.push(e)))), e;
    };
    RESManager.prototype.onLoaded = function () {
        this.loadingRes = null, this.loadNext();
    };
    RESManager.prototype.loadNext = function () {
        if (!this.loadingRes && this.loadQueue.length)
            for (; this.loadQueue.length;) {
                var t = this.loadQueue.shift();
                if (t) {
                    this.loadingRes = t,
                        t.startLoad();
                    break;
                }
            }
    };
    RESManager.prototype.checkDestory = function () {
        var t = this, e = t.ref0List.length, o = !1;
        if (e > 0) {
            var i = e; //Math.ceil(e / 4);
            i > 25 && (i = 25);
            for (var n = 0; i > n; n++) {
                var a = t.ref0List[n];
                if (a) {
                    var r = DateUtils.getTimer() - a.ref0Time;
                    r > 1e4 &&
                        (a.inDList = !1, 0 == a.refCount && (t.destoryRes(a), t.ref0List[n] = null, o = !0));
                }
            }
            // o && ArrayUtils.cleannull(t.ref0List)
        }
    };
    RESManager.prototype.checkDestory1 = function () {
        var t = this, e = t.ref0List.length, o = !1;
        if (e > 0) {
            var i = e; //Math.ceil(e / 4);
            i > 25 && (i = 25);
            for (var n = 0; i > n; n++) {
                var a = t.ref0List[n];
                if (a) {
                    var r = DateUtils.getTimer() - a.ref0Time;
                    r > 3e4 && (a.inDList = !1, 0 == a.refCount && (t.destoryRes(a), t.ref0List[n] = null, o = !0));
                }
            }
            // o && ArrayUtils.cleannull(t.ref0List)
        }
    };
    RESManager.prototype.destoryRes = function (t) {
        if (t !== this.loadingRes) {
            if (delete this.map[t.val], false == t.isLoading) {
                var e = this.loadQueue.indexOf(t);
                e >= 0 && this.loadQueue.splice(e, 1);
            }
            t.dispose();
        }
    };
    return RESManager;
}());
//# sourceMappingURL=RESManager.js.map