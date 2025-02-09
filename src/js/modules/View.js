// View is responsible for everything that happens on the screen: rendering and all visual interactions with any elements

// importing dependencies:
import { renderQuickPopup, renderMessage } from "./view-dependencies/renderMethods.js";
import renderAddForm from "./view-dependencies/renderAddForm.js";
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
} from "./view-dependencies/eventHandlers.js";
import { someFrequentNouns } from "./model-dependencies/dataMyLists.js";
import listenKeyPresses from "./view-dependencies/keyCommands.js";

// ===========================================================================================================================================

class View {
    constructor() {
        this.headerBlock = document.querySelector(".header");
        this.appBlock = document.querySelector(".app");
        this.footerBlock = document.querySelector(".footer");
        this.containerEl = document.querySelector(".container");
        this.sectionEl = document.querySelector(".section");
        this.fileInputEl = document.querySelector(".importer");
    }

    // show an element
    show = (el) => el.classList.remove("hidden");

    // hide an element
    hide = (el) => el.classList.add("hidden");

    // ================================================================================================

    handleHeaderClicks(handler) {
        handleHeaderClicks(handler);
    }

    // ================================================================================================

    handleAppClicks(handler) {
        handleAppClicks(handler);
    }

    // ================================================================================================

    removeAddForm() {
        if (document.querySelector(".form")) document.querySelector(".form").remove();
    }

    // ================================================================================================

    renderAddForm() {
        renderAddForm();
    }

    // ================================================================================================

    makeActive(el, classSelector, extra) {
        [...document.querySelectorAll(classSelector)].forEach((element) => element.classList.remove("active", "glowing"));
        el.classList.add("active");
        if (extra) el.classList.add("glowing");
    }

    // ================================================================================================

    renderPrompt(titleString, optionsArr, optionsExplainersArr, btnText) {
        renderPrompt(titleString, optionsArr, optionsExplainersArr, btnText);
    }

    // ================================================================================================

    removePrompt() {
        if (document.querySelector(".prompt")) {
            document.querySelector(".prompt").classList.add("invisible");
            setTimeout(() => {
                document.querySelector(".prompt").remove(); // removing before rendering (if exists) with some animation
            }, 200);
        }
    }

    // ================================================================================================

    showScreen(type, nextRevisionString) {
        showScreen(type, nextRevisionString);
    }

    // ================================================================================================

    removeGreetScreen() {
        if (document.querySelector(".greet-screen")) document.querySelector(".greet-screen").remove();
    }

    // ================================================================================================

    // read what element is selected now (when rendering quiz options)
    readSelectedOption() {
        const allOptions = [...document.querySelectorAll(".prompt__option-content")];
        const selectedEl = allOptions.find((el) => el.classList.contains("active"));
        const selectedElText = selectedEl?.textContent.trim();
        return [selectedEl, selectedElText];
    }

    // ================================================================================================

    handleAppHoversIn() {
        handleAppHoversIn();
    }

    // ================================================================================================

    handleAppHoversOut() {
        handleAppHoversOut();
    }

    // ================================================================================================

    removePopup() {
        if (document.querySelector(".lang-info")) [...document.querySelectorAll(".lang-info")].forEach((x) => x.remove());
    }

    // ================================================================================================

    populateSelect(dataArr) {
        const select = document.querySelector("select");
        const html = dataArr.map((str) => `<option value="${str.split(" ")[1].trim().toLowerCase()}">${str}</option>`);
        html.unshift('<option value="" selected disabled>Select Language</option>');
        select.innerHTML = html.join("");
    }

    // ================================================================================================

    handleFormSubmission(handler) {
        handleFormSubmission(handler);
    }

    // ================================================================================================

    showMessage(type, text) {
        renderMessage(type, text);
    }

    // ================================================================================================

    removeMessage() {
        if (document.querySelector(".message")) document.querySelector(".message").remove();
    }

    // ================================================================================================

    clearFormFields() {
        const formElsArr = [...document.querySelector("form").elements];
        formElsArr.forEach((el) => {
            if (el.tagName !== "SELECT") el.value = ""; // clear all but select
        });
    }

    // ================================================================================================

    renderRound(wordObj, rounds, currentRound, isLastRound) {
        renderRound(wordObj, rounds, currentRound, isLastRound);
    }

    // ================================================================================================

    removeRound() {
        if (document.querySelector(".round")) document.querySelector(".round").remove();
    }

    // ================================================================================================

    removeEndScreen() {
        if (document.querySelector(".after")) document.querySelector(".after").remove();
    }

    // ================================================================================================

    renderEndScreen(currentQuizData, answers) {
        renderEndScreen(currentQuizData, answers);
    }

    // ================================================================================================

    listenKeyPresses(handler) {
        listenKeyPresses(handler);
    }

    // ================================================================================================

    getUserRated() {
        const wordsQuized = [...document.querySelectorAll(".after__item")].map((el) => el.dataset.id);
        const userRated = [...document.querySelectorAll(".after__item .after__item-btn-box")].map((el) =>
            el.querySelector(".active").textContent.trim().toLowerCase()
        );
        return [wordsQuized, userRated];
    }

    // ================================================================================================

    clearApp() {
        while (this.appBlock.firstElementChild) this.appBlock.removeChild(this.appBlock.firstElementChild);
    }

    // ================================================================================================

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
}

export default View;
