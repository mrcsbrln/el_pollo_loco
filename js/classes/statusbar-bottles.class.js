/**
 * Represents the status bar for bottles in the game, extending the base Statusbar class.
 */
class StatusbarBottles extends Statusbar {

    /**
     * @type {number} - The y-coordinate position of the status bar.
     */
    y = 80;

    /**
     * @type {number} - The current percentage value of the status bar.
     */
    percentage = 0;

    /**
     * @type {string[]} - An array of image paths representing different states of the bottle status bar.
     */
    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    /**
     * Creates an instance of StatusbarBottles.
     * Loads the status bar images and sets the initial percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(this.percentage);
    }
}