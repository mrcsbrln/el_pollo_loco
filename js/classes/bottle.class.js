/**
 * Represents a bottle object in the game that the character can collect.
 * Extends the `DrawableObject` class to inherit rendering capabilities.
 */
class Bottle extends DrawableObject {

    /**
     * The width of the bottle in pixels.
     * @type {number}
     */
    width = 50;

    /**
     * The height of the bottle in pixels.
     * @type {number}
     */
    height = 60;

    /**
     * The sound effect played when the bottle is collected.
     * @type {HTMLAudioElement}
     */
    bottle_collected_sound = new Audio('assets/audio/bottle-collected.mp3');

    /**
     * Creates an instance of the `Bottle` class.
     * 
     * @param {string} imagePath - The path to the image asset for the bottle.
     * @param {number} x - The initial horizontal position of the bottle on the canvas.
     * @param {number} y - The initial vertical position of the bottle on the canvas.
     */
    constructor(imagePath, x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(imagePath);
        this.bottle_collected_sound.volume = 0.15;
    }
}