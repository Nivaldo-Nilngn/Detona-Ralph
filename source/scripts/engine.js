const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLet: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTimeId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLet.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timeId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function playSound(audioName) {
    let audio = new Audio(`../source/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}


function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let ramdomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[ramdomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    });
}

function initialize() {
    addListenerHitbox();
}

initialize()
