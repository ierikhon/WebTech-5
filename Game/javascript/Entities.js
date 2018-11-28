var Entity = {
    pos_x: 0,
    pos_y: 0,
    size_x: 0,
    size_y: 0,
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

var Player2 = Entity.extend({
    pos_x: Math.floor(Math.random()*64)*32,
    pos_y: Math.floor(Math.random()*64)*32,
    waypoints: 16,
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

var Player1 = Entity.extend({
    pos_x: Math.floor(Math.random()*64)*32,
    pos_y: Math.floor(Math.random()*64)*32,
    waypoints: 160000000,
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


var player1 = Player1.extend();
var player2 = Player2.extend();
var gold = Gold.extend();
var skeleton = Skeleton.extend();