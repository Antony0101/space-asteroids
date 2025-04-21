const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const menuElement = document.getElementById("pause-menu") as HTMLDivElement;
const overMenuElement = document.getElementById("over-menu") as HTMLDivElement;
const topBarElement = document.getElementById("top-bar") as HTMLDivElement;
const startButton = document.getElementById(
    "start-button",
) as HTMLButtonElement;
const resetButton = document.getElementById(
    "reset-button",
) as HTMLButtonElement;
const newGameButton = document.getElementById(
    "new-game-button",
) as HTMLButtonElement;
const resetScoreButton = document.getElementById(
    "reset-score-button",
) as HTMLButtonElement;
const scoreElement = document.getElementById("score") as HTMLSpanElement;
const highScoreElement = document.getElementById(
    "high-score",
) as HTMLSpanElement;
const controlsElement = document.getElementById("controls") as HTMLDivElement;

// console.log(canvas, menuElement, topBarElement);

export {
    canvas,
    menuElement,
    topBarElement,
    startButton,
    resetButton,
    overMenuElement,
    newGameButton,
    scoreElement,
    highScoreElement,
    controlsElement,
    resetScoreButton,
};
