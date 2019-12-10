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
var FireBodyMaterial = /** @class */ (function (_super) {
    __extends(FireBodyMaterial, _super);
    function FireBodyMaterial() {
        var _this = _super.call(this) || this;
        _this.setShaderName("FireBodyShader");
        _this.renderQueue = 3000;
        _this.cull = 2;
        _this.blend = 1;
        _this.srcBlend = 0x0302;
        _this.dstBlend = 0x0303;
        _this.albedo = new Laya.Vector4(1, 1, 1, 1);
        _this.sConstVal = new Laya.Vector4(1, 0.5, 2, 0.2);
        _this.sRGBToGray = new Laya.Vector4(299, 587, 114, 0.001);
        _this._highLightColor = new Laya.Vector4(1, 1, 1, 1);
        _this._middleColor = new Laya.Vector4(1, 0.8, 0, 1);
        _this._lowKeyColor = new Laya.Vector4(1, 0.0, 0, 1);
        _this.fc0 = _this._highLightColor;
        _this.fc1 = _this._middleColor;
        _this.fc2 = _this._lowKeyColor;
        _this.fc3 = _this.sConstVal;
        _this.fc4 = _this.sRGBToGray;
        return _this;
    }
    Object.defineProperty(FireBodyMaterial.prototype, "albedo", {
        set: function (vec4) {
            this._setColor(3, vec4);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FireBodyMaterial.prototype, "fc0", {
        get: function () {
            return this._getColor(4);
        },
        set: function (vec4) {
            this._setColor(4, vec4);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FireBodyMaterial.prototype, "fc1", {
        get: function () {
            return this._getColor(5);
        },
        set: function (vec4) {
            this._setColor(5, vec4);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FireBodyMaterial.prototype, "fc2", {
        get: function () {
            return this._getColor(6);
        },
        set: function (vec4) {
            this._setColor(6, vec4);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FireBodyMaterial.prototype, "fc3", {
        get: function () {
            return this._getColor(7);
        },
        set: function (vec4) {
            this._setColor(7, vec4);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FireBodyMaterial.prototype, "fc4", {
        get: function () {
            return this._getColor(8);
        },
        set: function (vec4) {
            this._setColor(8, vec4);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FireBodyMaterial.prototype, "renderMode", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FireBodyMaterial.prototype, "diffuseTexture", {
        /**
         * 获取漫反射贴图。
         *  漫反射贴图。
         */
        get: function () {
            return this._getTexture(FireBodyMaterial.DIFFUSETEXTURE);
        },
        /**
         * 设置漫反射贴图。
         * 漫反射贴图。
         */
        set: function (value) {
            this._setTexture(FireBodyMaterial.DIFFUSETEXTURE, value);
        },
        enumerable: true,
        configurable: true
    });
    FireBodyMaterial.DIFFUSETEXTURE = 1;
    FireBodyMaterial.MARGINALCOLOR = 2;
    FireBodyMaterial.ALBEDO = 3;
    // public static cHighLightColor: String = "fc0";
    // public static cMiddleColor: String = "fc1";
    // public static cLowKeyColor: String = "fc2";
    // public static cConstVal: String = "fc3";
    // public static cRGBToGray: String = "fc4";
    FireBodyMaterial.fc0 = 4;
    FireBodyMaterial.fc1 = 5;
    FireBodyMaterial.fc2 = 6;
    FireBodyMaterial.fc3 = 7;
    FireBodyMaterial.fc4 = 8;
    return FireBodyMaterial;
}(Laya.BaseMaterial));
//# sourceMappingURL=FireBodyMaterial.js.map