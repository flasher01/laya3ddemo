var ObjectRenderManager = /** @class */ (function () {
    function ObjectRenderManager() {
        this._fis = !0;
        this.m_lastCheckTime = 0;
        this.m_checkInterval = 500;
        this.m_limitRoleArr = [];
        this.m_limitMonsArr = [];
        this.m_limitDropArr = [];
        this._sMng = SceneManager.ins;
    }
    Object.defineProperty(ObjectRenderManager, "instance", {
        get: function () {
            return this.m_instance || (this.m_instance = new ObjectRenderManager());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectRenderManager.prototype, "limitRoleArr", {
        get: function () {
            return this.m_limitRoleArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectRenderManager.prototype, "limitMonsArr", {
        get: function () {
            return this.m_limitMonsArr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectRenderManager.prototype, "limitDropArr", {
        get: function () {
            return this.m_limitDropArr;
        },
        enumerable: true,
        configurable: true
    });
    ObjectRenderManager.prototype.check = function () {
        for (var t, e, i = this._sMng, n = i.allObjects, s = i.getMonsterListInView(), a = n.length - 1; a >= 0; a--)
            t = n[a], t && t.cont && (e = t.add, StoryManager.isPlot && StoryManager.instance.isHideScene(t.guid) && (e = !1), !this._moni.isLimit || t.type != UnitType.Monster && t.type != UnitType.Pet && t.type != UnitType.Drop && t.type != UnitType.Role || (e = this.limitAdd(t)), (t.isOpenRender != e || e && !t.cont.parent) && (t.isOpenRender = e, e ? i.addObjectToScene(t) : i.removeObjectFromScene(t)), e = t.inView, StoryManager.isPlot && StoryManager.instance.isHideScene(t.guid) && (e = !1), e && t.type == UnitType.Monster && t.data.difficulty == MonsterDifficulty.Common && -1 == s.indexOf(t.guid) && s.push(t.guid), t.titl && t.titl.isOpenRender != e && (t.titl.isOpenRender = e, e ? t.addTitSce() : t.rmvTitSce()), t.side && t.side.isOpenRender != e && (t.side.isOpenRender = e, e ? t.addSideSce() : t.rmvSideSce()));
        var o, r = i.allStatics;
        for (var h in r)
            if (o = r[h], o && o.cont) {
                if (e = o.add, e && o.type == UnitType.NPC) {
                    var l = o.data.param;
                    /*l && (e = !1, 0 != l.story || StoryManager.isPlanes() ? 1 == l.story ? e = !0 : 2 == l.story && StoryManager.isPlanes() ? e = !0 : 3 == l.story && TaskManager.instance.isHaveTask(l.taskID) && (e = !0) : e = !0, 1 != l.hide || TaskManager.instance.isCompleteMainTask(l.hideID) ? 2 != l.hide || TaskManager.instance.isHaveTask(l.taskID) || (e = !0) : e = !0)*/
                }
                o.isOpenRender != e && (o.isOpenRender = e, e ? i.addStaticToScene(o) : i.removeStaticFromScene(o)), e = o.inView, o.titl && o.titl.isOpenRender != e && (o.titl.isOpenRender = e, o.type == UnitType.NPC && (e = o.isOpenRender), e ? o.addTitSce() : o.rmvTitSce()), o.side && o.side.isOpenRender != e && (o.side.isOpenRender = e, o.type == UnitType.NPC && (e = o.isOpenRender), e ? o.addSideSce() : o.rmvSideSce());
            }
        var c, u = i.arenaObject;
        for (var h in u)
            c = u[h], c && c.cont && (e = c.add, c.isOpenRender != e && (c.isOpenRender = e, e ? i.addStaticToScene(c) : i.removeStaticFromScene(c)));
        var p, d = i.storyStatics;
        for (var h in d)
            p = d[h], p && p.cont && (e = p.add, p.isOpenRender != e && (p.isOpenRender = e, e ? i.addStaticToScene(p) : i.removeStaticFromScene(p)));
        var g, f = i.SEUnitObj;
        for (var h in f)
            g = f[h], g && g.cont && (e = g.add, g.isOpenRender != e && (g.isOpenRender = e, e ? i.addObjectToScene(g) : i.removeObjectFromScene(g)));
    };
    ObjectRenderManager.prototype.limitAdd = function (t) {
        var e = t.add;
        if ( /*this._moni.isLimit && */(t.type == UnitType.Monster || t.type == UnitType.Pet || t.type == UnitType.Drop || t.type == UnitType.Role)) {
            var i, n = this._sMng.self;
            if (t.type == UnitType.Monster && t.data.difficulty == MonsterDifficulty.Common) {
                var s = this.m_limitMonsArr /*,
                    a = this._moni.limitMonsNum*/;
                i = s.indexOf(t.guid), e && t.canAtk() && (-1 != i /*|| s.length < a*/) ? -1 == i && s.push(t.guid) : (e = !1, -1 != i && s.splice(i, 1));
            }
            else if (t.type != UnitType.Pet || t.self)
                if (t.type != UnitType.Drop || !t.data || t.data.own && "0" != t.data.own && t.data.own != n.guid) {
                    if (t.type == UnitType.Role) {
                        var o = this.m_limitRoleArr /*,
                            r = this._moni.limitRoleNum*/;
                        i = o.indexOf(t.guid), e && t.canAtk() && (-1 != i /*|| o.length < r*/) ? -1 == i && o.push(t.guid) : (e = !1, -1 != i && o.splice(i, 1));
                    }
                }
                else {
                    var h = this.m_limitDropArr /*,
                        l = this._moni.limitDropNum*/;
                    i = h.indexOf(t.guid), e && (-1 != i /*|| h.length < l*/) ? -1 == i && h.push(t.guid) : (e = !1, -1 != i && h.splice(i, 1));
                }
            else
                e = !1;
        }
        return e;
    };
    ObjectRenderManager.prototype.onForceRender = function (t) {
        return 0 == this.m_lastCheckTime ? this.m_lastCheckTime = t : t - this.m_lastCheckTime >= this.m_checkInterval && (this.m_lastCheckTime = t, this.check()), 1;
    };
    Object.defineProperty(ObjectRenderManager.prototype, "isFinished", {
        get: function () {
            return this._fis;
        },
        set: function (t) {
            this._fis != t && (this._fis = t, this.m_lastCheckTime = 0 /*, t || this._rMng.addRender(this)*/);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectRenderManager.prototype, "isOpenRender", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectRenderManager.prototype, "priority", {
        get: function () {
            return RenderPriority.OFTEN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectRenderManager.prototype, "rending", {
        get: function () {
            return this._ren;
        },
        set: function (t) {
            this._ren = t;
        },
        enumerable: true,
        configurable: true
    });
    return ObjectRenderManager;
}());
//# sourceMappingURL=ObjectRenderManager.js.map