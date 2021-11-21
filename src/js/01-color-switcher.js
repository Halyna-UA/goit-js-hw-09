const startBtn = document.querySelector('button[data-start]');
const stoptBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let bodyColor = null;
stoptBtn.setAttribute('disabled', true);

startBtn.addEventListener('click', onStartBtn);
stoptBtn.addEventListener('click', onStopBtn);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onStartBtn(){
    bodyColor = setInterval(() => bodyEl.style.backgroundColor = getRandomHexColor(),1000);
    startBtn.setAttribute('disabled', true);
    stoptBtn.removeAttribute('disabled');
};

function onStopBtn(){
    clearInterval(bodyColor);
    startBtn.removeAttribute('disabled');
    stoptBtn.setAttribute('disabled', true);
};



