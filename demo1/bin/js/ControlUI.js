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
var ControlUI = /** @class */ (function (_super) {
    __extends(ControlUI, _super);
    function ControlUI() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ControlUI, "instance", {
        get: function () {
            return this._instance || (this._instance = new ControlUI());
        },
        enumerable: true,
        configurable: true
    });
    ControlUI.setPos = function (vec3, pt) {
        ControlUI.instance.xt.text = vec3.x + "";
        ControlUI.instance.yt.text = vec3.y + "";
        ControlUI.instance.zt.text = vec3.z + "";
        ControlUI.instance.xx.text = pt.x + "";
        ControlUI.instance.yy.text = pt.y + "";
    };
    return ControlUI;
}(ui.ControlUI));
//# sourceMappingURL=ControlUI.js.map