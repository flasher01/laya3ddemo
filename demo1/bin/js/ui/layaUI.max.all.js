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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var ControlUI = /** @class */ (function (_super) {
        __extends(ControlUI, _super);
        function ControlUI() {
            return _super.call(this) || this;
        }
        ControlUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.ControlUI.uiView);
        };
        ControlUI.uiView = { "type": "View", "props": { "width": 640, "height": 1136 }, "child": [{ "type": "Label", "props": { "y": 61, "x": 67, "width": 29, "text": "x:", "height": 22, "fontSize": 22, "color": "#f9f3f3" } }, { "type": "TextInput", "props": { "y": 16, "x": 62, "var": "id", "text": "1", "fontSize": 22, "color": "#f3ecec" } }, { "type": "Label", "props": { "y": 61, "x": 91, "width": 96, "var": "xt", "text": "1", "height": 22, "fontSize": 22, "color": "#f9f3f3" } }, { "type": "Label", "props": { "y": 61, "x": 183, "width": 29, "text": "y:", "height": 22, "fontSize": 22, "color": "#f9f3f3" } }, { "type": "Label", "props": { "y": 61, "x": 207, "width": 96, "var": "yt", "text": "1", "height": 22, "fontSize": 22, "color": "#f9f3f3" } }, { "type": "Label", "props": { "y": 61, "x": 289, "width": 29, "text": "z:", "height": 22, "fontSize": 22, "color": "#f9f3f3" } }, { "type": "Label", "props": { "y": 61, "x": 313, "width": 96, "var": "zt", "text": "1", "height": 22, "fontSize": 22, "color": "#f9f3f3" } }, { "type": "Label", "props": { "y": 116, "x": 68, "width": 29, "text": "x:", "height": 22, "fontSize": 22, "color": "#f9f3f3" } }, { "type": "Label", "props": { "y": 116, "x": 92, "width": 96, "var": "xx", "text": "1", "height": 22, "fontSize": 22, "color": "#f9f3f3" } }, { "type": "Label", "props": { "y": 116, "x": 205, "width": 29, "text": "y:", "height": 22, "fontSize": 22, "color": "#f9f3f3" } }, { "type": "Label", "props": { "y": 116, "x": 229, "width": 96, "var": "yy", "text": "1", "height": 22, "fontSize": 22, "color": "#f9f3f3" } }, { "type": "TextInput", "props": { "y": 18, "x": 201, "var": "nu", "text": "0.1", "fontSize": 22, "color": "#f3ecec" } }] };
        return ControlUI;
    }(View));
    ui.ControlUI = ControlUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map