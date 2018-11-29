class Movement {

    constructor(grid) {
        this.grid = grid;
    }

    goDown() {
        let movementHappended = false;

        for (let x = 2; x >= 0; x--) {
            for (let y = 0; y <= 3; y++) {
                if (this.grid.canWeMergeTiles(x, y, x + 1, y)) {
                    this.grid.mergeTiles(x, y, x + 1, y);
                    movementHappended = true;
                }

            }
        }
        return movementHappended;
    }

    goUp() {
        let movementHappended = false;

        for (let x = 1; x < 4; x++) {
            for (let y = 0; y <= 3; y++) {

                if (this.grid.canWeMergeTiles(x, y, x - 1, y)) {
                    this.grid.mergeTiles(x, y, x - 1, y);
                    movementHappended = true;
                }

            }
        }
        return movementHappended;
    }

    goRight() {
        let movementHappended = false;

        for (let x = 0; x < 4; x++) {
            for (let y = 2; y >= 0; y--) {

                if (this.grid.canWeMergeTiles(x, y, x, y + 1)) {
                    this.grid.mergeTiles(x, y, x, y + 1);
                    movementHappended = true;
                }

            }
        }

        return movementHappended;
    }

    goLeft() {
        let movementHappended = false;

        for (let x = 0; x < 4; x++) {
            for (let y = 1; y < 4; y++) {

                if (this.grid.canWeMergeTiles(x, y, x, y - 1)) {
                    this.grid.mergeTiles(x, y, x, y - 1);
                    movementHappended = true;
                }

            }
        }

        return movementHappended;
    }
}