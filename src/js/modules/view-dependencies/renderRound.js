import { Visual } from "../../Controller.js";

// ================================================================================================

// rendering .round
function renderRound(wordObj, rounds, currentRound, isLastRound) {
    if (!wordObj) return;

    Visual.removeRound(); // removing before rendering (if exists)
    const div = document.createElement("div");
    div.classList.add("round", "invisible");

    // getting HTML:
    let exampleTargetHtml = wordObj.exampleTarget
        ? `<div class="round__row">
                <div class="round__row-title">Example sentence:</div>
                <div class="round__row-value">${wordObj.exampleTarget}</div>
            </div>`
        : "";

    let noteHtml = wordObj.note
        ? `<div class="round__row">
                <div class="round__row-title">Note:</div>
                <div class="round__row-value">${wordObj.note}</div>
            </div>`
        : "";

    let pronunciationHtml = wordObj.pronunciation
        ? `<div class="round__row">
                <div class="round__row-title">Pronunciation / Transliteration:</div>
                <div class="round__row-value">${wordObj.pronunciation}</div>
            </div>`
        : "";

    let btnText = !isLastRound ? "Next round >" : "Finish session >";
    if (rounds === 1) btnText = "Finish session >";

    div.innerHTML = `<div class="round__total-progress">
                            <span class="round__total-progress-bar" style="width: ${
                                ((currentRound + 1) / rounds) * 100
                            }%;"></span>
                            <span>Round:</span>
                            <span>
                                <span>${currentRound + 1}</span><span>/${rounds}</span>
                            </span>
                        </div>
                        <div class="round__box">
                            <div class="round__title">How would you translate this?</div>
                            <div class="round__word app-title">${wordObj.word}</div>
                            ${pronunciationHtml}
                            ${exampleTargetHtml}
                            ${noteHtml}
                            <div class="round__input"><input type="text" placeholder="Type your answer..." /></div>
                        </div>
                        <div class="round__action-btn-box">
                            <button class="round__action-btn">${btnText}</button>
                        </div>`;

    Visual.appBlock.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible"); // rendering with some animation
    }, 200);

    setTimeout(() => {
        document.querySelector("input").focus(); // focusing input
    }, 500);
}

// ================================================================================================

export default renderRound;
