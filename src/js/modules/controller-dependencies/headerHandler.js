import { Visual, Logic } from "../../Controller.js";

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

// handle Add Word form -- only called in 'headerHandler'
function formHandler(data) {
    const formData = {};
    const elements = data.filter((el) => el.tagName !== "BUTTON"); // getting all form elements without button
    elements.forEach((el) => {
        if (el.name === "languages") formData["language"] = el.value.trim();
        else formData[el.name] = el.value.trim(); // populating formData
    });
    formData.added = new Date().toISOString(); // 'added' acts as ID
    formData.id = new Date().getTime(); // I added it later
    // validation?
    Logic.addWord(formData); // add to state and LS
    Visual.showMessage("success", "Added successfully!"); // show message
    Visual.clearFormFields(); // clear field
    document.querySelector('form input[type="text"]').focus(); // focus first input
}

// ================================================================================================

export default headerHandler;
