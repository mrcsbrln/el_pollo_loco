class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud
    ];
    backgroundObjects = [
        new BackgroundObject('../assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('../assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('../assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../assets/img/5_background/layers/1_first_layer/1.png', 0),
    ];
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.addObjectsToCanvas(this.backgroundObjects);
        this.addToCanvas(this.character);
        this.addObjectsToCanvas(this.clouds);
        this.addObjectsToCanvas(this.enemies);


        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    addObjectsToCanvas(objects) {
        objects.forEach(object => {
            this.addToCanvas(object);
        });
    }

    addToCanvas(movableObject) {
        this.ctx.drawImage(movableObject.img, movableObject.x,  movableObject.y, movableObject.width, movableObject.height);
    }
}