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

function addTile() {
    const randomElement = getRandomElement();
    const randomTileValue = getRandomTileValue();
    if (!$(randomElement).hasClass('tile-2')
        && !$(randomElement).hasClass('tile-4')) {
        $(randomElement).addClass('tile-' + randomTileValue);
        $(randomElement).text(randomTileValue);
    } else {
        if ($('.tile-2').length + $('.tile-4').length >= 16) {
            console.log('s-a umplut gridul');
            return;
        }
        addTile();
    }
}


function getRandomElement() {
    const randomPosition = getRandomNumber(16);
    return $('.grid-cell')[randomPosition];
}

$(document).ready(function () {
    addTile();
    addTile();
});

$(document).keydown(function (e) {

    switch (e.which) {
        case 37: // left
            goLeft();
            break;

        case 38: // up
            goUp();
            break;

        case 39: // right
            goRight();
            break;

        case 40: // down
            goDown();
            break;

        default: return; // exit this handler for other keys
    }
});

function goDown() {

}

function goUp() {

}

function goRight() {
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 3; y++) {
            const currentElement = gridArray[x][y];
            const nextElement = gridArray[x][y + 1];

            const currentElementValue = currentElement.text();
            const nextElementValue = nextElement.text();

            if (currentElementValue > 0) {
                if (nextElementValue > 0) {
                    if (currentElementValue === nextElementValue) {
                        console.log('tile1 = tile2');
                        const newValue = parseInt(currentElementValue) + parseInt(nextElementValue);
                        const className = 'tile-' + newValue;
                        nextElement.text(newValue);
                        nextElement.addClass(className);
                        currentElement.text(0);
                    } else {
                        console.log('tile1 != tile2');
                        // do nothing
                    }
                } else {
                    console.log('tile2 == 0');
                }
            } else {
                console.log('tile1 == 0');
            }
        }
    }
}

function goLeft() {

}