/**
 * Represents a cloud object in the game background.
 * Extends the `MovableObject` class to inherit movement and rendering capabilities.
 */
class Cloud extends MovableObject {
    
    /**
     * The vertical position of the cloud on the canvas in pixels.
     * @type {number}
     */
    y = 20;
    
    /**
     * The width of the cloud in pixels.
     * @type {number}
     */
    width = 500;
    
    /**
     * The height of the cloud in pixels.
     * @type {number}
     */
    height = 250;
    
    /**
     * Creates an instance of the `Cloud` class.
     * 
     * Initializes the cloud's image, sets its initial position, and starts its animation.
     * 
     * @param {string} imagePath - The path to the image asset for the cloud.
     * @param {number} x - The initial horizontal position of the cloud on the canvas.
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.animate();
    }
    
    /**
     * Starts the animation loop for the cloud, handling its movement.
     * 
     * Sets up an interval that moves the cloud to the left at a consistent frame rate.
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // Moves the cloud 60 times per second
    }
}