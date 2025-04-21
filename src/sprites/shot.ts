import { SHOT_RADIUS } from "../values/constants";
import Circle_sprite from "./circleSprite";
import DrawArea from "../lib/draw_area/draw_area";

class Shot extends Circle_sprite {
    constructor(x: number, y: number) {
        super(x, y, SHOT_RADIUS, "white");
    }

    update(dt: number) {
        this.pos.add(this.velocity.copy().mul(dt));
    }

    draw() {
        const drawArea = new DrawArea();
        drawArea.strokeCircle(this.pos, this.radius, this.color);
        return drawArea;
    }
}

export default Shot;
