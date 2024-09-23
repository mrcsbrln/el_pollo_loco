class Cloud extends MovableObject{
    
    y = 20;
    width = 500;
    height = 250;

    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60); 
    }
}