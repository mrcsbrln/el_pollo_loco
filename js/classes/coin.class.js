class Coin extends DrawableObject {

    width = 100;
    height = 100;
    IMAGES_COIN = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_1.png',
    ]

    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.loadImage('assets/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}