class Battle {

    contructor(player, opponent, firstPlayer) {
        this.player = player;
        this.opponent = opponent;

        this.maxTime = 60;
        this.currentTime = 0;

        if (firstPlayer === 0) {
            this.currentPlayer = player;
        } else {
            this.currentPlayer = opponent;
        }
    }
}