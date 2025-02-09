// Controller is the grand orchestrator of the entire project: it initialises Model, View, and uses all methods defined there to perform all actions.

"use strict";

import "../styles/main.scss";

// instantiating main classes
import Model from "./modules/Model.js";
import View from "./modules/View.js";
const Logic = new Model();
const Visual = new View();

// importing dependencies:
import appClicksHandler from "./modules/controller-dependencies/appClicksHandler.js";
import headerHandler from "./modules/controller-dependencies/headerHandler.js";
import actionsHandler from "./modules/controller-dependencies/actionsHandler.js";

// ================================================================================================

// runs on app start
function init() {
    Visual.showScreen("greet"); // showing a greeting screen
    Visual.setAccentColor(Logic.getAccentColor()); // changing the accent color if it was in LS
    runEventListeners();
}
init();

// ================================================================================================

// running main event listeners
function runEventListeners() {
    Visual.handleHeaderClicks(headerHandler); // handle clicks in .header
    Visual.handleAppClicks(appClicksHandler); // handle clicks in .app
    Visual.handleAppHoversIn(); // handle hover-ins in .app
    Visual.handleAppHoversOut(); // handle hover-outs in .app
    Visual.listenKeyPresses(keyPressHandler); // listen to when Enter is pressed (when there is .round)
    Visual.handleActionsClicks(actionsHandler); // handle clicks in .actions
}

// ================================================================================================

// listen to specific key presses
function keyPressHandler(keyPressed) {
    if (keyPressed === "enter") {
        // click "Next Round"
        const btnText = document.querySelector(".round__action-btn").textContent.trim().toLowerCase(); // getting the text of that action btn
        appClicksHandler(btnText); // "clicking"
    }
}

// ================================================================================================

// exporting for some dependencies
export { Logic, Visual, runEventListeners };
