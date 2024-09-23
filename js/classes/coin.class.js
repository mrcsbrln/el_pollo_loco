class Coin extends DrawableObject {

    width = 100;
    height = 100;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
    IMAGES_COIN = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png',
    ];
    coin_collected_sound = new Audio('assets/audio/coin-collected.mp3');

    constructor(x, y) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.animate();
        this.coin_collected_sound.volume = 0.25;
    }

    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}