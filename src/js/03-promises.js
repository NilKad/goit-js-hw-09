import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min';

const form = document.querySelector('.form');

const notify = Notiflix.Notify;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
