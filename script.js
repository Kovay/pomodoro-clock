// **WARNING** 
// All of this code is horrible, not commented, and probably entirely unreadable.
// Also, im not sure if im ever going to come back and try to fix it.

const timerDisplay = document.getElementById('timeRemaining');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const header = document.getElementById('title');

let startStop = document.getElementById("start");

let workTime = 1500;
let breakTime = 300;

start.addEventListener('click', startStopTimer);
reset.addEventListener('click', resetTimer);

let setTime;
let secsLeft;
let workOrBreak = true;

if (workOrBreak = true) {
  setTime = workTime;
}
else {
  setTime = breakTime;
}

function resetTimer() {
  startStopTimer()
  if(start.classList.contains('stop')) {
    start.classList.remove('stop');
    start.innerHTML = "Start";
  }
  displayTimeLeft(workTime);
  document.title = "Pomodoro Clock";
  header.textContent = "Pomodoro Clock";
  setTime = workTime;
  secsLeft = workTime;
  clearInterval(countdown);
  workOrBreak = true;
}

function startStopTimer() {
  start.classList.toggle('stop');
  if(start.classList.contains("stop")) {
    start.innerHTML = "Stop";
    timer(setTime);
  }
  else {
    start.innerHTML = "Start";
    clearInterval(countdown);
  }
}

let countdown;

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000
  displayTimeLeft(seconds);
  
  countdown = setInterval(() => {
    const secsLeft = Math.round((then - Date.now()) / 1000);
    
    if(secsLeft < 0 ) {
      workOrBreak = !workOrBreak;
    }

    if(secsLeft < 0 && workOrBreak == false) {
      clearInterval(countdown);
      console.log(workOrBreak);
      timer(breakTime);
      return;
    }
    else if(secsLeft < 0 && workOrBreak == true) {
      clearInterval(countdown);
      console.log(workOrBreak);
      timer(workTime);
      return;
    }
    else if(secsLeft < 0) {
        clearInterval(countdown);
        console.log(workOrBreak);
        return;
    }


    displayTimeLeft(secsLeft);
    setTime = secsLeft;
  }, 1000);
}



function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  timerDisplay.textContent = display;
  if(workOrBreak == true) {
    document.title = "Work " + display;
    header.textContent = "Work Time";
  }
  else {
    document.title = "Break " + display;
    header.textContent = "Break Time";
  }
  console.log({minutes, remainderSeconds});
  console.log(workOrBreak);
}