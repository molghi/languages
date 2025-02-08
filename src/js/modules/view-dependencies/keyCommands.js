import { Visual } from "../../Controller.js";

function listenKeyPresses(handler) {
    document.addEventListener("keydown", function (e) {
        // 'keypress' is deprecated

        if (e.code === "Enter") {
            if (!document.querySelector(".round")) return;
            handler("enter");
        }
    });
}

export default listenKeyPresses; // I export and instantiate it right here, so I don't have to instantiate it where I import it
