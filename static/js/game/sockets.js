socket.on('move', function(content) {
    grid.move(content.entity, content.cell.x, content.cell.y);
});