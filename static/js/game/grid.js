class Grid {

    constructor() {
        this.grid = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null]
        ];
    }

    move(entity, x, y) {
        this.grid[entity.position.x][entity.position.y] = null;
        this.grid[x][y] = entity;
        entity.position.x = x;
        entity.position.y = y;
        this.render();
    }

    render() {
        for (var i = 0; i < this.grid.length; ++i) {
            var row = this.grid[i];
            for (var j = 0; j < row.length; ++j) {
                if (row[j]) {
                    row[j].create();
                } else {
                    var cell = document.getElementById(i + '-' + j).innerHTML = "";
                    while (cell.lastChild) {
                        cell.removeChild(cell.lastChild);
                    }
                }
            }
        }
    }
}