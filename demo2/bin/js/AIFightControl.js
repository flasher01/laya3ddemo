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
var AIFightControl = /** @class */ (function (_super) {
    __extends(AIFightControl, _super);
    function AIFightControl() {
        var _this = _super.call(this) || this;
        _this.chracterEnemyArr = [];
        _this.characterPlayerArr = [];
        _this.curFightRound = 0;
        _this.curEnemyIndex = 0;
        _this.curPlayerIndex = 0;
        return _this;
    }
    Object.defineProperty(AIFightControl, "instance", {
        get: function () {
            return this._instance || (this._instance = new AIFightControl());
        },
        enumerable: true,
        configurable: true
    });
    AIFightControl.prototype.startup = function () {
        this.curFightRound = 0;
        this.curEnemyIndex = 0;
        this.curPlayerIndex = 0;
        this.chracterEnemyArr = SceneManager.instance.fightCharacterEnemyArr;
        this.characterPlayerArr = SceneManager.instance.fightCharacterPlayerArr;
        Laya.timer.once(2000, this, this._beginFight);
    };
    AIFightControl.prototype.nextFightRound = function () {
        if (this.curPlayerIndex < this.characterPlayerArr.length || this.curEnemyIndex < this.chracterEnemyArr.length) {
            this._beginFight();
        }
    };
    AIFightControl.prototype._beginFight = function () {
        this.curFightRound++;
        var rnd;
        var index;
        if (this.curFightRound % 2 != 0) {
            rnd = Math.floor(Math.random() * 10);
            index = this.curPlayerIndex >= this.characterPlayerArr.length ? 0 : this.curPlayerIndex;
            this.characterPlayerArr[index].normalAttack(this.chracterEnemyArr[rnd]);
            this.curPlayerIndex++;
        }
        else {
            rnd = Math.floor(Math.random() * this.characterPlayerArr.length);
            this.chracterEnemyArr[this.curEnemyIndex].normalAttack(this.characterPlayerArr[rnd]);
            this.curEnemyIndex++;
        }
        if (this.curPlayerIndex >= this.characterPlayerArr.length && this.curEnemyIndex >= this.chracterEnemyArr.length) {
            SceneManager.instance.exitFight();
            this.event("fightEnd");
        }
    };
    return AIFightControl;
}(Laya.EventDispatcher));
//# sourceMappingURL=AIFightControl.js.map