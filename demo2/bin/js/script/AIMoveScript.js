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
var AIMoveScript = /** @class */ (function (_super) {
    __extends(AIMoveScript, _super);
    function AIMoveScript() {
        var _this = _super.call(this) || this;
        _this._moveTween = new Laya.Tween();
        _this._convertLocalToGlobalPoint = new Laya.Point();
        _this._vec33DPos = new Laya.Vector3();
        return _this;
    }
    AIMoveScript.prototype._load = function (owner) {
        this._pCharacter = this.owner;
        this._pRoleSp3D = this._pCharacter.roleSp3D;
        this._camPosOffset = new Laya.Vector3();
        Laya.Vector3.subtract(SceneManager.instance.curCamera3D.transform.position, this._pCharacter.transform.position, this._camPosOffset);
        Laya.timer.frameLoop(1, this, this._run);
    };
    AIMoveScript.prototype._start = function (state) {
    };
    AIMoveScript.prototype._update = function (state) {
    };
    /**
     * 当其他碰撞器进入绑定物体碰撞器时触发（子弹击中物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    AIMoveScript.prototype.onTriggerEnter = function (other) {
    };
    /**
     * 当其他碰撞器进入绑定物体碰撞器后逐帧触发（子弹进入物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    AIMoveScript.prototype.onTriggerStay = function (other) {
    };
    /**
     * 当其他碰撞器退出绑定物体碰撞器时逐帧触发（子弹穿出物品时）
     * 注：如相对移动速度过快，可能直接越过
     */
    AIMoveScript.prototype.onTriggerExit = function (other) {
        //一帧后销毁子弹（目前脚本中直接销毁绑定对象会报错，后期版本解决此问题）
        // Laya.timer.frameOnce(1, this,function(){ this.horse.destroy() });
    };
    AIMoveScript.prototype._run = function () {
        if (!SceneManager.instance.bInFight) {
            this._pCharacter.transform.position = new Laya.Vector3(this._pCharacter.transform.position.x, this._pCharacter.transform.position.y, this._pCharacter.transform.position.z - 0.1);
            var targetCamPos = new Laya.Vector3();
            Laya.Vector3.add(this._pCharacter.transform.position, this._camPosOffset, targetCamPos);
            var resultPos = new Laya.Vector3();
            // Laya.Vector3.lerp(SceneManager.instance.curCamera3D.transform.position, targetCamPos, 5 * Laya.timer.delta / 1000, resultPos);
            SceneManager.instance.curCamera3D.transform.position = targetCamPos;
            SceneManager.instance.changeMap(this._pCharacter.transform.position.z);
        }
    };
    return AIMoveScript;
}(Laya.Script));
//# sourceMappingURL=AIMoveScript.js.map