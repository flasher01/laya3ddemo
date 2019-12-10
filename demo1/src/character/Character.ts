class Character extends Laya.Sprite3D {
    static BODY: number = 1;
    static WING: number = 2;
    static WEAPON: number = 3;
    static HORSE: number = 4;
    static LOAD_COMPLETE: string = "loadComplete";

    bMainRole: boolean = false;
    pos2D: Laya.Vector3 = new Laya.Vector3();
    convertLocalToGlobalPoint: Laya.Point = new Laya.Point();
    pAIMoveScript: AIMoveScript;
    pAIFightScript: AIFightScript;
    camp: number;
    fightPoint: number;
    data: CharacterModel;

    fromActionState = "";
    toActionState = "";
    lifeState;

    private _pRoleSp3D: Laya.Sprite3D;
    private _pBodyPart: Laya.Sprite3D;
    private _pHorsePart: Laya.Sprite3D;
    private _pWingPart: Laya.Sprite3D;
    private _pWeaponPart: Laya.Sprite3D;
    private _pRoleAni: Laya.Animator;
    private _pBodyPartAni: Laya.Animator;
    private _pHorsePartAni: Laya.Animator;
    private _pWingPartAni: Laya.Animator;
    private _pWeaponPartAni: Laya.Animator;
    private _characterEuler: Laya.Vector3;
    private _pCharacterMoveScript: CharacterMoveScript;
    private _pAgentSprite2D: Laya.Sprite;
    private _loadNu: number = 0;
    private _completeLoadNu: number = 0;
    private _vec33D: Laya.Vector3 = new Laya.Vector3();
    private _pFightVec3Pos: Laya.Vector3;
    private _pTargetPosVec3: Laya.Vector3 = new Laya.Vector3();
    private _hitedDamageTxt: Laya.Label;
    private _skillWordTxt: Laya.Label;
    private _bloodBar: Laya.Image;
    private _bloodBarBg: Laya.Image;
    private _loodOutVec3: Laya.Vector3 = new Laya.Vector3();
    private _pSp3DRationX: Laya.Sprite3D;
    private _renderQuenen: number = 0;

    private _horseID;
    private _alpha = 1;
    private _materials: Array<any> = new Array<any>();

    static BODY_RES_URL = "res/character/";
    static HORSE_RES_URL = "res/horse/";
    static WING_RES_URL = "res/wing/";
    static WEAPON_RES_URL = "res/weapon/";

    constructor(pos?: Laya.Vector3, renderQuenen?: number) {
        super();
        this._renderQuenen = renderQuenen;
        this._pRoleSp3D = new Laya.Sprite3D();
        // this._pRoleSp3D.transform.localScale = new Laya.Vector3(0.35, 0.35, 0.35);
        if (pos) {
            this._pRoleSp3D.transform.localPosition = pos;
            this._pFightVec3Pos = pos.clone();
        }
        this.pos2D = new Laya.Vector3();

        if (SceneManager.instance.bInFight) {
            this._bloodBar = new Laya.Image();
            this._bloodBarBg = new Laya.Image();
            this._bloodBar.texture = Laya.loader.getRes("res/scene2d/bloodBar.png") as Laya.Texture;
            this._bloodBarBg.texture = Laya.loader.getRes("res/scene2d/bloodBarBg.png") as Laya.Texture;
            this._bloodBar.width = 500;
            this._bloodBar.height = 300 * 19 / 54;
            this._bloodBarBg.width = 500;
            this._bloodBarBg.height = 300 * 19 / 54;
            SceneManager.instance.effectLayer2D.addChild(this._bloodBarBg);
            SceneManager.instance.effectLayer2D.addChild(this._bloodBar);
            Laya.timer.frameLoop(1, this, this._updateBloodBar);
        }

        this._hitedDamageTxt = new Laya.Label();
        this._hitedDamageTxt.fontSize = 30;
        this._hitedDamageTxt.color = "#f60d09";
        this._hitedDamageTxt.strokeColor = "#000000";
        this._hitedDamageTxt.bold = true;
        this._hitedDamageTxt.visible = false;
        SceneManager.instance.effectLayer2D.addChild(this._hitedDamageTxt);
        this._skillWordTxt = new Laya.Label();
        this._skillWordTxt.fontSize = 25;
        this._skillWordTxt.color = "#0bd413";
        this._skillWordTxt.strokeColor = "#000000";
        this._skillWordTxt.bold = true;
        this._skillWordTxt.visible = false;
        SceneManager.instance.effectLayer2D.addChild(this._skillWordTxt);

        this.lifeState = "alive";
    }
    get roleSp3D() {
        return this._pRoleSp3D;
    }
    get transform() {
        return this._pRoleSp3D.transform;
    }
    set name(name: string) {
        if (this._pRoleSp3D)
            this._pRoleSp3D.name = name;
    }
    get name() {
        return this._pRoleSp3D.name;
    }
    set agentSprite2D(sp) {
        if (sp && sp != this._pAgentSprite2D && this.pAIMoveScript) {
            this._pAgentSprite2D = sp;
            this.pAIMoveScript.startup(this._pAgentSprite2D);
        }
    }
    get agentSprite2D() {
        return this._pAgentSprite2D;
    }
    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        if (this._alpha !== value) {
            for (let i = 0; i < this._materials.length; i++) {
                this._materials[i].renderMode = Laya.StandardMaterial.RENDERMODE_TRANSPARENT;
                this._materials[i].albedo = new Laya.Vector4(1, 1, 1, value);
            }
        }
    }
    set ghost(value) {
        if (value) {
            this._startGhost();
            Laya.timer.loop(100, this, this._startGhost);
        } else {
            Laya.timer.clear(this, this._startGhost);
        }
    }
    clearSelf() {
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
    }
    hitedFireBody() {
        for (let i = 0; i < this.roleSp3D.numChildren; i++) {
            this._fireBodyMaterial(this.roleSp3D.getChildAt(i).getChildAt(0).getChildAt(0));
        }
    }
    private _fireBodyMaterial(sp3d) {
        let material: FireBodyMaterial = new FireBodyMaterial();
        // material.albedo = new Laya.Vector4(1, 1, 1, 1);
        let cloneSp = sp3d;
        let oldMaterial;
        if (sp3d instanceof Laya.SkinnedMeshSprite3D) {
            oldMaterial = cloneSp.skinnedMeshRender.material;
            Laya.timer.once(250, this, () => {
                if (cloneSp)
                    cloneSp.skinnedMeshRender.material = oldMaterial;
            });
            material.diffuseTexture = cloneSp.skinnedMeshRender.material.diffuseTexture;
            cloneSp.skinnedMeshRender.material = material;
        } else if (sp3d instanceof Laya.MeshSprite3D) {
            oldMaterial = cloneSp.meshRender.material;
            Laya.timer.once(250, this, () => {
                if (cloneSp)
                    cloneSp.skinnedMeshRender.material = oldMaterial;
            });
            material.diffuseTexture = cloneSp.meshRender.material.diffuseTexture;
            cloneSp.meshRender.material = material;
        }
        for (let i = 0; i < sp3d.numChildren; i++) {
            let sp = sp3d.getChildAt(i);
            if (sp instanceof Laya.SkinnedMeshSprite3D) {
                oldMaterial = cloneSp.skinnedMeshRender.material;
                Laya.timer.once(250, this, () => {
                    if (cloneSp)
                        cloneSp.skinnedMeshRender.material = oldMaterial;
                });
                material.diffuseTexture = (sp.skinnedMeshRender.material as Laya.StandardMaterial).diffuseTexture;
                sp.skinnedMeshRender.material = material;
            } else if (sp instanceof Laya.MeshSprite3D) {
                oldMaterial = cloneSp.meshRender.material;
                Laya.timer.once(250, this, () => {
                    if (cloneSp)
                        cloneSp.skinnedMeshRender.material = oldMaterial;
                });
                material.diffuseTexture = (sp.meshRender.material as Laya.StandardMaterial).diffuseTexture;
                sp.meshRender.material = material;
            }
            this._fireBodyMaterial(sp);
        }
    }
    hitedShowDamageNu(nu) {
        Laya.Tween.clearAll(this._hitedDamageTxt);
        this._hitedDamageTxt.visible = true;
        let out: Laya.Vector3 = new Laya.Vector3();
        SceneManager.instance.orthographicCoordToScreenCoord(this._pRoleSp3D.transform.position, out);
        this._hitedDamageTxt.text = "-" + nu;
        this._hitedDamageTxt.x = out.x;
        this._hitedDamageTxt.y = out.y - 50;
        Laya.Tween.to(this._hitedDamageTxt, { x: out.x, y: out.y - 100 }, 800, Laya.Ease.cubicOut, Laya.Handler.create(this, () => { this._hitedDamageTxt.visible = false }));

        this._bloodBar.scaleX = this.data.life / this.data.maxLife;
        if (this._bloodBar.scaleX < 0) {
            this._bloodBar.scaleX = 0;
        }
    }
    skillShowWord(str) {
        Laya.Tween.clearAll(this._skillWordTxt);
        this._skillWordTxt.visible = true;
        let out: Laya.Vector3 = new Laya.Vector3();
        SceneManager.instance.orthographicCoordToScreenCoord(this._pRoleSp3D.transform.position, out);
        this._skillWordTxt.text = str;
        this._skillWordTxt.x = out.x;
        this._skillWordTxt.y = out.y - 50;
        Laya.Tween.to(this._skillWordTxt, { x: out.x, y: out.y - 100 }, 800, Laya.Ease.cubicOut, Laya.Handler.create(this, () => { this._skillWordTxt.visible = false }));
    }
    skillAttack(attackedTargetArr: Array<Character>) {
        this.pAIFightScript.skillAttack(attackedTargetArr);
    }
    normalAttack(attackTarget: Character) {
        this.pAIFightScript.normalAttack(attackTarget);
    }
    turnTo(angle) {
        this._pRoleSp3D.transform.localRotationEuler = new Laya.Vector3(0, angle, 0);
    }
    setTargetPos(pos: Laya.Vector3) {
        this._pCharacterMoveScript.setTargetPos(pos);
    }
    changeAction(actionName: string) {
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
        } else {
            if (this._pBodyPartAni)
                this._pBodyPartAni.play(actionName, 1);
            if (this._pHorsePartAni) {
                this._pHorsePartAni.play(actionName);
            }
        }

    }
    /*
     * @param partId 资源id名
     * @param partType 角色部位
     */
    changePart(partId: string, partType: number) {
        if (partType == Character.BODY) {
            this._createBody(partId);
        } else if (partType == Character.WING) {
            this._createWing(partId);
        } else if (partType == Character.WEAPON) {
            this._createWeapon(partId);
        } else if (partType == Character.HORSE) {
            this._createHorse(partId);
        } else {
            throw new Error("change part error!error partId:" + partId + ",error partType:" + partType);
        }
    }
    createCharacter(bodyid, horseid, wingid, weaponid) {
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
    }
    private _createBody(id) {
        if (Laya.loader.getRes(id)) {
            this._bodyComplete(id);
        } else {
            Laya.loader.create(id, Laya.Handler.create(this, this._bodyComplete, [id]), null, Laya.Sprite3D);
        }
    }
    private _createHorse(id) {
        if (Laya.loader.getRes(id)) {
            this._horseComplete(id);
        } else {
            Laya.loader.create(id, Laya.Handler.create(this, this._horseComplete, [id]), null, Laya.Sprite3D);
        }
    }
    private _createWing(id) {
        if (Laya.loader.getRes(id)) {
            this._wingComplete(id);
        } else {
            Laya.loader.create(id, Laya.Handler.create(this, this._wingComplete, [id]), null, Laya.Sprite3D);
        }
    }
    private _createWeapon(id) {
        if (Laya.loader.getRes(id)) {
            this._weaponComplete(id);
        } else {
            Laya.loader.create(id, Laya.Handler.create(this, this._weaponComplete, [id]), null, Laya.Sprite3D);
        }
    }
    private _findMeshSp3D(bodySp3D) {
        for (let i = 0; i < bodySp3D.numChildren; i++) {
            let skinnedMeshSp3D = bodySp3D.getChildAt(i);
            if (skinnedMeshSp3D instanceof Laya.SkinnedMeshSprite3D || skinnedMeshSp3D instanceof Laya.MeshSprite3D) {
                this._addToMaterials(bodySp3D.getChildAt(i));
            } else if (skinnedMeshSp3D instanceof Laya.Sprite3D) {
                this._findMeshSp3D(skinnedMeshSp3D);
            }
        }
    }
    private _bodyComplete(id) {
        this._pBodyPart = (Laya.loader.getRes(id) as Laya.Sprite3D).clone();
        let bodySp3D = this._pBodyPart.getChildAt(0) as Laya.Sprite3D;
        if (!bodySp3D) throw Error("body骨骼信息错误");
        this._pBodyPartAni = bodySp3D.getComponentByType(Laya.Animator) as Laya.Animator;
        //设置默认动画
        let bodyAniClip: Laya.AnimationClip = this._pBodyPartAni.getClip(CharacterActionStateConst.IDLE);
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
            let parent = this._pBodyPartAni._avatarNodeMap.wing._parent;
            if (!parent) {
                throw new Error("wing挂点有问题!")
            }
            let m4x4: Laya.Matrix4x4 = new Laya.Matrix4x4();
            if (parent.transform._worldMatrix) {
                m4x4.elements = parent.transform.getWorldMatrix();
            } else {
                m4x4.elements = this._pBodyPartAni._avatarNodeMap.wing.transform.getWorldMatrix();
            }
            let globalPosition: Laya.Vector3 = MatrixUtil.transformPosition(m4x4.elements, this._pBodyPartAni._avatarNodeMap.wing.transform._localPosition);
            this._pWingPart.transform.localPosition = this._getBonePointPos(parent, globalPosition);
        }
        if (this._pWeaponPart) {
            bodySp3D.addChild(this._pWeaponPart);
            this._pBodyPartAni.linkSprite3DToAvatarNode("weapon", this._pWeaponPart);
            //对齐挂点位置
            let parent = this._pBodyPartAni._avatarNodeMap.weapon._parent;
            if (!parent) {
                throw new Error("weapon挂点有问题!")
            }
            let m4x4: Laya.Matrix4x4 = new Laya.Matrix4x4();
            if (parent.transform._worldMatrix) {
                m4x4.elements = parent.transform.getWorldMatrix();
            } else {
                m4x4.elements = this._pBodyPartAni._avatarNodeMap.weapon.transform.getWorldMatrix();
            }
            let globalPosition: Laya.Vector3 = MatrixUtil.transformPosition(m4x4.elements, this._pBodyPartAni._avatarNodeMap.weapon.transform._localPosition);
            this._pWeaponPart.transform.localPosition = this._getBonePointPos(parent, globalPosition);
        }
        if (this._pHorsePart) {
            let horseSp3D = this._pHorsePart.getChildAt(0) as Laya.Sprite3D;
            horseSp3D.addChild(this._pBodyPart);
            this._pHorsePartAni = horseSp3D.getComponentByType(Laya.Animator) as Laya.Animator;
            this._pHorsePartAni.linkSprite3DToAvatarNode("horse", this._pBodyPart);
            //对齐挂点位置
            let parent = this._pHorsePartAni._avatarNodeMap.horse._parent;
            if (!parent) {
                throw new Error("horse挂点有问题!")
            }
            let m4x4: Laya.Matrix4x4 = new Laya.Matrix4x4();
            if (parent.transform._worldMatrix) {
                m4x4.elements = parent.transform.getWorldMatrix();
            } else {
                m4x4.elements = this._pHorsePartAni._avatarNodeMap.horse.transform.getWorldMatrix();
            }
            let globalPosition: Laya.Vector3 = MatrixUtil.transformPosition(m4x4.elements, this._pHorsePartAni._avatarNodeMap.horse.transform._localPosition);
            this._pBodyPart.transform.localPosition = this._getBonePointPos(parent, globalPosition);
        } else {
            this._pRoleSp3D.addChild(this._pBodyPart);
        }
        this._completeLoadNu++;
        if (this._loadNu == this._completeLoadNu) {
            this.event(Character.LOAD_COMPLETE);
        }
        // this._pBodyPartAni.stop();
        this._pBodyPartAni.on(Laya.Event.STOPPED, this, this._bodyActionComplete);

        if (!this._horseID && this.pAIMoveScript) {
            this.pAIMoveScript.startup(this._pAgentSprite2D);
        }
        //替换着色器
        if (id.indexOf("6609") != -1) {
            this._findMaterial(bodySp3D.getChildAt(0), Character.BODY_RES_URL, 6609);
        }
        this._findMeshSp3D(bodySp3D);
    }
    private _horseComplete(id) {
        this._pHorsePart = Laya.loader.getRes(id).clone();
        let horseSp3D = this._pHorsePart.getChildAt(0) as Laya.Sprite3D;
        this._findMeshSp3D(horseSp3D);
        this._pHorsePartAni = horseSp3D.getComponentByType(Laya.Animator) as Laya.Animator;
        this._pHorsePartAni.playOnWake = false;
        this._pHorsePartAni.play(HorseActionStateConst.IDLE);
        let anitionClip: Laya.AnimationClip = this._pHorsePartAni.getClip("idle") as Laya.AnimationClip;
        if (anitionClip)
            anitionClip.islooping = true;
        anitionClip = this._pHorsePartAni.getClip("run") as Laya.AnimationClip;
        if (anitionClip)
            anitionClip.islooping = true;
        if (this._pBodyPart) {
            horseSp3D.addChild(this._pBodyPart);
            this._pHorsePartAni.linkSprite3DToAvatarNode("horse", this._pBodyPart);
            //对齐挂点位置
            let parent = this._pHorsePartAni._avatarNodeMap.horse._parent;
            if (!parent) {
                throw new Error("horse挂点有问题!")
            }
            let m4x4: Laya.Matrix4x4 = new Laya.Matrix4x4();
            if (parent.transform._worldMatrix) {
                m4x4.elements = parent.transform.getWorldMatrix();
            } else {
                m4x4.elements = this._pHorsePartAni._avatarNodeMap.horse.transform.getWorldMatrix();
            }
            let globalPosition: Laya.Vector3 = MatrixUtil.transformPosition(m4x4.elements, this._pHorsePartAni._avatarNodeMap.horse.transform._localPosition);
            this._pBodyPart.transform.localPosition = this._getBonePointPos(parent, globalPosition);
        }
        this._pRoleSp3D.addChild(this._pHorsePart);
        this._completeLoadNu++;
        if (this._loadNu == this._completeLoadNu) {
            this.event(Character.LOAD_COMPLETE);
        }
        if (this.pAIMoveScript) {
            this._pHorsePartAni.play(HorseActionStateConst.RUN);
            this.pAIMoveScript.startup(this._pAgentSprite2D);
        }
    }
    private _wingComplete(id) {
        this._pWingPart = Laya.loader.getRes(id).clone();
        let wingSp3D = this._pWingPart.getChildAt(0) as Laya.Sprite3D;
        let wingAni = wingSp3D.getComponentByType(Laya.Animator) as Laya.Animator;
        wingAni.play(WingActionStateConst.IDLE);
        this._pWingPartAni = wingAni;
        let anitionClip: Laya.AnimationClip = wingAni.getClip("idle") as Laya.AnimationClip;
        if (anitionClip)
            anitionClip.islooping = true;
        if (this._pBodyPart) {
            let bodySp3D = this._pBodyPart.getChildAt(0) as Laya.Sprite3D;
            bodySp3D.addChild(this._pWingPart);
            this._pBodyPartAni = bodySp3D.getComponentByType(Laya.Animator) as Laya.Animator;
            this._pBodyPartAni.linkSprite3DToAvatarNode("wing", this._pWingPart);
            //对齐挂点位置
            let parent = this._pBodyPartAni._avatarNodeMap.wing._parent;
            if (!parent) {
                throw new Error("wing挂点有问题!")
            }
            let m4x4: Laya.Matrix4x4 = new Laya.Matrix4x4();
            if (parent.transform._worldMatrix) {
                m4x4.elements = parent.transform.getWorldMatrix();
            } else {
                m4x4.elements = this._pBodyPartAni._avatarNodeMap.wing.transform.getWorldMatrix();
            }
            let globalPosition: Laya.Vector3 = MatrixUtil.transformPosition(m4x4.elements, this._pBodyPartAni._avatarNodeMap.wing.transform._localPosition);
            this._pWingPart.transform.localPosition = this._getBonePointPos(parent, globalPosition);
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
    }
    private _weaponComplete(id) {
        this._pWeaponPart = Laya.loader.getRes(id).clone();
        let weaponSp3D = this._pWeaponPart.getChildAt(0) as Laya.Sprite3D;
        weaponSp3D.transform.localRotationEuler = new Laya.Vector3(0, 0, 125);
        this._pWeaponPartAni = weaponSp3D.getComponentByType(Laya.Animator) as Laya.Animator;
        this._pWeaponPartAni.playOnWake = false;

        this._findMeshSp3D(weaponSp3D);
        if (this._pBodyPart) {
            let bodySp3D = this._pBodyPart.getChildAt(0) as Laya.Sprite3D;
            bodySp3D.addChild(this._pWeaponPart);
            this._pBodyPartAni = bodySp3D.getComponentByType(Laya.Animator) as Laya.Animator;
            this._pBodyPartAni.linkSprite3DToAvatarNode("weapon", this._pWeaponPart);

            //对齐挂点位置
            let parent = this._pBodyPartAni._avatarNodeMap.weapon._parent;
            if (!parent) {
                throw new Error("weapon挂点有问题!");
            }
            let m4x4: Laya.Matrix4x4 = new Laya.Matrix4x4();
            if (parent.transform._worldMatrix) {
                m4x4.elements = parent.transform.getWorldMatrix();
            } else {
                m4x4.elements = this._pBodyPartAni._avatarNodeMap.weapon.transform.getWorldMatrix();
            }
            let globalPosition: Laya.Vector3 = MatrixUtil.transformPosition(m4x4.elements, this._pBodyPartAni._avatarNodeMap.weapon.transform._localPosition);
            this._pWeaponPart.transform.localPosition = this._getBonePointPos(parent, globalPosition);
        }
        this._completeLoadNu++;
        if (this._loadNu == this._completeLoadNu) {
            this.event(Character.LOAD_COMPLETE);
        }
    }
    private _bodyActionComplete() {
        if (SceneManager.instance.bInFight) {
            if (this.fromActionState == CharacterActionStateConst.ATTACK && this.toActionState == CharacterActionStateConst.IDLE) {
                // this.transform.position = this._pFightVec3Pos;
                Laya.timer.clear(this, this._startGhost);
                this._pTargetPosVec3 = this.transform.localPosition.clone();
                Laya.Tween.to(this._pTargetPosVec3, { x: this._pFightVec3Pos.x, y: this._pFightVec3Pos.y, z: this._pFightVec3Pos.z }, 200, Laya.Ease.linearNone, Laya.Handler.create(this, this._moveComplete));
                Laya.timer.frameLoop(1, this, this._modifyPosition);
                this._pBodyPartAni.play(CharacterActionStateConst.IDLE);
            } else if (this.fromActionState == CharacterActionStateConst.SKILL && this.toActionState == CharacterActionStateConst.IDLE) {
                this._pBodyPartAni.play(CharacterActionStateConst.IDLE);
                Laya.timer.once(500, this, () => { AIFightControl.instance.nextFightRound(); });
            }
            else if (this.fromActionState == CharacterActionStateConst.HIT && this.toActionState == CharacterActionStateConst.IDLE) {
                this._pBodyPartAni.play(CharacterActionStateConst.IDLE);
            } else if (this.toActionState == CharacterActionStateConst.DIE) {
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
            } else if (this.fromActionState == "" || this.toActionState == "") {
                this._pBodyPartAni.play(CharacterActionStateConst.IDLE);
            }
        } else {
            this._pBodyPartAni.play(CharacterActionStateConst.RUN);
        }
    }
    private _modifyPosition() {
        this.transform.localPosition = this._pTargetPosVec3;
    }
    private _moveComplete() {
        Laya.timer.clear(this, this._modifyPosition);
        AIFightControl.instance.nextFightRound();
    }
    private _addToMaterials(meshSp3D) {
        let material;
        if (meshSp3D.skinnedMeshRender instanceof Laya.SkinnedMeshRender) {
            material = meshSp3D.skinnedMeshRender.material;
        } else {
            material = meshSp3D.meshRender.material;
        }
        if (this._renderQuenen) {
            let vec3: Laya.Vector3 = meshSp3D.transform.position;
            // meshSp3D.transform.position = new Laya.Vector3(vec3.x, vec3.y, 0);
            material.renderQueue = this._renderQuenen;
            console.log(material.renderQueue);
            console.log(meshSp3D.transform.position.elements);
        }
        this._materials.push(material);
        for (let i = 0; i < meshSp3D.numChildren; i++) {
            this._findMeshSp3D(meshSp3D.getChildAt(i));
        }
    }
    private _playDieFade() {
        this.alpha = 0.5;
    }

    private _findMaterial(sp3d, url, id) {
        let material: CustomMaterialSimple = new CustomMaterialSimple();
        material.diffuseTexture = Laya.loader.getRes(url + id + "/Assets/assets/texture/" + id + ".jpg");
        if (sp3d instanceof Laya.SkinnedMeshSprite3D) {
            sp3d.skinnedMeshRender.material = material;
        } else if (sp3d instanceof Laya.MeshSprite3D) {
            sp3d.meshRender.material = material;

        }
        for (let i = 0; i < sp3d.numChildren; i++) {
            let sp = sp3d.getChildAt(i);
            if (sp instanceof Laya.SkinnedMeshSprite3D) {
                sp.skinnedMeshRender.material = material;
            } else if (sp instanceof Laya.MeshSprite3D) {
                sp.meshRender.material = material;
            }
            this._findMaterial(sp, url, id);
        }
    }
    private _getBonePointPos(parent, globalPosition): Laya.Vector3 {
        while (parent && parent.transform._worldMatrix) {
            if (parent._parent) {
                parent = parent._parent;
            } else {
                break;
            }
        }
        let out: Laya.Matrix4x4 = new Laya.Matrix4x4();
        parent.transform._entity.worldMatrix.invert(out);
        return MatrixUtil.transformPosition(out.elements, globalPosition.elements);
    }
    private _startGhost() {
        let sp = this.roleSp3D.clone();
        SceneManager.instance.characterFightLayer3D.addChild(sp);

        let body3d = sp.getChildAt(0).getChildAt(0) as Laya.Sprite3D;
        let bodyPartAni = body3d.getComponentByType(Laya.Animator) as Laya.Animator;
        let roleSp3dAni = (this.roleSp3D.getChildAt(0).getChildAt(0) as Laya.Sprite3D).getComponentByType(Laya.Animator) as Laya.Animator;
        if (roleSp3dAni) {
            let curClip = roleSp3dAni.currentPlayClip;
            bodyPartAni.play(curClip ? curClip.name : null);
            bodyPartAni.playbackTime = curClip ? roleSp3dAni.currentPlayTime : 0;
            Laya.timer.once(10, this, () => {
                bodyPartAni.paused = true;
            });
        }
        for (let i = 0; i < sp.numChildren; i++) {
            let childSp3d = sp.getChildAt(i).getChildAt(0);
            for (let j = 0; j < childSp3d.numChildren; j++) {
                this._ghostMaterial(childSp3d.getChildAt(j), Character.BODY_RES_URL, sp.name);
            }
        }
        Laya.timer.once(300, this, () => {
            SceneManager.instance.characterFightLayer3D.removeChild(sp);
            sp.destroy();
            sp = null;
        });
    }
    private _ghostMaterial(sp3d, url, id) {
        let material: GhostMaterial = new GhostMaterial();
        material.albedo = new Laya.Vector4(1, 215 / 255, 0, 1);
        let cloneSp = sp3d;
        if (sp3d instanceof Laya.SkinnedMeshSprite3D) {
            cloneSp.skinnedMeshRender.material = material;
        } else if (sp3d instanceof Laya.MeshSprite3D) {
            cloneSp.meshRender.material = material;
        }
        for (let i = 0; i < sp3d.numChildren; i++) {
            let sp = sp3d.getChildAt(i);
            if (sp instanceof Laya.SkinnedMeshSprite3D) {
                sp.skinnedMeshRender.material = material;
            } else if (sp instanceof Laya.MeshSprite3D) {
                sp.meshRender.material = material;
            }
            this._ghostMaterial(sp, url, id);
        }
    }

    private _updateBloodBar() {
        if (this.roleSp3D) {
            SceneManager.instance.orthographicCoordToScreenCoord(this._pRoleSp3D.transform.position, this._loodOutVec3);
            this._bloodBar.x = this._loodOutVec3.x - 20;
            this._bloodBar.y = this._loodOutVec3.y - 100;
            this._bloodBarBg.x = this._loodOutVec3.x - 20;
            this._bloodBarBg.y = this._loodOutVec3.y - 100;
        }
    }
}