import Player from "./sprites/player";
import { Sprite_abstract, Sprite_group } from "./sprites/sprite";
import { sleepFrame } from "./utils/frameTimer";
import { addListeners } from "./utils/keyPressHandler";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const startButton = document.getElementById("start") as HTMLButtonElement;
const stopButton = document.getElementById("stop") as HTMLButtonElement;
const ctx = canvas?.getContext("2d");
if (!ctx) {
    throw new Error("Canvas not found");
}

var size = 800;
canvas.style.width = size + "px";
canvas.style.height = size + "px";

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.width = size * scale;
canvas.height = size * scale;

// Normalize coordinate system to use css pixels.
ctx.scale(scale, scale);

// create all groups
const drawables = new Sprite_group<
    Sprite_abstract & { draw: (ctx: CanvasRenderingContext2D) => void }
>();
const updateables = new Sprite_group<
    Sprite_abstract & { update: (dt: number) => void }
>();

// set groups
Player.groups = [drawables, updateables];

// create player
new Player(size / 2, size / 2);

let dt = 0;
let stop = true;
console.log(drawables);
async function mainLoop() {
    if (!ctx) {
        throw new Error("Canvas not found");
    }
    addListeners();
    while (true) {
        if (stop) {
            break;
        }
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, size, size);
        drawables.getSpriteArray().forEach((sprite) => sprite.draw(ctx));
        updateables.getSpriteArray().forEach((sprite) => sprite.update(dt));
        dt = await sleepFrame(60);
    }
}

startButton.onclick = () => {
    if (stop) {
        stop = false;
        mainLoop();
    }
};

stopButton.onclick = () => {
    stop = true;
};
