import vector2D from "./vector";

type Row = [number, number, number];

class Matrix3D {
    data: [Row, Row, Row];
    constructor() {
        this.data = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
    }

    // static methods
    static multiplyMatrix(m1: Matrix3D, m2: Matrix3D) {
        const a =
            m1.data[0][0] * m2.data[0][0] +
            m1.data[0][1] * m2.data[1][0] +
            m1.data[0][2] * m2.data[2][0];
        const b =
            m1.data[0][0] * m2.data[0][1] +
            m1.data[0][1] * m2.data[1][1] +
            m1.data[0][2] * m2.data[2][1];
        const c =
            m1.data[0][0] * m2.data[0][2] +
            m1.data[0][1] * m2.data[1][2] +
            m1.data[0][2] * m2.data[2][2];
        const d =
            m1.data[1][0] * m2.data[0][0] +
            m1.data[1][1] * m2.data[1][0] +
            m1.data[1][2] * m2.data[2][0];
        const e =
            m1.data[1][0] * m2.data[0][1] +
            m1.data[1][1] * m2.data[1][1] +
            m1.data[1][2] * m2.data[2][1];
        const f =
            m1.data[1][0] * m2.data[0][2] +
            m1.data[1][1] * m2.data[1][2] +
            m1.data[1][2] * m2.data[2][2];
        const g =
            m1.data[2][0] * m2.data[0][0] +
            m1.data[2][1] * m2.data[1][0] +
            m1.data[2][2] * m2.data[2][0];
        const h =
            m1.data[2][0] * m2.data[0][1] +
            m1.data[2][1] * m2.data[1][1] +
            m1.data[2][2] * m2.data[2][1];
        const i =
            m1.data[2][0] * m2.data[0][2] +
            m1.data[2][1] * m2.data[1][2] +
            m1.data[2][2] * m2.data[2][2];

        const mat = new Matrix3D();
        mat.updateData(a, b, c, d, e, f, g, h, i);
        return mat;
    }

    // intance methods
    updateData(
        a: number,
        b: number,
        c: number,
        d: number,
        e: number,
        f: number,
        g: number,
        h: number,
        i: number,
    ) {
        this.data = [
            [a, b, c],
            [d, e, f],
            [g, h, i],
        ];
    }

    updateToIdentity() {
        this.updateData(1, 0, 0, 0, 1, 0, 0, 0, 1);
    }

    multiply(m2: Matrix3D) {
        const a =
            this.data[0][0] * m2.data[0][0] +
            this.data[0][1] * m2.data[1][0] +
            this.data[0][2] * m2.data[2][0];
        const b =
            this.data[0][0] * m2.data[0][1] +
            this.data[0][1] * m2.data[1][1] +
            this.data[0][2] * m2.data[2][1];
        const c =
            this.data[0][0] * m2.data[0][2] +
            this.data[0][1] * m2.data[1][2] +
            this.data[0][2] * m2.data[2][2];
        const d =
            this.data[1][0] * m2.data[0][0] +
            this.data[1][1] * m2.data[1][0] +
            this.data[1][2] * m2.data[2][0];
        const e =
            this.data[1][0] * m2.data[0][1] +
            this.data[1][1] * m2.data[1][1] +
            this.data[1][2] * m2.data[2][1];
        const f =
            this.data[1][0] * m2.data[0][2] +
            this.data[1][1] * m2.data[1][2] +
            this.data[1][2] * m2.data[2][2];
        const g =
            this.data[2][0] * m2.data[0][0] +
            this.data[2][1] * m2.data[1][0] +
            this.data[2][2] * m2.data[2][0];
        const h =
            this.data[2][0] * m2.data[0][1] +
            this.data[2][1] * m2.data[1][1] +
            this.data[2][2] * m2.data[2][1];
        const i =
            this.data[2][0] * m2.data[0][2] +
            this.data[2][1] * m2.data[1][2] +
            this.data[2][2] * m2.data[2][2];
        this.updateData(a, b, c, d, e, f, g, h, i);
    }

    multiplyVector2D(point: vector2D) {
        const a =
            this.data[0][0] * point.x +
            this.data[0][1] * point.y +
            this.data[0][2] * 1;
        const b =
            this.data[1][0] * point.x +
            this.data[1][1] * point.y +
            this.data[1][2] * 1;

        return new vector2D(a, b);
    }

    copy() {
        const mat = new Matrix3D();
        mat.updateData(
            this.data[0][0],
            this.data[0][1],
            this.data[0][2],
            this.data[1][0],
            this.data[1][1],
            this.data[1][2],
            this.data[2][0],
            this.data[2][1],
            this.data[2][2],
        );
        return mat;
    }
}

export default Matrix3D;
