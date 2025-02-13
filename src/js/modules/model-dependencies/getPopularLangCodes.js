import { Logic } from "../../Controller.js";
import { fetchLangs } from "./api.js";

// getting popular language codes from the api
async function getPopularLangCodes() {
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
        Logic.getState().myLanguages[langName] = langCode;
    });
}

export default getPopularLangCodes;
