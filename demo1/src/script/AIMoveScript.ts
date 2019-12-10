class AIMoveScript extends Laya.Script {
    private _pCharacter: Character;
    private _pRoleSp3D: Laya.Sprite3D;
    private _characterEuler: Laya.Vector3;
    _pAgentSprite2D: Laya.Sprite;
    private _pathX: number;
    private _pathY: number;
    private _moveTween: Laya.Tween = new Laya.Tween();
    private _convertLocalToGlobalPoint: Laya.Point = new Laya.Point();
    private _vec33DPos: Laya.Vector3 = new Laya.Vector3();
    constructor() {
        super();
    }

    _load(owner: Laya.ComponentNode): void {
        this._pCharacter = this.owner as Character;
        this._pRoleSp3D = this._pCharacter.roleSp3D;
        Laya.timer.frameLoop(1, this, this._convert2DPosTo3D);
    }
    _start(state: Laya.RenderState) {

    }
    public _update(state: Laya.RenderState): void {

    }
    /**
     * 当其他碰撞器进入绑定物体碰撞器时触发（子弹击中物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    onTriggerEnter(other: Laya.Collider): void {
    }
    /**
     * 当其他碰撞器进入绑定物体碰撞器后逐帧触发（子弹进入物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    onTriggerStay(other: Laya.Collider): void {
    }
    /**
     * 当其他碰撞器退出绑定物体碰撞器时逐帧触发（子弹穿出物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    onTriggerExit(other: Laya.Collider): void {
        //一帧后销毁子弹（目前脚本中直接销毁绑定对象会报错，后期版本解决此问题）
        // Laya.timer.frameOnce(1, this,function(){ this.horse.destroy() });
    }
    startup(agentSP) {
        this._pAgentSprite2D = agentSP;
        this._moveTween.clear();
        Laya.Tween.clearAll(this._pAgentSprite2D);
        this._findTargetPos();
    }
    stopFindPath() {
        this._moveTween.pause();
    }
    resumeFindPath() {
        this._moveTween.resume();
    }
    private _findTargetPos() {
        this._pathX = 250 + (SceneManager.instance.bgLayer.width - 450) * Math.random();
        this._pathY = 350 + (SceneManager.instance.bgLayer.height - 750) * Math.random();
        let time = Math.sqrt((this._pathX - this._pAgentSprite2D.x) * (this._pathX - this._pAgentSprite2D.x) + (this._pathY - this._pAgentSprite2D.y) * (this._pathY - this._pAgentSprite2D.y)) / this._pCharacter.data.speed;
        this._moveTween.to(this._pAgentSprite2D, { x: this._pathX, y: this._pathY }, time * 1000, Laya.Ease.linearNone, Laya.Handler.create(this, this._findTargetPos));

        this._turn();

        this._pCharacter.changeAction(CharacterActionStateConst.RUN);
    }
    private _turn() {
        let rotationConvertLocalToGlobal = new Laya.Point(this._pathX, this._pathY);
        rotationConvertLocalToGlobal = SceneManager.instance.bgLayer.localToGlobal(rotationConvertLocalToGlobal);
        let rotation2DPos: Laya.Vector3 = new Laya.Vector3();
        rotation2DPos.fromArray([rotationConvertLocalToGlobal.x, rotationConvertLocalToGlobal.y, 0]);
        let tanslateVec3 = new Laya.Vector3();
        SceneManager.instance.convertScreenCoordToOrthographicCoord(rotation2DPos, tanslateVec3);
        let dy = tanslateVec3.y - this._pRoleSp3D.transform.position.y;
        let dx = tanslateVec3.x - this._pRoleSp3D.transform.position.x;
        let angle = Math.atan2(dy, dx) + .5 * Math.PI;
        let degree = angle * 180 / Math.PI;
        degree = 0 > degree ? 360 + degree : degree;
        var characterEuler = this._pRoleSp3D.transform.localRotationEuler;
        if (characterEuler) {
            this._characterEuler = characterEuler;
            Laya.Tween.clearTween(characterEuler);
            if (degree - characterEuler.y > 180) {
                degree -= 360;
            } else if (degree - characterEuler.y < -180) {
                degree += 360;
            }
            Laya.Tween.to(characterEuler, { y: degree, update: new Laya.Handler(this, this._rotationUpdate) }, 60, Laya.Ease.linearOut, null, 0);
        } else {
            this._pRoleSp3D.transform.localRotationEuler = new Laya.Vector3(0, degree, 0);
        }
    }
    private _rotationUpdate() {
        if (this._characterEuler.y > 360) {
            this._characterEuler.y -= 360;
        } else if (this._characterEuler.y < 0) {
            this._characterEuler.y += 360;
        }
        if (this._pRoleSp3D) {
            this._pRoleSp3D.transform.localRotationEuler = this._characterEuler;
        }
    }

    private _convert2DPosTo3D() {
        // SceneManager.instance.orthographicCoordToScreenCoord(this._pRoleSp3D.transform.position, this.pos2D);
        if (this._pAgentSprite2D) {
            this._convertLocalToGlobalPoint.setTo(this._pAgentSprite2D.x, this._pAgentSprite2D.y);
            this._convertLocalToGlobalPoint = SceneManager.instance.bgLayer.localToGlobal(this._convertLocalToGlobalPoint);
            this._pCharacter.pos2D.x = this._convertLocalToGlobalPoint.x * Laya.stage.clientScaleX;
            this._pCharacter.pos2D.y = this._convertLocalToGlobalPoint.y * Laya.stage.clientScaleY;
            SceneManager.instance.convertScreenCoordToOrthographicCoord(this._pCharacter.pos2D, this._vec33DPos);
            this._pRoleSp3D.transform.position = this._vec33DPos;
        }
    }
}