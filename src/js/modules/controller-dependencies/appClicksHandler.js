import { Visual, Logic } from "../../Controller.js";
import formHandler from "./formHandler.js";
import beginOnlineSession from "./beginOnlineSession.js";

// ================================================================================================

// handle clicks in .app -- general router function
function appClicksHandler(clickedEl, text, modeChosen) {
    if (text === `select language >`) {
        // do what: render another prompt: Select Language
        Logic.setMode(modeChosen); // setting if this is an online or local session
        selectLanguage();
    }
    if (text === `begin practice >`) {
        // do what: start the quiz
        beginPractice();
    }
    if (clickedEl === `add`) {
        // do what: add a word
    }
    if (clickedEl === `bulk add`) {
        // it was a click on Add Multiple btn -- show such a form for it
        Visual.renderAddManyForm();
        Visual.handleFormSubmission(formHandler); // handling this form submission
    }
    if (clickedEl === `next round >`) {
        // do what: render next round
        nextRound();
    }
    if (clickedEl === `finish session >`) {
        // do what: render .after
        finishSession();
    }
    if (clickedEl === `rate`) {
        // happens when rating one's knowledge in .after for each question
        const clickedEl = text;
        const ofItem = clickedEl.closest(".after__item"); // capturing the topmost parent
        [...ofItem.querySelectorAll("button")].forEach((btnEl) => btnEl.classList.remove("active")); // removing active class from all btns
        clickedEl.classList.add("active"); // adding active class to the clicked btn
    }
    if (clickedEl === `submit review`) {
        // submitting .after
        submitResults();
    }
    if (clickedEl === `another yes`) {
        // do what: generate another practice session (it was a click on Yes to the question Another Session?)
        const languagePractised = Logic.getLanguagePracticedNow(); // getting the lang with which I just practised
        beginPractice(languagePractised);
    }
    if (clickedEl === `another no`) {
        // do what: show main screen (advice)
        [...document.querySelectorAll(".header__btn")].forEach((btn) => btn.classList.remove("active")); // removing active class from header btns
        Visual.clearApp(); // removing all child elements in .app
        Visual.showScreen("advise"); // showing the advice screen/block
    }
}

// ================================================================================================

// dependency of 'appClicksHandler' -- runs when you click on 'Select Language >'
function selectLanguage() {
    const [selectedEl, selectedElText] = Visual.readSelectedOption(); // getting what element was selected on the screen
    const selectedChoice = selectedElText;

    if (selectedChoice === "Review Your Words") {
        // I have chosen to practice with the words I have interacted with before
        const langsAdded = Logic.getAddedLangs(); // based on all words I have added, I get all languages I have added -- only those must be shown, not all 25
        const languages = Logic.getLangsList("pure"); // getting the list of lang names
        const langsFiltered = languages.filter((langString) => {
            const justName = langString.split(" ")[1].toLowerCase();
            if (langsAdded.includes(justName)) return langString;
        });
        const indeces = langsFiltered.map((lang) => languages.findIndex((x) => x === lang));
        const langsToRender = Logic.getLangsList().filter((entry, index) => indeces.includes(index));
        Visual.renderPrompt("Select Language", langsToRender, [], "Begin Practice >"); // rendering the possible language choices -- only those I have added or interacted with before
    } else if (selectedChoice === "New Online Session") {
        // I have chosen to practice with the words freshly fetched online
        const languages = Logic.getLangsList(); // getting the list of lang names and country flags
        Visual.renderPrompt("Select Language", languages, [], "Begin Practice >"); // rendering the language choices screen, all 25 langs
    }
}

// ================================================================================================

// dependency of 'appClicksHandler' -- runs when you click on 'Begin Practice >'
function beginPractice(lang) {
    const mode = Logic.getMode(); // getting mode: local or online

    let [selectedEl, selectedElText] = Visual.readSelectedOption(); // getting what element was selected on the screen
    if (lang) selectedElText = lang;
    if (!selectedElText) return;

    Logic.setLanguagePracticedNow(selectedElText); // setting the language about to be practised now
    const selectedLanguage = selectedElText; // language that was chosen: emoji and text capitalised
    const justLangName = selectedLanguage.split(" ")[1].toLowerCase(); // getting only the lang name

    if (mode === "local") {
        // means this will be a local session: with the words a user has already interacted with
        Visual.removePopup(); // removing my custom-made pop-ups just in case
        Logic.resetAnswers(); // resetting after the last quiz (if there were any)
        beginLocalSession(justLangName);
    } else if (mode === "online") {
        // means this will be an online session: with the words and examples fetched from elsewhere
        Logic.resetAnswers();
        beginOnlineSession();
    }
}

// ================================================================================================

// dependency of 'beginPractice' -- commencing a local review session
function beginLocalSession(justLangName) {
    const practiceWords = Logic.getQuizWords(justLangName); // get 10 or less word objs from state, filtered by this language; either random or shuffled

    if (practiceWords.length > 0) {
        // means there are words that can be practiced now, according to SRS, so I render the quiz
        Logic.setQuizWords(practiceWords); // setting words/rounds for this quiz session; number of words = number of rounds
        Logic.setRoundsNumber(practiceWords.length); // setting how many rounds there'll be
        Logic.resetRoundCounter(); // resetting the current round counter
        const roundsNumber = Logic.getRoundsNumber(); // getting how many rounds there'll be
        const roundCounter = Logic.getRoundCounter(); // getting the value of now-round
        const wordObjNow = Logic.getThisQuizData()[roundCounter]; // getting the data for the first quiz question
        Logic.incrementRoundCounter(); // incrementing the round counter
        Visual.clearApp(); // clearing every child element of .app
        Visual.renderRound(wordObjNow, roundsNumber, roundCounter); // rendering quiz question
    } else {
        // means there are no words that can be practiced now, I have gone through them all, so I just show a message
        Visual.clearApp(); // clearing every child element of .app
        const nextRevisionString = Logic.getNextRevisionDate(); // getting when is the next scheduled revision
        Visual.showScreen("revisions completed", nextRevisionString); // showing the message
    }
}

// ================================================================================================

// dependency of 'appClicksHandler'
function nextRound() {
    const inputEl = document.querySelector(".round input");

    if (inputEl.value.trim().length === 0) {
        // if input is empty, you cannot have the next round
        Visual.showMessage("error", "You must type your answer before proceeding to the next round");
    } else {
        // render next round
        const inputEl = document.querySelector(".round input");
        Logic.pushAnswer(inputEl.value); // register answer
        const roundsNumber = Logic.getRoundsNumber(); // get total rounds number
        const roundCounter = Logic.getRoundCounter(); // get the now-round number
        let isLastRound = false;
        if (roundCounter === roundsNumber - 1) isLastRound = true; // if it's the last round, the btn changes to 'Finish Session'
        const wordObjNow = Logic.getThisQuizData()[roundCounter]; // getting quiz data to render
        Logic.incrementRoundCounter(); // incrementing the round counter
        Visual.renderRound(wordObjNow, roundsNumber, roundCounter, isLastRound); // rendering quiz question
    }
}

// ================================================================================================

// dependency of 'appClicksHandler'
function finishSession() {
    const inputEl = document.querySelector(".round input");
    Logic.pushAnswer(inputEl.value); // registering the last answer
    Logic.resetRoundCounter(); // resetting the current round counter
    Visual.clearApp(); // removing every child of .app
    const answersArr = Logic.getAnswers(); // getting all user answers (arr)
    const currentQuizData = Logic.getThisQuizData(); // getting all quiz questions data
    Visual.renderEndScreen(currentQuizData, answersArr); // rendering the .after block
}

// ================================================================================================

// dependency of 'appClicksHandler'
function submitResults() {
    const questionsNumber = [...document.querySelectorAll(".after__item")].length; // getting the total num of questions in that quiz
    const checkedBtnsNum = [...document.querySelectorAll(".after button")].filter((btnEl) =>
        btnEl.classList.contains("active")
    ).length; // getting the number of btns with .active class

    if (questionsNumber !== checkedBtnsNum) {
        Visual.showMessage("error", `You haven't rated your knowledge for each question yet`);
    } else {
        const [quizedWordsIds, userRatings] = Visual.getUserRated(); // getting 2 arrays: quiz words ids and all responses to Rate Your Knowledge for each quiz question
        const mode = Logic.getMode(); // mode: local or online
        Logic.updateWords(quizedWordsIds, userRatings, mode); // updating in state and LS (setting next revision dates) -- if mode was online, some of those words must also be pushed to state/LS
        Visual.clearApp(); // clearing .app
        Logic.setLastPracticed(new Date().toISOString()); // setting when I practiced last
        Logic.setSessionsPlayedToday(); // incrementing the number of sessions played today
        const lastPracticed = Logic.getLastPracticed(); // getting data to update Last Practiced element (1)
        const sessionsPlayedToday = Logic.getSessionsPlayedToday(); // getting data to update Last Practiced element (2)
        Visual.updateLastPracticed(lastPracticed, sessionsPlayedToday); // updating Last Practiced element
        Visual.showScreen("uponSubmit"); // showing a message screen/block: "Review submitted! Another session?"
    }
}

// ================================================================================================

export default appClicksHandler;
