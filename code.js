let timer;
let running = false;
let elapsedTime = 0;
let startTime;
let laps = [];

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    return (
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds)
    );
}

function updateDisplay() {
    const display = document.getElementById("display");
    display.innerText = formatTime(elapsedTime);
    display.style.borderColor = getRandomColor();
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function startStopwatch() {
    if (!running) {
        running = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(function () {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 1000);
    }
}

function pauseStopwatch() {
    if (running) {
        running = false;
        clearInterval(timer);
    }
}

function resetStopwatch() {
    running = false;
    clearInterval(timer);
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    updateLaps();
}

function lapTime() {
    if (running) {
        laps.push(elapsedTime);
        updateLaps();
    }
}

function updateLaps() {
    const lapsElement = document.getElementById("laps");
    lapsElement.innerHTML = "";
    laps.forEach((lap, index) => {
        const li = document.createElement("li");
        li.innerText = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapsElement.appendChild(li);
    });
}
