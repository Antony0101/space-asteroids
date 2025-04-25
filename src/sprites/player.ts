import {
    PLAYER_ACCELERATION,
    PLAYER_COLLIDED_ANIMATION_COOLDOWN,
    PLAYER_INERTIA_FACTOR,
    PLAYER_RADIUS,
    PLAYER_SHOOT_COOLDOWN,
    PLAYER_SHOT_SPEED,
    // PLAYER_SPEED,
    PLAYER_TURN_SPEED,
} from "../values/constants";
import { isKeyPressed } from "../utils/keyPressHandler";

import vector2D from "../utils/vector";
import Circle_sprite from "./circleSprite";
import Shot from "./shot";
import DrawArea from "../lib/draw_area/draw_area";
import { getRandomInt } from "../utils/random";

const shipImage = new Image();

shipImage.src = "/ship.svg";

class Player extends Circle_sprite {
    pos: vector2D;
    rotation: number = 0;
    shotCooldown: number = 0;
    isAccelerating: boolean = false;
    speed: number = 0;
    isPlayerCollided: boolean = false;
    isPlayerCollidedAimationPending: boolean = true;
    collideAccelerationCooldown: number = PLAYER_COLLIDED_ANIMATION_COOLDOWN;
    fires = {
        accelerate: true,
        sideleft: 90,
        sideright: 270,
    };

    constructor(x: number, y: number) {
        super(x, y, PLAYER_RADIUS, "white");
        this.pos = new vector2D(x, y);
        this.rotation = 180;
        this.spriteType = "Player";
    }

    draw() {
        const drawArea = new DrawArea();
        const imageArea = new DrawArea();
        imageArea.drawImage(
            shipImage,
            new vector2D(-25, -25),
            50,
            50,
            ((this.rotation + 180) * Math.PI) / 180,
        );
        drawArea.addDrawArea(imageArea, this.pos);
        function getFirePoints(
            pos: vector2D,
            rotation: number,
            radius: number,
        ) {
            const forward = new vector2D(0, 1).rotateDeg(rotation);
            const right = new vector2D(0, 1)
                .rotateDeg(rotation + 90)
                .mul(radius / 1.5);
            const b = pos.copy().sub(forward.copy().mul(radius)).add(right);
            const c = pos.copy().sub(forward.copy().mul(radius)).sub(right);

            const fireMidPoint = b
                .copy()
                .add(c)
                .div(2)
                .add(new vector2D(0, radius / 4).rotateDeg(rotation));

            const fireB = fireMidPoint
                .copy()
                .add(new vector2D(1, 0).rotateDeg(rotation).mul(radius / 3));
            const fireC = fireMidPoint
                .copy()
                .sub(new vector2D(1, 0).rotateDeg(rotation).mul(radius / 3));
            const fireA = fireMidPoint
                .copy()
                .add(new vector2D(0, -2).rotateDeg(rotation).mul(radius / 2));
            return [fireA, fireB, fireC];
        }

        ((this.isPlayerCollided && this.fires.accelerate) ||
            (!this.isPlayerCollided && this.isAccelerating)) &&
            drawArea.strokePolygon(
                getFirePoints(this.pos, this.rotation, this.radius),
                this.color,
            );
        this.isPlayerCollided &&
            this.fires.sideright &&
            drawArea.strokePolygon(
                getFirePoints(
                    this.pos,
                    this.rotation + this.fires.sideright,
                    this.radius,
                ),
                this.color,
            );
        this.isPlayerCollided &&
            this.fires.sideleft &&
            drawArea.strokePolygon(
                getFirePoints(
                    this.pos,
                    this.rotation + this.fires.sideleft,
                    this.radius,
                ),
                this.color,
            );
        return drawArea;
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
        if (this.pos.x < -window.innerWidth / 2)
            this.pos.x = window.innerWidth / 2;
        if (this.pos.x > window.innerWidth / 2) this.pos.x = -window.innerWidth;
        if (this.pos.y < -window.innerHeight / 2)
            this.pos.y = window.innerHeight / 2;
        if (this.pos.y > window.innerHeight / 2)
            this.pos.y = -window.innerHeight / 2;
    }

    playerCollidedAnimation(dt: number) {
        // fallback if the logic fails
        if (
            this.pos.x < -(0.2 * window.innerWidth + window.innerWidth / 2) ||
            this.pos.x > window.innerWidth / 2 + 0.2 * window.innerWidth ||
            this.pos.y < -(0.2 * window.innerHeight + window.innerHeight / 2) ||
            this.pos.y > window.innerHeight / 2 + 0.2 * window.innerHeight
        ) {
            this.kill();
        }
        // collided animation logic
        if (this.rotation % 360 > 1) {
            this.rotate(this.rotation % 360 <= 180 ? -dt / 4 : dt / 4);
        }
        if (this.collideAccelerationCooldown < 0) {
            this.fires.accelerate = getRandomInt(0, 1) === 0 ? false : true;
            this.fires.sideleft = getRandomInt(0, 10) * 36;
            this.fires.sideright = getRandomInt(0, 10) * 36;
            this.collideAccelerationCooldown =
                PLAYER_COLLIDED_ANIMATION_COOLDOWN;
        }
        if (this.pos.y < window.innerHeight / 2) {
            this.accelerate(dt / 2, true);
            this.move(dt);
            return;
        }
        this.isPlayerCollidedAimationPending = false;
    }

    update(dt: number) {
        if (this.isPlayerCollided) {
            this.isAccelerating = false;
            this.collideAccelerationCooldown -= dt;
            this.playerCollidedAnimation(dt);
            return;
        }
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
