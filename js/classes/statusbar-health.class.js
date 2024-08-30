class StatusbarHealth extends Statusbar {

    y = 0;
    percentage = 100;
    IMAGES = [
            'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
            'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
            'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
            'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
            'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
            'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(this.percentage);
    }
}