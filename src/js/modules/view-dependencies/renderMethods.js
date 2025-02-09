import { Visual } from "../../Controller.js";
import languagesQuickInfo from "./languagesQuickInfo.js";

// ================================================================================================

function renderQuickPopup(lang, hoveredItem) {
    if (!lang || !hoveredItem) return;
    Visual.removePopup(); // removing before rendering (if exists)

    const data = languagesQuickInfo[lang]; // getting the data to show

    const div = document.createElement("div");
    div.classList.add("lang-info", "invisible");

    div.innerHTML = `<div class="lang-info__title">Quick Info</div>` + data.replaceAll("\n", "<br>");

    Visual.containerEl.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible"); // rendering with some animation
    }, 200);
}

// ================================================================================================

function renderMessage(type, text) {
    Visual.removeMessage(); // removing before rendering (if exists)

    const div = document.createElement("div");
    const classType = type === "success" ? "success" : type === "error" ? "error" : "notification";
    div.classList.add("message", "invisible", "moved-left", classType);

    div.innerHTML = `<div class="message__text">${text}</div>`;
    Visual.containerEl.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible", "moved-left"); // rendering with some animation
    }, 200);

    setTimeout(() => {
        Visual.removeMessage(); // removing after 5 sec
    }, 5000);
}

// ================================================================================================

export { renderQuickPopup, renderMessage };
