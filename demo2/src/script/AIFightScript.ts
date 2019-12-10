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

        for (let o of attackedTargetArr) {
            o.hitedShowDamageNu(damageNu);
            let sp3d = Laya.Pool.getItem("FX_" + skillNu);
            if (!sp3d) {
                sp3d = (Laya.loader.getRes("res/fx/3d/" + skillNu + "/1.lh") as Laya.Sprite3D).clone();
                Laya.Pool.recover("FX_" + skillNu, sp3d);
            }
            sp3d.transform.position = o.transform.position.clone();
            let len = (sp3d.getChildAt(0) as Laya.Sprite3D).numChildren;
            for (let i = 0; i < len; i++) {
                let particleSys: Laya.ShurikenParticleSystem = ((sp3d.getChildAt(0) as Laya.Sprite3D).getChildAt(i) as Laya.ShuriKenParticle3D).particleSystem;
                particleSys.looping = false;
                // particleSys.playOnAwake = true;
                particleSys.play();
            }
            SceneManager.instance._effectFightLayer3D.addChild(sp3d);
            Laya.timer.once(100, this, () => {
                Laya.Pool.recover("FX_" + skillNu, sp3d);
            });
            // Laya.timer.once(1, this, () => {
            if (o.data.life > 0) {
                o.changeAction(CharacterActionStateConst.HIT);
                o.fromActionState = CharacterActionStateConst.HIT;
                o.toActionState = CharacterActionStateConst.IDLE;
            } else {
                o.changeAction(CharacterActionStateConst.DIE);
                o.fromActionState = CharacterActionStateConst.DIE;
                o.toActionState = CharacterActionStateConst.DIE;
            }
            // });
        }
    }
    normalAttack(attackedTarget: Character) {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this._pTargetPosVec3);
        this._pAttackedTarget = attackedTarget;
        let targetPos: Laya.Vector3 = attackedTarget.transform.position.clone();
        if (attackedTarget.camp == CampType.Enemy) {
            targetPos.z += 2;
        } else if (attackedTarget.camp == CampType.Player) {
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
            //刀光特效
            let sp3d = (Laya.loader.getRes("res/fx/3d/11/1.lh") as Laya.Sprite3D);
            sp3d.transform.position = this._pAttackedTarget.transform.position.clone();
            let len = (sp3d.getChildAt(0) as Laya.Sprite3D).numChildren;
            for (let i = 0; i < len; i++) {
                let particleSys: Laya.ShurikenParticleSystem = ((sp3d.getChildAt(0) as Laya.Sprite3D).getChildAt(i) as Laya.ShuriKenParticle3D).particleSystem;
                particleSys.looping = false;
                // particleSys.playOnAwake = true;
                particleSys.play();
            }
            SceneManager.instance._effectFightLayer3D.addChild(sp3d);

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