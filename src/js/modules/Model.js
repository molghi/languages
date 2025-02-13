// Model is responsible for all logic in the app: all computations, calculations, and data operations

// importing dependencies:
import { fetchTranslation, fetchFreeDictionary } from "./model-dependencies/api.js";
import getLangsList from "./model-dependencies/getLangsList.js";
import LS from "./model-dependencies/localStorage.js";
import exportAsJson from "./model-dependencies/export.js";
import selectFromDatasets from "./model-dependencies/selectFromDatasets.js";
import checkNewColor from "./model-dependencies/checkNewColor.js";
import updateWords from "./model-dependencies/updateWords.js";
import getNextRevisionDate from "./model-dependencies/getNextRevisionDate.js";
import getQuizWords from "./model-dependencies/getQuizWords.js";
import getPopularLangCodes from "./model-dependencies/getPopularLangCodes.js";
import sortOxfordData from "./model-dependencies/sortOxfordData.js";

// ==============================================================================================================================================

class Model {
    #state = {
        words: [], // main app data here
        currentQuizData: "",
        currentQuizAnswers: [],
        roundCounter: 0,
        roundsNumber: 0,
        accentColor: "coral",
        lastPracticed: "Never", // will be the data object
        sessionsPlayedToday: 0, // number of sessions played
        lastPracticedTimer: 0,
        languagePracticedNow: "",
        quizMode: "",
        myLanguages: {},
    };

    constructor() {
        this.fetchWordsLS(); // fetching from LS
        this.fetchAccentColor(); // fetching from LS
        this.fetchLastPracticed(); // fetching from LS
        this.fetchSessionsPlayedToday(); // fetching from LS
        this.getPopularLangCodes(); // fetching popular language codes from the lingvanex API
    }

    // ================================================================================================

    getState = () => this.#state;

    // ================================================================================================

    // fetching examples in English
    fetchFreeDictionary = (word) => fetchFreeDictionary(word); // second fetchFreeDictionary is an imported func

    async fetchExamples(dataArr) {
        const words = dataArr.map((word) => word.replace("to ", "")); // replacing 'to ' with '' because that API only works like that
        const results = await Promise.all(words.map((word) => fetchFreeDictionary(word))); // using Promise.all() to ensure that all promises are resolved before returning the final results -- .map alone doesn't handle async op's properly
        const chooseRandom = (arr) => Math.floor(Math.random() * arr.length); // helper fn; returns random index of 'arr'
        const resultsPrettified = results.map((resArr) => {
            if (resArr.length === 0) return ""; // if there is no example, as it can be, return empty string
            else {
                const randomIndex = chooseRandom(resArr);
                return resArr[randomIndex]; // choosing one random example out of the examples array (there can be many examples)
            }
        });
        return resultsPrettified;
    }

    // ================================================================================================

    // translating into different languages
    fetchTranslation = (word, langCode) => fetchTranslation(word, langCode); // second fetchTranslation is an imported func

    // returns 2 arrays: translated words and translated examples
    async fetchTranslations(arrWords, arrExamples, langCode) {
        const arrTranslatedWords = await Promise.all(arrWords.map((word) => fetchTranslation(word, langCode)));
        const arrTranslatedExamples = await Promise.all(
            arrExamples.map((example) => {
                if (example)
                    return fetchTranslation(example, langCode); // translate only if it's not an empty string (if it exists)
                else return "";
            })
        );
        return [arrTranslatedWords, arrTranslatedExamples];
    }

    // ================================================================================================

    // getting and setting languagePracticedNow
    setLanguagePracticedNow = (value) => (this.#state.languagePracticedNow = value);
    getLanguagePracticedNow = () => this.#state.languagePracticedNow;

    // ================================================================================================

    // getting, setting and fetching lastPracticed
    getLastPracticed = () => this.#state.lastPracticed;

    setLastPracticed = (value) => {
        this.#state.lastPracticed = value;
        LS.save(`languagesLastPracticed`, this.#state.lastPracticed, "prim"); // key, value, type = "prim"
    };

    fetchLastPracticed() {
        const fetched = LS.get(`languagesLastPracticed`, "prim"); // key, type = "primitive"
        if (!fetched) return;
        this.#state.lastPracticed = fetched;
    }

    // ================================================================================================

    // getting, setting and fetching sessionsPlayedToday
    getSessionsPlayedToday = () => this.#state.sessionsPlayedToday;

    setSessionsPlayedToday = () => {
        this.#state.sessionsPlayedToday += 1;
        const nowDate = new Date().getDate();
        const nowMonth = new Date().getMonth();
        const nowYear = new Date().getFullYear();
        const lastPracticedDate = new Date(this.#state.lastPracticed).getDate();
        const lastPracticedMonth = new Date(this.#state.lastPracticed).getMonth();
        const lastPracticedYear = new Date(this.#state.lastPracticed).getFullYear();
        if (nowDate !== lastPracticedDate || nowMonth !== lastPracticedMonth || nowYear !== lastPracticedYear)
            this.#state.sessionsPlayedToday = 0;
        LS.save(`languagesSessionsPlayed`, this.#state.sessionsPlayedToday, "prim"); // key, value, type = "prim"
    };

    fetchSessionsPlayedToday() {
        const fetched = LS.get(`languagesSessionsPlayed`, "prim"); // key, type = "primitive"
        if (!fetched) return;
        this.#state.sessionsPlayedToday = +fetched;

        const nowDate = new Date().getDate();
        const nowMonth = new Date().getMonth();
        const nowYear = new Date().getFullYear();
        const lastPracticedDate = new Date(this.#state.lastPracticed).getDate();
        const lastPracticedMonth = new Date(this.#state.lastPracticed).getMonth();
        const lastPracticedYear = new Date(this.#state.lastPracticed).getFullYear();
        if (nowDate !== lastPracticedDate || nowMonth !== lastPracticedMonth || nowYear !== lastPracticedYear)
            this.#state.sessionsPlayedToday = 0;
    }

    // ================================================================================================

    // sorting/prettifying the data from 'dataOxford.js'
    sortOxfordData = () => sortOxfordData(); // the second sortOxfordData is an imported func

    // ================================================================================================

    // getting popular language codes from the API
    async getPopularLangCodes() {
        await getPopularLangCodes();
    }

    // ================================================================================================

    // get the code of this language
    getLangCode = (langName) => this.#state.myLanguages[langName];

    // ================================================================================================

    // getting the list of languages to display in the UI
    getLangsList = (type) => getLangsList(type); // the second getLangsList is an imported func

    // ================================================================================================

    // adding one word
    addWord(dataObj) {
        this.#state.words.push(dataObj); // pushing to state
        LS.save(`languagesWords`, this.#state.words, "ref"); // pushing to LS; key, value, type = "prim"
    }

    // fetching words from LS
    fetchWordsLS() {
        const fetched = LS.get(`languagesWords`, "ref"); // key, type = "primitive"
        if (!fetched) return;
        fetched.forEach((wordObj) => this.#state.words.push(wordObj));
    }

    // getting all words from the state
    getWordsState = () => this.#state.words;

    // ================================================================================================

    // getting the languages that I have added / that are in state
    getAddedLangs() {
        const stateWords = this.#state.words;
        const langs = stateWords.map((wordObj) => wordObj.language.toLowerCase());
        return [...new Set(langs)]; // returning it cleaned from duplicates
    }

    // ================================================================================================

    // returns an array of indeces randomly shuffled
    shuffleArray(numberOfElements) {
        const result = [];
        while (result.length < numberOfElements) {
            const randomNum = Math.floor(Math.random() * numberOfElements); // between 0 and numberOfElements (excl. last)
            if (!result.includes(randomNum)) result.push(randomNum);
        }
        return result;
    }

    // ================================================================================================

    // getting a random number
    getRandomNum = (upperLimit) => Math.floor(Math.random() * upperLimit); // between 0 and upperLimit (excl. last)

    // ================================================================================================

    // returns the array of 10 elements: indeces from 0 to upperLimit (excl. last)
    getRandomTen(upperLimit) {
        const arr = [];
        while (arr.length < 10) {
            const randomNum = this.getRandomNum(upperLimit);
            if (!arr.includes(randomNum)) arr.push(randomNum);
        }
        return arr;
    }

    // ================================================================================================

    // get 10 or less words from state, filtered by this language -- random words? random if more than 10. random or shuffled
    getQuizWords = (language) => getQuizWords(language); // the second getQuizWords is an imported func

    // ================================================================================================

    // returns a string formatted like: "15/2/2025 at 15:35 (in 2 days and 9 hours)"
    getNextRevisionDate = () => getNextRevisionDate(); // the second getNextRevisionDate is an imported func

    // ================================================================================================

    // setting and getting the mode of the quiz about to be conducted: local or online
    setMode = (mode) => (this.#state.quizMode = mode);
    getMode = () => this.#state.quizMode;

    // ================================================================================================

    // setting the data for the current quiz
    setQuizWords = (dataArr) => (this.#state.currentQuizData = dataArr);

    // getting the data of the current quiz
    getThisQuizData = () => this.#state.currentQuizData;

    // ================================================================================================

    // incrementing, getting and resetting the current round counter
    incrementRoundCounter = () => (this.#state.roundCounter += 1);
    getRoundCounter = () => this.#state.roundCounter;
    resetRoundCounter = () => (this.#state.roundCounter = 0);

    // ================================================================================================

    // getting and setting total rounds number
    getRoundsNumber = () => this.#state.roundsNumber;
    setRoundsNumber = (value) => (this.#state.roundsNumber = value);

    // ================================================================================================

    // pushing one answer
    pushAnswer = (string) => this.#state.currentQuizAnswers.push(string.trim());

    // getting all answers
    getAnswers = () => this.#state.currentQuizAnswers;
    resetAnswers = () => (this.#state.currentQuizAnswers = []);

    // ================================================================================================

    // updating words after submitting the Review Your Responses screen
    updateWords = (quizedWordsIds, userRatings, mode) => updateWords(quizedWordsIds, userRatings, mode); // the second updateWords is an imported func

    // ================================================================================================

    // checking the input accent color -- returns string (color in rgb)
    checkNewColor = (newColor) => checkNewColor(newColor); // the second checkNewColor is an imported func

    // setting new accent color - in the state and pushing to LS
    setAccentColor(color) {
        this.#state.accentColor = color;
        LS.save("languagesAccentColor", this.#state.accentColor, "prim"); // push to LS a primitive type
    }

    // getting the accent color from LS
    fetchAccentColor() {
        const fetched = LS.get("languagesAccentColor", "prim");
        if (!fetched) return;
        this.#state.accentColor = fetched;
    }

    // getting the accent color from the state
    getAccentColor = () => this.#state.accentColor;

    // ================================================================================================

    // exporting json
    exportWords = () => exportAsJson();

    // ================================================================================================

    // saving words to LS
    saveWords = () => LS.save(`languagesWords`, this.#state.words, "ref"); // key, value, type = "prim"

    // ================================================================================================

    // starting the Last Practiced timer
    startLastPracticedTimer(handler) {
        this.stopLastPracticedTimer(); // stopping first (if running)
        this.#state.lastPracticedTimer = setInterval(() => {
            handler();
        }, 1000 * 60); // every minute
    }

    // ================================================================================================

    // clearing the Last Practiced timer
    stopLastPracticedTimer = () => clearInterval(this.#state.lastPracticedTimer);

    // ================================================================================================

    // selecting 10 random English words from those word datasets that I have in js files here (no duplicates)
    selectFromDatasets = () => selectFromDatasets(); // the second selectFromDatasets is an imported func

    // ================================================================================================
}

export default Model;
