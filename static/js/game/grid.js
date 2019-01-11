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
        this.finder = new PF.AStarFinder();
    }

    move(entity, x, y) {
        this.grid[entity.position.x][entity.position.y] = null;
        this.grid[x][y] = entity;
        entity.position.x = x;
        entity.position.y = y;
        this.render();
    }

    display_movement(x, y, n) {
        var test = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
        for (var i = 0; i < this.grid.length; ++i) {
            var row = this.grid[i];
            for (var j = 0; j < row.length; ++j) {
                if (this.finder.findPath(x, y, i, j, JSON.parse(JSON.stringify(test))) <= n) {
                    console.log("[" + i + ", " + j + "]");
                }
            }
        }
    }

    render() {
        for (var i = 0; i < this.grid.length; ++i) {
            var row = this.grid[i];
            for (var j = 0; j < row.length; ++j) {
                var cell = document.getElementById(i + '-' + j).innerHTML = "";
                while (cell.lastChild) {
                    cell.removeChild(cell.lastChild);
                }
                if (row[j])
                    row[j].create();
            }
        }
    }
}