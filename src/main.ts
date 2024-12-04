import game_main from "./game_main";
import { addListeners } from "./utils/keyPressHandler";
import global_Object from "./values/global";
import {
    canvas,
    menuElement,
    newGameButton,
    resetButton,
    startButton,
    overMenuElement,
} from "./utils/elementReferences";
import addCustomEventListeners from "./utils/eventHandlers";

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
menuElement.style.visibility = "visible";

addListeners();
addCustomEventListeners();

const gameObjects = game_main(ctx, (event, data) => {
    switch (event) {
        case "game_over":
            overMenuElement.style.visibility = "visible";
            console.log("game over");
            console.log(data);
            break;
    }
});

startButton.onclick = () => {
    menuElement.style.visibility = "hidden";
    gameObjects.start();
};

resetButton.onclick = () => {
    gameObjects.reset();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, global_Object.screenWidth, global_Object.screenHeight);
};

newGameButton.onclick = () => {
    overMenuElement.style.visibility = "hidden";
    gameObjects.reset();
    gameObjects.start();
};
