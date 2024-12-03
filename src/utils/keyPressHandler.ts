const keysPressed: any = {};

function addListeners() {
    window.addEventListener("keydown", (event) => {
        console.log("keydown", event.code);
        keysPressed[event.code] = true;
        console.log(keysPressed);
    });

    window.addEventListener("keyup", (event) => {
        console.log("keyup", event.code);
        keysPressed[event.code] = false;
        console.log(keysPressed);
    });
}

function isKeyPressed(key: string) {
    return keysPressed[key] || false;
}

export { addListeners, isKeyPressed };
