let lastFrameStart = 0;
let previousFrameStart = 0;
async function sleepFrame(frameRate: number) {
    const now = Date.now();
    const elapsed = now - (lastFrameStart || now);
    await new Promise((resolve) =>
        setTimeout(resolve, 1000 / frameRate - elapsed),
    );
    previousFrameStart = lastFrameStart;
    lastFrameStart = Date.now();
    return (lastFrameStart - previousFrameStart) / 1000;
}

export { sleepFrame };
