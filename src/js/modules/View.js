// View is responsible for everything that happens on the screen: rendering and all visual interactions with any elements

import {
    renderAddForm,
    renderPrompt,
    showScreen,
    renderMessage,
    renderRound,
    renderEndScreen,
} from "./view-dependencies/renderMethods.js";
import {
    handleHeaderClicks,
    handleAppClicks,
    handleAppHoversIn,
    handleAppHoversOut,
    handleFormSubmission,
} from "./view-dependencies/eventHandlers.js";
import { someFrequentNouns } from "./model-dependencies/dataMyLists.js";
import listenKeyPresses from "./view-dependencies/keyCommands.js";

class View {
    constructor() {
        this.headerBlock = document.querySelector(".header");
        this.appBlock = document.querySelector(".app");
        this.footerBlock = document.querySelector(".footer");
        this.containerEl = document.querySelector(".container");

        this.langsInfo = {
            en: `<span>Speakers:</span> Approximately 1.5 billion.\n<span>Countries:</span> United States, United Kingdom, Canada, Australia.\n<span>Family:</span> Indo-European, Germanic.\n<span>Note:</span> Emerged as a global lingua franca during the British Empire's expansion and solidified by the United States' cultural and economic influence in the 20th century. Evolved from Old English, influenced by Norman French and Latin.`,
            zh: `<span>Speakers:</span> Around 1.1 billion.\n<span>Countries:</span> China, Taiwan, Singapore.\n<span>Family:</span> Sino-Tibetan.\n<span>Note:</span> Standardized as the official language of China in the early 20th century, facilitating communication across diverse dialects. Mandarin is the official language of China and has numerous regional dialects.`,
            hi: `<span>Speakers:</span> Approximately 609.5 million.\n <span>Countries:</span> India, Nepal, Fiji.\n <span>Family:</span> Indo-European, Indo-Aryan.\n <span>Note:</span> Evolved from Sanskrit and Prakrit languages; standardized in the 19th century and adopted as one of India's official languages post-independence. Written in the Devanagari script.`,
            es: `<span>Speakers:</span> About 559.1 million.\n<span>Countries:</span> Spain, Mexico, Colombia.\n<span>Family:</span> Indo-European, Romance.\n<span>Note:</span> Evolved from Latin and spread globally during the Spanish Empire. Spread globally during the 15th to 17th centuries through Spanish colonization, becoming the primary language in much of Latin America.`,
            fr: `<span>Speakers:</span> Approximately 274 million.\n<span>Countries:</span> France, Belgium, Switzerland, Democratic Republic of the Congo, Canada.\n<span>Family:</span> Indo-European, Romance.\n<span>Note:</span> Originated from Latin. Served as the diplomatic and cultural lingua franca in Europe during the 17th to 19th centuries, influencing international relations and arts. Considered relatively conservative among Romance languages.`,
            ar: `<span>Speakers:</span> Around 274 million.\n <span>Countries:</span> Egypt, Saudi Arabia, Morocco, Palestine, Syria.\n <span>Family:</span> Afro-Asiatic, Semitic.\n <span>Note:</span> Unified as a literary language through the Quran in the 7th century, facilitating its spread across the Middle East and North Africa. Classical Arabic (Fus'ha), the language of the Quran, evolved into Modern Standard Arabic, which is used in media and formal settings.`,
            be: `<span>Speakers:</span> Approximately 273 million.\n <span>Countries:</span> Bangladesh, India.\n <span>Family:</span> Indo-European, Indo-Aryan.\n <span>Note:</span> Evolved from Magadhi Prakrit; gained prominence during the Bengal Renaissance in the 19th century, enriching literature and arts. Known for its rich literary heritage, including works by famous Rabindranath Tagore.`,
            pt: `<span>Speakers:</span> About 258 million.\n <span>Countries:</span> Brazil, Portugal, Mozambique.\n <span>Family:</span> Indo-European, Romance.\n <span>Note:</span> Expanded globally during the Age of Discoveries in the 15th and 16th centuries, establishing its presence in South America, Africa, and Asia.`,
            ru: `<span>Speakers:</span> Approximately 258 million.\n <span>Countries:</span> Russia, Belarus, Kazakhstan.\n <span>Family:</span> Indo-European, Slavic.\n <span>Note:</span> Standardized in the 18th century under Peter the Great, served as a lingua franca of both the Russian Empire and the Soviet Union. Uses the Cyrillic script. Influenced by Old Church Slavonic, Greek, French and German.`,
            ur: `<span>Speakers:</span> Around 230 million.\n <span>Countries:</span> Pakistan, India.\n <span>Family:</span> Indo-European, Indo-Aryan.\n <span>Note:</span> Shares linguistic roots with Hindi but incorporates Persian and Arabic vocabulary.`,
            de: `<span>Speakers:</span> Approximately 135 million.\n <span>Countries:</span> Germany, Austria, Switzerland.\n <span>Family:</span> Indo-European, Germanic.\n <span>Note:</span> Standardized in the 16th century with Martin Luther's Bible translation; became influential in philosophy, science, and literature during the 18th and 19th centuries. Known for its compound words.`,
            cz: `<span>Speakers:</span> About 10.7 million.\n <span>Countries:</span> Czech Republic.\n <span>Family:</span> Indo-European, Slavic.\n <span>Note:</span> Revitalized in the 19th century during the Czech National Revival, fostering a resurgence in national identity and literature. Has a rich tradition of literature and music.`,
            is: `<span>Speakers:</span> Approximately 372,000.\n <span>Countries:</span> Iceland.\n <span>Family:</span> Indo-European, Germanic.\n <span>Note:</span> The closest modern language to Old Norse, the tongue of the original Vikings. It has changed little since medieval times, preserving many archaic features and linguistic purity. Considered the most conservative modern Germanic language.`,
            la: `Considered a dead language with no native speakers.\n <span>Countries:</span> Historically spoken in Ancient Rome, now in Vatican City (official status).\n <span>Family:</span> Indo-European, Romance.\n <span>Note:</span> The language of the Roman Empire, later evolving into the Romance languages. Used as the lingua franca of science, law, and theology for centuries.`,
            jp: `<span>Speakers:</span> Approximately 125 million.\n<span>Countries:</span> Predominantly Japan.\n<span>Family:</span> Japonic.\n<span>Note:</span> Japanese has incorporated numerous loanwords from Chinese and, more recently, Western languages. Its writing system combines logographic kanji with syllabic kana scripts.`,
            sw: `<span>Speakers:</span> Around 16 million native speakers; over 80 million including second-language speakers.\n<span>Countries:</span> Tanzania, Kenya, Democratic Republic of the Congo.\n <span>Family:</span> Niger-Congo, Bantu.\n <span>Note:</span> Swahili emerged as a lingua franca along the East African coast, influenced by Arabic due to historical trade connections.`,
            tr: `<span>Speakers:</span> Approximately 75 million.\n<span>Countries:</span> Turkey, Cyprus.\n<span>Family:</span> Turkic.\n<span>Note:</span> Modern Turkish evolved from Ottoman Turkish, undergoing significant reforms in the 20th century under Mustafa Kemal Atatürk, including the abandonment of Arabic script and the adoption of the Latin alphabet.`,
            it: `<span>Speakers:</span> About 67 million.\n<span>Countries:</span> Italy, Switzerland, San Marino, Vatican City.\n<span>Family:</span> Indo-European, Romance.\n<span>Note:</span> Italian descends from Latin and was standardized based on the Tuscan dialect, largely due to the influence of Dante Alighieri's literary works.`,
            pe: `<span>Speakers:</span> Approximately 80 million.\n<span>Countries:</span> Iran, Afghanistan (as Dari), Tajikistan (as Tajik).\n<span>Family:</span> Indo-European, Indo-Iranian.\n<span>Note:</span> Persian (Farsi) has a rich literary tradition, with classical poets like Rumi and Hafez contributing to its cultural heritage.`,
            ko: `<span>Speakers:</span> Around 77 million.\n<span>Countries:</span> South Korea, North Korea.\n<span>Family:</span> Koreanic.\n<span>Note:</span> The Korean script, Hangul, was created in the 15th century under King Sejong the Great to promote literacy.`,
            ta: `<span>Speakers:</span> Approximately 75 million.\n<span>Countries:</span> India (Tamil Nadu), Sri Lanka, Singapore.\n<span>Family:</span> Dravidian.\n<span>Note:</span> Tamil boasts one of the world's oldest continuous literary traditions, with texts dating back over two millennia.`,
            vi: `<span>Speakers:</span> About 86 million.\n<span>Countries:</span> Vietnam.\n<span>Family:</span> Austroasiatic.\n<span>Note:</span> Vietnamese has been heavily influenced by Chinese, both lexically and through the historical use of Chinese characters before adopting the Latin-based Quốc Ngữ script.`,
            po: `<span>Speakers:</span> Approximately 45 million.\n<span>Countries:</span> Poland.\n<span>Family:</span> Indo-European, Slavic.\n<span>Note:</span> Polish has a rich literary history and has been a significant cultural language in Central Europe.`,
            du: `<span>Speakers:</span> Around 23 million.\n<span>Countries:</span> Netherlands, Belgium (as Flemish).\n<span>Family:</span> Indo-European, Germanic.\n<span>Note:</span> Dutch played a crucial role during the Dutch Golden Age in the 17th century, influencing global trade and culture.`,
            th: `<span>Speakers:</span> Approximately 69 million.\n<span>Countries:</span> Thailand.\n<span>Family:</span> Kra-Dai.\n<span>Note:</span> Thai uses its own script and is tonal, with a rich tradition of literature and poetry.`,
            gr: `<span>Speakers:</span> About 13 million.\n<span>Countries:</span> Greece, Cyprus.\n<span>Family:</span> Indo-European, Hellenic.\n<span>Note:</span> Greek is one of the world's oldest recorded languages, with a documented history spanning over 3,000 years, influencing Western philosophy and science.`,
            he: `<span>Speakers:</span> Approximately 9 million.\n<span>Countries:</span> Israel.\n<span>Family:</span> Afro-Asiatic, Semitic.\n<span>Note:</span> Hebrew was revived as a spoken language in the 19th and 20th centuries after being primarily used in religious contexts for centuries.`,
            ma: `<span>Speakers:</span> Around 18 million native speakers; over 200 million including Indonesian.\n<span>Countries:</span> Malaysia, Indonesia (as Indonesian), Brunei.\n<span>Family:</span> Austronesian.\n<span>Note:</span> Malay has served as a lingua franca in Southeast Asia for centuries, with a significant number of loanwords from Sanskrit, Arabic, and later, European languages.`,
            uk: `<span>Speakers:</span> Approximately 30 million.\n<span>Countries:</span> Ukraine.\n<span>Family:</span> Indo-European, Slavic.\n<span>Note:</span> Ukrainian has a rich oral and literary tradition, with its own distinct script and cultural heritage.`,
            ta: `<span>Speakers:</span> About 28 million native speakers; over 90 million including those who speak Filipino, its standardized form.\n<span>Countries:</span> Philippines.\n<span>Family:</span> Austronesian.\n<span>Note:</span> Tagalog formed the basis for Filipino, the national language of the Philippines, and has been influenced by Spanish and English due to historical colonization.`,
        };
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

    showScreen(type) {
        showScreen(type);
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
}

export default View;
