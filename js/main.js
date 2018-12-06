const score = new Score();
const grid = new Grid(score);
const movement = new Movement(grid);

function getRandomTileValue() {
    const randomNumber = getRandomNumber(9);

    if (randomNumber < 9) {
        return 2;
    } else {
        return 4;
    }
}

function getRandomNumber(maxValue) {
    const randomNumber = Math.random() * (maxValue + 1);
    const roundedDownNumber = Math.floor(randomNumber);

    return roundedDownNumber;
}

function finishTurn() {
    grid.addTile();
    grid.resetLocks();
    grid.saveToHistory();
}

function getDirection(key) {
    switch (key) {
        case 37:
            return 'Left';

        case 38:
            return 'Up';

        case 39:
            return 'Right';

        case 40:
            return 'Down';

        default: return; // exit this handler for other keys
    }
}

$(document).keydown(function (event) {
    let movementHappended = false;
    const direction = getDirection(event.which);

    if (event.which === 90 && event.ctrlKey) {
        grid.undo();
    }

    if (direction) {
        while (movement[`go${direction}`]()) {
            movementHappended = true;
        }
    }

    if (movementHappended) {
        finishTurn();
    }
});

