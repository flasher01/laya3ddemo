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
 * @Date: 2018-10-09 11:05:17
 * @Last Modified by: LiJun
 * @Last Modified time: 2018-12-19 13:29:40
 */
/*
* name;
*/
var DepSprite = /** @class */ (function (_super) {
    __extends(DepSprite, _super);
    // $anchorOffsetX;
    // anchorOffsetY;
    function DepSprite() {
        var _this = _super.call(this) || this;
        _this.isPool = false;
        _this.dep = 0;
        return _this;
        //this.childIndex = -1;
    }
    Object.defineProperty(DepSprite.prototype, "anchorOffsetX", {
        set: function (x) {
            this.pivotX = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DepSprite.prototype, "anchorOffsetY", {
        set: function (y) {
            this.pivotY = y;
        },
        enumerable: true,
        configurable: true
    });
    DepSprite.prototype.depAddChild = function (e) {
        // let i = this._childs,
        //     o = i.length - 1,
        //     n = 0,
        //     a = (n + o) / 2 >> 0;
        // for (; o > n;) {
        //     let r = i[a];
        //     if (e.dep > r.dep) n = a + 1;
        //     else {
        //         if (!(e.dep < r.dep)) break;
        //         o = a - 1
        //     }
        //     a = (n + o) / 2 >> 0
        // }
        e.parent || this.addChild(e); //e.childIndex = a
    };
    DepSprite.prototype.depRemoveChild = function (t) {
        var e = this._childs, i = e.indexOf(t);
        if (t.isPool) {
            i >= 0 && this.removeChildAt(i);
        }
        else {
            i >= 0 && t.destroy();
        }
    };
    DepSprite.prototype.sortChild = function () {
        var t = this._childs;
        if (Laya.Browser.window.conch) {
            this._childs.forEach(function (element) {
                element.zOrder = element.dep;
            });
        }
        else {
            var e = t.length;
            t && t.length > 1 && t.sort(this.sortFunc);
        }
        //t.sort(this.sortFunc)
    };
    DepSprite.prototype.sortFunc = function (t, e) {
        return t ? e ? t.dep - e.dep : -1 : 1;
    };
    return DepSprite;
}(Laya.Sprite));
//# sourceMappingURL=DepSprite.js.map