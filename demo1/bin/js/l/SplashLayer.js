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
var SplashLayer = /** @class */ (function (_super) {
    __extends(SplashLayer, _super);
    function SplashLayer() {
        var _this = _super.call(this) || this;
        _this.step = .02;
        _this.image = new Laya.Image;
        _this.image.skin = "view/module/main/mainView/hpLowImg.png";
        _this.image.sizeGrid = "60,75,60,75,0";
        _this.validateSize();
        return _this;
    }
    SplashLayer.prototype.validateSize = function () {
        this.image.width = GameModel.ViewWH, this.image.height = GameModel.ViewTH;
    };
    SplashLayer.prototype.addSplash = function () {
        null == this.image.parent && (this.addChild(this.image), this.image.alpha = 0);
    };
    SplashLayer.prototype.removeSplash = function () {
        this.image.parent && this.image.parent.removeChild(this.image);
    };
    SplashLayer.prototype.update = function () {
        this.image.parent && (this.image.alpha += this.step, (1 == this.image.alpha || 0 == this.image.alpha) && (this.step = -1 * this.step));
    };
    return SplashLayer;
}(Laya.Sprite));
//# sourceMappingURL=SplashLayer.js.map