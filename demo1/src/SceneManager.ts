class SceneManager {
    private static _ins: SceneManager;
    private _stageContainer: Laya.Sprite;
    private _curCamera2D: Camera2D;
    private _sceneHangUp: Laya.Scene;
    private _sceneFight: Laya.Scene;
    private _characterFightLayer3D: Laya.Sprite3D;
    private _renderQueenNu: number = 5000;

    characterLayer3D: Laya.Sprite3D;
    characterLayer2D: Laya.Sprite;
    bgLayer: Laya.Sprite;
    curCamera3D: Laya.Camera;
    fightBg: Laya.Sprite;
    progressLayer: Laya.Sprite;
    effectLayer2D: Laya.Sprite;

    characterArr: Array<Character> = new Array<Character>();
    fightCharacterEnemyArr: Array<Character> = new Array<Character>();
    fightCharacterPlayerArr: Array<Character> = new Array<Character>();

    bInFight: boolean = false;

    constructor() {
        this._initLayer();
        this._initCamera2d();
    }
    static get instance(): SceneManager {
        return this._ins || (this._ins = new SceneManager());
    }
    get characterFightLayer3D() {
        return this._characterFightLayer3D;
    }
    get camera2D() {
        return this._curCamera2D;
    }
    private roleID = [6105, 6111, 6600, 6609, 6610, 6635, 6690, 6697, 6701, 6709, 6714, 6724, 8204, "longnv"];
    // private roleID = [6714, 6714, 6714, 6714, 6714, 6714, 6635, 6635, 6635, 6635, 6635, 6635, 6714, 6714];
    enterFight() {
        this.bInFight = true;
        for (let o of this.characterArr) {
            let script: AIMoveScript = o.getComponentByType(AIMoveScript) as AIMoveScript
            script.enable = false;
            script.stopFindPath();
        }
        // if (this._sceneHangUp)
        //     this._sceneHangUp.visible = false;
        this._sceneFight.visible = true;
        this.fightBg.visible = true;
        this._initFightScene3D();
        if (this.fightCharacterEnemyArr.length == 0) {
            let len = FightCoordinatePos.pos_enemy3D.length;
            let pt = new Laya.Point();
            let roleIDLen = this.roleID.length;
            let roleId;
            let randomIndex;
            let character: Character;
            let renderQueneIdx = 0;
            for (let i = 0; i < len; i++) {
                // pt.setTo(FightCoordinatePos.pos_enemy[i][0] * Laya.stage.clientScaleX, FightCoordinatePos.pos_enemy[i][1] * Laya.stage.clientScaleY);
                randomIndex = Math.floor(Math.random() * this.roleID.length);
                roleId = this.roleID[randomIndex];
                renderQueneIdx++;
                character = this._addFightCharacher(roleId, new Laya.Vector3(FightCoordinatePos.pos_enemy3D[i][0], FightCoordinatePos.pos_enemy3D[i][1], FightCoordinatePos.pos_enemy3D[i][2])/*, this._renderQueenNu - renderQueneIdx * 1000*/);
                character.turnTo(45);
                character.camp = CampType.Enemy;
                character.fightPoint = i;
                this.fightCharacterEnemyArr.push(character);
                this._characterFightLayer3D.addChild(character.roleSp3D);

                // character.name = renderQueneIdx + "";
            }
            len = FightCoordinatePos.pos_player3D.length;
            for (let i = 0; i < len; i++) {
                // pt.setTo(FightCoordinatePos.pos_player[i][0] * Laya.stage.clientScaleX, FightCoordinatePos.pos_player[i][1] * Laya.stage.clientScaleY);
                randomIndex = Math.floor(Math.random() * this.roleID.length);
                roleId = this.roleID[randomIndex];
                renderQueneIdx++;
                if (i == 7) {
                    character = this._addFightMainCharacher("zhujue", "6044", "6437", "6578", new Laya.Vector3(FightCoordinatePos.pos_player3D[i][0], FightCoordinatePos.pos_player3D[i][1], FightCoordinatePos.pos_player3D[i][2])/*, this._renderQueenNu - renderQueneIdx*/);
                } else {
                    character = this._addFightCharacher(roleId, new Laya.Vector3(FightCoordinatePos.pos_player3D[i][0], FightCoordinatePos.pos_player3D[i][1], FightCoordinatePos.pos_player3D[i][2])/*, this._renderQueenNu - renderQueneIdx*/);
                }
                character.camp = CampType.Player;
                character.fightPoint = i;
                character.turnTo(-135);
                this.fightCharacterPlayerArr.push(character);
                this._characterFightLayer3D.addChild(character.roleSp3D);
                // character.name = renderQueneIdx + "";
            }
        }

        this._sceneFight.addChild(this.curCamera3D);
        AIFightControl.instance.startup();
    }

    exitFight() {
        this.fightBg.visible = false;
        this._sceneFight.visible = false;
        for (let o of this.characterArr) {
            let script: AIMoveScript = o.getComponentByType(AIMoveScript) as AIMoveScript
            script.enable = true;
            script.resumeFindPath();
        }
        this._sceneHangUp.addChild(this.curCamera3D);

        for (let o of this.fightCharacterEnemyArr) {
            o.clearSelf();
            o = null;
        }
        this.fightCharacterEnemyArr = [];
        for (let oo of this.fightCharacterPlayerArr) {
            oo.clearSelf();
            oo = null;
        }
        this.fightCharacterPlayerArr = [];
        this.bInFight = false;
    }

    orthographicCoordToScreenCoord(convertVec3: Laya.Vector3, outVec3: Laya.Vector3) {
        this.curCamera3D.viewport.project(convertVec3, this.curCamera3D.projectionViewMatrix, outVec3);
        outVec3.x = outVec3.x / Laya.stage.clientScaleX;
        outVec3.y = outVec3.y / Laya.stage.clientScaleY;
    }
    convertScreenCoordToOrthographicCoord(vec32D, vec33D) {
        this.curCamera3D.convertScreenCoordToOrthographicCoord(vec32D, vec33D);
    }
    addMainCharacterAIControl() {
        let agentSprite2D: Laya.Sprite;
        let targetPos = new Laya.Vector3();
        let pt = new Laya.Point();
        let x = 250 + (SceneManager.instance.bgLayer.width - 450) * Math.random();
        let y = 350 + (SceneManager.instance.bgLayer.height - 750) * Math.random();
        pt.setTo(x, y);
        pt = SceneManager.instance.bgLayer.localToGlobal(pt);
        SceneManager.instance.convertScreenCoordToOrthographicCoord(new Laya.Vector3(pt.x, pt.y), targetPos);
        let character = new Character(targetPos);
        character.createCharacter("zhujue", "6044", "6437", "6578");
        character.name = "zhujue";
        SceneManager.instance.characterLayer3D.addChild(character.roleSp3D);
        agentSprite2D = new Laya.Sprite();
        agentSprite2D.pos(pt.x, pt.y);
        agentSprite2D.name = "zhujue";
        SceneManager.instance.bgLayer.addChild(agentSprite2D);
        character.addComponent(AIMoveScript);
        character.pAIMoveScript = character.getComponentByType(AIMoveScript) as AIMoveScript;
        this.characterArr.push(character);
        character.data = new CharacterModel();
        character.agentSprite2D = agentSprite2D;
        this.camera2D.focusTarget = character.agentSprite2D;
        return character;
    }
    addMainCharacterClickStage(caller, completeFunc: Function) {
        let character = new Character();
        character.createCharacter("zhujue", "60441", "6437", null);
        SceneManager.instance.characterLayer3D.addChild(character.roleSp3D);
        character.on(Character.LOAD_COMPLETE, caller, completeFunc);

        return character;
    }
    addCharacter(roleID, roleName, agentPos) {
        let agentSprite2D: Laya.Sprite;
        let targetPos = new Laya.Vector3();
        let pt = new Laya.Point();
        pt = SceneManager.instance.bgLayer.localToGlobal(agentPos);
        SceneManager.instance.convertScreenCoordToOrthographicCoord(new Laya.Vector3(pt.x, pt.y), targetPos);
        let character = new Character(targetPos);
        character.addComponent(AIMoveScript);
        character.pAIMoveScript = character.getComponentByType(AIMoveScript) as AIMoveScript;
        agentSprite2D = new Laya.Sprite();
        agentSprite2D.pos(agentPos.x, agentPos.y);
        agentSprite2D.name = roleName + "";
        SceneManager.instance.bgLayer.addChild(agentSprite2D);
        character.data = new CharacterModel();
        character.name = roleID + "";
        character.agentSprite2D = agentSprite2D;
        SceneManager.instance.characterLayer3D.addChild(character.roleSp3D);
        character.createCharacter(roleID, null, null, null);
        this.characterArr.push(character);
        return character;
    }
    initScene3D() {
        this._sceneHangUp = new Laya.Scene();
        Laya.stage.addChild(this._sceneHangUp);
        this.curCamera3D = new Laya.Camera(0, 0.1, 300);
        this._sceneHangUp.addChild(this.curCamera3D);

        this.characterLayer3D = new Laya.Sprite3D();
        this._sceneHangUp.addChild(this.characterLayer3D);
        this._sceneHangUp.mouseEnabled = false;
        this._sceneHangUp.mouseThrough = true;
        // this._sceneHangUp.ambientColor = new Laya.Vector3(1.2, 1.2, 1.2);
        // this.curCamera3D.addComponent(CameraMoveScript);
        this.curCamera3D.transform.translate(new Laya.Vector3(0, 0, 150));
        this.curCamera3D.clearColor = null;
        this.curCamera3D.orthographic = true;
        //正交投影垂直矩阵尺寸
        this.curCamera3D.orthographicVerticalSize = 25;
        this.curCamera3D.clearFlag = Laya.BaseCamera.CLEARFLAG_DEPTHONLY;
        this.curCamera3D.viewport = new Laya.Viewport(GameModel.viewportX, GameModel.viewportY, GameModel.viewportW * Laya.stage.clientScaleX, GameModel.viewportH * Laya.stage.clientScaleY);
        Laya.stage.on(Laya.Event.RESIZE, this, this._resetCamera3DViewPort);
        var angle = new Laya.Vector3(30 * Math.PI / 180);
        //调整3d角色层角度
        this.characterLayer3D.transform.rotationEuler = angle;
        this._sceneHangUp.addChild(SceneManager.instance.characterLayer3D);

        //this.m_cameraForward = this._camera.forward;
        //灯光设置（数值是参照unity里边的正交投影场景设置）
        // var directionLight = new Laya.DirectionLight();
        // this._scene.addChild(directionLight);
        // // directionLight.color = new Laya.Vector3(.5, .5, .5);
        // directionLight.transform.position = new Laya.Vector3(0, 10, 0);
        // directionLight.transform.rotationEuler = new Laya.Vector3(10, 0, 0);
        // directionLight.transform.translate(new Laya.Vector3(.196, 2.459, 1.182));
        // directionLight.transform.rotation = new Laya.Quaternion(.182, .289, .939, .022);
        // // directionLight.intensity = 1;
        // //设置灯光方向
        // var mat = directionLight.transform.worldMatrix;
        // mat.setForward(new Laya.Vector3(0, -1, -1));
        // directionLight.transform.worldMatrix = mat;
        this._initFightScene3D();
    }
    initScene2D(img: Laya.Image) {
        SceneManager.instance.bgLayer.addChild(img);
        SceneManager.instance.bgLayer.width = img.getBounds().width;
        SceneManager.instance.bgLayer.height = img.getBounds().height;
        SceneManager.instance.camera2D.setBoundary(SceneManager.instance.bgLayer);
        SceneManager.instance.camera2D.start();
        let label: Laya.Label = new Laya.Label("2D场景3D角色演示");
        label.fontSize = 30;
        label.color = "#ffffff";
        label.strokeColor = "#000000";
        label.bold = true;
        label.x = Laya.stage.designWidth - label.width >> 1;
        label.y = 5;
        Laya.stage.addChild(label);
        Laya.timer.frameLoop(1, this, this._update);
    }
    private _resetCamera3DViewPort() {
        this.curCamera3D.viewport = new Laya.Viewport(GameModel.viewportX, GameModel.viewportY, GameModel.viewportW * Laya.stage.clientScaleX, GameModel.viewportH * Laya.stage.clientScaleY);
        LoaderManager.instance.resetTxtPos();
    }
    private _initLayer() {
        this._stageContainer = new Laya.Sprite();
        Laya.stage.addChild(this._stageContainer);
        this.bgLayer = new Laya.Sprite();
        this.bgLayer.name = "background";

        this._stageContainer.addChild(this.bgLayer);
        this.characterLayer2D = new Laya.Sprite();
        this._stageContainer.addChild(this.characterLayer2D);

        this.fightBg = new Laya.Sprite();
        this.fightBg.graphics.drawRect(0, 0, Laya.stage.designWidth, Laya.stage.designHeight, "#000000");
        this.fightBg.alpha = 0.5;
        Laya.stage.addChild(this.fightBg);
        this.fightBg.visible = false;

        this.progressLayer = new Laya.Sprite();
        this.progressLayer.mouseEnabled = false;
        Laya.stage.addChild(this.progressLayer);

        this._initFightScene3D();

        var angle = new Laya.Vector3(30 * Math.PI / 180);

        this.effectLayer2D = new Laya.Sprite();
        Laya.stage.addChild(this.effectLayer2D);

    }
    private _initCamera2d() {
        let layerInfo = [
            { name: 'background', instance: this.bgLayer, ratio: .2 }
        ];
        this._curCamera2D = new Camera2D(Laya.stage, this._stageContainer, new Laya.Point(Laya.stage.designWidth * .5, Laya.stage.designHeight * .5), layerInfo);
    }
    private _update() {
        SceneManager.instance.camera2D.update();
    }

    private _initFightScene3D() {
        if (!this._sceneFight) {
            this._sceneFight = new Laya.Scene();
            Laya.stage.addChild(this._sceneFight);
            this._characterFightLayer3D = new Laya.Sprite3D();
            var angle = new Laya.Vector3(30 * Math.PI / 180);
            this._characterFightLayer3D.transform.rotationEuler = angle;
            this._sceneFight.addChild(this._characterFightLayer3D);
        }
    }
    private _addFightCharacher(roleID, pos: Laya.Vector3, renderQueue?: number) {
        // let targetPos = new Laya.Vector3();
        // this.convertScreenCoordToOrthographicCoord(new Laya.Vector3(pos.x, pos.y), targetPos);
        let character = new Character(pos, renderQueue);
        character.createCharacter(roleID, null, null, null);
        character.name = roleID + "";
        character.data = new CharacterModel();
        // this._characterFightLayer3D.addChild(character.roleSp3D);
        // (character.roleSp3D as Laya.MeshSprite3D).meshRender.material.renderQueue = this.renderQueneNu;
        character.pAIFightScript = character.addComponent(AIFightScript) as AIFightScript;
        return character;
    }
    private _addFightMainCharacher(roleID, horseID, wingID, weaponID, pos: Laya.Vector3, renderQueue?: number) {
        // let targetPos = new Laya.Vector3();
        // this.convertScreenCoordToOrthographicCoord(new Laya.Vector3(pos.x, pos.y), targetPos);
        let character = new Character(pos, renderQueue);
        character.createCharacter(roleID, horseID, wingID, weaponID);
        character.name = roleID + "";
        character.data = new CharacterModel();
        // this._characterFightLayer3D.addChild(character.roleSp3D);
        // (character.roleSp3D as Laya.MeshSprite3D).meshRender.material.renderQueue = this.renderQueneNu;
        character.pAIFightScript = character.addComponent(AIFightScript) as AIFightScript;
        return character;
    }
}
