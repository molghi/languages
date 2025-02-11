import { Logic, Visual } from "../../Controller";

// ================================================================================================

// processing input/import
function processInput(event) {
    const file = event.target.files[0]; // Get the file
    if (!file) return; // Ensure there's a file selected

    const reader = new FileReader(); // Create FileReader instance

    reader.onload = (e) => {
        try {
            const jsonData = JSON.parse(e.target.result); // Parse the JSON content
            const isValidInput = checkValidInput(jsonData); // Ensure the input was valid

            if (!isValidInput) {
                Visual.showMessage(
                    "error",
                    `Invalid JSON! Check the formatting: you can import JSON formatted the same as what you can export.`,
                    10000
                );
                return console.error(
                    `Invalid JSON!\nPerhaps the formatting of the file was wrong...\nYou can import JSON formatted the same as what you can export.`
                );
            }

            addFromImported(jsonData); // adding to the state and pushing to LS
            Visual.showMessage("success", "Import successful!");
        } catch (err) {
            console.error("Invalid input file", err); // Error handling
            Visual.showMessage(
                "error",
                `Invalid input file! You can import only JSON and it must be formatted the same as what you can export.`,
                10000
            );
            return null;
        } finally {
            Visual.fileInputEl.value = ""; // resetting the file input value to be able to import again without problems
        }
    };

    reader.readAsText(file); // Read the file as text
}

// ================================================================================================

// dependency of 'processInput' -- validating the input/imported thing -- making sure it's formatted the way I allow it
function checkValidInput(dataArr) {
    if (!Array.isArray(dataArr)) return;
    // dataArr is an array of word objects/entries

    let passed = true;
    dataArr.forEach((wordObj) => {
        if (!wordObj.hasOwnProperty("language") || typeof wordObj.language !== "string") return (passed = false);
        if (!wordObj.hasOwnProperty("word") || typeof wordObj.word !== "string") return (passed = false);
        if (!wordObj.hasOwnProperty("translation") || typeof wordObj.translation !== "string") return (passed = false);
        // these three props must be there in any case

        // these are optional:
        if (wordObj.hasOwnProperty("pronunciation") && typeof wordObj.pronunciation !== "string") return (passed = false); // if there's "pronunciation" and it's not a string, return false
        if (wordObj.hasOwnProperty("exampleTarget") && typeof wordObj.exampleTarget !== "string") return (passed = false);
        if (wordObj.hasOwnProperty("exampleTranslation") && typeof wordObj.exampleTranslation !== "string")
            return (passed = false);
        if (wordObj.hasOwnProperty("definition") && typeof wordObj.definition !== "string") return (passed = false);
        if (wordObj.hasOwnProperty("note") && typeof wordObj.note !== "string") return (passed = false);

        // to disregard: added, id, nextRevisionDateTime, ratedAs

        // except 'nextRevisionDateTime' the values of all props are strings
    });

    return passed;
}

// ================================================================================================

// dependency of 'processInput' --- the import was successful, so adding to the state and pushing to LS
function addFromImported(dataArr) {
    let counter = 1; // needed to make the proper id string
    const propsToIgnore = ["added", "id", "nextRevisionDateTime", "ratedAs"]; // properties to ignore in the importing file

    // changing in state
    dataArr.forEach((wordObj) => {
        const wordItself = wordObj.word.trim().toLowerCase(); // just the word
        const wordLang = wordObj.language.trim().toLowerCase(); // just the language
        const index = Logic.getWordsState().findIndex(
            (stateWordObj) =>
                stateWordObj.word.trim().toLowerCase() === wordItself && stateWordObj.language.trim().toLowerCase() === wordLang
        ); // returning the index of the state entry with the same 'word' and 'language' props

        if (index < 0) {
            // means tne state doesn't have this word in this lang, so I push it
            // trimming the values just in case:
            const obj = {};
            const wordObjKeys = Object.keys(wordObj);
            const wordObjValues = Object.values(wordObj);
            wordObjKeys.forEach((key, i) => {
                if (!propsToIgnore.includes(key)) obj[key] = typeof wordObjValues[i] === "string" && wordObjValues[i].trim();
            });
            obj.added = new Date().toISOString(); // also adding this prop
            obj.id = new Date().getTime() + `.${counter}`; // and this prop
            counter += 1;
            Logic.getWordsState().push(obj); // pushing to state
        } else {
            // means the state already has this word in this lang -- so I do nothing, ignore
        }
    });

    Logic.saveWords(); // pushing to LS
}

// ================================================================================================

export default processInput;
