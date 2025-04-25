import { SHOT_RADIUS } from "../values/constants";
import Circle_sprite from "./circleSprite";
import DrawArea from "../lib/draw_area/draw_area";

class Shot extends Circle_sprite {
    constructor(x: number, y: number) {
        super(x, y, SHOT_RADIUS, "white");
        this.spriteType = "Shot";
    }

    updateOutsideBounds() {
        if (
            this.pos.x < -(0.1 * window.innerWidth + window.innerWidth / 2) ||
            this.pos.x > window.innerWidth / 2 + 0.1 * window.innerWidth ||
            this.pos.y < -(0.1 * window.innerHeight + window.innerHeight / 2) ||
            this.pos.y > window.innerHeight / 2 + 0.1 * window.innerHeight
        ) {
            this.kill();
        }
    }

    update(dt: number) {
        this.pos.add(this.velocity.copy().mul(dt));
        this.updateOutsideBounds();
    }

    draw() {
        const drawArea = new DrawArea();
        drawArea.strokeCircle(this.pos, this.radius, this.color);
        return drawArea;
    }
}

export default Shot;
