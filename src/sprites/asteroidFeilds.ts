import {
    ASTEROID_KINDS,
    ASTEROID_MAX_RADIUS,
    ASTEROID_MIN_RADIUS,
    ASTEROID_SPAWN_RATE,
} from "../values/constants";
import { getRandomInt } from "../utils/random";
import vector2D from "../utils/vector";
import Asteroid from "./asteroid";
import { Sprite_abstract } from "./sprite";
import global_Object from "../values/global";

class AsteroidField extends Sprite_abstract {
    spawn_timer: number = 0;
    edges = [
        [
            new vector2D(1, 0),
            (y: number) =>
                new vector2D(
                    -(ASTEROID_MAX_RADIUS + global_Object.screenWidth / 2),
                    y * global_Object.screenHeight,
                ),
        ],
        [
            new vector2D(-1, 0),
            (y: number) =>
                new vector2D(
                    global_Object.screenWidth / 2 + ASTEROID_MAX_RADIUS,
                    y * global_Object.screenHeight,
                ),
        ],
        [
            new vector2D(0, 1),
            (x: number) =>
                new vector2D(
                    x * global_Object.screenWidth,
                    -(ASTEROID_MAX_RADIUS + global_Object.screenHeight / 2),
                ),
        ],
        [
            new vector2D(0, -1),
            (x: number) =>
                new vector2D(
                    x * global_Object.screenWidth,
                    global_Object.screenHeight / 2 + ASTEROID_MAX_RADIUS,
                ),
        ],
    ] as const;

    constructor() {
        super();
        this.spawn_timer = 0;
        this.spriteType = "AsteroidField";
    }

    spawn(radius: number, postion: vector2D, velocity: vector2D) {
        const asteroid = new Asteroid(postion.x, postion.y, radius);
        asteroid.velocity = velocity;
    }

    update(dt: number) {
        this.spawn_timer += dt;
        if (this.spawn_timer > ASTEROID_SPAWN_RATE) {
            this.spawn_timer = 0;
            const edge =
                this.edges[Math.floor(Math.random() * this.edges.length)];
            const speed = getRandomInt(40, 100);
            const velocity = edge[0]
                .copy()
                .mul(speed)
                .rotateDeg(getRandomInt(-30, 30));
            const postion = edge[1](Math.random() - 0.5);
            const kind = getRandomInt(1, ASTEROID_KINDS);
            this.spawn(ASTEROID_MIN_RADIUS * kind, postion, velocity);
        }
    }
}

export default AsteroidField;
