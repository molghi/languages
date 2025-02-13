import { Visual } from "../../Controller.js";

// ================================================================================================

// showing .greet-screen
function showScreen(type, nextRevisionString) {
    Visual.removeGreetScreen(); // removing before rendering (if exists)

    const div = document.createElement("div");
    div.classList.add("greet-screen", "invisible", "moved-left");
    let html = "";

    // populating with content:
    if (type === `greet`) {
        html = returnScreenHtml(`greet`);
    } else if (type === `advise`) {
        html = returnScreenHtml(`advise`);
    } else if (type === "uponSubmit") {
        html = returnScreenHtml(`uponSubmit`);
    } else if (type === "revisions completed") {
        html = returnScreenHtml("revisions completed", nextRevisionString);
    } else if (type === "online failed") {
        html = returnScreenHtml("online failed");
    }

    div.innerHTML = html;
    Visual.appBlock.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible", "moved-left"); // showing it with some animation
    }, 200);
}

// ================================================================================================

// dependency of 'showScreen' -- returns content to show
function returnScreenHtml(type, nextRevisionString) {
    let result;
    const chooseRandom = (arr) => Math.floor(Math.random() * arr.length); // helper fn; returns random index of 'arr'

    // returning content:
    if (type === `greet`) {
        const options = [
            `<div class="greet-screen__title app-title">Greetings, Honoured Guest!</div>`,
            `<div class="greet-screen__title app-title">Greetings, Young Learner!</div>`,
        ];
        const secondPart = `<div class="greet-screen__sub-title">Here you may practise your language skills.<br>Add your words and practise them later, or initiate an automatically generated practice session.<br>Enhance your vocabulary with <span>spaced repetition*</span> and smart quizzes tailored to your progress.<span>*Spaced Repetition System (SRS) is a learning technique that optimises memory retention by reviewing information at increasing intervals. Difficult items appear more frequently, while easier ones are shown less often, reinforcing knowledge just before forgetting occurs.</span></div>`;
        const choice = chooseRandom(options);
        result = options[choice] + secondPart;
        //
    } else if (type === `advise`) {
        const options = [
            `<div class="greet-screen__title app-title">Practice Makes Perfect</div><div class="greet-screen__sub-title">Even a little bit counts!<br>Regularity and consistency are crucial in any skill-acquisition process.<br>Even small increments play an important role, especially in language learning.</div>`,
            `<div class="greet-screen__title app-title">Embrace Mistakes</div><div class="greet-screen__sub-title">No one is perfect from the start. Mistakes are part of the journey.<br>Learn from them, and they will guide you toward mastery.<br>No stress! Treat it as a game.</div>`,
            `<div class="greet-screen__title app-title">Language Immersion</div><div class="greet-screen__sub-title">Engagement is essential. Surround yourself with the language.<br>Immerse yourself through listening, reading, and speaking. Search for native resources.<br>Try comprehensible input!</div>`,
            `<div class="greet-screen__title app-title">Diverse Sources</div><div class="greet-screen__sub-title">Variety in practice strengthens comprehension.<br>Explore different materials, styles, approaches, and methods for well-rounded mastery. Experiment!</div>`,
            `<div class="greet-screen__title app-title">Steady!</div><div class="greet-screen__sub-title">The path to fluency and overall comprehension is gradual.<br>Each step forward, no matter how small, brings you closer.<br>Progress may be invisible at times, but steady effort always leads to improvement.</div>`,
        ];
        const choice = chooseRandom(options);
        result = options[choice];
        //
    } else if (type === `uponSubmit`) {
        result = `<div class="greet-screen__title app-title">Review submitted! Another session?</div>
        <div class="greet-screen__btns">
            <button class="greet-screen__btn">Yes</button>
            <button class="greet-screen__btn">No</button>
        </div>`;
        //
    } else if (type === `revisions completed`) {
        result = `<div class="greet-screen__title app-title">All Revisions Completed!</div>
<div class="greet-screen__sub-title">You have reviewed all your words for this language for now.<br>The next scheduled revision is not due yet.<br>You may add new words to practise now or return later.<br><span class="next-revision">Next revision: ${nextRevisionString}</span></div>`;
    } else if (type === `online failed`) {
        result = `<div class="greet-screen__title app-title">Something Went Wrong...</div>
<div class="greet-screen__sub-title">Apologies, but this online session was unsuccessful. Please try again later.<span style="opacity: 1; font-size: 15px">Tut mir leid! Désolé! Duìbuqǐ! Aasif! Izvinyayus! Ignosce! Fyrirgefðu!</span></div>`;
    }

    return result;
}

// ================================================================================================

export default showScreen;
