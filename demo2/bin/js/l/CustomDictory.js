var CustomDictory = /** @class */ (function () {
    function CustomDictory() {
        this.m_obj = {};
        this.m_arr = [];
    }
    CustomDictory.prototype.getArray = function () {
        return this.m_arr;
    };
    CustomDictory.prototype.getObjects = function () {
        return this.m_obj;
    };
    CustomDictory.prototype.getValue = function (t) {
        return this.m_obj[t];
    };
    CustomDictory.prototype.hasValue = function (t) {
        return null != this.m_obj[t];
    };
    CustomDictory.prototype.put = function (t, e) {
        if (t && e) {
            if (this.m_obj[t]) {
                var i = this.m_obj[t];
                if (i == e)
                    return;
                var n = this.m_arr.indexOf(i);
                -1 != n && this.m_arr.splice(n, 1);
            }
            this.m_obj[t] = e, this.m_arr.push(e);
        }
    };
    CustomDictory.prototype.remove = function (t) {
        var e = this.m_obj[t];
        if (e) {
            this.m_obj[t] = null, delete this.m_obj[t];
            var i = this.m_arr.indexOf(e);
            -1 != i && this.m_arr.splice(i, 1);
        }
    };
    CustomDictory.prototype.clear = function () {
        this.m_arr.length = 0, this.m_obj = {};
    };
    return CustomDictory;
}());
//# sourceMappingURL=CustomDictory.js.map