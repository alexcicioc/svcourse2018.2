class Tile {
    constructor(x, y, jqueryElement, value = 0) {
        this.x = x;
        this.y = y;
        this.element = jqueryElement;
        this.setTileValue(value);
    }

    getTileValue() {
        return this.value;
    }

    setTileValue(newValue) {
        let tileElement;

        if (this.element.has("div").length > 0) {
            tileElement = $(this.element.children()[0]);
        } else {
            tileElement = $('<div></div>');
        }

        tileElement.removeClass('tile-' + this.getTileValue());

        if (newValue > 0) {
            tileElement.addClass('tile-' + newValue);
            tileElement.text(newValue);
        } else {
            tileElement.text('');
        }

        this.element.html(tileElement);
        this.value = newValue;
    }
}