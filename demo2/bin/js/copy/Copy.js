var Copy = /** @class */ (function () {
    function Copy() {
        this._level = new Level();
    }
    Copy.prototype.enterCopy = function (copyType) {
        if (copyType == CopyType.hangUp) {
            this._level.enter();
        }
    };
    return Copy;
}());
//# sourceMappingURL=Copy.js.map