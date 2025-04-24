const keysPressed: any = {};

function addListeners() {
    window.addEventListener("keydown", (event) => {
        keysPressed[event.code] = true;
    });

    window.addEventListener("keyup", (event) => {
        keysPressed[event.code] = false;
    });
}

function isKeyPressed(key: string) {
    return keysPressed[key] || false;
}

export { addListeners, isKeyPressed };
