import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        theme: 'dark',
      });
      startButton.disabled = true;
      startButton.classList.remove('bt-active');
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
      startButton.classList.add('bt-active');
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener('click', () => {
  if (startButton.classList.contains('bt-active')) {
    startButton.disabled = true;
    startButton.classList.remove('bt-active');
    startCountdown(userSelectedDate);
  }
});

function startCountdown(targetDate) {
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(interval);
      updateTimerFields(0, 0, 0, 0);
      iziToast.success({
        title: 'Ready!',
        message: 'The time until the selected date has passed!',
        position: 'topCenter',
      });
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(distance);
    updateTimerFields(days, hours, minutes, seconds);
  }

  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerFields(days, hours, minutes, seconds) {
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
