import { Visual } from "../../Controller.js";
import languagesQuickInfo from "./languagesQuickInfo.js";

// ================================================================================================

// rendering a quick hover-activated popup with the language info
function renderQuickPopup(lang, hoveredItem) {
    if (!lang || !hoveredItem) return;
    Visual.removePopup(); // removing before rendering (if exists)

    const data = languagesQuickInfo[lang]; // getting the data to show

    const div = document.createElement("div");
    div.classList.add("lang-info", "invisible");

    div.innerHTML = `<div class="lang-info__title">Quick Info</div>` + data.replaceAll("\n", "<br>"); // populating with content

    Visual.containerEl.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible"); // rendering with some animation
    }, 200);
}

// ================================================================================================

// rendering a quick message
function renderMessage(type, text, removeAfterMs) {
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
        Visual.removeMessage(); // removing after 5 sec or more (if was specified)
    }, removeAfterMs || 5000);
}

// ================================================================================================

// rendering a small spinner
function renderSpinner(el, position) {
    Visual.removeSpinner(); // removing before rendering (if exists)
    const div = document.createElement("div");
    div.classList.add("spinner");
    const styleClass = position ? ` spinner-moved` : "";
    div.innerHTML = `<span class="loader${styleClass}"></span>`;
    if (position) el.style.position = "relative"; //, div.classList.add(styleClass.trim());
    el.appendChild(div);
}

// ================================================================================================

export { renderQuickPopup, renderMessage, renderSpinner };
