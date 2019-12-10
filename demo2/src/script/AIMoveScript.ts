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
    private _camPosOffset: Laya.Vector3;
    constructor() {
        super();
    }

    _load(owner: Laya.ComponentNode): void {
        this._pCharacter = this.owner as Character;
        this._pRoleSp3D = this._pCharacter.roleSp3D;
        this._camPosOffset = new Laya.Vector3();
        Laya.Vector3.subtract(SceneManager.instance.curCamera3D.transform.position, this._pCharacter.transform.position, this._camPosOffset);
        Laya.timer.frameLoop(1, this, this._run);
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

    private _run() {
        if (!SceneManager.instance.bInFight) {
            this._pCharacter.transform.position = new Laya.Vector3(this._pCharacter.transform.position.x, this._pCharacter.transform.position.y, this._pCharacter.transform.position.z - 0.1);
            let targetCamPos: Laya.Vector3 = new Laya.Vector3();
            Laya.Vector3.add(this._pCharacter.transform.position, this._camPosOffset, targetCamPos);
            let resultPos: Laya.Vector3 = new Laya.Vector3();
            // Laya.Vector3.lerp(SceneManager.instance.curCamera3D.transform.position, targetCamPos, 5 * Laya.timer.delta / 1000, resultPos);
            SceneManager.instance.curCamera3D.transform.position = targetCamPos;
            SceneManager.instance.changeMap(this._pCharacter.transform.position.z);
        }
    }
}