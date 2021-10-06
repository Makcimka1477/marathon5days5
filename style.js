

const startBtn = document.querySelector('.start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeEl= document.querySelector('#time'),
      board = document.querySelector('#board'),
      btns = document.querySelectorAll('.time-btn'),
      btn1 = document.querySelector('#time-list li:first-child');


let time = 20,
    score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('time-btn')){
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});


const newLi = document.createElement('li'),
      newBtn = document.createElement('button');

newBtn.classList.add('time-btn');
newBtn.setAttribute('data-time', '15');
newBtn.textContent = '15 сек';
newLi.append(newBtn);
btn1.after(newLi);


board.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCirlce();
    }
});

function startGame() {
    let asd = setInterval(decreaseTime, 1000);
    createRandomCirlce();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
    }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentElement.classList.add('hide');
    board.innerHTML = `<h1>Cчет: <span class='primary'>${score}</span> </h1>`;
}

function createRandomCirlce() {
    const circle = document.createElement('div');
    const size = getRandomNum(15, 60);
    const {width, height} = board.getBoundingClientRect();
    

    const x = getRandomNum(0, width - size);
    const y = getRandomNum(0, height - size);

    circle.classList.add('circle');
    
    circle.style.background = getRandomColor();
    circle.style.height = `${size}px`;
    circle.style.width = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}


function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


function getRandomColor() {
    color='rgb('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+')';
    return color;
}