import { Logic } from "../../Controller.js";

// returns a string formatted like: "15/2/2025 at 15:35 (in 2 days and 9 hours)"
function getNextRevisionDate() {
    const withRevision = Logic.getWordsState().filter((wordObj) => wordObj.nextRevisionDateTime);
    const revisions = withRevision.map((wordObj) => wordObj.nextRevisionDateTime).sort((a, b) => a - b);
    const soonest = revisions[0];
    const datetime = new Date(soonest);

    const date = datetime.getDate();
    const month = datetime.getMonth() + 1;
    const year = datetime.getFullYear();
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    let string = `${date}/${month}/${year} at ${hours}:${minutes.toString().padStart(2, 0)}`;

    const difference = datetime.getTime() - new Date().getTime();
    const differenceDays = Math.floor(difference / 1000 / 60 / 60 / 24);
    let differenceHours = Math.floor(difference / 1000 / 60 / 60);
    let differenceMinutes = Math.floor(difference / 1000 / 60);

    if (differenceDays > 0) differenceHours = differenceHours - differenceDays * 24;
    let inTime = ` `;
    if (differenceDays > 0) {
        inTime += `(in ${differenceDays} ${differenceDays !== 1 ? "days" : "day"} and ${differenceHours} ${
            differenceHours !== 1 ? "hours" : "hour"
        })`;
    } else {
        differenceMinutes = differenceMinutes - differenceDays * 24 * 60 - differenceHours * 60;
        inTime += `(in ${differenceHours} ${differenceHours !== 1 ? "hours" : "hour"} and ${differenceMinutes} minutes)`;
    }

    string += inTime;
    return string;
}

export default getNextRevisionDate;
