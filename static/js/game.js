var player = {
    name: 'playerName',
    maxLife: 100,
    currentLife: 100,
    entities: [{
        html: document.getElementsByClassName('entity')[0]
    }],
    cards: []
}

var playeropponent = {
    name: 'opponentName',
    maxLife: 100,
    currentLife: 100,
    entities: [],
    cards: []
}

function createEntity(entity, x, y) {
    var entity = document.createElement('div');
    entity.addClass('entity');
    
}



// class Battle {

//     contructor(player, opponent, firstPlayer) {
//         this.player = player;
//         this.opponent = opponent;

//         this.maxTime = 60;
//         this.currentTime = 0;

//         if (firstPlayer === 0) {
//             this.currentPlayer = player;
//         } else {
//             this.currentPlayer = opponent;
//         }
//     }
// }

// class Player {

//     constructor(name, className, cards, life, mp, dmg, capacity) {
//         this.name = name;
//         this.maxLife = life;
//         this.currentLife = life;

//         this.mainEntity = new Entity(className, life, mp, dmg, capacity);
//         this.cards = cards;
//     }
// }

// class Card {

//     constructor(spell, cost, stock, elems) {
//         this.spell = spell;
//         this.cost = cost;
//         this.stock = stock;
//         this.elems = elems
//     }
// }

// class Spell {

//     constructor(name, effect) {
//         this.name = name;
//         this.effect = effect;
//     }
// }

// class Entity {

//     constructor(className, life, mp, dmg, capacity, html_entity) {
//         this.maxLife = life;
//         this.currentLife = life;
//         this.maxMp = mp;
//         this.currentMp = mp;
//         this.dmg = dmg;
//         this.capacity = capacity;
//         this.html_entity = html_entity;

//         this.position = [0, 0];
//     }

//     displayMp() {
//         console.log(this.mp);
//     }

//     move(x, y) {
//         this.position = [x, y];
//     }
// }