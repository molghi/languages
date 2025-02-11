import { Visual } from "../../Controller.js";

// ================================================================================================

// render Add a Word form
function renderAddForm() {
    Visual.removeAddForm(); // removing before rendering (if exists)

    const div = document.createElement("div");
    div.classList.add("form", "form--add", "invisible");

    // getting HTML:
    const html = `<form action="#" class="form__form">
                        <div class="form__title">Add a Word:</div>
                        <div class="form__input-box">
                            <span>*</span>
                            <select name="languages" required>
                                <option value="" selected disabled>Select Language</option>
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
                            <input autocomplete="off" name="exampleTarget" type="text" class="form__input" placeholder="Example sentence (target language, optional)" />
                        </div>
                        <div class="form__input-box">
                            <input autocomplete="off" name="exampleTranslation" type="text" class="form__input" placeholder="Example sentence (translation, optional)" />
                        </div>
                        <div class="form__input-box">
                            <input autocomplete="off" name="note" type="text" class="form__input" placeholder="Note (optional)" />
                        </div>
                        <div class="form__btn-box">
                            <button type="submit" class="form__btn form__btn--add" title="Add this one word">Add</button>
                            <button type="button" class="form__btn form__btn--bulk" title="Add many words at once">Add Multiple</button>
                        </div>
                    </form>`;

    div.innerHTML = html;
    Visual.appBlock.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible"); // some animation
    }, 200);
}

// ================================================================================================

// render Add Multiple Words form
function renderAddManyForm() {
    Visual.removeAddForm(); // removing before rendering (if exists)

    const div = document.createElement("div");
    div.classList.add("form", "form--bulk", "invisible");

    // getting HTML:
    const html = `<div class="form__title">Add Multiple Words:</div>
                        <div class="form__explainer">
                            <div class="form__explainer-row">You can add multiple words at once, but they <u>must</u> follow a strict format:</div>
                            <div class="form__explainer-row">
                                <ul>
                                    <li>Each word entry <u>must</u> be on a new line, with no empty lines between entries.</li>
                                    <li>Categories within a line (such as word, translation, pronunciation, etc.) <u>must</u> be separated using the | symbol.</li>
                                    <li>If you choose to skip certain categories (e.g., pronunciation or definition), you <u>must still</u> include a placeholder such as _ or - in their respective positions. This ensures the correct structure is maintained.</li>
                                    <li>This format is <u>mandatory</u>, and the order of categories in the example below is <u>strict</u> — failure to adhere to it will result in incorrect input.</li>
                                </ul>
                            </div>
                            <div class="form__explainer-row mt15 df">
                                <div>Example:</div>
                                <pre><code>language | word | translation | pronunciation | definition | example sentence | example translation | note
language2 | word2 | translation2 | pronunciation2 | definition2 | example sentence2 | example translation2 | note2</code></pre>
                            </div>
                            <div class="form__explainer-row mt20 df">
                                <div>Example:</div>
                                <pre><code>german | Haus | house | haʊs | A building for people | Ich wohne in einem Haus. | I live in a house. | Common noun
german | Vogel | bird | _ | _ | Eine Möwe ist ein lustiger Vogel. | _ | _</code></pre>
                            </div>
                        </div>
                    <form action="#" class="form__form">
                        <div class="form__input-box form__textarea-box">
                            <span>*</span>
                            <textarea placeholder="Your words here" class="form__input form__textarea" required autocomplete="off" name="bulkAdd"></textarea>
                        </div>
                        <div class="form__btn-box">
                            <button type="submit" class="form__btn form__btn--bulk" title="Add many words at once">Add Words</button>
                        </div>
                    </form>`;

    div.innerHTML = html;
    Visual.appBlock.appendChild(div);

    setTimeout(() => {
        div.classList.remove("invisible"); // some animation
    }, 200);
}

// ================================================================================================

export { renderAddForm, renderAddManyForm };
