import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import successIcon from '../img/success.svg';
import errorIcon from '../img/error.svg';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('promiseForm');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = parseInt(form.delay.value);
    const state = form.state.value;

    createPromise(delay, state)
      .then(delay => {
        iziToast.success({
          title: 'OK',
          titleColor: '#ffffff',
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#59a10d',
          iconUrl: successIcon,
          messageColor: '#ffffff',
        });
      })
      .catch(delay => {
        iziToast.error({
          title: 'Error',
          titleColor: '#ffffff',
          message: `Rejected promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#EF4040',
          iconUrl: errorIcon,
          messageColor: '#ffffff',
        });
      });
  });

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }
});
