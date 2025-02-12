import { Visual } from "../../Controller.js";
import { renderQuickPopup } from "./renderMethods.js";

// ================================================================================================

// handle clicks in .header
function handleHeaderClicks(handler) {
    Visual.headerBlock.addEventListener("click", function (e) {
        if (e.target.closest(".header__btn")) {
            // it was a click on Add Word or Practise
            const clickedBtn = e.target.closest(".header__btn");
            // prompting before clicking elsewhere if .round or .after is displayed
            if (document.querySelector(".round")) {
                const answer = confirm("You are in the middle of a session. Are you sure you want to quit?");
                if (!answer) return;
            }
            if (document.querySelector(".after")) {
                const answer = confirm("You are in the middle of reviewing your responses. Are you sure you want to quit?");
                if (!answer) return;
            }
            Visual.makeActive(clickedBtn, `.header__btn`); // highlighting clicked el/btn
            Visual.clearApp(); // clearing .app
            handler(clickedBtn);
        }

        if (e.target.closest("h1")) {
            // it was a click on h1
            // prompting before clicking elsewhere if .round or .after is displayed
            if (document.querySelector(".round")) {
                const answer = confirm("You are in the middle of a session. Are you sure you want to quit?");
                if (!answer) return;
            }
            if (document.querySelector(".after")) {
                const answer = confirm("You are in the middle of reviewing your responses. Are you sure you want to quit?");
                if (!answer) return;
            }
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
        if (e.target.closest(".prompt__option--choice .prompt__option-content")) {
            // it was a click on an option of the rendered prompt block
            const clickedEl = e.target.closest(".prompt__option--choice .prompt__option-content");
            Visual.makeActive(clickedEl, `.prompt__option--choice .prompt__option-content`, "glowing");
        }

        if (e.target.closest(".prompt__option-action-content")) {
            // it was a click on the action button: Select Language, Begin Practice or Next Round
            const clickedBtn = e.target.closest(".prompt__option-action-content"); // this btn is "Select Language >"
            const text = clickedBtn.textContent.toLowerCase().trim();
            // const modeChosen = Visual.readSelectedOption();
            const [clickedChoiceBtn, clickedChoiceBtnText] = Visual.readSelectedOption(); // this btn is either 'Practice Your Words' or 'New Online Session'
            const modeChosen = clickedChoiceBtnText === "New Online Session" ? "online" : "local";
            handler(clickedBtn, text, modeChosen);
        }

        if (e.target.closest(".form__btn--add")) {
            // it was a click on 'Add' form btn when adding a new word
            handler("add");
        }

        if (e.target.closest(".form--add .form__btn--bulk")) {
            // it was a click on 'Add Multiple' btn -- show a form to add many words at once
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
            // it was a click on Yes or No on the screen shown after submitting .after ("Another Session?")
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
    document.querySelector("form").addEventListener("submit", function (e) {
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

// handle file import/input
function handleFileImport(handler) {
    Visual.fileInputEl.addEventListener("change", function (e) {
        handler(e);
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
    handleFileImport,
};
