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
        Laya.timer.once(300, this, function () {
            for (var _i = 0, attackedTargetArr_2 = attackedTargetArr; _i < attackedTargetArr_2.length; _i++) {
                var o = attackedTargetArr_2[_i];
                o.hitedShowDamageNu(damageNu);
                var x = void 0;
                var y = void 0;
                var out = new Laya.Vector3();
                SceneManager.instance.orthographicCoordToScreenCoord(o.transform.position, out);
                x = out.x;
                y = out.y;
                var l = BattleMagic.create("res/fx/" + skillNu + "/" + skillNu, false, x, y, 300, 300);
                l.scale(1, 1);
                l.scene = SceneManager.instance.effectLayer2D;
                l.dep = y + 21;
                Laya.stage.addChild(l);
                l.effPart.scale(1, 1);
                if (skillNu == 2) {
                    if ((o.camp == CampType.Enemy)) {
                        // l.effPart.scaleY = -1;
                    }
                    else {
                        l.effPart.scaleX = -1;
                    }
                }
                l.play();
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
            }
        });
    };
    AIFightScript.prototype.normalAttack = function (attackedTarget) {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this._pTargetPosVec3);
        this._pAttackedTarget = attackedTarget;
        var targetPos = attackedTarget.transform.position.clone();
        if (attackedTarget.camp == CampType.Enemy) {
            targetPos.x += 1.5;
            targetPos.y -= 1;
        }
        else if (attackedTarget.camp == CampType.Player) {
            targetPos.x -= 1.5;
            targetPos.y += 1;
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