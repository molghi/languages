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
import LS from "./model-dependencies/localStorage.js";

// ================================================================================================

class Model {
    #state = {
        words: [],
        currentQuizData: "",
        currentQuizAnswers: [],
        roundCounter: 0,
        roundsNumber: 0,
    };

    constructor() {
        this.fetchWordsLS(); // fetching from LS
        // this.sortData();
        // this.getPopularLangCodes();
        // fetchTranslation();
        // fetchExamplePhrase();
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
        if (type === "pure") {
            return [
                "🇬🇧 English",
                "🇨🇳 Chinese",
                "🇮🇳 Hindi",
                "🇪🇸 Spanish",
                "🇫🇷 French",
                "🇸🇦 Arabic",
                "🇧🇩 Bengali",
                "🇧🇷 Portuguese",
                "🇷🇺 Russian",
                "🇵🇰 Urdu",
                "🇩🇪 German",
                "🇨🇿 Czech",
                "🇮🇸 Icelandic",
                "🇻🇦 Latin",
                "🇯🇵 Japanese",
                "🇰🇪 Swahili",
                "🇹🇷 Turkish",
                "🇮🇹 Italian",
                "🇮🇷 Persian",
                "🇰🇷 Korean",
                "🇮🇳 Tamil",
                "🇻🇳 Vietnamese",
                "🇵🇱 Polish",
                "🇳🇱 Dutch",
                "🇹🇭 Thai",
                "🇬🇷 Greek",
                "🇮🇱 Hebrew",
                "🇲🇾 Malay",
                "🇺🇦 Ukrainian",
                "🇵🇭 Tagalog",
            ];
        }
        return [
            "<span data-lang='en'><span class='lang-flag'>🇬🇧</span> <span class='lang-name'>English</span></span>",
            "<span data-lang='zh'><span class='lang-flag'>🇨🇳</span> <span class='lang-name'>Chinese</span></span>",
            "<span data-lang='hi'><span class='lang-flag'>🇮🇳</span> <span class='lang-name'>Hindi</span></span>",
            "<span data-lang='es'><span class='lang-flag'>🇪🇸</span> <span class='lang-name'>Spanish</span></span>",
            "<span data-lang='fr'><span class='lang-flag'>🇫🇷</span> <span class='lang-name'>French</span></span>",
            "<span data-lang='ar'><span class='lang-flag'>🇸🇦</span> <span class='lang-name'>Arabic</span></span>",
            "<span data-lang='be'><span class='lang-flag'>🇧🇩</span> <span class='lang-name'>Bengali</span></span>",
            "<span data-lang='pt'><span class='lang-flag'>🇧🇷</span> <span class='lang-name'>Portuguese</span></span>",
            "<span data-lang='ru'><span class='lang-flag'>🇷🇺</span> <span class='lang-name'>Russian</span></span>",
            "<span data-lang='ur'><span class='lang-flag'>🇵🇰</span> <span class='lang-name'>Urdu</span></span>",
            "<span data-lang='de'><span class='lang-flag'>🇩🇪</span> <span class='lang-name'>German</span></span>",
            "<span data-lang='cz'><span class='lang-flag'>🇨🇿</span> <span class='lang-name'>Czech</span></span>",
            "<span data-lang='is'><span class='lang-flag'>🇮🇸</span> <span class='lang-name'>Icelandic</span></span>",
            "<span data-lang='la'><span class='lang-flag'>🇻🇦</span> <span class='lang-name'>Latin</span></span>",
            "<span data-lang='jp'><span class='lang-flag'>🇯🇵</span> <span class='lang-name'>Japanese</span></span>",
            "<span data-lang='sw'><span class='lang-flag'>🇰🇪</span> <span class='lang-name'>Swahili</span></span>",
            "<span data-lang='tr'><span class='lang-flag'>🇹🇷</span> <span class='lang-name'>Turkish</span></span>",
            "<span data-lang='it'><span class='lang-flag'>🇮🇹</span> <span class='lang-name'>Italian</span></span>",
            "<span data-lang='pe'><span class='lang-flag'>🇮🇷</span> <span class='lang-name'>Persian</span></span>",
            "<span data-lang='ko'><span class='lang-flag'>🇰🇷</span> <span class='lang-name'>Korean</span></span>",
            "<span data-lang='ta'><span class='lang-flag'>🇮🇳</span> <span class='lang-name'>Tamil</span></span>",
            "<span data-lang='vi'><span class='lang-flag'>🇻🇳</span> <span class='lang-name'>Vietnamese</span></span>",
            "<span data-lang='po'><span class='lang-flag'>🇵🇱</span> <span class='lang-name'>Polish</span></span>",
            "<span data-lang='du'><span class='lang-flag'>🇳🇱</span> <span class='lang-name'>Dutch</span></span>",
            "<span data-lang='th'><span class='lang-flag'>🇹🇭</span> <span class='lang-name'>Thai</span></span>",
            "<span data-lang='gr'><span class='lang-flag'>🇬🇷</span> <span class='lang-name'>Greek</span></span>",
            "<span data-lang='he'><span class='lang-flag'>🇮🇱</span> <span class='lang-name'>Hebrew</span></span>",
            "<span data-lang='ma'><span class='lang-flag'>🇲🇾</span> <span class='lang-name'>Malay</span></span>",
            "<span data-lang='uk'><span class='lang-flag'>🇺🇦</span> <span class='lang-name'>Ukrainian</span></span>",
            "<span data-lang='ta'><span class='lang-flag'>🇵🇭</span> <span class='lang-name'>Tagalog</span></span>",
        ];
    }

    // ================================================================================================

    validateInput(dataObj) {
        //
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
        const languageWords = this.#state.words.filter((wordObj) => wordObj.language === language);
        if (languageWords.length < 11) {
            // returned shuffled
            const shuffledIndeces = this.shuffleArray(languageWords.length);
            const arr = [];
            languageWords.forEach((wordObj, i) => arr.push(languageWords[shuffledIndeces[i]]));
            return arr;
        } else {
            // return random 10
            const random10Indeces = this.getRandomTen(languageWords.length);
            const arr = [];
            random10Indeces.forEach((randomIndex) => arr.push(languageWords[randomIndex]));
            return arr;
        }
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
}

export default Model;
