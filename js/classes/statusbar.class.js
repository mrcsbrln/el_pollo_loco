/**
 * Represents a generic status bar in the game, extending the DrawableObject class.
 *
 * @extends DrawableObject
 */
class Statusbar extends DrawableObject {
    
    /**
     * @type {number} - The x-coordinate position of the status bar.
     */
    x = 25;
    
    /**
     * @type {number} - The width of the status bar.
     */
    width = 150;
    
    /**
     * @type {number} - The height of the status bar.
     */
    height = 40;
    
    /**
     * Sets the percentage value of the status bar and updates its corresponding image.
     *
     * @param {number} percentage - The new percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    /**
     * Determines the index of the image to display based on the current percentage.
     *
     * @returns {number} - The index of the image corresponding to the current percentage.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}