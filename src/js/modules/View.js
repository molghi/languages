// View is responsible for everything that happens on the screen: rendering and all visual interactions with any elements

// importing dependencies:
import { renderQuickPopup, renderMessage, renderSpinner } from "./view-dependencies/renderMethods.js";
import { renderAddForm, renderAddManyForm } from "./view-dependencies/renderAddForm.js";
import renderRound from "./view-dependencies/renderRound.js";
import renderPrompt from "./view-dependencies/renderPrompt.js";
import showScreen from "./view-dependencies/renderScreen.js";
import renderEndScreen from "./view-dependencies/renderEndScreen.js";
import {
    handleHeaderClicks,
    handleAppClicks,
    handleAppHoversIn,
    handleAppHoversOut,
    handleFormSubmission,
    handleActionsClicks,
    handleFileImport,
} from "./view-dependencies/eventHandlers.js";
import { someFrequentNouns } from "./model-dependencies/dataMyLists.js";
import listenKeyPresses from "./view-dependencies/keyCommands.js";
import updateLastPracticed from "./view-dependencies/updateLastPracticed.js";

// ===========================================================================================================================================

class View {
    constructor() {
        this.headerBlock = document.querySelector(".header");
        this.appBlock = document.querySelector(".app");
        this.footerBlock = document.querySelector(".footer");
        this.containerEl = document.querySelector(".container");
        this.sectionEl = document.querySelector(".section");
        this.fileInputEl = document.querySelector(".importer");
        this.lastPracticedEl = document.querySelector(".footer__last-practiced");
    }

    // ================================================================================================

    // handle clicks in .header
    handleHeaderClicks(handler) {
        handleHeaderClicks(handler);
    }

    // ================================================================================================

    // handle clicks in .app
    handleAppClicks(handler) {
        handleAppClicks(handler);
    }

    // ================================================================================================

    // removing the Add Word form
    removeAddForm() {
        if (document.querySelector(".form")) document.querySelector(".form").remove();
    }

    // ================================================================================================

    // rendering the Add Word form
    renderAddForm() {
        renderAddForm();
    }

    // ================================================================================================

    // adding the active class to an element
    makeActive(el, classSelector, extra) {
        [...document.querySelectorAll(classSelector)].forEach((element) => element.classList.remove("active", "glowing")); // removing from all
        el.classList.add("active"); // adding to the clicked one
        if (extra) el.classList.add("glowing");
    }

    // ================================================================================================

    // rendering .prompt
    renderPrompt(titleString, optionsArr, optionsExplainersArr, btnText) {
        renderPrompt(titleString, optionsArr, optionsExplainersArr, btnText);
    }

    // ================================================================================================

    // removing .prompt
    removePrompt() {
        if (document.querySelector(".prompt")) {
            document.querySelector(".prompt").classList.add("invisible");
            setTimeout(() => {
                document.querySelector(".prompt").remove(); // removing before rendering (if exists) with some animation
            }, 200);
        }
    }

    // ================================================================================================

    // rendering .greet-screen
    showScreen(type, nextRevisionString) {
        showScreen(type, nextRevisionString);
    }

    // ================================================================================================

    // removing .greet-screen
    removeGreetScreen() {
        if (document.querySelector(".greet-screen")) document.querySelector(".greet-screen").remove();
    }

    // ================================================================================================

    // read what element is selected now (when rendering some options)
    readSelectedOption() {
        const allOptions = [...document.querySelectorAll(".prompt__option-content")];
        const selectedEl = allOptions.find((el) => el.classList.contains("active"));
        const selectedElText = selectedEl?.textContent.trim();
        return [selectedEl, selectedElText];
    }

    // ================================================================================================

    // handling hover-ins in .app
    handleAppHoversIn() {
        handleAppHoversIn();
    }

    // ================================================================================================

    // handling hover-outs in .app
    handleAppHoversOut() {
        handleAppHoversOut();
    }

    // ================================================================================================

    // removing hover-activated popups
    removePopup() {
        if (document.querySelector(".lang-info")) [...document.querySelectorAll(".lang-info")].forEach((x) => x.remove());
    }

    // ================================================================================================

    // populating the select tag with options in the Add Word form
    populateSelect(dataArr) {
        const select = document.querySelector("select");
        const html = dataArr.map((str) => `<option value="${str.split(" ")[1].trim().toLowerCase()}">${str}</option>`); // getting html
        html.unshift('<option value="" selected disabled>Select Language</option>'); // pushing the "placeholder" first
        select.innerHTML = html.join("");
    }

    // ================================================================================================

    // handle submission of the Add form
    handleFormSubmission(handler) {
        handleFormSubmission(handler);
    }

    // ================================================================================================

    // rendering .message
    showMessage(type, text, removeAfterMs) {
        renderMessage(type, text, removeAfterMs);
    }

    // ================================================================================================

    // removing .message
    removeMessage() {
        if (document.querySelector(".message")) [...document.querySelectorAll(".message")].forEach((el) => el.remove());
    }

    // ================================================================================================

    // clearing the inputs of the Add Word form -- all except select
    clearFormFields() {
        const formElsArr = [...document.querySelector("form").elements];
        formElsArr.forEach((el) => {
            if (el.tagName !== "SELECT") el.value = ""; // clear all but select
        });
    }

    // ================================================================================================

    // rendering .round
    renderRound(wordObj, rounds, currentRound, isLastRound) {
        renderRound(wordObj, rounds, currentRound, isLastRound);
    }

    // ================================================================================================

    // removing .round
    removeRound() {
        if (document.querySelector(".round")) document.querySelector(".round").remove();
    }

    // ================================================================================================

    // removing .after
    removeEndScreen() {
        if (document.querySelector(".after")) document.querySelector(".after").remove();
    }

    // ================================================================================================

    // rendering .after
    renderEndScreen(currentQuizData, answers) {
        renderEndScreen(currentQuizData, answers);
    }

    // ================================================================================================

    // listen to specific key presses
    listenKeyPresses(handler) {
        listenKeyPresses(handler);
    }

    // ================================================================================================

    // get the values of Rate Your Knowledge btns, in .after
    getUserRated() {
        const wordsQuized = [...document.querySelectorAll(".after__item")].map((el) => el.dataset.id); // getting the IDs
        const userRated = [...document.querySelectorAll(".after__item .after__item-btn-box")].map((el) =>
            el.querySelector(".active").textContent.trim().toLowerCase()
        ); // getting what a user rated them
        return [wordsQuized, userRated];
    }

    // ================================================================================================

    // remove every child el in .app
    clearApp() {
        while (this.appBlock.firstElementChild) this.appBlock.removeChild(this.appBlock.firstElementChild);
    }

    // ================================================================================================

    // handle clicks in .actions
    handleActionsClicks(handler) {
        handleActionsClicks(handler);
    }

    // ================================================================================================

    // prompt the form to change the accent color of the interface
    promptAccentChange() {
        const newColor = prompt("Type your new interface color:");
        if (newColor && newColor.length > 0) newColor.trim();
        return newColor;
    }

    // ================================================================================================

    // change the accent color of the interface
    setAccentColor(color) {
        if (!color) return;
        document.documentElement.style.setProperty("--accent", color); // changing the accent colour
    }

    // ================================================================================================

    // render a form to add many words at once
    renderAddManyForm() {
        renderAddManyForm();
    }

    // ================================================================================================

    // handling import/file input
    handleFileImport(handler) {
        handleFileImport(handler);
    }

    // ================================================================================================

    // updating .footer__last-practiced -- 'Last practiced' and 'Sessions today'
    updateLastPracticed(lastPracticed, sessionsPlayedToday) {
        updateLastPracticed(lastPracticed, sessionsPlayedToday);
    }

    // ================================================================================================

    // removing a small spinner
    removeSpinner() {
        if (document.querySelector(".spinner")) document.querySelector(".spinner").remove();
    }

    // ================================================================================================

    // rendering a small spinner
    renderSpinner(el, position) {
        renderSpinner(el, position);
    }

    // ================================================================================================
}

export default View;
