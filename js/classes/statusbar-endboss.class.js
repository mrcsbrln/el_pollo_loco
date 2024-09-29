/**
 * Represents the status bar for the Endboss in the game, extending the base Statusbar class.
 *
 * @extends Statusbar
 */
class StatusbarEndboss extends Statusbar {

    /**
     * @type {number} - The x-coordinate position of the status bar.
     */
    x = 475;

    /**
     * @type {number} - The y-coordinate position of the status bar.
     */
    y = 0;

    /**
     * @type {number} - The current percentage value of the status bar.
     */
    percentage = 100;

    /**
     * @type {string[]} - An array of image paths representing different states of the Endboss status bar.
     */
    IMAGES = [
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    /**
     * Creates an instance of StatusbarEndboss.
     * Loads the status bar images and sets the initial percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(this.percentage);
    }
}