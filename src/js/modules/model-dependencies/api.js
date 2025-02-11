// import { lingvanex_api_key, webster_api_key, webster_api_key2 } from "./config.js";

// lingvanex
async function fetchLangs() {
    try {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: lingvanex_api_key,
            },
        };

        const response = await fetch("https://api-b2b.backenster.com/b1/api/v3/getLanguages?platform=api&code=en_GB", options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// ================================================================================================

// lingvanex
function fetchTranslation() {
    const options = {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: lingvanex_api_key,
        },
        body: JSON.stringify({ platform: "api", data: "house", from: "en_GB", to: "de_DE" }),
    };

    fetch("https://api-b2b.backenster.com/b1/api/v3/translate", options)
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
}

// ================================================================================================

function fetchMeaningDefinition() {
    fetch("https://api.lingvanex.com/v1/dictionary", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: lingvanex_api_key,
        },
        body: JSON.stringify({
            text: "run",
            from: "en",
            to: "en",
        }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data.definitions))
        .catch((err) => console.error(err));
}

// ================================================================================================

// doesnt work
async function fetchExamplePhrase() {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = "https://tatoeba.org/en/api_v0/search?from=eng&query=%3Dnotebook";
    try {
        // const res = await fetch(`https://tatoeba.org/en/api_v0/search?from=eng&query=%3Dnotebook`);
        // if (!res.ok) throw new Error("Something failed...");
        // const data = await res.json();
        // console.log(data);
        const res = await fetch(proxy + url);
        if (!res.ok) throw new Error("Something failed...");
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// ================================================================================================

async function fetchWebster() {
    try {
        const res = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/apple?key=your-api-key`);
        if (!res.ok) throw new Error("Something failed...");
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// ================================================================================================

export { fetchLangs, fetchTranslation, fetchMeaningDefinition, fetchExamplePhrase, fetchWebster };
