import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  useIcon: false,
  position: 'right-top',
  cssAnimationStyle: 'from-top',
});

const form = document.querySelector('.form');
form.addEventListener('change', onChangeInput);

function onChangeInput(event){
  const delay = Number(event.currentTarget.elements.delay.value);
  const step = Number(event.currentTarget.elements.step.value);
  const amount = Number(event.currentTarget.elements.amount.value);
  return { delay, step, amount };
}

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event){
  event.preventDefault();

  let { delay, step, amount } = onChangeInput(event);
  console.log({ delay, step, amount });

  for (let i = 0; i < amount; i + 1){

    createPromise(i + 1, delay);
     delay += step;
  };
 };


function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    setTimeout(() => resolve({ position, delay }), delay);
  } else {
    // Reject
    setTimeout(() => reject({ position, delay }), delay);
  }
  })

.then(({ position, delay }) => setTimeout(() => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }), delay)
    .catch(({ position, delay }) => setTimeout(() => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    }),
    )
 }
