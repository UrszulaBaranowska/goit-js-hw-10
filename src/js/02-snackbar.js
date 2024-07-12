import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import successIcon from '../img/success.svg';
import errorIcon from '../img/error.svg';
import cautionIcon from '../img/caution.svg';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('promiseForm');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const delayInput = form.elements['delay'];
    const stateInput = form.elements['state'];
    const delay = delayInput.value.trim();
    const state = stateInput.value.trim();

    if (delay === '' || state === '') {
      iziToast.warning({
        title: 'CAUTION',
        titleColor: '#ffffff',
        message: 'You forgot important data!',
        position: 'topRight',
        iconUrl: cautionIcon,
        backgroundColor: '#FFA000',
        messageColor: '#ffffff',
        close: false,
      });
      return;
    }
    createPromise(parseInt(delay), state)
      .then(delay => {
        iziToast.success({
          title: 'OK',
          titleColor: '#ffffff',
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: '#59a10d',
          iconUrl: successIcon,
          messageColor: '#ffffff',
          close: false,
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
          close: false,
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
