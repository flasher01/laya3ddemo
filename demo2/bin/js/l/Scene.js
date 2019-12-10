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
var Scene = /** @class */ (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super.call(this) || this;
        var e = _this;
        e.m_sceneBg = new SceneBg();
        e.m_sceneBg.setViewSize(GameModel.ViewWH, GameModel.ViewTH);
        e.addChild(e.m_sceneBg);
        return _this;
    }
    Object.defineProperty(Scene.prototype, "sceneId", {
        get: function () {
            return this.m_mapVO ? this.m_mapVO.id : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "sceneName", {
        get: function () {
            return this.m_sceneName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "sceneWidth", {
        get: function () {
            return this.m_sceneWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "sceneHeight", {
        get: function () {
            return this.m_sceneHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Scene.prototype, "sceneBgVO", {
        get: function () {
            return this.m_sceneBgVO;
        },
        enumerable: true,
        configurable: true
    });
    Scene.prototype.validateSize = function () {
        var t = GameModel.ViewWH, e = GameModel.ViewTH;
        this.m_sceneBg.setViewSize(t, e), this.m_backBg && this.m_backBg.setViewSize(t, e), this.m_moveBg && this.m_moveBg.setViewSize(t, e), this.update();
    };
    Scene.prototype.change = function (t) {
        console.log("Scene change()"), this.m_mapVO != t ? (this.m_mapVO ? (this.m_mapVO = t, SceneManager.ins.destroy(), this.destroy()) : this.m_mapVO = t, this.prepareForChange()) : (SceneManager.ins.clearObject(), this.dis(e.READLY));
    };
    Scene.prototype.update = function (t) {
        void 0 === t && (t = !1), this.m_sceneBg.update(t), this.m_backBg && this.m_backBg.update(t), this.m_moveBg && this.m_moveBg.update(t);
    };
    Scene.prototype.clear = function (t) {
        void 0 === t && (t = !0), this.m_sceneBg.clear(t), this.m_backBg && this.m_backBg.clear(t), this.m_moveBg && this.m_moveBg.clear(t);
    };
    Scene.prototype.destroy = function () {
        this.m_sceneBg.destroy(), this.m_backBg && (this.m_backBg.destroy(), this.m_backBg.parent && this.m_backBg.parent.removeChild(this.m_backBg), this.m_backBg = null), this.m_moveBg && (this.m_moveBg.destroy(), this.m_moveBg.parent && this.m_moveBg.parent.removeChild(this.m_moveBg), this.m_moveBg = null), PathManager.clear(), this.clear(!1), CacheResUtils.clearCache(!1);
    };
    Scene.prototype.prepareForChange = function () {
        console.log("Scene prepareForChange()  mapVO.resource=" + this.m_mapVO.resource), this.m_sceneBgVO = MapsDB.getMapData(Number(this.m_mapVO.resource)), this.m_sceneName = this.m_mapVO.name, this.m_sceneWidth = this.m_sceneBgVO.mapWidth, this.m_sceneHeight = this.m_sceneBgVO.mapHeight, PathManager.initSceneData(this.m_sceneBgVO), this.m_sceneBgVO.moveWidth > 0 && this.m_sceneBgVO.moveHeight > 0 ? (this.m_moveBg || (this.m_moveBg = new SceneMoveBg), this.m_moveBg.parent || this.addChildAt(this.m_sceneBg, 0), this.m_moveBg.setViewSize(GameModel.ViewWH, GameModel.ViewTH), this.m_moveBg.initMapData(3, this.m_sceneBgVO)) : this.m_moveBg && (this.m_moveBg.destroy(), this.m_moveBg.parent && this.m_moveBg.parent.removeChild(this.m_moveBg), this.m_moveBg = null), this.m_sceneBgVO.backWidth > 0 && this.m_sceneBgVO.backHeight > 0 ? (this.m_backBg || (this.m_backBg = new SceneBg), this.m_backBg.parent || this.addChildAt(this.m_backBg, 0), this.m_backBg.setViewSize(GameModel.ViewWH, GameModel.ViewTH), this.m_backBg.initMapData(2, this.m_sceneBgVO)) : this.m_backBg && (this.m_backBg.destroy(), this.m_backBg.parent && this.m_backBg.parent.removeChild(this.m_backBg), this.m_backBg = null), this.m_sceneBg.initMapData(1, this.m_sceneBgVO), this.dis(e.READLY);
    };
    Scene.READLY = "readly";
    return Scene;
}(DispatcherContainer));
//# sourceMappingURL=Scene.js.map