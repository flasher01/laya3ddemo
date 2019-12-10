var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var l;
(function (l_1) {
    var SceneManager = /** @class */ (function (_super) {
        __extends(SceneManager, _super);
        function SceneManager() {
            var _this = _super.call(this) || this;
            _this.m_monsViewArr = [];
            _this.m_dropArr = [];
            _this.m_dropTime = 0;
            _this.m_selectedLock = !1;
            _this.clickTime = 0;
            _this.autoType = 0;
            _this.switchIdArr = [];
            _this.m_out = new Laya.Vector3;
            _this.resizeParam = "";
            _this.m_lastCheckTime = 0;
            _this.m_checkInterval = 1000;
            _this.m_frameNum = 0;
            _this._fis = true;
            return _this;
        }
        Object.defineProperty(SceneManager, "ins", {
            get: function () {
                return this._ins || (this._ins = new SceneManager());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "cam2", {
            get: function () {
                return this._cam2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "cam3", {
            get: function () {
                return this._cam3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "sce2", {
            get: function () {
                return this._sc2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "sce3", {
            get: function () {
                return this._sc3;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "self", {
            get: function () {
                return this._self;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "svo", {
            get: function () {
                return this._svo;
            },
            set: function (t) {
                this._svo = t;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "isChangeScene", {
            set: function (t) {
                this.m_isChangeScene = t;
                t && this._self && (this._self.getBuf().clear() /*, BufferManager.ins.dis(BuffCMD.CHG, this, null)*/);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "canGuaJi", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "canRide", {
            get: function () {
                return this._mvo; /*&& this._mvo.mapType != MapType.Money && this._mvo.mapType != MapType.Marry*/
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "canSkill", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "focusUnit", {
            get: function () {
                return this.m_focusUnit;
            },
            set: function (t) {
                if (this.m_focusUnit != t) {
                    var e, i, n = ActionDefine;
                    if (this.m_focusUnit) {
                        e = this.m_focusUnit;
                        i = e.actCtrl;
                        if (e) {
                            if (e.type == UnitType.Self) {
                                (i.getAct(n.Move).setPos(null, null), i.getAct(n.Fly).setPos(null, null),
                                    i.getAct(n.Chong).setPos(null, null), i.getAct(n.Shan).setPos(null, null),
                                    i.getAct(n.Jump).setPos(null, null), i.getAct(n.Skill).setPos(null, null),
                                    i.getAct(n.Shose).setPos(null, null));
                            }
                            else if (e.type == UnitType.JQUnit) {
                                (i.getAct(n.Move).setPos(null, null),
                                    i.getAct(n.Fly).setPos(null, null), i.getAct(n.Skill).setPos(null, null));
                            }
                            else if (e.type == UnitType.AIUnit) {
                                (i.getAct(n.Move).setPos(null, null),
                                    i.getAct(n.Fly).setPos(null, null), i.getAct(n.Chong).setPos(null, null),
                                    i.getAct(n.Skill).setPos(null, null));
                            }
                        }
                    }
                    this.m_focusUnit = t;
                    if (t) {
                        this._cam2.follow(t.scePos);
                        e = this.m_focusUnit;
                        i = e.actCtrl;
                        if (e) {
                            if (e.type == UnitType.Self) {
                                (i.getAct(n.Move).setPos(this.posListen, this),
                                    i.getAct(n.Fly).setPos(this.posListen, this), i.getAct(n.Chong).setPos(this.posListen, this),
                                    i.getAct(n.Shan).setPos(this.posListen, this), i.getAct(n.Jump).setPos(this.posListen, this),
                                    i.getAct(n.Skill).setPos(this.posListen, this), i.getAct(n.Shose).setPos(this.posListen, this));
                            }
                            else if (e.type == UnitType.JQUnit) {
                                (i.getAct(n.Move).setPos(this.posListen, this),
                                    i.getAct(n.Fly).setPos(this.posListen, this), i.getAct(n.Skill).setPos(this.posListen, this));
                            }
                            else if (e.type == UnitType.AIUnit) {
                                (i.getAct(n.Move).setPos(this.posListen, this),
                                    i.getAct(n.Fly).setPos(this.posListen, this), i.getAct(n.Chong).setPos(this.posListen, this),
                                    e.actCtrl.getAct(n.Skill).setPos(this.posListen, this));
                            }
                        }
                        this.update(!0);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "tiaoyueObj", {
            get: function () {
                return this.m_tiaoObj;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "telepotObj", {
            get: function () {
                return this.m_teleObj;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "selectedObject", {
            get: function () {
                return this.m_selectedItem;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.prototype.init = function () {
            this.m_objectManager = ObjectRenderManager.instance, this.m_depthManager = ObjectDepthManager.instance,
                /*this.m_monitor = XingNengMonitor.instance, this.m_forceManager = ForceRenderManager.instance, */
                this._mMng = MapManager.ins, /* this.m_pkMode = PKModeManager.instance, this.m_atkMng = AttackManager.ins, */
                this.m_unitObj = {}, this.m_monsTypeObj = {}, this.m_monsTempObj = {},
                this.m_objectDic = new CustomDictory, this.m_staticObj = {},
                this.m_effectObj = {}, this.m_addedObj = [];
            var t, e = Laya.stage;
            this.m_spalshLayer = t = new SplashLayer, t.name = "spalshLayer", t.mouseEnabled = !1, t.mouseThrough = !0, e.addChildAt(t, 0),
                this.m_movieLayer = t = new Laya.Sprite, t.name = "movieLayer", t.mouseEnabled = !1, t.mouseThrough = !0, e.addChildAt(t, 0),
                this.m_hurtLayer = t = new Laya.Sprite, t.mouseEnabled = !1, t.mouseThrough = !0, t.name = "hurtLayer", e.addChildAt(t, 0),
                this.m_titleTxtLayer = t = new Laya.Sprite, t.name = "titleTxtLayer", t.mouseThrough = !0, e.addChildAt(t, 0),
                this.m_titleImgLayer = t = new Laya.Sprite, t.name = "titleImgLayer", t.mouseThrough = !0, e.addChildAt(t, 0),
                this.m_titleMovLayer = t = new Laya.Sprite, t.name = "titleMovLayer", t.mouseThrough = !0, e.addChildAt(t, 0);
            var i = GameModel, n = this._sc3 = new Laya.Scene;
            n.mouseEnabled = !1, n.mouseThrough = !0,
                n.ambientColor = new Laya.Vector3(1.2, 1.2, 1.2), e.addChildAt(n, 0);
            var s = this._cam3 = new Laya.Camera(i.CameraAspectRatio, .1, 300);
            s.transform.translate(new Laya.Vector3(0, 0, 150)), s.clearColor = null, s.orthographic = !0,
                s.orthographicVerticalSize = i.OrthographicVerticalSize,
                s.viewport = new Laya.Viewport(i.viewportX, i.viewportY, i.viewportW, i.viewportH),
                n.addChild(s),
                this.m_cameraForward = s.forward;
            var a = new Laya.Vector3(MathUtil.angle2radian(30));
            this.m_roleLayer = t = new Laya.Sprite3D, t.name = "roleLayer", t.transform.rotationEuler = a, n.addChild(t),
                this.m_topLayer = t = new Laya.Sprite3D, t.name = "topLayer", t.transform.rotationEuler = a, n.addChild(t),
                this.m_shadowImgLayer = t = new Laya.Sprite, t.mouseThrough = !0, t.name = "shadowImgLayer", e.addChildAt(t, 0),
                this.m_debugLayer = t = new Laya.Sprite, t.mouseEnabled = !1, t.mouseThrough = !0, e.addChildAt(t, 0),
                this._sc2 = new Scene, e.addChildAt(this._sc2, 0),
                this._cam2 = new Camera2D, this._cam2.updateViewRect(e.width, e.height),
                this.sce2.add(Scene.READLY, this.onSceneReadly, this),
            ;
            /*this.m_ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0)), this.m_point = new Laya.Vector2, this.m_outHitAllInfo = new Array,
            this.m_shanLen = Number(GlobalVO.getGlobalVO(8).value), this.m_needLevel = Number(GlobalVO.getGlobalVO(1069).value), PathManager.initManager()*/
        };
        SceneManager.prototype.reset = function () {
            AttackManager.ins.reset(), this.resetTarget();
        };
        SceneManager.prototype.destroy = function () {
            this._fis = !0, this.m_objectManager.isFinished = !0, this.m_depthManager.isFinished = !0, PathManager.clear(), this.clearObject();
        };
        SceneManager.prototype.update = function (t) {
            void 0 === t && (t = !1), this._cam2 && !this._cam2.rending && this._cam2.update(0), this.sce2 && this.sce2.update(t), Laya.extLimit || TalkManager.instance.onCheckDist();
        };
        SceneManager.prototype.playBgSound = function () {
            this._mvo.bgSound && SoundManager.instance.playBgMusic(this._mvo.bgSound);
        };
        SceneManager.prototype.splashScreen = function (t) {
            Laya.extLimit || (t ? this.m_spalshLayer.addSplash() : this.m_spalshLayer.removeSplash());
        };
        SceneManager.prototype.shakeScreen = function (t) {
            void 0 === t && (t = 2), this._cam2.startShock(500 * t, t + 2);
        };
        SceneManager.prototype.posListen = function (t) {
            t ? this._cam2.followRending = !0 : (this._cam2.followRending = !1, this.update());
        };
        SceneManager.prototype.updPos = function () {
            var t, e, i, n, s, a, o = [this.m_hurtLayer];
            for (a = o.length - 1; a >= 0; a--)
                for (e = o[a]._childs, t = e.length - 1; t >= 0; t--)
                    i = e[t], i && i.updPos();
            var r = this.m_objectDic.getArray();
            for (a = r.length - 1; a >= 0; a--)
                n = r[a], n && (n.isOpenRender ? n.updPos() : n.inView && n.titl && n.titl.updPos());
            var h = this.m_staticObj;
            for (var l in h)
                n = h[l], n && (n.isOpenRender ? n.updPos() : n.inView && n.titl && n.titl.updPos());
            /*var c = this.m_storyStaticObj;
            for (var l in c) n = c[l], n && (n.isOpenRender ? n.updPos() : n.inView && n.titl && n.titl.updPos());
            var u = this.m_arenaObj;
            for (var l in u) n = u[l], n && (n.isOpenRender ? n.updPos() : n.inView && n.titl && n.titl.updPos());*/
            h = this.m_effectObj;
            for (var l in h)
                s = h[l], s && (s.pos(s.scePos.x, s.scePos.y), s.updPos());
        };
        SceneManager.prototype.validateSize = function () {
            var t = GameModel, e = this._cam3;
            e && (e.aspectRatio = t.CameraAspectRatio, e.orthographicVerticalSize = t.OrthographicVerticalSize,
                e.viewport = new Laya.Viewport(t.viewportX, t.viewportY, t.viewportW, t.viewportH)),
                this._cam2 && this._cam2.updateViewRect(t.ViewWH, t.ViewTH),
                this.m_spalshLayer && this.m_spalshLayer.validateSize(), this.update();
        };
        SceneManager.prototype.changeMap = function (t) {
            this._mvo = t, this._sc2.change(t), -1 == this._mvo.pkMode ? this.m_pkMode.change(ModeType.Peace) : this.m_pkMode.change(this._mvo.pkMode), this._mvo && this._mvo.mapType == MapType.Common;
        };
        SceneManager.prototype.onSceneReadly = function () {
            if (console.log("SceneManager onSceneReadly()  " + this.sce2.sceneBgVO.mapWidth, this.sce2.sceneBgVO.mapHeight, "初始化完成==" + Laya.Browser.now()),
                this.cam2.updateSceneRect(this.sce2.sceneBgVO.mapWidth, this.sce2.sceneBgVO.mapHeight), this._fis = !1,
                this.m_forceManager.addRender(this), this.m_objectManager.isFinished = !1,
                this.m_depthManager.isFinished = !1, this.svo.clanWarFlag = 0,
                this._self = this.addObject(this.svo), this._self && this._self.warFlag(0, !0),
                this.initStatic(), this._mvo.mapType == MapType.TaskCopy && !Laya.extLimit) {
                var t = TaskCopyManager.taskCopyId, e = TaskCopyTem.getTaskCopyTem(t);
                e && e.isShowBoss && (TaskCopyManager.instance.initTaskBossRes(e), UIManager.instance.setUnopenWin([UIManager.TASK_BOSSSHOWWIN]), UIManager.instance.openWindow(UIManager.TASK_BOSSSHOWWIN, !0, e, !0));
            }
            this.svo.level <= 1 && !StoryManager.isEnd && (StoryManager.isCreate = !1, StoryManager.instance.reqLandInfo()), this.breakCollect(), TimeUtils.callLate(this.onSelfEnter, this, 500);
        };
        SceneManager.prototype.initStatic = function () {
            if (this._mvo) {
                this.m_tiaoObj = {}, this.m_teleObj = {};
                var t, e, i, n, s = NpcDB.getListByMapId(this._mvo.id);
                if (s && s.length)
                    for (t = 0; t < s.length; t++)
                        (3 != s[t].mapid || GameModel.clanwarJob || !ClanWarManager.ins.getCZN(s[t].id)) && (n = new StaticVO, n.type = UnitType.NPC, n.id = n.type + "_" + s[t].id, n.x = s[t].x, n.y = s[t].y, n.res = 3 == s[t].mapid && ClanWarManager.ins.getCZN(s[t].id) ? s[t].res + ("A" == GameModel.clanwarJob ? "_nan" : "_nv") : s[t].res, n.param = s[t], this.addStatic(n));
                var a = (TiaoYueDB.getPosiByMapId(this._mvo.id), TiaoYueDB.getListByMapId(this._mvo.id));
                if (a && a.length)
                    for (t = 0; t < a.length; t++) {
                        1 == a[t].type && (n = new StaticVO, n.type = UnitType.Fly, n.id = n.type + "_" + a[t].id, n.x = a[t].x, n.y = a[t].y, n.res = a[t].res, n.param = a[t], this.addStatic(n)), this.m_tiaoObj[a[t].x + "|" + a[t].y] = [new Laya.Point(a[t].x, a[t].y)];
                        for (var o = a[t].target.split(";"), r = 0; r < o.length; r++) {
                            var h = o[r].split("|");
                            this.m_tiaoObj[a[t].x + "|" + a[t].y].push(new Laya.Point(Number(h[0]), Number(h[1])));
                        }
                    }
                var l = ChuanSongDB.getListByMapId(this._mvo.id);
                if (l && l.length)
                    for (t = 0; t < l.length; t++)
                        for (n = new StaticVO, n.type = UnitType.Teleport, n.id = n.type + "_" + l[t].id, n.x = l[t].x1, n.y = l[t].y1, n.res = l[t].res, n.param = l[t], this.addStatic(n), e = l[t].x1 - 1; e <= l[t].x1 + 1; e++)
                            for (i = l[t].y1 - 1; i <= l[t].y1 + 1; i++)
                                this.m_teleObj[e + "|" + i] = l[t].id;
            }
        };
        SceneManager.prototype.onSelfEnter = function () {
            if (Log.i("玩家进入场景==" + Laya.Browser.now()), this.m_forceManager.reset(), this.m_isChangeScene = !1, this._mvo.bgSound) {
                {
                    SoundManager.instance;
                }
                this.playBgSound();
            }
            if (this._mMng.sendMove(this.svo.sguid, this.svo.x, this.svo.y), UIManager.instance.closeWin(UIManager.FUHUO_WIN), UIManager.instance.closeWin(UIManager.NPC_WIN), this.self.actCtrl.curKey == ActionDefine.Teleport) {
                var t = this.self.actCtrl.getAct(this.self.actCtrl.curKey);
                t.extEtr(null), this.dis(e.SLF_ENT, this);
            }
            else if (this.self.actCtrl.curKey == ActionDefine.Shose) {
                var i = this.self.actCtrl.curAct.vo, t = this.self.actCtrl.getAct(this.self.actCtrl.curKey), n = ObjectPool.g("ActionParamVO");
                n.target = new Laya.Point(i && i.data && i.data.x ? i.data.x : this.svo.x, i && i.data && i.data.y ? i.data.y : this.svo.y), t.extLev(n);
            }
            else
                this._self.doAct(ActionDefine.Stand), this.self.staCtrl.curSta == StateDefine.GUAJI && this._mvo.mapType != MapType.Challenge && this._mvo.mapType != MapType.LingYiCopy && this._mvo.mapType != MapType.XianPingShan && this._mvo.mapType != MapType.JingYaoTa && this._mvo.mapType != MapType.XianLingDian && this.cancelGuaJi(), this.dis(e.SLF_ENT, this);
            this.dis(e.SCE_CHG, this), TaskManager.isOpenWin && TaskManager.instance.LavelCopyOpenWin();
        };
        SceneManager.prototype.setSelectedObject = function (t, i) {
            if (void 0 === i && (i = !1), null != this.self && (t && (this.m_selectedLock = i), t != this.m_selectedItem)) {
                if (this.m_selectedItem && (this.m_selectedItem.rmvEff(this.m_selectEffect), this.m_selectedItem instanceof RoleJuQing || this.m_selectedItem.type == UnitType.Monster && this.m_selectedItem.hideName()), this.m_selectedItem = t, this.m_selectedItem) {
                    var n;
                    if (this.m_selectedItem.type == UnitType.Role)
                        n = "selected_heping";
                    else if (this.m_selectedItem.type == UnitType.Monster) {
                        var s = this.m_selectedItem.data;
                        n = !s || s.difficulty != MonsterDifficulty.Boss && s.difficulty != MonsterDifficulty.FieldBoss ? s && s.difficulty == MonsterDifficulty.Elite ? "selected_jingying" : "selected_didui" : "selected_boss", this.m_selectedItem.showName(), this.m_selectedItem.showBlood();
                    }
                    else
                        this.m_selectedItem.type == UnitType.Collect && (n = "selected_didui");
                    this.m_selectEffect || (this.m_selectEffect = new EffectPlayer, this.m_selectEffect.aType = AssetType.Effect, this.m_selectEffect.self = !0, this.m_selectEffect.ctrl = !1, this.m_selectEffect.rot = 0, this.m_selectEffect.setPos3(new Laya.Vector3(0, 0, 0))), this.m_selectEffect.play(PathDefine.SKILL + "LayaScene_" + n + "/" + n + ".lh", !0), this.m_selectedItem.addEff(this.m_selectEffect, !1, !0);
                }
                this.dis(e.SEL_VIW);
            }
        };
        SceneManager.prototype.gotoPoint = function (t, e) {
            if (!this.m_isChangeScene && this._self && this._self.actCtrl && this._self.actCtrl.curKey != ActionDefine.Dead) {
                if (this.breakCollect(), this.m_point.elements[0] = t, this.m_point.elements[1] = e,
                    this.cam3.viewportPointToRay(this.m_point, this.m_ray),
                    Laya.Physics.rayCastAll(this.m_ray, this.m_outHitAllInfo, 300, 0),
                    this.m_outHitAllInfo.length > 0 && this.m_outHitAllInfo[0].sprite3D.parent &&
                        this.m_outHitAllInfo[0].sprite3D.parent && this.m_outHitAllInfo[0].sprite3D.parent.name) {
                    var i = Laya.Browser.now();
                    if (i - this.clickTime > 800) {
                        this.clickTime = i;
                        var n = this.getStatic(this.m_outHitAllInfo[0].sprite3D.parent.name), s = this.getObject(this.m_outHitAllInfo[0].sprite3D.parent.name);
                        if (n)
                            return this.gotoUnit(n), void 0;
                        if (s)
                            return this.gotoUnit(s), void 0;
                    }
                }
                var a = new Laya.Point(this._cam2.getSceneX(t), this._cam2.getSceneY(e));
                GameModel.pc && this.cteEff(a.x, a.y), a = PathManager.tilPoi(a.x, a.y);
                var o = TipsManager.ins, r = LangManager.ins;
                if (1 == this.autoType) {
                    if (!this.autoFind)
                        return this.autoFind = {
                            x: a.x,
                            y: a.y,
                            time: Laya.Browser.now()
                        }, o.t(r.v("Main_guaji3")), void 0;
                    if (Laya.Browser.now() - this.autoFind.time >= 2e3)
                        return this.autoFind.x = a.x, this.autoFind.y = a.y, this.autoFind.time = Laya.Browser.now(), o.t(r.v("Main_guaji3")), void 0;
                    this.svo.level > 1 && this.changeAutoType(0);
                }
                if (this.autoFind = null, !(this.svo.level <= 1) || PathManager.canWalk(a.x, a.y)) {
                    var h = PathManager.wlkPoi(new Laya.Point(this._self.data.x, this._self.data.y), a);
                    if (a = h ? h : a, this._self.staCtrl.curSta == StateDefine.GUAJI) {
                        o.t(r.v("Main_guaji1"));
                        var l = UIManager.instance.mainView;
                        l && l.vw3 && (l.vw3.udFtSt(3), l.vw3.fhtHdr(null)), this._self.tempGuajiTime = Laya.Browser.now();
                    }
                    AttackController.chgPoi(a.x, a.y), this.gotoTilePoint(this._mvo.id, a.x, a.y, !0);
                }
            }
        };
        SceneManager.prototype.gotoUnit = function (t) {
            if (t.type == UnitType.NPC)
                this.gotoNPC(t.data.param.id);
            else if (t.type == UnitType.Teleport)
                this._self.staCtrl.curSta == StateDefine.TELEPORT && this._self.staCtrl.curPar && (this._self.staCtrl.curPar.tempId = t.data.param.id), this.gotoTeleport(t.data.param.id);
            else if (t.type == UnitType.Fly)
                this.gotoFly(t.data.param.id);
            else if (t.type == UnitType.Role)
                this.selectedObject != t ? AttackController.setRTar(t.data.guid, !0) : t instanceof ActiveUnit && t.canAtk() && this.m_pkMode.check(this._self, t, 3, !0) && (this._self.staCtrl.curSta != StateDefine.GUAJI && this._self.doSta(StateDefine.ATTACK), AttackController.setRTar(t.guid, !0), this._self.actCtrl.curKey != ActionDefine.Skill && this._self.doAtk(t));
            else if (t.type == UnitType.Monster) {
                if (t.data.state && (this._mMng.mapVO.mapType == MapType.VIPBoss || this._mMng.mapVO.mapType == MapType.OutdoorBoss || MapManager.ins.isDingShiBossMap() || MapManager.ins.isBorderMap()))
                    return;
                this.selectedObject != t ? AttackController.setRTar(t.data.guid, !0) : t instanceof ActiveUnit && t.canAtk() && this.m_pkMode.check(this._self, t, 3, !0) && (this._self.staCtrl.curSta != StateDefine.GUAJI && this._self.doSta(StateDefine.ATTACK), AttackController.setRTar(t.guid, !0), this._self.actCtrl.curKey != ActionDefine.Skill && this._self.doAtk(t));
            }
            else
                t.type == UnitType.Collect ? (this.cancelGuaJi(), this.gotoCollectByGuid(t.data.guid)) : t.type == UnitType.Drop ? (this.cancelGuaJi(), this.gotoDrop(t.data.guid)) : t.type == UnitType.Box && (this.cancelGuaJi(), this.gotoDrop(t.data.guid));
        };
        SceneManager.prototype.gotoTilePoint = function (t, e, i, n) {
            if (void 0 === n && (n = !1), this._mvo.id == t)
                this._self.movTo(e, i, 0, n) && this._self.doSta(StateDefine.MOVE);
            else {
                var s = ObjectPool.g("StateParamVO");
                s.state = StateDefine.MOVE, s.target = new Laya.Point(e, i), this.teleportToNext(t, s);
            }
        };
        SceneManager.prototype.gotoPath = function (t) {
            if (!this.m_isChangeScene && this._self && this._self.actCtrl && this._self.actCtrl.curKey != ActionDefine.Dead) {
                if (this.breakCollect(), this._self.staCtrl.curSta == StateDefine.GUAJI) {
                    TipsManager.ins.t(LangManager.ins.v("Main_guaji1"));
                    var e = UIManager.instance.mainView;
                    e && e.vw3 && (e.vw3.udFtSt(3), e.vw3.fhtHdr(null)), this._self.tempGuajiTime = Laya.Browser.now();
                }
                this._self.doSta(StateDefine.MOVE), this._self.movBy(t);
            }
        };
        SceneManager.prototype.shanBi = function (t) {
            if (this._self.actCtrl && this.self.actCtrl.curKey != ActionDefine.Shan)
                if (this._mMng.shanBiVO)
                    Log.i("闪避请求中");
                else {
                    var e = PathManager.tilPoi(this.self.scePos.x, this.self.scePos.y);
                    e = PathManager.getLenPointByRadian(e, t, this.m_shanLen);
                    var i = 90 - Util.radian2angle(t);
                    this._mMng.shanBiVO = ObjectPool.g("ActionParamVO"), this._mMng.shanBiVO.target = e, this._mMng.shanBiVO.rotation = 0 > i ? 360 + i : i, this._mMng.reqShanBiUse();
                }
        };
        SceneManager.prototype.jump = function () { };
        SceneManager.prototype.moveFly = function (t, e, i) {
            var n = ObjectPool.g("ActionParamVO");
            n.fly = e, n.target = i, this._self.doAct(ActionDefine.Fly, n), (MapManager.ins.mapVO.mapType != MapType.JingJi || this._self.data.type != UnitType.JQUnit) && this._mMng.sendFly(t.x, t.y);
        };
        SceneManager.prototype.gotoFly = function (t, i) {
            void 0 === i && (i = !0);
            var n = this.getStatic(UnitType.Fly + "_" + t);
            if (n && n.data) {
                var s = e.ins.tiaoyueObj;
                if (s && n.data.x == this._self.data.x && n.data.y == this._self.data.y && s[n.data.x + "|" + n.data.y]) {
                    this._self.doSta(StateDefine.MOVE);
                    var a = ObjectPool.g("ActionParamVO");
                    a.fly = s[n.data.x + "|" + n.data.y], this._self.doAct(ActionDefine.Fly, a), this._mMng.sendFly(n.data.x, n.data.y);
                }
                else
                    this.gotoTilePoint(this._mvo.id, n.data.x, n.data.y);
            }
        };
        SceneManager.prototype.gotoNPC = function (t, e, i) {
            if (void 0 === e && (e = !0), void 0 === i && (i = null),
                this._self && this._self.actCtrl && this._self.actCtrl.curKey != ActionDefine.Dead) {
                var n = NpcDB.getDataById(t);
                if (n)
                    if (this.breakCollect(), this._mvo.id == n.mapid) {
                        var s = this.getStatic(UnitType.NPC + "_" + t);
                        if (s) {
                            if (this._self.staCtrl.curSta != StateDefine.NPC) {
                                var a = ObjectPool.g("StateParamVO");
                                a.tempId = s.data.param.id, this._self.doSta(StateDefine.NPC, a);
                            }
                            var o = MathUtil.getPixelDistance(this._self.scePos, s.scePos);
                            if (o > 200) {
                                if (e) {
                                    this.changeAutoType(1);
                                    var r = PathManager.tilPoi(s.scePos.x, s.scePos.y);
                                    r = PathManager.linPoi1(this.self.data.x, this.self.data.y, r.x, r.y, 60),
                                        s && r.x == s.data.x && r.y == s.data.y && (r = PathManager.ranPoi(r.x, r.y, 1, 1)),
                                        this._self.movTo(r.x, r.y);
                                }
                            }
                            else {
                                if (this.changeAutoType(0), 3 == n.mapid && ClanWarManager.ins.getCZN(n.id))
                                    return UIManager.instance.openWindow(UIManager.CLANWARWORSHIP, !0, null, !0), void 0;
                                if (MarryMrg.ins.isOpenWin(n.mapid, n.id) && FuncOpenManager.ins.isOpen(FuncOpenRule.MARRY))
                                    return UIManager.instance.openWindow(UIManager.HN_WIN, !0, null, !0), void 0;
                                var h = TaskManager.instance.openNpcWin(n.id);
                                if (h.isOpen && !UIManager.instance.isOpen(UIManager.NPC_WIN))
                                    h.taskvo && h.taskvo.tasktype == TaskType.DAILY_TASK && UIManager.instance.closeWin(UIManager.TASK_DAILYWIN), UIManager.instance.openWindow(UIManager.NPC_WIN, !0, {
                                        npc: s.data,
                                        taskVo: h.taskvo
                                    });
                                else if (!h.isOpen) {
                                    var l = s.data.param.gongid ? s.data.param.gongid.split(";") : null;
                                    l && l.length > 0 ? l.length > 1 ? UIManager.instance.openWindow(UIManager.NPC_WIN, !0, {
                                        npc: s.data,
                                        taskVo: null
                                    }) : this.npcGongNeng(l[0]) : s.data.param.speech ? UIManager.instance.openWindow(UIManager.NPC_WIN, !0, {
                                        npc: s.data,
                                        taskVo: null
                                    }) : Log.i("无任务，无功能选项，无NPC对白");
                                }
                                var c = this._self.staCtrl.curSta;
                                c != StateDefine.STAND && c != StateDefine.DEAD && this._self.doSta(StateDefine.STAND);
                            }
                        }
                    }
                    else {
                        this.changeAutoType(1);
                        var u = ObjectPool.g("StateParamVO");
                        u.state = StateDefine.NPC, u.tempId = t, this.teleportToNext(n.mapid, u, i);
                    }
            }
        };
        SceneManager.prototype.npcGongNeng = function (t) {
            var e = this;
            switch (t) {
                case "0":
                    UIManager.instance.openWindow(UIManager.STORE_STOREWIN, !0, {
                        tabIndex: 0
                    }, !0);
                    break;
                case "1":
                    UIManager.instance.openWindow(UIManager.PET_WIN, !0, {
                        tabIndex: 0
                    }, !0);
                    break;
                case "5":
                    HuSongXianNvManager.ins.reqICB(function () {
                        if (HuSongXianNvManager.ins.escort > 0)
                            UIManager.instance.openWindow(UIManager.HUSONGXIANNV, !0, null, !0);
                        else {
                            var t = EveryDayTem.getDatas(HuSongXianNvManager.HSI), i = t.obtain, n = NpcDB.getDataById(i);
                            if (n) {
                                var s = e.getStatic(UnitType.NPC + "_" + i);
                                if (s) {
                                    {
                                        TaskManager.instance.openNpcWin(s.data.param.id);
                                    }
                                    UIManager.instance.openWindow(UIManager.NPC_WIN, !0, {
                                        npc: s.data,
                                        taskVo: null
                                    });
                                }
                            }
                        }
                    });
            }
        };
        SceneManager.prototype.moveTeleport = function (t) {
            if (this._self.staCtrl.curSta != StateDefine.TELEPORT) {
                var e = ObjectPool.g("StateParamVO");
                this._self.doSta(StateDefine.TELEPORT, e);
            }
            this._self.staCtrl.curPar && (this._self.staCtrl.curPar.tempId = null), this._mMng.reqTelport(t);
        };
        SceneManager.prototype.gotoTeleport = function (t, e) {
            if (void 0 === e && (e = !0), this._self && this._self.actCtrl && this._self.actCtrl.curKey != ActionDefine.Dead) {
                var i = ChuanSongDB.getDataById(t);
                if (this._mvo.id == i.map1) {
                    var n = this.getStatic(UnitType.Teleport + "_" + t);
                    if (n) {
                        var s = Util.getPixelDistance(this._self.scePos, n.scePos);
                        if (s > 50) {
                            if (e) {
                                if (this.changeAutoType(1), this._self.staCtrl.curSta != StateDefine.TELEPORT) {
                                    var a = ObjectPool.g("StateParamVO");
                                    a.tempId = n.data.param.id, this._self.doSta(StateDefine.TELEPORT, a);
                                }
                                var o = PathManager.tilPoi(n.scePos.x, n.scePos.y);
                                this._self.movTo(o.x, o.y, 0);
                            }
                        }
                        else
                            this._self.staCtrl.curPar && (this._self.staCtrl.curPar.tempId = null), this._mMng.reqTelport(Number(n.data.param.id));
                    }
                }
                else {
                    this.changeAutoType(1);
                    var r = ChuanSongDB.getPathCrossMap(this._mvo.id, i.map1);
                    if (r) {
                        var a = ObjectPool.g("StateParamVO");
                        a.teleArr = r, a.mapId = this._mvo.id, this._self.doSta(StateDefine.TELEPORT, a);
                    }
                    else
                        TaskManager.instance.onHandRoleAction(), Log.e("找不到跨地图的传送点路径  mapId1=" + this._mvo.id + "   mapId2=" + i.map1);
                }
            }
        };
        SceneManager.prototype.gotoCollect = function (t, e, i, n, s) {
            if (void 0 === s && (s = !0), this._self && this._self.actCtrl && this._self.actCtrl.curKey != ActionDefine.Dead) {
                if (MarryMrg.ins.BtIng())
                    return TipsManager.ins.e(LangManager.ins.v("yy_1015")), void 0;
                if (this._mvo.id == t) {
                    if (this._self.staCtrl.curSta != StateDefine.COLLECT) {
                        var a = ObjectPool.g("StateParamVO");
                        a.target = new Laya.Point(e, i), a.tempId = n, a.mapId = t, this._self.doSta(StateDefine.COLLECT, a);
                    }
                    var o = PathManager.pixPoi(e, i), r = Util.getPixelDistance(this._self.scePos, o);
                    if (r > 100)
                        s && (this.changeAutoType(1), this._self.movTo(e, i, 30));
                    else {
                        for (var h, l, c = this.getUnitListByType(UnitType.Collect), u = c.length - 1; u >= 0; u--)
                            if (l = this.getObject(c[u]), l && l.type == UnitType.Collect && l.data && l.data.template == n) {
                                h = l;
                                break;
                            }
                        h ? (this.changeAutoType(0), h.data.ctype == CollectType.Open ? this.gotoTreasure(t, h.data.x, h.data.y, "1", !0) : this._mMng.reqCollectStart(h.data.sguid)) : Log.e("找不到采集物" + n);
                    }
                }
                else {
                    var p = ObjectPool.g("StateParamVO");
                    p.state = StateDefine.COLLECT, p.target = new Laya.Point(e, i), p.tempId = n, p.mapId = t, this.teleportToNext(t, p);
                }
            }
        };
        SceneManager.prototype.gotoCollectByGuid = function (t, i) {
            var n = this;
            if (void 0 === i && (i = !0), this._self && this._self.actCtrl && this._self.actCtrl.curKey != ActionDefine.Dead) {
                if (MarryMrg.ins.BtIng())
                    return TipsManager.ins.e(LangManager.ins.v("yy_1015")), void 0;
                this.breakCollect();
                var s = this.getObject(t);
                if (s) {
                    var a = TipsManager.ins, o = LangManager.ins, r = Util.getPixelDistance(this._self.scePos, s.scePos);
                    if (r > 100)
                        if (i) {
                            if (this._self.staCtrl.curSta != StateDefine.COLLECT) {
                                var h = ObjectPool.g("StateParamVO");
                                h.unitId = s.data.guid, this._self.doSta(StateDefine.COLLECT, h);
                            }
                            this.changeAutoType(1);
                            var l = PathManager.tilPoi(s.scePos.x, s.scePos.y);
                            s.data.ctype == CollectType.Enjoy ? this._self.movTo(l.x, l.y, 90) : this._self.movTo(l.x, l.y, 30);
                        }
                        else
                            s.data.ctype == CollectType.Enjoy && (ClanActManager.ins.isc ? a.e(o.v("ClanAct_1022")) : (this.changeAutoType(0), this._self.doSta(StateDefine.COLLECT), this._mMng.reqCollectStart(s.data.sguid)));
                    else if (s.data.ctype != CollectType.Enjoy || s.data.ctype == CollectType.Enjoy && !ClanActManager.ins.isc)
                        if (s.data.ctype == CollectType.Open) {
                            this.selectedObject != s && this.setSelectedObject(s, !0);
                            var c = TreasureManager.ins;
                            if (c.trCpVo.opened >= c.nGN && !c.is3 && MapManager.ins.mapVO.mapType == MapType.TREASURE) {
                                if (c.trCpVo.opened >= c.tm1)
                                    return a.e("采集点不存在"), void 0;
                                var u = StringUtils.f(o.v("Treasue_10019"), c.pri, c.trCpVo.opened + 1);
                                Alert.show(u, function (t) {
                                    t == Alert.YES && (Number(e.ins.svo.gold) >= c.pri ? (c.is3 = !0, n.gotoCollectByGuid(s.data.guid)) : a.e(o.v("Pack_tips42")));
                                }, this, "提示", "center", "middle", 115, 70, 36, "", !0, "");
                            }
                            else
                                this.changeAutoType(0), this._self.doSta(StateDefine.COLLECT), this._mMng.reqCollectStart(s.data.sguid);
                        }
                        else
                            s.data.ctype != CollectType.Open && (this.changeAutoType(0), this._self.doSta(StateDefine.COLLECT), this._mMng.reqCollectStart(s.data.sguid));
                    else
                        a.e(o.v("ClanAct_1022"));
                }
            }
        };
        SceneManager.prototype.gotoTreasureByGuid = function (t, e) {
            if (void 0 === e && (e = !0), this._self && this._self.actCtrl && this._self.actCtrl.curKey != ActionDefine.Dead) {
                this.breakCollect();
                var i = this.getObject(t);
                if (i) {
                    var n = Util.getPixelDistance(this._self.scePos, i.scePos);
                    if (n > 100) {
                        if (e) {
                            var s = ObjectPool.g("StateParamVO");
                            s.unitId = i.data.guid, s.mapId = this._self.data.mapId, this._self.doSta(StateDefine.COLLECT, s), this.changeAutoType(1);
                            var a = PathManager.tilPoi(i.scePos.x, i.scePos.y);
                            this._self.movTo(a.x, a.y, 30);
                        }
                    }
                    else
                        this.gotoCollectByGuid(i.data.sguid);
                }
            }
        };
        SceneManager.prototype.breakCollect = function () {
            this._self.actCtrl.curKey == ActionDefine.Collect && (this._self.doAct(ActionDefine.Stand), this._mMng.reqCollectBreak(), this._mMng.reqTreasureBreak());
            var t = UIManager.instance.mainView;
            this._mMng.mapVO.mapType == MapType.OutdoorBoss && t && t.v12 && t.v12.parent && t.rvClVw();
        };
        SceneManager.prototype.gotoNextState = function (t) {
            t && (t.state == StateDefine.MOVE ? this.gotoTilePoint(t.mapId, t.target.x, t.target.y) : t.state == StateDefine.GUAJI ? this.gotoGuaJi(t.mapId, t.target.x, t.target.y, t.tempId) : t.state == StateDefine.NPC ? this.gotoNPC(t.tempId) : t.state == StateDefine.COLLECT ? this.gotoCollect(t.mapId, t.target.x, t.target.y, t.tempId) : t.state == StateDefine.MONSTER && this.gotoMonsterById(t.mapId, t.tempId), this.self.staCtrl.curPar && (this.self.staCtrl.curPar.nextStateVO = null), t.reset());
        };
        SceneManager.prototype.changeAutoType = function (t) {
            if (this.self && this.autoType != t) {
                var e = UIManager.instance.mainView;
                e && e.swAtVw(t), this.svo.mount ? 1 == t ? this.self.ride = 1 : 2 == t && (this.self.ride = 2) : this.self.ride = 0, this.autoType = t;
            }
        };
        SceneManager.prototype.cancelGuaJi = function () {
            var t = UIManager.instance.mainView;
            t && t.vw3 && (t.vw3.udFtSt(1), t.vw3.fhtHdr(null)), this.self && (this.self.tempGuajiTime = 0);
        };
        SceneManager.prototype.taskGuaJi = function (t, e, i, n, s) {
            if (void 0 === n && (n = null), void 0 === s && (s = !0), this._self && (!this._self || this._self.actCtrl)) {
                var a = this._self.actCtrl.curKey;
                if (a != ActionDefine.Dead && a != ActionDefine.Fly && a != ActionDefine.Shose && a != ActionDefine.Teleport) {
                    var o = UIManager.instance.mainView;
                    o && o.vw3 && (o.vw3.udFtSt(2), o.vw3.fhtHdr(null)), AttackController.chgPoi(e, i), AttackController.setRTar(null, !1);
                    var r = ObjectPool.g("StateParamVO");
                    r.mapId = t, r.target = new Laya.Point(e, i), r.tempId = n, this._self.doSta(StateDefine.GUAJI, r), this.gotoGuaJi(t, e, i, n, s);
                }
            }
        };
        SceneManager.prototype.gotoGuaJi = function (t, e, i, n, s) {
            void 0 === n && (n = null), void 0 === s && (s = !0);
            var a = this._self.actCtrl.curKey;
            if (a != ActionDefine.Dead && a != ActionDefine.Fly && a != ActionDefine.Shose && a != ActionDefine.Teleport)
                if (this._mvo.id == t) {
                    if (this._self.staCtrl.curSta != StateDefine.GUAJI && !HuSongXianNvManager.ins.isEsct) {
                        var o = ObjectPool.g("StateParamVO");
                        o.target = new Laya.Point(e, i), o.tempId = n, this._self.doSta(StateDefine.GUAJI, o), AttackController.chgPoi(e, i);
                    }
                    var r = PathManager.pixPoi(e, i), h = Util.getPixelDistance(this._self.scePos, r);
                    if (h > 200)
                        s && this._self.movTo(e, i, 120);
                    else {
                        this.changeAutoType(2);
                        var l = this._self.atkCtrl.findCur();
                        if (l && (!n || l.type == UnitType.Monster && l.data.template == n))
                            return this._self.doAtk(l), this._self.pet && this._self.pet.doAtk(l), void 0;
                        if (l = this._self.atkCtrl.findRoleToAttack())
                            return this.self.doAtk(l), void 0;
                        if (!this._mMng.mapVO.autoPick && (l = this.getPickableDrop(!0, 5, !1), l && l.data)) {
                            var c = this._self.staCtrl.curPar;
                            return this._self.staCtrl.curSta == StateDefine.GUAJI && c && c.target && (c.target.x = l.data.x, c.target.y = l.data.y), this._self.movTo(l.data.x, l.data.y, 30), void 0;
                        }
                        if (l = this._self.atkCtrl.findMonsterToAttack(n))
                            return this.self.doAtk(l), void 0;
                        if (n && Log.i("没有找到对应模板的怪物：" + n), !l && this._mMng.mapVO.mapType == MapType.TREASURE && TreasureManager.ins.trCpVo && TreasureManager.ins.trCpVo.opened < 5)
                            return TreasureManager.ins.stTre(), void 0;
                        if (this._mMng.mapVO.mapType == MapType.CaiLiao ? CopyMaterialManager.ins.chgGJ() : MapManager.ins.isCopyMap() && this._mMng.mapVO.mapType != MapType.OutdoorBoss && CopyDoubleManager.ins.chgGJ(this._mMng.mapVO.mapType), AttackController.getBck()) {
                            var r = AttackController.getPoi();
                            this._self.movTo(r.x, r.y, 0);
                        }
                    }
                }
                else {
                    var u = ObjectPool.g("StateParamVO");
                    u.state = StateDefine.GUAJI, u.target = new Laya.Point(e, i), u.tempId = n, u.mapId = t, this.teleportToNext(t, u);
                }
        };
        SceneManager.prototype.gotoJuQing = function () {
            var t = this._self.staCtrl;
            t.curPar && t.curPar.tempId && this._self.atkCtrl.setUse(t.curPar.tempId);
            var e;
            t.curPar && t.curPar.unitId && (e = this.getStoryObject(t.curPar.unitId)), e || (e = AttackController.getRTar()), e ? this._self.doAtk(e) : this._self.doAtk(null);
        };
        SceneManager.prototype.gotoMonsterById = function (t, e, i) {
            if (void 0 === i && (i = !0), this._self.actCtrl.curKey != ActionDefine.Dead)
                if (this._mvo.id == t) {
                    for (var n, s, a = this.getMonsterListByTempId(e), o = a.length - 1; o >= 0; o--)
                        if (s = this.getObject(a[o]), s && s.type == UnitType.Monster && s.data.template == e) {
                            n = s;
                            break;
                        }
                    if (n) {
                        var r = Util.getPixelDistance(this._self.scePos, n.scePos);
                        if (r > 200) {
                            if (i) {
                                if (this._self.staCtrl.curSta != StateDefine.MONSTER) {
                                    var h = ObjectPool.g("StateParamVO");
                                    h.unitId = n.data.guid, this._self.doSta(StateDefine.MONSTER, h);
                                }
                                var l = PathManager.tilPoi(n.scePos.x, n.scePos.y);
                                this._self.movTo(l.x, l.y, 120);
                            }
                        }
                        else
                            this.changeAutoType(2), n.canAtk() && PKModeManager.instance.check(this.self, n) && this._self.doAtk(n);
                    }
                }
                else {
                    var c = ObjectPool.g("StateParamVO");
                    c.state = StateDefine.MONSTER, c.tempId = e, this.teleportToNext(t, c);
                }
        };
        SceneManager.prototype.gotoDrop = function (t, e) {
            if (void 0 === e && (e = !0), this._self.actCtrl.curKey != ActionDefine.Dead) {
                var i = t ? this.getObject(t) : this.getPickableDrop(!1, 10, !0);
                if (i instanceof Drop || i instanceof Box) {
                    var n = TipsManager.ins, s = LangManager.ins, a = GameModel.serverInfo.serverTime;
                    if (i.data instanceof DropVO && i.data.dropTime > 0 && a < i.data.dropTime)
                        return this._mMng.mapVO.mapType == MapType.OutdoorBoss || this._mMng.mapVO.mapType == MapType.VIPBoss ? n.e(StringUtils.f(s.v("Main_pick5"), Math.floor((i.data.dropTime - a) / 1e3))) : n.e(s.v("Main_pick2")), void 0;
                    if (i.data instanceof DropVO && i.data.goodsTem.id != CommonRule.Id_YinLiang && PackManager.ins.getPackFull(1))
                        return n.e(s.v("Main_pick3")), void 0;
                    var o = Util.getPixelDistance(this._self.scePos, i.scePos);
                    if (i instanceof Box && 200 > o) {
                        var r = i.data, h = OutdoorBossManager.ins.bDp;
                        !r.bossHarm || r.bossHarm < OutdoorBossConfigTem.BoxHarm ? n.e(s.v("Boss_2023")) : r.needdrop > h ? n.e(s.v("Boss_2024")) : r.isgetReward ? n.e(s.v("Boss_2025")) : PackManager.ins.getPackFull(10) ? n.e(s.v("Boss_2026")) : (this._self.doSta(StateDefine.DROP), OutdoorBossManager.ins.pkBox(i.data.sguid, i.data.template));
                    }
                    else if (o > 100) {
                        if (e) {
                            var l = ObjectPool.g("StateParamVO");
                            l.unitId = i.data.guid, this._self.doSta(StateDefine.DROP, l);
                            var c = PathManager.tilPoi(i.scePos.x, i.scePos.y);
                            this._self.movTo(c.x, c.y, 30);
                        }
                    }
                    else
                        this._self.doSta(StateDefine.DROP), this._mMng.reqPickup([i.data.sguid]);
                }
                else
                    this._self.doSta(StateDefine.STAND);
            }
        };
        SceneManager.prototype.gotoTreasure = function (t, e, i, n, s) {
            if (void 0 === s && (s = !0), this._self.actCtrl.curKey != ActionDefine.Dead && this._mvo.id == t) {
                if (this._self.staCtrl.curSta != StateDefine.COLLECT) {
                    var a = ObjectPool.g("StateParamVO");
                    a.target = new Laya.Point(e, i), a.tempId = n, a.mapId = t, this._self.doSta(StateDefine.COLLECT, a);
                }
                this.changeAutoType(0), this._mMng.reqTreasureStart(null);
            }
        };
        SceneManager.prototype.getPickableDrop = function (t, e, i) {
            void 0 === e && (e = 5), void 0 === i && (i = !1);
            var n = new Array, s = this.getUnitListByType(UnitType.Drop);
            if (s && s.length) {
                var a, o, r, h = SetManager.instance, l = GameModel.serverInfo.serverTime, c = [];
                for (a = s.length - 1; a >= 0; a--)
                    r = this.getObject(s[a]), null != r && (o = r.data, o.dropTime > 0 && l < o.dropTime || PathManager.canWalk(o.x, o.y) && !PathManager.isPath(o.x, o.y) && (!t || h.autoPick(o.goodsTem)) && (t && PackManager.ins.getPackFull(5) || (o.distance = Util.getPixelDistance(r.scePos, this.self.scePos), t && o.distance < 100 ? c.push(o.sguid) : o.distance <= 85 * e && n.push(r))));
                if (t && c.length)
                    return this._mMng.reqPickup(c), n.length ? n[0] : null;
            }
            return 0 == n.length ? (i && TipsManager.ins.e(LangManager.ins.v("Main_pick1")), null) : 1 == n.length ? n[0] : (n.sort(this.sortDrop), n[0]);
        };
        SceneManager.prototype.sortDrop = function (t, e) {
            return t.data.distance < e.data.distance ? -1 : 1;
        };
        SceneManager.prototype.autoPickDrop = function () {
            if (!(!this._mvo.autoPick || this.m_dropArr.length <= 0 || Laya.Browser.now() - this.m_dropTime < 1e3)) {
                var t = this.m_dropArr;
                if (t && t.length) {
                    var e, i, n, s = (SetManager.instance, GameModel.serverInfo.serverTime, []);
                    for (e = t.length - 1; e >= 0; e--)
                        n = this.getObject(t[e]), null != n && (i = n.data, s.push(i.sguid));
                    s.length && this._mMng.reqPickup(s);
                }
            }
        };
        SceneManager.prototype.teleportToNext = function (t, e, i) {
            void 0 === i && (i = null);
            var n = ChuanSongDB.getPathCrossMap(this._mvo.id, t);
            if (n) {
                var s = RoleBornPointTem.getRoleBornPointTemByMap(t), a = s.point.split(";");
                if (a = s.bornType - 1 == Mapsubtype.Border && a.length > 2 ? a[0 == this.svo.fieldIndex ? Number("0" == this.svo.camp ? 0 : Number(this.svo.camp) - 1) : this.svo.fieldIndex - 1].split("|") : a[0].split("|"), this.svo.level >= this.m_needLevel && TaskManager.instance.currentTaskType != TaskType.HUSONGXIANNV_TASK)
                    i && i.length > 1 && s.bornType - 1 != Mapsubtype.Border ? MapManager.ins.reqShoes(t, Number(i[0]), Number(i[1]), !0, e) : MapManager.ins.reqShoes(t, Number(a[0]), Number(a[1]), !0, e);
                else {
                    e.mapId = t;
                    var o = ObjectPool.g("StateParamVO");
                    o.teleArr = n, o.nextStateVO = e, this.self.doSta(StateDefine.TELEPORT, o);
                    var r = n.shift();
                    this.self.staCtrl.curPar.tempId = r.id, this.gotoTeleport(r.id, !0);
                }
            }
            else
                e && e.reset(), TaskManager.instance.onHandRoleAction(), Log.e("找不到跨地图的传送点路径  mapId1=" + this._mvo.id + "   mapId2=" + t);
        };
        SceneManager.prototype.findPoint = function (t, e, i) {
            if (this.svo.mapId != t) {
                var n = ObjectPool.g("StateParamVO");
                n.state = StateDefine.MOVE, n.mapId = t, n.target = new Laya.Point(e, i), this.teleportToNext(t, n);
            }
            else
                this.gotoTilePoint(t, e, i);
        };
        SceneManager.prototype.checkToAttack = function (t) {
            var e = TipsManager.ins, i = LangManager.ins;
            this.self.actCtrl.curKey != ActionDefine.Skill || this.self.actCtrl.curAct && this.self.actCtrl.curAct.isEnd ? (1 == this.self.ride && (this.self.ride = 2), this.self.atkCtrl.setUse(t.id), this.self.staCtrl.curSta != StateDefine.GUAJI && this.self.doSta(StateDefine.ATTACK), this.findToAttack()) : t.normal || e.e(i.v("Main_skill3"));
        };
        SceneManager.prototype.resetTarget = function () {
            AttackController.setRTar(null, !1), this.switchIdArr = [];
        };
        SceneManager.prototype.findToAttack = function () {
            var t = this._self.atkCtrl.findCur();
            return t ? (this._self.doAtk(t), this._self.pet && this._self.pet.doAtk(t), void 0) : (t = this._self.atkCtrl.findRoleToAttack()) ? (this.self.doAtk(t), void 0) : (t = this._self.atkCtrl.findMonsterToAttack()) ? (this.self.doAtk(t), void 0) : (this.self.doAtk(null), void 0);
        };
        SceneManager.prototype.switchAttackObject = function (t) {
            void 0 === t && (t = !1);
            var i, n, s, a, o = e.ins, r = [], h = [], l = [], c = [];
            for (a = o.getUnitListByType(UnitType.Role), n = 0; n < a.length; n++)
                s = o.getObject(a[n]), s && s.canAtk() && (s.isOpenRender || s.inView) && this.m_pkMode.check(o.self, s) && !s.self && r.push({
                    guid: a[n],
                    distance: Util.getPixelDistance(s.scePos, o.self.scePos)
                });
            if (0 == r.length || !t) {
                for (a = o.getMonsterListByType(0), n = 0; n < a.length; n++)
                    s = o.getObject(a[n]), s && s.canAtk() && (s.isOpenRender || s.inView) && this.m_pkMode.check(o.self, s) && h.push({
                        guid: a[n],
                        distance: Util.getPixelDistance(s.scePos, o.self.scePos)
                    });
                if (0 == h.length || !t) {
                    if (t)
                        for (a = o.getMonsterListInView(), n = 0; n < a.length; n++)
                            s = o.getObject(a[n]), s && s.canAtk() && (s.isOpenRender || s.inView) && this.m_pkMode.check(o.self, s) && l.push({
                                guid: a[n],
                                distance: Util.getPixelDistance(s.scePos, o.self.scePos)
                            });
                    if (0 == l.length || !t)
                        for (a = o.getMonsterListByType(1), n = 0; n < a.length; n++)
                            s = o.getObject(a[n]), s && s.canAtk() && (s.isOpenRender || s.inView) && this.m_pkMode.check(o.self, s) && l.push({
                                guid: a[n],
                                distance: Util.getPixelDistance(s.scePos, o.self.scePos)
                            });
                }
            }
            if (r.length > 0 && (r.sort(function (t, e) {
                return t.distance < e.distance ? -1 : 1;
            }), c = c.concat(r)), h.length > 0 && (h.sort(function (t, e) {
                return t.distance < e.distance ? -1 : 1;
            }), c = c.concat(h)), l.length > 0 && (l.sort(function (t, e) {
                return t.distance < e.distance ? -1 : 1;
            }), c = c.concat(l)), c)
                if (t)
                    c.length > 0 && (u = c.shift(), i = o.getObject(u.guid));
                else {
                    for (var u, p = 0; c.length > 0;)
                        if (u = c.shift(), s = o.getObject(u.guid), -1 == this.switchIdArr.indexOf(u.guid)) {
                            p = 1, i = s;
                            break;
                        }
                    0 == p && (this.switchIdArr.splice(0), i = s, TipsManager.ins.e(LangManager.ins.v("Main_switch1")));
                }
            i && (AttackController.setRTar(i.data.guid, !t), this.switchIdArr.push(i.data.guid));
        };
        SceneManager.prototype.debugFlyPath = function (t, e, i, n) {
            if (AttackManager.deb) {
                var s = this.m_debugLayer;
                s.scale(1, 1), s.pos(t, e), s.graphics.clear(), s.graphics.drawLines(0, 0, i, n);
            }
        };
        SceneManager.prototype.debugLines = function (t, e, i, n) {
            if (AttackManager.deb) {
                var s = this.m_debugLayer;
                s.scale(1, 1), s.pos(t, e), s.graphics.clear(), s.graphics.drawLines(0, 0, i, n);
            }
        };
        SceneManager.prototype.debugCircle = function (t, e, i, n) {
            if (AttackManager.deb) {
                var s = this.m_debugLayer;
                s.scale(1, 1), s.pos(t, e), s.graphics.clear(), s.graphics.drawCircle(0, 0, i, null, n), s.scale(1, .5);
            }
        };
        SceneManager.prototype.debugPie = function (t, e, i, n, s, a) {
            if (AttackManager.deb) {
                var o = this.m_debugLayer;
                o.scale(1, 1), o.pos(t, e), o.graphics.clear(), o.graphics.drawPie(0, 0, i, n, s, null, a), o.scale(1, .5);
            }
        };
        SceneManager.prototype.getUnitListByType = function (t) {
            return void 0 === t && (t = UnitType.Role), this.m_unitObj && this.m_unitObj[t] ? this.m_unitObj[t] : [];
        };
        SceneManager.prototype.getMonsterListByType = function (t) {
            return void 0 === t && (t = 1), this.m_monsTypeObj && this.m_monsTypeObj[t] ? this.m_monsTypeObj[t] : [];
        };
        SceneManager.prototype.getMonsterListByTempId = function (t) {
            return this.m_monsTempObj && this.m_monsTempObj[t] ? this.m_monsTempObj[t] : [];
        };
        SceneManager.prototype.getMonsterListInView = function () {
            return this.m_monsViewArr ? this.m_monsViewArr : [];
        };
        Object.defineProperty(SceneManager.prototype, "allObjects", {
            get: function () {
                return this.m_objectDic.getArray();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "addedObjects", {
            get: function () {
                return this.m_addedObj;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.prototype.getObject = function (t) {
            return this.m_objectDic.getValue(t);
        };
        SceneManager.prototype.addObject = function (t) {
            if (null == t || void 0 == t)
                return null;
            var e;
            if (t.type == UnitType.Self && this.m_objectDic.hasValue(t.guid)) {
                e = this.m_objectDic.getValue(t.guid);
                var i = PathManager.pixPoi(t.x, t.y);
                e.scePos.x = i.x, e.scePos.y = i.y;
            }
            else {
                if (e = ObjectFactory.getUnit(t), e.create(t), this.m_objectDic.put(e.guid, e), t instanceof MonsterVO) {
                    var n, s = t.difficulty == MonsterDifficulty.Common ? 1 : 0;
                    n = this.m_monsTypeObj[s], n || (n = this.m_monsTypeObj[s] = []), -1 == n.indexOf(t.guid) && n.push(t.guid);
                    var a = t.template;
                    n = this.m_monsTempObj[a], n || (n = this.m_monsTempObj[a] = []), -1 == n.indexOf(t.guid) && n.push(t.guid);
                }
                else
                    t instanceof DropVO && this._mMng.mapVO.autoPick && t.own && ("0" == t.own || t.own == this.svo.guid) && (this.m_dropTime = Laya.Browser.now(), -1 == this.m_dropArr.indexOf(t.guid) && this.m_dropArr.push(t.guid));
                this.m_unitObj[t.type] || (this.m_unitObj[t.type] = []), -1 == this.m_unitObj[t.type].indexOf(t.guid) && this.m_unitObj[t.type].push(t.guid);
            }
            if (t.type == UnitType.Self)
                this.focusUnit = e, this.addObjectToScene(e);
            else if (e.add) {
                var o = e.add;
                !this.m_monitor.isLimit || e.type != UnitType.Monster && e.type != UnitType.Pet && e.type != UnitType.Drop || (o = this.m_objectManager.limitAdd(e)), o && (e.isOpenRender = !0, this.addObjectToScene(e));
            }
            else
                e.inView && (e.type == UnitType.Monster && e.data.difficulty == MonsterDifficulty.Common && -1 == this.m_monsViewArr.indexOf(t.guid) && this.m_monsViewArr.push(t.guid), e.isOpenRender = !1, e.addTitSce());
            if (e.type == UnitType.Role && String(t.fsguid) == this._svo.guid) {
                var r, h = this.self.getBuf();
                h && (r = h.getFsFuff()), r && e.updFsBar(r.time, r.template.time, !0);
            }
            return e;
        };
        SceneManager.prototype.removeObject = function (t) {
            var e, i = this.m_objectDic.getValue(t);
            if (i) {
                if (i.data && i.data instanceof MonsterVO) {
                    var n, s = i.data.difficulty == MonsterDifficulty.Common ? 1 : 0;
                    n = this.m_monsTypeObj[s], n && (e = n.indexOf(t), -1 != e && n.splice(e, 1));
                    var a = i.data.template;
                    n = this.m_monsTempObj[a], n && (e = n.indexOf(t), -1 != e && n.splice(e, 1));
                }
                this.m_unitObj[i.type] && (e = this.m_unitObj[i.type].indexOf(t), -1 != e && this.m_unitObj[i.type].splice(e, 1)), i.type == UnitType.Monster ? (e = this.m_objectManager.limitMonsArr.indexOf(t), -1 != e && this.m_objectManager.limitMonsArr.splice(e, 1), e = this.m_monsViewArr.indexOf(t), -1 != e && this.m_monsViewArr.splice(e, 1)) : i.type == UnitType.Drop ? (e = this.m_objectManager.limitDropArr.indexOf(t), -1 != e && this.m_objectManager.limitDropArr.splice(e, 1), e = this.m_dropArr.indexOf(t), -1 != e && this.m_dropArr.splice(e, 1)) : i.type == UnitType.Role && (e = this.m_objectManager.limitRoleArr.indexOf(t), -1 != e && this.m_objectManager.limitRoleArr.splice(e, 1)), this.m_objectDic.remove(t), i.rmvTitSce(), this.removeObjectFromScene(i), ObjectFactory.desObj(i);
            }
        };
        SceneManager.prototype.addObjectToScene = function (t) {
            if (null == this.selectedObject && this.switchAttackObject(!0), t.cont && t.cont.parent != this.m_roleLayer) {
                t.cont.parent && t.cont.parent.removeChild(t.cont), t.isOpenRender = !0, t.addPlySce(), this.m_roleLayer.addChild(t.cont);
                var e = this.m_addedObj.indexOf(t);
                -1 == e && this.m_addedObj.push(t);
            }
        };
        SceneManager.prototype.removeObjectFromScene = function (t) {
            if (t == this.selectedObject && (this.setSelectedObject(null, !1), this.switchAttackObject(!0)), t.cont && t.cont.parent) {
                t.cont.parent.removeChild(t.cont), t.isOpenRender = !1, t.rmvPlySce();
                var e = this.m_addedObj.indexOf(t);
                -1 != e && this.m_addedObj.splice(e, 1);
            }
        };
        Object.defineProperty(SceneManager.prototype, "allStatics", {
            get: function () {
                return this.m_staticObj;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.prototype.getStatic = function (t) {
            return this.m_staticObj[t];
        };
        Object.defineProperty(SceneManager.prototype, "storyStatics", {
            get: function () {
                return this.m_storyStaticObj;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "arenaStatics", {
            get: function () {
                return this.m_arenaObj;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.prototype.addStatic = function (t) {
            if (null == t || void 0 == t)
                return null;
            var e = ObjectFactory.getStatic(t);
            return e.create(t), this.m_staticObj[t.id] = e, this.m_unitObj[t.type] || (this.m_unitObj[t.type] = []), -1 == this.m_unitObj[t.type].indexOf(t.id) && this.m_unitObj[t.type].push(t.id), e.add ? (e.isOpenRender = !0, this.addStaticToScene(e)) : e.inView && (e.isOpenRender = !1, e.addTitSce(), e.addTitSce()), e;
        };
        SceneManager.prototype.getStoryObject = function (t) {
            return this.storyStatics ? this.storyStatics[t] : null;
        };
        SceneManager.prototype.getStoryUnitObj = function () {
            return this.m_storyUnitObj ? this.m_storyUnitObj[UnitType.JQUnit] : null;
        };
        SceneManager.prototype.addStoryStatic = function (t, e) {
            if (void 0 === e && (e = !1), null == t || void 0 == t)
                return null;
            var i = ObjectFactory.getUnit(t);
            return i.create(t), this.m_storyStaticObj || (this.m_storyStaticObj = {}), this.m_storyStaticObj[t.template] = i, this.m_storyUnitObj || (this.m_storyUnitObj = {}), this.m_storyUnitObj[t.type] || (this.m_storyUnitObj[t.type] = []), -1 == this.m_storyUnitObj[t.type].indexOf(t.id) && this.m_storyUnitObj[t.type].push(t.template), i.add ? (i.isOpenRender = !0, this.addStaticToScene(i)) : i.inView && (i.isOpenRender = !1, i.addTitSce(), i.addSideSce()), i instanceof Monster && i.hideBlood(), e && (this.focusUnit = i), i;
        };
        SceneManager.prototype.removeStoryStatic = function () {
            var t;
            for (var e in this.m_storyStaticObj)
                if (t = this.m_storyStaticObj[e]) {
                    if (t.data && this.m_storyUnitObj[t.type]) {
                        var i = this.m_storyUnitObj[t.type].indexOf(e);
                        -1 != i && this.m_storyUnitObj[t.type].splice(i, 1);
                    }
                    delete this.m_storyStaticObj[e], t.rmvTitSce(), this.removeStaticFromScene(t), ObjectFactory.desObj(t);
                }
        };
        SceneManager.prototype.removeSingeStoryStatic = function (t) {
            var e = this.m_storyStaticObj[t];
            if (e) {
                if (this.m_storyUnitObj[e.type]) {
                    var i = this.m_storyUnitObj[e.type].indexOf(t);
                    -1 != i && this.m_storyUnitObj[e.type].splice(i, 1);
                }
                delete this.m_storyStaticObj[t], e.rmvTitSce(), this.removeStaticFromScene(e), ObjectFactory.desObj(e);
            }
        };
        SceneManager.prototype.addSceneEffectStatic = function (t) {
            if (null == t || void 0 == t)
                return null;
            var e = ObjectFactory.getUnit(t);
            return e.create(t), this.m_SEStaticObj || (this.m_SEStaticObj = {}), this.m_SEStaticObj[t.guid] = e, this.m_SEUnitObj || (this.m_SEUnitObj = {}), this.m_SEUnitObj[t.type] || (this.m_SEUnitObj[t.type] = []), -1 == this.m_SEUnitObj[t.type].indexOf(t.id) && this.m_SEUnitObj[t.type].push(t.template), e.add && (e.isOpenRender = !0, this.addObjectToScene(e)), e;
        };
        SceneManager.prototype.removeSceneEffectStatic = function () {
            var t;
            for (var e in this.m_SEStaticObj)
                if (t = this.m_SEStaticObj[e]) {
                    if (t.data && this.m_SEUnitObj[t.type]) {
                        var i = this.m_SEUnitObj[t.type].indexOf(e);
                        -1 != i && this.m_SEUnitObj[t.type].splice(i, 1);
                    }
                    delete this.m_SEStaticObj[e], t.rmvTitSce(), this.removeObjectFromScene(t), ObjectFactory.desObj(t);
                }
        };
        Object.defineProperty(SceneManager.prototype, "SEUnitObj", {
            get: function () {
                return this.m_SEStaticObj ? this.m_SEStaticObj : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "arenaObject", {
            get: function () {
                return this.m_arenaObj ? this.m_arenaObj : null;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.prototype.getArenaIUnit = function (t) {
            return this.m_arenaObj ? this.m_arenaObj[t] : null;
        };
        SceneManager.prototype.addArenaStatic = function (t, e) {
            if (void 0 === e && (e = !1), null == t || void 0 == t)
                return null;
            var i = ObjectFactory.getUnit(t);
            return i.create(t), this.m_arenaObj || (this.m_arenaObj = {}), this.m_arenaObj[String(t.guid)] = i, i.add ? (i.isOpenRender = !0, this.addStaticToScene(i), MarryMrg.ins.isMarryState(t.guid) && i.updSkin(("A" == t.job ? "js_" : "jv_") + "shizhuang06")) : i.inView && (i.isOpenRender = !1, i.addTitSce()), t.guid == this.svo.guid && (this.removeObject(t.guid), this.focusUnit = i), i;
        };
        SceneManager.prototype.removeArenaStatic = function () {
            JingJiManager.ins.onReAr();
            var t;
            for (var e in this.m_arenaObj)
                t = this.m_arenaObj[e], t && (delete this.m_arenaObj[e], t.rmvTitSce(), this.removeStaticFromScene(t), ObjectFactory.desObj(t));
        };
        SceneManager.prototype.removeStatic = function (t) {
            var e = this.m_staticObj[t];
            if (e) {
                if (this.m_unitObj[e.type]) {
                    var i = this.m_unitObj[e.type].indexOf(t);
                    -1 != i && this.m_unitObj[e.type].splice(i, 1);
                }
                delete this.m_staticObj[t], e.rmvTitSce(), this.removeStaticFromScene(e), ObjectFactory.desObj(e);
            }
        };
        SceneManager.prototype.addStaticToScene = function (t) {
            if (t.cont && t.cont.parent != this.m_roleLayer) {
                t.cont.parent && t.cont.parent.removeChild(t.cont), t.isOpenRender = !0, t.addPlySce(), this.m_roleLayer.addChild(t.cont);
                var e = this.m_addedObj.indexOf(t);
                -1 == e && this.m_addedObj.push(t);
            }
        };
        SceneManager.prototype.removeStaticFromScene = function (t) {
            if (t.cont && t.cont.parent) {
                t.cont.parent.removeChild(t.cont), t.isOpenRender = !1, t.rmvTitSce(), t.rmvPlySce();
                var e = this.m_addedObj.indexOf(t);
                -1 != e && this.m_addedObj.splice(e, 1);
            }
        };
        SceneManager.prototype.clearObject = function () {
            this._cam2.reset(), this.focusUnit = null;
            for (var t, e = this.m_objectDic.getArray(), i = e.length - 1; i >= 0; i--)
                t = e[i], !t || t instanceof RoleSelf || ObjectFactory.desObj(t);
            this.m_objectDic.clear();
            var n, s = this.m_staticObj;
            for (var a in s)
                n = s[a], n && ObjectFactory.desObj(n);
            this.m_staticObj = {}, s = this.m_storyStaticObj;
            for (var a in s)
                n = s[a], n && ObjectFactory.desObj(n);
            this.m_storyStaticObj = {}, this.m_arenaObj && (this.removeArenaStatic(), this.m_arenaObj = {});
            var o, s = this.m_effectObj;
            for (var a in s)
                o = s[a], o && o.destroy();
            this.m_effectObj = {}, this.self && this._mvo && this.m_objectDic.put(this.svo.guid, this.self), this.m_dropArr = [];
        };
        SceneManager.prototype.cteEff = function (t, e) {
            var i = PathDefine.SKILL + "LayaScene_zhiying/zhiying.lh", n = ObjectPool.g("EffectPlayer");
            return n.on(ConstValue.COMPLETE, this.addPcEff, this), n.aType = AssetType.Effect, n.self = !1, n.lType = EffectLimitType.NO, n.rot = 0, n.ctrl = !1, n.pos(t, e), n.play(i, !1), n.setBack(this.rmvEff, this), n.lType != EffectLimitType.NO && OpBase.raise(n.lType), n;
        };
        SceneManager.prototype.addPcEff = function (t, e) {
            e && e instanceof EffectPlayer && e.dis3 && (e.off(ConstValue.COMPLETE, this.addPcEff, this), this.addEff(e, !1));
        };
        SceneManager.prototype.addEff = function (t, e) {
            void 0 === e && (e = !0), t.dis3 && (this.m_effectObj[t.dis3.id] = t, this.m_roleLayer.addChild(t.dis3), t.updRot(), t.chgDep(e ? 100 : -100), t.updPos());
        };
        SceneManager.prototype.rmvEff = function (t) {
            t.dis3 && (t.dis3.parent == this.m_roleLayer && this.m_roleLayer.removeChild(t.dis3), delete this.m_effectObj[t.dis3.id]);
        };
        SceneManager.prototype.addHurtEffect = function (t) {
            this.m_hurtLayer.addChild(t);
        };
        SceneManager.prototype.addTitleDisplay = function (t) {
            t instanceof MoviePlayer ? this.m_titleMovLayer.addChild(t) : t instanceof Laya.Label ? this.m_titleTxtLayer.addChild(t) : this.m_titleImgLayer.addChild(t);
        };
        SceneManager.prototype.addShadowDisplay = function (t) {
            this.m_shadowImgLayer.addChild(t);
        };
        SceneManager.prototype.culRot = function (t, e) {
            var i = new Laya.Vector3(t, e), n = new Laya.Vector3;
            this.cam3.convertScreenCoordToOrthographicCoord(i, n);
            var s = this.self.pos3D, a = Util.getPointAngle(n.x - s.x, n.y - s.y) + .5 * Math.PI, o = Util.radian2angle(a);
            return 0 > o ? 360 + o : o;
        };
        SceneManager.prototype.screenCoordTo3DCoord = function (t, e) {
            this._cam3.convertScreenCoordToOrthographicCoord(t, e);
        };
        SceneManager.prototype.orthographicCoordToScreenCoord = function (t, e) {
            this._cam3.viewport.project(t, this._cam3.projectionViewMatrix, e), e.x = e.x / Laya.stage.clientScaleX, e.y = e.y / Laya.stage.clientScaleY;
        };
        SceneManager.prototype.convertScreenCoordToOrthographicCoord = function () { };
        SceneManager.prototype.convertDepthOrthographicCoord = function (t, e, i) {
            var n = this.m_out, s = this.m_cameraForward;
            n.x = s.x * e, n.y = s.y * e, n.z = s.z * e, Laya.Vector3.subtract(t, n, i);
        };
        SceneManager.prototype.onForceRender = function (t, e) {
            this.m_frameNum++, this.cam2.update(e), this.sce2.update(), this.updPos(), this.m_spalshLayer.update();
            var i = Laya.AtlasResourceManager.instance.getAtlaserCount();
            return i += " : " + this.m_roleLayer.numChildren + "," + this.m_hurtLayer.numChildren, i += " : " + GameTick.toString() + "," + TimeUtils.toString() + "," + GameTween.toString() + "," + ChainTween.toString(), i += " : " + Laya.Browser.clientWidth + "," + Laya.Browser.clientHeight + "," + this.resizeParam, Laya.isMic && (Laya.Stat.paramStr += " : mic"), Laya.isPc && (Laya.Stat.paramStr += " : pc"), Laya.isIos && (Laya.Stat.paramStr += " : ios"), Laya.Browser.onAndroid && (Laya.Stat.paramStr += " : andriod"), Laya.Stat.paramStr = i, 0 == this.m_lastCheckTime ? this.m_lastCheckTime = t : t - this.m_lastCheckTime >= this.m_checkInterval && (this.m_lastCheckTime = t, this.m_selectedLock || this.switchAttackObject(!0)), 1;
        };
        Object.defineProperty(SceneManager.prototype, "isFinished", {
            get: function () {
                return this._fis;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "isOpenRender", {
            get: function () {
                return true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "priority", {
            get: function () {
                return RenderPriority.OFTEN;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "rending", {
            get: function () {
                return this._ren;
            },
            set: function (t) {
                this._ren = t;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.POS_CHG = "selfPositionChange";
        SceneManager.SCE_CHG = "changeScene";
        SceneManager.SLF_ENT = "selfEnter";
        SceneManager.SEL_VIW = "showSelectedView";
        return SceneManager;
    }(SDispatcher));
})(l || (l = {}));
//# sourceMappingURL=SceneManager.js.map