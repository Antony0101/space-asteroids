import {
    PLAYER_ACCELERATION,
    PLAYER_INERTIA_FACTOR,
    PLAYER_RADIUS,
    PLAYER_SHOOT_COOLDOWN,
    PLAYER_SHOT_SPEED,
    // PLAYER_SPEED,
    PLAYER_TURN_SPEED,
} from "../values/constants";
import { isKeyPressed } from "../utils/keyPressHandler";
import {
    drawCircle,
    // drawPolygon,
    fillPolygon,
} from "../utils/shapes";
import vector2D from "../utils/vector";
import Circle_sprite from "./circleSprite";
import Shot from "./shot";

class Player extends Circle_sprite {
    pos: vector2D;
    rotation: number = 0;
    shotCooldown: number = 0;
    isAccelerating: boolean = false;
    speed: number = 0;

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
        fillPolygon(ctx, [a, b, c], this.color);
        // interesting circle
        // const d = b
        //     .copy()
        //     .add(c)
        //     .div(2)
        //     .add(new vector2D(0, 1).mul(this.radius / 2));
        const d = b
            .copy()
            .add(c)
            .div(2)
            .add(new vector2D(0, -this.radius / 2).rotateDeg(this.rotation));
        this.isAccelerating && drawCircle(ctx, d, this.radius / 2, this.color);
    }

    accelerate(dt: number, isForward: boolean) {
        if (isForward) {
            this.speed += PLAYER_ACCELERATION * dt;
            // this.speed = Math.min(this.speed, PLAYER_SPEED);
        } else {
            this.speed -= PLAYER_ACCELERATION * dt;
            // this.speed = Math.max(this.speed, -PLAYER_SPEED);
        }
    }

    move(dt: number) {
        if (this.speed === 0) return;
        const forward = new vector2D(0, 1).rotateDeg(this.rotation);
        this.pos.add(forward.mul(dt * this.speed));
        if (this.isAccelerating) return;
        if (this.speed > 0) {
            this.speed -= PLAYER_INERTIA_FACTOR * Math.abs(this.speed) * dt;
            this.speed = Math.max(0, this.speed);
        }
        if (this.speed < 0) {
            this.speed += PLAYER_INERTIA_FACTOR * Math.abs(this.speed) * dt;
            this.speed = Math.min(0, this.speed);
        }
    }

    rotate(dt: number) {
        this.rotation += PLAYER_TURN_SPEED * dt;
    }

    update(dt: number) {
        this.isAccelerating = false;
        this.shotCooldown -= dt;
        this.move(dt);
        if (isKeyPressed("KeyW") || isKeyPressed("ArrowUp")) {
            this.isAccelerating = true;
            this.accelerate(dt, true);
        }
        if (isKeyPressed("KeyA") || isKeyPressed("ArrowLeft")) {
            this.rotate(-dt);
        }
        if (isKeyPressed("KeyD") || isKeyPressed("ArrowRight")) {
            this.rotate(dt);
        }
        if (isKeyPressed("KeyS") || isKeyPressed("ArrowDown")) {
            this.isAccelerating = true;
            this.accelerate(dt, false);
        }
        if (isKeyPressed("Space")) {
            this.shot();
        }
    }

    shot() {
        if (this.shotCooldown > 0) return;
        this.shotCooldown = PLAYER_SHOOT_COOLDOWN;
        const shot = new Shot(this.pos.x, this.pos.y);
        shot.velocity = new vector2D(0, 1)
            .rotateDeg(this.rotation)
            .mul(PLAYER_SHOT_SPEED);
    }
}

export default Player;
