const inputEl = document.querySelector('.input');
const startButtonEl = document.querySelector('.startBtn');
const cancelButtonEl = document.querySelector('.cancelBtn');
const timerEl = document.querySelector('.span');

let intervalId;

const createTimerAnimator = () => {
  return (seconds) => {
    let hours = 0;
    let minutes = 0;

    startButtonEl.disabled = true; 
       
    if(seconds >= 60) {
      minutes = Math.floor(seconds / 60);
      seconds -= 60 * minutes;
    }

    if(minutes >= 60) {
      hours = Math.floor(minutes / 60);
      minutes -= 60 * hours;
    }

      intervalId = setInterval(function() {
        
        timerEl.textContent = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds--)}`  

        if (seconds == -1 && minutes != 0) {
          minutes--;
          seconds += 60;
        }

        if (seconds == -1 && minutes == 0 && hours != 0) {
          hours--;
          minutes += 59;
          seconds += 60;
        }

        if(seconds == -1) {
          clearInterval(intervalId)
        }

        if (hours == 0 && minutes == 0 && seconds == -1) {
          startButtonEl.disabled = false;
        }
      }, 1000)



  };
};

const formatNumber = (number) => {
  if (+number < 10) {
    number = '0' + number 
  }
  return number
}

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/\D/g, "");
});

startButtonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
  inputEl.disabled = false;
});

cancelButtonEl.addEventListener('click', () => {
  timerEl.textContent = '00:00:00'
  clearInterval(intervalId);
  startButtonEl.disabled = false;
})