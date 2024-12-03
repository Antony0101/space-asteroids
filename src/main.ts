import Asteroid from "./sprites/asteroid";
import AsteroidField from "./sprites/asteroidFeilds";
import Player from "./sprites/player";
import Shot from "./sprites/shot";
import { Sprite_abstract, Sprite_group } from "./sprites/sprite";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./utils/constants";
import { sleepFrame } from "./utils/frameTimer";
import { addListeners } from "./utils/keyPressHandler";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const startButton = document.getElementById("start") as HTMLButtonElement;
const stopButton = document.getElementById("stop") as HTMLButtonElement;
const resetButton = document.getElementById("reset") as HTMLButtonElement;
const ctx = canvas?.getContext("2d");
if (!ctx) {
    throw new Error("Canvas not found");
}

canvas.style.width = SCREEN_WIDTH + "px";
canvas.style.height = SCREEN_HEIGHT + "px";

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.width = SCREEN_WIDTH * scale;
canvas.height = SCREEN_HEIGHT * scale;

// Normalize coordinate system to use css pixels.
ctx.scale(scale, scale);

// create all groups
const drawables = new Sprite_group<
    Sprite_abstract & { draw: (ctx: CanvasRenderingContext2D) => void }
>();
const updateables = new Sprite_group<
    Sprite_abstract & { update: (dt: number) => void }
>();
const allSprites = new Sprite_group<Sprite_abstract>();
const asteroids = new Sprite_group<Asteroid>();

// set groups
Player.groups = [drawables, updateables, allSprites];
Asteroid.groups = [drawables, updateables, allSprites, asteroids];
AsteroidField.groups = [updateables, allSprites];
Shot.groups = [drawables, updateables, allSprites];

// create player
new Player(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

// create asteroid field
new AsteroidField();

console.log(drawables);
console.log(updateables);

let dt = 0;
let stop = true;
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
        ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
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

resetButton.onclick = () => {
    allSprites.getSpriteArray().forEach((sprite) => sprite.kill());
    new Player(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    new AsteroidField();
};
