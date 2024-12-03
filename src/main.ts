import game_main from "./game_main";
import { addListeners } from "./utils/keyPressHandler";
import global_Object from "./values/global";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const startElement = document.getElementById("start") as HTMLDivElement;

const ctx = canvas?.getContext("2d");
if (!ctx) {
    throw new Error("Canvas not found");
}

canvas.style.width = global_Object.screenWidth + "px";
canvas.style.height = global_Object.screenHeight + "px";

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.width = global_Object.screenWidth * scale;
canvas.height = global_Object.screenHeight * scale;

// Normalize coordinate system to use css pixels.
ctx.scale(scale, scale);

ctx.fillStyle = "black";
ctx.fillRect(0, 0, global_Object.screenWidth, global_Object.screenHeight);

canvas.style.visibility = "visible";

addListeners();

const gameObjects = game_main(ctx, (event, data) => {
    switch (event) {
        case "game_over":
            startElement.style.display = "block";
            console.log("game over");
            console.log(data);
            break;
    }
});

startElement.onclick = () => {
    startElement.style.display = "none";
    gameObjects.reset();
    gameObjects.start();
};

// startButton.onclick = () => {
//     if (stop) {
//         stop = false;
//         mainLoop();
//     }
// };

// stopButton.onclick = () => {
//     stop = true;
// };

// resetButton.onclick = () => {
//     allSprites.getSpriteArray().forEach((sprite) => sprite.kill());
//     new Player(global_Object.screenWidth / 2, global_Object.screenHeight / 2);
//     new AsteroidField();
// };
