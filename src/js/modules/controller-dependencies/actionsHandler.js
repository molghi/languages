import { Visual, Logic } from "../../Controller.js";

// ================================================================================================

// handle clicks in .actions
function actionsHandler(actionType) {
    if (actionType === "change color") {
        // changing the accent color

        const newColor = Visual.promptAccentChange(); // prompting
        if (!newColor) return;
        if (newColor && newColor.trim().length < 3) return;
        const safeColor = Logic.checkNewColor(newColor); // checking
        Visual.setAccentColor(safeColor); // changing visually
        Logic.setAccentColor(safeColor); // changing in state and LS
    } else if (actionType === "export") {
        // exporting as JSON

        Logic.exportWords();
    } else if (actionType === "import") {
        // importing as JSON

        alert(
            "NOTE:\nWith this option, you can only import JSON, and it must be formatted exactly like the file that you can export here."
        );
        Visual.fileInputEl.click(); // clicking the btn programmatically
    }
}

// ================================================================================================

export default actionsHandler;
