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
var MapManager = /** @class */ (function (_super) {
    __extends(MapManager, _super);
    function MapManager() {
        var _this = _super.call(this) || this;
        _this.m_packFullTip = 0;
        _this.reqCollectStartTime = 0;
        _this.reqCollectBreakTime = 0;
        _this.reqTreasureStartTime = 0;
        _this.reqTreasureBreakTime = 0;
        _this.onShouFeiChange = function (t, e, i) {
            if (i) {
                var n = ShouFeiDianManager.instance.getStarVo(i.type, i.dalei, i.jieshu);
                if (n || (n = ShouFeiDianManager.instance.getHhuanVo(i.type, i.dalei, i.jieshu)), i.type == SFDType.CHONGWU || i.type == SFDType.LINGWU) {
                    var s = this._sMng.getObject(String(i.guid));
                    s && s.data instanceof PetVO && (i.type == SFDType.CHONGWU ? (s.data.template = i.dalei, s.data.jieshu = i.jieshu, s.updSkin(n.res)) : i.type == SFDType.LINGWU && s.updWQ(0 == i.hide && n ? n.res : null));
                }
                else {
                    var a = this._sMng.getObject(String(i.guid));
                    a && (i.type == SFDType.ZUOQI ? a.updMout(0 == i.hide && n ? n.res : null) : i.type == SFDType.FABAO ? a.updFB(0 == i.hide && n ? n.res : null) : i.type == SFDType.SHENBING ? a.updSB(0 == i.hide && n ? n.res : null) : i.type == SFDType.PIFENG ? a.updPF(0 == i.hide && n ? n.res : null) : i.type == SFDType.LINGYI ? a.updLY(0 == i.hide && n ? n.res : null) : i.type == SFDType.TIANGANG ? a.updTG(0 == i.hide && n ? n.res : null) : i.type == SFDType.JINGJIE && a.updJJ(0 == i.hide && n ? n.level : 0));
                }
            }
        };
        _this.onFirstHarmBelong = function (t, e, i) {
            if (i) {
                var n = new RoleVO, s = this._sMng.getObject(i.guid);
                Number(i.firstHarmGuid) ? (n.firstHarmId = Number(i.firstHarmGuid), s.updFirst(n.firstHarmId, !0)) : s.updFirst(0, !0);
            }
        };
        return _this;
    }
    Object.defineProperty(MapManager, "ins", {
        get: function () {
            return this.m_i || (this.m_i = new SDispatcher());
        },
        enumerable: true,
        configurable: true
    });
    MapManager.prototype.register = function () {
        if (!this.m_registered) {
            this.sk = GameModel.socket, this.m_pkMode = PKModeManager.instance, this.m_roleModel = RoleModel.instance, this.m_packManager = PackManager.ins, this._sMng = SceneManager.ins, SceneCMD.register();
            var t = this.sk;
            t.on("20000", this.onChangeScene, this), t.on("21000", this.onObjectEnterScene, this), t.on("21001", this.onObjectEnterScene, this), t.on("21002", this.onObjectEnterScene, this), t.on("21004", this.onObjectEnterScene, this), t.on("21005", this.onObjectEnterScene, this), t.on("21006", this.onObjectEnterScene, this), t.on("21007", this.onObjectEnterScene, this), t.on("21008", this.onObjectEnterScene, this), t.on("21009", this.onObjectEnterScene, this), t.on("21010", this.onObjectEnterScene, this), t.on("22000", this.onObjectLevelScene, this), t.on("22001", this.onObjectLevelScene, this), t.on("22002", this.onObjectLevelScene, this), t.on("22004", this.onObjectLevelScene, this), t.on("22005", this.onObjectLevelScene, this), t.on("22006", this.onObjectLevelScene, this), t.on("22007", this.onObjectLevelScene, this), t.on("22008", this.onObjectLevelScene, this), t.on("22009", this.onObjectLevelScene, this), t.on("22010", this.onObjectLevelScene, this), t.on("22100", this.onObjectTelesport, this), t.on("40000", this.onObjectMove, this), t.on("40001", this.onPickup, this), t.on("44000", this.onObjectDead, this), t.on("44001", this.onObjectRelive, this), t.on("43004", this.onObjectRelive, this), t.on("90609", this.onObjectRelive, this), t.on("15900", this.ChestCollectionSyncResponse, this), t.on("22200", this.onObjectMonsterState, this), t.on(SFDCMD.SYNCHRO, this.onShouFeiChange, this), t.on(SceneCMD.RIDE, this.onMountRide, this), t.on(SceneCMD.STATE, this.onRoleState, this), t.on(SceneCMD.SHANBI, this.onShanBiValue, this), t.on(SceneCMD.SHANBI_USE, this.onShanBiUse, this), t.on(SceneCMD.SHOES, this.onShoes, this), t.on(SceneCMD.LINE_CHANGE, this.onChangeLine, this), t.on(SceneCMD.LINE_INFO, this.onLineMessage, this), t.on(SceneCMD.FLY, this.onObjectFly, this), t.on(SceneCMD.COLLECT_ENTER, this.onCollecEnter, this), t.on(SceneCMD.COLLECT_EXIT, this.onCollectExit, this), t.on(SceneCMD.PK_VALUE, this.onRolePKValue, this), t.on(SceneCMD.FJ_LIST, this.onFanJiList, this), t.on(SceneCMD.FJ_ADD, this.onFanJiAdd, this), t.on(SceneCMD.FJ_REMOVE, this.onFanJiRemove, this), t.on(SceneCMD.FJ_CLEAN, this.onFanJiClean, this), t.on(SceneCMD.ENEMY_ENTER, this.onEnemyPlayerEnter, this), t.on(SceneCMD.ENEMY_LEAVE, this.onEnemyPlayerLeave, this), t.on(SceneCMD.HATRED_ENTER, this.onHatredEnter, this), t.on(SceneCMD.HATRED_LEAVE, this.onHatredLeave, this), t.on(SceneCMD.BOSS_FIRST, this.onFirstHarmBelong, this), t.on(SceneCMD.GUARDHARM, this.GuardMonsterHurtChange, this), t.on(SceneCMD.BORDERSTEAL, this.onBorderStealChange, this), t.on(SceneCMD.MARRYCHANGE, this.onMarryStateChange, this), AttackManager.ins.reg(), CacheResUtils.run();
        }
    };
    Object.defineProperty(MapManager.prototype, "mapVO", {
        get: function () {
            return this.m_mapVO;
        },
        enumerable: true,
        configurable: true
    });
    MapManager.prototype.sendMove = function (t, e, i) {
        if (this.m_mapVO.mapType != MapType.JingJi) {
            var n = CMDManager.gq("40000");
            n.guid = t, n.x = e, n.y = i, n.mapId = this.m_mapVO.id, this.sk.send(4e4, n);
        }
    };
    MapManager.prototype.onChangeScene = function (t, e, i) {
        if (i) {
            Log.i("MapManager onChangeScene  mapId=" + i.mapId + " x=" + i.x + " y=" + i.y, "回包时间==" + Laya.Browser.now()), this._sMng.isChangeScene = !0, this.m_relive = 0;
            var n = this._sMng.svo;
            if (n.mapId = i.mapId, n.x = i.x, n.y = i.y, n.camp = i.camp, n.fieldIndex = i.fieldIndex, GameModel.clanwarJob = i.job, StoryManager.instance.enterParallel(i.story), this.m_mapVO = MapVO.getMapVO(i.mapId), this.m_mapVO) {
                this._sMng.reset();
                var s = SoundManager.instance;
                s.stopSounds(), s.clear(), this._sMng.changeMap(this.m_mapVO);
                var a = this._sMng.self;
                if (a)
                    if (a.actCtrl.curKey == ActionDefine.Shose) {
                        var o = a.actCtrl.getAct(a.actCtrl.curKey);
                        o.stopTween();
                        var r = PathManager.pixPoi(i.x, i.y);
                        this._sMng.cam2.follow(r), this._sMng.update(!0);
                        var h = this._sMng.cam2.top - 200;
                        n.y = PathManager.tilPoi(r.x, h).y, a.scePos.x = r.x, a.scePos.y = h;
                        var l = a.actCtrl.curAct.vo;
                        l && (l.data = i);
                    }
                    else
                        a.actCtrl.curKey == ActionDefine.Teleport || a.doAct(ActionDefine.Stand, null, !1);
                this.m_mapVO.pkPunish ? this.reqFanJiList() : a && (a.atkCtrl.fanjiArr = []);
            }
            else
                Log.e("SceneManager.changScene:未查到相应地图数据=" + i.mapId);
        }
    };
    MapManager.prototype.ChestCollectionSyncResponse = function (t, e, i) {
        var n, s, a, o = 0, r = TreasureManager.ins;
        for (o = i.caiJiWuVoList.length - 1; o >= 0; o--) {
            n = i.caiJiWuVoList[o], s = String(n.guid);
            var h = this._sMng.getObject(String(s));
            if (h) {
                {
                    i.caiJiWuVoList[o].status;
                }
                a = CollectDB.cloneVO(n.templateId);
                var l = a.asset.split(";");
                l.length > 1 ? h.updSkin(l[1]) : h.updSkin(l[0]);
            }
            r.vo2.push(s);
        }
        r.is3 = !1, r.trCpVo.opened += 1, r.dis(TreasureManager.TCU);
    };
    MapManager.prototype.GuardMonsterHurtChange = function (t, e, i) {
        this.guardHarm = i.hurt, CopyMaterialManager.ins.dis(CopyMaterialManager.HCE, CopyMaterialManager.ins, i);
    };
    MapManager.prototype.onBorderStealChange = function (t, e, i) {
        if (i) {
            var n = SceneManager.ins, s = n.getObject(String(i.guid));
            s && (String(i.guid) == n.svo.guid && (n.svo.borderSteal = i.status, 1 == TaskManager.instance.getTaskState(TaskType.BORDER_TASK_2) && 1 == i.status && AutoTaskManager.ins.immST(TaskType.BORDER_TASK_2), TaskManager.instance.dis(TaskManager.TASKCHANGEDATA, TaskManager.instance)), s.updBorder(i.status, !0));
        }
    };
    MapManager.prototype.onMarryStateChange = function (t, e, i) {
        if (i && i.marryInfo) {
            var n = SceneManager.ins, s = n.svo, a = i.marryInfo;
            s.guid == String(i.guid) && (0 != Number(a.guid) ? (s.blName = a.name, s.blJob = a.job, s.blGuid = a.guid, s.blTiQin = a.tiQinObj, s.mState = 2) : (s.blName = "", s.blJob = "", s.blGuid = null, s.blTiQin = null, s.mState = 1), UIManager.instance.mainView && UIManager.instance.mainView.JHGuide());
            var o = n.getObject(String(i.guid));
            o && o.updbl(a.name, a.job);
        }
    };
    MapManager.prototype.onObjectEnterScene = function (t, e, i) {
        if (i) {
            var n, s, a, o, r, h, l = this._sMng.self, c = this._sMng.svo;
            if ("21000" == t) {
                if (Laya.extLimit)
                    return;
                if (!i.roleList)
                    return;
                for (s = i.roleList.length - 1; s >= 0; s--) {
                    if (o = i.roleList[s], n = String(o.roleId), n == c.guid)
                        a = c;
                    else {
                        if (this._sMng.getObject(n)) {
                            Log.e("SceneManager:场景中己存在同一ID的玩家", n);
                            continue;
                        }
                        a = new RoleVO, a.guid = n, a.sguid = o.roleId, a.name = o.name, a.job = o.job, a.level = o.level, o.vipLevel && (a.vipLevel = o.vipLevel), a.x = o.x, a.y = o.y, a.zdl = Number(o.power);
                    }
                    if (a.hp = Number(o.hp), a.maxHp = Number(o.maxHp), a.speed = o.velocity, a.state = o.state, a.camp = o.camp, a.pkValue = o.pkvalue, a.clan = Number(o.clan), a.clanName = o.clanName, a.clanLevel = o.clanLevel, a.clanPos = o.clanPos, a.clanWarPos = o.clanposition ? o.clanposition : 0, a.clanWarName = o.banner, a.payType = o.tequanka, a.escort = o.biaocheId, a.ride = o.isRide, a.xiannvGuid = o.xianvGuid, null != o.charmVl && (a.charmVl = o.charmVl), null != o.xinSuoLevelId && (a.txLock = o.xinSuoLevelId), null != o.xinSuoPower && (a.txPower = Number(o.xinSuoPower)), o.serverId && (a.serverId = o.serverId), a.reborn = o.reborn ? o.reborn : 0, a.titleId = o.peidaiIds && o.peidaiIds.length ? o.peidaiIds[0] : 0, a.clanWarFlag = o.attribution ? o.attribution : 0, a.borderSteal = o.stealStatus, a.fsguid = o.fenshenPlayerId, a.yycwvip = o.cw_vip, o.marryInfo) {
                        var u = o.marryInfo;
                        a.blName = Number(u.guid) ? u.name : "", a.blJob = Number(u.guid) ? u.job : "", a.blGuid = u.guid, a.blTiQin = u.tiQinObj ? u.tiQinObj : !1, a.mState = Number(a.blGuid) ? 2 : 1;
                    }
                    if (a.sdkValue = ChatUtil.getlOh(o.blueValue, o.yellowValue), a.sdkValue && a.sdkValue.length >= 2 && GameModel.pc && (GameModel.environment.isDaTing() ? (a.blueType = a.sdkValue[1], a.blueLevel = a.sdkValue[0]) : GameModel.environment.isQZone() && (a.yellowType.push(a.sdkValue[1]), a.yellowLevel = a.sdkValue[0])), o.firstHarmGuid && (a.firstHarmId = Number(o.firstHarmGuid), 0 == Number(o.firstHarmGuid))) {
                        var p = this._sMng.getObject(o.roleId);
                        p && p.updFirst(Number(o.firstHarmGuid), !0);
                    }
                    if (o.skins && o.skins.length)
                        for (var d in o.skins)
                            if (o.skins.hasOwnProperty(d)) {
                                var g = o.skins[d];
                                g.type == FashionType.fashion ? (a.fashionId = g.skinId, n == c.guid && (RoleZhuangBanManager.instance.m_curZBIds[FashionType.fashion] = g.skinId)) : g.type == FashionType.weapon ? (a.weaponId = g.skinId, n == c.guid && (RoleZhuangBanManager.instance.m_curZBIds[FashionType.weapon] = g.skinId)) : g.type == FashionType.photo ? (a.photoId = g.skinId, n == c.guid && (RoleZhuangBanManager.instance.m_curZBIds[FashionType.photo] = g.skinId)) : g.type == FashionType.bubble && (a.bubbleId = g.skinId, n == c.guid && (RoleZhuangBanManager.instance.m_curZBIds[FashionType.bubble] = g.skinId));
                            }
                    if (o.sfdList && o.sfdList.length)
                        for (r = o.sfdList.length - 1; r >= 0; r--) {
                            var f = o.sfdList[r], m = 0 == f.hide ? ShouFeiDianManager.instance.getStarVo(f.type, f.dalei, f.jieshu) : null;
                            m || 0 != f.hide || (m = ShouFeiDianManager.instance.getHhuanVo(f.type, f.dalei, f.jieshu)), f.type == SFDType.ZUOQI ? a.mount = m ? m.res : null : f.type == SFDType.FABAO ? a.fabao = m ? m.res : null : f.type == SFDType.LINGYI ? a.lingyi = m ? m.res : null : f.type == SFDType.SHENBING ? a.shenbing = m ? m.res : null : f.type == SFDType.PIFENG ? a.pifeng = m ? m.res : null : f.type == SFDType.TIANGANG ? a.tiangang = m ? m.res : null : f.type == SFDType.JINGJIE && (a.jingjieId = m ? m.level : 0);
                        }
                    n != c.guid ? this._sMng.addObject(a) : l && (l.addTitSce(), a.fashionId && l.updSkin(RoleZhuangBanManager.instance.getSkinRes(FashionType.fashion, a.fashionId, a.job)), l.updLY(a.lingyi, !0), l.updFB(a.fabao, !0), l.updPF(a.pifeng, !0), l.updTG(a.tiangang, !0), a.mount && 1 != l.ride && 2 != l.ride ? l.ride = 2 : l.updMout(a.mount, !0), a.weaponId ? l.updWQ(RoleZhuangBanManager.instance.getSkinRes(FashionType.weapon, a.weaponId, a.job)) : a.shenbing && l.updSB(a.shenbing, !0));
                }
            }
            else if ("21001" == t) {
                if (!i)
                    return Log.e("onObjectEnterScene:" + t + "后端返回数据异常"), void 0;
                for (s = i.monsterList.length - 1; s >= 0; s--)
                    if (o = i.monsterList[s], n = String(o.guid), this._sMng.getObject(n))
                        Log.e("SceneManager:场景中己存在同一ID的怪物", n);
                    else {
                        if (o.job ? (a = MonsterDB.cloneToRoleVO(o.templateId), a.name = o.name, a.job = o.job) : (a = MonsterDB.cloneVO(o.templateId), a.team = o.teamId ? Number(o.teamId) : 0), a.guid = n, a.sguid = o.guid, a.hp = o.hp, a.x = o.x, a.y = o.y, a.state = o.state, a.refresh = Number(o.reviveTime), a.camp = o.camp, o.extraLv && (a.level = o.extraLv), "jm58" == a.template && StoryManager.serverParallel && StoryManager.instance.startStory(15), this._sMng.addObject(a), h = this._sMng.getObject(String(a.sguid)), this.mapVO && this.mapVO.mapType == MapType.OutdoorBoss && !o.job && a.state)
                            if (h && this.bossid && "{}" != JSON.stringify(this.bossid))
                                for (var d in this.bossid)
                                    this.bossid.hasOwnProperty(d) && -1 != this.bossid[d].indexOf(String(a.sguid)) ? (h.cont.active = !1, h.titl.isOpenRender = !1, h.hideName()) : (h.cont.active = !0, h.showName(Number(o.reviveTime)), h.titl && (h.titl.isOpenRender = !0), h.updSkin("mubei"));
                            else
                                h && (h.cont.active = !0, h.showName(Number(o.reviveTime)), h.titl && (h.titl.isOpenRender = !0), h.updSkin("mubei"));
                        if (this.mapVO.mapType == MapType.VIPBoss && !o.job && a.state && h && (h.cont.active = !0, h.showName(Number(o.reviveTime)), h.titl && (h.titl.isOpenRender = !0), h.updSkin("mubei")), this.isDingShiBossMap() && !o.job && a.state && h && (h.cont.active = !0, h.showName(Number(o.reviveTime)), h.titl && (h.titl.isOpenRender = !0), h.updSkin("mubei")), this.isBorderMap() && !o.job && a.state && h && (h.cont.active = !0, h.showName(Number(o.reviveTime)), h.titl && (h.titl.isOpenRender = !0), h.updSkin("mubei")), h && "1" == a.camp && this.mapVO.mapType == MapType.GuardClan) {
                            var y = GuardClanManager.ins.bloodVO;
                            if (y && y.length > 0)
                                for (var r = 0; r < y.length; r++)
                                    String(a.sguid) == y[r].monsterId && (a.maxHp = Number(y[r].maxHP), a.hp = Number(y[r].curHP));
                            a.maxHp || (a.maxHp = a.hp), h && (h.showName(), h.showBlood());
                        }
                    }
            }
            else if ("21002" == t) {
                var v, _, T = c.guid, I = c.team;
                for (s = i.goodsList.length - 1; s >= 0; s--)
                    if (o = i.goodsList[s], n = String(o.guid), this._sMng.getObject(n))
                        Log.e("SceneManager:场景中己存在同一ID的掉落物品", n);
                    else {
                        if (this.mapVO.mapType == MapType.ShiBaLj && String(o.ownerId) != l.guid)
                            return;
                        v = String(o.ownerId), _ = v && "0" != v && this._sMng.getObject(v) ? this._sMng.getObject(v).data.team : 0, a = new DropVO, a.guid = n, a.sguid = o.guid, a.itemId = o.templateId, a.own = v, a.count = o.count, a.status = 0, a.dropTime = this.mapVO.mapType == MapType.OutdoorBoss ? v && "0" != v && v != T ? Number(o.dropTime) + 3e4 : 0 : this.mapVO.mapType == MapType.VIPBoss ? v && "0" != v && v != T ? 0 != _ && 0 != I && _ == I ? 0 : Number(o.dropTime) + 3e4 : 0 : v && "0" != v && v != T ? 0 != _ && 0 != I && _ == I ? Number(o.dropTime) + 1e4 : Number(o.dropTime) + 3e4 : 0, a.goodsTem = EquipTem.getEquipTem(a.itemId), a.goodsTem || (a.goodsTem = GoodsTem.getGoodsTem(a.itemId)), a.goodsTem ? (a.name = a.goodsTem.name, a.color = Util.getSceneColorByLevel(a.goodsTem.rarelevel), a.asset = a.goodsTem.dropuri) : a.asset = "default";
                        var h = this._sMng.getObject(String(o.monsterGuid));
                        h && h.inView ? (a.x = h.data.x, a.y = h.data.y, a.tx = o.x, a.ty = o.y) : (a.x = o.x, a.y = o.y, a.tx = 0, a.ty = 0), this._sMng.addObject(a);
                    }
            }
            else if ("21004" == t) {
                if (Laya.extLimit)
                    return;
                if (this.isMarryMap())
                    return;
                if (!i || !i.chongWuList)
                    return Log.e("SceneManager21004:后端返回的数据异常"), void 0;
                for (s = i.chongWuList.length - 1; s >= 0; s--)
                    if (o = i.chongWuList[s], n = String(o.guid), h = this._sMng.getObject(n))
                        h.self || Log.e("SceneManager:场景中己存在同一ID的宠物", n);
                    else {
                        a = new PetVO, a.type = UnitType.Pet, a.guid = n, a.sguid = o.guid, a.own = String(o.ownerId), a.job = "L", a.camp = o.camp, a.template = o.templateId, a.jieshu = o.jieshu, a.level = o.level, a.star = o.star, a.x = o.x, a.y = o.y, a.speed = o.velocity, o.skin && (a.fashionId = o.skin), o.serverId && (a.serverId = o.serverId);
                        var M = !1;
                        if (o.sfdList && o.sfdList.length)
                            for (r = o.sfdList.length - 1; r >= 0; r--) {
                                var f = o.sfdList[r];
                                M = 0 == f.hide ? !1 : !0;
                                var m = M ? null : ShouFeiDianManager.instance.getStarVo(f.type, f.dalei, f.jieshu);
                                m || M || (m = ShouFeiDianManager.instance.getHhuanVo(f.type, f.dalei, f.jieshu)), f.type == SFDType.LINGWU && (a.weapon = m ? m.res : null);
                            }
                        M || (a.own == c.guid ? ShouFeiDianManager.instance.getData(SFDType.CHONGWU) || (l.pet = this._sMng.addObject(a), l.pet.follow(l), l.pet.updWQ(a.weapon, !0)) : this._sMng.addObject(a));
                    }
            }
            else if ("21005" == t) {
                if (this.m_mapVO.mapType == MapType.Taste)
                    return OutdoorBossManager.ins.initAiRole(i), void 0;
                if (this.m_mapVO.mapType != MapType.JingJi)
                    return;
                JingJiManager.ins.initRole(i);
            }
            else if ("21007" == t) {
                for (TreasureManager.ins.is3 = !1, TreasureManager.ins.vo2.splice(0, TreasureManager.ins.vo2.length), s = i.caiJiWuVoList.length - 1; s >= 0; s--)
                    if (o = i.caiJiWuVoList[s], n = String(o.guid), this._sMng.getObject(n))
                        Log.e("SceneManager:场景中己存在同一ID的采集物", n);
                    else if (a = CollectDB.cloneVO(o.templateId)) {
                        a.guid = n, a.sguid = o.guid, a.x = o.x, a.y = o.y;
                        var C = i.caiJiWuVoList[s].status;
                        if (9 != a.ctype || 1 != C) {
                            var b = a.asset.split(";");
                            a.asset = b[0], this._sMng.addObject(a);
                        }
                    }
            }
            else if ("21008" == t)
                for (s = i.boxList.length - 1; s >= 0; s--)
                    if (o = i.boxList[s], n = String(o.guid), this._sMng.getObject(n))
                        Log.e("SceneManager:场景中己存在同一ID的宝箱", n);
                    else {
                        for (var S, L = OutdoorBossBoxTem.getOutdoorBossBoxTem(o.templateId), P = MonsterDB.getTemplateById(o.monsterId), r = 0; r < o.hurts.length; r++) {
                            var w = o.hurts[r];
                            if (w && String(w.guid) == String(SceneManager.ins.svo.sguid)) {
                                S = w.hurt;
                                break;
                            }
                        }
                        if (P && L) {
                            a = new BoxVO, a.guid = n, a.sguid = o.guid, a.x = o.x, a.y = o.y, a.template = L.boxid, a.name = P.name, a.level = P.level, a.asset = "baoxiang_1", a.needdrop = L.boxCost, a.maxHarm = P.maxHp, a.bossHarm = S, a.count = Number(o.disappearTime), a.bossGuid = String(o.monsterGuid), a.bosstime = OutdoorBossManager.ins.tmA[o.monsterId], a.isgetReward = !1;
                            for (var r = 0; r < o.receives.length; r++)
                                if (o.receives[r] && Number(o.receives[r]) == Number(SceneManager.ins.svo.guid)) {
                                    a.isgetReward = !0;
                                    break;
                                }
                            this._sMng.addObject(a);
                        }
                        if (this.mapVO.mapType == MapType.OutdoorBoss) {
                            var h = this._sMng.getObject(String(o.monsterGuid));
                            h && (this.bossid || (this.bossid = {}), this.bossid[String(o.guid)] || (this.bossid[String(o.guid)] = []), -1 == this.bossid[String(o.guid)].indexOf(String(o.monsterGuid)) && this.bossid[String(o.guid)].push(String(o.monsterGuid)), h.cont.active = !1, h.titl.isOpenRender = !1, h.updSkin("mubei"), h.hideName(), h.hideBlood());
                        }
                    }
            else if ("21010" == t)
                for (s = i.xiannvList.length - 1; s >= 0; s--)
                    o = i.xiannvList[s], n = String(o.guid), h = this._sMng.getObject(n), h ? h.self || Log.e("SceneManager:场景中己存在同一ID的仙女", n) : (a = new XianNvVO, a.type = UnitType.XianNv, a.guid = n, a.sguid = o.guid, a.own = String(o.ownerId), a.xiannvId = o.xiannvId, a.x = o.x, a.y = o.y, a.speed = 250, a.own == c.guid ? (this._sMng.svo.xiannvId = a.xiannvId, this._sMng.self.xiannv = this._sMng.addObject(a), this._sMng.self.xiannv.follow(this._sMng.self)) : this._sMng.addObject(a));
        }
    };
    MapManager.prototype.onObjectMonsterState = function (t, e, i) {
        if (i) {
            var n, s, a, o, r;
            for (n = i.monsterList.length - 1; n >= 0; n--) {
                if (o = i.monsterList[n], s = String(o.guid), o.job ? (a = MonsterDB.cloneToRoleVO(o.templateId), a.name = o.name, a.job = o.job) : (a = MonsterDB.cloneVO(o.templateId), a.team = o.teamId ? Number(o.teamId) : 0), a.guid = s, a.sguid = o.guid, a.hp = o.hp, a.x = o.x, a.y = o.y, a.state = o.state, a.refresh = Number(o.reviveTime), r = this._sMng.getObject(String(a.sguid)), this.mapVO.mapType == MapType.OutdoorBoss && !o.job && a.state)
                    if (r && this.bossid && "{}" != JSON.stringify(this.bossid))
                        for (var h in this.bossid)
                            this.bossid.hasOwnProperty(h) && -1 != this.bossid[h].indexOf(String(a.sguid)) ? (r.cont.active = !1, r.titl.isOpenRender = !1, r.hideName()) : (r.cont.active = !0, r.showName(Number(o.reviveTime)), r.titl && (r.titl.isOpenRender = !0), r.updSkin("mubei"));
                    else
                        r && (r.cont.active = !0, r.showName(Number(o.reviveTime)), r.titl && (r.titl.isOpenRender = !0), r.updSkin("mubei"));
                this.mapVO.mapType == MapType.VIPBoss && !o.job && a.state && r && (r.cont.active = !0, r.hideName(), r.hideBlood(), r.showName(Number(o.reviveTime)), r.titl && (r.titl.isOpenRender = !0), r.updSkin("mubei")), this.isDingShiBossMap() && !o.job && a.state && a.difficulty == MonsterDifficulty.Boss && r && (r.cont.active = !0, r.hideBlood(), r.updName(Number(o.reviveTime)), r.titl && (r.titl.isOpenRender = !0), r.updSkin("mubei")), !this.isBorderMap() || o.job || !a.state || a.difficulty != MonsterDifficulty.Boss && a.difficulty != MonsterDifficulty.BorderFieldBoss || r && (r.cont.active = !0, r.hideBlood(), r.updName(Number(o.reviveTime)), r.titl && (r.titl.isOpenRender = !0), r.updSkin("mubei"));
            }
        }
    };
    MapManager.prototype.onObjectLevelScene = function (t, e, i) {
        if (!i)
            return Log.e("onObjectLevelScene=" + t + ":后端返回的数据异常"), void 0;
        for (var n, s, a = i.guids.length - 1; a >= 0; a--) {
            if (s = String(i.guids[a]), n = this._sMng.getObject(s), n && n.self)
                if (n == this._sMng.self.pet)
                    this._sMng.self.pet = null;
                else {
                    if (n != this._sMng.self.xiannv)
                        return;
                    this._sMng.self.xiannv = null;
                }
            this.bossid && this.bossid[s] && delete this.bossid[s], n && n.type == UnitType.Drop && n.data && n.data.status == PickStatus.PICKED ? (n.rmvTitSce(), n.doAct(ActionDefine.Pick)) : this._sMng.removeObject(s);
        }
    };
    MapManager.prototype.onObjectTelesport = function (t, e, i) {
        var n = this._sMng.getObject(String(i.guid));
        if (n) {
            Log.i("角色后端传送:" + n.data.name + " x=" + i.x + " y=" + i.y);
            var s = this._sMng.self;
            if (s && s.actCtrl.curKey == ActionDefine.Shose) {
                var a = s.actCtrl.getAct(s.actCtrl.curKey), o = ObjectPool.g("ActionParamVO");
                o.data = {
                    mapId: this.m_mapVO.id
                }, o.target = new Laya.Point(i.x, i.y), a.extLev(o);
            }
            else
                n.tel(i.x, i.y), n == this._sMng.focusUnit && this._sMng.update(!0);
        }
    };
    MapManager.prototype.onObjectMove = function (t, e, i) {
        if (!i || i && !String(i.roleId))
            return Log.e("SceneManager.onObjectMove: 数据返回异常 " + i), void 0;
        var n = this._sMng.getObject(String(i.roleId));
        if (null == n)
            return Log.e("SceneManager.onObjectMove: 该场景找不到对应角色 " + String(i.roleId)), void 0;
        if (!n.self && !StoryManager.isControl && n.data && (n.data.x != i.x || n.data.y != i.y)) {
            var s = ObjectPool.g("ActionParamVO");
            s.move = [new Laya.Point(i.x, i.y)], n.doAct(ActionDefine.Move, s);
        }
    };
    MapManager.prototype.onObjectDead = function (t, e, i) {
        if (i) {
            var n, s = this._sMng.self, a = this._sMng.svo, o = String(i.guid), r = String(i.roleId), h = LangManager.ins;
            if (o == a.guid) {
                Log.i("死亡 " + this.m_mapVO.reliveCount + " " + this.m_relive), this._sMng.splashScreen(!1), s.staCtrl && s.staCtrl.curSta == StateDefine.COLLECT && this.reqCollectBreak(), s.doSta(StateDefine.DEAD), s.doAct(ActionDefine.Dead), s.pet && s.pet.doAct(ActionDefine.Stand), AutoTaskManager.ins.dis(AutoTaskManager.TZT, AutoTaskManager.ins, !0);
                var l = ++this.m_relive;
                if (this.m_mapVO.reliveCount >= 0 && (0 == this.m_mapVO.reliveCount || l <= this.m_mapVO.reliveCount) ? this.m_mapVO.mapType == MapType.TaskCopy && TaskCopyManager.instance.getIsFHTime() ? UIManager.instance.openWindow(UIManager.COPY_FUHUOWIN, !0, {
                    time: TaskCopyManager.instance.getIsFHTime()
                }, !0) : this.m_mapVO.mapType == MapType.CaiLiao && CopyMaterialManager.ins.getT() ? UIManager.instance.openWindow(UIManager.COPY_FUHUOWIN, !0, {
                    time: CopyMaterialManager.ins.getT()
                }, !0) : this.m_mapVO.mapType == MapType.ShiBaLj && EighteenManger.ins.gifht() ? UIManager.instance.openWindow(UIManager.COPY_FUHUOWIN, !0, {
                    time: EighteenManger.ins.gifht()
                }, !0) : this.m_mapVO.mapType == MapType.ZZCOPY && EighteenManger.ins.gifht() ? UIManager.instance.openWindow(UIManager.COPY_FUHUOWIN, !0, {
                    time: EighteenManger.ins.gifht()
                }, !0) : this.m_mapVO.mapType == MapType.jjMap && EighteenManger.ins.gifht() ? UIManager.instance.openWindow(UIManager.COPY_FUHUOWIN, !0, {
                    time: EighteenManger.ins.gifht()
                }, !0) : this.m_mapVO.mapType == MapType.GeRenBoss && GerenBossManager.ins.getIFi() ? UIManager.instance.openWindow(UIManager.COPY_FUHUOWIN, !0, {
                    time: GerenBossManager.ins.getIFi()
                }, !0) : this.m_mapVO.mapType == MapType.TREASURE ? UIManager.instance.openWindow(UIManager.COPY_FUHUOWIN, !0, {
                    time: TreasureManager.ins.tm1
                }, !0) : this.m_mapVO.mapType == MapType.Taste ? UIManager.instance.openWindow(UIManager.COPY_FUHUOWIN, !0, {
                    time: OutdoorBossManager.ins.fTm
                }, !0) : this.m_mapVO.mapType == MapType.GuardClan ? UIManager.instance.openWindow(UIManager.COPY_FUHUOWIN, !0, {
                    time: GuardClanManager.ins.fuh
                }, !0) : this.m_mapVO.mapType == MapType.HongMengDian ? UIManager.instance.openWindow(UIManager.COPY_FUHUOWIN, !0, {
                    time: CopyHongMengManager.ins.fht
                }, !0) : this.m_mapVO.mapType == MapType.ClanWar ? UIManager.instance.openWindow(UIManager.COPY_FUHUOWIN, !0, {
                    time: ClanWarManager.ins.getT(),
                    tip: ClanWarManager.ins.getFHT()
                }, !0) : this.m_mapVO.mapType != MapType.Challenge && this.m_mapVO.mapType != Number(MapType.LingYiCopy) && UIManager.instance.openWindow(UIManager.FUHUO_WIN, !0, {
                    type: 0,
                    name: i.name,
                    level: i.level,
                    needYB: parseInt(GlobalVO.getGlobalVO(30).value)
                }, !0) : Log.i("死亡异常 " + this.m_mapVO.reliveCount + " " + l), n = this._sMng.getObject(r), this.mapVO.pkPunish && n && n.type == UnitType.Role) {
                    var c, u = FriendManager.ins.gefVo(i.roleId);
                    c = u ? h.v("Main_pk20") : h.v("Main_pk21"), TipsManager.ins.e(StringUtils.f(c, i.name));
                }
            }
            else if (n = this._sMng.getObject(o), this.mapVO.pkPunish && n && n.type == UnitType.Role && r == a.guid) {
                var u = FriendManager.ins.gefVo(i.guid);
                c = u ? h.v("Main_pk22") : h.v("Main_pk23"), TipsManager.ins.e(StringUtils.f(c, i.roleName));
            }
            n = this._sMng.getObject(o), n && n.data.clanWarFlag && this.m_mapVO && this.m_mapVO.mapType == MapType.ClanWar && (n.data.clanWarFlag = 0, n.warFlag(0, !0));
        }
    };
    MapManager.prototype.onObjectRelive = function (t, e, i) {
        if (i && null == i.errorCode) {
            var n = this._sMng.getObject(String(i.guid));
            if (n) {
                n.doAct(ActionDefine.Stand), n.updOff();
                var s = this._sMng.self;
                if (n == s) {
                    s.doSta(StateDefine.STAND);
                    var a = UIManager.instance.mainView;
                    a && a.vw3 && a.vw3.fhtHdr(null), this._sMng.focusUnit = n, s.pet && s.pet.doAct(ActionDefine.Stand);
                }
            }
        }
    };
    MapManager.prototype.sendFly = function (t, e) {
        var i = CMDManager.gq(SceneCMD.FLY);
        i.x = t, i.y = e, i.mapId = this.m_mapVO.id, this.sk.send(Number(SceneCMD.FLY), i);
    };
    MapManager.prototype.onObjectFly = function (t, e, i) {
        if (i) {
            var n = this._sMng.getObject(String(i.guId));
            if (null == n)
                return Log.e("SceneManager.onObjectFly: 该场景找不到对应角色 " + String(i.guId)), void 0;
            if (!n.self) {
                var s = this._sMng.tiaoyueObj;
                if (s && s[i.x + "|" + i.y]) {
                    var a = ObjectPool.g("ActionParamVO");
                    a.fly = s[i.x + "|" + i.y], n.doAct(ActionDefine.Fly, a);
                }
                else
                    Log.e("SceneManager.onObjectFly: 跳跃点不存在 " + i.x + "|" + i.y);
            }
        }
    };
    MapManager.prototype.reqMountRide = function (t) {
        void 0 === t && (t = 0);
        var e = CMDManager.gq(SceneCMD.RIDE);
        e.isRide = t, this.sk.send(Number(SceneCMD.RIDE), e);
    };
    MapManager.prototype.onMountRide = function (t, e, i) {
        if (i && !i.errorCode) {
            var n = this._sMng.getObject(String(i.guid));
            if (n) {
                var s = this._sMng.self;
                n == s ? this.dis(SceneCMD.RIDE, this, i) : n.ride = i.isRide;
            }
        }
    };
    MapManager.prototype.reqRoleState = function (t, e, i) {
        void 0 === i && (i = 1);
        var n = CMDManager.gq(SceneCMD.STATE);
        n.type = i, n.x = t, n.y = e, n.mapId = this.m_mapVO.id, this.sk.send(Number(SceneCMD.STATE), n);
    };
    MapManager.prototype.onRoleState = function (t, e, i) {
        if (i) {
            var n = this._sMng.getObject(String(i.guid));
            if (n && n != this._sMng.self) {
                var s = ObjectPool.g("ActionParamVO");
                s.target = new Laya.Point(i.x, i.y), 1 == i.type ? n.doAct(ActionDefine.Chong, s) : 2 == i.type && n.doAct(ActionDefine.Shan, s);
            }
        }
    };
    MapManager.prototype.reqShanBiValue = function () {
        var t = CMDManager.gq(SceneCMD.SHANBI);
        this.sk.send(Number(SceneCMD.SHANBI), t);
    };
    MapManager.prototype.onShanBiValue = function (t, e, i) {
        i && !i.errorCode && this.dis(SceneCMD.SHANBI, this, i);
    };
    MapManager.prototype.reqShanBiUse = function () {
        var t = CMDManager.gq(SceneCMD.SHANBI_USE);
        this.sk.send(Number(SceneCMD.SHANBI_USE), t);
    };
    MapManager.prototype.onShanBiUse = function (t, e, i) {
        i && !i.errorCode ? (this.dis(SceneCMD.SHANBI, this, i), this.shanBiVO && (this._sMng.self.rot = this.shanBiVO.rotation, this._sMng.self.doAct(ActionDefine.Shan, this.shanBiVO), this.reqRoleState(this.shanBiVO.target.x, this.shanBiVO.target.y, 2))) : (TipsManager.ins.c(i ? i.errorCode : null), this.shanBiVO.reset()), this.shanBiVO = null;
    };
    MapManager.prototype.reqPickup = function (t) {
        var e = CMDManager.gq("40001");
        e.idList = t, this.sk.send(40001, e);
    };
    MapManager.prototype.onPickup = function (t, e, i) {
        for (var n, s, a, o = !1, r = i.itemList.length - 1; r >= 0; r--)
            a = this._sMng.getObject(String(i.itemList[r].guid)), null != a && a instanceof Drop && (n = a, s = n.data, null == i.itemList[r].errorCode ? s.status = PickStatus.PICKED : (s.status = PickStatus.ERROR, o = 15 == i.itemList[r].errorCode, Log.i("拾取错误  errorCode=" + i.itemList[r].errorCode)));
        o && Laya.Browser.now() - this.m_packFullTip > 6e4 && (this.m_packFullTip = Laya.Browser.now(), TipsManager.ins.e(LangManager.ins.v("Mail_1002"))), this.m_mapVO.mapType == MapType.JingYaoTa && TimeUtils.callLate(function () {
            JingYaoTaManager.ins.onOCRW();
        }, this, 1e3);
    };
    MapManager.prototype.reqTelport = function (t) {
        if (StoryManager.serverParallel)
            return TipsManager.ins.e(LangManager.ins.v("Main_tips80")), void 0;
        1 == AutoTaskManager.aut && AutoTaskManager.aty && AutoTaskManager.ins.keepT();
        var e = this._sMng.self;
        e.actCtrl.curKey != ActionDefine.Teleport && e.doAct(ActionDefine.Teleport), this.sk.on(SceneCMD.TELEPORT, this.onTelport, this);
        var i = CMDManager.gq(SceneCMD.TELEPORT);
        i.chuansongId = t, this.sk.send(Number(SceneCMD.TELEPORT), i);
    };
    MapManager.prototype.onTelport = function (t, e, i) {
        if (this.sk.off(SceneCMD.TELEPORT, this.onTelport, this), i && !i.errorcode)
            this.dis(SceneCMD.TELEPORT, this, i);
        else {
            var n = this._sMng.self;
            n.actCtrl.curKey == ActionDefine.Teleport && n.doAct(ActionDefine.Stand), TipsManager.ins.c(i ? i.errorcode : null);
        }
    };
    MapManager.prototype.judgeShoes = function (t, e) {
        void 0 === e && (e = !1);
        var i = TipsManager.ins, n = SceneManager.ins, s = LangManager.ins;
        if (StoryManager.serverParallel)
            return i.e(s.v("Main_tips80")), void 0;
        if (this.mapVO.mapType != MapType.OutdoorBoss) {
            var a = MapVO.getMapVO(t);
            if (!a)
                return Log.e("地图id==" + t + "不存在"), void 0;
            if (a && n.svo.level < a.minLv)
                return i.e(s.v("Main_tips76")), !1;
            if (!e && 1 == Number(VipManager.ins.gVTqVo(VipTQ.XFX, n.svo.vipLevel)))
                return !0;
            if (!e && 0 == Number(VipManager.ins.gVTqVo(VipTQ.XFX, n.svo.vipLevel)) && !this.JudgeFeiXie(!1)) {
                var o = VipManager.ins.gVTqIf(VipTQ.XFX, n.svo.vipLevel), r = "";
                if (o) {
                    var h = o.type;
                    r = StringUtils.getQualityStr(h);
                }
                return i.e(s.v("Main_tips81")), !1;
            }
            return !e && this.JudgeFeiXie() ? !0 : !0;
        }
    };
    MapManager.prototype.JudgeFeiXie = function (t) {
        return void 0 === t && (t = !0), 0 == PackManager.ins.getGoodsNumById("dj1108") ? (t && TipsManager.ins.e(StringUtils.f(LangManager.ins.v("Main_tips75"), GoodsTem.getGoodsTem("dj1108").name)), !1) : !0;
    };
    MapManager.prototype.reqShoes = function (t, e, i, n, s) {
        void 0 === n && (n = !1), void 0 === s && (s = null);
        var a = this._sMng.self;
        if (a.actCtrl.curKey != ActionDefine.Shose) {
            if (s && s.state && s.state == StateDefine.NPC) {
                var o = NpcDB.getDataById(s.tempId);
                o && o.x == e && o.y == i && (s.target = PathManager.linPoi1(a.data.x, a.data.y, e, i, 60), e = s.target.x, i = s.target.y);
            }
            if (t == this.mapVO.id) {
                var r = PathManager.pixPoi(e, i), h = Util.getPixelDistance(r, this._sMng.self.scePos);
                if (1e3 >= h) {
                    if (s)
                        if (h > 150) {
                            var l = ObjectPool.g("StateParamVO");
                            l.nextStateVO = s, a.doSta(StateDefine.SHOES, l), this._sMng.self.movTo(e, i);
                        }
                        else
                            this._sMng.gotoNextState(s);
                    else
                        this._sMng.self.movTo(e, i);
                    return;
                }
            }
            if (this.isCopyMap())
                return TipsManager.ins.e(LangManager.ins.v("Main_tips78")), void 0;
            if (this._sMng.self.xiannv)
                return TipsManager.ins.e(LangManager.ins.v("Main_tips94")), void 0;
            if (this.judgeShoes(t, n)) {
                UIManager.instance.closeWin(UIManager.NPC_WIN), this._sMng.breakCollect();
                var c = CMDManager.gq(SceneCMD.SHOES);
                c.mapId = t, c.x = e, c.y = i, c.free = n;
                var u = ObjectPool.g("ActionParamVO");
                if (u.data = c, isNaN(e) || isNaN(i))
                    return Log.i("坐标不正确:x=" + e + "  y=" + i), void 0;
                if (a.actCtrl.curKey != ActionDefine.Shose && a.doAct(ActionDefine.Shose, u)) {
                    1 == AutoTaskManager.aut && AutoTaskManager.aty && t != this.mapVO.id && AutoTaskManager.ins.keepT();
                    var l = ObjectPool.g("StateParamVO");
                    l.nextStateVO = s, a.doSta(StateDefine.SHOES, l);
                }
            }
            else {
                var p = SceneManager.ins;
                if (t == this.mapVO.id) {
                    if (s) {
                        var l = ObjectPool.g("StateParamVO");
                        l.nextStateVO = s, a.doSta(StateDefine.SHOES, l);
                    }
                    p.changeAutoType(1), this._sMng.self.movTo(e, i, 60);
                }
                else {
                    if (this.mapVO.mapType == MapType.OutdoorBoss)
                        return;
                    var d = MapVO.getMapVO(t);
                    if (!d)
                        return Log.e("地图id==" + t + "不存在"), void 0;
                    if (d && p.svo.level < d.minLv)
                        return;
                    p.teleportToNext(t, s);
                }
            }
        }
    };
    MapManager.prototype.sendShoes = function (t) {
        this.sk.send(Number(SceneCMD.SHOES), t);
    };
    MapManager.prototype.onShoes = function (t, e, i) {
        if (i && !i.errorcode)
            this.dis(SceneCMD.SHOES, this, i), StoryManager.restStoryId && (StoryManager.instance.startStory(StoryManager.restStoryId), StoryManager.restStoryId = 0);
        else {
            var n = this._sMng.self;
            n.actCtrl.curKey == ActionDefine.Shose && n.doAct(ActionDefine.Stand, null, !1), TipsManager.ins.c(i ? i.errorcode : null);
        }
    };
    MapManager.prototype.reqCollectStart = function (t, e) {
        void 0 === e && (e = 0);
        var i = Laya.Browser.now();
        if ((0 == this.reqCollectStartTime || i - this.reqCollectStartTime > 1e4) && 0 == this.reqCollectBreakTime) {
            this.reqCollectStartTime = i, this.sk.on(SceneCMD.COLLECT_START, this.onCollectStart, this);
            var n = CMDManager.gq(SceneCMD.COLLECT_START);
            n.guid = t, n.type = e, this.sk.send(Number(SceneCMD.COLLECT_START), n);
            var s = UIManager.instance.mainView;
            if (s && s.v12 && s.v12.parent) {
                var a = this._sMng.getObject(String(t));
                a && s.swClVw(a.data);
            }
        }
    };
    MapManager.prototype.onCollectStart = function (t, e, i) {
        if (this.reqCollectStartTime = 0, this.sk.off(SceneCMD.COLLECT_START, this.onCollectStart, this), i && !i.errorCode) {
            this.dis(SceneCMD.COLLECT_START, this, i);
            var n = this._sMng.getObject(String(i.guid));
            n && (this._sMng.self.actCtrl.curKey != ActionDefine.Collect && this._sMng.self.doAct(ActionDefine.Collect), UIManager.instance.mainView.swClVw(n.data));
        }
        else
            UIManager.instance.mainView.rvClVw(), TipsManager.ins.c(i ? i.errorCode : null);
    };
    MapManager.prototype.reqCollectSuc = function () {
        this.sk.on(SceneCMD.COLLECT_SUC, this.onCollectSuc, this);
        var t = CMDManager.gq(SceneCMD.COLLECT_SUC);
        t.type = 0, this.sk.send(Number(SceneCMD.COLLECT_SUC), t);
    };
    MapManager.prototype.onCollectSuc = function (t, e, i) {
        if (this.sk.off(SceneCMD.COLLECT_SUC, this.onCollectSuc, this), UIManager.instance.mainView.rvClVw(), i && !i.errorCode) {
            if (this.m_mapVO.mapType == MapType.TREASURE) {
                var n = SceneManager.ins;
                n.removeObject(String(i.guid)), AttackController.chgPoi(n.svo.x, n.svo.y), AttackController.chgRng(800, 800), n.self.doSta(StateDefine.GUAJI), TimeUtils.callLate(function () {
                    TreasureManager.ins.stTre();
                }, this, 500);
            }
            !UIManager.instance.isOpen(UIManager.CHAT_WIN) && this.mapVO.mapType == MapType.ClanDinner && UIManager.instance.mainView && (UIManager.instance.mainView.v31 && UIManager.instance.mainView.v31.rmTps(), ClanActManager.ins.isc = !0);
        }
        else
            TipsManager.ins.c(i ? i.errorCode : null);
    };
    MapManager.prototype.reqCollectBreak = function () {
        if (!(this.reqTreasureStartTime > 0)) {
            var t = Laya.Browser.now();
            if (0 == this.reqCollectBreakTime || t - this.reqCollectBreakTime > 1e4) {
                this.reqCollectBreakTime = t, this.sk.on(SceneCMD.COLLECT_BREAK, this.onCollectBreak, this);
                var e = CMDManager.gq(SceneCMD.COLLECT_BREAK);
                this.sk.send(Number(SceneCMD.COLLECT_BREAK), e);
            }
        }
    };
    MapManager.prototype.onCollectBreak = function (t, e, i) {
        this.reqCollectBreakTime = 0, this.sk.off(SceneCMD.COLLECT_BREAK, this.onCollectBreak, this), UIManager.instance.mainView && UIManager.instance.mainView.rvClVw(), i && i.errorCode && TipsManager.ins.c(i ? i.errorCode : null);
    };
    MapManager.prototype.onCollecEnter = function (t, e, i) {
        var n = this._sMng.getObject(String(i.roleId)), s = this._sMng.getObject(String(i.guid));
        if (n && s) {
            var a = ObjectPool.g("ActionParamVO");
            a.target = s.scePos, n != this._sMng.self && n.doAct(ActionDefine.Collect, a);
        }
    };
    MapManager.prototype.onCollectExit = function (t, e, i) {
        var n = this._sMng.getObject(String(i.roleId));
        n && n != this._sMng.self && n.doAct(ActionDefine.Stand);
    };
    MapManager.prototype.reqTreasureStart = function () {
        var t = Laya.Browser.now();
        if ((0 == this.reqTreasureStartTime || t - this.reqTreasureStartTime > 1e4) && 0 == this.reqCollectBreakTime) {
            this.reqTreasureStartTime = t;
            var e = UIManager.instance.mainView;
            e.cn1 && (e.cn1.visible = !1), this.sk.on(SceneCMD.COLLECT_START, this.onTreasureStart, this);
            var i = CMDManager.gq(SceneCMD.COLLECT_START);
            i.guid = 0, i.type = 1, this.sk.send(Number(SceneCMD.COLLECT_START), i);
        }
        else
            t - this.reqTreasureStartTime < 500 && TipsManager.ins.e(LangManager.ins.v("Treasue_1009"));
    };
    MapManager.prototype.onTreasureStart = function (t, e, i) {
        if (this.sk.off(SceneCMD.COLLECT_START, this.onTreasureStart, this), i && !i.errorCode) {
            if (this.dis(SceneCMD.COLLECT_START, this, i), 0 == i.guid.low && 1 == i.type) {
                this._sMng.self.actCtrl.curKey != ActionDefine.Collect && this._sMng.self.doAct(ActionDefine.Collect);
                var n = {
                    name: LangManager.ins.v("Main_collect10"),
                    ctype: "10",
                    callBack: this.reqCollectSuc,
                    thisObj: this,
                    parm: "a",
                    cooldown: TreasureManager.ins.TM2
                };
                UIManager.instance.mainView.swTrVw(n);
            }
        }
        else
            UIManager.instance.mainView.rvTrVw(), TipsManager.ins.c(i ? i.errorCode : null);
    };
    MapManager.prototype.reqTreasureSuc = function () {
        this.sk.on(SceneCMD.COLLECT_SUC, this.onTreasureSuc, this);
        var t = CMDManager.gq(SceneCMD.COLLECT_SUC);
        t.type = 1, this.sk.send(Number(SceneCMD.COLLECT_SUC), t);
    };
    MapManager.prototype.onTreasureSuc = function (t, e, i) {
        this.sk.off(SceneCMD.COLLECT_SUC, this.onTreasureSuc, this), UIManager.instance.mainView.rvTrVw(), i && !i.errorCode || TipsManager.ins.c(i ? i.errorCode : null);
    };
    MapManager.prototype.reqTreasureBreak = function () {
        if (this.reqTreasureStartTime > 0 && (0 == this.reqTreasureBreakTime || t - this.reqTreasureBreakTime > 1e4)) {
            var t = Laya.Browser.now();
            this.reqTreasureBreakTime = t, this.sk.on(SceneCMD.COLLECT_BREAK, this.onTreasureBreak, this);
            var e = CMDManager.gq(SceneCMD.COLLECT_BREAK);
            this.sk.send(Number(SceneCMD.COLLECT_BREAK), e);
        }
        this.reqTreasureStartTime = 0;
    };
    MapManager.prototype.onTreasureBreak = function () {
        this.reqTreasureBreakTime = 0, this.sk.off(SceneCMD.COLLECT_BREAK, this.onTreasureBreak, this), UIManager.instance.mainView.rvTrVw();
    };
    MapManager.prototype.reqLineMessage = function () {
        var t = CMDManager.gq(SceneCMD.LINE_INFO);
        this.sk.send(Number(SceneCMD.LINE_INFO), t);
    };
    MapManager.prototype.onLineMessage = function (t, e, i) {
        i && (GameModel.lineList = i.lineList, GameModel.lineNum = i.lineNo, this.dis(SceneCMD.LINE_INFO, this, i));
    };
    MapManager.prototype.reqChangeLine = function (t) {
        var e = CMDManager.gq(SceneCMD.LINE_CHANGE);
        e.lineNo = t, this.sk.send(Number(SceneCMD.LINE_CHANGE), e);
    };
    MapManager.prototype.onChangeLine = function (t, e, i) {
        i && !i.errorCode ? (GameModel.lineNum = i.lineNo, this.dis(SceneCMD.LINE_CHANGE, this, i), TipsManager.ins.s(StringUtils.f(LangManager.ins.v("Main_xian1"), GameModel.lineNum))) : TipsManager.ins.c(i ? i.errorCode : null);
    };
    MapManager.prototype.reqChangePKMode = function (t) {
        this.sk.on(SceneCMD.PK_MODE, this.onChangePKMode, this);
        var e = CMDManager.gq(SceneCMD.PK_MODE);
        e.mode = t, this.sk.send(Number(SceneCMD.PK_MODE), e);
    };
    MapManager.prototype.onChangePKMode = function (t, e, i) {
        this.sk.off(SceneCMD.PK_MODE, this.onChangePKMode, this), i && !i.errorCode ? this.dis(SceneCMD.PK_MODE, this, i) : TipsManager.ins.c(i ? i.errorCode : null);
    };
    MapManager.prototype.onRolePKValue = function (t, e, i) {
        var n = this._sMng.getObject(String(i.guid));
        if (n && n.data) {
            var s = n.data.pkValue < 50 && i.value >= 50 || n.data.pkValue >= 50 && i.value < 50 ? !0 : !1;
            n.data.pkValue = i.value, s && n instanceof Role && n.updName(), String(i.guid) == this._sMng._svo.guid && this.dis(t, this, i);
        }
    };
    MapManager.prototype.reqGuaJi = function (t) {
        var e = CMDManager.gq(SceneCMD.GUAJI);
        e.isGuaJi = t, this.sk.send(Number(SceneCMD.GUAJI), e);
    };
    MapManager.prototype.reqFanJiList = function () {
        var t = CMDManager.gq(SceneCMD.FJ_LIST);
        this.sk.send(Number(SceneCMD.FJ_LIST), t);
    };
    MapManager.prototype.onFanJiList = function (t, e, i) {
        if (i && !i.errorCode) {
            var n = i.strikeBackList;
            if (this._sMng.self.atkCtrl.fanjiArr = [], n && n.length)
                for (var s = 0; s < n.length; s++)
                    this._sMng.self.atkCtrl.fanjiArr.push(String(n[s].guid));
            this.dis(SceneCMD.FJ_LIST, this, i);
        }
    };
    MapManager.prototype.onFanJiAdd = function (t, e, i) {
        if (i && i.playerVo) {
            var n = this._sMng.self.atkCtrl;
            n.fanjiArr || (n.fanjiArr = []), -1 == n.fanjiArr.indexOf(String(i.playerVo.guid)) && (n.fanjiArr.push(String(i.playerVo.guid)), this.dis(SceneCMD.FJ_ADD, this, i), this.mapVO.pkPunish && !n.fanjiMode && (n.fanjiMode = !0, TipsManager.ins.e(StringUtils.f(LangManager.ins.v("Main_pk24"), i.playerVo.name))));
        }
    };
    MapManager.prototype.onFanJiRemove = function (t, e, i) {
        if (i && i.guid) {
            var n = this._sMng.self.atkCtrl.fanjiArr, s = n.indexOf(String(i.guid));
            -1 != s && (n.splice(s, 1), this.dis(SceneCMD.FJ_REMOVE, this, i));
        }
    };
    MapManager.prototype.onFanJiClean = function (t, e, i) {
        i && !i.errorCode && (this._sMng.self.atkCtrl.fanjiArr = [], this.dis(SceneCMD.FJ_CLEAN, this, i));
    };
    MapManager.prototype.reqEnemyPlayerList = function () {
        this.sk.on(SceneCMD.ENEMY_LIST, this.onEnemyPlayerList, this);
        var t = CMDManager.gq(SceneCMD.ENEMY_LIST);
        this.sk.send(Number(SceneCMD.ENEMY_LIST), t);
    };
    MapManager.prototype.onEnemyPlayerList = function (t, e, i) {
        this.sk.off(SceneCMD.ENEMY_LIST, this.onEnemyPlayerList, this), i.errorCode || this.dis(SceneCMD.ENEMY_LIST, this, i);
    };
    MapManager.prototype.onEnemyPlayerEnter = function (t, e, i) {
        i && this.dis(SceneCMD.ENEMY_ENTER, this, i);
    };
    MapManager.prototype.onEnemyPlayerLeave = function (t, e, i) {
        i && this.dis(SceneCMD.ENEMY_LEAVE, this, i);
    };
    MapManager.prototype.reqEnemyPosition = function (t) {
        this.sk.on(SceneCMD.ENEMY_POSI, this.onEnemyPosition, this);
        var e = CMDManager.gq(SceneCMD.ENEMY_POSI);
        e.guid = t, this.sk.send(Number(SceneCMD.ENEMY_POSI), e);
    };
    MapManager.prototype.onEnemyPosition = function (t, e, i) {
        this.sk.off(SceneCMD.ENEMY_POSI, this.onEnemyPosition, this), i && this.dis(SceneCMD.ENEMY_POSI, this, i);
    };
    MapManager.prototype.reqHatredList = function () {
        this.sk.on(SceneCMD.HATRED_LIST, this.onHatredList, this);
        var t = CMDManager.gq(SceneCMD.HATRED_LIST);
        this.sk.send(Number(SceneCMD.HATRED_LIST), t);
    };
    MapManager.prototype.onHatredList = function (t, e, i) {
        this.sk.off(SceneCMD.HATRED_LIST, this.onHatredList, this), i.errorCode || this.dis(SceneCMD.HATRED_LIST, this, i);
    };
    MapManager.prototype.onHatredEnter = function (t, e, i) {
        i && this.dis(SceneCMD.HATRED_ENTER, this, i);
    };
    MapManager.prototype.onHatredLeave = function (t, e, i) {
        i && this.dis(SceneCMD.HATRED_LEAVE, this, i);
    };
    MapManager.prototype.reqHatredRank = function (t, e) {
        this.sk.on(SceneCMD.HATRED_RANK, this.onHatredRank, this);
        var i = CMDManager.gq(SceneCMD.HATRED_RANK);
        i.guid = t, i.rank = e, this.sk.send(Number(SceneCMD.HATRED_RANK), i);
    };
    MapManager.prototype.onHatredRank = function (t, e, i) {
        this.sk.off(SceneCMD.HATRED_RANK, this.onHatredRank, this), i && null == i.errorCode && (this.myvaule = Number(i.myValue), this.dis(SceneCMD.HATRED_RANK, this, i));
    };
    MapManager.prototype.isPickShowMap = function () {
        return !0;
    };
    MapManager.prototype.isCopyMap = function () {
        return this.m_mapVO && this.m_mapVO.mapType != MapType.Common;
    };
    MapManager.prototype.isExpCopyMap = function () {
        return this.m_mapVO.mapType == MapType.Exp;
    };
    MapManager.prototype.isJingjiMap = function () {
        return this.m_mapVO && this.m_mapVO.mapType == MapType.JingJi;
    };
    MapManager.prototype.isMarryMap = function () {
        return this.m_mapVO && this.m_mapVO.mapType == MapType.Marry;
    };
    MapManager.prototype.isCopyShowMap = function () {
        return this.m_mapVO && (this.m_mapVO.mapType == MapType.OutdoorBoss || this.m_mapVO.mapType == MapType.VIPBoss || this.m_mapVO.mapType == MapType.GeRenBoss || this.m_mapVO.mapType == MapType.Taste || this.m_mapVO.mapType == MapType.GuardClan || this.m_mapVO.mapType == MapType.JingYaoTa);
    };
    MapManager.prototype.isFieldMap = function (t) {
        return void 0 === t && (t = 1), this.m_mapVO && this.m_mapVO.mapType == t;
    };
    MapManager.prototype.isDingShiBossMap = function () {
        return this.m_mapVO && (this.m_mapVO.mapsubtyp == Mapsubtype.DingShi || this.m_mapVO.mapsubtyp == Mapsubtype.Border);
    };
    MapManager.prototype.isBorderMap = function () {
        return this.m_mapVO && this.m_mapVO.mapsubtyp == Mapsubtype.Border;
    };
    MapManager.prototype.isPaTaMap = function () {
        return this.m_mapVO && (this.m_mapVO.mapType == CopyType.PATA || this.m_mapVO.mapType == CopyType.LINGYI || this.m_mapVO.mapType == CopyType.XIANPINGSHAN || this.m_mapVO.mapType == CopyType.JINGYAOTA);
    };
    return MapManager;
}(SDispatcher));
//# sourceMappingURL=MapManager.js.map