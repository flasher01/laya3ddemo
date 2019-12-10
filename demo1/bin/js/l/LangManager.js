var LangManager = /** @class */ (function () {
    function LangManager() {
        this._ar = [];
    }
    Object.defineProperty(LangManager, "ins", {
        get: function () {
            return this.m_i || (this.m_i = new LangManager());
        },
        enumerable: true,
        configurable: true
    });
    LangManager.prototype.Load = function (t) {
        Laya.loader.load(t, Laya.Handler.create(this, this.onllh, [t]), null, null, LoadPriority.Level1);
    };
    LangManager.prototype.onllh = function (t) {
        var e = Laya.loader.getRes(t);
        if (null == e)
            return Log.e("onLangLoadHandler error:" + t), void 0;
        for (var i, n, s, a, o = e.split("\r\n"), r = 0; r < o.length; r++)
            a = o[r], s = a.indexOf("="), s > 0 && (i = a.substr(0, s), n = a.substr(s + 1, a.length - s - 1), -1 != n.indexOf("/n") && (n = n.replace(/\/n/g, "\n")), this.addV(i, n));
        Laya.loader.clearRes(t);
    };
    LangManager.prototype.v = function (t) {
        var e = this._ar[t];
        return null == e ? (Log.e("Can not find Lang: " + t), "") : e;
    };
    LangManager.prototype.haveV = function (t) {
        return this._ar[t] ? !0 : !1;
    };
    LangManager.prototype.addV = function (t, e) {
        null != this._ar[t] && Log.e("Lang add value duplicate " + t), this._ar[t] = e;
    };
    LangManager.prototype.initNoticeSet = function () {
        if (!Define.syParams.noticeSet)
            return Log.e("noticeSet error:"), void 0;
        var t, e, i, n = Define.syParams.noticeSet.split(";");
        for (var s in n)
            if (n.hasOwnProperty(s)) {
                var a = n[s];
                if (t = a.split(":"), e = t[1].split(","), this.nData || (this.nData = {}), 0 == Number(t[0])) {
                    for (var o in e)
                        if (e.hasOwnProperty(o)) {
                            var r = e[o];
                            i = r.split("|"), this.nData[t[0] + "_" + i[0]] = i[1];
                        }
                }
                else if (1 == Number(t[0])) {
                    for (var o in e)
                        if (e.hasOwnProperty(o)) {
                            var r = e[o];
                            if (i = r.split("|"), -1 != i[0].indexOf("_")) {
                                var h = i[0].split("_");
                                this.nData[t[0] + "_" + h[0]] || (this.nData[t[0] + "_" + h[0]] = {}), this.nData[t[0] + "_" + h[0]] = {
                                    hz: h[1],
                                    time: i[1]
                                };
                            }
                        }
                }
                else
                    2 == Number(t[0]) && (this.nData[t[0]] = t[1]);
            }
        this.getNotice();
    };
    LangManager.prototype.getNotice = function () {
        var t = String(.001 * (new Date).getTime() >> 0), e = PathDefine.CFG + "notice";
        if (!this.nData)
            return e + ".txt?v=" + t;
        if (this.nData["1_" + Define.syLoginType])
            return this.ntime = this.nData["1_" + Define.syLoginType].time, e + "_" + this.nData["1_" + Define.syLoginType].hz + ".txt?v=" + t;
        var i = GameModel.environment;
        this.ntime = this.nData["0_" + i.platformId];
        var n = i.platformId;
        return this.ntime || (this.ntime = this.nData["0_" + i.channel], n = i.channel), this.ntime ? e + "_" + n + ".txt?v=" + t : (this.ntime = this.nData["0_default"], e + ".txt?v=" + t);
    };
    LangManager.prototype.isAutoNotice = function () {
        var t = SceneManager.ins._svo, e = Number(Laya.LocalStorage.getItem((t ? t.guid : "0") + "noticeDate")), i = ServerDB.defaultS;
        return i && 1 == i.status && 0 == ServerDB.roles.length ? !1 : e < Number(this.ntime) ? !0 : void 0;
    };
    LangManager.prototype.setSave = function () {
        var t = SceneManager.ins._svo;
        Laya.LocalStorage.setItem((t ? t.guid : "0") + "noticeDate", this.ntime);
    };
    return LangManager;
}());
//# sourceMappingURL=LangManager.js.map