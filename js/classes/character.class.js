/**
 * Represents the main character in the game, handling movements, animations, and interactions.
 * Extends the `MovableObject` class to inherit movement and rendering capabilities.
 */
class Character extends MovableObject {

    /**
     * The height of the character in pixels.
     * @type {number}
     */
    height = 280;

    /**
     * The width of the character in pixels.
     * @type {number}
     */
    width = 130;

    /**
     * The initial horizontal position of the character on the canvas.
     * @type {number}
     */
    x = 120;

    /**
     * The initial vertical position of the character on the canvas.
     * @type {number}
     */
    y = 55;

    /**
     * The collision offset values for the character.
     * Defines the bounding box for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 120,
        left: 30,
        right: 40,
        bottom: 20
    };

    /**
     * The horizontal speed of the character.
     * @type {number}
     */
    speed = 8;

    /**
     * The time the character has been idle.
     * @type {number}
     */
    idleTime = 0;

    /**
     * The current energy (health) level of the character.
     * @type {number}
     */
    energy = 100;

    /**
     * Array of image paths for the walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png',
    ];

    /**
     * Array of image paths for the jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        // 'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png',
    ];

    /**
     * Array of image paths for the hurt animation.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png',
    ];

    /**
     * Array of image paths for the dead animation.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png',
    ];

    /**
     * Array of image paths for the idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    /**
     * Array of image paths for the long idle animation.
     * @type {string[]}
     */
    IMAGES_LONG_IDLE = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png',  
    ];

    /**
     * Audio object for the walking sound effect.
     * @type {HTMLAudioElement}
     */
    walking_sound = new Audio('assets/audio/walking.mov');

    /**
     * Audio object for the jumping sound effect.
     * @type {HTMLAudioElement}
     */
    jumping_sound = new Audio('assets/audio/jumping.mp3');

    /**
     * Audio object for the snoring sound effect.
     * @type {HTMLAudioElement}
     */
    snoring_sound = new Audio('assets/audio/snoring.mp3');

    /**
     * Array of audio objects for the hurt sound effects.
     * @type {HTMLAudioElement[]}
     */
    hurt_sounds = [
        new Audio('assets/audio/hurt1.mov'),
        new Audio('assets/audio/hurt2.mov'),
        new Audio('assets/audio/hurt3.mov'),
    ];

    /**
     * Flag indicating whether a hurt sound has been played to prevent repetition.
     * @type {boolean}
     */
    hurtSoundPlayed = false;

    /**
     * Creates an instance of the `Character` class.
     * 
     * Initializes the character's images, applies gravity, and starts the animation loop.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
        this.jumping_sound.volume = 0.1; 
        this.snoring_sound.volume = 0.25; 
    }

    /**
     * Handles the idle animation when the character is not performing any actions.
     * 
     * Plays the idle animation frames and manages the snoring sound effect.
     */
    idle() {
        this.playAnimation(this.IMAGES_IDLE);
        this.snoring_sound.pause();
        this.snoring_sound.currentTime = 0;
        this.idleTime += 250;
    }

    /**
     * Handles the long idle animation after the character has been idle for an extended period.
     * 
     * Plays the long idle animation frames and starts the snoring sound effect.
     */
    longIdle() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        this.snoring_sound.play();
    }

    /**
     * Manages the walking sound effect based on the character's movement.
     * 
     * Plays the walking sound if the character is moving left or right and is not above the ground.
     */
    walkingSound() {
        if (this.world.keyboard.LEFT && !this.isAboveGround()) {
            this.walking_sound.play();
        }
        if (this.world.keyboard.RIGHT && !this.isAboveGround()) {
            this.walking_sound.play();
        }
    }

    /**
     * Plays a random hurt sound effect when the character is hurt.
     * 
     * Ensures that only one hurt sound is played per hurt event.
     */
    hurtSound() {
        if (!this.hurtSoundPlayed) {
            let i = Math.floor(Math.random() * 3);
            this.hurt_sounds[i].volume = 0.5;
            this.hurt_sounds[i].play();
            this.hurtSoundPlayed = true;
        }
    }

    /**
     * Handles the character's hurt state by playing the hurt animation and sound.
     */
    hurtCharcter() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurtSound();
        this.idleTime = 0;
    }

    /**
     * Starts the animation loops for the character, handling movements and state changes.
     * 
     * Sets up multiple intervals to manage different aspects of the character's behavior:
     * - Movement and camera control
     * - Animation state changes
     * - Idle state management
     */
    animate() {

        /**
         * Handles movement and camera adjustments.
         */
        setStoppableInterval(() => {
            this.walking_sound.pause(); 
            this.walkingSound();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEnd_x) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumping_sound.currentTime = 0;
                this.jumping_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        /**
         * Handles animation state changes based on the character's actions and states.
         */
        setStoppableInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.idleTime = 0;
            }
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.idleTime = 0;
            } 
            if (!this.isHurt()) {
                this.hurtSoundPlayed = false;
            }
            if (this.isHurt()) {
                this.hurtCharcter();
            }
        }, 50);

        /**
         * Handles animation state changes based on the character's actions and states.
         */
        setStoppableInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.idleTime = 0;
            } 
        }, 80);
        
        /**
         * Manages the idle state based on the duration of inactivity.
         */
        setStoppableInterval(() => {
            if (this.idleTime < 10000) {
                this.idle();
            }
            if (this.idleTime >= 10000) {
                this.longIdle();
            } 
        }, 250);
    }

    /**
     * Makes the character jump by setting the vertical speed.
     * 
     * Applies an upward force to the character, initiating the jump action.
     */
    jump() {
        this.speedY = 30;
    }
}