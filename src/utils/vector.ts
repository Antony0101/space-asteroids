class vector2D {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    add(v: vector2D) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    sub(v: vector2D) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    mul(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    div(scalar: number) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }
    rotate(angle: number) {
        let x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        let y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        this.x = x;
        this.y = y;
        return this;
    }
    rotateDeg(angle: number) {
        this.rotate((angle * Math.PI) / 180);
        return this;
    }
    getAngle() {
        return Math.atan2(this.y, this.x);
    }
    getAngleDeg() {
        return (this.getAngle() * 180) / Math.PI;
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    distance(v: vector2D) {
        return Math.sqrt(
            (this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y),
        );
    }
    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    get() {
        return [this.x, this.y];
    }
    copy() {
        return new vector2D(this.x, this.y);
    }
    static add(v1: vector2D, v2: vector2D) {
        return new vector2D(v1.x + v2.x, v1.y + v2.y);
    }
    static sub(v1: vector2D, v2: vector2D) {
        return new vector2D(v1.x - v2.x, v1.y - v2.y);
    }
    static mul(v: vector2D, scalar: number) {
        return new vector2D(v.x * scalar, v.y * scalar);
    }
    static div(v: vector2D, scalar: number) {
        return new vector2D(v.x / scalar, v.y / scalar);
    }
    static rotate(v: vector2D, angle: number) {
        let x = v.x * Math.cos(angle) - v.y * Math.sin(angle);
        let y = v.x * Math.sin(angle) + v.y * Math.cos(angle);
        return new vector2D(x, y);
    }
    static magnitude(v: vector2D) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }
}

export default vector2D;
