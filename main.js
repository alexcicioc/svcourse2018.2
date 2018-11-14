const gridArray = [];

$('.grid-row').each(function (rowIndex, rowElement) {
    gridArray[rowIndex] = [];
    $(rowElement).children().each(function (cellIndex, cellElement) {
        gridArray[rowIndex].push($(cellElement));
    })
});

function getRandomTileValue() {
    const randomNumber = getRandomNumber(10);

    if (randomNumber < 9) {
        return 2;
    } else {
        return 4;
    }
}

function getRandomNumber(maxValue) {
    const randomNumber = Math.random() * maxValue;
    const roundedDownNumber = Math.floor(randomNumber);

    return roundedDownNumber;
}

function changeTileValue(x, y, newValue) {
    const cell = gridArray[x][y];
    console.l
    let tileElement;
    console.log(cell);
    if (cell.has("div").length > 0) {
        console.log('has div');
        tileElement = cell.children()[0];
    } else {
        tileElement = $('<div></div>');
    }
    tileElement.addClass('tile-' + newValue);
    tileElement.text(newValue);
    tileElement.hide();
    cell.html(tileElement);
    tileElement.fadeIn();
}

function addTile() {
    const x = getRandomNumber(3);
    const y = getRandomNumber(3);
    const randomTileValue = getRandomTileValue();

    if (!gridArray[x][y].text()) {
        changeTileValue(x, y, randomTileValue)
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
});

function goDown() {
    let movementHappended = false;

    for (let x = 2; x >= 0; x--) {
        for (let y = 0; y <= 3; y++) {
            const currentElement = gridArray[x][y];
            const nextElement = gridArray[x + 1][y];

            const currentElementValue = currentElement.text();
            const nextElementValue = nextElement.text();

            if (canWeMergeTiles(currentElementValue, nextElementValue)) {
                mergeTiles(currentElement, nextElement);
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
            const currentElement = gridArray[x][y];
            const nextElement = gridArray[x - 1][y];

            const currentElementValue = currentElement.text();
            const nextElementValue = nextElement.text();

            if (canWeMergeTiles(currentElementValue, nextElementValue)) {
                mergeTiles(currentElement, nextElement);
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
            const currentElement = gridArray[x][y];
            const nextElement = gridArray[x][y + 1];

            const currentElementValue = currentElement.text();
            const nextElementValue = nextElement.text();

            if (canWeMergeTiles(currentElementValue, nextElementValue)) {
                mergeTiles(currentElement, nextElement);
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
            const currentElement = gridArray[x][y];
            const nextElement = gridArray[x][y - 1];

            const currentElementValue = currentElement.text();
            const nextElementValue = nextElement.text();

            if (canWeMergeTiles(currentElementValue, nextElementValue)) {
                mergeTiles(currentElement, nextElement);
                movementHappended = true;
            }

        }
    }

    return movementHappended;
}

function canWeMergeTiles(currentElementValue, nextElementValue) {
    if (currentElementValue == 0) {
        return false;
    }

    if (nextElementValue == 0) {
        return true;
    }

    if (nextElementValue == currentElementValue) {
        return true;
    }

    return false;
}

function mergeTiles(currentElement, nextElement) {
    const currentElementValue = currentElement.text() ? parseInt(currentElement.text()) : 0;
    const nextElementValue = nextElement.text() ? parseInt(nextElement.text()) : 0;
    const nextValue = currentElementValue + nextElementValue;
    const nextClassName = 'tile-' + nextValue;

    // nextElement.hide();
    nextElement.text(nextValue);
    nextElement.addClass(nextClassName);
    nextElement.removeClass('tile-' + nextElementValue);
    // nextElement.fadeIn('fast');

    // currentElement.hide();
    currentElement.text('');
    currentElement.removeClass('tile-' + currentElementValue);
    // currentElement.fadeIn('fast');
}
