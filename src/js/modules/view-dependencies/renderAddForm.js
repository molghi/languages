import { Visual } from "../../Controller.js";

// ================================================================================================

// render Add Word form
function renderAddForm() {
    Visual.removeAddForm(); // removing before rendering (if exists)

    const div = document.createElement("div");
    div.classList.add("form", "invisible");

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

export default renderAddForm;
