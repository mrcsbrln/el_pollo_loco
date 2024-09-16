class DrawableObject {

    x;
    y;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };
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
        for (const path of imgPathArray) {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        }
    }

    isColliding(drawableObject) {
        return this.x + this.width - this.offset.right > drawableObject.x + drawableObject.offset.left &&
        this.y + this.height - this.offset.bottom > drawableObject.y + drawableObject.offset.top &&
        this.x + this.offset.left < drawableObject.x + drawableObject.width - drawableObject.offset.right &&
        this.y + this.offset.top < drawableObject.y + drawableObject.height - drawableObject.offset.bottom;       
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Chick ||this instanceof Endboss || this instanceof Bottle) {
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
