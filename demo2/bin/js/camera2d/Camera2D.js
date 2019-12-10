var Camera2D = /** @class */ (function () {
    function Camera2D(aStage, aStageContainer, aFocusTarget, aLayersInfo, aAutoStart) {
        if (aAutoStart === void 0) { aAutoStart = false; }
        var t = this;
        t._stage = aStage;
        t._stageContainer = aStageContainer;
        t._layersInfo = new Laya.Dictionary();
        t.focusTarget = aFocusTarget;
        t._focusPosition = new Laya.Point();
        t._focusTracker = new Laya.Point();
        t._focusTracker.x = t._focusTarget.x;
        t._focusTracker.y = t._focusTarget.y;
        t._focusCurrentLoc = new Laya.Point(t._focusTracker.x, t._focusTracker.y);
        t._focusLastLoc = new Laya.Point(t._focusTracker.x, t._focusTracker.y);
        for (var _i = 0, aLayersInfo_1 = aLayersInfo; _i < aLayersInfo_1.length; _i++) {
            var obj = aLayersInfo_1[_i];
            obj.ox = obj.instance.x;
            obj.oy = obj.instance.y;
            t._layersInfo[obj.name] = obj;
        }
        t._targetLastX = t._targetCurrentX = t.focusTarget.x;
        t._targetLastY = t._targetCurrentY = t.focusTarget.y;
        t.trackStep = 10;
        t.swapStep = 10;
        t._step = t.trackStep;
        t._tempStep = t.trackStep;
        t.setFocusPosition(t._stage.designWidth * .5, t._stage.designHeight * .5);
        t.setBoundary();
        if (aAutoStart)
            t.start();
        else
            t.pause();
    }
    Object.defineProperty(Camera2D.prototype, "focusTarget", {
        get: function () {
            return this._focusTarget;
        },
        set: function (aFocusTarget) {
            var t = this;
            t._focusTarget = aFocusTarget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera2D.prototype, "focusDist", {
        get: function () {
            var t = this;
            return { distX: t._focusCurrentLoc.x - t._focusLastLoc.x, distY: t._focusCurrentLoc.y - t._focusLastLoc.y };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera2D.prototype, "globalTrackerLoc", {
        get: function () {
            var loc = new Laya.Point();
            var t = this;
            if (t._focusTarget instanceof Laya.Point)
                loc = t._stageContainer.localToGlobal(t._focusTracker, true);
            else if (t._focusTarget instanceof Laya.Sprite)
                loc = t._focusTarget.parent.localToGlobal(t._focusTracker, true);
            return loc;
        },
        enumerable: true,
        configurable: true
    });
    Camera2D.prototype.getLayerByName = function (aName) {
        return this._layersInfo[aName].instance;
    };
    Camera2D.prototype.start = function () {
        this._switch = true;
    };
    Camera2D.prototype.pause = function () {
        this._switch = false;
    };
    Camera2D.prototype.destroy = function () {
        var t = this;
        t._stage = null;
        t._stageContainer = null;
        t._boundaryLayer = null;
        t._layersInfo = null;
        t.focusTarget = null;
    };
    Camera2D.prototype.setFocusPosition = function (aX, aY) {
        this._focusPosition.x = aX;
        this._focusPosition.y = aY;
        // let sp = new Laya.Sprite();
        // sp.graphics.drawCircle(aX, aY, 5, "#ff0000");
        // Laya.stage.addChild(sp);
    };
    Camera2D.prototype.setBoundary = function (aLayer) {
        if (aLayer === void 0) { aLayer = null; }
        this._boundaryLayer = aLayer;
    };
    Camera2D.prototype.jumpToFocus = function (aFocusTarget) {
        if (aFocusTarget === void 0) { aFocusTarget = null; }
        var t = this;
        if (aFocusTarget == null)
            aFocusTarget = t._focusTarget;
        t._focusCurrentLoc.x = t._focusLastLoc.x = t._focusTracker.x = t._focusTarget.x;
        t._focusCurrentLoc.y = t._focusLastLoc.y = t._focusTracker.y = t._focusTarget.y;
        t.swapFocus(aFocusTarget, 1);
    };
    Camera2D.prototype.swapFocus = function (aFocusTarget, aSwapStep, aZoom, aZoomFactor, aZoomStep) {
        if (aSwapStep === void 0) { aSwapStep = 10; }
        if (aZoom === void 0) { aZoom = false; }
        if (aZoomFactor === void 0) { aZoomFactor = 1; }
        if (aZoomStep === void 0) { aZoomStep = 10; }
        var t = this;
        t._focusTarget = aFocusTarget;
        t.swapStep = Math.max(1, aSwapStep);
        t._tempStep = t.trackStep;
        t._step = t.swapStep;
        t.isSwaping = true;
        if (t.enableCallBack)
            t._stage.event(Camera2DEvent.SWAP_STARTED);
    };
    Camera2D.prototype.update = function () {
        var t = this;
        if (!t._switch)
            return undefined;
        if (t._focusTarget == null)
            return undefined;
        if (t._focusTarget instanceof Laya.Sprite && t._focusTarget.parent == null)
            return undefined;
        if (Math.round((t._focusTarget.x - t._focusTracker.x) * (t._focusTarget.y - t._focusTracker.y)) == 0) {
            t._tempStep = t.trackStep;
            t._step = t._tempStep;
            t._focusTracker.x = t._focusTarget.x;
            t._focusTracker.y = t._focusTarget.y;
            if (t.isSwaping) {
                t.isSwaping = false;
                if (t.enableCallBack)
                    t._stage.event(Camera2DEvent.SWAP_FINISHED);
            }
            t.isFocused = true;
        }
        else {
            t.isFocused = false;
        }
        t._focusTracker.x += (t._focusTarget.x - t._focusTracker.x) / t._step;
        t._focusTracker.y += (t._focusTarget.y - t._focusTracker.y) / t._step;
        t._focusLastLoc.x = t._focusCurrentLoc.x;
        t._focusLastLoc.y = t._focusCurrentLoc.y;
        t._focusCurrentLoc.x = t._focusTracker.x;
        t._focusCurrentLoc.y = t._focusTracker.y;
        t._targetLastX = t._targetCurrentX;
        t._targetLastY = t._targetCurrentY;
        t._targetCurrentX = t.focusTarget.x;
        t._targetCurrentY = t.focusTarget.y;
        t.positionStageContainer();
        t.testBounds();
    };
    Camera2D.prototype.testBounds = function () {
        var t = this;
        var testResult = { top: false, bottom: false, left: false, right: false };
        if (t._boundaryLayer == null)
            return testResult;
        var stageBoundaryUpperLeft = t._boundaryLayer.parent.localToGlobal(new Laya.Point(t._boundaryLayer.x, t._boundaryLayer.y));
        var stageBoundaryLowerRight = t._boundaryLayer.parent.localToGlobal(new Laya.Point(t._boundaryLayer.x + t._boundaryLayer.width, t._boundaryLayer.y + t._boundaryLayer.height));
        var boundLeft = stageBoundaryUpperLeft.x;
        var boundTop = stageBoundaryUpperLeft.y;
        var boundRight = stageBoundaryLowerRight.x;
        var boundBottom = stageBoundaryLowerRight.y;
        if (boundLeft > 0) {
            if (!t.ignoreLeftBound) {
                t._stageContainer.x += 0 - boundLeft;
            }
            if (t.enableCallBack) {
                Camera2DEvent.boundary = 'left';
                t._stage.event(Camera2DEvent.boundary);
            }
            testResult.left = true;
        }
        if (boundRight < t._stage.designWidth) {
            if (!t.ignoreRightBound) {
                t._stageContainer.x += t._stage.designWidth - boundRight;
            }
            if (t.enableCallBack) {
                Camera2DEvent.boundary = 'right';
                t._stage.event(Camera2DEvent.boundary);
            }
            testResult.right = true;
        }
        if (boundTop > 0) {
            if (!t.ignoreTopBound) {
                t._stageContainer.y += 0 - boundTop;
            }
            if (t.enableCallBack) {
                Camera2DEvent.boundary = 'top';
                t._stage.event(Camera2DEvent.boundary);
            }
            testResult.top = true;
        }
        if (boundBottom < t._stage.designHeight) {
            if (!t.ignoreBottomBound) {
                t._stageContainer.y += t._stage.designHeight - boundBottom;
            }
            if (t.enableCallBack) {
                Camera2DEvent.boundary = 'bottom';
                t._stage.event(Camera2DEvent.boundary);
            }
            testResult.bottom = true;
        }
        return testResult;
    };
    Camera2D.prototype.positionStageContainer = function () {
        var t = this;
        t._stageContainer.x += t._focusPosition.x - t.globalTrackerLoc.x;
        t._stageContainer.y += t._focusPosition.y - t.globalTrackerLoc.y;
    };
    return Camera2D;
}());
//# sourceMappingURL=Camera2D.js.map