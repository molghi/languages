// Controller is the grand orchestrator of the entire project: it initialises Model, View, and uses all methods defined there to perform all actions.

"use strict";

import "../styles/main.scss";
// import myImageNameWithoutExtension from '../img/myImageNameWithExtension'  // myImageNameWithoutExtension will be the src

// instantiating main classes
import Model from "./modules/Model.js";
import View from "./modules/View.js";
const Logic = new Model();
const Visual = new View();

// importing dependencies:
import appClicksHandler from "./modules/controller-dependencies/appClicksHandler.js";

// ================================================================================================

// runs on app start
function init() {
    Visual.showScreen("greet");
    Visual.setAccentColor(Logic.getAccentColor()); // changing the accent color if it was saved to LS
    runEventListeners();
}
init();

// ================================================================================================

// running event listeners
function runEventListeners() {
    Visual.handleHeaderClicks(headerHandler); // handle clicks in .header
    Visual.handleAppClicks(appClicksHandler); // handle clicks in .app
    Visual.handleAppHoversIn();
    Visual.handleAppHoversOut();
    Visual.listenKeyPresses(keyPressHandler);
    Visual.handleActionsClicks(actionsHandler);
}

// ================================================================================================

function headerHandler(el) {
    const type = el.textContent.trim().toLowerCase();
    if (type === `add word`) {
        // render Add Word form
        Visual.removePrompt();
        Visual.removeGreetScreen();
        Visual.renderAddForm();
        Visual.handleFormSubmission(formHandler);
        const languages = Logic.getLangsList("pure"); // getting the list of lang names and country flags
        Visual.populateSelect(languages);
    } else if (type === `practice`) {
        // commence practice
        Visual.removeAddForm();
        Visual.removeGreetScreen();
        Visual.renderPrompt(
            "Select Mode",
            ["From Saved", "From Online"],
            [
                `Create a practice session using the materials you've worked with before`,
                `Create a new practice session with fresh content from an online source`,
            ],
            "Select Language >"
        ); // titleString, optionsArr, optionsExplainers, btnText
    }
}

// ================================================================================================

function formHandler(data) {
    const formData = {};
    const elements = data.filter((el) => el.tagName !== "BUTTON"); // getting all form elements without button
    elements.forEach((el) => {
        if (el.name === "languages") formData["language"] = el.value.trim();
        else formData[el.name] = el.value.trim(); // populating formData
    });
    formData.added = new Date().toISOString();
    // validation?
    Logic.addWord(formData); // add to state and LS
    Visual.showMessage("success", "Added successfully!"); // show message
    Visual.clearFormFields(); // clear field
    document.querySelector('form input[type="text"]').focus(); // focus first input
}

// ================================================================================================

function keyPressHandler(keyPressed) {
    if (keyPressed === "enter") {
        // click "Next Round"
        const btnText = document.querySelector(".round__action-btn").textContent.trim().toLowerCase();
        appClicksHandler(btnText);
    }
}

// ================================================================================================

function actionsHandler(actionType) {
    if (actionType === "change color") {
        console.log(`change col`);
        // changing the accent color

        const newColor = Visual.promptAccentChange();
        if (!newColor) return;
        if (newColor && newColor.trim().length < 3) return;
        const checkedColor = Logic.checkNewColor(newColor);
        Visual.setAccentColor(checkedColor); // changing visually
        Logic.setAccentColor(checkedColor); // changing in state and LS
    } else if (actionType === "export") {
        console.log(`export`);
    } else if (actionType === "import") {
        console.log(`import`);
    }
}

// ================================================================================================

// exporting for some dependencies
export { Logic, Visual, runEventListeners };
