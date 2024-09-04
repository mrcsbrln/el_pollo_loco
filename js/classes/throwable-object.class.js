class ThrowableObject extends MovableObject {

    width = 50;
    height = 60;

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}