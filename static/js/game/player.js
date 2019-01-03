class Player {

    constructor(name, className, cards, life, mp, dmg, capacity) {
        this.name = name;
        this.maxLife = life;
        this.currentLife = life;

        this.entities = [new Entity(className, life, mp, dmg, capacity)];
        this.cards = cards;
    }
}