import { ASTEROID_MIN_RADIUS } from "../values/constants";
import { getRandomInt } from "../utils/random";
import Circle_sprite from "./circleSprite";
import DrawArea from "../lib/draw_area/draw_area";

class Asteroid extends Circle_sprite {
    constructor(x: number, y: number, radius: number) {
        super(x, y, radius, "white");
    }

    draw() {
        const drawArea = new DrawArea();
        drawArea.strokeCircle(this.pos, this.radius, this.color);
        return drawArea;
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
        // if (this.pos.x > global_Object.screenWidth) {
        //     this.pos.x = 0;
        // }
        // if (this.pos.x < 0) {
        //     this.pos.x = global_Object.screenWidth;
        // }
        // if (this.pos.y > global_Object.screenHeight) {
        //     this.pos.y = 0;
        // }
        // if (this.pos.y < 0) {
        //     this.pos.y = global_Object.screenHeight;
        // }
        this.pos.add(this.velocity.copy().mul(dt));
        this.updateOutsideBounds();
    }

    split() {
        this.kill();
        if (this.radius <= ASTEROID_MIN_RADIUS) {
            return;
        }
        const angle = getRandomInt(20, 50);
        const vec1 = this.velocity.copy().rotateDeg(angle);
        const vec2 = this.velocity.copy().rotateDeg(-angle);
        const radius = this.radius - ASTEROID_MIN_RADIUS;
        const asteroid1 = new Asteroid(this.pos.x, this.pos.y, radius);
        asteroid1.velocity = vec1.mul(1.2);
        const asteroid2 = new Asteroid(this.pos.x, this.pos.y, radius);
        asteroid2.velocity = vec2.mul(1.2);
    }
}

export default Asteroid;
