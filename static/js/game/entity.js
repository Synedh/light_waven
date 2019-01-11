class Entity {

    constructor(entityName, life, mp, dmg, capacity) {
        this.entityName = entityName;
        this.maxLife = life;
        this.currentLife = life;
        this.maxMp = mp;
        this.currentMp = mp;
        this.dmg = dmg;
        this.capacity = capacity;
        this.html_entity = null;

        this.position = { x: 0, y: 0 };
    }

    move(x, y) {
        grid.move(this, x, y);
    }

    create() {
        var entity = document.createElement('div');
        entity.classList.add('entity');
        var entity_name = document.createElement('div');
        entity_name.classList.add('entity_name');
        entity.appendChild(entity_name)
        var detail = document.createElement('div');
        detail.classList.add('detail');
        var class_name = document.createElement('div');
        class_name.classList.add('class_name');
        class_name.innerHTML = this.entityName;
        detail.appendChild(class_name);
        var stats = document.createElement('div');
        stats.classList.add('stats');
        var life = document.createElement('div');
        life.classList.add('life');
        life.innerHTML = this.currentLife;
        stats.appendChild(life);
        var mp = document.createElement('div');
        mp.classList.add('mp');
        mp.innerHTML = this.currentMp;
        stats.appendChild(mp);
        var dmg = document.createElement('div');
        dmg.classList.add('dmg');
        dmg.innerHTML = this.dmg;
        stats.appendChild(dmg);
        detail.appendChild(stats);
        entity.appendChild(detail);

        var entity_pers = this;
        entity.onmousedown = function(event) {
            grid.display_movement(entity_pers.position.x, entity_pers.position.y, entity_pers.currentMp);
        }
        entity.onmouseup = function(event) {
            grid.render();
        }

        document.getElementById(this.position.x + '-' + this.position.y)
            .appendChild(entity);
        this.html_entity = entity;
        return entity;
    }
}