class Battle {

    contructor(id, player, opponent, firstPlayer) {
        this.id = id;
        this.player = player;
        this.opponent = opponent;

        this.maxTime = 60;
        this.currentTime = 0;

        if (!!firstPlayer) {
            this.currentPlayer = player;
        } else {
            this.currentPlayer = opponent;
        }
    }
}