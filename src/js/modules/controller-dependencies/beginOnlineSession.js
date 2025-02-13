import { Visual, Logic } from "../../Controller.js";

// ================================================================================================

// dependency of 'beginPractice' -- commencing an online review session
async function beginOnlineSession() {
    const tenRandomWords = Logic.selectFromDatasets(); // an array of strings: 10 random English words from my long word datasets (duplicates are possible)

    const wordsFiltered = tenRandomWords
        .map((word) => word.replace("to ", "").trim())
        .filter((word) => !word.includes(" "))
        .filter((item) => /^[A-Za-z]+$/.test(item))
        .map((word) => word.toLowerCase()); // removing those items that have more than 2 whitespaces and non-letter characters because Free Dict API does not allow such queries

    if (document.querySelector(".prompt__option-action-content")) {
        Visual.renderSpinner(document.querySelector(".prompt__option-action-content")); // rendering spinner whilst fetching
    }
    if (document.querySelector(".greet-screen")) {
        Visual.renderSpinner(document.querySelector(".greet-screen"), "moved"); // this happens if I clicked yes on the "Another Session?" screen
    }
    const examplesWithThem = await Logic.fetchExamples(wordsFiltered); // fetching examples in English with those words
    const language = Logic.getLanguagePracticedNow().split(" ")[1].toLowerCase(); // getting language to be practised now
    const languageCode = Logic.getLangCode(language); // getting the code of this lang (specified by the translation API)
    const [translatedWords, translatedExamples] = await Logic.fetchTranslations(wordsFiltered, examplesWithThem, languageCode); // fetching translations of words and examples
    Visual.removeSpinner(); // removing spinner (if exists)

    const wordEntries = formWordEntries(wordsFiltered, translatedExamples, examplesWithThem, language, translatedWords); // forming word entries

    Visual.removePopup();
    if (wordEntries.length > 0) {
        // means there are words that can be practiced now, according to SRS, so I render the quiz
        Logic.setQuizWords(wordEntries); // setting words/rounds for this quiz session; number of words = number of rounds
        Logic.setRoundsNumber(wordEntries.length); // setting how many rounds there'll be
        Logic.resetRoundCounter(); // resetting the current round counter
        const roundsNumber = Logic.getRoundsNumber(); // getting how many rounds there'll be
        const roundCounter = Logic.getRoundCounter(); // getting the value of now-round
        const wordObjNow = Logic.getThisQuizData()[roundCounter]; // getting the data for the first quiz question
        Logic.incrementRoundCounter(); // incrementing the round counter
        Visual.clearApp(); // clearing .app
        Visual.renderRound(wordObjNow, roundsNumber, roundCounter); // rendering a quiz question
    } else {
        // means there are no words that can be practiced now, fetching online returned no results, so I show a message
        Visual.clearApp(); // clearing .app
        Visual.showScreen(`online failed`); // showing the Apologies Try Later screen
    }
}

// ================================================================================================

// dependency of 'beginOnlineSession'
function formWordEntries(wordsFiltered, translatedExamples, examplesWithThem, language, translatedWords) {
    let counter = 1;
    const wordEntries = wordsFiltered.map((translation, i) => {
        const obj = {};
        const targetExample = !translatedExamples[i].result
            ? ""
            : `${translatedExamples[i].result} <span class="round__row-span">(${translatedExamples[i].targetTransliteration})</span>`;
        const theNote = !translatedExamples[i].result
            ? ""
            : `(Content fetched online can be a bit off...) <span class="round__row-span">If it is very off, I hope it made you smile ;)</span>`;
        obj.added = new Date().toISOString();
        obj.definition = "";
        obj.exampleTarget = targetExample;
        obj.exampleTranslation = examplesWithThem[i];
        obj.id = new Date().getTime() + `.${counter}`;
        obj.language = language;
        obj.note = theNote;
        obj.pronunciation = translatedWords[i].targetTransliteration;
        obj.translation = translation;
        obj.word = translatedWords[i].result;
        counter += 1;
        return obj;
    });
    return wordEntries;
}

// ================================================================================================

export default beginOnlineSession;

/* 
const wordsToTranslate = tenRandomWords
        .filter((word) => word.lastIndexOf(" ") === 2 || word.lastIndexOf(" ") === -1)
        .filter((item) => /^[A-Za-z]+( [A-Za-z]+)?$/.test(item))
        .map((word) => word.toLowerCase()); // I thought preserving "to " in verbs would be better for translatations but no, it's even weirder: to create was translated as chtoby sozdat...
*/
