const xClass = 'x'
const circleClass = 'o';
const board = document.querySelector('#board');
const cells = document.querySelectorAll('[data-cell]');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let circleTurn = true;
let winningMsg = document.querySelector('[data-winning-message-text]');
let winContainer = document.querySelector('#winContainer');
const restart = document.querySelector('#restartBtn');

setBoardHoverClass();

restart.addEventListener('click', (e) => {
    winContainer.classList.remove('show');
    removeClasses();
})

cells.forEach((cell) => {
    cell.addEventListener('click', handleClick, { once: true });
})

function handleClick(e) {
    // Place mark
    const cell = e.target;

    if (circleTurn) {
        currentClass = circleClass;
    }
    else {
        currentClass = xClass;
    }

    cell.classList.add(currentClass);

    // check if user won
    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    else {
        swapTurns();
        setBoardHoverClass();
    }

}

function endGame(draw) {
    if (draw) {
        // draw
        winningMsg.innerText = `It's a draw!`;
    }
    else {
        winningMsg.innerText = `${circleTurn ? 'O Wins' : 'X wins'}`;
    }

    winContainer.classList.add('show');
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass);
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(circleClass);
    board.classList.remove(xClass);
    if (circleTurn) {
        board.classList.add(circleClass);
    }
    else {
        board.classList.add(xClass);
    }
}


function checkWin(currentClass) {
    return winningCombinations.some(each => {
        return each.every(index => {
            return (cells[index].classList.contains(currentClass));
        })
    })
}


// remove classes
function removeClasses() {
    circleTurn = false;
    cells.forEach((each) => {
        each.classList.remove(xClass);
        each.classList.remove(circleClass);
        each.removeEventListener('click', handleClick);
        each.addEventListener('click', handleClick, { once: true });
    })
    setBoardHoverClass();
}

