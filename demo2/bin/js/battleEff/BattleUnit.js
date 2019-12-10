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
/*
 * @Author: LiJun
 * @Date: 2018-10-09 11:05:04
 * @Last Modified by:   LiJun
 * @Last Modified time: 2018-10-09 11:05:04
 */
/*
* name;
*/
var BattleUnit = /** @class */ (function (_super) {
    __extends(BattleUnit, _super);
    function BattleUnit() {
        var _this = _super.call(this) || this;
        _this.isAlive = true;
        return _this;
    }
    return BattleUnit;
}(DepSprite));
//# sourceMappingURL=BattleUnit.js.map