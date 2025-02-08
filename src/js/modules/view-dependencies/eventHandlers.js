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

        if (e.target.closest("h1")) {
            // it was a click on h1
            [...document.querySelectorAll(".header__btn")].forEach((btn) => btn.classList.remove("active"));
            Visual.appBlock.innerHTML = ``;
            Visual.showScreen("advise");
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

        if (e.target.closest(".form__btn")) {
            // it was a click on Add btn when adding a word
            handler("add");
        }

        if (e.target.closest(".round__action-btn")) {
            // it was a click on Next Round or Finish Session
            const btnText = e.target.closest(".round__action-btn").textContent.trim().toLowerCase();
            handler(btnText);
        }

        if (e.target.closest(".after__item-btn")) {
            // it was a click on Wrong, Hard, Good or Easy btns in .after
            const clickedEl = e.target.closest(".after__item-btn");
            handler("rate", clickedEl);
        }

        if (e.target.closest(".after__action-btn")) {
            // it was a click on Submit in .after
            handler("submit");
        }

        if (e.target.closest(".greet-screen__btn")) {
            // it was a click on Yes or No after submitting .after
            const clickedElText = e.target.closest(".greet-screen__btn").textContent.trim().toLowerCase();
            handler(`another ${clickedElText}`);
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

function handleFormSubmission(handler) {
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        handler([...this.elements]);
    });
}

// ================================================================================================

export { handleHeaderClicks, handleAppClicks, handleAppHoversIn, handleAppHoversOut, handleFormSubmission };
