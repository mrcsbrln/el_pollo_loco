class DrawableObject {

    x;
    y;
    height;
    width;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(imgPathArray) {
        // this.loadImage(imgPathArray[0]);


        // imgPathArray.forEach(path => {
        //     let img = new Image();
        //     img.src = path;
        //     this.imageCache[path] = img; //Frage
        // });
        // <- das gleiche wie unten drunter

        for (const path of imgPathArray) {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        }

        // this.imageCache = imgPathArray.reduce((acc, cur) => {
        //     let img = new Image();
        //     img.src = cur;
        //     return acc[cur] = img
        // }, {});
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
