/**
 * Represents the first level of the game.
 * @type {Level}
 */
let level1;

/**
 * Initializes the first level by creating and configuring all necessary game objects.
 * 
 * This function performs the following actions:
 * - Creates arrays of enemies, clouds, coins, bottles, and background objects.
 * - Instantiates each game object with appropriate parameters.
 * - Constructs a new `Level` instance with the created objects.
 */
function initLevel() {
    /**
     * An array of enemy objects present in the level.
     * @type {Enemy[]}
     */
    let enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Endboss(),
    ];

    /**
     * An array of cloud objects for the background.
     * @type {Cloud[]}
     */
    let clouds = [
        new Cloud('assets/img/5_background/layers/4_clouds/1.png', 200),
        new Cloud('assets/img/5_background/layers/4_clouds/2.png', 1200),
        new Cloud('assets/img/5_background/layers/4_clouds/1.png', 1600),
        new Cloud('assets/img/5_background/layers/4_clouds/2.png', 2400),
    ];

    /**
     * An array of coin objects that the character can collect.
     * @type {Coin[]}
     */
    let coins = [
        new Coin(200, 75),
        new Coin(300, 100),
        new Coin(400, 75),
        new Coin(500, 100),
        new Coin(1200, 75),
        new Coin(1300, 100),
        new Coin(1400, 75),
        new Coin(1500, 100),
    ];

    /**
     * An array of bottle objects that the character can collect and throw.
     * @type {Bottle[]}
     */
    let bottles = [
        new Bottle('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 200, 370),
        new Bottle('assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 225, 370),
        new Bottle('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 350, 370),
        new Bottle('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 425, 370),
        new Bottle('assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 590, 370),
        new Bottle('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 600, 370),
        new Bottle('assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 750, 370),
    ];

    /**
     * An array of background objects that make up the game's scenery.
     * These objects are layered to create a parallax scrolling effect.
     * @type {BackgroundObject[]}
     */
    let backgroundObjects = [
        new BackgroundObject('assets/img/5_background/layers/air.png', -719),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -719),
    
        new BackgroundObject('assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),
    
        new BackgroundObject('assets/img/5_background/layers/air.png', 719),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719),
    
        new BackgroundObject('assets/img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 719 * 2),
    
        new BackgroundObject('assets/img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719 * 3),        
    ];
    
    /**
     * Instantiates the first level with all its game objects.
     */
    level1 = new Level(enemies, clouds, coins, bottles, backgroundObjects);
}