import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../utils/constants";
import { drawCircle } from "../utils/shapes";
import Circle_sprite from "./circleSprite";

class Asteroid extends Circle_sprite {
    constructor(x: number, y: number, radius: number) {
        super(x, y, radius, "white");
    }

    draw(ctx: CanvasRenderingContext2D) {
        drawCircle(ctx, this.pos, this.radius, this.color);
    }

    update(dt: number) {
        // if (this.pos.x > SCREEN_WIDTH) {
        //     this.pos.x = 0;
        // }
        // if (this.pos.x < 0) {
        //     this.pos.x = SCREEN_WIDTH;
        // }
        // if (this.pos.y > SCREEN_HEIGHT) {
        //     this.pos.y = 0;
        // }
        // if (this.pos.y < 0) {
        //     this.pos.y = SCREEN_HEIGHT;
        // }
        this.pos.add(this.velocity.copy().mul(dt));
    }
}

export default Asteroid;
