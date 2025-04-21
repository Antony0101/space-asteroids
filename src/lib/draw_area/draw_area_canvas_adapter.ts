import vector2D from "../../utils/vector";
import DrawArea, { workTypeList } from "./draw_area";

class Canvas2DAdapterDrawArea {
    canvas: CanvasRenderingContext2D;
    constructor(canvas: CanvasRenderingContext2D) {
        this.canvas = canvas;
    }

    canvasCentreCoordinates() {
        return new vector2D(
            this.canvas.canvas.width / 2,
            this.canvas.canvas.height / 2,
        );
    }

    render(drawArea: DrawArea) {
        const centre = this.canvasCentreCoordinates();
        this.canvas.save();
        this.canvas.translate(centre.x, centre.y);
        const jobs = drawArea.jobs;
        this.innerRender(jobs, [1, 0, 0, 1, 0, 0]);
        this.canvas.restore();
    }

    createTransformMatrix(
        translate: vector2D,
        scale: vector2D,
        rotate: number,
    ): [number, number, number, number, number, number] {
        const rad = rotate * (Math.PI / 180); // degrees to radians
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        console.log("cos", cos, "sin", sin);

        // Scale + Rotate
        const a = cos * scale.x;
        const b = sin * scale.x;
        const c = -sin * scale.y;
        const d = cos * scale.y;

        // Translation
        const e = translate.x;
        const f = translate.y;

        return [a, b, c, d, e, f];
    }

    private innerRender(
        jobs: workTypeList,
        transformationMatrix: [number, number, number, number, number, number],
    ) {
        this.canvas.save();
        this.canvas.transform(...transformationMatrix);
        for (const job of jobs) {
            switch (job.workType) {
                case "strokeCircle":
                    this.strokeCircle(
                        job.params.pos,
                        job.params.radius,
                        job.params.color,
                    );
                    break;
                case "strokeTriangle":
                    this.strokeTriangle(
                        job.params.pos,
                        job.params.size,
                        job.params.color,
                    );
                    break;
                case "strokePolygon":
                    this.strokePolygon(job.params.cordinates, job.params.color);
                    break;
                case "fillCircle":
                    this.fillCircle(
                        job.params.pos,
                        job.params.radius,
                        job.params.color,
                    );
                    break;
                case "fillPolygon":
                    this.fillPolygon(job.params.cordinates, job.params.color);
                    break;
                case "addDrawArea":
                    this.addDrawArea(
                        job.params.jobs,
                        job.params.translate,
                        job.params.scale,
                        job.params.rotate,
                    );
            }
        }
        this.canvas.restore();
    }

    strokeCircle(pos: vector2D, radius: number, color: string) {
        this.canvas.beginPath();
        this.canvas.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        this.canvas.strokeStyle = color;
        this.canvas.stroke();
        this.canvas.closePath();
    }

    fillCircle(pos: vector2D, radius: number, color: string = "black") {
        this.canvas.beginPath();
        this.canvas.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
        this.canvas.fillStyle = color;
        this.canvas.fill();
        this.canvas.closePath();
    }

    strokeTriangle(pos: vector2D, size: number, color: string = "black") {
        this.canvas.beginPath();
        this.canvas.moveTo(pos.x, pos.y);
        this.canvas.lineTo(pos.x + size, pos.y + size);
        this.canvas.lineTo(pos.x - size, pos.y + size);
        this.canvas.lineTo(pos.x, pos.y);
        this.canvas.strokeStyle = color;
        this.canvas.stroke();
        this.canvas.closePath();
    }

    strokePolygon(cordinates: vector2D[], color: string = "black") {
        this.canvas.beginPath();
        this.canvas.moveTo(cordinates[0].x, cordinates[0].y);
        for (let i = 1; i < cordinates.length; i++) {
            this.canvas.lineTo(cordinates[i].x, cordinates[i].y);
        }
        this.canvas.lineTo(cordinates[0].x, cordinates[0].y);
        this.canvas.strokeStyle = color;
        this.canvas.stroke();
        this.canvas.closePath();
    }

    fillPolygon(cordinates: vector2D[], color: string = "black") {
        this.canvas.beginPath();
        this.canvas.moveTo(cordinates[0].x, cordinates[0].y);
        for (let i = 1; i < cordinates.length; i++) {
            this.canvas.lineTo(cordinates[i].x, cordinates[i].y);
        }
        this.canvas.lineTo(cordinates[0].x, cordinates[0].y);
        this.canvas.fillStyle = color;
        this.canvas.fill();
        this.canvas.closePath();
    }

    addDrawArea(
        jobs: workTypeList,
        translate: vector2D,
        scale: vector2D,
        rotate: number,
    ) {
        const matrix = this.createTransformMatrix(translate, scale, rotate);
        console.log("dddd", matrix);
        this.innerRender(jobs, matrix);
    }
}

export default Canvas2DAdapterDrawArea;
