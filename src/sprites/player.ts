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
    // drawCircle
    fillCircle,
    drawPolygon,
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
        fillPolygon(ctx, [a, b, this.pos, c], this.color);
        fillCircle(ctx, this.pos, (2 * this.radius) / 7, "black");
        // interesting circle
        // const d = b
        //     .copy()
        //     .add(c)
        //     .div(2)
        //     .add(new vector2D(0, 1).mul(this.radius / 2));
        const fireMidPoint = b
            .copy()
            .add(c)
            .div(2)
            .add(new vector2D(0, -this.radius / 4).rotateDeg(this.rotation));
        // this.isAccelerating && drawCircle(ctx, d, this.radius / 2, this.color);

        // interesting triangle
        // const fireA = fireMidPoint
        //     .copy()
        //     .add(forward.copy().mul(this.radius / 2));
        // const fireB = fireMidPoint
        //     .copy()
        //     .sub(forward.copy().mul(this.radius / 2))
        //     .add(right);
        // const fireC = fireMidPoint
        //     .copy()
        //     .sub(forward.copy().mul(this.radius / 2))
        //     .sub(right);
        // fillPolygon(ctx, [fireA, fireB, fireC], "orange");

        const fireB = fireMidPoint
            .copy()
            .add(
                new vector2D(1, 0)
                    .rotateDeg(this.rotation)
                    .mul(this.radius / 3),
            );
        const fireC = fireMidPoint
            .copy()
            .sub(
                new vector2D(1, 0)
                    .rotateDeg(this.rotation)
                    .mul(this.radius / 3),
            );
        const fireA = fireMidPoint
            .copy()
            .add(
                new vector2D(0, -2)
                    .rotateDeg(this.rotation)
                    .mul(this.radius / 2),
            );
        this.isAccelerating &&
            drawPolygon(ctx, [fireA, fireB, fireC], this.color);
        // fillCircle(ctx, fireB, this.radius / 8, "yellow");
        // fillCircle(ctx, fireC, this.radius / 8, "green");
        // fillCircle(ctx, fireA, this.radius / 8, "blue");
        // fillCircle(ctx, fireMidPoint, this.radius / 8, "red");
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

    updateOutsideBounds() {
        if (this.pos.x < 0) this.pos.x = window.innerWidth;
        if (this.pos.x > window.innerWidth) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = window.innerHeight;
        if (this.pos.y > window.innerHeight) this.pos.y = 0;
    }

    update(dt: number) {
        this.isAccelerating = false;
        this.shotCooldown -= dt;
        this.move(dt);
        this.updateOutsideBounds();
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
