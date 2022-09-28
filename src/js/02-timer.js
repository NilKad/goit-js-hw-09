import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min';

const notify = Notiflix.Notify;

const dateInputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('[data-start]');
const displayDayRef = document.querySelector('[data-days]');
const displayHourRef = document.querySelector('[data-hours]');
const displayMinRef = document.querySelector('[data-minutes]');
const displaySecRef = document.querySelector('[data-seconds]');
startBtnRef.disabled = true;
let dateEnd = null;
let timerEnd = null;
let isStartTimer = false;
let timerId = null;

const optionsFlatpickr = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    changeSelectedDate(selectedDates[0]);
    // console.log((selectedDates[0] - Date.now()) / 1000);
  },
  onChange(selectedDates) {
    changeSelectedDate(selectedDates[0]);
    // console.log('Date selected', selectedDates[0]);
  },
};

const onClickBtnStart = e => {
  if (!changeSelectedDate(dateEnd)) {
    return false;
  }
  if (isStartTimer) {
    clearInterval(timerId);
    isStartTimer = false;
    // return;
  }
  // const getEndDateObject = dateToObject(dateEnd - Date.now());
  dateToObject(dateEnd - Date.now());
  startTimer(dateEnd);
};

const changeSelectedDate = selectedDates => {
  const dataCheck = checkInputDateVsCurrent(selectedDates);
  isBtnStartDisabled(!dataCheck);
  if (!dataCheck) {
    notify.failure('Please choose a date in the future');
  }
  return dataCheck;
};

const isBtnStartDisabled = e => {
  startBtnRef.disabled = e;
};

const addLeadingZero = num => String(num).padStart(2, '0');

const checkInputDateVsCurrent = selectedDates => {
  dateEnd = selectedDates;
  if (Date.now() < selectedDates) {
    return true;
  }
  return false;
};

const dateToObject = dateInput => {
  dateInput = Math.floor(dateInput / 1000);

  const sec = dateInput % 60;
  const min = ((dateInput - sec) / 60) % 60;
  const hour = (((dateInput - sec) / 60 - min) / 60) % 24;
  const day = (((dateInput - sec) / 60 - min) / 60 - hour) / 24;
  // console.log(`day: ${day} hour: ${hour} min: ${min} sec: ${sec}`);
  return { day, hour, min, sec };
};

const renderTimer = ({ day, hour, min, sec }) => {
  // console.log(sec);
  displayDayRef.textContent = addLeadingZero(day);
  displayHourRef.textContent = addLeadingZero(hour);
  displayMinRef.textContent = addLeadingZero(min);
  displaySecRef.textContent = addLeadingZero(sec);
};

const startTimer = dateEnd => {
  timerEnd = dateEnd;
  notify.info('Timer started');

  timerId = setInterval(() => {
    const timerCount = timerEnd - Date.now();
    isStartTimer = true;
    if (timerCount <= 0) {
      clearInterval(timerId);
      notify.success('Time end');
      return;
    }
    renderTimer(dateToObject(timerCount));
  }, 1000);
};

const dateOut = new flatpickr(dateInputRef, optionsFlatpickr);
startBtnRef.addEventListener('click', onClickBtnStart);
