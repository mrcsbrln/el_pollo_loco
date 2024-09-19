class Endboss extends MovableObject {

    bottleIsColliding = false;
    height = 300;
    width = 200;
    y = 150;
    endbossStartsWalking = false;
    endbossIsAttacking = false;
    speed = 4;
    endboss_hurt_sound = new Audio('assets/audio/chicken-dead.mov');
    endBossDeadSoundPlayed = false;

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

    IMAGES_BOSS_WALKGING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

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

    IMAGES_BOSS_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_BOSS_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_ENDBOSS_ALERT[0]);
        this.loadImages(this.IMAGES_ENDBOSS_ALERT);
        this.loadImages(this.IMAGES_BOSS_WALKGING);
        this.loadImages(this.IMAGES_BOSS_ATTACK);
        this.loadImages(this.IMAGES_BOSS_HURT);
        this.loadImages(this.IMAGES_BOSS_DEAD);
        this.x = 2400;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.endbossStartsWalking && !this.isDead() && !this.bottleIsColliding) {
                this.playAnimation(this.IMAGES_BOSS_WALKGING);
                this.moveLeft();
                this.speed = 4;
            } else if (this.endbossIsAttacking && !this.isDead() && !this.bottleIsColliding) {
                this.playAnimation(this.IMAGES_BOSS_ATTACK);
                this.moveLeft();
                this.speed = 16;
            } else if (this.bottleIsColliding && !this.isDead()) {
                this.playAnimation(this.IMAGES_BOSS_HURT);
                this.endboss_hurt_sound.play();
            } else if (this.isDead()) {
                this.playAnimation(this.IMAGES_BOSS_DEAD);
                this.speed = 0;
                this.y += 50;
                if(!this.endBossDeadSoundPlayed) {
                    this.endboss_hurt_sound.play();
                }
                this.endBossDeadSoundPlayed = true;
            } else {
                this.playAnimation(this.IMAGES_ENDBOSS_ALERT);
            }
        }, 100);
    }

}