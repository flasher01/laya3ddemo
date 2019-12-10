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
var Camera2DEvent = /** @class */ (function (_super) {
    __extends(Camera2DEvent, _super);
    function Camera2DEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Camera2DEvent.HIT_BOUNDARY = 'hitBoundary';
    Camera2DEvent.SWAP_STARTED = 'swapStarted';
    Camera2DEvent.SWAP_FINISHED = 'swapFinished';
    return Camera2DEvent;
}(Laya.Event));
//# sourceMappingURL=Camera2DEvent.js.map