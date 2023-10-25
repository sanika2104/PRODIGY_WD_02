let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');
let lapBtn = document.getElementById('lap');
let lapList = document.getElementById('lapList');

let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let timer = false;
let interval;

startBtn.addEventListener('click', function () {
    timer = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
    startStop();
});

stopBtn.addEventListener('click', function () {
    timer = false;
    clearInterval(interval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
});

resetBtn.addEventListener('click', function () {
    timer = false;
    clearInterval(interval);
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    lapList.innerHTML = '';
    document.getElementById('display').textContent = '00:00:00.00';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
});

lapBtn.addEventListener('click', function () {
    if (timer) {
        const lapTime = getFormattedTime(hour, minute, second, count);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
        lapList.appendChild(lapItem);
    }
});

function startStop() {
    let startTime = Date.now() - (hour * 3600000 + minute * 60000 + second * 1000 + count * 10);
    interval = setInterval(function () {
        let currentTime = Date.now() - startTime;
        hour = Math.floor(currentTime / 3600000);
        currentTime %= 3600000;
        minute = Math.floor(currentTime / 60000);
        currentTime %= 60000;
        second = Math.floor(currentTime / 1000);
        count = Math.floor((currentTime % 1000) / 10);
        document.getElementById('display').textContent = getFormattedTime(hour, minute, second, count);
    }, 10);
}

function getFormattedTime(hour, minute, second, count) {
    return (
        `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}.${count.toString().padStart(2, '0')}`
    );
}