import { Visual, Logic } from "../../Controller.js";

// ================================================================================================

function appClicksHandler(clickedEl, text) {
    console.log(clickedEl, text);
    if (text === `select language >`) {
        // render another prompt: Select Language
        selectLanguage();
    }
    if (text === `begin practice >`) {
        // start the quiz
        beginPractice();
    }
    if (clickedEl === `add`) {
        // add a word
    }
    if (clickedEl === `next round >`) {
        nextRound();
    }
    if (clickedEl === `finish session >`) {
        finishSession();
    }
    if (clickedEl === `rate`) {
        // rating one's knowledge in .after for each question
        const clickedEl = text;
        const ofItem = clickedEl.closest(".after__item");
        [...ofItem.querySelectorAll("button")].forEach((btnEl) => btnEl.classList.remove("active")); // removing active class from all btns
        clickedEl.classList.add("active"); // adding active class to the clicked btn
    }
    if (clickedEl === `submit`) {
        // submitting .after
        submitResults();
    }
}

// ================================================================================================

// dependency of 'appClicksHandler'
function selectLanguage() {
    // render another prompt: Select Language
    const [selectedEl, selectedElText] = Visual.readSelectedOption(); // getting what element was selected on the screen
    const selectedChoice = selectedElText; // either From Saved or From Online

    if (selectedChoice === "From Saved") {
        // I have chosen to practice with the words I have interacted with before
        const langsAdded = Logic.getAddedLangs(); // based on all words I have added, I get all languages I have added -- only those must be shown, not all 30
        const languages = Logic.getLangsList("pure"); // getting the list of lang names
        const langsFiltered = languages.filter((langString) => {
            const justName = langString.split(" ")[1].toLowerCase();
            if (langsAdded.includes(justName)) return langString;
        });
        const indeces = langsFiltered.map((lang) => languages.findIndex((x) => x === lang));
        const langsToRender = Logic.getLangsList().filter((entry, index) => indeces.includes(index));
        Visual.renderPrompt("Select Language", langsToRender, [], "Begin Practice >"); // rendering the language choices -- only those I have added before
    } else if (selectedChoice === "From Online") {
        // I have chosen to practice with the words freshly fetched online
        const languages = Logic.getLangsList(); // getting the list of lang names and country flags
        Visual.renderPrompt("Select Language", languages, [], "Begin Practice >"); // rendering the language choices
    }
}

// ================================================================================================

// dependency of 'appClicksHandler'
function beginPractice() {
    // start the quiz
    const [selectedEl, selectedElText] = Visual.readSelectedOption(); // getting what element was selected on the screen
    const selectedLanguage = selectedElText; // language that was chosen: emoji and text capitalised
    const justLangName = selectedLanguage.split(" ")[1].toLowerCase(); // getting only the lang name

    const practiceWords = Logic.getQuizWords(justLangName); // get 10 or less word objs from state, filtered by this language; random indeces if more than 10 words, shuffled if less

    if (practiceWords.length > 0) {
        // means there are words that can be practiced now, according to SRS, so I render the quiz
        Logic.setQuizWords(practiceWords); // setting words/rounds for this quiz session; number of words = number of rounds
        Logic.setRoundsNumber(practiceWords.length);
        const roundsNumber = Logic.getRoundsNumber();
        const roundCounter = Logic.getRoundCounter();
        const wordObjNow = Logic.getThisQuizData()[roundCounter];
        Logic.incrementRoundCounter();
        Visual.removePrompt();
        Visual.renderRound(wordObjNow, roundsNumber, roundCounter); // render quiz questions
    } else {
        // means there are no words that can be practiced now, I have gone through them all, so I just show a message
        console.log(`no practice now`);
        Visual.clearApp(); // clearing everything that .app has
        const nextRevisionString = Logic.getNextRevisionDate();
        Visual.showScreen("revisions completed", nextRevisionString);
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
        Logic.pushAnswer(inputEl.value);
        const roundsNumber = Logic.getRoundsNumber();
        const roundCounter = Logic.getRoundCounter();
        let isLastRound = false;
        if (roundCounter === roundsNumber - 1) isLastRound = true;
        const wordObjNow = Logic.getThisQuizData()[roundCounter];
        Logic.incrementRoundCounter();
        Visual.renderRound(wordObjNow, roundsNumber, roundCounter, isLastRound); // render quiz questions
    }
}

// ================================================================================================

// dependency of 'appClicksHandler'
function finishSession() {
    const inputEl = document.querySelector(".round input");
    Logic.pushAnswer(inputEl.value);
    Visual.removeRound();
    const answersArr = Logic.getAnswers();
    const currentQuizData = Logic.getThisQuizData();
    Visual.renderEndScreen(currentQuizData, answersArr);
}

// ================================================================================================

// dependency of 'appClicksHandler'
function submitResults() {
    const questionsNumber = [...document.querySelectorAll(".after__item")].length; // getting the total num of questions in that quiz
    const checkedBtnsNum = [...document.querySelectorAll(".after button")].filter((btnEl) =>
        btnEl.classList.contains("active")
    ).length; // getting the number of btns with .active class

    if (questionsNumber !== checkedBtnsNum) {
        Visual.showMessage("error", `You haven't rated your knowledge in each question yet`);
    } else {
        const [quizedWordsIds, userRatings] = Visual.getUserRated(); // getting 2 arrays: quiz words ids and all responses to Rate Your Knowledge
        Logic.updateWords(quizedWordsIds, userRatings);
        Visual.removeEndScreen(); // removing this Results screen
        Visual.showScreen("uponSubmit"); // showing message screen like: Submitted! Another one?
    }
}

// ================================================================================================

export default appClicksHandler;
