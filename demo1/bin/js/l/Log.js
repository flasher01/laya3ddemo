var Log = /** @class */ (function () {
    function Log() {
    }
    Log.e = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        for (var e = [], i = 0; i < arguments.length; i++)
            e[i] = arguments[i];
        Log.ShowDebug && console.log.apply(console, ["[Error]:"].concat(e));
    };
    Log.i = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        for (var e = [], i = 0; i < arguments.length; i++)
            e[i] = arguments[i];
        Log.ShowInfo && console.log.apply(console, ["[Info]:"].concat(e));
    };
    Log.send = function (t) {
        for (var e = "vivo:", i = 0, n = t.length; n > i; i++)
            e = e + "|" + t[i];
        var s = new Laya.HttpRequest;
        s.send(Define.protocol + "//gmapi-llmh5.suyugame.com/record.php", e, "post", "arraybuffer");
    };
    Log.d = function (e, i) {
        void 0 === i && (i = 6e4), Log.ShowDebug && Laya.Browser.now() - Log.timeLock >= i && (Log.timeLock = Laya.Browser.now(), console.log("[Bug]:", e));
    };
    Log.timeLock = 0;
    Log.ShowDebug = !1;
    Log.ShowInfo = !1;
    return Log;
}());
//# sourceMappingURL=Log.js.map