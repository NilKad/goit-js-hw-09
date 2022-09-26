import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min';

const form = document.querySelector('.form');

const notify = Notiflix.Notify;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    notify.success(`Fullfilled promise ${position} in ${delay}ms`);
  } else {
    notify.failure(`Rejected promise ${position} in ${delay}ms`);
  }
}

const formResultConstructor = target => {
  return {
    delay: target.delay.value,
    step: target.step.value,
    amount: target.amount.value,
  };
};

const createEvents = ({ delay, step, amount }) => {
  const interval = Number(step);
  let currentDelay = Number(delay);
  for (let i = 1; i <= amount; i += 1) {
    const cd = currentDelay;
    setTimeout(() => createPromise(i, cd), cd);
    currentDelay += interval;
  }
};

const onSubmit = e => {
  e.preventDefault();
  const formData = formResultConstructor(e.currentTarget);
  createEvents(formData);
};

form.addEventListener('submit', onSubmit);
