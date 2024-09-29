/**
 * Represents a movable object in the game that can interact with other objects and respond to physics.
 * Extends the DrawableObject class to inherit drawable properties and methods.
 */
class MovableObject extends DrawableObject {
    
    /**
     * @type {number} - The horizontal speed at which the object moves.
     */
    speed = 0.15;
    
    /**
     * @type {boolean} - Indicates if the object is moving in the opposite direction.
     */
    otherDirection = false;
    
    /**
     * @type {number} - The vertical speed of the object.
     */
    speedY = 0;
    
    /**
     * @type {number} - The acceleration applied to the object, affecting its vertical movement.
     */
    acceleration = 2.5;
    
    /**
     * @type {number} - The current energy level of the object.
     */
    energy = 100;

    /**
     * Reduces the energy of the object when it is hit.
     * If the object is an instance of Endboss, it reduces energy by 5.
     * Otherwise, it reduces energy by 1.
     * Ensures that energy does not drop below 0 and updates the last hit time.
     */
    hit() {
        if (this instanceof Endboss) {
            this.energy -= 5;
        } else {
            this.energy -= 1;
        }
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently hurt based on the time since the last hit.
     * 
     * @returns {boolean} - Returns true if the object was hit within the last 500 milliseconds, otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 500;
    }

    /**
     * Determines whether the object is dead based on its energy level.
     * 
     * @returns {boolean} - Returns true if the object's energy is 0, otherwise false.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Moves the object to the right by increasing its x-coordinate based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decreasing its x-coordinate based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Determines if the object is above the ground.
     * 
     * @returns {boolean} - Returns true if the object is an instance of ThrowableObject or its y-coordinate is less than 155, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 155;
        }
    }

    /**
     * Applies gravity to the object, affecting its vertical movement over time.
     * Uses a stoppable interval to continuously update the object's y-coordinate and vertical speed.
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 48);
    }
}