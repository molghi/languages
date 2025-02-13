import { Logic } from "../../Controller.js";
import LS from "./localStorage.js";

// ================================================================================================

// updating words after submitting the Review Your Responses screen
function updateWords(quizedWordsIds, userRatings, mode) {
    if (mode === "local") {
        quizedWordsIds.forEach((idParam, i) => {
            const index = Logic.getWordsState().findIndex((entry) => entry.id === idParam);
            Logic.getWordsState()[index].ratedAs = userRatings[i];
            Logic.getWordsState()[index].nextRevisionDateTime = determineRevisionDateTime(userRatings[i]);
        });
        LS.save(`languagesWords`, Logic.getWordsState(), "ref"); // key, value, type = "prim"
    } else if (mode === "online") {
        // an online session was just played -- so I add those words if I don't have them already (such words for a given language)
        const langPure = Logic.getState().languagePracticedNow.split(" ")[1].toLowerCase(); // getting the string of lang just practised
        userRatings.forEach((userRating, i) => {
            const index = Logic.getWordsState().findIndex(
                (stateWordObj) =>
                    stateWordObj.language.toLowerCase() === langPure &&
                    stateWordObj.word.toLowerCase() === Logic.getState().currentQuizData[i].translation
            );
            if (index >= 0) return; // means such a word for a given language already exists in my wordbase
            // otherwise, I must add this word -- and add 'ratedAs' with 'nextRevisionDateTime'
            Logic.getState().currentQuizData[i].ratedAs = userRatings[i];
            Logic.getState().currentQuizData[i].nextRevisionDateTime = determineRevisionDateTime(userRatings[i]);
            Logic.getWordsState().push(Logic.getState().currentQuizData[i]);
        });
        LS.save(`languagesWords`, Logic.getWordsState(), "ref"); // key, value, type = "prim"
    }
}

// ================================================================================================

// dependency of 'updateWords'
function determineRevisionDateTime(category) {
    const now = new Date();
    const nowTime = now.getTime();
    let result;

    if (category === "wrong") {
        // revision today, just a bit later: in 10-30-60 minutes
        const minutes = 10;
        const inMs = minutes * 60 * 1000;
        result = nowTime + inMs;
    } else if (category === "hard") {
        // revision tomorrow: in 24 hours
        const hours = 24;
        const inMs = hours * 60 * 60 * 1000;
        result = nowTime + inMs;
    } else if (category === "good") {
        // revision in 3-4 days
        const days = 4;
        const inMs = days * 24 * 60 * 60 * 1000;
        result = nowTime + inMs;
    } else if (category === "easy") {
        // revision in 7-10 days
        const days = 9;
        const inMs = days * 24 * 60 * 60 * 1000;
        result = nowTime + inMs;
    }

    return result;
}

// ================================================================================================

export default updateWords;
