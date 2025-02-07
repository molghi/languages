import { Visual } from "../../Controller.js";

// ================================================================================================

// render Add Word form
function renderAddForm() {
    Visual.removeAddForm(); // removing before rendering (if exists)

    const div = document.createElement("div");
    div.classList.add("form", "invisible");

    const html = `<form action="#" class="form__form">
                        <div class="form__title">Add a Word:</div>
                        <div class="form__input-box">
                            <span>*</span>
                            <select name="languages" required>
                                <option value="" selected disabled>Select Language</option>
                                <option value="english">English</option>
                                <option value="german" title="German">Deutsch</option>
                                <option value="french" title="French">Français</option>
                            </select>
                        </div>
                        <div class="form__input-box">
                            <span>*</span>
                            <input type="text" class="form__input" placeholder="Word (target language)" required />
                        </div>
                        <div class="form__input-box">
                            <span>*</span>
                            <input type="text" class="form__input" placeholder="Translation" required />
                        </div>
                        <div class="form__input-box">
                            <input type="text" class="form__input" placeholder="Pronunciation / Transliteration (optional)" />
                        </div>
                        <div class="form__input-box">
                            <input type="text" class="form__input" placeholder="Definition (optional)" />
                        </div>
                        <div class="form__input-box">
                            <input type="text" class="form__input" placeholder="Example sentence (optional)" />
                        </div>
                        <div class="form__btn-box">
                            <button class="form__btn">Add</button>
                        </div>
                    </form>`;

    div.innerHTML = html;
    Visual.appBlock.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible"); // some animation
    }, 200);
}

// ================================================================================================

function renderPrompt(titleString, optionsArr, optionsExplainersArr, btnText) {
    Visual.removePrompt(); // removing before rendering (if exists)

    const div = document.createElement("div");
    div.classList.add("prompt", "invisible");

    const optionsHtml = optionsArr
        .map((optName, index) => {
            if (optionsExplainersArr && optionsExplainersArr.length > 0)
                return `<div class="prompt__option prompt__option--choice"><span class="prompt__option-content">${optName}</span><span class="prompt__option--explainer">— ${optionsExplainersArr[index]}</span></div>`;
            else
                return `<div class="prompt__option prompt__option--choice"><span class="prompt__option-content">${optName}</span></div>`;
        })
        .join("");

    let viewClass = optionsArr.length > 4 ? " many" : "";

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

function greetScreen(type) {
    const chooseRandom = (arr) => Math.floor(Math.random() * arr.length); // returns random index of 'arr'

    Visual.removeGreetScreen(); // removing before rendering (if exists)

    const div = document.createElement("div");
    div.classList.add("greet-screen", "invisible", "moved-left");
    let html;

    // populating with content:
    if (type === `greet`) {
        const options = [
            `<div class="greet-screen__title app-title">Greetings, Honoured Guest!</div>`,
            `<div class="greet-screen__title app-title">Greetings, Young Learner!</div>`,
        ];
        const secondPart = `<div class="greet-screen__sub-title">Here you may practise your language skills.<br>Add your words and practise them later, or initiate an automatically generated practice session.</div>`;
        const choice = chooseRandom(options);
        html = options[choice] + secondPart;
    } else if (type === `advise`) {
        const options = [
            `<div class="greet-screen__title app-title">Practice Makes Perfect</div><div class="greet-screen__sub-title">Even a little bit counts!<br>Regularity and consistency are crucial in any skill-acquisition process.<br>Even small increments play an important role, especially in language learning.</div>`,
            `<div class="greet-screen__title app-title">Embrace Mistakes</div><div class="greet-screen__sub-title">No one is perfect from the start. Mistakes are part of the journey.<br>Learn from them, and they will guide you toward mastery.<br>No stress! Treat it as a game.</div>`,
            `<div class="greet-screen__title app-title">Language Immersion</div><div class="greet-screen__sub-title">Engagement is essential. Surround yourself with the language.<br>Immerse yourself through listening, reading, and speaking. Search for native resources.</div>`,
            `<div class="greet-screen__title app-title">Diverse Sources</div><div class="greet-screen__sub-title">Variety in practice strengthens comprehension.<br>Explore different materials, styles, approaches, and methods for well-rounded mastery. Experiment!</div>`,
            `<div class="greet-screen__title app-title">Steady!</div><div class="greet-screen__sub-title">The path to fluency and overall comprehension is gradual.<br>Each step forward, no matter how small, brings you closer.<br>Progress may be invisible at times, but steady effort always leads to improvement.</div>`,
        ];
        const choice = chooseRandom(options);
        html = options[choice];
    }

    div.innerHTML = html;
    Visual.appBlock.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible", "moved-left"); // rendering with some animation
    }, 200);
}

// ================================================================================================

function renderQuickPopup(lang, hoveredItem) {
    if (!lang || !hoveredItem) return;
    Visual.removePopup();

    const data = Visual.langsInfo[lang];

    const div = document.createElement("div");
    div.classList.add("lang-info", "invisible");

    div.innerHTML = `<div class="lang-info__title">Quick Info</div>` + data.replaceAll("\n", "<br>");

    // el.appendChild(div);
    Visual.containerEl.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible"); // rendering with some animation
    }, 200);
}

// ================================================================================================

export { renderAddForm, renderPrompt, greetScreen, renderQuickPopup };
