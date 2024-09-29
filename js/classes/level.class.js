/**
 * Represents a game level containing various game objects such as enemies, clouds, coins, bottles, and background elements.
 */
class Level {
    
    /**
     * @type {Array<Enemy>} - An array of enemy objects present in the level.
     */
    enemies;
    
    /**
     * @type {Array<Cloud>} - An array of cloud objects for the background.
     */
    clouds;
    
    /**
     * @type {Array<Coin>} - An array of coin objects that players can collect.
     */
    coins;
    
    /**
     * @type {Array<Bottle>} - An array of bottle objects available in the level.
     */
    bottles;
    
    /**
     * @type {Array<BackgroundObject>} - An array of background objects to enhance the level's scenery.
     */
    backgroundObjects;
    
    /**
     * @type {number} - The x-coordinate position where the level ends.
     */
    levelEnd_x = 2200;
    
    /**
     * Creates an instance of the Level class.
     * 
     * @param {Array<Enemy>} enemies - An array of enemy instances to populate the level.
     * @param {Array<Cloud>} clouds - An array of cloud instances for the background.
     * @param {Array<Coin>} coins - An array of coin instances that players can collect.
     * @param {Array<Bottle>} bottles - An array of bottle instances available in the level.
     * @param {Array<BackgroundObject>} backgroundObjects - An array of background object instances to enhance scenery.
     */
    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}