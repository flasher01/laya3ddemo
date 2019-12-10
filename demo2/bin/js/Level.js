var Level = /** @class */ (function () {
    function Level() {
        this._pPos2dVec3 = new Laya.Vector3();
        this._characterEuler = new Laya.Vector3();
        this.roleID = [6105, 6111, 6600, 6609, 6610, 6635, 6690, 6697, 6701, 6709, 6714, 6724, 8204, "longnv"];
    }
    Level.prototype.enter = function () {
        SceneManager.instance.loadScene("res/scene2d/small.jpg", this, this._scene2dComplete);
    };
    Level.prototype._scene2dComplete = function () {
        var scene2dBg = new Laya.Image();
        scene2dBg.texture = Laya.loader.getRes("res/scene2d/small.jpg");
        SceneManager.instance.initScene2D(scene2dBg);
        SceneManager.instance.initScene3D();
        this._mianCharacter = SceneManager.instance.addMainCharacter(this, this._characterLoadComplete);
        var pt = new Laya.Point();
        var agentSprite2D;
        for (var index = 0; index < this.roleID.length; index++) {
            var x = 250 + (SceneManager.instance.bgLayer.width - 450) * Math.random();
            var y = 350 + (SceneManager.instance.bgLayer.height - 750) * Math.random();
            pt.setTo(x, y);
            SceneManager.instance.addCharacter(this.roleID[index], index, pt);
        }
    };
    Level.prototype._characterLoadComplete = function () {
        var pos2dVec3 = new Laya.Vector3();
        var translateVec3 = new Laya.Vector3();
        pos2dVec3.fromArray([Laya.stage.designWidth >> 1, Laya.stage.designHeight >> 1, 0]);
        SceneManager.instance.curCamera3D.convertScreenCoordToOrthographicCoord(pos2dVec3, translateVec3);
        this._mianCharacter.tansform.position = translateVec3;
        Laya.stage.on(Laya.Event.CLICK, this, this._clickStage);
    };
    Level.prototype._clickStage = function () {
        this._pPos2dVec3.fromArray([Laya.stage.mouseX * Laya.stage.clientScaleX, Laya.stage.mouseY * Laya.stage.clientScaleY, 0]);
        var tanslateVec3 = new Laya.Vector3();
        SceneManager.instance.curCamera3D.convertScreenCoordToOrthographicCoord(this._pPos2dVec3, tanslateVec3);
        var dy = tanslateVec3.y - this._mianCharacter.tansform.position.y;
        var dx = tanslateVec3.x - this._mianCharacter.tansform.position.x;
        var angle = Math.atan2(dy, dx) + .5 * Math.PI;
        var degree = angle * 180 / Math.PI;
        degree = 0 > degree ? 360 + degree : degree;
        var characterEuler = this._mianCharacter.tansform.localRotationEuler;
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
            this._mianCharacter.tansform.localRotationEuler = new Laya.Vector3(0, degree, 0);
        }
        this._mianCharacter.changeAction(CharacterActionStateConst.RUN);
        // this._pCharacter.setTargetPos(tanslateVec3);
        var pt = SceneManager.instance.bgLayer.globalToLocal(new Laya.Point(this._pPos2dVec3.x, this._pPos2dVec3.y));
        SceneManager.instance.camera2D.focusTarget = pt;
    };
    Level.prototype._rotationUpdate = function () {
        if (this._characterEuler.y > 360) {
            this._characterEuler.y -= 360;
        }
        else if (this._characterEuler.y < 0) {
            this._characterEuler.y += 360;
        }
        if (this._mianCharacter) {
            this._mianCharacter.tansform.localRotationEuler = this._characterEuler;
        }
    };
    return Level;
}());
//# sourceMappingURL=Level.js.map