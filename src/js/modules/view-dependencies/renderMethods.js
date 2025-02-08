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
                            <input autocomplete="off" name="word" type="text" class="form__input" placeholder="Word (target language)" required />
                        </div>
                        <div class="form__input-box">
                            <span>*</span>
                            <input autocomplete="off" name="translation" type="text" class="form__input" placeholder="Translation" required />
                        </div>
                        <div class="form__input-box">
                            <input autocomplete="off" name="pronunciation" type="text" class="form__input" placeholder="Pronunciation / Transliteration (optional)" />
                        </div>
                        <div class="form__input-box">
                            <input autocomplete="off" name="definition" type="text" class="form__input" placeholder="Definition (optional)" />
                        </div>
                        <div class="form__input-box">
                            <input autocomplete="off" name="example" type="text" class="form__input" placeholder="Example sentence (optional)" />
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

    let viewClass = optionsArr.length > 1 ? " many" : ""; // if there are more than 4 elements, they will be flexed -- less, won't
    if (optionsArr.includes("From Saved")) viewClass = ""; // do not apply the language rendering styles if it's not languages that this prompt is rendering

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

function showScreen(type, nextRevisionString) {
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
        const secondPart = `<div class="greet-screen__sub-title">Here you may practise your language skills.<br>Add your words and practise them later, or initiate an automatically generated practice session.<br>Enhance your vocabulary with <span>spaced repetition*</span> and smart quizzes tailored to your progress.<span>*Spaced Repetition System (SRS) is a learning technique that optimises memory retention by reviewing information at increasing intervals.<br>Difficult items appear more frequently, while easier ones are shown less often, reinforcing knowledge just before forgetting occurs.</span></div>`;
        const choice = chooseRandom(options);
        html = options[choice] + secondPart;
    } else if (type === `advise`) {
        const options = [
            `<div class="greet-screen__title app-title">Practice Makes Perfect</div><div class="greet-screen__sub-title">Even a little bit counts!<br>Regularity and consistency are crucial in any skill-acquisition process.<br>Even small increments play an important role, especially in language learning.</div>`,
            `<div class="greet-screen__title app-title">Embrace Mistakes</div><div class="greet-screen__sub-title">No one is perfect from the start. Mistakes are part of the journey.<br>Learn from them, and they will guide you toward mastery.<br>No stress! Treat it as a game.</div>`,
            `<div class="greet-screen__title app-title">Language Immersion</div><div class="greet-screen__sub-title">Engagement is essential. Surround yourself with the language.<br>Immerse yourself through listening, reading, and speaking. Search for native resources.<br>Try comprehensible input!</div>`,
            `<div class="greet-screen__title app-title">Diverse Sources</div><div class="greet-screen__sub-title">Variety in practice strengthens comprehension.<br>Explore different materials, styles, approaches, and methods for well-rounded mastery. Experiment!</div>`,
            `<div class="greet-screen__title app-title">Steady!</div><div class="greet-screen__sub-title">The path to fluency and overall comprehension is gradual.<br>Each step forward, no matter how small, brings you closer.<br>Progress may be invisible at times, but steady effort always leads to improvement.</div>`,
        ];
        const choice = chooseRandom(options);
        html = options[choice];
    } else if (type === "uponSubmit") {
        html = `<div class="greet-screen__title app-title">Submitted! Another one?</div>
        <div class="greet-screen__btns">
            <button class="greet-screen__btn">Yes</button>
            <button class="greet-screen__btn">No</button>
        </div>`;
    } else if (type === "revisions completed") {
        html = `<div class="greet-screen__title app-title">All Revisions Completed!</div>
<div class="greet-screen__sub-title">You have reviewed all your words for now.<br>The next scheduled revision is not due yet.<br>You can add new words to practice now or return later.<br><span class="next-revision">Next revision: ${nextRevisionString}</span></div>`;
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

    Visual.containerEl.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible"); // rendering with some animation
    }, 200);
}

// ================================================================================================

function renderMessage(type, text) {
    Visual.removeMessage();
    const div = document.createElement("div");
    const classType = type === "success" ? "success" : type === "error" ? "error" : "notification";
    div.classList.add("message", "invisible", "moved-left", classType);

    div.innerHTML = `<div class="message__text">${text}</div>`;
    Visual.containerEl.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible", "moved-left"); // rendering with some animation
    }, 200);

    setTimeout(() => {
        Visual.removeMessage();
    }, 5000);
}

// ================================================================================================

function renderRound(wordObj, rounds, currentRound, isLastRound) {
    console.log(wordObj, rounds, currentRound, isLastRound);
    Visual.removeRound(); // removing before rendering (if exists)
    const div = document.createElement("div");
    div.classList.add("round", "invisible");

    const btnText = !isLastRound ? "Next round >" : "Finish session >";
    div.innerHTML = `<div class="round__total-progress">
                            <span class="round__total-progress-bar" style="width: ${
                                ((currentRound + 1) / rounds) * 100
                            }%;"></span>
                            <span>Round:</span>
                            <span>
                                <span>${currentRound + 1}</span><span>/${rounds}</span>
                            </span>
                        </div>
                        <div class="round__title">Do you remember what this word means?</div>
                        <div class="round__word app-title">${wordObj.word}</div>
                        <div class="round__input"><input type="text" placeholder="Type your answer..." /></div>
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

function renderEndScreen(currentQuizData, answersArr) {
    Visual.removeEndScreen(); // removing before rendering (if exists)
    const div = document.createElement("div");
    div.classList.add("after", "invisible");

    const itemsHtml = answersArr.map((answer, i) => {
        return `<li class="after__item" data-id="${currentQuizData[i].added}">
                    <div class="after__item-number">${i + 1}</div>
                    <div class="after__item-row">
                        <div class="after__item-row-title">Question:</div>
                        <div class="after__item-row-value">Do you remember what this word means? — <span>${
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

    div.innerHTML = `<div class="after__title app-title">Review Your Responses</div>
                        <div class="after__sub-title">
                            ▶︎ Rate your knowledge for each of these questions – this is required for the app to tailor your
                            learning experience.
                        </div>
                        <ol class="after__items">
                        ${itemsHtml.join("")}
                            <div class="after__action-btn-box">
                                <button class="after__action-btn">Submit</button>
                            </div>
                        </ol>`;

    Visual.appBlock.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible"); // rendering with some animation
    }, 200);
}

// ================================================================================================

export { renderAddForm, renderPrompt, showScreen, renderQuickPopup, renderMessage, renderRound, renderEndScreen };
