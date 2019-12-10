var Static = /** @class */ (function () {
    function Static() {
        this._init = !1;
        this._def = !1;
        this._act = ActionType.Idle;
        this._call = !1;
        this._fini = !0;
        this._ctime = 0;
        this._rMng = ForceRenderManager.instance;
        this._sMng = SceneManager.ins;
        this._tMng = SetManager.instance;
        this._cont = new Laya.Sprite3D;
        this._sPos = new Laya.Point;
        this._cam2 = this._sMng.cam2;
        this._effs = [];
        this._gid = Laya.Utils.getGID();
        this._cont.name = "content";
    }
    Static.prototype.canSeled = function () {
        return !0;
    };
    Object.defineProperty(Static.prototype, "gid", {
        get: function () {
            return this._gid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "guid", {
        get: function () {
            return this._vo ? this._vo.id : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "type", {
        get: function () {
            return this._vo ? this._vo.type : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "data", {
        get: function () {
            return this._vo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "cont", {
        get: function () {
            return this._cont;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "plyr", {
        get: function () {
            return this._plyr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "titl", {
        get: function () {
            return this._titl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "side", {
        get: function () {
            return this._side;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "add", {
        get: function () {
            return !this._tMng.openLimit && GameModel.isFoucus && this.inView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "def", {
        get: function () {
            return this._def;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "act", {
        get: function () {
            return this._act;
        },
        set: function (t) {
            this._act = t, this._plyr && (this._plyr.act = this._act);
        },
        enumerable: true,
        configurable: true
    });
    Static.prototype.create = function (t) {
        if (!this._vo) {
            this._vo = t, this._need = !0, this.isOpenRender = !1;
            var e = PathManager.pixPoi(t.x, t.y);
            this._sPos.x = e.x, this._sPos.y = e.y, this.updPos();
        }
    };
    Static.prototype.getUrl = function () {
        var t = this._vo.asset, e = this._vo.res, i = this.type;
        return i == UnitType.Self || i == UnitType.Role || i == UnitType.AIUnit ? PathDefine.ROLE + "LayaScene_" + t + "/" + t + ".lh" : i == UnitType.Monster || i == UnitType.JQUnit ? PathDefine.MONSTER + "LayaScene_" + t + "/" + t + ".lh" : i == UnitType.Collect ? PathDefine.MONSTER + "LayaScene_" + t + "/" + t + ".lh" : i == UnitType.Drop ? PathDefine.DROP + "LayaScene_" + t + "/" + t + ".lh" : i == UnitType.Box ? PathDefine.DROP + "LayaScene_" + t + "/" + t + ".lh" : i == UnitType.Pet ? PathDefine.ROLE + "LayaScene_" + t + "/" + t + ".lh" : i == UnitType.NPC ? PathDefine.MONSTER + "LayaScene_" + e + "/" + e + ".lh" : i == UnitType.Fly ? PathDefine.SKILL + "LayaScene_" + e + "/" + e + ".lh" : i == UnitType.Teleport ? PathDefine.SKILL + "LayaScene_" + e + "/" + e + ".lh" : i == UnitType.XianNv ? PathDefine.ROLE + "LayaScene_" + t + "/" + t + ".lh" : PathDefine.ROLE + "LayaScene_default/default.lh";
    };
    Static.prototype.addPlySce = function () {
        if (this._vo) {
            var t = this._plyr;
            t || (t = this._plyr = ObjectPool.g("UnitPlayer"), t.aType = AssetManager.ins.getAssetTypeByUnitType(this.type), t.self = this instanceof ActiveUnit ? this.self : !1, t.ptype = PlayerType.Role, t.prio = t.self ? Laya.Timer.PRIORITY_2 : Laya.Timer.PRIORITY_3, t.def = this.def, t.guid = this.guid, t.type = this.type, t.on(ConstValue.COMPLETE, this.onInit, this), t.setBack(this.onFram, this), this.isFinished = !1, t.setUrl(this.getUrl()));
        }
    };
    Static.prototype.rmvPlySce = function () {
        var t = this.cont;
        t.parent && t.parent.removeChild(t);
        var e, i, n, s = this._effs;
        for (e = s.length - 1; e >= 0; e--)
            n = s[e], i = n.dis3, n.off(ConstValue.COMPLETE, this.onEffectComplete, this), i && i.parent && i.parent.removeChild(i), n.destroy();
        this._effs.length = 0;
        var a = this._plyr;
        a && (i = a.dis3, i && i.parent && (i.parent.removeChild(i), a.link(null, null)), a.off(ConstValue.COMPLETE, this.onInit, this), a.destroy(), this._plyr = null, this.isFinished = !0), this._init = !1;
    };
    Static.prototype.addTitSce = function () {
        !this._vo;
    };
    Static.prototype.rmvTitSce = function () {
        this._titl && this._titl.clean();
    };
    Static.prototype.addSideSce = function () {
        !this._vo;
    };
    Static.prototype.rmvSideSce = function () {
        this._side && this._side.clean();
    };
    Static.prototype.onInit = function () {
        this._t3D = this._t2D = null, this._f3D = this._f2D = null;
        var t = this._plyr;
        t && (t.off(ConstValue.COMPLETE, this.onInit, this), t.dis3 && t.dis3.parent != this.cont && this.cont.addChild(t.dis3)), this._init || (this._init = !0, this.onInited());
    };
    Static.prototype.onInited = function () {
        this.act = this._act, this.addTitSce(), this.addSideSce();
    };
    Static.prototype.plyEff = function (t, e, i, n, s, a, o, r) {
        if (void 0 === e && (e = !1), void 0 === i && (i = 0), void 0 === n && (n = null), void 0 === s && (s = 0), void 0 === a && (a = !0), void 0 === o && (o = !1), void 0 === r && (r = !0), null == t || 0 == t.length)
            return null;
        if (null == this._vo)
            return null;
        if (!this.isOpenRender && !e)
            return null;
        var h = this instanceof ActiveUnit ? this.self || o : !1;
        if (!AssetManager.ins.hasEff(AssetType.Effect, t, CacheResUtils.getEffectAssetTime(h), !0, h, r))
            return null;
        var l = ObjectPool.g("EffectPlayer");
        return l.aType = AssetType.Effect, l.self = h, l.lType = i, l.rot = 0, l.chgDep(a ? 100 : -100), l.setPos3(n ? n : new Laya.Vector3(0, 0, 0)), l.play(t, e), l.lType != EffectLimitType.NO && OpBase.raise(l.lType), this.addEff(l, !0, !1), l;
    };
    Static.prototype.addEff = function (t, e, i) {
        void 0 === e && (e = !0), void 0 === i && (i = !1), null != t && -1 == this._effs.indexOf(t) && (this._effs.push(t), e && t.setBack(this.rmvEff, this), this._cont && t.dis3 ? (this._cont.addChild(t.dis3), t.updEffPos()) : i && t.on(ConstValue.COMPLETE, this.onEffectComplete, this));
    };
    Static.prototype.onEffectComplete = function (t, e) {
        e && e instanceof EffectPlayer && e.dis3 && (e.off(ConstValue.COMPLETE, this.onEffectComplete, this), this._cont && e.dis3 && (this._cont.addChild(e.dis3), e.updEffPos()));
    };
    Static.prototype.rmvEff = function (t) {
        if (null != t) {
            var e = this._effs.indexOf(t);
            -1 != e && this._effs.splice(e, 1), t.off(ConstValue.COMPLETE, this.onEffectComplete, this);
            var i = t.dis3;
            i && i.parent && i.parent.removeChild(i);
        }
    };
    Static.prototype.onFram = function () { };
    Static.prototype.update = function () { };
    Static.prototype.updEffStus = function () {
        this._effs;
    };
    Static.prototype.updName = function () { };
    Static.prototype.updBlood = function () { };
    Static.prototype.sTalk = function (t) {
        t && "" != t && this._open && this._titl && this._titl.setTalk(t);
    };
    Static.prototype.hTalk = function () {
        this._titl && this._titl.setTalk(null);
    };
    Static.prototype.getOffY = function () {
        return this._t3D || (this.plyr && this.plyr.asset && (this._t3D = this.plyr.asset.titlMtx(this._t3D)), this._t2D || (this._t2D = new Laya.Vector3(0, -160, 0)), this._t3D && this._sMng.orthographicCoordToScreenCoord(this._t3D, this._t2D)), this._f3D || (this.plyr && this.plyr.asset && (this._f3D = this.plyr.asset.footMtx(this._f3D)), this._f2D || (this._f2D = new Laya.Vector3(0, 0, 0)), this._f3D && this._sMng.orthographicCoordToScreenCoord(this._f3D, this._f2D)), this._t2D.y - this._f2D.y;
    };
    Static.prototype.destroy = function () {
        this._vo && this._sMng.removeObject(this._vo.guid), this._cont && this._cont.transform && (this._cont.transform.position = new Laya.Vector3(0, 0, 0), this._cont.transform.localRotationEuler = new Laya.Vector3(0, 0, 0)), this._init = !1, this._vo = null, this._t3D = this._t2D = null, this._f3D = this._f2D = null, this._need = !1, this._call = !1, this.isOpenRender = !1, this.isFinished = !0, this.rmvTitSce(), this.rmvPlySce();
    };
    Object.defineProperty(Static.prototype, "isOpenRender", {
        get: function () {
            return this._open;
        },
        set: function () {
            this._open != t && (this._open = t, this.updEffStus(), t && (this._call = this._need));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "inView", {
        get: function () {
            var t = this.pos2D;
            return t.x > -100 && t.x < this._cam2.width + 100 && t.y > -100 && t.y < this._cam2.height + 300;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "scePos", {
        get: function () {
            return this._sPos;
        },
        enumerable: true,
        configurable: true
    });
    Static.prototype.updPos = function () {
        this._cont && this._cont.transform && (this._cont.transform.position = this.pos3D), this._titl && this._titl.updPos(), this._side && this._side.updPos();
    };
    Static.prototype.chgDep = function (t) {
        this._dep != t && (this._dep = t);
    };
    Object.defineProperty(Static.prototype, "pos2D", {
        get: function () {
            return this._pos2 || (this._pos2 = new Laya.Vector3), this._pos2.x = this._cam2.getViewX(this._sPos.x), this._pos2.y = this._cam2.getViewY(this._sPos.y), this._pos2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "pos3D", {
        get: function () {
            return this._pos3 || (this._pos3 = new Laya.Vector3), this._sMng.screenCoordTo3DCoord(this.pos2D, this._pos3), this._pos3.z = this._dep, this._pos3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "queu", {
        get: function () {
            return this._queu;
        },
        set: function () {
            this._queu = t;
        },
        enumerable: true,
        configurable: true
    });
    Static.prototype.call = function () {
        this._call && (this._call = !1, this.isOpenRender && this._need && (this._need = !1, this.update()));
    };
    Static.prototype.onForceRender = function (t, e) {
        return null == this._vo ? 0 : (0 != this._ctime && (e = t - this._ctime), this._ctime = t, this._count = 0, this._count);
    };
    Object.defineProperty(Static.prototype, "isFinished", {
        get: function () {
            return this._fini;
        },
        set: function () {
            this._fini != t && (this._fini = t, this._ctime = 0, t ? ForceRenderManager.instance.removeRender(this) : ForceRenderManager.instance.addRender(this));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "priority", {
        get: function () {
            return RenderPriority.OTHER;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Static.prototype, "rending", {
        get: function () {
            return this._rend;
        },
        set: function (t) {
            this._rend = t;
        },
        enumerable: true,
        configurable: true
    });
    return Static;
}());
//# sourceMappingURL=Static.js.map