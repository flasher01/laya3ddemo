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
var DispatcherContainer = /** @class */ (function (_super) {
    __extends(DispatcherContainer, _super);
    function DispatcherContainer() {
        var _this = _super.call(this) || this;
        _this._d = new SDispatcher();
        return _this;
    }
    DispatcherContainer.prototype.add = function (t, e, i) {
        this._d.on(t, e, i);
    };
    DispatcherContainer.prototype.rmv = function (t, e, i) {
        this._d.off(t, e, i);
    };
    DispatcherContainer.prototype.rmvAll = function () {
        this._d.rmvAll();
    };
    DispatcherContainer.prototype.has = function (t) {
        return this._d.has(t);
    };
    DispatcherContainer.prototype.dis = function (t, e, i) {
        void 0 === e && (e = null), void 0 === i && (i = null), this._d.dis(t, e ? e : this, i);
    };
    return DispatcherContainer;
}(Laya.Component));
//# sourceMappingURL=DispatcherContainer.js.map