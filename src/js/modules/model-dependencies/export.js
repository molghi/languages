import { Logic } from "../../Controller.js";

// ================================================================================================

// exporting as .json
function exportAsJson() {
    const data = Logic.getWordsState();

    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const filename = `langtutor-export--${date}-${month}-${year.toString().slice(2)}--${hours}-${minutes}.json`;

    const json = JSON.stringify(data, null, 2); // Converting data to JSON: Converts the JavaScript object 'data' into a formatted JSON string. The 'null, 2' arguments ensure the output is pretty-printed with 2-space indentation for readability.
    const blob = new Blob([json], { type: "application/json" }); // Creating a blob: Creates a binary large object (Blob) containing the JSON string, specifying the MIME type as 'application/json' to ensure it's recognised as a JSON file.
    const url = URL.createObjectURL(blob); // Creating a download URL: Generates a temporary URL pointing to the Blob, enabling it to be downloaded as a file by associating it with a download link.

    // Create an invisible anchor element for downloading
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // clicking programmatically and removing it right after
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url); // Clean up the URL
}

// ================================================================================================

export default exportAsJson;
