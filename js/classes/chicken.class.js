/**
 * Represents a standard chicken enemy in the game.
 * Extends the `MovableObject` class to inherit movement and rendering capabilities.
 */
class Chicken extends MovableObject {
    
    /**
     * The vertical position of the chicken on the canvas.
     * @type {number}
     */
    y = 370;
    
    /**
     * The height of the chicken in pixels.
     * @type {number}
     */
    height = 55;
    
    /**
     * The width of the chicken in pixels.
     * @type {number}
     */
    width = 70;
    
    /**
     * The collision offset values for the chicken.
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
     * Indicates whether the chicken is dead.
     * @type {boolean}
     */
    dead = false;
    
    /**
     * Indicates whether the chicken should be removed from the game.
     * @type {boolean}
     */
    splicable = false;
    
    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    
    /**
     * Image path for the dead state.
     * @type {string}
     */
    IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    
    /**
     * Audio object played when the chicken is hurt or dead.
     * @type {HTMLAudioElement}
     */
    chicken_hurt_sound = new Audio('assets/audio/chicken-dead.mov');
    
    /**
     * Flag indicating whether the hurt sound has been played to prevent repetition.
     * @type {boolean}
     */
    chickenHurtSoundPlayed = false;
    
    /**
     * Creates an instance of the `Chicken` class.
     * 
     * Initializes the chicken's images, sets random position and speed, and starts the animation loop.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.x = 200 + Math.random() * 1800; // Random x position between 200 and 2000
        this.speed = 0.15 + Math.random() * 0.5; // Random speed between 0.15 and 0.65
        this.animate();
    }
    
    /**
     * Kills the chicken, playing the hurt sound and marking it for removal.
     * 
     * - Sets the `dead` flag to true.
     * - Stops the chicken's movement by setting speed to 0.
     * - Plays the hurt sound if it hasn't been played yet.
     * - Marks the chicken as splicable after a 2-second delay.
     */
    kill() {
        this.dead = true;
        this.speed = 0;
        if (this.chickenHurtSoundPlayed === false) {
            this.chicken_hurt_sound.play();
            this.chickenHurtSoundPlayed = true;
        }
        setTimeout(() => {
            this.splicable = true;
        }, 2000);
    }
    
    /**
     * Starts the animation loops for the chicken, handling movement and state changes.
     * 
     * Sets up multiple intervals to manage different aspects of the chicken's behavior:
     * - Movement to the left.
     * - Animation state changes based on whether the chicken is dead.
     */
    animate() {
        /**
         * Handles the chicken's movement to the left.
         */
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        /**
         * Handles the chicken's animation based on its state.
         * 
         * - Plays the walking animation if the chicken is alive.
         * - Displays the dead image if the chicken is dead.
         */
        setStoppableInterval(() => {
            if (this.dead === true) {
                this.loadImage(this.IMAGE_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}