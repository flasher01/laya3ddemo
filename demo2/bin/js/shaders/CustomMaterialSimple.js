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
var CustomMaterialSimple = /** @class */ (function (_super) {
    __extends(CustomMaterialSimple, _super);
    function CustomMaterialSimple() {
        var _this = _super.call(this) || this;
        _this.setShaderName("CustomSimple");
        _this.renderQueue = 3000;
        _this.cull = 2;
        _this.blend = 1;
        _this.srcBlend = 0x0302;
        _this.dstBlend = 0x0303;
        _this.albedo = new Laya.Vector4(1, 1, 1, 1);
        return _this;
    }
    Object.defineProperty(CustomMaterialSimple.prototype, "albedo", {
        get: function () {
            return this._getColor(3);
        },
        set: function (vec4) {
            this._setColor(3, vec4);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterialSimple.prototype, "renderMode", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterialSimple.prototype, "diffuseTexture", {
        /**
         * 获取漫反射贴图。
         *  漫反射贴图。
         */
        get: function () {
            return this._getTexture(CustomMaterialSimple.DIFFUSETEXTURE);
        },
        /**
         * 设置漫反射贴图。
         * 漫反射贴图。
         */
        set: function (value) {
            this._setTexture(CustomMaterialSimple.DIFFUSETEXTURE, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMaterialSimple.prototype, "marginalColor", {
        /**
         * 设置边缘光照颜色。
         * 边缘光照颜色。
         */
        set: function (value) {
            this._setColor(CustomMaterialSimple.MARGINALCOLOR, value);
        },
        enumerable: true,
        configurable: true
    });
    CustomMaterialSimple.DIFFUSETEXTURE = 1;
    CustomMaterialSimple.MARGINALCOLOR = 2;
    CustomMaterialSimple.ALBEDO = 3;
    return CustomMaterialSimple;
}(Laya.BaseMaterial));
//# sourceMappingURL=CustomMaterialSimple.js.map