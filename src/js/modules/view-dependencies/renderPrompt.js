import { Visual } from "../../Controller.js";

// ================================================================================================

function renderPrompt(titleString, optionsArr, optionsExplainersArr, btnText) {
    // console.log(titleString, optionsArr, optionsExplainersArr, btnText);
    Visual.removePrompt(); // removing before rendering (if exists)

    const div = document.createElement("div");
    div.classList.add("prompt", "invisible");

    // getting HTML part 1:
    const optionsHtml = optionsArr
        .map((optName, index) => {
            if (optionsExplainersArr && optionsExplainersArr.length > 0) {
                const showClass = optionsExplainersArr[index].includes("IN DEVELOPMENT") ? " no-hover" : ""; // if its explainer contains 'IN DEVELOPMENT', it is disabled
                return `<div class="prompt__option prompt__option--choice"><span class="prompt__option-content${showClass}">${optName}</span><span class="prompt__option--explainer">— ${optionsExplainersArr[index]}</span></div>`;
            } else {
                return `<div class="prompt__option prompt__option--choice"><span class="prompt__option-content">${optName}</span></div>`;
            }
        })
        .join("");

    let viewClass = optionsArr.length > 5 ? " many" : " few"; // if there are more than 5 elements, there will be special styles applied
    if (optionsArr.includes("Review Your Words")) viewClass = ""; // do not apply the language rendering styles if it's not languages that this prompt is rendering

    let messageHtml = "";
    let btnClass = "";
    if (titleString === "Select Language" && optionsArr.length === 0) {
        messageHtml = `<div class="prompt__message">Nothing here yet because you haven't added any words to practise.</div>`;
        btnClass = ` hidden`;
    }

    // getting HTML part 2:
    const html = `<div class="prompt__title app-title">${titleString}</div>
                    <div class="prompt__box${viewClass}">
                        ${optionsHtml}
                        ${messageHtml}
                        <div class="prompt__option prompt__option--action${btnClass}"><span class="prompt__option-action-content">${btnText}</span></div>
                    </div>`;

    div.innerHTML = html;
    Visual.appBlock.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible"); // rendering with some animation
    }, 200);
}

// ================================================================================================

export default renderPrompt;
