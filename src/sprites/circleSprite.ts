import vector2D from "../utils/vector";
import { Sprite_abstract } from "./sprite";

class Circle_sprite extends Sprite_abstract {
    pos: vector2D;
    radius: number;
    color: string;
    velocity: vector2D;

    constructor(x: number, y: number, radius: number, color: string) {
        super();
        this.pos = new vector2D(x, y);
        this.radius = radius;
        this.velocity = new vector2D(0, 0);
        this.color = color;
    }

    isCollided(other: Circle_sprite) {
        return this.pos.distance(other.pos) < this.radius + other.radius;
    }
}

export default Circle_sprite;
