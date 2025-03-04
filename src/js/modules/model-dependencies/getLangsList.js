// returns the list of languages my app supports

function getLangsList(type) {
    if (type === "pure") {
        return [
            "🇬🇧 English",
            "🇨🇳 Chinese",
            "🇮🇳 Hindi",
            "🇪🇸 Spanish",
            "🇫🇷 French",
            "🇸🇦 Arabic",
            "🇧🇩 Bengali",
            "🇧🇷 Portuguese",
            "🇷🇺 Russian",
            "🇵🇰 Urdu",
            "🇩🇪 German",
            "🇨🇿 Czech",
            "🇮🇸 Icelandic",
            "🇻🇦 Latin",
            "🇯🇵 Japanese",
            "🇰🇪 Swahili",
            "🇹🇷 Turkish",
            "🇮🇹 Italian",
            "🇮🇷 Persian",
            "🇰🇷 Korean",
            "🇻🇳 Vietnamese",
            "🇵🇱 Polish",
            "🇹🇭 Thai",
            "🇬🇷 Greek",
            "🇮🇱 Hebrew",
        ];
    }

    return [
        "<span data-lang='en'><span class='lang-flag'>🇬🇧</span> <span class='lang-name'>English</span></span>",
        "<span data-lang='zh'><span class='lang-flag'>🇨🇳</span> <span class='lang-name'>Chinese</span></span>",
        "<span data-lang='hi'><span class='lang-flag'>🇮🇳</span> <span class='lang-name'>Hindi</span></span>",
        "<span data-lang='es'><span class='lang-flag'>🇪🇸</span> <span class='lang-name'>Spanish</span></span>",
        "<span data-lang='fr'><span class='lang-flag'>🇫🇷</span> <span class='lang-name'>French</span></span>",
        "<span data-lang='ar'><span class='lang-flag'>🇸🇦</span> <span class='lang-name'>Arabic</span></span>",
        "<span data-lang='be'><span class='lang-flag'>🇧🇩</span> <span class='lang-name'>Bengali</span></span>",
        "<span data-lang='pt'><span class='lang-flag'>🇧🇷</span> <span class='lang-name'>Portuguese</span></span>",
        "<span data-lang='ru'><span class='lang-flag'>🇷🇺</span> <span class='lang-name'>Russian</span></span>",
        "<span data-lang='ur'><span class='lang-flag'>🇵🇰</span> <span class='lang-name'>Urdu</span></span>",
        "<span data-lang='de'><span class='lang-flag'>🇩🇪</span> <span class='lang-name'>German</span></span>",
        "<span data-lang='cz'><span class='lang-flag'>🇨🇿</span> <span class='lang-name'>Czech</span></span>",
        "<span data-lang='is'><span class='lang-flag'>🇮🇸</span> <span class='lang-name'>Icelandic</span></span>",
        "<span data-lang='la'><span class='lang-flag'>🇻🇦</span> <span class='lang-name'>Latin</span></span>",
        "<span data-lang='jp'><span class='lang-flag'>🇯🇵</span> <span class='lang-name'>Japanese</span></span>",
        "<span data-lang='sw'><span class='lang-flag'>🇰🇪</span> <span class='lang-name'>Swahili</span></span>",
        "<span data-lang='tr'><span class='lang-flag'>🇹🇷</span> <span class='lang-name'>Turkish</span></span>",
        "<span data-lang='it'><span class='lang-flag'>🇮🇹</span> <span class='lang-name'>Italian</span></span>",
        "<span data-lang='pe'><span class='lang-flag'>🇮🇷</span> <span class='lang-name'>Persian</span></span>",
        "<span data-lang='ko'><span class='lang-flag'>🇰🇷</span> <span class='lang-name'>Korean</span></span>",
        "<span data-lang='vi'><span class='lang-flag'>🇻🇳</span> <span class='lang-name'>Vietnamese</span></span>",
        "<span data-lang='po'><span class='lang-flag'>🇵🇱</span> <span class='lang-name'>Polish</span></span>",
        "<span data-lang='th'><span class='lang-flag'>🇹🇭</span> <span class='lang-name'>Thai</span></span>",
        "<span data-lang='gr'><span class='lang-flag'>🇬🇷</span> <span class='lang-name'>Greek</span></span>",
        "<span data-lang='he'><span class='lang-flag'>🇮🇱</span> <span class='lang-name'>Hebrew</span></span>",
    ];
}

export default getLangsList;
