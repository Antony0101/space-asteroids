import game_main from "./game_main";
import { addListeners } from "./utils/keyPressHandler";
import global_Object, { global_States } from "./values/global";
import {
    canvas,
    menuElement,
    newGameButton,
    resetButton,
    startButton,
    overMenuElement,
    scoreElement,
    highScoreElement,
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

global_States.highScore = localStorage.getItem("highScore")
    ? parseInt(localStorage.getItem("highScore") as string)
    : 0;
highScoreElement.textContent = global_States.highScore.toString();

addListeners();

const gameObject = game_main(ctx, (event, _) => {
    switch (event) {
        case "game_over":
            overMenuElement.style.visibility = "visible";
            global_States.highScore = Math.max(
                global_States.score,
                global_States.highScore,
            );
            localStorage.setItem(
                "highScore",
                global_States.highScore.toString(),
            );
            highScoreElement.textContent = global_States.highScore.toString();
            break;
        case "shot_hit":
            global_States.score += 1;
            scoreElement.textContent = global_States.score.toString();
            break;
        case "game_reset":
            global_States.score = 0;
            scoreElement.textContent = "0";
            break;
    }
});

addCustomEventListeners(gameObject);

startButton.onclick = () => {
    menuElement.style.visibility = "hidden";
    gameObject.start();
};

resetButton.onclick = () => {
    gameObject.reset();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, global_Object.screenWidth, global_Object.screenHeight);
    startButton.textContent = "Start";
};

newGameButton.onclick = () => {
    overMenuElement.style.visibility = "hidden";
    gameObject.reset();
    gameObject.start();
};
