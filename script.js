let timerInterval;
let startTime;
let pauseTime = 0;
let lapCount = 0;
let timerRunning = false;
const buttons = document.querySelectorAll('.button');
const clockElements = document.querySelectorAll('.text, .minute, .sec, .msec');
const outerCircle = document.querySelector('.outer-circle');
const colors = ['#ff5722', '#ffc107', '#ffeb3b', '#00bcd4', '#4caf50', '#9c27b0', '#e91e63', '#673ab7', '#f44336'];

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("stopBtn").addEventListener("click", stop);
document.getElementById("lapBtn").addEventListener("click", lap);

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const color = colors[index];
    clockElements.forEach(element => {
      element.style.color = color;
    });
    outerCircle.style.backgroundColor = color; // Set the outer circle background color
  });
});

function start() {
  if (!timerRunning) {
    if (pauseTime === 0) {
      startTime = Date.now();
    } else {
      startTime = Date.now() - pauseTime;
      pauseTime = 0; // Reset pause time after resuming
    }
    timerInterval = setInterval(updateTime, 10);
    timerRunning = true;
  }
}

function stop() {
  clearInterval(timerInterval);
  timerRunning = false;
  pauseTime = Date.now() - startTime; // Store paused time
}

function reset() {
  clearInterval(timerInterval);
  lapCount = 0;
  timerRunning = false;
  pauseTime = 0;
  document.querySelector('.minute').textContent = '00:';
  document.querySelector('.sec').textContent = '00:';
  document.querySelector('.msec').textContent = '00';
  document.getElementById('lapList').innerHTML = '';
}

function lap() {
  if (timerRunning) {
    const lapTime = formatTime(Date.now() - startTime);
    lapCount++;
    const lapItem = document.createElement('li');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `<p><span class="number">Lap ${lapCount}</span>&nbsp;&nbsp;&nbsp;<span class="time-stamp">${lapTime[0]}:${lapTime[1]}:${lapTime[2]}</span></p>`;
    document.getElementById('lapList').appendChild(lapItem);
  }
}

function updateTime() {
  const elapsedTime = Date.now() - startTime;
  const formattedTime = formatTime(elapsedTime);
  document.querySelector('.minute').textContent = formattedTime[0] + ':';
  document.querySelector('.sec').textContent = formattedTime[1] + ':';
  document.querySelector('.msec').textContent = formattedTime[2];
}

function formatTime(ms) {
  let minutes = Math.floor(ms / (1000 * 60));
  let seconds = Math.floor((ms % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((ms % 1000) / 10);
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  if (milliseconds < 10) milliseconds = '0' + milliseconds;
  return [minutes, seconds, milliseconds];
}