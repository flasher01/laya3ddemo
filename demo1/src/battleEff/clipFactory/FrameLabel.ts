/*
 * @Author: LiJun 
 * @Date: 2018-10-09 11:06:14 
 * @Last Modified by:   LiJun 
 * @Last Modified time: 2018-10-09 11:06:14 
 */
/*
* name;
*/
class FrameLabel {
    _name;
    _frame;
    _end;
    /**
         * @version Egret 2.4
         * @platform Web,Native
         */
    constructor(name, frame /*int*/, end /*int*/) {
        var _this = this;
        _this._name = name;
        _this._frame = frame | 0;
        if (end)
            _this._end = end | 0;
    }

    get name() {
        return this._name;
    }
    get frame() {
        return this._frame;
    }

    get end() {
        return this._end;
    }

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
    clone(): FrameLabel {
        return new FrameLabel(this._name, this._frame, this._end);
    }
}