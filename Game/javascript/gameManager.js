class GameManager{
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx  = canvas.getContext('2d');
        this.entities = [];
        this.factory = {};
        this.player1 = null;
        this.player2 = null;
        this.mapManager = mapManager;
        this.spriteManager = spriteManager;
        this.mapManager.loadMap();
        this.spriteManager.loadAtlas("data/sprites.json", "data/spritesheet.png");
        this.factory['Player1'] = Player1;
        this.factory['Player2'] = Player2;

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
        //this.mapManager.centerAt(this.player1.pos_x, this.player1.pos_y);
        this.mapManager.draw(this.ctx);
        Player.draw(this.ctx);
        this.draw(this.ctx);
    }

    play(){
        setInterval(this.updateWorld, 20);
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