document.forms["challenge"]
    .addEventListener("submit", function(event) {
        event.preventDefault();
        challenge_modal.style.display = "block";
        opponent_username = this["opponent"].value
        socket.emit(
            'challenge',
            user.login,
            opponent_username
        );
});

function challenge_cancel() {
    socket.emit(
        'challenge_cancel',
        user.login,
        opponent_username,
        battle_id
    );
}

function challenge_accept() {
    socket.emit(
        'challenge_accept',
        user.login,
        opponent_username,
        battle_id
    );
}

socket.on('challenge', function(challenger, id) {
    opponent_username = challenger;
    battle_id = id;
    document.getElementById('modal_challenger_name').innerHTML = challenger;
    battle_modal.style.display = "block";
});

socket.on('challenge_cancel', function(err, message) {
    if (err) {
        console.log("Error : " + err);
    } else {
        console.log("Message : " + message);
    }
    opponent_username = "";
    document.forms["challenge"].reset();
    challenge_modal.style.display = "none";
    battle_modal.style.display = "none";
});

socket.on('challenge_accept', function(id) {
    battle = new Battle(id, null, null, null);
    document.forms["challenge"].reset();
    document.getElementById("challenge").style.display = "none";
});