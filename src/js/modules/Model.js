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
import { fetchLangs, fetchTranslation, fetchExamplePhrase } from "./model-dependencies/api.js";
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
    };

    constructor() {
        this.fetchWordsLS(); // fetching from LS
        this.fetchAccentColor(); // fetching from LS
    }

    // ================================================================================================

    sortData() {
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

        // now I have sth like 7500+ words (along with duplicates)
        // not to forget about myListVerbs, myListAdjs and all the rest
    }

    // ================================================================================================

    async getPopularLangCodes() {
        const fetched = await fetchLangs();
        console.log(fetched.result);
        const popularLanguages = [
            "English",
            "Chinese",
            "Arabic",
            "French",
            "German",
            "Czech",
            "Icelandic",
            "Latin",
            "Spanish",
            "Hindi",
            "Bengali",
            "Portuguese",
            "Russian",
            "Urdu",
            "Japanese",
            "Swahili",
            "Turkish",
            "Italian",
            "Persian",
            "Korean",
            "Tamil",
            "Vietnamese",
            "Polish",
            "Dutch",
            "Thai",
            "Greek",
            "Hebrew",
            "Malay",
            "Ukrainian",
            "Tagalog",
        ]; // 30 here
        const langs = fetched.result.filter((langObj) => popularLanguages.includes(langObj.codeName.split(" ")[0]));
        console.log(langs.map((x) => x.englishName));
        // this.#state.popularLanguages
    }

    // ================================================================================================

    getLangsList(type) {
        return getLangsList(type);
    }

    // ================================================================================================

    addWord(dataObj) {
        this.#state.words.push(dataObj); // pushing to state
        LS.save(`languagesWords`, this.#state.words, "ref"); // key, value, type = "prim"
    }

    fetchWordsLS() {
        const fetched = LS.get(`languagesWords`, "ref"); // key, type = "primitive"
        if (!fetched) return;
        fetched.forEach((wordObj) => this.#state.words.push(wordObj));
    }

    getWordsState = () => this.#state.words;

    // ================================================================================================

    getAddedLangs() {
        const stateWords = this.#state.words;
        const langs = stateWords.map((wordObj) => wordObj.language.toLowerCase());
        return [...new Set(langs)]; // returning it cleaned from duplicates
    }

    // ================================================================================================

    // returns an array of indexes randomly shuffled
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

    setQuizWords(dataArr) {
        this.#state.currentQuizData = dataArr;
    }

    getThisQuizData = () => this.#state.currentQuizData;

    // ================================================================================================

    incrementRoundCounter = () => (this.#state.roundCounter += 1);

    getRoundCounter = () => this.#state.roundCounter;

    resetRoundCounter = () => (this.#state.roundCounter = 0);

    // ================================================================================================

    getRoundsNumber = () => this.#state.roundsNumber;
    setRoundsNumber = (value) => (this.#state.roundsNumber = value);

    // ================================================================================================

    pushAnswer(string) {
        this.#state.currentQuizAnswers.push(string.trim());
    }

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

    updateWords(quizedWordsIds, userRatings) {
        console.log(quizedWordsIds, userRatings);
        quizedWordsIds.forEach((idParam, i) => {
            const index = this.#state.words.findIndex((entry) => entry.id === idParam);
            this.#state.words[index].ratedAs = userRatings[i];
            this.#state.words[index].nextRevisionDateTime = this.determineRevisionDateTime(userRatings[i]);
        });

        console.log(this.#state.words);
        LS.save(`languagesWords`, this.#state.words, "ref"); // key, value, type = "prim"
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

    getAccentColor = () => this.#state.accentColor;

    // ================================================================================================

    exportWords() {
        exportAsJson();
    }

    // ================================================================================================
}

export default Model;
