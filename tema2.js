
$('#add-tile').click(function () {
    addTile();
});

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
