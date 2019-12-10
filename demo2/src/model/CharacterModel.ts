class CharacterModel {
    life = Math.floor(Math.random() * 2000 + 200);
    speed = Math.floor(Math.random() * 50 + 100);
    maxLife;
    constructor() {
        this.maxLife = this.life;
    }
}