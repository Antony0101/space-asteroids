import { menuElement } from "./elementReferences";

function addCustomEventListeners() {
    // window.addEventListener("keydown", (event) => {
    //     console.log("keydown", event.code);
    //     keysPressed[event.code] = true;
    //     console.log(keysPressed);
    // });

    window.addEventListener("keyup", (event) => {
        if (event.code === "Escape") {
            console.log("keyup", event.code);
            menuElement.style.visibility =
                menuElement.style.visibility === "hidden"
                    ? "visible"
                    : "hidden";
        }
    });
}

export default addCustomEventListeners;
