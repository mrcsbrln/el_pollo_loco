/**
 * Represents the health status bar in the game, extending the base Statusbar class.
 *
 * @extends Statusbar
 */
class StatusbarHealth extends Statusbar {
    
    /**
     * @type {number} - The y-coordinate position of the health status bar.
     */
    y = 0;
    
    /**
     * @type {number} - The current percentage value of the health status bar.
     */
    percentage = 100;
    
    /**
     * @type {string[]} - An array of image paths representing different states of the health status bar.
     */
    IMAGES = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
    
    /**
     * Creates an instance of StatusbarHealth.
     * Loads the health status bar images and sets the initial percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(this.percentage);
    }
}