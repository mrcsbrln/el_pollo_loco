class ThrowableObject extends MovableObject {

    width = 50;
    height = 60;
    imgPath = 'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png';

    constructor(x, y) {
        super();
        this.loadImage(this.imgPath);
        this.throw();
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
}