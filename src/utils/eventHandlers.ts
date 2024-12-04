import { menuElement, startButton } from "./elementReferences";

function addCustomEventListeners(gameObject: any) {
    window.addEventListener("keyup", (event) => {
        if (event.code === "Escape") {
            if (gameObject.isPaused()) {
                menuElement.style.visibility = "hidden";
                gameObject.start();
            } else {
                startButton.textContent = "Resume";
                menuElement.style.visibility = "visible";
                gameObject.pause();
            }
            // menuElement.style.visibility =
            //     menuElement.style.visibility === "hidden"
            //         ? "visible"
            //         : "hidden";
        }
    });
}

export default addCustomEventListeners;
