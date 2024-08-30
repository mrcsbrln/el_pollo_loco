class Bottle extends MovableObject {

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.loadImage('assets/img/6_salsa_bottle/bottle_rotation/rotation_sequences.gif');
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}