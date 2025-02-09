import { Visual } from "../../Controller.js";

// ================================================================================================

function renderPrompt(titleString, optionsArr, optionsExplainersArr, btnText) {
    Visual.removePrompt(); // removing before rendering (if exists)

    const div = document.createElement("div");
    div.classList.add("prompt", "invisible");

    // getting HTML part 1:
    const optionsHtml = optionsArr
        .map((optName, index) => {
            if (optionsExplainersArr && optionsExplainersArr.length > 0)
                return `<div class="prompt__option prompt__option--choice"><span class="prompt__option-content">${optName}</span><span class="prompt__option--explainer">— ${optionsExplainersArr[index]}</span></div>`;
            else
                return `<div class="prompt__option prompt__option--choice"><span class="prompt__option-content">${optName}</span></div>`;
        })
        .join("");

    let viewClass = optionsArr.length > 1 ? " many" : ""; // if there are more than 4 elements, they will be flexed -- less, won't
    if (optionsArr.includes("From Saved")) viewClass = ""; // do not apply the language rendering styles if it's not languages that this prompt is rendering

    // getting HTML part 2:
    const html = `<div class="prompt__title app-title">${titleString}</div>
                    <div class="prompt__box${viewClass}">
                        ${optionsHtml}
                        <div class="prompt__option prompt__option--action"><span class="prompt__option-action-content">${btnText}</span></div>
                    </div>`;

    div.innerHTML = html;
    Visual.appBlock.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible"); // rendering with some animation
    }, 200);
}

// ================================================================================================

export default renderPrompt;
