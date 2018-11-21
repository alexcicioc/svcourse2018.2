const gridArray = [];
let gridTileLocks = [];

$('.grid-row').each(function (rowIndex, rowElement) {
    gridArray[rowIndex] = [];
    $(rowElement).children().each(function (columnIndex, cellElement) {
        const tile = new Tile(rowIndex, columnIndex, $(cellElement))
        gridArray[rowIndex].push(tile);
    })
});

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

function addTile() {
    const x = getRandomNumber(3);
    const y = getRandomNumber(3);
    const randomTileValue = getRandomTileValue();
    if (!gridArray[x][y].getTileValue()) {
        gridArray[x][y].setTileValue(randomTileValue)
    } else {
        if ($('div[class^="grid-cell tile-"]').length >= 16) {
            console.log('s-a umplut gridul');
            return;
        }
        addTile();
    }
}


$(document).ready(function () {
    addTile();
    addTile();
});

$(document).keydown(function (e) {
    let movementHappended = false;

    switch (e.which) {
        case 37: // left
            while (goLeft()) {
                movementHappended = true;
            }
            break;

        case 38: // up
            while (goUp()) {
                movementHappended = true;
            }
            break;

        case 39: // right
            while (goRight()) {
                movementHappended = true;
            }
            break;

        case 40: // down
            while (goDown()) {
                movementHappended = true;
            }
            break;

        default: return; // exit this handler for other keys
    }

    if (movementHappended) {
        addTile();
    }

    gridTileLocks = [];
});

function goDown() {
    let movementHappended = false;

    for (let x = 2; x >= 0; x--) {
        for (let y = 0; y <= 3; y++) {
            if (canWeMergeTiles(x, y, x + 1, y)) {
                mergeTiles(x, y, x + 1, y);
                movementHappended = true;
            }

        }
    }
    return movementHappended;
}

function goUp() {
    let movementHappended = false;

    for (let x = 1; x < 4; x++) {
        for (let y = 0; y <= 3; y++) {

            if (canWeMergeTiles(x, y, x - 1, y)) {
                mergeTiles(x, y, x - 1, y);
                movementHappended = true;
            }

        }
    }
    return movementHappended;
}

function goRight() {
    let movementHappended = false;

    for (let x = 0; x < 4; x++) {
        for (let y = 2; y >= 0; y--) {

            if (canWeMergeTiles(x, y, x, y + 1)) {
                mergeTiles(x, y, x, y + 1);
                movementHappended = true;
            }

        }
    }

    return movementHappended;
}

function goLeft() {
    let movementHappended = false;

    for (let x = 0; x < 4; x++) {
        for (let y = 1; y < 4; y++) {

            if (canWeMergeTiles(x, y, x, y - 1)) {
                mergeTiles(x, y, x, y - 1);
                movementHappended = true;
            }

        }
    }

    return movementHappended;
}

function isTileLocked(x, y) {
    return gridTileLocks[x] !== undefined && gridTileLocks[x][y] === true;
}

function lockTile(x, y) {
    if (!gridTileLocks[x]) {
        gridTileLocks[x] = [];
    }
    gridTileLocks[x][y] = true;
}

function canWeMergeTiles(x1, y1, x2, y2) {
    const currentElementValue = gridArray[x1][y1].getTileValue();
    const nextElementValue = gridArray[x2][y2].getTileValue();

    if (currentElementValue === 0) {
        return false;
    }

    if (nextElementValue === 0) {
        return true;
    }

    if (nextElementValue !== 0 && isTileLocked(x2, y2)) {
        return false;
    }

    if (nextElementValue === currentElementValue) {
        return true;
    }

    return false;
}

function mergeTiles(x1, y1, x2, y2) {
    const currentElementValue = gridArray[x1][y1].getTileValue();
    const nextElementValue = gridArray[x2][y2].getTileValue();

    gridArray[x1][y1].setTileValue(0);
    gridArray[x2][y2].setTileValue(currentElementValue + nextElementValue);

    if (nextElementValue > 0) {
        lockTile(x2, y2);
    } else if (isTileLocked(x1, y1)) {
        gridTileLocks[x1][y1] = false;
        lockTile(x2, y2);
    }
}
