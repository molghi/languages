import { Visual } from "../../Controller.js";

// ================================================================================================

function renderEndScreen(currentQuizData, answersArr) {
    console.log(currentQuizData, answersArr);

    Visual.removeEndScreen(); // removing before rendering (if exists)
    const div = document.createElement("div");
    div.classList.add("after", "invisible");

    // getting html, part 1
    const itemsHtml = answersArr.map((answer, i) => {
        let exampleTargetHtml = currentQuizData[i].exampleTarget
            ? `<div class="after__item-row">
                <div class="after__item-row-title">Example sentence:</div>
                <div class="after__item-row-value">${currentQuizData[i].exampleTarget}</div>
            </div>`
            : "";

        let exampleTranslationHtml = currentQuizData[i].exampleTranslation
            ? `<div class="after__item-row">
                <div class="after__item-row-title">Example translated:</div>
                <div class="after__item-row-value">${currentQuizData[i].exampleTranslation}</div>
            </div>`
            : "";

        let definitionHtml = currentQuizData[i].definition
            ? `<div class="after__item-row">
                <div class="after__item-row-title">Definition:</div>
                <div class="after__item-row-value">${currentQuizData[i].definition}</div>
            </div>`
            : "";

        let noteHtml = currentQuizData[i].note
            ? `<div class="after__item-row">
                <div class="after__item-row-title">Note:</div>
                <div class="after__item-row-value">${currentQuizData[i].note}</div>
            </div>`
            : "";

        let pronunciationHtml = currentQuizData[i].pronunciation
            ? `<div class="after__item-row">
                <div class="after__item-row-title">Pronunciation / Transliteration:</div>
                <div class="after__item-row-value">${currentQuizData[i].pronunciation}</div>
            </div>`
            : "";

        return `<li class="after__item" data-id="${currentQuizData[i].id}">
                    <div class="after__item-number">${i + 1}</div>
                    <div class="after__item-row">
                        <div class="after__item-row-title">Question:</div>
                        <div class="after__item-row-value">How would you translate this? — <span>${
                            currentQuizData[i].word
                        }</span></div>
                    </div>
                    <div class="after__item-row after__item-row--your">
                        <div class="after__item-row-title">Your Answer:</div>
                        <div class="after__item-row-value">${answer}</div>
                    </div>
                    <div class="after__item-row after__item-row--correct">
                        <div class="after__item-row-title">Correct Answer:</div>
                        <div class="after__item-row-value">${currentQuizData[i].translation}</div>
                    </div>
                    ${pronunciationHtml}
                    ${definitionHtml}
                    ${exampleTargetHtml}
                    ${exampleTranslationHtml}
                    ${noteHtml}
                    <div class="after__item-row">
                        <div class="after__item-row-title">Rate Your Knowledge:</div>
                        <div class="after__item-row-sub-title">Hover over a button to see what it means</div>
                        <div class="after__item-btn-box">
                            <button title="You failed to recall the word" class="after__item-btn after__item-btn--wrong">Wrong</button>
                            <button title="You struggled but got it right" class="after__item-btn after__item-btn--hard">Hard</button>
                            <button title="You recalled it correctly with little effort" class="after__item-btn after__item-btn--good">Good</button>
                            <button title="You recalled it effortlessly" class="after__item-btn after__item-btn--easy">Easy</button>
                        </div>
                    </div>
                </li>`;
    });

    // getting html, part 2
    div.innerHTML = `<div class="after__title app-title">Review Your Responses</div>
                        <div class="after__sub-title">
                            ▶︎ Rate your knowledge for each question – this is required for the app to tailor your learning experience.
                        </div>
                        <ol class="after__items">
                        ${itemsHtml.join("")}
                            <div class="after__action-btn-box">
                                <button class="after__action-btn">Submit Review</button>
                            </div>
                        </ol>`;

    Visual.appBlock.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible"); // showing it with some animation
    }, 200);
}

// ================================================================================================

export default renderEndScreen;
