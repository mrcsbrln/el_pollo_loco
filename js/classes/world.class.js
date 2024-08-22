class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new Statusbar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this; //Frage
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.collectedCoins();
            this.checkThrowObjects();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.killChicken();
                this.level.enemies.splice(i, 1);
            } if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }

    collectedCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                coin.coin_collected_sound.play();
            }
        })
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y +100);
            this.throwableObjects.push(bottle);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToCanvas(this.level.backgroundObjects);
        this.addObjectsToCanvas(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToCanvas(this.statusbar);
        this.ctx.translate(this.camera_x, 0);

        this.addToCanvas(this.character);
        this.addObjectsToCanvas(this.level.enemies);
        this.addObjectsToCanvas(this.level.coins);
        this.addObjectsToCanvas(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    flipImage(movableObject) {
        this.ctx.save();  //Frage
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1
        this.ctx.restore();
    }

    addObjectsToCanvas(objects) {
        objects.forEach(object => {
            this.addToCanvas(object);
        });
    }

    addToCanvas(object) {
        if (object.otherDirection) {
            this.flipImage(object);
        }

        object.draw(this.ctx);
        object.drawFrame(this.ctx);

        if (object.otherDirection) {
            this.flipImageBack(object);
        }
    }
}