const lingvanex_api_key = process.env.LINGVANEX_API_KEY;

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
async function fetchTranslation(word, langCode) {
    try {
        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: lingvanex_api_key,
            },
            body: JSON.stringify({ platform: "api", data: word, from: "en_GB", to: langCode, enableTransliteration: true }),
        };

        const res = await fetch("https://api-b2b.backenster.com/b1/api/v3/translate", options);
        if (!res.ok) throw new Error("Something failed...");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// ================================================================================================

// doesnt work -- blocked by CORS
async function fetchExamplePhrase() {
    try {
        const res = await fetch(`https://tatoeba.org/en/api_v0/search?from=eng&query=%3Dnotebook`);
        if (!res.ok) throw new Error("Something failed...");
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// ================================================================================================

// from Webster's Learner's Dict
async function fetchWebsterLearner(word) {
    try {
        const res = await fetch(
            `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${webster_learner_api_key}`
        );
        if (!res.ok) throw new Error("Something failed...");
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// ================================================================================================

// from Webster's Intermediate Dict
async function fetchWebsterIntermediate(word) {
    try {
        const res = await fetch(
            `https://dictionaryapi.com/api/v3/references/sd3/json/${word}?key=${webster_intermediate_api_key}`
        );
        if (!res.ok) throw new Error("Something failed...");
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// ================================================================================================

// from https://dictionaryapi.dev/ -- using it to fetch examples
async function fetchFreeDictionary(word) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        // if (!res.ok) throw new Error("Something failed...");
        if (!res.ok) return "";
        const data = await res.json();
        const result = data
            .map((x) => x.meanings.map((y) => y.definitions.filter((z) => z.example)))
            .flat(2)
            .map((x) => x.example); // filtering only those that have examples, then flattening it and returning only example strings
        // console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

// ================================================================================================

export { fetchLangs, fetchTranslation, fetchWebsterLearner, fetchWebsterIntermediate, fetchFreeDictionary };
