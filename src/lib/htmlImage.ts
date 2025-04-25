class HtmlImage {
    image: HTMLImageElement;
    imageLoaded = false;
    constructor(src: string) {
        this.image = new Image();
        this.image.src = src;
        this.image.onload = () => {
            this.imageLoaded = true;
        };
    }
}

export default HtmlImage;
