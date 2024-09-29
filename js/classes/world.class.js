/**
 * Represents the main game world, handling game logic, rendering, and interactions.
 */
class World {

    /**
     * The main character of the game.
     * @type {Character}
     */
    character = new Character();

    /**
     * The current level of the game.
     * @type {Level}
     */
    level = level1;

    /**
     * The HTML canvas element where the game is rendered.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The 2D rendering context for the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * An instance of the Keyboard class to track user input.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * The current x-coordinate of the camera for scrolling.
     * @type {number}
     */
    camera_x = 0;

    /**
     * The ID of the interval running the game loop.
     * @type {number}
     */
    runIntervall;

    /**
     * Status bar for displaying the character's health.
     * @type {StatusbarHealth}
     */
    statusbarHealth = new StatusbarHealth();

    /**
     * Status bar for displaying the number of coins collected.
     * @type {StatusbarCoins}
     */
    statusbarCoins = new StatusbarCoins();

    /**
     * Status bar for displaying the number of bottles collected.
     * @type {StatusbarBottles}
     */
    statusbarBottles = new StatusbarBottles();

    /**
     * Status bar for displaying the endboss's health.
     * @type {StatusbarEndboss}
     */
    statusbarEndboss = new StatusbarEndboss();

    /**
     * The number of coins collected by the character.
     * @type {number}
     */
    coinsCollected = 0;

    /**
     * The number of bottles collected by the character.
     * @type {number}
     */
    bottlesCollected = 0;

    /**
     * An array of throwable bottle objects.
     * @type {ThrowableObject[]}
     */
    bottles = [];

    /**
     * Flag to prevent multiple bottle throws within a short time.
     * @type {boolean}
     */
    throwTimeout = false;

    /**
     * The endboss enemy, assumed to be the last enemy in the level's enemies array.
     * @type {Endboss}
     */
    endboss = this.level.enemies[this.level.enemies.length - 1];

    /**
     * Creates an instance of the World class.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
     * @param {Keyboard} keyboard - An instance of the Keyboard class to track user input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world reference in the character.
     * 
     * This allows the character to access the world instance for interactions.
     * 
     * @returns {void}
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop by setting up a stoppable interval.
     * 
     * The game loop runs every 50 milliseconds, handling collisions, item collection,
     * bottle throwing, enemy interactions, and endboss attacks.
     * 
     * @returns {void}
     */
    run() {
        this.runIntervall = setStoppableInterval(() => {
            this.checkCollisions();
            this.collectCoins();
            this.collectBottles();
            this.throwCollectedBottles();
            this.bottleHitsEnemy();
            this.initiateEndbossAttack();
            this.spliceDeadChicken();
            this.characterPassEndboss();
        }, 50);
    }

    /**
     * Checks for collisions between the character and enemies.
     * 
     * If a collision is detected, it handles the interaction based on the character's position
     * and the type of enemy.
     * 
     * @returns {void}
     */
    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.handleCollisions(enemy);
            }
        });
    }

    /**
     * Removes dead enemies from the enemies array.
     * 
     * Iterates through the enemies and splices out any that are marked as splicable.
     * 
     * @returns {void}
     */
    spliceDeadChicken() {
        this.level.enemies.forEach((enemy, i) => {
            if (enemy.splicable) {
                this.level.enemies.splice(i, 1);
            }
        });
    }

    /**
     * Handles the collision logic between the character and a specific enemy.
     * 
     * If the character is above ground and the enemy is not an endboss, the enemy is killed.
     * Otherwise, if the enemy is still alive, the character takes a hit.
     * 
     * @param {Enemy} enemy - The enemy involved in the collision.
     * @returns {void}
     */
    handleCollisions(enemy) {
        if (this.character.isAboveGround() && !(enemy instanceof Endboss)) {
            enemy.kill();
        } else if (!enemy.dead) {
            this.hitCharater();
        }
    }

    /**
     * Applies damage to the character and updates the health status bar.
     * 
     * @returns {void}
     */
    hitCharater() {
        this.character.hit();
        this.statusbarHealth.setPercentage(this.character.energy);
    }

    /**
     * Checks if the character has passed the endboss and sets the character's energy to zero.
     * 
     * This effectively ends the game if the character bypasses the endboss.
     * 
     * @returns {void}
     */
    characterPassEndboss() {
        if (this.character.x > this.endboss.x) {
            this.character.energy = 0;
        }
    }

    /**
     * Collects coins when the character collides with them.
     * 
     * Increments the coins collected count, updates the coins status bar,
     * and plays the coin collection sound.
     * 
     * @returns {void}
     */
    collectCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin) && this.coinsCollected <= 10) {
                this.level.coins.splice(i, 1);
                this.coinsCollected++;
                this.statusbarCoins.setPercentage(this.coinsCollected * 10);
                coin.coin_collected_sound.play();
            }
        });
    }

    /**
     * Collects bottles when the character collides with them.
     * 
     * Increments the bottles collected count, updates the bottles status bar,
     * and plays the bottle collection sound.
     * 
     * @returns {void}
     */
    collectBottles() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle) && this.bottlesCollected < 5) {
                this.bottlesCollected++;
                this.level.bottles.splice(i, 1);
                this.statusbarBottles.setPercentage(this.bottlesCollected * 20);
                bottle.bottle_collected_sound.play();
            }
        });
    }

    /**
     * Handles the logic for throwing collected bottles.
     * 
     * If the 'D' key is pressed, bottles are available, and no throw timeout is active,
     * a new throwable bottle is created and added to the bottles array.
     * The bottles status bar is updated, and a timeout is set to prevent immediate re-throws.
     * 
     * @returns {void}
     */
    throwCollectedBottles() {
        if (this.keyboard.D && this.bottlesCollected > 0 && !this.throwTimeout) {
            this.throwTimeout = true;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.bottles.push(bottle);
            this.statusbarBottles.setPercentage(this.bottlesCollected * 20 - 1);
            this.character.idleTime = 0;
            this.bottlesCollected--;
            setTimeout(() => {
                this.throwTimeout = false;
            }, 1000);
        }
    }

    /**
     * Checks if any thrown bottles collide with enemies.
     * 
     * If a collision is detected with a non-endboss enemy, the enemy is killed.
     * If a collision is detected with the endboss, the endboss takes damage and its status bar is updated.
     * 
     * @returns {void}
     */
    bottleHitsEnemy() {
        this.bottles.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                if (bottle.isColliding(enemy) && !(enemy instanceof Endboss)) {
                    enemy.kill();
                    bottle.bottleHitsEnemy = true;
                }
                if (bottle.isColliding(enemy) && (enemy instanceof Endboss)) {
                    this.endboss.hit();
                    this.statusbarEndboss.setPercentage(this.endboss.energy);
                    this.endboss.bottleIsColliding = true;
                } else {
                    this.endboss.bottleIsColliding = false;
                }
            });
        });
    }

    /**
     * Initiates the endboss's attack behavior based on the character's position.
     * 
     * - Starts the endboss walking when the character reaches a certain x-coordinate.
     * - Triggers the endboss's attacking state when within a specific range.
     * - Resets the attacking state if the character moves out of range.
     * 
     * @returns {void}
     */
    initiateEndbossAttack() {
        if (this.character.x >= 1800) {
            this.endboss.endbossStartsWalking = true;
        }
        if ((this.endboss.x - this.character.x) < 400) {
            this.endboss.endbossIsAttacking = true;
            this.endboss.endbossStartsWalking = false;
        }
        if ((this.endboss.x - this.character.x) > 400 && (this.endboss.x - this.character.x) < 500) {
            this.endboss.endbossIsAttacking = false;
            this.endboss.endbossStartsWalking = true;
        }
    }

    /**
     * Renders all game objects onto the canvas.
     * 
     * The method clears the canvas, applies camera transformations, and draws
     * background objects, status bars, the character, enemies, coins, and bottles.
     * It uses `requestAnimationFrame` for efficient rendering.
     * 
     * @returns {void}
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToCanvas(this.level.backgroundObjects);
        this.addObjectsToCanvas(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addObjectToCanvas(this.statusbarHealth);
        this.addObjectToCanvas(this.statusbarCoins);
        this.addObjectToCanvas(this.statusbarBottles);
        if (this.endboss.endbossStartsWalking || this.endboss.endbossIsAttacking) {
            this.addObjectToCanvas(this.statusbarEndboss);
        }
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

    /**
     * Flips the image of a movable object horizontally.
     * 
     * This is useful for rendering sprites facing the opposite direction.
     * 
     * @param {MovableObject} movableObject - The object whose image is to be flipped.
     * @returns {void}
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * Restores the image orientation of a movable object after flipping.
     * 
     * @param {MovableObject} movableObject - The object whose image orientation is to be restored.
     * @returns {void}
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }

    /**
     * Adds multiple objects to the canvas by iterating through the provided array.
     * 
     * @param {Object[]} objects - An array of objects to be drawn on the canvas.
     * @returns {void}
     */
    addObjectsToCanvas(objects) {
        objects.forEach(object => {
            this.addObjectToCanvas(object);
        });
    }

    /**
     * Adds a single object to the canvas, handling image flipping if necessary.
     * 
     * This method draws the object and its animation frame, and manages the context
     * transformations required for directional sprites.
     * 
     * @param {Object} object - The object to be drawn on the canvas.
     * @returns {void}
     */
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