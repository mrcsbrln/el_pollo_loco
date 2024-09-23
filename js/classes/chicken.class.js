class Chicken extends MovableObject {
    y = 370;
    height = 55;
    width = 70;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    dead = false;
    splicable = false;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    chicken_hurt_sound = new Audio('assets/audio/chicken-dead.mov');
    chickenHurtSoundPlayed = false;

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.x = 200 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

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

    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (this.dead === true) {
                this.loadImage(this.IMAGE_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}