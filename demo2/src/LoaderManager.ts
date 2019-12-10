class LoaderManager {
    private _progressTxt;
    private _loadTipTxt: Laya.Label;
    private static _instance: LoaderManager;
    constructor() {
        this._init();
    }
    static get instance(): LoaderManager {
        return this._instance || (this._instance = new LoaderManager());
    }
    resetTxtPos() {
        this._setTxtPos();
    }
    loadSprite3D(urlArr: Array<any>, caller: any, loadComplete: Function, loadTip: string = "正在加载") {
        this._setTxtShow(loadTip);
        Laya.loader.create(urlArr, Laya.Handler.create(caller, loadComplete), Laya.Handler.create(this, this._loadProgress));
    }
    // { url: sceneid, type: Laya.Loader.IMAGE }
    loadImage2D(urlArr: Array<any>, caller: any, completeFunc: Function, loadTip: string = "正在加载") {
        this._setTxtShow(loadTip);
        Laya.loader.load(urlArr, Laya.Handler.create(caller, completeFunc), Laya.Handler.create(this, this._loadProgress));
    }
    private _loadProgress(ratio) {
        this._progressTxt.text = Math.floor(ratio * 100) + "%";
        if (ratio >= 1) {
            this._progressTxt.visible = false;
            this._loadTipTxt.visible = false;
        }
    }
    private _setTxtShow(loadTip) {
        this._progressTxt.visible = true;
        this._loadTipTxt.visible = true;
        this._loadTipTxt.text = loadTip;
        this._setTxtPos();
    }
    private _setTxtPos() {
        this._loadTipTxt.x = (Laya.stage.designWidth - this._loadTipTxt.width - 60) * Laya.stage.clientScaleX >> 1;
        this._loadTipTxt.y = (Laya.stage.designHeight - this._loadTipTxt.height) * Laya.stage.clientScaleY >> 1;
        this._progressTxt.x = this._loadTipTxt.x + this._loadTipTxt.width + 15;
        this._progressTxt.y = this._loadTipTxt.y;
    }
    private _init() {
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
    }
}