import vector2D from "./vector";

function drawCircle(
    ctx: CanvasRenderingContext2D,
    pos: vector2D,
    radius: number,
    color: string = "black",
) {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}

function drawTriangle(
    ctx: CanvasRenderingContext2D,
    pos: vector2D,
    size: number,
    color: string = "black",
) {
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(pos.x + size, pos.y + size);
    ctx.lineTo(pos.x - size, pos.y + size);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}

function drawPolygon(
    ctx: CanvasRenderingContext2D,
    cordinates: vector2D[],
    color: string = "black",
) {
    ctx.beginPath();
    ctx.moveTo(cordinates[0].x, cordinates[0].y);
    for (let i = 1; i < cordinates.length; i++) {
        ctx.lineTo(cordinates[i].x, cordinates[i].y);
    }
    ctx.lineTo(cordinates[0].x, cordinates[0].y);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}

export { drawCircle, drawTriangle, drawPolygon };
