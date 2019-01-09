var challenge_modal = document.getElementById("challenge_modal");
var battle_modal = document.getElementById("battle_modal");
var opponent_username = "";

battle = new Battle();
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

document.forms["challenge"]
    .addEventListener("submit", function(event) {
        event.preventDefault();
        challenge_modal.style.display = "block";
        socket.emit(
            'challenge',
            {
                challenger: user.login,
                opponent: this["opponent"].value
            }, 
            function (data) {
                console.log(data);
            }
        );
});

function challenge_cancel() {
    challenge_modal.style.display = "none";
    battle_modal.style.display = "none";
    opponent_username = "";
    socket.emit(
        'challenge_cancel',
        {
            challenger: user.login,
            opponent: document.forms["challenge"]["opponent"].value
        }
    );
}

function challenge_accept() {
    battle_modal.style.display = "none";
    document.getElementById("challenge").style.display = "none";
    socket.emit(
        'challenge_accept',
        {
            challenger: user.login,
            opponent: document.forms["challenge"]["opponent"].value
        }
    );
    console.log("Battle Started.")
}

socket.on('challenge', function(content) {
    document.getElementById('modal_challenger_name')
        .innerHTML = content.username;
    battle_modal.style.display = "block";
});

socket.on('challenge_cancel', function(content) {
    if (content.error) {
        console.log(content.error);
    } else {
        console.log(content.message);
    }
    challenge_modal.style.display = "none";
    battle_modal.style.display = "none";
});

socket.on('challenge_accept', function(content) {
    document.getElementById("challenge").style.display = "none";
});