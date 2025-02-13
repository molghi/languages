import all from "./dataOxford.js"; // must be tidied up

// sort the data from 'dataOxford.js'
function sortOxfordData() {
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

    return [
        ...verbs,
        ...nouns,
        ...adjectives,
        ...adverbs,
        ...prepositions,
        ...exclamations,
        ...determiners,
        ...pronouns,
        ...conjunctions,
        ...numbers,
        ...modalVerbs,
    ];
}

export default sortOxfordData;
