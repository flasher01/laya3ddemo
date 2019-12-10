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
        // return undefined;
        this.curFightRound = 0;
        this.curEnemyIndex = 0;
        this.curPlayerIndex = 0;
        this.chracterEnemyArr = [];
        this.characterPlayerArr = [];
        for (var _i = 0, _a = SceneManager.instance.fightCharacterEnemyArr; _i < _a.length; _i++) {
            var o = _a[_i];
            this.chracterEnemyArr.push(o.fightPoint);
        }
        for (var _b = 0, _c = SceneManager.instance.fightCharacterPlayerArr; _b < _c.length; _b++) {
            var oo = _c[_b];
            this.characterPlayerArr.push(oo.fightPoint);
        }
        Laya.timer.once(2000, this, this._beginFight);
    };
    AIFightControl.prototype.nextFightRound = function () {
        if (this.characterPlayerArr.length == 0 || this.chracterEnemyArr.length == 0) {
            this._fightEnd();
        }
        else {
            this._beginFight();
        }
    };
    AIFightControl.prototype.removeDieCharacter = function (camp, fightPoint) {
        var index;
        if (camp == CampType.Enemy) {
            index = this.chracterEnemyArr.indexOf(fightPoint);
            this.chracterEnemyArr.splice(index, 1);
        }
        else if (camp == CampType.Player) {
            index = this.characterPlayerArr.indexOf(fightPoint);
            this.characterPlayerArr.splice(index, 1);
        }
    };
    AIFightControl.prototype._beginFight = function () {
        this.curFightRound++;
        var rnd;
        var playerPoint;
        var enemyPoint;
        var playerCharacter;
        var enemyCharacter;
        var attackType = Math.random();
        var attackedArr = [];
        //玩家攻击
        if (this.curFightRound % 2 != 0) {
            this.curPlayerIndex = this.curPlayerIndex >= this.characterPlayerArr.length ? 0 : this.curPlayerIndex;
            playerPoint = this.characterPlayerArr[this.curPlayerIndex];
            playerCharacter = SceneManager.instance.fightCharacterPlayerArr[playerPoint];
            if (attackType > 0.5) {
                if (this.chracterEnemyArr.length <= 3) {
                    for (var i = 0; i < this.chracterEnemyArr.length; i++) {
                        enemyPoint = this.chracterEnemyArr[i];
                        enemyCharacter = SceneManager.instance.fightCharacterEnemyArr[enemyPoint];
                        attackedArr.push(enemyCharacter);
                    }
                }
                else {
                    for (var i = 0; i < 3; i++) {
                        enemyPoint = this.chracterEnemyArr[i];
                        enemyCharacter = SceneManager.instance.fightCharacterEnemyArr[enemyPoint];
                        attackedArr.push(enemyCharacter);
                    }
                }
                playerCharacter.skillAttack(attackedArr);
            }
            else {
                rnd = Math.floor(Math.random() * this.chracterEnemyArr.length);
                enemyPoint = this.chracterEnemyArr[rnd];
                enemyCharacter = SceneManager.instance.fightCharacterEnemyArr[enemyPoint];
                playerCharacter.normalAttack(enemyCharacter);
            }
            this.curPlayerIndex++;
        }
        else { //敌方攻击
            this.curEnemyIndex = this.curEnemyIndex >= this.chracterEnemyArr.length ? 0 : this.curEnemyIndex;
            enemyPoint = this.chracterEnemyArr[this.curEnemyIndex];
            enemyCharacter = SceneManager.instance.fightCharacterEnemyArr[enemyPoint];
            if (attackType > 0.5) {
                if (this.characterPlayerArr.length <= 3) {
                    for (var i = 0; i < this.characterPlayerArr.length; i++) {
                        playerPoint = this.characterPlayerArr[i];
                        playerCharacter = SceneManager.instance.fightCharacterPlayerArr[playerPoint];
                        attackedArr.push(playerCharacter);
                    }
                }
                else {
                    for (var i = 0; i < 3; i++) {
                        playerPoint = this.characterPlayerArr[i];
                        playerCharacter = SceneManager.instance.fightCharacterPlayerArr[playerPoint];
                        attackedArr.push(playerCharacter);
                    }
                }
                enemyCharacter.skillAttack(attackedArr);
            }
            else {
                rnd = Math.floor(Math.random() * this.characterPlayerArr.length);
                playerPoint = this.characterPlayerArr[rnd];
                playerCharacter = SceneManager.instance.fightCharacterPlayerArr[playerPoint];
                enemyCharacter.normalAttack(playerCharacter);
            }
            this.curEnemyIndex++;
        }
    };
    AIFightControl.prototype._fightEnd = function () {
        SceneManager.instance.exitFight();
        this.event("fightEnd");
    };
    return AIFightControl;
}(Laya.EventDispatcher));
//# sourceMappingURL=AIFightControl.js.map