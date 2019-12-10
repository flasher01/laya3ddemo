var wanbaDefine;
!function (t) {
    function e() {
        var e = GameModel.environment, i = window.OPEN_DATA;
        i && (t.platform = i.platform, t.pf = i.pf, t.appid = i.appid, t.openid = i.openid, t.openkey = i.openkey, t.via = i.via, t.quaobject = i.qua, t.isQQVip = "QQVip" == i.channel), t.app = e.params.app, t.qua = e.params.qua, e.params.GIFT && (t.gift = e.params.GIFT), e.params.hasOwnProperty("isfrompet") && (t.isfrompet = 0 == parseInt(e.params.isfrompet)), e.userId = t.openid;
    }
    function i(t) {
        t && 0 == t.retCode && WanbaManager.instance.sendShare();
    }
    function n(t) {
        t && 0 == t.result && WanbaManager.instance.sendCollect();
    }
    function s(t) {
        return window.mqq && window.mqq.data && window.mqq.data.canIShow ? window.mqq.data.canIShow(t) : !1;
    }
    t.isfrompet = !1, t.isQQVip = !1, t.init = e, t.shareGameResult = i, t.shortcutResult = n, t.canShow = s;
}(wanbaDefine || (wanbaDefine = {}));
//# sourceMappingURL=wanbaDefine.js.map