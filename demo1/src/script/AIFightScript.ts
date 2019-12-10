class AIFightScript extends Laya.Script {
    private _pCharacter: Character;
    private _pRoleSp3D: Laya.Sprite3D;
    private _pAttackedTarget: Character;
    private _pTargetPosVec3: Laya.Vector3 = new Laya.Vector3();
    private _skillWord = ["雷电术", "刀光剑影"];
    private _damageMax = 1000;
    constructor() {
        super();
    }
    clear() {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        this._pCharacter = null;
        this._pRoleSp3D = null;
        this._pAttackedTarget = null;
        this._pTargetPosVec3 = null;
    }
    _load(owner: Laya.ComponentNode): void {
        this._pCharacter = this.owner as Character;
        this._pRoleSp3D = this._pCharacter.roleSp3D;
    }
    _start(state: Laya.RenderState) {

    }
    _update(state: Laya.RenderState): void {

    }
    skillAttack(attackedTargetArr: Array<Character>) {
        let skillNu = Math.floor(Math.random() * 2 + 1);
        this._pCharacter.changeAction(CharacterActionStateConst.ATTACK);
        this._pCharacter.fromActionState = CharacterActionStateConst.SKILL;
        this._pCharacter.toActionState = CharacterActionStateConst.IDLE;
        this._pCharacter.skillShowWord(this._skillWord[skillNu - 1]);
        let damageNu = Math.floor(Math.random() * this._damageMax);
        for (let o of attackedTargetArr) {
            o.data.life -= damageNu;
            if (o.data.life <= 0) {
                AIFightControl.instance.removeDieCharacter(o.camp, o.fightPoint);
            }
        }
        Laya.timer.once(300, this, () => {
            for (let o of attackedTargetArr) {
                o.hitedShowDamageNu(damageNu);
                let x;
                let y;
                let out: Laya.Vector3 = new Laya.Vector3();
                SceneManager.instance.orthographicCoordToScreenCoord(o.transform.position, out);
                x = out.x;
                y = out.y;
                let l = BattleMagic.create("res/fx/" + skillNu + "/" + skillNu, false, x, y, 300, 300);
                l.scale(1, 1);
                l.scene = SceneManager.instance.effectLayer2D;
                l.dep = y + 21;
                Laya.stage.addChild(l);
                l.effPart.scale(1, 1);
                if (skillNu == 2) {
                    if ((o.camp == CampType.Enemy)) {
                        // l.effPart.scaleY = -1;
                    } else {
                        l.effPart.scaleX = -1;
                    }
                }
                l.play();
                if (o.data.life > 0) {
                    o.changeAction(CharacterActionStateConst.HIT);
                    o.fromActionState = CharacterActionStateConst.HIT;
                    o.toActionState = CharacterActionStateConst.IDLE;
                } else {
                    o.changeAction(CharacterActionStateConst.DIE);
                    o.fromActionState = CharacterActionStateConst.DIE;
                    o.toActionState = CharacterActionStateConst.DIE;
                }

            }
        });
    }
    normalAttack(attackedTarget: Character) {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this._pTargetPosVec3);
        this._pAttackedTarget = attackedTarget;
        let targetPos: Laya.Vector3 = attackedTarget.transform.position.clone();
        if (attackedTarget.camp == CampType.Enemy) {
            targetPos.x += 1.5;
            targetPos.y -= 1;
        } else if (attackedTarget.camp == CampType.Player) {
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
    }
    private _moveComplete() {
        Laya.timer.clearAll(this);
        if (!this._pCharacter) {
            Laya.Tween.clearAll(this);
            return undefined;
        }
        this._pCharacter.changeAction(CharacterActionStateConst.ATTACK);
        // this._pCharacter.ghost = true;
        let damageNu = Math.floor(Math.random() * this._damageMax);
        let hitDead = false;
        if (Math.random() > 0.5) {
            damageNu = 9999;
            hitDead = true;
        }
        this._pAttackedTarget.data.life -= damageNu;
        if (this._pAttackedTarget.data.life <= 0) {
            AIFightControl.instance.removeDieCharacter(this._pAttackedTarget.camp, this._pAttackedTarget.fightPoint);
        }
        Laya.timer.once(300, this, () => {
            if (hitDead) {
                this._pAttackedTarget.hitedFireBody();

            }
            this._pAttackedTarget.hitedShowDamageNu(damageNu);
            if (this._pAttackedTarget.data.life > 0) {
                this._pAttackedTarget.changeAction(CharacterActionStateConst.HIT);
                this._pAttackedTarget.fromActionState = CharacterActionStateConst.HIT;
                this._pAttackedTarget.toActionState = CharacterActionStateConst.IDLE;
            } else {
                this._pAttackedTarget.changeAction(CharacterActionStateConst.DIE);
                this._pAttackedTarget.lifeState = "die";
                this._pAttackedTarget.fromActionState = CharacterActionStateConst.DIE;
                this._pAttackedTarget.toActionState = CharacterActionStateConst.DIE;

            }
        });
        this._pCharacter.fromActionState = CharacterActionStateConst.ATTACK;
        this._pCharacter.toActionState = CharacterActionStateConst.IDLE;
    }
    private _modifyPosition() {
        this._pCharacter.transform.position = this._pTargetPosVec3;
    }
}