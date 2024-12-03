import { SHOT_RADIUS } from "../utils/constants";
import { drawCircle } from "../utils/shapes";
import Circle_sprite from "./circleSprite";

class Shot extends Circle_sprite {
    constructor(x: number, y: number) {
        super(x, y, SHOT_RADIUS, "white");
    }

    update(dt: number) {
        this.pos.add(this.velocity.copy().mul(dt));
    }

    draw(ctx: CanvasRenderingContext2D) {
        drawCircle(ctx, this.pos, this.radius, this.color);
    }
}

export default Shot;
