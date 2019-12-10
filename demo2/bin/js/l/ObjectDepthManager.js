var ObjectDepthManager = /** @class */ (function () {
    function ObjectDepthManager() {
        this._fis = !0;
        this.m_lastCheckTime = 0;
        this.m_checkInterval = 200;
        this._sMng = SceneManager.ins;
    }
    Object.defineProperty(ObjectDepthManager, "instance", {
        get: function () {
            return this.m_instance || (this.m_instance = new ObjectDepthManager());
        },
        enumerable: true,
        configurable: true
    });
    ObjectDepthManager.prototype.check = function () {
        var t = this._sMng.addedObjects;
        t.sort(this.depthSort);
        for (var e = t.length - 1; e >= 0; e--)
            t[e].chgDep(e);
    };
    ObjectDepthManager.prototype.depthSort = function (t, e) {
        return t.scePos.y == e.scePos.y ? t.gid > e.gid ? 1 : -1 : t.scePos.y > e.scePos.y ? 1 : -1;
    };
    ObjectDepthManager.prototype.onForceRender = function (t) {
        if (0 == this.m_lastCheckTime)
            this.m_lastCheckTime = t;
        else if (t - this.m_lastCheckTime >= this.m_checkInterval) {
            this.m_lastCheckTime = t, this.check();
            this.m_checkInterval = 2e3;
        }
        return 1;
    };
    Object.defineProperty(ObjectDepthManager.prototype, "isFinished", {
        get: function () {
            return this._fis;
        },
        set: function (t) {
            this._fis != t && (this._fis = t, this.m_lastCheckTime = 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDepthManager.prototype, "isOpenRender", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDepthManager.prototype, "priority", {
        get: function () {
            return RenderPriority.OFTEN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectDepthManager.prototype, "rending", {
        get: function () {
            return this._ren;
        },
        set: function (t) {
            this._ren = t;
        },
        enumerable: true,
        configurable: true
    });
    return ObjectDepthManager;
}());
//# sourceMappingURL=ObjectDepthManager.js.map