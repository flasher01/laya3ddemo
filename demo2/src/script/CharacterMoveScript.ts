class CharacterMoveScript extends Laya.Script {
    private _pRoleSp3D: Laya.Sprite3D;
    private life: number = 200;
    private _speedV3: Laya.Vector3 = new Laya.Vector3();
    private _targetPos: Laya.Vector3;
    private _offSet: Laya.Vector3 = new Laya.Vector3();
    constructor() {
        super();
    }
    setTargetPos(pos: Laya.Vector3) {
        this._targetPos = pos;
        this._speedV3 = this._pRoleSp3D.transform.position;
        Laya.Tween.to(this._speedV3, { x: pos.x, y: pos.y, z: pos.z }, 1000);
    }
    public _load(owner: Laya.ComponentNode): void {
        this._pRoleSp3D = this.owner as Laya.Sprite3D;
    }

    public _update(state: Laya.RenderState): void {
        if (!this._targetPos) return undefined;
        this._pRoleSp3D.transform.position = this._speedV3;
        // this._pRoleSp3D.transform.translate(this._speedV3, false);
        // let targetCamPos = new Laya.Vector3();
        // Laya.Vector3.add(this._targetPos, this._offSet, targetCamPos);
        // Laya.Vector3.lerp(SceneManager.instance.curCamera.position, targetCamPos, 5 * Laya.timer.delta, SceneManager.instance.curCamera.position);
        //生命周期递减
        // this.life--;
        // //生命周期结束后，一帧后销毁子弹（目前脚本中直接销毁绑定对象会报错，后期版本解决此问题）
        // if (this.life < 0) {
        //     Laya.timer.frameOnce(3, this, function () { this.horse.destroy(); });
        // }
    }
    /**
     * 当其他碰撞器进入绑定物体碰撞器时触发（子弹击中物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    public onTriggerEnter(other: Laya.Collider): void {
    }
    /**
     * 当其他碰撞器进入绑定物体碰撞器后逐帧触发（子弹进入物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    public onTriggerStay(other: Laya.Collider): void {
    }
    /**
     * 当其他碰撞器退出绑定物体碰撞器时逐帧触发（子弹穿出物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    public onTriggerExit(other: Laya.Collider): void {
        //一帧后销毁子弹（目前脚本中直接销毁绑定对象会报错，后期版本解决此问题）
        // Laya.timer.frameOnce(1, this,function(){ this.horse.destroy() });
    }
}