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

        this.player1 = this.player_1;

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
        this.mapManager.centerAt(this.player1.pos_x, this.player1.pos_y);
        this.mapManager.draw(this.ctx);
        this.player_1.draw(this.ctx);
        this.player_2.draw(this.ctx);
        this.draw(this.ctx);
        $('#pl1a').val('Army: ' + this.player_1.army + '    ' + 'Steps: ' + this.player_1.waypoints + '/16');
        $('#pl2a').val('Army: ' + this.player_2.army + '    ' + 'Steps: ' + this.player_2.waypoints + '/16') ;
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
}

var canvas = document.getElementById('canvas');
var game = new GameManager(canvas);
game.play();
