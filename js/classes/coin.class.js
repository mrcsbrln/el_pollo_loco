/**
 * Represents a coin object in the game that the character can collect.
 * Extends the `DrawableObject` class to inherit rendering capabilities.
 */
class Coin extends DrawableObject {
    
    /**
     * The width of the coin in pixels.
     * @type {number}
     */
    width = 100;
    
    /**
     * The height of the coin in pixels.
     * @type {number}
     */
    height = 100;
    
    /**
     * The collision offset values for the coin.
     * Defines the bounding box for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    
    /**
     * Array of image paths for the coin animation.
     * @type {string[]}
     */
    IMAGES_COIN = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png',
    ];
    
    /**
     * Audio object played when the coin is collected.
     * @type {HTMLAudioElement}
     */
    coin_collected_sound = new Audio('assets/audio/coin-collected.mp3');
    
    /**
     * Creates an instance of the `Coin` class.
     * 
     * Initializes the coin's image, sets its position, loads animation frames, and starts the animation loop.
     * 
     * @param {number} x - The initial horizontal position of the coin on the canvas.
     * @param {number} y - The initial vertical position of the coin on the canvas.
     */
    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.animate();
        this.coin_collected_sound.volume = 0.25;
    }
    
    /**
     * Starts the animation loop for the coin, handling its animation frames.
     * 
     * Sets up an interval that cycles through the coin's animation images to create a spinning effect.
     */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200); // Changes image every 200 milliseconds
    }
}