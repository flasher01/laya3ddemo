class Copy {
    private _level: Level;
    constructor() {
        this._level = new Level();
    }
    enterCopy(copyType) {
        if (copyType == CopyType.hangUp) {
            this._level.enter();
        }
    }
}