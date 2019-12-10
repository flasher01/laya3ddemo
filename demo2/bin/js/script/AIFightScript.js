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
var AIFightScript = /** @class */ (function (_super) {
    __extends(AIFightScript, _super);
    function AIFightScript() {
        var _this = _super.call(this) || this;
        _this._pTargetPosVec3 = new Laya.Vector3();
        _this._skillWord = ["雷电术", "刀光剑影"];
        _this._damageMax = 1000;
        return _this;
    }
    AIFightScript.prototype.clear = function () {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        this._pCharacter = null;
        this._pRoleSp3D = null;
        this._pAttackedTarget = null;
        this._pTargetPosVec3 = null;
    };
    AIFightScript.prototype._load = function (owner) {
        this._pCharacter = this.owner;
        this._pRoleSp3D = this._pCharacter.roleSp3D;
    };
    AIFightScript.prototype._start = function (state) {
    };
    AIFightScript.prototype._update = function (state) {
    };
    AIFightScript.prototype.skillAttack = function (attackedTargetArr) {
        var skillNu = Math.floor(Math.random() * 2 + 1);
        this._pCharacter.changeAction(CharacterActionStateConst.ATTACK);
        this._pCharacter.fromActionState = CharacterActionStateConst.SKILL;
        this._pCharacter.toActionState = CharacterActionStateConst.IDLE;
        this._pCharacter.skillShowWord(this._skillWord[skillNu - 1]);
        var damageNu = Math.floor(Math.random() * this._damageMax);
        for (var _i = 0, attackedTargetArr_1 = attackedTargetArr; _i < attackedTargetArr_1.length; _i++) {
            var o = attackedTargetArr_1[_i];
            o.data.life -= damageNu;
            if (o.data.life <= 0) {
                AIFightControl.instance.removeDieCharacter(o.camp, o.fightPoint);
            }
        }
        var _loop_1 = function (o) {
            o.hitedShowDamageNu(damageNu);
            var sp3d = Laya.Pool.getItem("FX_" + skillNu);
            if (!sp3d) {
                sp3d = Laya.loader.getRes("res/fx/3d/" + skillNu + "/1.lh").clone();
                Laya.Pool.recover("FX_" + skillNu, sp3d);
            }
            sp3d.transform.position = o.transform.position.clone();
            var len = sp3d.getChildAt(0).numChildren;
            for (var i = 0; i < len; i++) {
                var particleSys = sp3d.getChildAt(0).getChildAt(i).particleSystem;
                particleSys.looping = false;
                // particleSys.playOnAwake = true;
                particleSys.play();
            }
            SceneManager.instance._effectFightLayer3D.addChild(sp3d);
            Laya.timer.once(100, this_1, function () {
                Laya.Pool.recover("FX_" + skillNu, sp3d);
            });
            // Laya.timer.once(1, this, () => {
            if (o.data.life > 0) {
                o.changeAction(CharacterActionStateConst.HIT);
                o.fromActionState = CharacterActionStateConst.HIT;
                o.toActionState = CharacterActionStateConst.IDLE;
            }
            else {
                o.changeAction(CharacterActionStateConst.DIE);
                o.fromActionState = CharacterActionStateConst.DIE;
                o.toActionState = CharacterActionStateConst.DIE;
            }
        };
        var this_1 = this;
        for (var _a = 0, attackedTargetArr_2 = attackedTargetArr; _a < attackedTargetArr_2.length; _a++) {
            var o = attackedTargetArr_2[_a];
            _loop_1(o);
        }
    };
    AIFightScript.prototype.normalAttack = function (attackedTarget) {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this._pTargetPosVec3);
        this._pAttackedTarget = attackedTarget;
        var targetPos = attackedTarget.transform.position.clone();
        if (attackedTarget.camp == CampType.Enemy) {
            targetPos.z += 2;
        }
        else if (attackedTarget.camp == CampType.Player) {
            targetPos.z -= 2;
        }
        this._pTargetPosVec3 = this._pCharacter.transform.position.clone();
        Laya.Tween.to(this._pTargetPosVec3, { x: targetPos.x, y: targetPos.y, z: targetPos.z }, 200, Laya.Ease.linearNone, Laya.Handler.create(this, this._moveComplete));
        Laya.timer.frameLoop(1, this, this._modifyPosition);
        if (Math.random() < 0.5) {
            this._pCharacter.ghost = true;
        }
        // if (this._pCharacter.name == "6609") {
        //     this._pCharacter.ghost = true;
        // }
    };
    AIFightScript.prototype._moveComplete = function () {
        var _this = this;
        Laya.timer.clearAll(this);
        if (!this._pCharacter) {
            Laya.Tween.clearAll(this);
            return undefined;
        }
        this._pCharacter.changeAction(CharacterActionStateConst.ATTACK);
        // this._pCharacter.ghost = true;
        var damageNu = Math.floor(Math.random() * this._damageMax);
        var hitDead = false;
        if (Math.random() > 0.5) {
            damageNu = 9999;
            hitDead = true;
        }
        this._pAttackedTarget.data.life -= damageNu;
        if (this._pAttackedTarget.data.life <= 0) {
            AIFightControl.instance.removeDieCharacter(this._pAttackedTarget.camp, this._pAttackedTarget.fightPoint);
        }
        Laya.timer.once(300, this, function () {
            if (hitDead) {
                _this._pAttackedTarget.hitedFireBody();
            }
            //刀光特效
            var sp3d = Laya.loader.getRes("res/fx/3d/11/1.lh");
            sp3d.transform.position = _this._pAttackedTarget.transform.position.clone();
            var len = sp3d.getChildAt(0).numChildren;
            for (var i = 0; i < len; i++) {
                var particleSys = sp3d.getChildAt(0).getChildAt(i).particleSystem;
                particleSys.looping = false;
                // particleSys.playOnAwake = true;
                particleSys.play();
            }
            SceneManager.instance._effectFightLayer3D.addChild(sp3d);
            _this._pAttackedTarget.hitedShowDamageNu(damageNu);
            if (_this._pAttackedTarget.data.life > 0) {
                _this._pAttackedTarget.changeAction(CharacterActionStateConst.HIT);
                _this._pAttackedTarget.fromActionState = CharacterActionStateConst.HIT;
                _this._pAttackedTarget.toActionState = CharacterActionStateConst.IDLE;
            }
            else {
                _this._pAttackedTarget.changeAction(CharacterActionStateConst.DIE);
                _this._pAttackedTarget.lifeState = "die";
                _this._pAttackedTarget.fromActionState = CharacterActionStateConst.DIE;
                _this._pAttackedTarget.toActionState = CharacterActionStateConst.DIE;
            }
        });
        this._pCharacter.fromActionState = CharacterActionStateConst.ATTACK;
        this._pCharacter.toActionState = CharacterActionStateConst.IDLE;
    };
    AIFightScript.prototype._modifyPosition = function () {
        this._pCharacter.transform.position = this._pTargetPosVec3;
    };
    return AIFightScript;
}(Laya.Script));
//# sourceMappingURL=AIFightScript.js.map