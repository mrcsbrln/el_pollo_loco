class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarCoins = new StatusbarCoins();
    statusbarBottles = new StatusbarBottles();
    coinsCollected = 0;
    bottlesCollected = 0;
    bottles = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.collectCoins();
            this.collectBottles();
            this.throwCollectedBottles();
            this.bottleHitsEnemy();
        }, 50);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround()) {
                    enemy.kill();
                } else if (enemy.dead === false) {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            }
            if (enemy.splicable === true) {
                this.level.enemies.splice(i, 1);
            }
        });
    }

    collectCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin) && this.coinsCollected <= 10) {
                this.level.coins.splice(i, 1);
                this.coinsCollected++;
                this.statusbarCoins.setPercentage(this.coinsCollected * 10)
                coin.coin_collected_sound.play();
            }
        })
    }

    collectBottles() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle) && this.bottlesCollected < 5) {
                this.bottlesCollected++;
                this.level.bottles.splice(i, 1);
                this.statusbarBottles.setPercentage(this.bottlesCollected * 20);
                bottle.bottle_collected_sound.play();
            }
        })
    }

    throwCollectedBottles() {
        if (this.keyboard.D && this.bottlesCollected > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.bottles.push(bottle);
            this.statusbarBottles.setPercentage(this.bottlesCollected * 20 -1);
            this.character.idleTime = 0;
            this.bottlesCollected--;
        }
    }

    bottleHitsEnemy() {
        this.bottles.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                if(bottle.isColliding(enemy)) {
                    enemy.kill();
                    bottle.bottleHitsEnemy = true;
                }
            })
        })     
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToCanvas(this.level.backgroundObjects);
        this.addObjectsToCanvas(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addObjectToCanvas(this.statusbarHealth);
        this.addObjectToCanvas(this.statusbarCoins);
        this.addObjectToCanvas(this.statusbarBottles);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectToCanvas(this.character);
        this.addObjectsToCanvas(this.level.enemies);
        this.addObjectsToCanvas(this.level.coins);
        this.addObjectsToCanvas(this.bottles);
        this.addObjectsToCanvas(this.level.bottles);
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    flipImage(movableObject) {
        this.ctx.save();
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
            this.addObjectToCanvas(object);
        });
    }

    addObjectToCanvas(object) {
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