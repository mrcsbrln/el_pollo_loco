/**
 * Represents a smaller chicken enemy in the game.
 * Extends the `Chicken` class to inherit movement and behavior capabilities.
 */
class Chick extends Chicken {
    
    /**
     * The vertical position of the chick on the canvas.
     * @type {number}
     */
    y = 385;
    
    /**
     * The height of the chick in pixels.
     * @type {number}
     */
    height = 40;
    
    /**
     * The width of the chick in pixels.
     * @type {number}
     */
    width = 35;
    
    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    
    /**
     * Image path for the dead state.
     * @type {string}
     */
    IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    
    /**
     * Audio object played when the chick is hurt.
     * @type {HTMLAudioElement}
     */
    chicken_hurt_sound = new Audio('assets/audio/chick-dead.mov');
    
    /**
     * Creates an instance of the `Chick` class.
     * 
     * Initializes the chick's images, sets random position and speed, and starts the animation loop.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.x = 200 + Math.random() * 1800; // Random x position between 200 and 2000
        this.speed = 0.15 + Math.random() * 0.5; // Random speed between 0.15 and 0.65
        this.animate();
        this.chicken_hurt_sound.volume = 0.25;
    }
}