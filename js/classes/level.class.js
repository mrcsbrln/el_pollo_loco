class Level {

    enemies;
    clouds;
    coins;
    bottles;
    backgroundObjects;
    levelEnd_x = 2200;

    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}