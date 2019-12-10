class Camera2D {
    private _stage: Laya.Stage;
    private _stageContainer: Laya.Sprite;
    private _focusPosition: Laya.Point;
    private _focusTracker: Laya.Point;
    private _focusCurrentLoc: Laya.Point;
    private _focusLastLoc: Laya.Point;
    private _focusDistX: number;
    private _focusDistY: number;
    private _focusTarget: any;
    private _layersInfo: Laya.Dictionary; // [{name:xx,instance:xx,ratio:xx}]
    private _boundaryLayer: Laya.Sprite;
    private _switch: boolean;

    private _targetLastX: number;
    private _targetLastY: number;
    private _targetCurrentX: number;
    private _targetCurrentY: number;

    public trackStep: number;
    public swapStep: number;

    private _tempStep: number;
    private _step: number;

    public ignoreLeftBound: boolean;
    public ignoreRightBound: boolean;
    public ignoreTopBound: boolean;
    public ignoreBottomBound: boolean;

    public isFocused: boolean;
    public isSwaping: boolean;

    public enableCallBack: boolean;

    public constructor(aStage: Laya.Stage, aStageContainer: Laya.Sprite, aFocusTarget: any, aLayersInfo: Array<any>, aAutoStart: boolean = false) {
        let t = this;
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

        for (let obj of aLayersInfo) {
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

        if (aAutoStart) t.start();
        else t.pause();
    }

    public set focusTarget(aFocusTarget: any) {
        let t = this;
        t._focusTarget = aFocusTarget;
    }

    public get focusTarget(): any {
        return this._focusTarget;
    }

    private get focusDist(): any {
        let t = this;
        return { distX: t._focusCurrentLoc.x - t._focusLastLoc.x, distY: t._focusCurrentLoc.y - t._focusLastLoc.y };
    }

    private get globalTrackerLoc(): Laya.Point {
        let loc: Laya.Point = new Laya.Point();
        let t = this;
        if (t._focusTarget instanceof Laya.Point) loc = t._stageContainer.localToGlobal(t._focusTracker, true);
        else if (t._focusTarget instanceof Laya.Sprite) loc = (t._focusTarget.parent as Laya.Sprite).localToGlobal(t._focusTracker, true);

        return loc;
    }

    public getLayerByName(aName: string): Laya.Sprite {
        return this._layersInfo[aName].instance;
    }

    public start() {
        this._switch = true;
    }

    public pause(): void {
        this._switch = false;
    }

    public destroy() {
        let t = this;
        t._stage = null;
        t._stageContainer = null;
        t._boundaryLayer = null;
        t._layersInfo = null;
        t.focusTarget = null;
    }

    public setFocusPosition(aX: number, aY: number) {
        this._focusPosition.x = aX;
        this._focusPosition.y = aY;
        // let sp = new Laya.Sprite();
        // sp.graphics.drawCircle(aX, aY, 5, "#ff0000");
        // Laya.stage.addChild(sp);
    }

    public setBoundary(aLayer: Laya.Sprite = null) {
        this._boundaryLayer = aLayer;
    }

    public jumpToFocus(aFocusTarget: any = null) {
        let t = this;
        if (aFocusTarget == null) aFocusTarget = t._focusTarget;
        t._focusCurrentLoc.x = t._focusLastLoc.x = t._focusTracker.x = t._focusTarget.x;
        t._focusCurrentLoc.y = t._focusLastLoc.y = t._focusTracker.y = t._focusTarget.y;
        t.swapFocus(aFocusTarget, 1);
    }

    public swapFocus(aFocusTarget: any, aSwapStep: number = 10, aZoom: boolean = false, aZoomFactor: number = 1, aZoomStep: number = 10): void {
        let t = this;
        t._focusTarget = aFocusTarget;

        t.swapStep = Math.max(1, aSwapStep);
        t._tempStep = t.trackStep;
        t._step = t.swapStep;

        t.isSwaping = true;
        if (t.enableCallBack) t._stage.event(Camera2DEvent.SWAP_STARTED);
    }

    public update() {
        let t = this;
        if (!t._switch) return undefined;
        if (t._focusTarget == null) return undefined;
        if (t._focusTarget instanceof Laya.Sprite && t._focusTarget.parent == null) return undefined;

        if (Math.round((t._focusTarget.x - t._focusTracker.x) * (t._focusTarget.y - t._focusTracker.y)) == 0) {
            t._tempStep = t.trackStep;
            t._step = t._tempStep;

            t._focusTracker.x = t._focusTarget.x;
            t._focusTracker.y = t._focusTarget.y;

            if (t.isSwaping) {
                t.isSwaping = false;
                if (t.enableCallBack) t._stage.event(Camera2DEvent.SWAP_FINISHED);
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
    }

    private testBounds(): any {
        let t = this;
        var testResult = { top: false, bottom: false, left: false, right: false };

        if (t._boundaryLayer == null) return testResult;

        var stageBoundaryUpperLeft: Laya.Point = (t._boundaryLayer.parent as Laya.Sprite).localToGlobal(new Laya.Point(t._boundaryLayer.x, t._boundaryLayer.y));
        var stageBoundaryLowerRight: Laya.Point = (t._boundaryLayer.parent as Laya.Sprite).localToGlobal(new Laya.Point(t._boundaryLayer.x + t._boundaryLayer.width, t._boundaryLayer.y + t._boundaryLayer.height));
        var boundLeft: number = stageBoundaryUpperLeft.x;
        var boundTop: number = stageBoundaryUpperLeft.y;
        var boundRight: number = stageBoundaryLowerRight.x;
        var boundBottom: number = stageBoundaryLowerRight.y;

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
    }

    private positionStageContainer(): void {
        let t = this;
        t._stageContainer.x += t._focusPosition.x - t.globalTrackerLoc.x;
        t._stageContainer.y += t._focusPosition.y - t.globalTrackerLoc.y;
    }
}