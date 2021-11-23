// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
    width: '280px',
    position: 'right-top',
    cssAnimationStyle: 'from-top',
});

const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minEl = document.querySelector('.value[data-minutes]');
const secEl = document.querySelector('.value[data-seconds]');
const input = document.querySelector('#datetime-picker');

startBtn.setAttribute('disabled', true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const currentDateTime = Date.now();
      const selectedDatesTime = selectedDates[0].getTime();

      currentDateTime > selectedDatesTime ? Notify.failure("Please choose a date in the future") : startBtn.removeAttribute('disabled');
    },
  };

  const flatPickr = flatpickr('#datetime-picker', options);
  startBtn.addEventListener('click', onClickStartBtn)

  let isActive = false;
  function onClickStartBtn(){
      if (isActive) {
          return;
      }
      const timeId = setInterval(function(){
        isActive = !false;
        const currentDateTime = Date.now();
        const selectedDatesTime = flatPickr.selectedDates[0].getTime();
        const reverseTime = selectedDatesTime - currentDateTime;
        const time = convertMs(reverseTime);
        updateTime(time);

        if (reverseTime < 1000){
            removeInterval(timeId);
        }
      }, 1000);
      
  }

  function removeInterval(id){
      clearInterval(id);
  }
  function addLeadingZero(value){
      return String(value).padStart(2, "0");
  }
  function updateTime({days, hours, minutes, seconds}){
      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minEl.textContent = minutes;
      secEl.textContent = seconds;
  }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

