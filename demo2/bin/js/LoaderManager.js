var LoaderManager = /** @class */ (function () {
    function LoaderManager() {
        this._init();
    }
    Object.defineProperty(LoaderManager, "instance", {
        get: function () {
            return this._instance || (this._instance = new LoaderManager());
        },
        enumerable: true,
        configurable: true
    });
    LoaderManager.prototype.resetTxtPos = function () {
        this._setTxtPos();
    };
    LoaderManager.prototype.loadSprite3D = function (urlArr, caller, loadComplete, loadTip) {
        if (loadTip === void 0) { loadTip = "正在加载"; }
        this._setTxtShow(loadTip);
        Laya.loader.create(urlArr, Laya.Handler.create(caller, loadComplete), Laya.Handler.create(this, this._loadProgress));
    };
    // { url: sceneid, type: Laya.Loader.IMAGE }
    LoaderManager.prototype.loadImage2D = function (urlArr, caller, completeFunc, loadTip) {
        if (loadTip === void 0) { loadTip = "正在加载"; }
        this._setTxtShow(loadTip);
        Laya.loader.load(urlArr, Laya.Handler.create(caller, completeFunc), Laya.Handler.create(this, this._loadProgress));
    };
    LoaderManager.prototype._loadProgress = function (ratio) {
        this._progressTxt.text = Math.floor(ratio * 100) + "%";
        if (ratio >= 1) {
            this._progressTxt.visible = false;
            this._loadTipTxt.visible = false;
        }
    };
    LoaderManager.prototype._setTxtShow = function (loadTip) {
        this._progressTxt.visible = true;
        this._loadTipTxt.visible = true;
        this._loadTipTxt.text = loadTip;
        this._setTxtPos();
    };
    LoaderManager.prototype._setTxtPos = function () {
        this._loadTipTxt.x = (Laya.stage.designWidth - this._loadTipTxt.width - 60) * Laya.stage.clientScaleX >> 1;
        this._loadTipTxt.y = (Laya.stage.designHeight - this._loadTipTxt.height) * Laya.stage.clientScaleY >> 1;
        this._progressTxt.x = this._loadTipTxt.x + this._loadTipTxt.width + 15;
        this._progressTxt.y = this._loadTipTxt.y;
    };
    LoaderManager.prototype._init = function () {
        //加载进度
        this._progressTxt = new Laya.Label();
        this._progressTxt.fontSize = 22;
        this._progressTxt.color = "#ffffff";
        SceneManager.instance.progressLayer.addChild(this._progressTxt);
        this._loadTipTxt = new Laya.Label();
        this._loadTipTxt.fontSize = 22;
        this._loadTipTxt.color = "#ffffff";
        SceneManager.instance.progressLayer.addChild(this._loadTipTxt);
        this._progressTxt.visible = false;
        this._loadTipTxt.visible = false;
    };
    return LoaderManager;
}());
//# sourceMappingURL=LoaderManager.js.map