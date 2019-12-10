class Level {
    private _mianCharacter: Character;
    private _pPos2dVec3: Laya.Vector3 = new Laya.Vector3();
    private _characterEuler: Laya.Vector3 = new Laya.Vector3();
    private roleID = [6105, 6111, 6600, 6609, 6610, 6635, 6690, 6697, 6701, 6709, 6714, 6724, 8204, "longnv", "zhujue"];
    // private roleID1 = [6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609, 6609];
    constructor() {

    }
    enter() {
        LoaderManager.instance.loadSprite3D([{ url: "res/scene3d/map/map_sc01.lh" }], this, this._scene3dComplete, "加载场景中");
    }

    private _scene3dComplete() {
        LoaderManager.instance.loadImage2D([
            { url: "res/scene2d/bloodBar.png", type: Laya.Loader.IMAGE },
            { url: "res/scene2d/bloodBarBg.png", type: Laya.Loader.IMAGE }
        ], this, () => {
            SceneManager.instance.initScene3D();
            SceneManager.instance.addSky();
            SceneManager.instance.addMap3D();
            this._loadCharacter();
        }, "加载场景中");
    }

    private _loadCharacter() {
        let urlArr = [];
        for (let index = 0; index < this.roleID.length; index++) {
            let urlId = this.roleID[index];
            let url = { url: Character.BODY_RES_URL + urlId + "/" + urlId + ".lh" };
            urlArr.push(url);
        }
        urlArr.push({ url: Character.WING_RES_URL + 6437 + "/" + 6437 + ".lh" });
        urlArr.push({ url: Character.HORSE_RES_URL + 6044 + "/" + 6044 + ".lh" });
        urlArr.push({ url: "res/fx/3d/1/1.lh" });
        urlArr.push({ url: "res/fx/3d/2/1.lh" });
        urlArr.push({ url: "res/fx/3d/11/1.lh" });
        LoaderManager.instance.loadSprite3D(urlArr, this, this._characterLoadComplete, "加载角色中");
    }

    private _readyEnterFight() {
        Laya.timer.once(5000, this, this._enterFight);
    }

    private _characterLoadComplete() {
        let pt = new Laya.Point();
        // pt.setTo((Laya.stage.designWidth >> 1) * Laya.stage.clientScaleX, (Laya.stage.designHeight >> 1) * Laya.stage.clientScaleY);
        SceneManager.instance.addMainCharacterAIControl();
        // return undefined;
        // let agentSprite2D: Laya.Sprite;
        // let urlArr = [];
        // for (let index = 0; index < this.roleID.length - 1; index++) {
        //     let urlId = this.roleID[index];
        //     let x = 250 + (SceneManager.instance.bgLayer.width - 450) * Math.random();
        //     let y = 350 + (SceneManager.instance.bgLayer.height - 750) * Math.random();
        //     pt.setTo(x, y);
        //     SceneManager.instance.addCharacter(urlId, index, pt);
        // }
        for (let i = 0; i < 3; i++) {
            Laya.Pool.recover("FX_1", (Laya.loader.getRes("res/fx/3d/1/1.lh") as Laya.Sprite3D).clone());
            Laya.Pool.recover("FX_2", (Laya.loader.getRes("res/fx/3d/2/1.lh") as Laya.Sprite3D).clone());
        }
        this._readyEnterFight();
        AIFightControl.instance.on("fightEnd", this, this._readyEnterFight);
    }

    private _clickStage() {
        this._pPos2dVec3.fromArray([Laya.stage.mouseX, Laya.stage.mouseY, 0]);
        let tanslateVec3 = new Laya.Vector3();
        SceneManager.instance.curCamera3D.convertScreenCoordToOrthographicCoord(this._pPos2dVec3, tanslateVec3);
        let dy = tanslateVec3.y - this._mianCharacter.transform.position.y;
        let dx = tanslateVec3.x - this._mianCharacter.transform.position.x;
        let angle = Math.atan2(dy, dx) + .5 * Math.PI;
        let degree = angle * 180 / Math.PI;
        degree = 0 > degree ? 360 + degree : degree;
        var characterEuler = this._mianCharacter.transform.localRotationEuler;
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
            this._mianCharacter.transform.localRotationEuler = new Laya.Vector3(0, degree, 0);
        }
        this._mianCharacter.changeAction(CharacterActionStateConst.RUN);
        // this._pCharacter.setTargetPos(tanslateVec3);
        let pt = SceneManager.instance.bgLayer.globalToLocal(new Laya.Point(this._pPos2dVec3.x, this._pPos2dVec3.y));
        SceneManager.instance.camera2D.focusTarget = pt;
    }

    private _rotationUpdate() {
        if (this._characterEuler.y > 360) {
            this._characterEuler.y -= 360;
        } else if (this._characterEuler.y < 0) {
            this._characterEuler.y += 360;
        }
        if (this._mianCharacter) {
            this._mianCharacter.transform.localRotationEuler = this._characterEuler;
        }
    }

    private _enterFight() {
        SceneManager.instance.enterFight();
    }
}