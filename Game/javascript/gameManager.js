class GameManager{
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx  = canvas.getContext('2d');
        this.entities = [];
        this.factory = {};
        this.mapManager = mapManager;
        this.spriteManager = spriteManager;
        this.eventManager = eventManager;
        this.physicsManager = physicsManager;
        this.soundManager = soundManager;
        this.mapManager.loadMap();
        this.eventManager.setup();
        this.spriteManager.loadAtlas("data/sprites.json", "data/spritesheet.png");

        this.factory['Player1'] = player1;
        this.factory['Gold'] = gold;
        this.factory['Skeleton'] = skeleton;

        this.player_1 = Object.create(this.factory['Player1']);
        this.player_2 = Object.create(this.factory['Player1']);

        this.eventManager.players.push(this.player_1);
        this.eventManager.players.push(this.player_2);
        this.eventManager.actual = 0;

        this.soundManager.init();
        this.soundManager.load('/data/Ambient.mp3', (clip)=>{console.log(clip)});
        this.soundManager.play('/data/Ambient.mp3', {looping: true});

        this.updateWorld = this.updateWorld.bind(this);
        this.update = this.update.bind(this);
        this.play = this.play.bind(this);
        this.draw = this.draw.bind(this);

    }

    update(){
        this.entities.forEach(function (e) {
            try{
                e.update();
            } catch (e) {}
        });
        this.mapManager.centerAt(this.eventManager.players[eventManager.actual].pos_x, this.eventManager.players[eventManager.actual].pos_y);
        this.mapManager.draw(this.ctx);
        this.player_1.draw(this.ctx);
        this.player_2.draw(this.ctx);
        this.draw(this.ctx);
        $('#pl1a').val('Army: ' + this.eventManager.players[eventManager.actual].army + ' ' + 'Gold: ' + this.eventManager.players[eventManager.actual].gold);
        $('#pl1b').val('Steps: ' + this.eventManager.players[eventManager.actual].waypoints + '/16');
    }

    play(){
        setInterval(this.updateWorld, 200);
    }

    updateWorld(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.update();
    }

    draw(ctx) {
        for (let e=0; e<this.entities.length; e++){
            this.entities[e].draw(ctx);
        }
    }

    getguard(pos_x, pos_y) {
        for (let entity of this.entities){
            if (entity.pos_x === pos_x && entity.pos_y === pos_y){
                if (entity.guard)
                    return entity.guard;
                return entity;
            }
        }
    }

    gettreasure(pos_x, pos_y) {
        for (let entity of this.entities){
            if (entity.pos_x === pos_x && entity.pos_y === pos_y){
                if (entity.treasure)
                    return entity.treasure;
                return entity;
            }
        }
    }

    eraseentity(pos_x, pos_y) {
        for (let index in this.entities){
            if (this.entities[index].pos_x === pos_x && this.entities[index].pos_y === pos_y){
                this.entities.splice(index, 1);
            }
        }
    }
}

var canvas = document.getElementById('canvas');
var game = new GameManager(canvas);
game.play();
