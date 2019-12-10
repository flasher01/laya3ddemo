class AIFightControl extends Laya.EventDispatcher {
    chracterEnemyArr: Array<number> = [];
    characterPlayerArr: Array<number> = [];
    curFightRound = 0;
    curEnemyIndex = 0;
    curPlayerIndex = 0;
    private static _instance: AIFightControl;
    constructor() {
        super();
    }
    static get instance(): AIFightControl {
        return this._instance || (this._instance = new AIFightControl());
    }
    startup() {
        // return undefined;
        this.curFightRound = 0;
        this.curEnemyIndex = 0;
        this.curPlayerIndex = 0;
        this.chracterEnemyArr = [];
        this.characterPlayerArr = [];
        for (let o of SceneManager.instance.fightCharacterEnemyArr) {
            this.chracterEnemyArr.push(o.fightPoint)
        }
        for (let oo of SceneManager.instance.fightCharacterPlayerArr) {
            this.characterPlayerArr.push(oo.fightPoint)
        }
        Laya.timer.once(2000, this, this._beginFight);
    }
    nextFightRound() {
        if (this.characterPlayerArr.length == 0 || this.chracterEnemyArr.length == 0) {
            this._fightEnd();
        } else {
            this._beginFight();
        }
    }
    removeDieCharacter(camp, fightPoint) {
        let index;
        if (camp == CampType.Enemy) {
            index = this.chracterEnemyArr.indexOf(fightPoint);
            this.chracterEnemyArr.splice(index, 1);
        } else if (camp == CampType.Player) {
            index = this.characterPlayerArr.indexOf(fightPoint);
            this.characterPlayerArr.splice(index, 1);
        }
    }
    private _beginFight() {
        this.curFightRound++;
        let rnd;
        let playerPoint;
        let enemyPoint;
        let playerCharacter;
        let enemyCharacter;
        let attackType = Math.random();
        let attackedArr = [];
        //玩家攻击
        if (this.curFightRound % 2 != 0) {
            this.curPlayerIndex = this.curPlayerIndex >= this.characterPlayerArr.length ? 0 : this.curPlayerIndex;
            playerPoint = this.characterPlayerArr[this.curPlayerIndex];
            playerCharacter = SceneManager.instance.fightCharacterPlayerArr[playerPoint];
            if (attackType > 0.5) {
                if (this.chracterEnemyArr.length <= 3) {
                    for (let i = 0; i < this.chracterEnemyArr.length; i++) {
                        enemyPoint = this.chracterEnemyArr[i];
                        enemyCharacter = SceneManager.instance.fightCharacterEnemyArr[enemyPoint];
                        attackedArr.push(enemyCharacter);
                    }
                } else {
                    for (let i = 0; i < 3; i++) {
                        enemyPoint = this.chracterEnemyArr[i];
                        enemyCharacter = SceneManager.instance.fightCharacterEnemyArr[enemyPoint];
                        attackedArr.push(enemyCharacter);
                    }
                }
                playerCharacter.skillAttack(attackedArr);
            } else {
                rnd = Math.floor(Math.random() * this.chracterEnemyArr.length);
                enemyPoint = this.chracterEnemyArr[rnd];
                enemyCharacter = SceneManager.instance.fightCharacterEnemyArr[enemyPoint];
                playerCharacter.normalAttack(enemyCharacter);
            }
            this.curPlayerIndex++;
        } else {//敌方攻击
            this.curEnemyIndex = this.curEnemyIndex >= this.chracterEnemyArr.length ? 0 : this.curEnemyIndex;
            enemyPoint = this.chracterEnemyArr[this.curEnemyIndex];
            enemyCharacter = SceneManager.instance.fightCharacterEnemyArr[enemyPoint];
            if (attackType > 0.5) {
                if (this.characterPlayerArr.length <= 3) {
                    for (let i = 0; i < this.characterPlayerArr.length; i++) {
                        playerPoint = this.characterPlayerArr[i];
                        playerCharacter = SceneManager.instance.fightCharacterPlayerArr[playerPoint];
                        attackedArr.push(playerCharacter);
                    }
                } else {
                    for (let i = 0; i < 3; i++) {
                        playerPoint = this.characterPlayerArr[i];
                        playerCharacter = SceneManager.instance.fightCharacterPlayerArr[playerPoint];
                        attackedArr.push(playerCharacter);
                    }
                }
                enemyCharacter.skillAttack(attackedArr);
            } else {
                rnd = Math.floor(Math.random() * this.characterPlayerArr.length);
                playerPoint = this.characterPlayerArr[rnd];
                playerCharacter = SceneManager.instance.fightCharacterPlayerArr[playerPoint];
                enemyCharacter.normalAttack(playerCharacter);
            }
            this.curEnemyIndex++;
        }
    }

    private _fightEnd() {
        SceneManager.instance.exitFight();
        this.event("fightEnd");
    }
}