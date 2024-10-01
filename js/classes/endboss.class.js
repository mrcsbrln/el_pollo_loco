/**
 * Represents the end boss enemy in the game.
 * Extends the `MovableObject` class to inherit movement and rendering capabilities.
 */
class Endboss extends MovableObject {
    
    /**
     * Indicates whether the end boss is currently colliding with a bottle.
     * @type {boolean}
     */
    bottleIsColliding = false;
    
    /**
     * The height of the end boss in pixels.
     * @type {number}
     */
    height = 300;
    
    /**
     * The width of the end boss in pixels.
     * @type {number}
     */
    width = 200;
    
    /**
     * The vertical position of the end boss on the canvas in pixels.
     * @type {number}
     */
    y = 150;
    
    /**
     * Flag indicating whether the end boss has started walking.
     * @type {boolean}
     */
    endbossStartsWalking = false;
    
    /**
     * Flag indicating whether the end boss is currently attacking.
     * @type {boolean}
     */
    endbossIsAttacking = false;
    
    /**
     * The current speed of the end boss.
     * @type {number}
     */
    speed = 0;
    
    /**
     * Audio object played when the end boss is hurt or dead.
     * @type {HTMLAudioElement}
     */
    endboss_hurt_sound = new Audio('assets/audio/chicken-dead.mov');
    
    /**
     * Flag indicating whether the dead sound for the end boss has been played to prevent repetition.
     * @type {boolean}
     */
    endBossDeadSoundPlayed = false;
    
    /**
     * Array of image paths for the end boss alert animation.
     * @type {string[]}
     */
    IMAGES_ENDBOSS_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    
    /**
     * Array of image paths for the end boss walking animation.
     * @type {string[]}
     */
    IMAGES_BOSS_WALKGING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    
    /**
     * Array of image paths for the end boss attacking animation.
     * @type {string[]}
     */
    IMAGES_BOSS_ATTACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    
    /**
     * Array of image paths for the end boss hurt animation.
     * @type {string[]}
     */
    IMAGES_BOSS_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    
    /**
     * Array of image paths for the end boss dead animation.
     * @type {string[]}
     */
    IMAGES_BOSS_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    
    /**
     * Creates an instance of the `Endboss` class.
     * 
     * Initializes the end boss's images, sets its initial position, and starts the animation loop.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGES_ENDBOSS_ALERT[0]); // Load initial alert image
        this.loadImages(this.IMAGES_ENDBOSS_ALERT);
        this.loadImages(this.IMAGES_BOSS_WALKGING);
        this.loadImages(this.IMAGES_BOSS_ATTACK);
        this.loadImages(this.IMAGES_BOSS_HURT);
        this.loadImages(this.IMAGES_BOSS_DEAD);
        this.x = 2400; // Initial horizontal position
        this.animate();
    }
    
    /**
     * Starts the animation loop for the end boss, handling its state-based behaviors and animations.
     * 
     * Sets up an interval that checks the end boss's state and updates its animation and movement accordingly.
     */
    animate() {
        setStoppableInterval(() => {
            if (this.endbossStartsWalking && !this.isDead() && !this.bottleIsColliding) {
                this.playAnimation(this.IMAGES_BOSS_WALKGING);
                this.moveLeft();
                this.speed = 8;
            } else if (this.endbossIsAttacking && !this.isDead() && !this.bottleIsColliding) {
                this.playAnimation(this.IMAGES_BOSS_ATTACK);
                this.moveLeft();
                this.speed = 24;
            } else if (this.bottleIsColliding && !this.isDead()) {
                this.playAnimation(this.IMAGES_BOSS_HURT);
                this.endboss_hurt_sound.play();
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_BOSS_DEAD);
                this.speed = 0;
                this.y += 50;
                if (!this.endBossDeadSoundPlayed) {
                    this.endboss_hurt_sound.play();
                }
                this.endBossDeadSoundPlayed = true;
            } else {
                this.playAnimation(this.IMAGES_ENDBOSS_ALERT);
            }
        }, 100);
    }
}