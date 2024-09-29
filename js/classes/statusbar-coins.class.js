/**
 * Represents the status bar for coins in the game, extending the base Statusbar class.
 *
 * @extends Statusbar
 */
class StatusbarCoins extends Statusbar {

    /**
     * @type {number} - The y-coordinate position of the status bar.
     */
    y = 40;

    /**
     * @type {number} - The current percentage value of the status bar.
     */
    percentage = 0;

    /**
     * @type {string[]} - An array of image paths representing different states of the coin status bar.
     */
    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    /**
     * Creates an instance of StatusbarCoins.
     * Loads the status bar images and sets the initial percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(this.percentage);
    }
}