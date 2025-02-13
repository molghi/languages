import { Visual } from "../../Controller.js";

// updating .footer__last-practiced -- 'Last practiced' and 'Sessions today'
function updateLastPracticed(lastPracticed, sessionsPlayedToday) {
    let content = lastPracticed === "Never" ? lastPracticed : "...";

    if (lastPracticed && lastPracticed !== "Never") {
        const nowTime = new Date().getTime();
        const thenTime = new Date(lastPracticed).getTime();
        const difference = nowTime - thenTime; // in ms
        let differenceMins = Math.floor(difference / 1000 / 60);
        if (differenceMins === 0) content = `Just now`;
        else content = `${differenceMins} ${differenceMins === 1 ? "minute" : "minutes"} ago`;

        if (differenceMins > 59) {
            let differenceHours = Math.floor(difference / 1000 / 60 / 60);
            differenceMins = differenceMins - differenceHours * 60;
            content = `${differenceHours} ${differenceHours === 1 ? "hour" : "hours"} and ${differenceMins} ${
                differenceMins === 1 ? "minute" : "minutes"
            } ago`;
            if (differenceHours > 23) {
                let differenceDays = Math.floor(difference / 1000 / 60 / 60 / 24);
                content = `${differenceDays} ${differenceDays === 1 ? "day" : "days"} ago`;
            }
        }
    }

    let sessionsContent = sessionsPlayedToday > 0 ? `<span>Sessions today: ${sessionsPlayedToday}</span>` : "";
    const nowDate = new Date().getDate();
    const thenDate = new Date(lastPracticed).getDate();
    if (nowDate !== thenDate) sessionsContent = "";

    Visual.lastPracticedEl.innerHTML = `<span>Last practised: ${content}</span>${sessionsContent}`;
}

export default updateLastPracticed;
