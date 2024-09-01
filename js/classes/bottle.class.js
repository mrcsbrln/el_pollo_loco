class Bottle extends MovableObject {

    width = 50;
    height = 60;

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('assets/img/6_salsa_bottle/bottle_rotation/rotation_sequences.gif');
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}