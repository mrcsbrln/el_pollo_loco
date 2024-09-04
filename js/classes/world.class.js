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
        this.character.world = this; //Frage
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.collectCoins();
            this.collectBottles();
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
            if (this.character.isColliding(bottle) && this.bottles.length < 5) {
                this.level.bottles.splice(i, 1);
                this.bottles.push(new ThrowableObject());
                this.statusbarBottles.setPercentage(this.bottles.length * 20);
                bottle.bottle_collected_sound.play();
            }
        })
    }

    // checkThrowBottles() {
    //     if (this.keyboard.D && this.bottles.length > 0) {
    //         let bottle = new Bottle('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', this.character.x + 100, this.character.y +100);
    //         bottle.throw();
    //         this.bottleHitsEnemy(bottle);
    //         this.bottles.push(bottle);
    //         this.statusbarBottles.setPercentage(this.bottles.length * 21);
    //         this.character.idleTime = 0;
    //     }
    // }

    // bottleHitsEnemy(bottle) {
    //     this.level.enemies.forEach(enemy => {
    //         if(bottle.isColliding(enemy)){
    //             enemy.kill();
    //         }
    //     })
    // }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToCanvas(this.level.backgroundObjects);
        this.addObjectsToCanvas(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToCanvas(this.statusbarHealth);
        this.addToCanvas(this.statusbarCoins);
        this.addToCanvas(this.statusbarBottles);
        this.ctx.translate(this.camera_x, 0);

        this.addToCanvas(this.character);
        this.addObjectsToCanvas(this.level.enemies);
        this.addObjectsToCanvas(this.level.coins);
        if(false) {
            this.addObjectsToCanvas(this.bottles);
        }
        this.addObjectsToCanvas(this.level.bottles);
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