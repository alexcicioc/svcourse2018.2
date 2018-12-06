class Grid {

    constructor(score) {
        this.gridArray = [];
        this.gridTileLocks = [];
        this.gridHistory = [];
        this.score = score;
        this.initializeGrid();
    }

    initializeGrid() {

        // setCookie('2048_grid', JSON.stringify(currentState));
        const rawCookie = getCookie('2048_grid');
        let gridCookie = null;

        if (rawCookie) {
            gridCookie = JSON.parse(rawCookie);
        }

        console.log(gridCookie);

        $('.grid-row').each((rowIndex, rowElement) => {
            this.gridArray[rowIndex] = [];
            $(rowElement).children().each((columnIndex, cellElement) => {
                const tileValue = gridCookie ? gridCookie[rowIndex][columnIndex] : 0;
                const tile = new Tile(rowIndex, columnIndex, $(cellElement), tileValue);
                this.gridArray[rowIndex].push(tile);
            })
        });

        if (!gridCookie) {
            this.addTile();
            this.addTile();
        }

        this.saveToHistory();
    }

    saveToHistory() {
        const currentState = [];

        this.gridArray.forEach((row, rowIndex) => {
            currentState[rowIndex] = [];
            row.forEach((column, columnIndex) => {
                currentState[rowIndex][columnIndex] = this.getTileValue(rowIndex, columnIndex);
            });
        });

        this.gridHistory.push(currentState);

        if (this.gridHistory.length > 11) {
            this.gridHistory.shift();
        }
        setCookie('2048_grid', JSON.stringify(currentState));
    }

    undo() {
        this.gridHistory.pop();

        if (this.gridHistory.length < 1) {
            return console.log('nothing to undo');
        }
        const latestState = this.gridHistory[this.gridHistory.length - 1];
        this.gridArray.forEach((row, x) => {
            row.forEach((column, y) => {
                this.setTileValue(x, y, latestState[x][y]);
            });
        });
    }

    addTile() {
        const x = getRandomNumber(3);
        const y = getRandomNumber(3);
        const randomTileValue = getRandomTileValue();
        if (!this.getTileValue(x, y)) {
            this.setTileValue(x, y, randomTileValue)
        } else {
            if ($('div[class^="grid-cell tile-"]').length >= 16) {
                console.log('s-a umplut gridul');
                return;
            }
            this.addTile();
        }
    }

    getTileValue(x, y) {
        return this.gridArray[x][y].getTileValue();
    }

    setTileValue(x, y, value) {
        return this.gridArray[x][y].setTileValue(value);
    }

    canWeMergeTiles(x1, y1, x2, y2) {
        const currentElementValue = this.getTileValue(x1, y1);
        const nextElementValue = this.getTileValue(x2, y2);

        if (currentElementValue === 0) {
            return false;
        }

        if (nextElementValue === 0) {
            return true;
        }

        if (nextElementValue !== 0
            && (this.isTileLocked(x1, y1) || this.isTileLocked(x2, y2))
        ) {
            return false;
        }

        if (nextElementValue === currentElementValue) {
            return true;
        }

        return false;
    }

    mergeTiles(x1, y1, x2, y2) {
        const currentElementValue = this.getTileValue(x1, y1);
        const nextElementValue = this.getTileValue(x2, y2);
        const newValue = currentElementValue + nextElementValue;

        this.setTileValue(x1, y1, 0);
        this.setTileValue(x2, y2, newValue);

        if (nextElementValue > 0) {
            this.lockTile(x2, y2);
            this.score.incrementScore(newValue);
        } else if (this.isTileLocked(x1, y1)) {
            this.gridTileLocks[x1][y1] = false;
            this.lockTile(x2, y2);
        }
    }

    isTileLocked(x, y) {
        return this.gridTileLocks[x] !== undefined && this.gridTileLocks[x][y] === true;
    }

    lockTile(x, y) {
        if (!this.gridTileLocks[x]) {
            this.gridTileLocks[x] = [];
        }
        this.gridTileLocks[x][y] = true;
    }

    resetLocks() {
        this.gridTileLocks = [];
    }
}