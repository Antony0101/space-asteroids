let lastFrameStart = 0;
let previousFrameStart = 0;
async function sleepFrame(frameRate: number) {
    const now = Date.now();
    const frameTimeMs = 1000 / frameRate;
    const elapsed =
        now - lastFrameStart > frameTimeMs ? frameTimeMs : now - lastFrameStart;
    await new Promise((resolve) => setTimeout(resolve, frameTimeMs - elapsed));
    previousFrameStart = lastFrameStart;
    lastFrameStart = Date.now();
    return lastFrameStart - previousFrameStart > frameTimeMs
        ? frameTimeMs / 1000
        : (lastFrameStart - previousFrameStart) / 1000;
}

export { sleepFrame };
