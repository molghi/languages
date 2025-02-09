import { Visual, Logic } from "../../Controller.js";

// ================================================================================================

// handle clicks in .actions
function actionsHandler(actionType) {
    if (actionType === "change color") {
        console.log(`change col`);
        // changing the accent color

        const newColor = Visual.promptAccentChange();
        if (!newColor) return;
        if (newColor && newColor.trim().length < 3) return;
        const safeColor = Logic.checkNewColor(newColor);
        Visual.setAccentColor(safeColor); // changing visually
        Logic.setAccentColor(safeColor); // changing in state and LS
    } else if (actionType === "export") {
        // exporting as JSON
        Logic.exportWords();
    } else if (actionType === "import") {
        console.log(`import`);
        // Visual.fileInputEl.click();
    }
}

// ================================================================================================

export default actionsHandler;
