import { Logic } from "../../Controller.js";

// get 10 or less words from state, filtered by this language -- random words? random if more than 10
function getQuizWords(language) {
    const languageWords = Logic.getWordsState().filter(
        (wordObj) => wordObj.language.toLowerCase().trim() === language.toLowerCase().trim()
    );

    if (languageWords.length < 11) {
        // returned shuffled
        const shuffledIndeces = Logic.shuffleArray(languageWords.length);
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
        const random10Indeces = Logic.getRandomTen(languageWords.length);
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

export default getQuizWords;
