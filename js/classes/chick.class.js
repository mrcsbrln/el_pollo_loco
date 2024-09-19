class Chick extends Chicken {
    y = 385;
    height = 40;
    width = 35;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    IMAGE_DEAD = 'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    chicken_hurt_sound = new Audio('assets/audio/chick-dead.mov');

    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImage(this.IMAGE_DEAD);
        this.x = 200 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        this.chicken_hurt_sound.volume = 0.25;
    }
}