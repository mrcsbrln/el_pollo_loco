class Character extends MovableObject {

    height = 280;
    width = 130;
    y = 55;
    speed = 8;
    idleTime = 0;
    IMAGES_WALKING = [
        '../assets/img/2_character_pepe/2_walk/W-21.png',
        '../assets/img/2_character_pepe/2_walk/W-22.png',
        '../assets/img/2_character_pepe/2_walk/W-23.png',
        '../assets/img/2_character_pepe/2_walk/W-24.png',
        '../assets/img/2_character_pepe/2_walk/W-25.png',
        '../assets/img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        '../assets/img/2_character_pepe/3_jump/J-31.png',
        '../assets/img/2_character_pepe/3_jump/J-32.png',
        '../assets/img/2_character_pepe/3_jump/J-33.png',
        '../assets/img/2_character_pepe/3_jump/J-34.png',
        '../assets/img/2_character_pepe/3_jump/J-35.png',
        '../assets/img/2_character_pepe/3_jump/J-36.png',
        '../assets/img/2_character_pepe/3_jump/J-37.png',
        '../assets/img/2_character_pepe/3_jump/J-38.png',
        '../assets/img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_HURT = [
        '../assets/img/2_character_pepe/4_hurt/H-41.png',
        '../assets/img/2_character_pepe/4_hurt/H-42.png',
        '../assets/img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_DEAD = [
        '../assets/img/2_character_pepe/5_dead/D-51.png',
        '../assets/img/2_character_pepe/5_dead/D-52.png',
        '../assets/img/2_character_pepe/5_dead/D-53.png',
        '../assets/img/2_character_pepe/5_dead/D-54.png',
        '../assets/img/2_character_pepe/5_dead/D-55.png',
        '../assets/img/2_character_pepe/5_dead/D-56.png',
        '../assets/img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_IDLE = [
        '../assets/img/2_character_pepe/1_idle/idle/I-1.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-2.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-3.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-4.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-5.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-6.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-7.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-8.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-9.png',
        '../assets/img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONG_IDLE = [
        '../assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../assets/img/2_character_pepe/1_idle/long_idle/I-20.png',  
    ];
    world;
    walking_sound = new Audio('../assets/audio/walking.mov');
    jumping_sound = new Audio('../assets/audio/jumping.mp3');
    snoring_sound = new Audio('../assets/audio/snoring.mp3');
    hurt_sounds = [
        new Audio('../assets/audio/hurt1.mov'),
        new Audio('../assets/audio/hurt2.mov'),
        new Audio('../assets/audio/hurt3.mov'),
    ];
    hurtSoundPlayed = false;

    constructor() {
        super();
        this.loadImage('../assets/img/2_character_pepe/2_walk/W-21.png');
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

    idle() {
        setInterval(() => {
            if (this.idleTime >= 10000) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
                this.snoring_sound.play();
            } else {
                this.playAnimation(this.IMAGES_IDLE);
                this.snoring_sound.pause();
                this.snoring_sound.currentTime = 0;
             }
            this.idleTime += 250;
        }, 250);
    }

    walkingSound() {
        if (this.world.keyboard.LEFT && !this.isAboveGround()) {
            this.walking_sound.play();
        }
        if (this.world.keyboard.RIGHT && !this.isAboveGround()) {
            this.walking_sound.play();
        }
    }

    hurtSound() {
        if (!this.hurtSoundPlayed) {
            let i = Math.floor(Math.random() * 3);
            this.hurt_sounds[i].volume = 0.5;
            this.hurt_sounds[i].play();
            this.hurtSoundPlayed = true;
        }
    }

    hurtCharcter() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.hurtSound();
            this.idleTime = 0;
        }
    }

    animate() {

        setInterval(() => {
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

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.idleTime = 0;
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.idleTime = 0;
            } 
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.idleTime = 0;
            } 
            else if (!this.isHurt()) {
                this.hurtSoundPlayed = false;
            }
            this.hurtCharcter();
        }, 50);
        this.idle();
    }

    jump() {
        this.speedY = 30;
    }
}