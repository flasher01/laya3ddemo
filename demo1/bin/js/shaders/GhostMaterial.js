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
var GhostMaterial = /** @class */ (function (_super) {
    __extends(GhostMaterial, _super);
    function GhostMaterial() {
        var _this = _super.call(this) || this;
        _this.setShaderName("GhostShader");
        _this.renderQueue = 3000;
        _this.cull = 2;
        _this.blend = 1;
        _this.srcBlend = 0x0302;
        _this.dstBlend = 0x0303;
        _this.albedo = new Laya.Vector4(1, 1, 1, 1);
        return _this;
    }
    Object.defineProperty(GhostMaterial.prototype, "albedo", {
        get: function () {
            return this._getColor(3);
        },
        set: function (vec4) {
            this._setColor(3, vec4);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GhostMaterial.prototype, "renderMode", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    GhostMaterial.DIFFUSETEXTURE = 1;
    GhostMaterial.MARGINALCOLOR = 2;
    GhostMaterial.ALBEDO = 3;
    return GhostMaterial;
}(Laya.BaseMaterial));
//# sourceMappingURL=GhostMaterial.js.map