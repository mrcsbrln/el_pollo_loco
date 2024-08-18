let level1;

function initLevel() {
    let enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chick(),
        new Chick(),
        new Chick(),
        new Endboss(),
    ];
    let clouds = [
        new Cloud('assets/img/5_background/layers/4_clouds/1.png', 200),
        new Cloud('assets/img/5_background/layers/4_clouds/2.png', 1200),
        new Cloud('assets/img/5_background/layers/4_clouds/1.png', 1600),
        new Cloud('assets/img/5_background/layers/4_clouds/2.png', 2400),
    ];
    let coins = [
        new Coin(200, 100),
        new Coin(300, 100),
    ];
    let backgroundObjects = [
        new BackgroundObject('assets/img/5_background/layers/air.png', -719),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -719),
    
        new BackgroundObject('assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),
    
        new BackgroundObject('assets/img/5_background/layers/air.png', 719),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719),
    
        new BackgroundObject('assets/img/5_background/layers/air.png', 719*2),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 719*2),
    
        new BackgroundObject('assets/img/5_background/layers/air.png', 719*3),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719*3),        
    ];
    
    level1 = new Level( enemies, clouds, coins, backgroundObjects);
}