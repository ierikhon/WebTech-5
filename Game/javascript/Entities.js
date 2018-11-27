var Entity = {
    pos_x: 0,
    pos_y: 0,
    size_x: 0,
    size_y: 0,
    touch: false,
    extend: function(extendProto) {
        var object = Object.create(this);
        for(var property in extendProto) {
            if(this.hasOwnProperty(property) || typeof object[property] === 'undefined') {
                object[property] = extendProto[property];
            }
        }
        return object;
    }
};

var Player = Entity.extend({
    size_x: 32,
    size_y: 32,
    move_x: 0,
    move_y: 0,
    draw: function(ctx) {
        spriteManager.drawSprite(ctx, 'player', this.pos_x, this.pos_y);
    },
    update: function() {

    }
});

var Gold = Entity.extend({
    size_x: 32,
    size_y: 32,
    move_x: 0,
    move_y: 0,
    draw: function(ctx) {
        spriteManager.drawSprite(ctx, 'gold', this.pos_x, this.pos_y);
    },
    update: function() {

    }
});

var Skeleton = Entity.extend({
    size_x: 32,
    size_y: 32,
    move_x: 0,
    move_y: 0,
    state: 0,
    img: 'guard_1',
    draw: function(ctx) {
        spriteManager.drawSprite(ctx, this.img, this.pos_x, this.pos_y);
    },
    update: function() {
        this.state = (this.state + 1) % 2;
        if (this.state === 0)
            this.img = 'guard_1';
        if (this.state === 1)
            this.img = 'guard_2';
    }
});

var Bonfire = Entity.extend({
    size_x: 32,
    size_y: 32,
    move_x: 0,
    move_y: 0,
    state: 0,
    img: 'bonfire_1',
    draw: function(ctx) {
        spriteManager.drawSprite(ctx, this.img, this.pos_x, this.pos_y);
    },
    update: function() {
        this.state = (this.state + 1) % 4;
        if (this.state === 0)
            this.img = 'bonfire_1';
        if (this.state === 1)
            this.img = 'bonfire_2';
        if (this.state === 2)
            this.img = 'bonfire_3';
        if (this.state === 3)
            this.img = 'bonfire_4';
    }
});

var Player1 = Player.extend();
var Player2 = Player.extend();