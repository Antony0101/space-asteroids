// Draw Area is abstract canvas with (0,0) as the middle where different shapes can be drawn

import vector2D from "../../utils/vector";
import HtmlImage from "../htmlImage";

type ColorType = string;

type workTypes = {
    strokeCircle: { pos: vector2D; radius: number; color: ColorType };
    fillCircle: { pos: vector2D; radius: number; color: ColorType };
    fillCircleImage: { pos: vector2D; radius: number; texture: HtmlImage };
    strokePolygon: { cordinates: vector2D[]; color: ColorType };
    fillPolygon: { cordinates: vector2D[]; color: ColorType };
    strokeTriangle: { pos: vector2D; size: number; color: string };
    addDrawArea: {
        jobs: any[];
        translate: vector2D;
        scale: vector2D;
        rotate: number;
    };
    drawImage: {
        image: HTMLImageElement;
        pos: vector2D;
        width: number;
        height: number;
        rotate?: number;
    };
};

export type workTypeNames = keyof workTypes;

export type workTypeList = {
    [K in workTypeNames]: { workType: K; params: workTypes[K] };
}[workTypeNames][];

class DrawArea {
    jobs: workTypeList = [];

    strokeCircle(pos: vector2D, radius: number, color: ColorType = "black") {
        this.jobs.push({
            workType: "strokeCircle",
            params: { radius, pos, color },
        });
    }

    fillCircle(pos: vector2D, radius: number, color: ColorType = "black") {
        this.jobs.push({
            workType: "fillCircle",
            params: { pos, radius, color },
        });
    }

    fillCircleImage(pos: vector2D, radius: number, texture: HtmlImage) {
        this.jobs.push({
            workType: "fillCircleImage",
            params: { pos, radius, texture },
        });
    }

    strokePolygon(cordinates: vector2D[], color: ColorType = "black") {
        this.jobs.push({
            workType: "strokePolygon",
            params: { cordinates, color },
        });
    }

    fillPolygon(cordinates: vector2D[], color: ColorType = "black") {
        this.jobs.push({
            workType: "fillPolygon",
            params: { cordinates, color },
        });
    }

    strokeTriangle(pos: vector2D, size: number, color: ColorType = "black") {
        this.jobs.push({
            workType: "strokeTriangle",
            params: { pos, size, color },
        });
    }

    drawImage(
        image: HTMLImageElement,
        pos: vector2D,
        width: number,
        height: number,
        rotate?: number,
    ) {
        this.jobs.push({
            workType: "drawImage",
            params: { image, pos, width, height, rotate },
        });
    }

    addDrawArea(
        drawArea: DrawArea,
        translate?: vector2D,
        scale?: vector2D,
        rotate?: number,
    ) {
        this.jobs.push({
            workType: "addDrawArea",
            params: {
                jobs: drawArea.jobs,
                translate: translate || new vector2D(0, 0),
                scale: scale || new vector2D(1, 1),
                rotate: rotate || 0,
            },
        });
    }
}

export default DrawArea;
