/*
 * @Author: LiJun
 * @Date: 2018-10-09 11:06:14
 * @Last Modified by:   LiJun
 * @Last Modified time: 2018-10-09 11:06:14
 */
/*
* name;
*/
var FrameLabel = /** @class */ (function () {
    /**
         * @version Egret 2.4
         * @platform Web,Native
         */
    function FrameLabel(name, frame /*int*/, end /*int*/) {
        var _this = this;
        _this._name = name;
        _this._frame = frame | 0;
        if (end)
            _this._end = end | 0;
    }
    Object.defineProperty(FrameLabel.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameLabel.prototype, "frame", {
        get: function () {
            return this._frame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrameLabel.prototype, "end", {
        get: function () {
            return this._end;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Duplicate the current frame label object
     * @version Egret 2.4
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 复制当前帧标签对象
     * @version Egret 2.4
     * @platform Web,Native
     * @language zh_CN
     */
    FrameLabel.prototype.clone = function () {
        return new FrameLabel(this._name, this._frame, this._end);
    };
    return FrameLabel;
}());
//# sourceMappingURL=FrameLabel.js.map