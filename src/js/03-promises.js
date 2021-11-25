import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener("submit", onSubmitClick);
  
function onSubmitClick (event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget;
   
  let dalayPromise = Number(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, dalayPromise).then(onFulfilled).catch(onRejected);;
    dalayPromise += Number(step.value);
  };
};

function createPromise(position, delay) {

return new Promise((resolve, reject) => {
  const canFulfill = Math.random() > 0.3;

  setTimeout(() => {
    if (canFulfill) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }

    reject(`❌ Rejected promise ${position} in ${delay}ms`);
  }, delay);
});
  
}

function onFulfilled(result) {
 Notify.success(result);
}

function onRejected(error) {
 Notify.failure(error);
}