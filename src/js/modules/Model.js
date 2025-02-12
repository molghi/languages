// Model is responsible for all logic in the app: all computations, calculations, and data operations

import all from "./model-dependencies/dataOxford.js"; // must be tidied up
import {
    myListVerbs,
    myListAdjs,
    someFrequentNouns,
    topicFamily,
    topicBody,
    topicGeo,
    someExpressions,
    topicAnimals,
    topicFoodDrinks,
    topicHome,
    topicClothes,
    topicDirections,
    topicTime,
    topicMaterials,
    topicNumbers,
    topicReligion,
    topicFrequency,
    topicUrgency,
    topicInformal,
    topicSwearWords,
    topicUnsorted,
    topicPrepositions,
    topicConjunctions,
    topicGlueWords,
    topicBasicPhrases,
} from "./model-dependencies/dataMyLists.js"; // already clean, what's imported
import {
    fetchLangs,
    fetchTranslation,
    fetchWebsterLearner,
    fetchWebsterIntermediate,
    fetchFreeDictionary,
} from "./model-dependencies/api.js";
import getLangsList from "./model-dependencies/getLangsList.js";
import LS from "./model-dependencies/localStorage.js";
import exportAsJson from "./model-dependencies/export.js";

// ================================================================================================

class Model {
    #state = {
        words: [],
        currentQuizData: "",
        currentQuizAnswers: [],
        roundCounter: 0,
        roundsNumber: 0,
        accentColor: "coral",
        lastPracticed: "Never", // data object
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

        // this.fetchWebsterLearner(`electricity`);
        // this.fetchWebsterIntermediate(`electricity`);
        // this.fetchTranslation(`apple`);
        // this.fetchFreeDictionary("die");
        // this.fetcher();
        this.getPopularLangCodes();
    }

    // ================================================================================================

    async fetcher() {
        try {
            const res = await fetch(`https://tatoeba.org/en/api_v0/search?from=eng&query=%3Dconflict`);
            if (!res.ok) throw new Error("Something failed...");
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    fetchWebsterLearner(word) {
        fetchWebsterLearner(word);
    }

    fetchWebsterIntermediate(word) {
        fetchWebsterIntermediate(word);
    }

    fetchTranslation(word, langCode) {
        fetchTranslation(word, langCode);
    }

    // using it to fetch examples
    fetchFreeDictionary(word) {
        return fetchFreeDictionary(word);
    }

    async fetchExamples(dataArr) {
        const words = dataArr.map((word) => word.replace("to ", "")); // replacing 'to ' with '' because that API only works like that
        const results = await Promise.all(words.map((word) => fetchFreeDictionary(word))); // using Promise.all() to ensure that all promises are resolved before returning the final results -- .map alone doesn't handle async op's properly
        const chooseRandom = (arr) => Math.floor(Math.random() * arr.length); // helper fn; returns random index of 'arr'
        const resultsPrettified = results.map((resArr) => {
            if (resArr.length === 0) return "";
            else {
                const randomIndex = chooseRandom(resArr);
                return resArr[randomIndex];
            }
        });
        return resultsPrettified;
    }

    // returns 2 arrays: translated words and translated examples
    async fetchTranslations(arrWords, arrExamples, langCode) {
        const arrTranslatedWords = await Promise.all(arrWords.map((word) => fetchTranslation(word, langCode)));
        const arrTranslatedExamples = await Promise.all(
            arrExamples.map((example) => {
                if (example) return fetchTranslation(example, langCode);
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
        const lastPracticedDate = new Date(this.#state.lastPracticed).getDate();
        if (nowDate !== lastPracticedDate) this.#state.sessionsPlayedToday = 0;
        LS.save(`languagesSessionsPlayed`, this.#state.sessionsPlayedToday, "prim"); // key, value, type = "prim"
    };

    fetchSessionsPlayedToday() {
        const fetched = LS.get(`languagesSessionsPlayed`, "prim"); // key, type = "primitive"
        if (!fetched) return;
        this.#state.sessionsPlayedToday = +fetched;
    }

    // ================================================================================================

    // sort the data from 'dataOxford.js'
    sortOxfordData() {
        const allTogether = all;

        // prettifying:
        const verbs = allTogether.filter((wordString) => wordString.includes(" v.")).map((str) => str.split(" ")[0]);
        const nouns = allTogether.filter((wordString) => wordString.includes(" n.")).map((str) => str.split(" ")[0]);
        const adjectives = allTogether.filter((wordString) => wordString.includes(" adj.")).map((str) => str.split(" ")[0]);
        const adverbs = allTogether.filter((wordString) => wordString.includes(" adv.")).map((str) => str.split(" ")[0]);
        const prepositions = allTogether.filter((wordString) => wordString.includes(" prep.")).map((str) => str.split(" ")[0]);
        const exclamations = allTogether.filter((wordString) => wordString.includes(" exclam.")).map((str) => str.split(" ")[0]);
        const determiners = allTogether.filter((wordString) => wordString.includes(" det.")).map((str) => str.split(" ")[0]);
        const pronouns = allTogether.filter((wordString) => wordString.includes(" pron.")).map((str) => str.split(" ")[0]);
        const conjunctions = allTogether.filter((wordString) => wordString.includes(" conj.")).map((str) => str.split(" ")[0]);
        const numbers = allTogether.filter((wordString) => wordString.includes(" number")).map((str) => str.split(" ")[0]);
        const modalVerbs = allTogether.filter((wordString) => wordString.includes(" modal v.")).map((str) => str.split(" ")[0]);

        return [
            ...verbs,
            ...nouns,
            ...adjectives,
            ...adverbs,
            ...prepositions,
            ...exclamations,
            ...determiners,
            ...pronouns,
            ...conjunctions,
            ...numbers,
            ...modalVerbs,
        ];
        // return [
        //     verbs,
        //     nouns,
        //     adjectives,
        //     adverbs,
        //     prepositions,
        //     exclamations,
        //     determiners,
        //     pronouns,
        //     conjunctions,
        //     numbers,
        //     modalVerbs,
        // ];
    }

    // ================================================================================================

    // getting popular language codes from the api
    async getPopularLangCodes() {
        const fetched = await fetchLangs();
        const popularLanguages = [
            "English (Great Britain)",
            "Chinese (simplified)",
            "Hindi",
            "Spanish (Mexico)",
            "French (France)",
            "Arabic (Egypt)",
            "Bengali",
            "Portuguese (Brazil)",
            "Russian",
            "Urdu",
            "German",
            "Czech",
            "Icelandic",
            "Latin",
            "Japanese",
            "Swahili",
            "Turkish",
            "Italian",
            "Persian",
            "Korean",
            "Vietnamese",
            "Polish",
            "Thai",
            "Greek",
            "Hebrew",
        ]; // 25 here
        const langs = fetched.result.filter((langObj) => popularLanguages.includes(langObj.englishName));
        langs.forEach((langObj) => {
            const langName = langObj.englishName.split(" ")[0].toLowerCase().trim();
            const langCode = langObj.full_code;
            this.#state.myLanguages[langName] = langCode;
        });
    }

    // ================================================================================================

    // get the code of this language
    getLangCode = (langName) => this.#state.myLanguages[langName];

    // ================================================================================================

    // getting the list of languages to display in the UI
    getLangsList(type) {
        return getLangsList(type);
    }

    // ================================================================================================

    // adding one word
    addWord(dataObj) {
        this.#state.words.push(dataObj); // pushing to state
        LS.save(`languagesWords`, this.#state.words, "ref"); // key, value, type = "prim"
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

    // getting the languages that I have added
    getAddedLangs() {
        const stateWords = this.#state.words;
        const langs = stateWords.map((wordObj) => wordObj.language.toLowerCase());
        return [...new Set(langs)]; // returning it cleaned from duplicates
    }

    // ================================================================================================

    // returns an array of indeces randomly shuffled
    shuffleArray(numberOfElements) {
        const result = [];
        // const arr = new Array(numberOfElements).fill(0).map((x, i) => i);
        while (result.length < numberOfElements) {
            const randomNum = Math.floor(Math.random() * numberOfElements); // between 0 and numberOfElements excl. last
            if (!result.includes(randomNum)) result.push(randomNum);
        }
        return result;
    }

    // ================================================================================================

    // getting a random number
    getRandomNum(upperLimit) {
        const randomNum = Math.floor(Math.random() * upperLimit); // between 0 and upperLimit excl. last
        return randomNum;
    }

    // ================================================================================================

    // returns the array of 10 elements: indeces from 0 to upperLimit excl. last
    getRandomTen(upperLimit) {
        const arr = [];
        while (arr.length < 10) {
            const randomNum = this.getRandomNum(upperLimit);
            if (!arr.includes(randomNum)) arr.push(randomNum);
        }
        return arr;
    }

    // ================================================================================================

    // get 10 or less words from state, filtered by this language -- random words? random if more than 10
    getQuizWords(language) {
        const languageWords = this.#state.words.filter(
            (wordObj) => wordObj.language.toLowerCase().trim() === language.toLowerCase().trim()
        );
        if (languageWords.length < 11) {
            // returned shuffled
            const shuffledIndeces = this.shuffleArray(languageWords.length);
            const arr = [];
            languageWords.forEach((wordObj, i) => arr.push(languageWords[shuffledIndeces[i]]));
            // now 'arr' contains shuffled data but it must also return those items whose revision time is either now or in the past, or doesn't exist at all
            // so filtering again...
            const result = arr.filter((wordObj) => {
                if (!wordObj.hasOwnProperty("nextRevisionDateTime")) return wordObj; // if it has no 'next revision' prop, return it to practice now
                const timeNow = new Date().getTime();
                if (wordObj.nextRevisionDateTime <= timeNow) return wordObj; // if its revision time is either now or in the past, return it to practice now
            });
            return result;
        } else {
            // return random 10
            const random10Indeces = this.getRandomTen(languageWords.length);
            const arr = [];
            random10Indeces.forEach((randomIndex) => arr.push(languageWords[randomIndex]));
            // now 'arr' contains randomised data but it must also return those items whose revision time is either now or in the past, or doesn't exist at all
            // so filtering again...
            const result = arr.filter((wordObj) => {
                if (!wordObj.hasOwnProperty("nextRevisionDateTime")) return wordObj; // if it has no 'next revision' prop, return it to practice now
                const timeNow = new Date().getTime();
                if (wordObj.nextRevisionDateTime <= timeNow) return wordObj; // if its revision time is either now or in the past, return it to practice now
            });
            return result;
        }
    }

    // ================================================================================================

    // returns a string formatted like: "15/2/2025 at 15:35 (in 2 days and 9 hours)"
    getNextRevisionDate() {
        const withRevision = this.#state.words.filter((wordObj) => wordObj.nextRevisionDateTime);
        const revisions = withRevision.map((wordObj) => wordObj.nextRevisionDateTime).sort((a, b) => a - b);
        const soonest = revisions[0];
        const datetime = new Date(soonest);
        const date = datetime.getDate();
        const month = datetime.getMonth() + 1;
        const year = datetime.getFullYear();
        const hours = datetime.getHours();
        const minutes = datetime.getMinutes();
        let string = `${date}/${month}/${year} at ${hours}:${minutes.toString().padStart(2, 0)}`;
        const difference = datetime.getTime() - new Date().getTime();
        const differenceDays = Math.floor(difference / 1000 / 60 / 60 / 24);
        let differenceHours = Math.floor(difference / 1000 / 60 / 60);
        let differenceMinutes = Math.floor(difference / 1000 / 60);
        if (differenceDays > 0) differenceHours = differenceHours - differenceDays * 24;
        let inTime = ` `;
        if (differenceDays > 0) {
            inTime += `(in ${differenceDays} ${differenceDays !== 1 ? "days" : "day"} and ${differenceHours} ${
                differenceHours !== 1 ? "hours" : "hour"
            })`;
        } else {
            differenceMinutes = differenceMinutes - differenceDays * 24 * 60 - differenceHours * 60;
            inTime += `(in ${differenceHours} ${differenceHours !== 1 ? "hours" : "hour"} and ${differenceMinutes} minutes)`;
        }
        string += inTime;
        return string;
    }

    // ================================================================================================

    // setting the mode of the quiz about to be conducted: local or online
    setMode(mode) {
        this.#state.quizMode = mode;
    }
    getMode = () => this.#state.quizMode;

    // ================================================================================================

    // setting the data for the current quiz
    setQuizWords(dataArr) {
        this.#state.currentQuizData = dataArr;
    }

    // getting the data for the current quiz
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
    pushAnswer(string) {
        this.#state.currentQuizAnswers.push(string.trim());
    }

    // getting all answers
    getAnswers = () => this.#state.currentQuizAnswers;

    // ================================================================================================

    // dependency of 'updateWords'
    determineRevisionDateTime(category) {
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

    // updating words after submitting the Review Your Responses screen
    updateWords(quizedWordsIds, userRatings, mode) {
        console.log(quizedWordsIds, userRatings);
        if (mode === "local") {
            quizedWordsIds.forEach((idParam, i) => {
                const index = this.#state.words.findIndex((entry) => entry.id === idParam);
                this.#state.words[index].ratedAs = userRatings[i];
                this.#state.words[index].nextRevisionDateTime = this.determineRevisionDateTime(userRatings[i]);
            });

            console.log(this.#state.words);
            LS.save(`languagesWords`, this.#state.words, "ref"); // key, value, type = "prim"
        } else if (mode === "online") {
            // an online session was just played -- so I add those words if I don't have them already (such words for a given language)
            const langPure = this.#state.languagePracticedNow.split(" ")[1].toLowerCase();
            userRatings.forEach((userRating, i) => {
                const index = this.#state.words.findIndex(
                    (stateWordObj) =>
                        stateWordObj.language.toLowerCase() === langPure &&
                        stateWordObj.word.toLowerCase() === this.#state.currentQuizData[i].translation
                );
                if (index >= 0) return; // means such a word for a given language already exists in my wordbase
                // else I must add this word -- and add 'ratedAs' with 'nextRevisionDateTime'
                this.#state.currentQuizData[i].ratedAs = userRatings[i];
                this.#state.currentQuizData[i].nextRevisionDateTime = this.determineRevisionDateTime(userRatings[i]);
                this.#state.words.push(this.#state.currentQuizData[i]);
            });
            console.log(this.#state.words);
            LS.save(`languagesWords`, this.#state.words, "ref"); // key, value, type = "prim"
        }
    }

    // ================================================================================================

    // checking the input accent color -- returns string (color in rgb)
    checkNewColor(newColor) {
        // mimicking DOM addition to get the computed color
        const span = document.createElement("span");
        document.body.appendChild(span);
        span.style.color = newColor;
        let color = window.getComputedStyle(span).color;
        document.body.removeChild(span);

        const rgbValues = color
            .slice(4, -1)
            .split(",")
            .map((x) => +x.trim()); // just the rgb values (r,g,b)

        if (rgbValues[0] < 40 && rgbValues[1] < 40 && rgbValues[2] < 40) return `rgb(0, 128, 0)`; // return green if it is too dark

        return color;
    }

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
    exportWords() {
        exportAsJson();
    }

    // ================================================================================================

    // saving words to LS
    saveWords() {
        LS.save(`languagesWords`, this.#state.words, "ref"); // key, value, type = "prim"
    }

    // ================================================================================================

    // starting the Last Practiced timer
    startLastPracticedTimer(handler) {
        this.stopLastPracticedTimer();

        this.#state.lastPracticedTimer = setInterval(() => {
            handler();
        }, 1000 * 60); // every minute
    }

    // ================================================================================================

    // clearing the Last Practiced timer
    stopLastPracticedTimer = () => clearInterval(this.#state.lastPracticedTimer);

    // ================================================================================================

    // selecting 10 random English words from those word datasets that I have in js files here (no duplicates)
    selectFromDatasets() {
        const oxfordData = this.sortOxfordData();
        const myData = [
            ...myListVerbs,
            ...myListAdjs,
            ...someFrequentNouns,
            ...topicFamily,
            ...topicBody,
            ...topicGeo,
            ...someExpressions,
            ...topicAnimals,
            ...topicFoodDrinks,
            ...topicHome,
            ...topicClothes,
            ...topicDirections,
            ...topicTime,
            ...topicMaterials,
            ...topicNumbers,
            ...topicReligion,
            ...topicFrequency,
            ...topicUrgency,
            ...topicInformal,
            ...topicSwearWords,
            ...topicUnsorted,
            ...topicPrepositions,
            ...topicConjunctions,
            ...topicGlueWords,
            ...topicBasicPhrases,
        ];
        const giantArrayOfAllDatasets = [...oxfordData, ...myData];
        const random10Indeces = this.getRandomTen(giantArrayOfAllDatasets.length); // getting 10 random indeces in `giantArrayOfAllDatasets`
        const random10Words = random10Indeces.map((index) => giantArrayOfAllDatasets[index]); // getting the words at those indeces
        return random10Words;
    }

    // ================================================================================================
}

export default Model;
