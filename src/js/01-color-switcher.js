const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyStyle = document.body.style;
btnStop.disabled = true;

let timerId = null;

const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const changeBackgroundColor = () =>
  (bodyStyle.backgroundColor = getRandomHexColor());

const toggleBtn = () => {
  btnStart.toggleAttribute('disabled');
  btnStop.toggleAttribute('disabled');
};

const startTimer = evt => {
  changeBackgroundColor();
  toggleBtn();
  timerId = setInterval(changeBackgroundColor, 1000);
};

const stopTimer = evt => {
  clearInterval(timerId);
  toggleBtn();
};

const onStartBtn = btnStart.addEventListener('click', startTimer);
const onStopBtn = btnStop.addEventListener('click', stopTimer);
