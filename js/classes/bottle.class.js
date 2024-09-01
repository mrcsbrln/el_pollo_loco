class Bottle extends MovableObject {

    width = 50;
    height = 60;
    bottle_collected_sound = new Audio('assets/audio/bottle-collected.mp3');

    constructor(imagePath, x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(imagePath);
        this.bottle_collected_sound.volume = 0.25;
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}