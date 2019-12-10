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
var CharacterMoveScript = /** @class */ (function (_super) {
    __extends(CharacterMoveScript, _super);
    function CharacterMoveScript() {
        var _this = _super.call(this) || this;
        _this.life = 200;
        _this._speedV3 = new Laya.Vector3();
        _this._offSet = new Laya.Vector3();
        return _this;
    }
    CharacterMoveScript.prototype.setTargetPos = function (pos) {
        this._targetPos = pos;
        this._speedV3 = this._pRoleSp3D.transform.position;
        Laya.Tween.to(this._speedV3, { x: pos.x, y: pos.y, z: pos.z }, 1000);
    };
    CharacterMoveScript.prototype._load = function (owner) {
        this._pRoleSp3D = this.owner;
    };
    CharacterMoveScript.prototype._update = function (state) {
        if (!this._targetPos)
            return undefined;
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
    };
    /**
     * 当其他碰撞器进入绑定物体碰撞器时触发（子弹击中物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    CharacterMoveScript.prototype.onTriggerEnter = function (other) {
    };
    /**
     * 当其他碰撞器进入绑定物体碰撞器后逐帧触发（子弹进入物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    CharacterMoveScript.prototype.onTriggerStay = function (other) {
    };
    /**
     * 当其他碰撞器退出绑定物体碰撞器时逐帧触发（子弹穿出物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    CharacterMoveScript.prototype.onTriggerExit = function (other) {
        //一帧后销毁子弹（目前脚本中直接销毁绑定对象会报错，后期版本解决此问题）
        // Laya.timer.frameOnce(1, this,function(){ this.horse.destroy() });
    };
    return CharacterMoveScript;
}(Laya.Script));
//# sourceMappingURL=CharacterMoveScript.js.map