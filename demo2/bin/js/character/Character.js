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
var Character = /** @class */ (function (_super) {
    __extends(Character, _super);
    function Character(pos, renderQuenen) {
        var _this = _super.call(this) || this;
        _this.bMainRole = false;
        _this.pos2D = new Laya.Vector3();
        _this.convertLocalToGlobalPoint = new Laya.Point();
        _this.fromActionState = "";
        _this.toActionState = "";
        _this._loadNu = 0;
        _this._completeLoadNu = 0;
        _this._vec33D = new Laya.Vector3();
        _this._pTargetPosVec3 = new Laya.Vector3();
        _this._loodOutVec3 = new Laya.Vector3();
        _this._renderQuenen = 0;
        _this._alpha = 1;
        _this._materials = new Array();
        _this._renderQuenen = renderQuenen;
        _this._pRoleSp3D = new Laya.Sprite3D();
        // this._pRoleSp3D.transform.localScale = new Laya.Vector3(0.35, 0.35, 0.35);
        if (pos) {
            _this._pRoleSp3D.transform.localPosition = pos;
            _this._pFightVec3Pos = pos.clone();
        }
        _this.pos2D = new Laya.Vector3();
        if (SceneManager.instance.bInFight) {
            _this._bloodBar = new Laya.Image();
            _this._bloodBarBg = new Laya.Image();
            _this._bloodBar.texture = Laya.loader.getRes("res/scene2d/bloodBar.png");
            _this._bloodBarBg.texture = Laya.loader.getRes("res/scene2d/bloodBarBg.png");
            _this._bloodBar.width = 500;
            _this._bloodBar.height = 300 * 19 / 54;
            _this._bloodBarBg.width = 500;
            _this._bloodBarBg.height = 300 * 19 / 54;
            SceneManager.instance.effectLayer2D.addChild(_this._bloodBarBg);
            SceneManager.instance.effectLayer2D.addChild(_this._bloodBar);
            Laya.timer.frameLoop(1, _this, _this._updateBloodBar);
        }
        _this._hitedDamageTxt = new Laya.Label();
        _this._hitedDamageTxt.fontSize = 30;
        _this._hitedDamageTxt.color = "#f60d09";
        _this._hitedDamageTxt.strokeColor = "#000000";
        _this._hitedDamageTxt.bold = true;
        _this._hitedDamageTxt.visible = false;
        SceneManager.instance.effectLayer2D.addChild(_this._hitedDamageTxt);
        _this._skillWordTxt = new Laya.Label();
        _this._skillWordTxt.fontSize = 25;
        _this._skillWordTxt.color = "#0bd413";
        _this._skillWordTxt.strokeColor = "#000000";
        _this._skillWordTxt.bold = true;
        _this._skillWordTxt.visible = false;
        SceneManager.instance.effectLayer2D.addChild(_this._skillWordTxt);
        _this.lifeState = "alive";
        return _this;
    }
    Object.defineProperty(Character.prototype, "roleSp3D", {
        get: function () {
            return this._pRoleSp3D;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "transform", {
        get: function () {
            return this._pRoleSp3D.transform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "name", {
        get: function () {
            return this._pRoleSp3D.name;
        },
        set: function (name) {
            if (this._pRoleSp3D)
                this._pRoleSp3D.name = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "agentSprite2D", {
        get: function () {
            return this._pAgentSprite2D;
        },
        set: function (sp) {
            if (sp && sp != this._pAgentSprite2D && this.pAIMoveScript) {
                this._pAgentSprite2D = sp;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "alpha", {
        get: function () {
            return this._alpha;
        },
        set: function (value) {
            if (this._alpha !== value) {
                for (var i = 0; i < this._materials.length; i++) {
                    this._materials[i].renderMode = Laya.StandardMaterial.RENDERMODE_TRANSPARENT;
                    this._materials[i].albedo = new Laya.Vector4(1, 1, 1, value);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Character.prototype, "ghost", {
        set: function (value) {
            if (value) {
                this._startGhost();
                Laya.timer.loop(100, this, this._startGhost);
            }
            else {
                Laya.timer.clear(this, this._startGhost);
            }
        },
        enumerable: true,
        configurable: true
    });
    Character.prototype.clearSelf = function () {
        this.pos2D = null;
        this.convertLocalToGlobalPoint = null;
        this.pAIFightScript.clear();
        this.pAIFightScript = null;
        this._pRoleAni = null;
        this._pBodyPartAni = null;
        this._pHorsePartAni = null;
        this._pWingPartAni = null;
        this._characterEuler = null;
        this._pCharacterMoveScript = null;
        this._materials = null;
        if (this._pWeaponPart) {
            this._pWeaponPart.parent.removeChild(this._pWeaponPart);
            this._pWeaponPart.destroy();
            this._pWeaponPart = null;
        }
        if (this._pWingPart) {
            this._pWingPart.parent.removeChild(this._pWingPart);
            this._pWingPart.destroy();
            this._pWingPart = null;
        }
        if (this._pBodyPart) {
            this._pBodyPart.parent.removeChild(this._pBodyPart);
            this._pBodyPart.destroy();
            this._pBodyPart = null;
        }
        if (this._pHorsePart) {
            this._pHorsePart.parent.removeChild(this._pHorsePart);
            this._pHorsePart.destroy();
            this._pHorsePart = null;
        }
        if (this._pAgentSprite2D) {
            this._pAgentSprite2D.parent.removeChild(this._pAgentSprite2D);
            this._pAgentSprite2D.destroy();
            this._pAgentSprite2D = null;
        }
        if (this._hitedDamageTxt) {
            this._hitedDamageTxt.parent.removeChild(this._hitedDamageTxt);
            this._hitedDamageTxt.destroy();
            this._hitedDamageTxt = null;
        }
        if (this._skillWordTxt) {
            this._skillWordTxt.parent.removeChild(this._skillWordTxt);
            this._skillWordTxt.destroy();
            this._skillWordTxt = null;
        }
        if (this._bloodBar) {
            this._bloodBar.parent.removeChild(this._bloodBar);
            this._bloodBar.destroy();
            this._bloodBar = null;
        }
        if (this._bloodBarBg) {
            this._bloodBarBg.parent.removeChild(this._bloodBarBg);
            this._bloodBarBg.destroy();
            this._bloodBarBg = null;
        }
        if (this._pRoleSp3D) {
            Laya.Tween.clearAll(this.roleSp3D.parent.parent);
            this._pRoleSp3D.parent.removeChild(this._pRoleSp3D);
            this._pRoleSp3D.destroy();
            this._pRoleSp3D = null;
        }
        this._vec33D = null;
        this._pFightVec3Pos = null;
        this._pTargetPosVec3 = null;
        Laya.timer.clear(this, this._updateBloodBar);
    };
    Character.prototype.hitedFireBody = function () {
        for (var i = 0; i < this.roleSp3D.numChildren; i++) {
            this._fireBodyMaterial(this.roleSp3D.getChildAt(i).getChildAt(0).getChildAt(0));
        }
    };
    Character.prototype._fireBodyMaterial = function (sp3d) {
        var material = new FireBodyMaterial();
        // material.albedo = new Laya.Vector4(1, 1, 1, 1);
        var cloneSp = sp3d;
        var oldMaterial;
        if (sp3d instanceof Laya.SkinnedMeshSprite3D) {
            oldMaterial = cloneSp.skinnedMeshRender.material;
            Laya.timer.once(250, this, function () {
                if (cloneSp)
                    cloneSp.skinnedMeshRender.material = oldMaterial;
            });
            material.diffuseTexture = cloneSp.skinnedMeshRender.material.diffuseTexture;
            cloneSp.skinnedMeshRender.material = material;
        }
        else if (sp3d instanceof Laya.MeshSprite3D) {
            oldMaterial = cloneSp.meshRender.material;
            Laya.timer.once(250, this, function () {
                if (cloneSp)
                    cloneSp.skinnedMeshRender.material = oldMaterial;
            });
            material.diffuseTexture = cloneSp.meshRender.material.diffuseTexture;
            cloneSp.meshRender.material = material;
        }
        for (var i = 0; i < sp3d.numChildren; i++) {
            var sp = sp3d.getChildAt(i);
            if (sp instanceof Laya.SkinnedMeshSprite3D) {
                oldMaterial = cloneSp.skinnedMeshRender.material;
                Laya.timer.once(250, this, function () {
                    if (cloneSp)
                        cloneSp.skinnedMeshRender.material = oldMaterial;
                });
                material.diffuseTexture = sp.skinnedMeshRender.material.diffuseTexture;
                sp.skinnedMeshRender.material = material;
            }
            else if (sp instanceof Laya.MeshSprite3D) {
                oldMaterial = cloneSp.meshRender.material;
                Laya.timer.once(250, this, function () {
                    if (cloneSp)
                        cloneSp.skinnedMeshRender.material = oldMaterial;
                });
                material.diffuseTexture = sp.meshRender.material.diffuseTexture;
                sp.meshRender.material = material;
            }
            this._fireBodyMaterial(sp);
        }
    };
    Character.prototype.hitedShowDamageNu = function (nu) {
        var _this = this;
        Laya.Tween.clearAll(this._hitedDamageTxt);
        this._hitedDamageTxt.visible = true;
        var out = new Laya.Vector3();
        SceneManager.instance.orthographicCoordToScreenCoord(this._pRoleSp3D.transform.position, out);
        this._hitedDamageTxt.text = "-" + nu;
        this._hitedDamageTxt.x = out.x;
        this._hitedDamageTxt.y = out.y - 50;
        Laya.Tween.to(this._hitedDamageTxt, { x: out.x, y: out.y - 100 }, 800, Laya.Ease.cubicOut, Laya.Handler.create(this, function () { _this._hitedDamageTxt.visible = false; }));
        this._bloodBar.scaleX = this.data.life / this.data.maxLife;
        if (this._bloodBar.scaleX < 0) {
            this._bloodBar.scaleX = 0;
        }
    };
    Character.prototype.skillShowWord = function (str) {
        var _this = this;
        Laya.Tween.clearAll(this._skillWordTxt);
        this._skillWordTxt.visible = true;
        var out = new Laya.Vector3();
        SceneManager.instance.orthographicCoordToScreenCoord(this._pRoleSp3D.transform.position, out);
        this._skillWordTxt.text = str;
        this._skillWordTxt.x = out.x;
        this._skillWordTxt.y = out.y - 50;
        Laya.Tween.to(this._skillWordTxt, { x: out.x, y: out.y - 100 }, 800, Laya.Ease.cubicOut, Laya.Handler.create(this, function () { _this._skillWordTxt.visible = false; }));
    };
    Character.prototype.skillAttack = function (attackedTargetArr) {
        this.pAIFightScript.skillAttack(attackedTargetArr);
    };
    Character.prototype.normalAttack = function (attackTarget) {
        this.pAIFightScript.normalAttack(attackTarget);
    };
    Character.prototype.turnTo = function (angle) {
        this._pRoleSp3D.transform.localRotationEuler = new Laya.Vector3(0, angle, 0);
    };
    Character.prototype.setTargetPos = function (pos) {
        this._pCharacterMoveScript.setTargetPos(pos);
    };
    Character.prototype.changeAction = function (actionName) {
        if (SceneManager.instance.bInFight) {
            if (this._pWeaponPartAni && actionName == CharacterActionStateConst.DIE) {
                this._pBodyPartAni.unLinkSprite3DToAvatarNode(this._pWeaponPart);
                this._pWeaponPartAni.play(actionName);
            }
            if (this._pBodyPartAni)
                this._pBodyPartAni.play(actionName, 2);
            if (this._pHorsePartAni) {
                this._pHorsePartAni.play(actionName, 2);
            }
        }
        else {
            if (this._pBodyPartAni)
                this._pBodyPartAni.play(actionName, 1);
            if (this._pHorsePartAni) {
                this._pHorsePartAni.play(actionName);
            }
        }
    };
    /*
     * @param partId 资源id名
     * @param partType 角色部位
     */
    Character.prototype.changePart = function (partId, partType) {
        if (partType == Character.BODY) {
            this._createBody(partId);
        }
        else if (partType == Character.WING) {
            this._createWing(partId);
        }
        else if (partType == Character.WEAPON) {
            this._createWeapon(partId);
        }
        else if (partType == Character.HORSE) {
            this._createHorse(partId);
        }
        else {
            throw new Error("change part error!error partId:" + partId + ",error partType:" + partType);
        }
    };
    Character.prototype.createCharacter = function (bodyid, horseid, wingid, weaponid) {
        this._horseID = horseid;
        this._loadNu = 0;
        this._completeLoadNu = 0;
        if (bodyid) {
            this._loadNu++;
            this._createBody(Character.BODY_RES_URL + "" + bodyid + "/" + bodyid + ".lh");
        }
        if (horseid) {
            this._loadNu++;
            this._createHorse(Character.HORSE_RES_URL + "" + horseid + "/" + horseid + ".lh");
        }
        if (wingid) {
            this._loadNu++;
            this._createWing(Character.WING_RES_URL + "" + wingid + "/" + wingid + ".lh");
        }
        if (weaponid) {
            this._loadNu++;
            this._createWeapon(Character.WEAPON_RES_URL + "" + weaponid + "/" + weaponid + ".lh");
        }
    };
    Character.prototype._createBody = function (id) {
        if (Laya.loader.getRes(id)) {
            this._bodyComplete(id);
        }
        else {
            Laya.loader.create(id, Laya.Handler.create(this, this._bodyComplete, [id]), null, Laya.Sprite3D);
        }
    };
    Character.prototype._createHorse = function (id) {
        if (Laya.loader.getRes(id)) {
            this._horseComplete(id);
        }
        else {
            Laya.loader.create(id, Laya.Handler.create(this, this._horseComplete, [id]), null, Laya.Sprite3D);
        }
    };
    Character.prototype._createWing = function (id) {
        if (Laya.loader.getRes(id)) {
            this._wingComplete(id);
        }
        else {
            Laya.loader.create(id, Laya.Handler.create(this, this._wingComplete, [id]), null, Laya.Sprite3D);
        }
    };
    Character.prototype._createWeapon = function (id) {
        if (Laya.loader.getRes(id)) {
            this._weaponComplete(id);
        }
        else {
            Laya.loader.create(id, Laya.Handler.create(this, this._weaponComplete, [id]), null, Laya.Sprite3D);
        }
    };
    Character.prototype._findMeshSp3D = function (bodySp3D) {
        for (var i = 0; i < bodySp3D.numChildren; i++) {
            var skinnedMeshSp3D = bodySp3D.getChildAt(i);
            if (skinnedMeshSp3D instanceof Laya.SkinnedMeshSprite3D || skinnedMeshSp3D instanceof Laya.MeshSprite3D) {
                this._addToMaterials(bodySp3D.getChildAt(i));
            }
            else if (skinnedMeshSp3D instanceof Laya.Sprite3D) {
                this._findMeshSp3D(skinnedMeshSp3D);
            }
        }
    };
    Character.prototype._bodyComplete = function (id) {
        this._pBodyPart = Laya.loader.getRes(id).clone();
        var bodySp3D = this._pBodyPart.getChildAt(0);
        if (!bodySp3D)
            throw Error("body骨骼信息错误");
        this._pBodyPartAni = bodySp3D.getComponentByType(Laya.Animator);
        //设置默认动画
        var bodyAniClip = this._pBodyPartAni.getClip(CharacterActionStateConst.IDLE);
        this._pBodyPartAni.play(CharacterActionStateConst.IDLE);
        if (!bodyAniClip) {
            bodyAniClip = this._pBodyPartAni.getClip("stand");
            this._pBodyPartAni.play("stand");
        }
        bodyAniClip.islooping = true;
        // this._pBodyPartAni.clip = bodyAniClip;
        if (this._pWingPart) {
            bodySp3D.addChild(this._pWingPart);
            this._pBodyPartAni.linkSprite3DToAvatarNode("wing", this._pWingPart);
            //对齐挂点位置
            var parent_1 = this._pBodyPartAni._avatarNodeMap.wing._parent;
            if (!parent_1) {
                throw new Error("wing挂点有问题!");
            }
            var m4x4 = new Laya.Matrix4x4();
            if (parent_1.transform._worldMatrix) {
                m4x4.elements = parent_1.transform.getWorldMatrix();
            }
            else {
                m4x4.elements = this._pBodyPartAni._avatarNodeMap.wing.transform.getWorldMatrix();
            }
            var globalPosition = MatrixUtil.transformPosition(m4x4.elements, this._pBodyPartAni._avatarNodeMap.wing.transform._localPosition);
            this._pWingPart.transform.localPosition = this._getBonePointPos(parent_1, globalPosition);
        }
        if (this._pWeaponPart) {
            bodySp3D.addChild(this._pWeaponPart);
            this._pBodyPartAni.linkSprite3DToAvatarNode("weapon", this._pWeaponPart);
            //对齐挂点位置
            var parent_2 = this._pBodyPartAni._avatarNodeMap.weapon._parent;
            if (!parent_2) {
                throw new Error("weapon挂点有问题!");
            }
            var m4x4 = new Laya.Matrix4x4();
            if (parent_2.transform._worldMatrix) {
                m4x4.elements = parent_2.transform.getWorldMatrix();
            }
            else {
                m4x4.elements = this._pBodyPartAni._avatarNodeMap.weapon.transform.getWorldMatrix();
            }
            var globalPosition = MatrixUtil.transformPosition(m4x4.elements, this._pBodyPartAni._avatarNodeMap.weapon.transform._localPosition);
            this._pWeaponPart.transform.localPosition = this._getBonePointPos(parent_2, globalPosition);
        }
        if (this._pHorsePart) {
            var horseSp3D = this._pHorsePart.getChildAt(0);
            horseSp3D.addChild(this._pBodyPart);
            this._pHorsePartAni = horseSp3D.getComponentByType(Laya.Animator);
            this._pHorsePartAni.linkSprite3DToAvatarNode("horse", this._pBodyPart);
            //对齐挂点位置
            var parent_3 = this._pHorsePartAni._avatarNodeMap.horse._parent;
            if (!parent_3) {
                throw new Error("horse挂点有问题!");
            }
            var m4x4 = new Laya.Matrix4x4();
            if (parent_3.transform._worldMatrix) {
                m4x4.elements = parent_3.transform.getWorldMatrix();
            }
            else {
                m4x4.elements = this._pHorsePartAni._avatarNodeMap.horse.transform.getWorldMatrix();
            }
            var globalPosition = MatrixUtil.transformPosition(m4x4.elements, this._pHorsePartAni._avatarNodeMap.horse.transform._localPosition);
            this._pBodyPart.transform.localPosition = this._getBonePointPos(parent_3, globalPosition);
        }
        else {
            this._pRoleSp3D.addChild(this._pBodyPart);
        }
        this._completeLoadNu++;
        if (this._loadNu == this._completeLoadNu) {
            this.event(Character.LOAD_COMPLETE);
        }
        // this._pBodyPartAni.stop();
        this._pBodyPartAni.on(Laya.Event.STOPPED, this, this._bodyActionComplete);
        if (!this._horseID && this.pAIMoveScript) {
        }
        //替换着色器
        if (id.indexOf("6609") != -1) {
            this._findMaterial(bodySp3D.getChildAt(0), Character.BODY_RES_URL, 6609);
        }
        this._findMeshSp3D(bodySp3D);
    };
    Character.prototype._horseComplete = function (id) {
        this._pHorsePart = Laya.loader.getRes(id).clone();
        var horseSp3D = this._pHorsePart.getChildAt(0);
        this._findMeshSp3D(horseSp3D);
        this._pHorsePartAni = horseSp3D.getComponentByType(Laya.Animator);
        this._pHorsePartAni.playOnWake = false;
        this._pHorsePartAni.play(HorseActionStateConst.IDLE);
        var anitionClip = this._pHorsePartAni.getClip("idle");
        if (anitionClip)
            anitionClip.islooping = true;
        anitionClip = this._pHorsePartAni.getClip("run");
        if (anitionClip)
            anitionClip.islooping = true;
        if (this._pBodyPart) {
            horseSp3D.addChild(this._pBodyPart);
            this._pHorsePartAni.linkSprite3DToAvatarNode("horse", this._pBodyPart);
            //对齐挂点位置
            var parent_4 = this._pHorsePartAni._avatarNodeMap.horse._parent;
            if (!parent_4) {
                throw new Error("horse挂点有问题!");
            }
            var m4x4 = new Laya.Matrix4x4();
            if (parent_4.transform._worldMatrix) {
                m4x4.elements = parent_4.transform.getWorldMatrix();
            }
            else {
                m4x4.elements = this._pHorsePartAni._avatarNodeMap.horse.transform.getWorldMatrix();
            }
            var globalPosition = MatrixUtil.transformPosition(m4x4.elements, this._pHorsePartAni._avatarNodeMap.horse.transform._localPosition);
            this._pBodyPart.transform.localPosition = this._getBonePointPos(parent_4, globalPosition);
        }
        this._pRoleSp3D.addChild(this._pHorsePart);
        this._completeLoadNu++;
        if (this._loadNu == this._completeLoadNu) {
            this.event(Character.LOAD_COMPLETE);
        }
        if (this.pAIMoveScript) {
            this._pHorsePartAni.play(HorseActionStateConst.RUN);
        }
    };
    Character.prototype._wingComplete = function (id) {
        this._pWingPart = Laya.loader.getRes(id).clone();
        var wingSp3D = this._pWingPart.getChildAt(0);
        var wingAni = wingSp3D.getComponentByType(Laya.Animator);
        wingAni.play(WingActionStateConst.IDLE);
        this._pWingPartAni = wingAni;
        var anitionClip = wingAni.getClip("idle");
        if (anitionClip)
            anitionClip.islooping = true;
        if (this._pBodyPart) {
            var bodySp3D = this._pBodyPart.getChildAt(0);
            bodySp3D.addChild(this._pWingPart);
            this._pBodyPartAni = bodySp3D.getComponentByType(Laya.Animator);
            this._pBodyPartAni.linkSprite3DToAvatarNode("wing", this._pWingPart);
            //对齐挂点位置
            var parent_5 = this._pBodyPartAni._avatarNodeMap.wing._parent;
            if (!parent_5) {
                throw new Error("wing挂点有问题!");
            }
            var m4x4 = new Laya.Matrix4x4();
            if (parent_5.transform._worldMatrix) {
                m4x4.elements = parent_5.transform.getWorldMatrix();
            }
            else {
                m4x4.elements = this._pBodyPartAni._avatarNodeMap.wing.transform.getWorldMatrix();
            }
            var globalPosition = MatrixUtil.transformPosition(m4x4.elements, this._pBodyPartAni._avatarNodeMap.wing.transform._localPosition);
            this._pWingPart.transform.localPosition = this._getBonePointPos(parent_5, globalPosition);
        }
        this._completeLoadNu++;
        if (this._loadNu == this._completeLoadNu) {
            this.event(Character.LOAD_COMPLETE);
        }
        //替换着色器
        if (id.indexOf("6437") != -1) {
            this._findMaterial(wingSp3D.getChildAt(0), Character.WING_RES_URL, 6437);
        }
        this._findMeshSp3D(wingSp3D);
    };
    Character.prototype._weaponComplete = function (id) {
        this._pWeaponPart = Laya.loader.getRes(id).clone();
        var weaponSp3D = this._pWeaponPart.getChildAt(0);
        weaponSp3D.transform.localRotationEuler = new Laya.Vector3(0, 0, 125);
        this._pWeaponPartAni = weaponSp3D.getComponentByType(Laya.Animator);
        this._pWeaponPartAni.playOnWake = false;
        this._findMeshSp3D(weaponSp3D);
        if (this._pBodyPart) {
            var bodySp3D = this._pBodyPart.getChildAt(0);
            bodySp3D.addChild(this._pWeaponPart);
            this._pBodyPartAni = bodySp3D.getComponentByType(Laya.Animator);
            this._pBodyPartAni.linkSprite3DToAvatarNode("weapon", this._pWeaponPart);
            //对齐挂点位置
            var parent_6 = this._pBodyPartAni._avatarNodeMap.weapon._parent;
            if (!parent_6) {
                throw new Error("weapon挂点有问题!");
            }
            var m4x4 = new Laya.Matrix4x4();
            if (parent_6.transform._worldMatrix) {
                m4x4.elements = parent_6.transform.getWorldMatrix();
            }
            else {
                m4x4.elements = this._pBodyPartAni._avatarNodeMap.weapon.transform.getWorldMatrix();
            }
            var globalPosition = MatrixUtil.transformPosition(m4x4.elements, this._pBodyPartAni._avatarNodeMap.weapon.transform._localPosition);
            this._pWeaponPart.transform.localPosition = this._getBonePointPos(parent_6, globalPosition);
        }
        this._completeLoadNu++;
        if (this._loadNu == this._completeLoadNu) {
            this.event(Character.LOAD_COMPLETE);
        }
    };
    Character.prototype._bodyActionComplete = function () {
        if (SceneManager.instance.bInFight) {
            if (this.fromActionState == CharacterActionStateConst.ATTACK && this.toActionState == CharacterActionStateConst.IDLE) {
                // this.transform.position = this._pFightVec3Pos;
                Laya.timer.clear(this, this._startGhost);
                this._pTargetPosVec3 = this.transform.localPosition.clone();
                Laya.Tween.to(this._pTargetPosVec3, { x: this._pFightVec3Pos.x, y: this._pFightVec3Pos.y, z: this._pFightVec3Pos.z }, 200, Laya.Ease.linearNone, Laya.Handler.create(this, this._moveComplete));
                Laya.timer.frameLoop(1, this, this._modifyPosition);
                this._pBodyPartAni.play(CharacterActionStateConst.IDLE);
            }
            else if (this.fromActionState == CharacterActionStateConst.SKILL && this.toActionState == CharacterActionStateConst.IDLE) {
                this._pBodyPartAni.play(CharacterActionStateConst.IDLE);
                Laya.timer.once(500, this, function () { AIFightControl.instance.nextFightRound(); });
            }
            else if (this.fromActionState == CharacterActionStateConst.HIT && this.toActionState == CharacterActionStateConst.IDLE) {
                this._pBodyPartAni.play(CharacterActionStateConst.IDLE);
            }
            else if (this.toActionState == CharacterActionStateConst.DIE) {
                this._pBodyPartAni.stop();
                if (this._pHorsePartAni) {
                    this._pHorsePartAni.stop();
                }
                if (this._pWingPartAni) {
                    this._pWingPartAni.stop();
                }
                if (this._pWeaponPartAni) {
                    this._pWeaponPartAni.stop();
                }
                this._playDieFade();
            }
            else if (this.fromActionState == "" || this.toActionState == "") {
                this._pBodyPartAni.play(CharacterActionStateConst.IDLE);
            }
        }
        else {
            this._pBodyPartAni.play(CharacterActionStateConst.RUN);
        }
    };
    Character.prototype._modifyPosition = function () {
        this.transform.localPosition = this._pTargetPosVec3;
    };
    Character.prototype._moveComplete = function () {
        Laya.timer.clear(this, this._modifyPosition);
        AIFightControl.instance.nextFightRound();
    };
    Character.prototype._addToMaterials = function (meshSp3D) {
        var material;
        if (meshSp3D.skinnedMeshRender instanceof Laya.SkinnedMeshRender) {
            material = meshSp3D.skinnedMeshRender.material;
        }
        else {
            material = meshSp3D.meshRender.material;
        }
        if (this._renderQuenen) {
            var vec3 = meshSp3D.transform.position;
            // meshSp3D.transform.position = new Laya.Vector3(vec3.x, vec3.y, 0);
            material.renderQueue = this._renderQuenen;
            console.log(material.renderQueue);
            console.log(meshSp3D.transform.position.elements);
        }
        this._materials.push(material);
        for (var i = 0; i < meshSp3D.numChildren; i++) {
            this._findMeshSp3D(meshSp3D.getChildAt(i));
        }
    };
    Character.prototype._playDieFade = function () {
        this.alpha = 0.5;
    };
    Character.prototype._findMaterial = function (sp3d, url, id) {
        var material = new CustomMaterialSimple();
        material.diffuseTexture = Laya.loader.getRes(url + id + "/Assets/assets/texture/" + id + ".jpg");
        if (sp3d instanceof Laya.SkinnedMeshSprite3D) {
            sp3d.skinnedMeshRender.material = material;
        }
        else if (sp3d instanceof Laya.MeshSprite3D) {
            sp3d.meshRender.material = material;
        }
        for (var i = 0; i < sp3d.numChildren; i++) {
            var sp = sp3d.getChildAt(i);
            if (sp instanceof Laya.SkinnedMeshSprite3D) {
                sp.skinnedMeshRender.material = material;
            }
            else if (sp instanceof Laya.MeshSprite3D) {
                sp.meshRender.material = material;
            }
            this._findMaterial(sp, url, id);
        }
    };
    Character.prototype._getBonePointPos = function (parent, globalPosition) {
        while (parent && parent.transform._worldMatrix) {
            if (parent._parent) {
                parent = parent._parent;
            }
            else {
                break;
            }
        }
        var out = new Laya.Matrix4x4();
        parent.transform._entity.worldMatrix.invert(out);
        return MatrixUtil.transformPosition(out.elements, globalPosition.elements);
    };
    Character.prototype._startGhost = function () {
        var sp = this.roleSp3D.clone();
        SceneManager.instance.characterFightLayer3D.addChild(sp);
        var body3d = sp.getChildAt(0).getChildAt(0);
        var bodyPartAni = body3d.getComponentByType(Laya.Animator);
        var roleSp3dAni = this.roleSp3D.getChildAt(0).getChildAt(0).getComponentByType(Laya.Animator);
        if (roleSp3dAni) {
            var curClip = roleSp3dAni.currentPlayClip;
            bodyPartAni.play(curClip ? curClip.name : null);
            bodyPartAni.playbackTime = curClip ? roleSp3dAni.currentPlayTime : 0;
            Laya.timer.once(10, this, function () {
                bodyPartAni.paused = true;
            });
        }
        for (var i = 0; i < sp.numChildren; i++) {
            var childSp3d = sp.getChildAt(i).getChildAt(0);
            for (var j = 0; j < childSp3d.numChildren; j++) {
                this._ghostMaterial(childSp3d.getChildAt(j), Character.BODY_RES_URL, sp.name);
            }
        }
        Laya.timer.once(300, this, function () {
            SceneManager.instance.characterFightLayer3D.removeChild(sp);
            sp.destroy();
            sp = null;
        });
    };
    Character.prototype._ghostMaterial = function (sp3d, url, id) {
        var material = new GhostMaterial();
        material.albedo = new Laya.Vector4(1, 215 / 255, 0, 1);
        var cloneSp = sp3d;
        if (sp3d instanceof Laya.SkinnedMeshSprite3D) {
            cloneSp.skinnedMeshRender.material = material;
        }
        else if (sp3d instanceof Laya.MeshSprite3D) {
            cloneSp.meshRender.material = material;
        }
        for (var i = 0; i < sp3d.numChildren; i++) {
            var sp = sp3d.getChildAt(i);
            if (sp instanceof Laya.SkinnedMeshSprite3D) {
                sp.skinnedMeshRender.material = material;
            }
            else if (sp instanceof Laya.MeshSprite3D) {
                sp.meshRender.material = material;
            }
            this._ghostMaterial(sp, url, id);
        }
    };
    Character.prototype._updateBloodBar = function () {
        if (this.roleSp3D) {
            SceneManager.instance.orthographicCoordToScreenCoord(this._pRoleSp3D.transform.position, this._loodOutVec3);
            this._bloodBar.x = this._loodOutVec3.x - 20;
            this._bloodBar.y = this._loodOutVec3.y - 100;
            this._bloodBarBg.x = this._loodOutVec3.x - 20;
            this._bloodBarBg.y = this._loodOutVec3.y - 100;
        }
    };
    Character.BODY = 1;
    Character.WING = 2;
    Character.WEAPON = 3;
    Character.HORSE = 4;
    Character.LOAD_COMPLETE = "loadComplete";
    Character.BODY_RES_URL = "res/character/";
    Character.HORSE_RES_URL = "res/horse/";
    Character.WING_RES_URL = "res/wing/";
    Character.WEAPON_RES_URL = "res/weapon/";
    return Character;
}(Laya.Sprite3D));
//# sourceMappingURL=Character.js.map