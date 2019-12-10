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
    function Character(scene, mainRole, pos) {
        if (mainRole === void 0) { mainRole = false; }
        var _this = _super.call(this) || this;
        _this.bMainRole = false;
        _this.pos2D = new Laya.Vector3();
        _this.convertLocalToGlobalPoint = new Laya.Point();
        _this._loadNu = 0;
        _this._completeLoadNu = 0;
        _this._vec33D = new Laya.Vector3();
        _this._pTargetPosVec3 = new Laya.Vector3();
        _this.BODY_RES_URL = "res/character/";
        _this.HORSE_RES_URL = "res/horse/";
        _this.WING_RES_URL = "res/wing/";
        _this.WEAPON_RES_URL = "res/weapon/";
        _this._pScene = scene;
        _this._pRoleSp3D = new Laya.Sprite3D();
        _this._pRoleSp3D.transform.localScale = new Laya.Vector3(0.35, 0.35, 0.35);
        if (pos) {
            _this._pRoleSp3D.transform.position = pos;
            _this._pFightVec3Pos = pos.clone();
        }
        // if (mainRole) {
        //     this._pRoleSp3D.addComponent(CharacterMoveScript);
        //     this._pCharacterMoveScript = this._pRoleSp3D.getComponentByType(CharacterMoveScript) as CharacterMoveScript;
        // } else {
        //     this.addComponent(AIMoveScript);
        //     this._pAIScript = this.getComponentByType(AIMoveScript) as AIMoveScript;
        // }
        _this.pos2D = new Laya.Vector3();
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
                this.pAIMoveScript.startup(this._pAgentSprite2D);
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
        this._pScene = null;
        if (this._pRoleSp3D) {
            this._pRoleSp3D.destroy();
            this._pRoleSp3D = null;
        }
        if (this._pBodyPart) {
            this._pBodyPart.destroy();
            this._pBodyPart = null;
        }
        if (this._pHorsePart) {
            this._pHorsePart.destroy();
            this._pHorsePart = null;
        }
        if (this._pWingPart) {
            this._pWingPart.destroy();
            this._pWingPart = null;
        }
        if (this._pWeaponPart) {
            this._pWeaponPart.destroy();
            this._pWeaponPart = null;
        }
        this._pRoleAni = null;
        this._pBodyPartAni = null;
        this._pHorsePartAni = null;
        this._pWingPartAni = null;
        this._characterEuler = null;
        this._pCharacterMoveScript = null;
        ;
        if (this._pAgentSprite2D) {
            this._pAgentSprite2D.destroy();
            this._pAgentSprite2D = null;
        }
        this._vec33D = null;
        this._pFightVec3Pos = null;
        this._pTargetPosVec3 = null;
    };
    Character.prototype.skillAttack = function (attackTarget) {
        this.pAIFightScript.skillAttack(attackTarget);
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
            if (this._pBodyPartAni)
                this._pBodyPartAni.play(actionName, 2);
        }
        else {
            if (this._pBodyPartAni)
                this._pBodyPartAni.play(actionName, 1);
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
        this._loadNu = 0;
        this._completeLoadNu = 0;
        if (bodyid) {
            this._loadNu++;
            this._createBody(this.BODY_RES_URL + "" + bodyid + "/" + bodyid + ".lh");
        }
        if (horseid) {
            this._loadNu++;
            this._createHorse(this.HORSE_RES_URL + "" + horseid + "/" + horseid + ".lh");
        }
        if (wingid) {
            this._loadNu++;
            this._createWing(this.WING_RES_URL + "" + wingid + "/" + wingid + ".lh");
        }
        if (weaponid) {
            this._loadNu++;
            this._createWeapon(this.WEAPON_RES_URL + "" + weaponid + "/" + weaponid + ".lh");
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
    Character.prototype._bodyComplete = function (id) {
        this._pBodyPart = Laya.loader.getRes(id).clone();
        var bodySp3D = this._pBodyPart.getChildAt(0);
        if (!bodySp3D)
            return undefined;
        this._pBodyPartAni = bodySp3D.getComponentByType(Laya.Animator);
        //设置默认动画
        var bodyAniClip = this._pBodyPartAni.getClip(CharacterActionStateConst.IDLE);
        if (!bodyAniClip) {
            bodyAniClip = this._pBodyPartAni.getClip("stand");
        }
        bodyAniClip.islooping = true;
        // this._pBodyPartAni.clip = bodyAniClip;
        this._pBodyPartAni.play(CharacterActionStateConst.IDLE);
        if (this._pWingPart) {
            bodySp3D.addChild(this._pWingPart);
            this._pBodyPartAni.linkSprite3DToAvatarNode("wing", this._pWingPart);
        }
        if (this._pWeaponPart) {
            bodySp3D.addChild(this._pWeaponPart);
            this._pBodyPartAni.linkSprite3DToAvatarNode("weapon", this._pWeaponPart);
        }
        if (this._pHorsePart) {
            var horseSp3D = this._pHorsePart.getChildAt(0);
            horseSp3D.addChild(this._pBodyPart);
            this._pHorsePartAni = horseSp3D.getComponentByType(Laya.Animator);
            this._pHorsePartAni.linkSprite3DToAvatarNode("horse", this._pBodyPart);
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
    };
    Character.prototype._horseComplete = function (id) {
        this._pHorsePart = Laya.loader.getRes(id);
        var horseSp3D = this._pHorsePart.getChildAt(0);
        this._pHorsePartAni = horseSp3D.getComponentByType(Laya.Animator);
        this._pHorsePartAni.play(HorseActionStateConst.IDLE);
        var anitionClip = this._pHorsePartAni.getClip("idle");
        if (anitionClip)
            anitionClip.islooping = true;
        if (this._pBodyPart) {
            horseSp3D.addChild(this._pBodyPart);
            this._pHorsePartAni.linkSprite3DToAvatarNode("horse", this._pBodyPart);
        }
        this._pRoleSp3D.addChild(this._pHorsePart);
        this._completeLoadNu++;
        if (this._loadNu == this._completeLoadNu) {
            this.event(Character.LOAD_COMPLETE);
        }
    };
    Character.prototype._wingComplete = function (id) {
        this._pWingPart = Laya.loader.getRes(id);
        var wingSp3D = this._pWingPart.getChildAt(0);
        var wingAni = wingSp3D.getComponentByType(Laya.Animator);
        wingAni.play(WingActionStateConst.IDLE);
        var anitionClip = wingAni.getClip("idle");
        if (anitionClip)
            anitionClip.islooping = true;
        if (this._pBodyPart) {
            var bodySp3D = this._pBodyPart.getChildAt(0);
            bodySp3D.addChild(this._pWingPart);
            this._pBodyPartAni = bodySp3D.getComponentByType(Laya.Animator);
            this._pBodyPartAni.linkSprite3DToAvatarNode("wing", this._pWingPart);
        }
        this._completeLoadNu++;
        if (this._loadNu == this._completeLoadNu) {
            this.event(Character.LOAD_COMPLETE);
        }
    };
    Character.prototype._weaponComplete = function (id) {
        this._pWeaponPart = Laya.loader.getRes(id);
        var weaponSp3D = this._pWeaponPart.getChildAt(0);
        if (this._pBodyPart) {
            var bodySp3D = this._pBodyPart.getChildAt(0);
            bodySp3D.addChild(this._pWeaponPart);
            this._pBodyPartAni = bodySp3D.getComponentByType(Laya.Animator);
            this._pBodyPartAni.linkSprite3DToAvatarNode("weapon", this._pWingPart);
        }
        this._completeLoadNu++;
        if (this._loadNu == this._completeLoadNu) {
            this.event(Character.LOAD_COMPLETE);
        }
    };
    Character.prototype._bodyActionComplete = function () {
        if (SceneManager.instance.bInFight) {
            this._pBodyPartAni.play(CharacterActionStateConst.IDLE);
            if (this.fromState == CharacterActionStateConst.ATTACK && this.toState == CharacterActionStateConst.IDLE) {
                // this.transform.position = this._pFightVec3Pos;
                this._pTargetPosVec3 = this.transform.position.clone();
                Laya.Tween.to(this._pTargetPosVec3, { x: this._pFightVec3Pos.x, y: this._pFightVec3Pos.y, z: this._pFightVec3Pos.z }, 200, Laya.Ease.linearNone, Laya.Handler.create(this, this._moveComplete));
                Laya.timer.frameLoop(1, this, this._modifyPosition);
                this.fromState = CharacterActionStateConst.IDLE;
            }
        }
        else {
            this._pBodyPartAni.play(CharacterActionStateConst.RUN);
        }
    };
    Character.prototype._modifyPosition = function () {
        this.transform.position = this._pTargetPosVec3;
    };
    Character.prototype._moveComplete = function () {
        Laya.timer.clearAll(this);
        AIFightControl.instance.nextFightRound();
    };
    Character.BODY = 1;
    Character.WING = 2;
    Character.WEAPON = 3;
    Character.HORSE = 4;
    Character.LOAD_COMPLETE = "loadComplete";
    return Character;
}(Laya.Sprite3D));
//# sourceMappingURL=Character.js.map