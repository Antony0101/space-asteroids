import { describe, test, expect } from "vitest";
import { Quad_tree } from "../../src/lib/quadTree";
import { Sprite_abstract } from "../../src/sprites/sprite";

describe("QuadTree Unit Tests", () => {
    test("QuadTree initial state", () => {
        const quadTree = new Quad_tree({ x: 0, y: 0, w: 100, h: 100 }, 4);
        expect(quadTree.data).toEqual([]);
        expect(quadTree.divided).toBe(false);
        expect(quadTree.capacity).toBe(4);
        expect(quadTree.x).toBe(0);
        expect(quadTree.y).toBe(0);
        expect(quadTree.w).toBe(100);
        expect(quadTree.h).toBe(100);
        expect(quadTree.northeast).toBe(null);
        expect(quadTree.northwest).toBe(null);
        expect(quadTree.southeast).toBe(null);
        expect(quadTree.southwest).toBe(null);
    });
    test("QuadTree subdivide", () => {
        const quadTree = new Quad_tree({ x: 0, y: 0, w: 100, h: 100 }, 4);
        quadTree.subdivide();
        expect(quadTree.northeast).not.toBe(null);
        expect(quadTree.northwest).not.toBe(null);
        expect(quadTree.southeast).not.toBe(null);
        expect(quadTree.southwest).not.toBe(null);
        expect(quadTree.divided).toBe(true);
        // Check the subdivide boundaries north west
        expect(quadTree.northwest?.x).toBe(0);
        expect(quadTree.northwest?.y).toBe(0);
        expect(quadTree.northwest?.w).toBe(50);
        expect(quadTree.northwest?.h).toBe(50);
        // Check the subdivide boundaries north east
        expect(quadTree.northeast?.x).toBe(50);
        expect(quadTree.northeast?.y).toBe(0);
        expect(quadTree.northeast?.w).toBe(50);
        expect(quadTree.northeast?.h).toBe(50);
        // Check the subdivide boundaries south west
        expect(quadTree.southwest?.x).toBe(0);
        expect(quadTree.southwest?.y).toBe(50);
        expect(quadTree.southwest?.w).toBe(50);
        expect(quadTree.southwest?.h).toBe(50);
        // Check the subdivide boundaries south east
        expect(quadTree.southeast?.x).toBe(50);
        expect(quadTree.southeast?.y).toBe(50);
        expect(quadTree.southeast?.w).toBe(50);
        expect(quadTree.southeast?.h).toBe(50);
    });
    test("QuadTree insert", () => {
        const quadTree = new Quad_tree({ x: 0, y: 0, w: 100, h: 100 }, 4);
        const sprite = new Sprite_abstract();
        quadTree.insert(sprite, { x: 0, y: 0 });
        quadTree.insert(sprite, { x: 1, y: 2 });
        expect(quadTree.data.length).toBe(2);
        expect(quadTree.data[0].sprite).toBe(sprite);
        expect(quadTree.data[0].point).toEqual({ x: 0, y: 0 });
        expect(quadTree.data[1].sprite).toBe(sprite);
        expect(quadTree.data[1].point).toEqual({ x: 1, y: 2 });
    });
    test("QuadTree insert out of bounds", () => {
        const quadTree = new Quad_tree({ x: 0, y: 0, w: 100, h: 100 }, 4);
        const sprite = new Sprite_abstract();
        quadTree.insert(sprite, { x: 101, y: 101 });
        expect(quadTree.data.length).toBe(0);
    });
    test("QuadTree root boundary", () => {
        const quadTree = new Quad_tree({ x: 0, y: 0, w: 99, h: 99 }, 4);
        const sprite = new Sprite_abstract();
        quadTree.insert(sprite, { x: 0, y: 0 });
        quadTree.insert(sprite, { x: 1, y: 2 });
        quadTree.insert(sprite, { x: 100, y: 0 });
        quadTree.insert(sprite, { x: 100, y: 100 });
        quadTree.insert(sprite, { x: 0, y: 100 });
        quadTree.insert(sprite, { x: -1, y: 50 });
        quadTree.insert(sprite, { x: 99, y: 99 });

        expect(quadTree.data.length).toBe(3);
    });
    test("QuadTree north west boundary", () => {
        const quadTree = new Quad_tree({ x: 0, y: 0, w: 20, h: 30 }, 4);
        const sprite = new Sprite_abstract();
        quadTree.insert(sprite, { x: 0, y: 0 });
        quadTree.insert(sprite, { x: 1, y: 2 });
        quadTree.insert(sprite, { x: 20, y: 0 });
        quadTree.insert(sprite, { x: 20, y: 30 });

        // add more sprites to north west
        quadTree.insert(sprite, { x: 0, y: 0 });
        quadTree.insert(sprite, { x: 10, y: 15 });
        quadTree.insert(sprite, { x: 20, y: 0 });
        quadTree.insert(sprite, { x: 20, y: 30 });

        expect(quadTree.northwest?.data.length).toBe(2);
    });

    test("QuadTree query", () => {
        const quadTree = new Quad_tree({ x: 0, y: 0, w: 100, h: 100 }, 4);
        const sprite = new Sprite_abstract();
        quadTree.insert(sprite, { x: 0, y: 0 });
        quadTree.insert(sprite, { x: 1, y: 2 });
        quadTree.insert(sprite, { x: 100, y: 0 });
        quadTree.insert(sprite, { x: 100, y: 100 });
        quadTree.insert(sprite, { x: 0, y: 100 });
        quadTree.insert(sprite, { x: 99, y: 99 });

        const query = quadTree.query({ x: 0, y: 0, w: 100, h: 100 });
        expect(query.length).toBe(6);
    });

    test("QuadTree query in small subset", () => {
        const quadTree = new Quad_tree({ x: 0, y: 0, w: 100, h: 100 }, 4);
        const sprite = new Sprite_abstract();
        quadTree.insert(sprite, { x: 0, y: 0 });
        quadTree.insert(sprite, { x: 1, y: 2 });
        quadTree.insert(sprite, { x: 20, y: 0 });
        quadTree.insert(sprite, { x: 100, y: 0 });
        quadTree.insert(sprite, { x: 100, y: 100 });
        quadTree.insert(sprite, { x: 0, y: 100 });
        quadTree.insert(sprite, { x: 99, y: 99 });
        quadTree.insert(sprite, { x: 20, y: 21 });

        const query1 = quadTree.query({ x: 0, y: 0, w: 20, h: 20 });
        const query2 = quadTree.query({ x: 0, y: 0, w: 100, h: 100 });
        const query3 = quadTree.query({ x: 20, y: 20, w: 30, h: 30 });
        expect(query1.length).toBe(3);
        expect(query2.length).toBe(8);
        expect(query3.length).toBe(1);
    });
});
