import { Visual, Logic } from "../../Controller.js";

// ================================================================================================

// handle Add Word form -- adding one word
function formHandler(data) {
    const formData = {};
    const elements = data.filter((el) => el.tagName !== "BUTTON"); // getting all form elements without button
    elements.forEach((el) => {
        if (el.name === "languages") formData["language"] = el.value.trim();
        else formData[el.name] = el.value.trim();
    });
    formData.added = new Date().toISOString();
    formData.id = new Date().getTime(); // populating formData

    if (formData.hasOwnProperty("bulkAdd")) {
        // means multiple words are being added
        bulkAdd(formData);
    } else {
        // means a single word is being added
        // checking before adding: if such 'word' already exists in my state wordbase and the 'language' is the same, do not add it
        const stateIndex = Logic.getWordsState().findIndex(
            (stateWordObj) =>
                stateWordObj.word.trim().toLowerCase() === formData.word.toLowerCase() &&
                stateWordObj.language.trim().toLowerCase() === formData.language.toLowerCase()
        ); // looking if the index is positive or negative (exists or exists not)

        if (stateIndex >= 0) {
            Visual.showMessage("error", "This word is already in your word base for this language."); // showing an error message
        } else {
            Logic.addWord(formData); // add to state and LS
            Visual.showMessage("success", "Added successfully!"); // showing a message
            Visual.clearFormFields(); // clear form fields (except 'select')
            document.querySelector('form input[type="text"]').focus(); // focus first input
        }
    }
}

// ================================================================================================

// dependency of 'formHandler' -- adding multiple words
function bulkAdd(formData) {
    formData.words = formData.bulkAdd.split("\n"); // getting an array of so-called word-lines (strings, each representing one word entry)
    const wordLineLengths = formData.words.map((lineString) => lineString.split("|").length); // counting the length of each wordLine arrayed
    const everyLineIsCorrectLength = wordLineLengths.every((memberLength) => memberLength === 8); // is every line the needed length or not? (it must be 8, strictly)

    if (!everyLineIsCorrectLength) {
        // if my pattern was violated somewhere, I show an error msg and don't proceed
        const linesWithViolations = wordLineLengths
            .map((length, index) => {
                if (length !== 8) return index + 1;
                else return "";
            })
            .filter((x) => x !== "")
            .join(", "); // identifying which lines (not zero-based) have violations
        Visual.showMessage(
            "error",
            `Cannot submit yet!<br>The example pattern was not followed on these lines:<br><br>${linesWithViolations}<br><br>Each line must consist of 8 parts, separated by '|', with exactly 7 separators.<br>No line must be empty.<br>Please correct the indicated lines to proceed.`,
            10000
        ); // showing an error message, removing after 10000ms = 10sec
        return;
    }

    let counter = 1;
    // forming word objects:
    const words = formData.words.map((wordLine) => {
        const categories = [
            "language",
            "word",
            "translation",
            "pronunciation",
            "definition",
            "exampleTarget",
            "exampleTranslation",
            "note",
        ]; // this order is strict
        const split = wordLine.split("|").map((x) => x.trim());
        const obj = {
            [categories[0]]: split[0] === "_" || split[0] === "-" ? "" : split[0], // if it is '_' or '-', return an empty string; otherwise return what's there
            [categories[1]]: split[1] === "_" || split[1] === "-" ? "" : split[1],
            [categories[2]]: split[2] === "_" || split[2] === "-" ? "" : split[2],
            [categories[3]]: split[3] === "_" || split[3] === "-" ? "" : split[3],
            [categories[4]]: split[4] === "_" || split[4] === "-" ? "" : split[4],
            [categories[5]]: split[5] === "_" || split[5] === "-" ? "" : split[5],
            [categories[6]]: split[6] === "_" || split[6] === "-" ? "" : split[6],
            [categories[7]]: split[7] === "_" || split[7] === "-" ? "" : split[7],
            added: new Date().toISOString(),
            id: new Date().getTime() + `.${counter}`,
        };
        counter += 1;
        return obj;
    });
    let amountOfWords = words.length; // among these could also be those that already exist in my state
    // now 'words' is an array of word objects, ready to be pushed to state/LS
    words.forEach((wordObj) => {
        // checking before adding: if such 'word' already exists in my state wordbase and the 'language' is the same, I do not add it
        const stateIndex = Logic.getWordsState().findIndex(
            (stateWordObj) =>
                stateWordObj.word.trim().toLowerCase() === wordObj.word.toLowerCase() &&
                stateWordObj.language.trim().toLowerCase() === wordObj.language.toLowerCase()
        ); // looking if the index is positive or negative (exists or exists not)
        if (stateIndex < 0) Logic.addWord(wordObj); // if exists not, add it to state and LS
        else amountOfWords -= 1; // decrementing for the message
    });
    Visual.showMessage("success", `${amountOfWords} ${amountOfWords === 1 ? "word" : "words"} added successfully!`); // showing a message
    document.querySelector(".form__textarea").value = ""; // clear textarea input
    document.querySelector(".form__textarea").focus(); // focus textarea input
}

// ================================================================================================

export default formHandler;
