/**
 * Represents a generic drawable object within the game.
 * Provides foundational properties and methods for rendering, animation, and collision detection.
 */
class DrawableObject {

    /**
     * The horizontal position of the object on the canvas.
     * @type {number}
     */
    x;

    /**
     * The vertical position of the object on the canvas.
     * @type {number}
     */
    y;

    /**
     * The collision offset values for the object.
     * Defines the bounding box for collision detection.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    /**
     * The height of the object in pixels.
     * @type {number}
     */
    height;

    /**
     * The width of the object in pixels.
     * @type {number}
     */
    width;

    /**
     * The image object used for rendering the drawable object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * A cache of loaded images to optimize animation performance.
     * Maps image paths to their corresponding Image objects.
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * The index of the current image in the animation sequence.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Loads a single image from the specified path.
     * Sets the loaded image as the current image for rendering.
     * 
     * @param {string} path - The file path to the image asset.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of image paths.
     * Stores the loaded images in the image cache for efficient access during animations.
     * 
     * @param {string[]} imgPathArray - An array of file paths to the image assets.
     */
    loadImages(imgPathArray) {
        for (const path of imgPathArray) {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        }
    }

    /**
     * Determines if the current object is colliding with another drawable object.
     * Uses bounding box collision detection with applied offsets.
     * 
     * @param {DrawableObject} drawableObject - The other object to check collision against.
     * @returns {boolean} - Returns `true` if colliding, otherwise `false`.
     */
    isColliding(drawableObject) {
        return this.x + this.width - this.offset.right > drawableObject.x + drawableObject.offset.left &&
               this.y + this.height - this.offset.bottom > drawableObject.y + drawableObject.offset.top &&
               this.x + this.offset.left < drawableObject.x + drawableObject.width - drawableObject.offset.right &&
               this.y + this.offset.top < drawableObject.y + drawableObject.height - drawableObject.offset.bottom;
    }

    /**
     * Draws the object on the provided canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a bounding frame around the object for debugging purposes.
     * Only applicable to specific subclasses such as `Character`, `Chicken`, `Chick`, `Endboss`, and `Bottle`.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chick || this instanceof Endboss || this instanceof Bottle) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Plays an animation by cycling through the provided array of image paths.
     * Updates the current image based on the `currentImage` index.
     * 
     * @param {string[]} images - An array of image paths representing the animation frames.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}