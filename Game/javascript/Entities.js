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
        spriteManager.drawSprite(ctx, img, this.pos_x, this.pos_y);
    },
    update: function() {

    }
});

var Player1 = Player.extend();
var Player2 = Player.extend();