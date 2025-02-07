// Controller is the grand orchestrator of the entire project: it initialises Model, View, and uses all methods defined there to perform all actions.

"use strict";

import "../styles/main.scss";
// import myImageNameWithoutExtension from '../img/myImageNameWithExtension'  // myImageNameWithoutExtension will be the src

// instantiating main classes
import Model from "./modules/Model.js";
import View from "./modules/View.js";
const Logic = new Model();
const Visual = new View();

// ================================================================================================

// runs on app start
function init() {
    Visual.greetScreen("greet");
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
}

// ================================================================================================

function headerHandler(el) {
    const type = el.textContent.trim().toLowerCase();
    if (type === `add word`) {
        // render Add Word form
        Visual.removePrompt();
        Visual.removeGreetScreen();
        Visual.renderAddForm();
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

function appClicksHandler(clickedEl, text) {
    console.log(clickedEl, text);
    if (text === `select language >`) {
        // render another prompt: Select Language
        const [selectedEl, selectedElText] = Visual.readSelectedOption();
        const languages = Logic.getLangsList(); // getting the list of lang names and country flags
        Visual.renderPrompt("Select Language", languages, [], "Begin Practice >");
    }
    if (text === `begin practice >`) {
        console.log(`start the quiz`);
    }
}

// ================================================================================================

// exporting for some dependencies
export { Logic, Visual, runEventListeners };
