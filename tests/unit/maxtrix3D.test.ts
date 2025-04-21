import { describe, expect, test } from "vitest";
import Matrix3D from "../../src/utils/matrix3D";
import vector2D from "../../src/utils/vector";

describe("3x3 matrix tests", () => {
    test("matrix initial state test", () => {
        const matrix = new Matrix3D();
        expect(matrix.data).toEqual([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
    });

    test("matrix update test", () => {
        const matrix = new Matrix3D();
        matrix.updateData(2, 3, 5, 1, 3, 2, 8, 4, 1);
        expect(matrix.data).toEqual([
            [2, 3, 5],
            [1, 3, 2],
            [8, 4, 1],
        ]);
    });

    test("matrix copy test", () => {
        const matrix = new Matrix3D();
        matrix.updateData(2, 3, 5, 1, 3, 2, 8, 4, 2);
        const copymat = matrix.copy();
        matrix.updateData(1, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(matrix.data).toEqual([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
        expect(copymat.data).toEqual([
            [2, 3, 5],
            [1, 3, 2],
            [8, 4, 2],
        ]);
    });

    test("matrix identity test", () => {
        const matrix = new Matrix3D();
        matrix.updateToIdentity();
        expect(matrix.data).toEqual([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ]);
    });

    test("matrix multiplication test static", () => {
        const matrix = new Matrix3D();
        matrix.updateData(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const matrix2 = new Matrix3D();
        matrix2.updateData(9, 8, 7, 6, 5, 4, 3, 2, 1);
        const result = Matrix3D.multiplyMatrix(matrix, matrix2);
        expect(result.data).toEqual([
            [30, 24, 18],
            [84, 69, 54],
            [138, 114, 90],
        ]);
    });

    test("matrix multiplication test instance", () => {
        const matrix = new Matrix3D();
        matrix.updateData(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const matrix2 = new Matrix3D();
        matrix2.updateData(9, 8, 7, 6, 5, 4, 3, 2, 1);
        matrix.multiply(matrix2);
        expect(matrix.data).toEqual([
            [30, 24, 18],
            [84, 69, 54],
            [138, 114, 90],
        ]);
    });

    test("matrix multiplication with 2d identity", () => {
        const matrix = new Matrix3D();
        matrix.updateData(1, 0, 0, 0, 1, 0, 0, 0, 1);
        const point = new vector2D(3, 4);
        const result = matrix.multiplyVector2D(point);
        expect(result).toEqual(new vector2D(3, 4));
    });

    test("matrix multiplication with 2d translation", () => {
        const matrix = new Matrix3D();
        matrix.updateData(1, 0, 5, 0, 1, -2, 0, 0, 1);
        const point = new vector2D(1, 2);
        const result = matrix.multiplyVector2D(point);
        expect(result).toEqual(new vector2D(6, 0));
    });

    test("matrix multiplication with 2d scale", () => {
        const matrix = new Matrix3D();
        matrix.updateData(2, 0, 0, 0, 3, 0, 0, 0, 1);
        const point = new vector2D(1, 1);
        const result = matrix.multiplyVector2D(point);
        expect(result).toEqual(new vector2D(2, 3));
    });
});
