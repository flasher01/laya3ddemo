var EnvironmentVO = /** @class */ (function () {
    function EnvironmentVO() {
        this.pay = "";
    }
    EnvironmentVO.prototype.isWanBaOrWYW = function () {
        return this.platformId == PlatformType.WANBA;
    };
    EnvironmentVO.prototype.isWanBa = function () {
        return this.platformId == PlatformType.WANBA && !this.isWeiXin() && !this.isWanYiWan() && !this.isXinYue();
    };
    EnvironmentVO.prototype.isWeiXin = function () {
        return this.platformId == PlatformType.WANBA && wanbaDefine.quaobject && "WX" == wanbaDefine.quaobject.app;
    };
    EnvironmentVO.prototype.isWanYiWan = function () {
        return this.platformId == PlatformType.WANBA && "wanba_ts.105" == wanbaDefine.pf;
    };
    EnvironmentVO.prototype.isXinYue = function () {
        return this.platformId == PlatformType.WANBA && wanbaDefine.quaobject && "xinYueClub" == wanbaDefine.quaobject.app;
    };
    EnvironmentVO.prototype.isXinYueSQ = function () {
        return !wanbaDefine.quaobject || "xinYueClub" != wanbaDefine.quaobject.app && "SQ" != wanbaDefine.quaobject.app ? !1 : !0;
    };
    EnvironmentVO.prototype.isQZoneOrQQHall = function () {
        return this.platformId == PlatformType.QQ;
    };
    EnvironmentVO.prototype.isDaTing = function () {
        return this.channel == PChannelType.QQGAME;
    };
    EnvironmentVO.prototype.isQZone = function () {
        return this.channel == PChannelType.QZONE;
    };
    return EnvironmentVO;
}());
//# sourceMappingURL=EnvironmentVO.js.map