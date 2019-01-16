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
        this.selected_entity = null;
    }

    move(entity, x, y) {
        this.grid[entity.position.x][entity.position.y] = null;
        this.grid[x][y] = entity;
        entity.position.x = x;
        entity.position.y = y;
        this.render();
    }

    onCellClick(x, y) {
        if (this.selected_entity && document.getElementById(x + '-' + y).style.backgroundColor == "red")
            this.selected_entity.move(x, y);
    }

    onCellEnter(x, y) {
        if (this.selected_entity && document.getElementById(x + '-' + y).style.backgroundColor == "green") {
            var entityPosition = this.selected_entity.position;
            var path = this.finder.findPath(
                this.selected_entity.position.x,
                this.selected_entity.position.y, 
                x,
                y,
                new PF.Grid(this.bool_grid())
            );
            path.forEach(function(cell) {
                if (cell[0] != entityPosition.x || cell[1] != entityPosition.y) {
                    document.getElementById(cell[0] + '-' + cell[1]).style.backgroundColor = "red";
                }
            });
        }
    }

    onCellLeave(x, y) {
        if (document.getElementById(x + "-" + y).style.backgroundColor == "red") {
            var entityPosition = this.selected_entity.position;
            var path = this.finder.findPath(
                this.selected_entity.position.x,
                this.selected_entity.position.y, 
                x,
                y,
                new PF.Grid(this.bool_grid())
            );
            path.forEach(function(cell) {
                if (cell[0] != entityPosition.x || cell[1] != entityPosition.y) {
                    document.getElementById(cell[0] + '-' + cell[1]).style.backgroundColor = "green";
                }
            });
        }
               
    }

    bool_grid() {
        var out = []
        for (var i = 0; i < this.grid.length; ++i) {
            var row = this.grid[i];
            var out_row = [];
            for (var j = 0; j < row.length; ++j) {
                out_row.push(!!row[j]);
            }
            out.push(out_row);
        }
        return out.map((col, i) => out.map(row => row[i]));
    }

    display_movement(x, y, entity) {
        var grid = this.bool_grid();
        for (var i = 0; i < this.grid.length; ++i) {
            var row = this.grid[i];
            for (var j = 0; j < row.length; ++j) {
                var path = this.finder.findPath(x, y, i, j, new PF.Grid(grid));
                if ((x != i || y != j) && path.length > 0 && path.length <= entity.currentMp + 1) {
                    var cell = document.getElementById(i + '-' + j);
                    cell.style.backgroundColor = "green";
                }
            }
        }
        this.selected_entity = entity;
    }

    render() {
        this.selected_entity = null;
        for (var i = 0; i < this.grid.length; ++i) {
            var row = this.grid[i];
            for (var j = 0; j < row.length; ++j) {
                var cell = document.getElementById(i + '-' + j);
                cell.style.background = "none";
                while (cell.lastChild) {
                    cell.removeChild(cell.lastChild);
                }
                if (row[j])
                    row[j].create();
            }
        }
    }
}