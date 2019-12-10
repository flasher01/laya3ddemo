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
        Laya.timer.frameLoop(1, this, this._convert3DPosTo2D);
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
    AIMoveScript.prototype.startup = function (agentSP) {
        this._pAgentSprite2D = agentSP;
        this._moveTween.clear();
        Laya.Tween.clearAll(this._pAgentSprite2D);
        this._findTargetPos();
    };
    AIMoveScript.prototype._findTargetPos = function () {
        this._pathX = 250 + (SceneManager.instance.bgLayer.width - 450) * Math.random();
        this._pathY = 350 + (SceneManager.instance.bgLayer.height - 750) * Math.random();
        this._moveTween.to(this._pAgentSprite2D, { x: this._pathX, y: this._pathY }, 5000, Laya.Ease.linearNone, Laya.Handler.create(this, this._findTargetPos));
        this._turn();
        this._pCharacter.changeAction(CharacterActionStateConst.RUN);
    };
    AIMoveScript.prototype._turn = function () {
        var rotationConvertLocalToGlobal = new Laya.Point(this._pathX, this._pathY);
        rotationConvertLocalToGlobal = SceneManager.instance.bgLayer.localToGlobal(rotationConvertLocalToGlobal);
        var rotation2DPos = new Laya.Vector3();
        rotation2DPos.fromArray([rotationConvertLocalToGlobal.x, rotationConvertLocalToGlobal.y, 0]);
        var tanslateVec3 = new Laya.Vector3();
        SceneManager.instance.convertScreenCoordToOrthographicCoord(rotation2DPos, tanslateVec3);
        var dy = tanslateVec3.y - this._pRoleSp3D.transform.position.y;
        var dx = tanslateVec3.x - this._pRoleSp3D.transform.position.x;
        var angle = Math.atan2(dy, dx) + .5 * Math.PI;
        var degree = angle * 180 / Math.PI;
        degree = 0 > degree ? 360 + degree : degree;
        var characterEuler = this._pRoleSp3D.transform.localRotationEuler;
        if (characterEuler) {
            this._characterEuler = characterEuler;
            Laya.Tween.clearTween(characterEuler);
            if (degree - characterEuler.y > 180) {
                degree -= 360;
            }
            else if (degree - characterEuler.y < -180) {
                degree += 360;
            }
            Laya.Tween.to(characterEuler, { y: degree, update: new Laya.Handler(this, this._rotationUpdate) }, 60, Laya.Ease.linearOut, null, 0);
        }
        else {
            this._pRoleSp3D.transform.localRotationEuler = new Laya.Vector3(0, degree, 0);
        }
    };
    AIMoveScript.prototype._rotationUpdate = function () {
        if (this._characterEuler.y > 360) {
            this._characterEuler.y -= 360;
        }
        else if (this._characterEuler.y < 0) {
            this._characterEuler.y += 360;
        }
        if (this._pRoleSp3D) {
            this._pRoleSp3D.transform.localRotationEuler = this._characterEuler;
        }
    };
    AIMoveScript.prototype._convert3DPosTo2D = function () {
        // SceneManager.instance.orthographicCoordToScreenCoord(this._pRoleSp3D.transform.position, this.pos2D);
        if (this._pAgentSprite2D) {
            this._convertLocalToGlobalPoint.setTo(this._pAgentSprite2D.x, this._pAgentSprite2D.y);
            this._convertLocalToGlobalPoint = SceneManager.instance.bgLayer.localToGlobal(this._convertLocalToGlobalPoint);
            this._pCharacter.pos2D.x = this._convertLocalToGlobalPoint.x;
            this._pCharacter.pos2D.y = this._convertLocalToGlobalPoint.y;
            SceneManager.instance.convertScreenCoordToOrthographicCoord(this._pCharacter.pos2D, this._vec33DPos);
            this._pRoleSp3D.transform.position = this._vec33DPos;
        }
    };
    return AIMoveScript;
}(Laya.Script));
//# sourceMappingURL=AIMoveScript.js.map