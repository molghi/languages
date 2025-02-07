import { Visual } from "../../Controller.js";
import { renderQuickPopup } from "./renderMethods.js";

// ================================================================================================

// handle clicks in .header
function handleHeaderClicks(handler) {
    Visual.headerBlock.addEventListener("click", function (e) {
        if (e.target.closest(".header__btn")) {
            // it was a click on Add Word or Practice
            const clickedBtn = e.target.closest(".header__btn");
            Visual.makeActive(clickedBtn, `.header__btn`);
            handler(clickedBtn);
        }
    });
}

// ================================================================================================

// handle clicks in .app
function handleAppClicks(handler) {
    Visual.appBlock.addEventListener("click", function (e) {
        if (e.target.closest(".prompt__option--choice span")) {
            // it was a click on an option of a prompt
            const clickedEl = e.target.closest(".prompt__option--choice span");
            Visual.makeActive(clickedEl, `.prompt__option--choice span`, "glowing");
        }

        if (e.target.closest(".prompt__option-action-content")) {
            // it was a click on the action button: Begin Practice or Next Question
            const clickedBtn = e.target.closest(".prompt__option-action-content");
            const text = clickedBtn.textContent.toLowerCase().trim();
            handler(clickedBtn, text);
        }
    });
}

// ================================================================================================

function handleAppHoversIn(handler) {
    Visual.appBlock.addEventListener("mouseover", function (e) {
        if (e.target.closest(".prompt__option")) {
            const hoveredItem = e.target.closest(".prompt__option");
            const lang = hoveredItem.querySelector("span[data-lang]")?.dataset.lang;
            renderQuickPopup(lang, hoveredItem);
        }
    });
}

// ================================================================================================

function handleAppHoversOut(handler) {
    Visual.appBlock.addEventListener("mouseout", function (e) {
        if (e.target.closest(".prompt__option")) {
            Visual.removePopup();
        }
    });
}

// ================================================================================================

export { handleHeaderClicks, handleAppClicks, handleAppHoversIn, handleAppHoversOut };
