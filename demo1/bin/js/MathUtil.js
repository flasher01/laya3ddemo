var MathUtil = /** @class */ (function () {
    function MathUtil() {
    }
    MathUtil.POINT = new Laya.Point;
    MathUtil.MATRIX = new Laya.Matrix;
    MathUtil.DAY = 86400000;
    MathUtil.HOUR = 3600000;
    MathUtil.MINUTE = 60000;
    MathUtil.SECOND = 1000;
    MathUtil.CONST1 = 57.2958;
    MathUtil.monstrLv = [];
    MathUtil.t = e;
    MathUtil.t1 = i;
    MathUtil.t2 = n;
    MathUtil.t3 = s;
    MathUtil.t4 = a;
    MathUtil.t5 = o;
    MathUtil.t6 = r;
    MathUtil.t7 = h;
    MathUtil.t8 = l;
    MathUtil.t9 = c;
    MathUtil.t10 = u;
    MathUtil.t11 = p;
    MathUtil.t12 = d;
    MathUtil.t13 = g;
    MathUtil.t14 = f;
    MathUtil.getTimeStr = m;
    MathUtil.getTimeStr2 = y;
    MathUtil.getTwoTimeSub = v;
    MathUtil.compareTimes = _;
    MathUtil.compareTimes1 = T;
    MathUtil.GetTimePars = I;
    MathUtil.IsInRange = M;
    MathUtil.GetDistance = C;
    MathUtil.GetSceneDistance = b;
    MathUtil.trimLeft = S;
    MathUtil.trimRight = L;
    MathUtil.trimStr = P;
    MathUtil.subStr = w;
    MathUtil.getColorByLevel = x;
    MathUtil.getTipsColorByLevel = A;
    MathUtil.getCopyColorByGate = D;
    MathUtil.getSceneColorByLevel = k;
    MathUtil.getSymbolColor = O;
    MathUtil.getXSTaskQualityColor = B;
    MathUtil.getMonsterColor = N;
    MathUtil.getMonsterSceneColor = E;
    MathUtil.getGoodsName = R;
    MathUtil.getGoodsArrByStr = H;
    MathUtil.drawSector = U;
    MathUtil.drawMaskSector = F;
    MathUtil.roundDecimalToPlace = j;
    MathUtil.randRange = G;
    MathUtil.transformCoords = V;
    MathUtil.getRadian = W;
    MathUtil.getAngle = q;
    MathUtil.getPointAngle = Y;
    MathUtil.radian2angle = Z;
    MathUtil.angle2radian = X;
    MathUtil.get3DAngle = J;
    MathUtil.getBezierPoints = K;
    MathUtil.getPixelDistance = z;
    MathUtil.getColorFilters = Q;
    MathUtil.getColorFilters1 = $;
    MathUtil.getColorFilters2 = te;
    MathUtil.linearModel = ee;
    MathUtil.getStringLength = ie;
    MathUtil.substr = ne;
    return MathUtil;
}());
function e(e, i) {
    void 0 === i && (i = -1);
    var n = "", s = 0;
    return e >= MathUtil.DAY && (n += Math.floor(e / MathUtil.DAY) + "天", e %= MathUtil.DAY, s++), e >= MathUtil.HOUR && (-1 == i || i > s) && (n += Math.floor(e / MathUtil.HOUR) + "时", e %= MathUtil.HOUR, s++), e >= MathUtil.MINUTE && (-1 == i || i > s) && (n += Math.floor(e / MathUtil.MINUTE) + "分", e %= MathUtil.MINUTE, s++), e >= 1e3 && (-1 == i || i > s) ? (n += Math.floor(e / MathUtil.SECOND) + "秒", s++) : (-1 == i || i > s) && ("" == n && (n += "0秒"), s++), n;
}
function i(e, i) {
    void 0 === i && (i = -1);
    var n = "", s = 0;
    return e >= MathUtil.DAY && (n += Math.floor(e / MathUtil.DAY) + "天", e %= MathUtil.DAY, s++), e >= MathUtil.HOUR && (-1 == i || i > s) && (n += Math.floor(e / MathUtil.HOUR) + "时", e %= MathUtil.HOUR, s++), e >= MathUtil.MINUTE && (-1 == i || i > s) && (n += Math.floor(e / MathUtil.MINUTE) + "分", e %= MathUtil.MINUTE, s++), n;
}
function n(e) {
    var i = "";
    return e >= MathUtil.DAY && (i = i + MathUtil.GetTimePars(Math.floor(e / MathUtil.DAY)) + ":", e %= MathUtil.DAY), e >= MathUtil.HOUR ? (i = i + MathUtil.GetTimePars(Math.floor(e / MathUtil.HOUR)) + ":", e %= MathUtil.HOUR) : i.length && (i += "00:"), e >= MathUtil.MINUTE ? (i = i + MathUtil.GetTimePars(Math.floor(e / MathUtil.MINUTE)) + ":", e %= MathUtil.MINUTE) : i += "00:", i += e >= MathUtil.SECOND ? MathUtil.GetTimePars(Math.floor(e / MathUtil.SECOND)) : "00";
}
function s(e) {
    var i = "";
    return i += e < MathUtil.MINUTE ? Math.floor(e / 1e3) + "秒" : e < MathUtil.HOUR ? Math.floor(e / MathUtil.MINUTE) + "分" : e < MathUtil.DAY ? Math.floor(e / MathUtil.HOUR) + "时" : Math.floor(e / MathUtil.DAY) + "天";
}
function a(e) {
    var i = "";
    return e >= MathUtil.HOUR ? (i = i + MathUtil.GetTimePars(Math.floor(e / MathUtil.HOUR)) + ":", e %= MathUtil.HOUR) : i += "00:", e >= MathUtil.MINUTE ? (i = i + MathUtil.GetTimePars(Math.floor(e / MathUtil.MINUTE)) + ":", e %= MathUtil.MINUTE) : i += "00:", i += e >= 1e3 ? MathUtil.GetTimePars(Math.floor(e / MathUtil.SECOND)) : "00";
}
function o(e) {
    var i = new Date(e), n = "";
    return n += MathUtil.GetTimePars(i.getHours()), n = n + ":" + MathUtil.GetTimePars(i.getMinutes()), n = n + ":" + MathUtil.GetTimePars(i.getSeconds());
}
function r(e, i, n, s, a) {
    void 0 === i && (i = !1), void 0 === n && (n = !0), void 0 === s && (s = !0), void 0 === a && (a = !0);
    var o = new Date(e), r = "";
    return s ? (r += MathUtil.GetTimePars(o.getFullYear()), r = r + (i ? "-" : "年") + MathUtil.GetTimePars(o.getMonth() + 1)) : r += MathUtil.GetTimePars(o.getMonth() + 1), r = r + (i ? "-" : "月") + MathUtil.GetTimePars(o.getDate()), n ? (r = r + (i ? "  " : "日  ") + MathUtil.GetTimePars(o.getHours()), r = r + ":" + MathUtil.GetTimePars(o.getMinutes()), a && (r = r + ":" + MathUtil.GetTimePars(o.getSeconds()))) : r += i ? "  " : "日  ", r;
}
function h(t, e, i, n, s, a, o) {
    void 0 === n && (n = 0), void 0 === s && (s = ""), void 0 === a && (a = 0), void 0 === o && (o = "");
    {
        var r = new Date(t);
        r.getDay();
    }
    e || (e = "0");
    var h, l, c, u, p, d, g, f, m, y = e.split(";"), v = y.length;
    for (m = 0; v > m && ("" == y[m] || (l = y[m].split("["), c = String(l[l.length - 1]).split("]")[0], u = c.split("-"), p = u[0], d = u[1], g = p.split(":"), f = d.split(":"), h = this.compareTimes(r, p, d, i), 2 != h)); m++)
        ;
    if (2 != h)
        return null;
    var _ = Number(g[0]), T = Number(g[1]), I = (Number(f[0]), Number(f[1]), new Date(t));
    return I.setHours(_, T, 0, 0), [I, h];
}
function l(e, i) {
    void 0 === i && (i = !1);
    var n = new Date(e), s = "";
    return s += MathUtil.GetTimePars(n.getFullYear()), s = s + (i ? "-" : "年") + MathUtil.GetTimePars(n.getMonth() + 1), s = s + (i ? "-" : "月") + MathUtil.GetTimePars(n.getDate()), s += i ? "" : "日";
}
function c(e) {
    var i = "";
    return e >= MathUtil.MINUTE ? (i = i + MathUtil.GetTimePars(Math.floor(e / MathUtil.MINUTE)) + ":", e %= MathUtil.MINUTE) : i += "00:", i += e >= 1e3 ? MathUtil.GetTimePars(Math.floor(e / MathUtil.SECOND)) : "00";
}
function u(e, i) {
    void 0 === i && (i = -1);
    var n = "", s = 0;
    if (e >= MathUtil.DAY && (n += Math.floor(e / MathUtil.DAY) + "天", e %= MathUtil.DAY, s++), e >= MathUtil.HOUR && (-1 == i || i > s) && (n += Math.floor(e / MathUtil.HOUR) + "时", e %= MathUtil.HOUR, s++, 2 == s))
        return n;
    if (e >= MathUtil.MINUTE && (-1 == i || i > s) && (n += Math.floor(e / MathUtil.MINUTE) + "分", e %= MathUtil.MINUTE, s++), e >= 1e3 && (-1 == i || i > s)) {
        if (n += Math.floor(e / MathUtil.SECOND) + "秒", s++, 3 == s)
            return n;
    }
    else
        (-1 == i || i > s) && ("" == n && (n += "0秒"), s++);
    return n;
}
function p(e) {
    var i = "";
    return e >= MathUtil.DAY ? (i += Math.floor(e / MathUtil.DAY) + "天", e %= MathUtil.DAY, i) : (e >= MathUtil.HOUR ? (i = i + MathUtil.GetTimePars(Math.floor(e / MathUtil.HOUR)) + ":", e %= MathUtil.HOUR) : i.length && (i += "00:"), e >= MathUtil.MINUTE ? (i = i + MathUtil.GetTimePars(Math.floor(e / MathUtil.MINUTE)) + ":", e %= MathUtil.MINUTE) : i += "00:", i += e >= MathUtil.SECOND ? MathUtil.GetTimePars(Math.floor(e / MathUtil.SECOND)) : "00");
}
function d(e) {
    var i = new Date(e), n = "";
    return n += MathUtil.GetTimePars(i.getHours()), n = n + ":" + MathUtil.GetTimePars(i.getMinutes());
}
function g(t) {
    void 0 === t && (t = !1);
    var e = new Date, i = "-", n = String(e.getFullYear()), s = String(e.getMonth() + 1), a = String(e.getDate());
    Number(s) >= 1 && Number(s) <= 9 && (s = "0" + s), Number(a) >= 0 && Number(a) <= 9 && (a = "0" + a);
    var o = "";
    return o = t ? n + "年" + s + "月" + a + "日" : n + i + s + i + a;
}
function f(e, i, n, s, a) {
    void 0 === i && (i = !1), void 0 === n && (n = !0), void 0 === s && (s = !0), void 0 === a && (a = !0);
    var o = new Date(e), r = "";
    return s ? (r += MathUtil.GetTimePars(o.getFullYear()), r = r + (i ? "." : "年") + MathUtil.GetTimePars(o.getMonth() + 1)) : r += MathUtil.GetTimePars(o.getMonth() + 1), r = r + (i ? "." : "月") + MathUtil.GetTimePars(o.getDate()), n ? (r = r + (i ? " " : "日  ") + MathUtil.GetTimePars(o.getHours()), r = r + ":" + MathUtil.GetTimePars(o.getMinutes()), a && (r = r + ":" + MathUtil.GetTimePars(o.getSeconds()))) : r += i ? "  " : "日  ", r;
}
function m(t, e, i, n, s) {
    void 0 === e && (e = ""), void 0 === i && (i = !1), void 0 === n && (n = "#00ff00"), void 0 === s && (s = "#000000");
    var a, o, r, h, l = t.split(";"), c = l.length, u = 0;
    for (a = 0; c > a; a++)
        if ("" != l[a]) {
            o = l[a].split("["), r = String(o[o.length - 1]).split("]")[0];
            var p = o[o.length - 2], d = p.split("]")[0];
            if ("*" != d) {
                var g = d.split(",");
                if (g.length >= 7 && 0 == a)
                    h = "<span color='" + s + "'>" + LangManager.ins.v("Main_8") + "</span>" + (i ? "<br/>" : "");
                else if (g.length < 7 && 0 == a) {
                    h = e ? StringUtils.f(LangManager.ins.v("Main_20"), e, r) + StringUtils.f(LangManager.ins.v("Main_22"), s) : StringUtils.f(LangManager.ins.v(i ? "Main_23" : "Main_22"), s);
                    var f = 0, m = 0, y = 0, v = !0;
                    for (var _ in g)
                        if (g.hasOwnProperty(_)) {
                            {
                                g[_];
                            }
                            if ("" == g[_])
                                continue;
                            if (f + 1 != Number(g[_].substr(1))) {
                                v = !1;
                                break;
                            }
                            0 == f && (m = Number(g[_].substr(1))), f = Number(g[_].substr(1)), y = f;
                        }
                    if (v)
                        h = StringUtils.f(LangManager.ins.v("Main_24"), LangManager.ins.v("Main_" + m), LangManager.ins.v("Main_" + y), s) + (i ? "<br/>" : "");
                    else {
                        u = 0;
                        for (var _ in g)
                            if (g.hasOwnProperty(_)) {
                                if ("" == g[_])
                                    continue;
                                f = Number(g[_].substr(1)), g.length > u + 1 && "" == g[u + 1] && u++, h += "<span color='" + s + "'>" + LangManager.ins.v("Main_" + f) + (u == g.length - 1 ? i ? "</span><br/>" : "</span>   " : "、</span>"), u++;
                            }
                    }
                }
                h += "<span color='" + n + "'>" + r + (a == c - 1 ? "" : ";") + "</span>" + (i ? a == c - 1 ? "" : "<br/>" : "");
            }
        }
    return h;
}
function y(t, e, i, n) {
    void 0 === e && (e = ""), void 0 === i && (i = !1), void 0 === n && (n = "#00ff00");
    var s, a, o, r = t.split(";"), h = r.length, l = "", c = 0;
    for (s = 0; h > s; s++)
        if ("" != r[s]) {
            a = r[s].split("["), o = String(a[a.length - 1]).split("]")[0];
            var u = a[a.length - 2], p = u.split("]")[0];
            if ("*" != p) {
                var d = p.split(",");
                if (d.length < 7 && 0 == s) {
                    l = e ? StringUtils.f(LangManager.ins.v("Main_20"), e, o) + LangManager.ins.v("Main_22") : LangManager.ins.v(i ? "Main_23" : "Main_22");
                    var g = 0, f = 0, m = 0, y = !0;
                    for (var v in d)
                        if (d.hasOwnProperty(v)) {
                            {
                                d[v];
                            }
                            if ("" == d[v])
                                continue;
                            if (g + 1 != Number(d[v].substr(1))) {
                                y = !1;
                                break;
                            }
                            0 == g && (f = Number(d[v].substr(1))), g = Number(d[v].substr(1)), m = g;
                        }
                    if (y)
                        l = StringUtils.f(LangManager.ins.v("Main_24"), LangManager.ins.v("Main_" + f), LangManager.ins.v("Main_" + m)) + (i ? "<br/>" : "");
                    else {
                        c = 0;
                        for (var v in d)
                            if (d.hasOwnProperty(v)) {
                                if ("" == d[v])
                                    continue;
                                g = Number(d[v].substr(1)), d.length > c + 1 && "" == d[c + 1] && c++, l += "<span color='#000000'>" + LangManager.ins.v("Main_" + g) + (c == d.length - 1 ? i ? "</span><br/>" : "</span>   " : "、</span>"), c++;
                            }
                    }
                }
                l += "<span color='" + n + "'>" + o + (s == h - 1 ? "" : ";") + "</span>" + (i ? s == h - 1 ? "" : "<br/>" : "");
            }
        }
    return l;
}
function v(t, e, i, n, s, a) {
    return void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === n && (n = 0), void 0 === s && (s = 0), void 0 === a && (a = 0), 1e3 * (60 * (60 * (n - t) + (s - e)) + (a - i));
}
function _(t, e, i, n) {
    void 0 === n && (n = 0);
    var s = e.split(":"), a = i.split(":"), o = GameModel.serverInfo.getUTC(), r = t.getHours() + o;
    0 > r ? r = 24 + r : r > 24 && (r -= 24);
    var h = t.getMinutes();
    if (0 == Number(s[1]) && 0 != n && r == Number(s[0]) - 1) {
        if (60 - n > h)
            return 1;
        if (h >= 60 - n)
            return 2;
    }
    if (r < Number(s[0]))
        return 1;
    if (r > Number(a[0]))
        return 0;
    if (r == Number(s[0])) {
        if (h < Number(s[1]) - n)
            return 1;
        if (h >= Number(s[1]) - n) {
            if (r < Number(a[0]))
                return 2;
            if (r == Number(a[0]) && h < Number(a[1]))
                return 2;
        }
    }
    return r == Number(a[0]) && h < Number(a[1]) ? 2 : r > Number(s[0]) && r < Number(a[0]) ? 2 : 0;
}
function T(t, e) {
    var i = new Date(e), n = i.getTime() - t;
    return n > 0 ? !1 : !0;
}
function I(t) {
    void 0 === t && (t = 0);
    var e = "";
    return e = 10 > t ? "0" + t : "" + t;
}
function M(t, e, i, n, s) {
    return void 0 === s && (s = 0), Math.abs(e - n) > t || Math.abs(i - s) > t ? !1 : !0;
}
function C(t, e, i, n) {
    return i -= t, n -= e, Math.sqrt(i * i + n * n);
}
function b(t, e, i, n) {
    return i -= t, n -= e, Math.sqrt(i * i + n * n * 4);
}
function S(t) {
    for (var e, i = 0; i < MathUtil.length && (e = t.charAt(i), " " == e || "\n" == e || "\r" == e);)
        i++;
    return t.substr(i);
}
function L(t) {
    for (var e, i = MathUtil.length - 1; i >= 0 && (e = t.charAt(i), " " == e || "\n" == e || "\r" == e);)
        i--;
    return t.substring(0, i + 1);
}
function P(t) {
    if (!t)
        return "";
    for (var e, i = MathUtil.length, n = 0; i > n; n++)
        e = t.charAt(n), (" " == e || "\n" == e || "\r" == e) && (t = t.substring(0, n) + t.substring(n + 1, i), i--, n--);
    return t;
}
function w(t, e) {
    void 0 === e && (e = 0);
    for (var i = ""; MathUtil.length > e;) {
        for (var n = 0, s = 0, a = 0; e > a && (s = t.charCodeAt(a), n += 127 > s ? 1 : 2, !(n >= e)); a++)
            ;
        i += MathUtil.substr(0, a) + "&#10;", t = MathUtil.substr(a, MathUtil.length);
    }
    return i += "&#10;" + t;
}
function x(t) {
    var e = "#FFFFFF";
    switch (t) {
        case 0:
            e = "#FFFFFF";
            break;
        case 1:
            e = "#008600";
            break;
        case 2:
            e = "#003cff";
            break;
        case 3:
            e = "#b20ee8";
            break;
        case 4:
            e = "#f2730c";
            break;
        case 5:
            e = "#ff0000";
            break;
        case 6:
            e = "#ff3c93";
            break;
        case 7:
            e = "#ff3c93";
    }
    return e;
}
function A(t) {
    var e = "#FFFFFF";
    switch (t) {
        case 0:
            e = "#FFFFFF";
            break;
        case 1:
            e = "#74f05f";
            break;
        case 2:
            e = "#29d4ff";
            break;
        case 3:
            e = "#fa6eff";
            break;
        case 4:
            e = "#ffca28";
            break;
        case 5:
            e = "#ff0000";
            break;
        case 6:
            e = "#ff8c8c";
            break;
        case 7:
            e = "#ff8c8c";
    }
    return e;
}
function D(t) {
    var e = "#FFFFFF";
    switch (t) {
        case 0:
            e = "#FFFFFF";
            break;
        case 1:
            e = "#FFFFFF";
            break;
        case 2:
            e = "#008600";
            break;
        case 3:
            e = "#1fa3ff";
            break;
        case 4:
            e = "#ff6d02";
            break;
        case 5:
            e = "#dd00fe";
            break;
        case 6:
            e = "#fe0000";
    }
    return e;
}
function k(t) {
    var e = "#FFFFFF";
    switch (t) {
        case 0:
            e = "#FFFFFF";
            break;
        case 1:
            e = "#74f05f";
            break;
        case 2:
            e = "#29d4ff";
            break;
        case 3:
            e = "#fa6eff";
            break;
        case 4:
            e = "#ffca28";
            break;
        case 5:
            e = "#f95252";
            break;
        case 6:
            e = "#ff3c93";
            break;
        case 7:
            e = "#ff3c93";
    }
    return e;
}
function O(t) {
    var e = "#FFFFFF";
    switch (t) {
        case 0:
            e = "#000000";
            break;
        case 1:
            e = "#008600";
            break;
        case 2:
            e = "#003cff";
            break;
        case 3:
            e = "#b20ee8";
            break;
        case 4:
            e = "#f2730c";
            break;
        case 5:
            e = "#ff0000";
    }
    return e;
}
function B(t) {
    var e = "#FFFFFF";
    switch (t) {
        case 0:
            e = "#ffffff";
            break;
        case 1:
            e = "#ffffff";
            break;
        case 2:
            e = "#44d627";
            break;
        case 3:
            e = "#00d2ff";
            break;
        case 4:
            e = "#c63dff";
            break;
        case 5:
            e = "#ff6000";
    }
    return e;
}
function N(e, i) {
    MathUtil.monstrLv || (MathUtil.monstrLv = GlobalVO.getGlobalVO(1078).value.split(":")), MathUtil.monstrLv.length <= 4 && (MathUtil.monstrLv = ["-5", "5", "10", "20", "99"]);
    var n;
    return i - e <= Number(MathUtil.monstrLv[0]) ? n = "#585858" : i - e < Number(MathUtil.monstrLv[1]) && i - e > Number(MathUtil.monstrLv[0]) ? n = "#ffffff" : i - e <= Number(MathUtil.monstrLv[2]) && i - e >= Number(MathUtil.monstrLv[1]) ? n = "#0a8900" : i - e < Number(MathUtil.monstrLv[3]) && i - e > Number(MathUtil.monstrLv[2]) ? n = "#ff7800" : i - e < Number(MathUtil.monstrLv[4]) && i - e >= Number(MathUtil.monstrLv[3]) && (n = "#ff0000"), n;
}
function E(e, i) {
    MathUtil.monstrLv || (MathUtil.monstrLv = GlobalVO.getGlobalVO(1078).value.split(":")), MathUtil.monstrLv.length <= 4 && (MathUtil.monstrLv = ["-5", "5", "10", "20", "99"]);
    var n;
    return i - e <= Number(MathUtil.monstrLv[0]) ? n = "#c0c0c0" : i - e < Number(MathUtil.monstrLv[1]) && i - e > Number(MathUtil.monstrLv[0]) ? n = "#ffffff" : i - e <= Number(MathUtil.monstrLv[2]) && i - e >= Number(MathUtil.monstrLv[1]) ? n = "#09dc13" : i - e < Number(MathUtil.monstrLv[3]) && i - e > Number(MathUtil.monstrLv[2]) ? n = "#ff811c" : i - e < Number(MathUtil.monstrLv[4]) && i - e >= Number(MathUtil.monstrLv[3]) && (n = "#ff2a07"), n;
}
function R(t) {
    return "<span color='" + this.getColorByLevel(MathUtil.rarelevel) + "'>" + MathUtil.name + "</span>";
}
function H(t) {
    for (var e, i, n = [], s = t.split(";"), a = 0; a < s.length; a++)
        i = s[a].split(":"), i && (e = GoodsTem.getGoodsTem(i[0]), e || (e = EquipTem.getEquipTem(i[0])), n.push({
            id: i[0],
            name: e.name,
            count: i[1],
            goodsTem: e
        }));
    return n;
}
function U(t, e, i, n, s, a, o, r) {
    void 0 === e && (e = 100), void 0 === i && (i = 100), void 0 === n && (n = 100), void 0 === o && (o = "#ff0000"), void 0 === r && (r = "#ff0000"), MathUtil.graphics.clear(), MathUtil.graphics.drawPie(e, i, n, s, a, o, r), MathUtil.graphics.save();
}
function F(t, e, i, n, s, a, o, r) {
    void 0 === e && (e = 100), void 0 === i && (i = 100), void 0 === n && (n = 100), void 0 === o && (o = "#ff0000"), void 0 === r && (r = "#ff0000"), MathUtil.graphics.clear(), a > 360 ? (MathUtil.graphics.drawPie(e, i, n, s, 360, o, r), MathUtil.graphics.drawPie(e, i, n, 0, a % 360, o, r)) : MathUtil.graphics.drawPie(e, i, n, s, a, o, r), MathUtil.graphics.save();
}
function j(t, e) {
    void 0 === e && (e = 0);
    var i = Math.pow(10, e);
    return Math.round(t * i) / i;
}
function G(t, e) {
    return void 0 === e && (e = 0), Math.floor(Math.random() * (1 + e - t) + t);
}
function V(e, i, n, s, a) {
    return void 0 === s && (s = 1), void 0 === a && (a = 1), MathUtil.MATRIX.identity(), (1 != s || 1 != a) && MathUtil.MATRIX.scale(s, a), 0 != n && MathUtil.MATRIX.rotate(n), MathUtil.POINMathUtil.x = MathUtil.MATRIX.a * e + MathUtil.MATRIX.c * i + MathUtil.MATRIX.tx, MathUtil.POINMathUtil.y = MathUtil.MATRIX.d * i + MathUtil.MATRIX.b * e + MathUtil.MATRIX.ty, MathUtil.POINT;
}
function W(t, e, i, n) {
    var s = Math.atan2(n - e, i - t);
    return 0 > s && (s = 2 * Math.PI + s), s;
}
function q(t, e, i, n) {
    return 180 * this.getRadian(t, e, i, n) / Math.PI;
}
function Y(t, e) {
    return Math.atan2(e, t);
}
function Z(t) {
    return 180 * t / Math.PI;
}
function X(t) {
    return t * Math.PI / 180;
}
function J(e, i) {
    var n = MathUtil.getPointAngle(i.x - e.x, i.y - e.y) + .5 * Math.PI, s = MathUtil.radian2angle(n);
    return 0 > s ? 360 + s : s;
}
function K(t, e, i, n) {
    void 0 === i && (i = 5), void 0 === n && (n = 350);
    var s = new Array, a = new Laya.Point(e.x - t.x, e.y - t.y), o = new Laya.Point;
    o.x = .5 * (e.x + t.x), o.y = a.y < 0 ? e.y - n : t.y - n;
    for (var r = [t.x, t.y, o.x, o.y, e.x, e.y], h = Laya.Bezier.I.getBezierPoints(r, i, 2), l = null, c = h.length, u = 0; c - 1 > u; u += 2)
        l = new Laya.Point(h[u], h[u + 1]), s.push(l);
    return s;
}
function z(t, e) {
    return Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y) * 4);
}
function Q(t) {
    return void 0 === t && (t = .4), [new Laya.ColorFilter([t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 1, 0])];
}
function $() {
    return [new Laya.ColorFilter([.3086, .6094, .082, 0, 20, .3086, .6094, .082, 0, 20, .3086, .6094, .082, 0, 20, 0, 0, 0, 1, 0])];
}
function te() {
    return [new Laya.ColorFilter([.3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, 0, 0, 0, 1, 0])];
}
function ee(e, i, n, s, a, o) {
    if (e instanceof Laya.MeshSprite3D || e instanceof Laya.SkinnedMeshSprite3D) {
        var r = e.meshFilter.sharedMesh;
        if (!r.loaded)
            return;
        var h, l, c;
        r instanceof Laya.PrimitiveMesh ? (h = r._vertexBufferCount > 0 ? r._getVertexBuffer(0).getData() : null, l = r._getIndexBuffer().getData(), c = r._vertexBufferCount > 0 ? r._getVertexBuffer(0).vertexDeclaration.vertexStride / 4 : 0) : r instanceof Laya.Mesh && (h = r._vertexBuffers ? r._vertexBuffers[0].getData() : null, l = r._indexBuffer.getData(), c = r._vertexBuffers ? r._vertexBuffers[0].vertexDeclaration.vertexStride / 4 : 0);
        for (var u = 0, p = 0, d = 0; d < l.length; d += 3)
            u = 0, p = 0, s.x = h[l[d + u] * c + p++], s.y = h[l[d + u] * c + p++], s.z = h[l[d + u] * c + p++], u++, p = 0, a.x = h[l[d + u] * c + p++], a.y = h[l[d + u] * c + p++], a.z = h[l[d + u] * c + p++], u++, p = 0, o.x = h[l[d + u] * c + p++], o.y = h[l[d + u] * c + p++], o.z = h[l[d + u] * c + p++], u++, Laya.Vector3.transformCoordinate(s, e.transform.worldMatrix, s), Laya.Vector3.transformCoordinate(a, e.transform.worldMatrix, a), Laya.Vector3.transformCoordinate(o, e.transform.worldMatrix, o), i.line(s, n, a, n), i.line(a, n, o, n), i.line(o, n, s, n);
    }
    for (var d = 0, g = e._childs.length; g > d; d++)
        MathUtil.linearModel(e._childs[d], i, n, s, a, o);
}
function ie(t) {
    return null == t ? 0 : ("string" != typeof t && (t += ""), t.replace(/[^\x00-\xff]/g, "01").length);
}
function ne(t, e) {
    if (null == t)
        return "";
    if ("string" != typeof t && (t += ""), 0 >= e)
        return t;
    for (var i = 0, n = 0, s = MathUtil.length; s > n; n++)
        if (i = t.charCodeAt(n) > 127 ? i + 2 : i + 1, i >= e)
            return t.substring(0, n + 1);
    return t;
}
//# sourceMappingURL=MathUtil.js.map