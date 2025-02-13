import { Logic } from "../../Controller.js";
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
} from "./dataMyLists.js";

// ================================================================================================

// selecting 10 random English words from those word datasets that I have in js files here (no duplicates)
function selectFromDatasets() {
    const oxfordData = Logic.sortOxfordData();
    const myData = [
        ...myListVerbs,
        ...myListAdjs,
        ...someFrequentNouns,
        ...topicFamily,
        ...topicBody,
        ...topicGeo,
        ...someExpressions,
        ...topicAnimals,
        ...topicFoodDrinks,
        ...topicHome,
        ...topicClothes,
        ...topicDirections,
        ...topicTime,
        ...topicMaterials,
        ...topicNumbers,
        ...topicReligion,
        ...topicFrequency,
        ...topicUrgency,
        ...topicInformal,
        ...topicSwearWords,
        ...topicUnsorted,
        ...topicPrepositions,
        ...topicConjunctions,
        ...topicGlueWords,
        ...topicBasicPhrases,
    ];
    const giantArrayOfAllDatasets = [...oxfordData, ...myData];
    const random10Indeces = Logic.getRandomTen(giantArrayOfAllDatasets.length); // getting 10 random indeces in `giantArrayOfAllDatasets`
    const random10Words = random10Indeces.map((index) => giantArrayOfAllDatasets[index]); // getting the words at those indeces
    return random10Words;
}

// ================================================================================================

export default selectFromDatasets;
