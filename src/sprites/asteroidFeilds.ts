import {
    ASTEROID_KINDS,
    ASTEROID_MAX_RADIUS,
    ASTEROID_MIN_RADIUS,
    ASTEROID_SPAWN_RATE,
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
} from "../utils/constants";
import { getRandomInt } from "../utils/random";
import vector2D from "../utils/vector";
import Asteroid from "./asteroid";
import { Sprite_abstract } from "./sprite";

class AsteroidField extends Sprite_abstract {
    spawn_timer: number = 0;
    edges = [
        [
            new vector2D(1, 0),
            (y: number) =>
                new vector2D(-ASTEROID_MAX_RADIUS, y * SCREEN_HEIGHT),
        ],
        [
            new vector2D(-1, 0),
            (y: number) =>
                new vector2D(
                    SCREEN_WIDTH + ASTEROID_MAX_RADIUS,
                    y * SCREEN_HEIGHT,
                ),
        ],
        [
            new vector2D(0, 1),
            (x: number) => new vector2D(x * SCREEN_WIDTH, -ASTEROID_MAX_RADIUS),
        ],
        [
            new vector2D(0, -1),
            (x: number) =>
                new vector2D(
                    x * SCREEN_WIDTH,
                    SCREEN_HEIGHT + ASTEROID_MAX_RADIUS,
                ),
        ],
    ] as const;

    constructor() {
        super();
        this.spawn_timer = 0;
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
            const postion = edge[1](Math.random());
            const kind = getRandomInt(1, ASTEROID_KINDS);
            this.spawn(ASTEROID_MIN_RADIUS * kind, postion, velocity);
        }
    }
}

export default AsteroidField;
