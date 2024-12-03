import {
    PLAYER_RADIUS,
    PLAYER_SPEED,
    PLAYER_TURN_SPEED,
} from "../utils/constants";
import { isKeyPressed } from "../utils/keyPressHandler";
import { drawPolygon } from "../utils/shapes";
import vector2D from "../utils/vector";
import Circle_sprite from "./circleSprite";

class Player extends Circle_sprite {
    pos: vector2D;
    rotation: number = 0;

    constructor(x: number, y: number) {
        super(x, y, PLAYER_RADIUS, "white");
        this.pos = new vector2D(x, y);
        this.rotation = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const forward = new vector2D(0, 1).rotateDeg(this.rotation);
        const right = new vector2D(0, 1)
            .rotateDeg(this.rotation + 90)
            .mul(this.radius / 1.5);
        const a = this.pos.copy().add(forward.copy().mul(this.radius));
        const b = this.pos
            .copy()
            .sub(forward.copy().mul(this.radius))
            .add(right);
        const c = this.pos
            .copy()
            .sub(forward.copy().mul(this.radius))
            .sub(right);
        drawPolygon(ctx, [a, b, c], this.color);
    }

    move(dt: number) {
        const forward = new vector2D(0, 1).rotateDeg(this.rotation);
        this.pos.add(forward.mul(dt * PLAYER_SPEED));
    }

    rotate(dt: number) {
        this.rotation += PLAYER_TURN_SPEED * dt;
    }

    update(dt: number) {
        console.log("update");
        if (isKeyPressed("KeyW") || isKeyPressed("ArrowUp")) {
            this.move(dt);
        }
        if (isKeyPressed("KeyA") || isKeyPressed("ArrowLeft")) {
            this.rotate(-dt);
        }
        if (isKeyPressed("KeyD") || isKeyPressed("ArrowRight")) {
            this.rotate(dt);
        }
        if (isKeyPressed("KeyS") || isKeyPressed("ArrowDown")) {
            this.move(-dt);
        }
    }
}

export default Player;
