socket.on('move', function(entity, cell) {
    console.log(entity);
    console.log(cell);
    grid.move(entity, cell.x, cell.y);
});