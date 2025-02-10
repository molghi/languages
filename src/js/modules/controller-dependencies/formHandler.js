import { Visual, Logic } from "../../Controller.js";

// ================================================================================================

// handle Add Word form
function formHandler(data) {
    const formData = {};
    const elements = data.filter((el) => el.tagName !== "BUTTON"); // getting all form elements without button
    elements.forEach((el) => {
        if (el.name === "languages") formData["language"] = el.value.trim();
        else formData[el.name] = el.value.trim(); // populating formData
    });
    formData.added = new Date().toISOString(); // 'added' acts as ID
    formData.id = new Date().getTime(); // I added it later

    if (formData.hasOwnProperty("bulkAdd")) {
        // means multiple words are being added, they must be split AND VALIDATED
        formData.words = formData.bulkAdd.split("\n");
        const wordLineLengths = formData.words.map((lineString) => lineString.split("|").length); // counting the length of each wordLine arrayed
        const everyLineIsCorrectLength = wordLineLengths.every((memberLength) => memberLength === 8); // is every line the needed length or not? (it must be 8, strictly)

        console.log(formData);
        console.log(wordLineLengths);
        if (!everyLineIsCorrectLength) {
            // if my pattern was violated somewhere I show an error msg and don't proceed
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
            ); // show error message, removing after 10000ms = 10sec
            return;
        }

        let counter = 1;
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
            ];
            const split = wordLine.split("|").map((x) => x.trim());
            const obj = {
                [categories[0]]: split[0] === "_" || split[0] === "-" ? "" : split[0],
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
        console.log(words);
        const amountOfWords = words.length;
        // now 'words' is an array of word objects, ready to be pushed to state/LS
        words.forEach((wordObj) => Logic.addWord(wordObj)); // add to state and LS
        Visual.showMessage("success", `${amountOfWords} words added successfully!`); // show message
        document.querySelector(".form__textarea").value = ""; // clear input
        document.querySelector(".form__textarea").focus(); // focus input
        console.log(`${amountOfWords} words added successfully!`);
        return;
    }

    // "Add a Word" validation?
    Logic.addWord(formData); // add to state and LS
    Visual.showMessage("success", "Added successfully!"); // show message
    Visual.clearFormFields(); // clear field
    document.querySelector('form input[type="text"]').focus(); // focus first input
}

// ================================================================================================

export default formHandler;
