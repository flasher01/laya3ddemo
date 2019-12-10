var Level = /** @class */ (function () {
    // private roleID1 = [6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609];
    function Level() {
        this._pPos2dVec3 = new Laya.Vector3();
        this._characterEuler = new Laya.Vector3();
        this.roleID = [6105, 6111, 6600, 6609, 6610, 6635, 6690, 6697, 6701, 6709, 6714, 6724, 8204, "longnv", "zhujue"];
    }
    Level.prototype.enter = function () {
        LoaderManager.instance.loadImage2D([{ url: "res/scene2d/small.jpg", type: Laya.Loader.IMAGE },
            { url: "res/scene2d/bloodBar.png", type: Laya.Loader.IMAGE },
            { url: "res/scene2d/bloodBarBg.png", type: Laya.Loader.IMAGE }
        ], this, this._scene2dComplete, "加载场景中");
    };
    Level.prototype._scene2dComplete = function () {
        var scene2dBg = new Laya.Image();
        scene2dBg.texture = Laya.loader.getRes("res/scene2d/small.jpg");
        SceneManager.instance.initScene2D(scene2dBg);
        SceneManager.instance.initScene3D();
        // this._mianCharacter = SceneManager.instance.addMainCharacterClickStage(this, this._characterLoadComplete); 
        var urlArr = [];
        for (var index = 0; index < this.roleID.length; index++) {
            var urlId = this.roleID[index];
            var url = { url: Character.BODY_RES_URL + urlId + "/" + urlId + ".lh" };
            urlArr.push(url);
        }
        urlArr.push({ url: Character.WING_RES_URL + 6437 + "/" + 6437 + ".lh" });
        urlArr.push({ url: Character.HORSE_RES_URL + 6044 + "/" + 6044 + ".lh" });
        LoaderManager.instance.loadSprite3D(urlArr, this, this._characterLoadComplete, "加载角色中");
    };
    Level.prototype._readyEnterFight = function () {
        Laya.timer.once(5000, this, this._enterFight);
    };
    Level.prototype._characterLoadComplete = function () {
        var pt = new Laya.Point();
        // pt.setTo((Laya.stage.designWidth >> 1) * Laya.stage.clientScaleX, (Laya.stage.designHeight >> 1) * Laya.stage.clientScaleY);
        SceneManager.instance.addMainCharacterAIControl();
        // return undefined;
        var agentSprite2D;
        var urlArr = [];
        for (var index = 0; index < this.roleID.length - 1; index++) {
            var urlId = this.roleID[index];
            var x = 250 + (SceneManager.instance.bgLayer.width - 450) * Math.random();
            var y = 350 + (SceneManager.instance.bgLayer.height - 750) * Math.random();
            pt.setTo(x, y);
            SceneManager.instance.addCharacter(urlId, index, pt);
        }
        this._readyEnterFight();
        AIFightControl.instance.on("fightEnd", this, this._readyEnterFight);
    };
    Level.prototype._clickStage = function () {
        this._pPos2dVec3.fromArray([Laya.stage.mouseX, Laya.stage.mouseY, 0]);
        var tanslateVec3 = new Laya.Vector3();
        SceneManager.instance.curCamera3D.convertScreenCoordToOrthographicCoord(this._pPos2dVec3, tanslateVec3);
        var dy = tanslateVec3.y - this._mianCharacter.transform.position.y;
        var dx = tanslateVec3.x - this._mianCharacter.transform.position.x;
        var angle = Math.atan2(dy, dx) + .5 * Math.PI;
        var degree = angle * 180 / Math.PI;
        degree = 0 > degree ? 360 + degree : degree;
        var characterEuler = this._mianCharacter.transform.localRotationEuler;
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
            this._mianCharacter.transform.localRotationEuler = new Laya.Vector3(0, degree, 0);
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
            this._mianCharacter.transform.localRotationEuler = this._characterEuler;
        }
    };
    Level.prototype._enterFight = function () {
        SceneManager.instance.enterFight();
    };
    return Level;
}());
//# sourceMappingURL=Level.js.map