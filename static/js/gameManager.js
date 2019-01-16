var challenge_modal = document.getElementById("challenge_modal");
var battle_modal = document.getElementById("battle_modal");
var opponent_username = "";
var battle_id = null;

grid = new Grid();

player = new Player(
    'Synedh',
    'Ioptapay',
    [],
    100, 3, 15, new Spell('testCapa', 'testCapa description')
);

opponent = new Player(
    'Dd',
    'Ennemy',
    [],
    100, 3, 15, new Spell('testCapa', 'testCapa description')
);

grid.move(player.entities[0], 4, 4);
grid.move(opponent.entities[0], 2, 2);

Array.from(document.getElementsByClassName("cell")).forEach(function(cell) {
    cell.addEventListener("mouseup", function(event) {
        grid.onCellClick(cell.id[0], cell.id[2]);
    });
    cell.addEventListener("mouseenter", function(event) {
        grid.onCellEnter(cell.id[0], cell.id[2]);
    });
    cell.addEventListener("mouseleave", function(event) {
        grid.onCellLeave(cell.id[0], cell.id[2]);
    });
});