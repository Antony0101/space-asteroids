import { Sprite_abstract } from "../sprites/sprite";

class Quad_tree<T extends Sprite_abstract> {
    x: number;
    y: number;
    w: number;
    h: number;
    capacity: number;
    data: { sprite: T; point: { x: number; y: number } }[];
    divided: boolean;
    northeast: Quad_tree<T> | null = null;
    northwest: Quad_tree<T> | null = null;
    southeast: Quad_tree<T> | null = null;
    southwest: Quad_tree<T> | null = null;

    constructor(
        boundary: { x: number; y: number; w: number; h: number },
        capacity: number,
    ) {
        this.x = boundary.x;
        this.y = boundary.y;
        this.w = boundary.w;
        this.h = boundary.h;
        this.capacity = capacity;
        this.data = [];
        this.divided = false;
    }

    subdivide() {
        let x = this.x;
        let y = this.y;
        let w = this.w;
        let h = this.h;

        let ne = { x: x + w / 2, y: y, w: w / 2, h: h / 2 };
        this.northeast = new Quad_tree(ne, this.capacity);
        let nw = { x: x, y: y, w: w / 2, h: h / 2 };
        this.northwest = new Quad_tree(nw, this.capacity);
        let se = { x: x + w / 2, y: y + h / 2, w: w / 2, h: h / 2 };
        this.southeast = new Quad_tree(se, this.capacity);
        let sw = { x: x, y: y + h / 2, w: w / 2, h: h / 2 };
        this.southwest = new Quad_tree(sw, this.capacity);
        this.divided = true;
    }

    insert(sprite: T, point: { x: number; y: number }) {
        if (
            this.x > point.x ||
            point.x > this.x + this.w ||
            this.y > point.y ||
            point.y > this.y + this.h
        ) {
            return false;
        }

        if (this.data.length < this.capacity) {
            this.data.push({ sprite, point });
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
            }
            if (this.northwest?.insert(sprite, point)) {
                return true;
            } else if (this.northeast?.insert(sprite, point)) {
                return true;
            } else if (this.southwest?.insert(sprite, point)) {
                return true;
            } else if (this.southeast?.insert(sprite, point)) {
                return true;
            } else {
                return false;
            }
        }
    }

    query(
        range: { x: number; y: number; w: number; h: number },
        found: T[] = [],
    ) {
        if (
            range.x > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y > this.y + this.h ||
            range.y + range.h < this.y - this.h
        ) {
            return found;
        } else {
            for (let p of this.data) {
                if (
                    range.x <= p.point.x &&
                    p.point.x <= range.x + range.w &&
                    range.y <= p.point.y &&
                    p.point.y <= range.y + range.h
                ) {
                    found.push(p.sprite);
                }
            }
            if (this.divided) {
                this.northeast?.query(range, found);
                this.northwest?.query(range, found);
                this.southeast?.query(range, found);
                this.southwest?.query(range, found);
            }

            return found;
        }
    }
}

export { Quad_tree };
