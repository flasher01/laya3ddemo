var SceneManager = /** @class */ (function () {
    function SceneManager() {
        this._renderQueenNu = 5000;
        this.characterArr = new Array();
        this.fightCharacterEnemyArr = new Array();
        this.fightCharacterPlayerArr = new Array();
        this.bInFight = false;
        this.roleID = [6105, 6111, 6600, 6609, 6610, 6635, 6690, 6697, 6701, 6709, 6714, 6724, 8204, "longnv"];
        this._initLayer();
        this._initCamera2d();
    }
    Object.defineProperty(SceneManager, "instance", {
        get: function () {
            return this._ins || (this._ins = new SceneManager());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManager.prototype, "characterFightLayer3D", {
        get: function () {
            return this._characterFightLayer3D;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManager.prototype, "camera2D", {
        get: function () {
            return this._curCamera2D;
        },
        enumerable: true,
        configurable: true
    });
    // private roleID = [6714, 6714, 6714, 6714, 6714, 6714, 6635, 6635, 6635, 6635, 6635, 6635, 6714, 6714];
    SceneManager.prototype.enterFight = function () {
        this.bInFight = true;
        for (var _i = 0, _a = this.characterArr; _i < _a.length; _i++) {
            var o = _a[_i];
            var script = o.getComponentByType(AIMoveScript);
            script.enable = false;
            script.stopFindPath();
        }
        // if (this._sceneHangUp)
        //     this._sceneHangUp.visible = false;
        this._sceneFight.visible = true;
        this.fightBg.visible = true;
        this._initFightScene3D();
        if (this.fightCharacterEnemyArr.length == 0) {
            var len = FightCoordinatePos.pos_enemy3D.length;
            var pt = new Laya.Point();
            var roleIDLen = this.roleID.length;
            var roleId = void 0;
            var randomIndex = void 0;
            var character = void 0;
            var renderQueneIdx = 0;
            for (var i = 0; i < len; i++) {
                // pt.setTo(FightCoordinatePos.pos_enemy[i][0] * Laya.stage.clientScaleX, FightCoordinatePos.pos_enemy[i][1] * Laya.stage.clientScaleY);
                randomIndex = Math.floor(Math.random() * this.roleID.length);
                roleId = this.roleID[randomIndex];
                renderQueneIdx++;
                character = this._addFightCharacher(roleId, new Laya.Vector3(FightCoordinatePos.pos_enemy3D[i][0], FightCoordinatePos.pos_enemy3D[i][1], FightCoordinatePos.pos_enemy3D[i][2]) /*, this._renderQueenNu - renderQueneIdx * 1000*/);
                character.turnTo(45);
                character.camp = CampType.Enemy;
                character.fightPoint = i;
                this.fightCharacterEnemyArr.push(character);
                this._characterFightLayer3D.addChild(character.roleSp3D);
                // character.name = renderQueneIdx + "";
            }
            len = FightCoordinatePos.pos_player3D.length;
            for (var i = 0; i < len; i++) {
                // pt.setTo(FightCoordinatePos.pos_player[i][0] * Laya.stage.clientScaleX, FightCoordinatePos.pos_player[i][1] * Laya.stage.clientScaleY);
                randomIndex = Math.floor(Math.random() * this.roleID.length);
                roleId = this.roleID[randomIndex];
                renderQueneIdx++;
                if (i == 7) {
                    character = this._addFightMainCharacher("zhujue", "6044", "6437", "6578", new Laya.Vector3(FightCoordinatePos.pos_player3D[i][0], FightCoordinatePos.pos_player3D[i][1], FightCoordinatePos.pos_player3D[i][2]) /*, this._renderQueenNu - renderQueneIdx*/);
                }
                else {
                    character = this._addFightCharacher(roleId, new Laya.Vector3(FightCoordinatePos.pos_player3D[i][0], FightCoordinatePos.pos_player3D[i][1], FightCoordinatePos.pos_player3D[i][2]) /*, this._renderQueenNu - renderQueneIdx*/);
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
    };
    SceneManager.prototype.exitFight = function () {
        this.fightBg.visible = false;
        this._sceneFight.visible = false;
        for (var _i = 0, _a = this.characterArr; _i < _a.length; _i++) {
            var o = _a[_i];
            var script = o.getComponentByType(AIMoveScript);
            script.enable = true;
            script.resumeFindPath();
        }
        this._sceneHangUp.addChild(this.curCamera3D);
        for (var _b = 0, _c = this.fightCharacterEnemyArr; _b < _c.length; _b++) {
            var o = _c[_b];
            o.clearSelf();
            o = null;
        }
        this.fightCharacterEnemyArr = [];
        for (var _d = 0, _e = this.fightCharacterPlayerArr; _d < _e.length; _d++) {
            var oo = _e[_d];
            oo.clearSelf();
            oo = null;
        }
        this.fightCharacterPlayerArr = [];
        this.bInFight = false;
    };
    SceneManager.prototype.orthographicCoordToScreenCoord = function (convertVec3, outVec3) {
        this.curCamera3D.viewport.project(convertVec3, this.curCamera3D.projectionViewMatrix, outVec3);
        outVec3.x = outVec3.x / Laya.stage.clientScaleX;
        outVec3.y = outVec3.y / Laya.stage.clientScaleY;
    };
    SceneManager.prototype.convertScreenCoordToOrthographicCoord = function (vec32D, vec33D) {
        this.curCamera3D.convertScreenCoordToOrthographicCoord(vec32D, vec33D);
    };
    SceneManager.prototype.addMainCharacterAIControl = function () {
        var agentSprite2D;
        var targetPos = new Laya.Vector3();
        var pt = new Laya.Point();
        var x = 250 + (SceneManager.instance.bgLayer.width - 450) * Math.random();
        var y = 350 + (SceneManager.instance.bgLayer.height - 750) * Math.random();
        pt.setTo(x, y);
        pt = SceneManager.instance.bgLayer.localToGlobal(pt);
        SceneManager.instance.convertScreenCoordToOrthographicCoord(new Laya.Vector3(pt.x, pt.y), targetPos);
        var character = new Character(targetPos);
        character.createCharacter("zhujue", "6044", "6437", "6578");
        character.name = "zhujue";
        SceneManager.instance.characterLayer3D.addChild(character.roleSp3D);
        agentSprite2D = new Laya.Sprite();
        agentSprite2D.pos(pt.x, pt.y);
        agentSprite2D.name = "zhujue";
        SceneManager.instance.bgLayer.addChild(agentSprite2D);
        character.addComponent(AIMoveScript);
        character.pAIMoveScript = character.getComponentByType(AIMoveScript);
        this.characterArr.push(character);
        character.data = new CharacterModel();
        character.agentSprite2D = agentSprite2D;
        this.camera2D.focusTarget = character.agentSprite2D;
        return character;
    };
    SceneManager.prototype.addMainCharacterClickStage = function (caller, completeFunc) {
        var character = new Character();
        character.createCharacter("zhujue", "60441", "6437", null);
        SceneManager.instance.characterLayer3D.addChild(character.roleSp3D);
        character.on(Character.LOAD_COMPLETE, caller, completeFunc);
        return character;
    };
    SceneManager.prototype.addCharacter = function (roleID, roleName, agentPos) {
        var agentSprite2D;
        var targetPos = new Laya.Vector3();
        var pt = new Laya.Point();
        pt = SceneManager.instance.bgLayer.localToGlobal(agentPos);
        SceneManager.instance.convertScreenCoordToOrthographicCoord(new Laya.Vector3(pt.x, pt.y), targetPos);
        var character = new Character(targetPos);
        character.addComponent(AIMoveScript);
        character.pAIMoveScript = character.getComponentByType(AIMoveScript);
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
    };
    SceneManager.prototype.initScene3D = function () {
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
    };
    SceneManager.prototype.initScene2D = function (img) {
        SceneManager.instance.bgLayer.addChild(img);
        SceneManager.instance.bgLayer.width = img.getBounds().width;
        SceneManager.instance.bgLayer.height = img.getBounds().height;
        SceneManager.instance.camera2D.setBoundary(SceneManager.instance.bgLayer);
        SceneManager.instance.camera2D.start();
        var label = new Laya.Label("2D场景3D角色演示");
        label.fontSize = 30;
        label.color = "#ffffff";
        label.strokeColor = "#000000";
        label.bold = true;
        label.x = Laya.stage.designWidth - label.width >> 1;
        label.y = 5;
        Laya.stage.addChild(label);
        Laya.timer.frameLoop(1, this, this._update);
    };
    SceneManager.prototype._resetCamera3DViewPort = function () {
        this.curCamera3D.viewport = new Laya.Viewport(GameModel.viewportX, GameModel.viewportY, GameModel.viewportW * Laya.stage.clientScaleX, GameModel.viewportH * Laya.stage.clientScaleY);
        LoaderManager.instance.resetTxtPos();
    };
    SceneManager.prototype._initLayer = function () {
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
    };
    SceneManager.prototype._initCamera2d = function () {
        var layerInfo = [
            { name: 'background', instance: this.bgLayer, ratio: .2 }
        ];
        this._curCamera2D = new Camera2D(Laya.stage, this._stageContainer, new Laya.Point(Laya.stage.designWidth * .5, Laya.stage.designHeight * .5), layerInfo);
    };
    SceneManager.prototype._update = function () {
        SceneManager.instance.camera2D.update();
    };
    SceneManager.prototype._initFightScene3D = function () {
        if (!this._sceneFight) {
            this._sceneFight = new Laya.Scene();
            Laya.stage.addChild(this._sceneFight);
            this._characterFightLayer3D = new Laya.Sprite3D();
            var angle = new Laya.Vector3(30 * Math.PI / 180);
            this._characterFightLayer3D.transform.rotationEuler = angle;
            this._sceneFight.addChild(this._characterFightLayer3D);
        }
    };
    SceneManager.prototype._addFightCharacher = function (roleID, pos, renderQueue) {
        // let targetPos = new Laya.Vector3();
        // this.convertScreenCoordToOrthographicCoord(new Laya.Vector3(pos.x, pos.y), targetPos);
        var character = new Character(pos, renderQueue);
        character.createCharacter(roleID, null, null, null);
        character.name = roleID + "";
        character.data = new CharacterModel();
        // this._characterFightLayer3D.addChild(character.roleSp3D);
        // (character.roleSp3D as Laya.MeshSprite3D).meshRender.material.renderQueue = this.renderQueneNu;
        character.pAIFightScript = character.addComponent(AIFightScript);
        return character;
    };
    SceneManager.prototype._addFightMainCharacher = function (roleID, horseID, wingID, weaponID, pos, renderQueue) {
        // let targetPos = new Laya.Vector3();
        // this.convertScreenCoordToOrthographicCoord(new Laya.Vector3(pos.x, pos.y), targetPos);
        var character = new Character(pos, renderQueue);
        character.createCharacter(roleID, horseID, wingID, weaponID);
        character.name = roleID + "";
        character.data = new CharacterModel();
        // this._characterFightLayer3D.addChild(character.roleSp3D);
        // (character.roleSp3D as Laya.MeshSprite3D).meshRender.material.renderQueue = this.renderQueneNu;
        character.pAIFightScript = character.addComponent(AIFightScript);
        return character;
    };
    return SceneManager;
}());
//# sourceMappingURL=SceneManager.js.map