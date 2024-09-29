/**
 * Represents a background object in the game, such as clouds or scenery elements.
 * Extends the `MovableObject` class to inherit movement and rendering capabilities.
 */
class BackgroundObject extends MovableObject {

    /**
     * The width of the background object in pixels.
     * @type {number}
     */
    width = 720;

    /**
     * The height of the background object in pixels.
     * @type {number}
     */
    height = 480;

    /**
     * Creates an instance of the `BackgroundObject` class.
     * 
     * @param {string} imagePath - The path to the image asset for the background object.
     * @param {number} x - The initial horizontal position of the background object on the canvas.
     */
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}