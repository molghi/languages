import { Visual, Logic } from "../../Controller.js";
import formHandler from "./formHandler.js";

// handle clicks in .header
function headerHandler(el) {
    const type = el.textContent.trim().toLowerCase();

    if (type === `add word`) {
        // do what: render Add Word form
        Visual.clearApp(); // removing all child elements in .app
        Visual.renderAddForm(); // rendering Add Word form
        Visual.handleFormSubmission(formHandler); // handling this form submission
        const languages = Logic.getLangsList("pure"); // getting the list of lang names and country flags
        Visual.populateSelect(languages); // populating select tag in Add form
    } else if (type === `practise`) {
        // do what: show Select Mode screen
        Visual.clearApp(); // removing all child elements in .app
        Visual.renderPrompt(
            "Select Mode",
            ["Review Your Words", "New Online Session", "Practise Topics"],
            [
                "For practising words you have previously interacted with",
                "For starting a fresh practice session with online content",
                "[IN DEVELOPMENT] For practising words from a curated selection of topics",
            ],
            "Select Language >"
        ); // args: titleString, optionsArr, optionsExplainers, btnText
    }
}

export default headerHandler;
