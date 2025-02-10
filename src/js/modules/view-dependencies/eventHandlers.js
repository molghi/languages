import { Visual } from "../../Controller.js";
import { renderQuickPopup } from "./renderMethods.js";

// ================================================================================================

// handle clicks in .header
function handleHeaderClicks(handler) {
    Visual.headerBlock.addEventListener("click", function (e) {
        if (e.target.closest(".header__btn")) {
            // it was a click on Add Word or Practice
            const clickedBtn = e.target.closest(".header__btn");
            Visual.makeActive(clickedBtn, `.header__btn`); // highlighting clicked el
            handler(clickedBtn);
        }

        if (e.target.closest("h1")) {
            // it was a click on h1
            [...document.querySelectorAll(".header__btn")].forEach((btn) => btn.classList.remove("active")); // de-highlighting all header btns
            Visual.clearApp(); // clearing .app
            Visual.showScreen("advise"); // showing advice screen/block
        }
    });
}

// ================================================================================================

// handle clicks in .app
function handleAppClicks(handler) {
    Visual.appBlock.addEventListener("click", function (e) {
        if (e.target.closest(".prompt__option--choice span")) {
            // it was a click on an option of the rendered prompt block
            const clickedEl = e.target.closest(".prompt__option--choice span");
            Visual.makeActive(clickedEl, `.prompt__option--choice span`, "glowing");
        }

        if (e.target.closest(".prompt__option-action-content")) {
            // it was a click on the action button: Begin Practice or Next Question
            const clickedBtn = e.target.closest(".prompt__option-action-content");
            const text = clickedBtn.textContent.toLowerCase().trim();
            handler(clickedBtn, text);
        }

        if (e.target.closest(".form__btn--add")) {
            // it was a click on Add btn when adding a word
            handler("add");
        }

        if (e.target.closest(".form--add .form__btn--bulk")) {
            // it was a click on Add Multiple btn when adding a word -- show a form to add many words at once
            handler("bulk add");
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
            // it was a click on Submit Review in .after
            handler("submit review");
        }

        if (e.target.closest(".greet-screen__btn")) {
            // it was a click on Yes or No on the screen shown after submitting .after
            const clickedElText = e.target.closest(".greet-screen__btn").textContent.trim().toLowerCase();
            handler(`another ${clickedElText}`);
        }
    });
}

// ================================================================================================

// handle hover-ins in .app
function handleAppHoversIn(handler) {
    Visual.appBlock.addEventListener("mouseover", function (e) {
        if (e.target.closest(".prompt__option")) {
            const hoveredItem = e.target.closest(".prompt__option");
            const lang = hoveredItem.querySelector("span[data-lang]")?.dataset.lang; // getting the value of data-lang to show a quick info popup
            renderQuickPopup(lang, hoveredItem); // showing it
        }
    });
}

// ================================================================================================

// handle hover-outs in .app
function handleAppHoversOut(handler) {
    Visual.appBlock.addEventListener("mouseout", function (e) {
        if (e.target.closest(".prompt__option")) {
            Visual.removePopup(); // removing quick info popup
        }
    });
}

// ================================================================================================

// handle the Add Word form submission
function handleFormSubmission(handler) {
    // document.querySelector(".form--add form").addEventListener("submit", function (e) {
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        handler([...this.elements]); // this.elements = all form elements
    });
}

// ================================================================================================

// handle the Add Multiple Words form submission
function handleBulkFormSubmission(handler) {
    document.querySelector(".form--bulk form").addEventListener("submit", function (e) {
        e.preventDefault();
        handler([...this.elements]); // this.elements = all form elements
    });
}

// ================================================================================================

// handle clicks in .actions
function handleActionsClicks(handler) {
    Visual.sectionEl.addEventListener("click", function (e) {
        if (e.target.closest(".actions__action")) {
            // it was a click in .actions
            const clickedElText = e.target.textContent.trim().toLowerCase();
            handler(clickedElText);
        }
    });
}

// ================================================================================================

export {
    handleHeaderClicks,
    handleAppClicks,
    handleAppHoversIn,
    handleAppHoversOut,
    handleFormSubmission,
    handleActionsClicks,
    handleBulkFormSubmission,
};
