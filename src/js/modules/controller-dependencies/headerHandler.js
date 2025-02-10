import { Visual, Logic } from "../../Controller.js";
import formHandler from "./formHandler.js";

// ================================================================================================

// handle clicks in .header
function headerHandler(el) {
    const type = el.textContent.trim().toLowerCase();
    if (type === `add word`) {
        // render Add Word form
        Visual.removePrompt(); // removing from the UI
        Visual.removeGreetScreen(); // removing from the UI
        Visual.renderAddForm(); // rendering Add Word form
        Visual.handleFormSubmission(formHandler); // handling this form submission
        const languages = Logic.getLangsList("pure"); // getting the list of lang names and country flags
        Visual.populateSelect(languages); // populating select tag in Add form
    } else if (type === `practice`) {
        // commence practice
        Visual.removeAddForm(); // removing from the UI
        Visual.removeGreetScreen(); // removing from the UI
        Visual.renderPrompt(
            "Select Mode",
            ["From Saved", "From Online"],
            [
                `Create a practice session using the materials you've worked with before`,
                `Create a new practice session with fresh content from an online source`,
            ],
            "Select Language >"
        ); // args: titleString, optionsArr, optionsExplainers, btnText
    }
}

// ================================================================================================

export default headerHandler;
