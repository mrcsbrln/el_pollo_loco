class StatusbarEndboss extends Statusbar {

    x = 475;
    y = 0;
    percentage = 100;

    IMAGES = [
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(this.percentage);
    }
}