class Level {
    enemies;
    clouds;
    backgroundObjects;
    levelEnd_x = 2000;

    constructor(enemies, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}