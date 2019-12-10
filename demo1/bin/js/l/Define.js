var Define;
!function (t) {
    function e() {
        return 103 == t.syLoginType;
    }
    function i() {
        return 104 == t.syLoginType;
    }
    function n() {
        return e() || i();
    }
    t.isWyw = !1, t.protocol = "https:", t.isVIVO = e, t.isOPPO = i, t.isVO = n;
}(Define || (Define = {}));
//# sourceMappingURL=Define.js.map