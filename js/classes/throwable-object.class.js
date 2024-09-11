class ThrowableObject extends MovableObject {

    width = 50;
    height = 60;
    imgPath = 'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png';
    IMAGES_BOTTLE = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMAGES_BOTTLE_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    bottleHitEnemy = false;

    constructor(x, y) {
        super();
        this.loadImage(this.imgPath);
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.throw();
        this.animate();
        this.x = x;
        this.y = y;
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    animate() {
        setInterval(() => {
            if (this.bottleHitEnemy && this.isAboveGround()) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_BOTTLE);
            }
        }, 1000/60);
    }
}