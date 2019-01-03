grid = new Grid();

player = new Player(
    'Synedh',
    'Ioptapay',
    [],
    100, 3, 15, new Spell('testCapa', 'testCapa description')
);

grid.move(player.entities[0], 4, 4);

function challenge() {
    opponent_name = document.getElementById('opponent_input').value;
    socket.emit('challenge', opponent_name);
    console.log(opponent_name);
}