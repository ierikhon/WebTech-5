class spriteManager{
    constructor(){
        this.image = new Image();
        this.sprites = [];
        this.imgLoaded = false;
        this.jsonLoaded = false;

        this.loadAtlas = this.loadAtlas.bind(this);
        this.parseAtlas = this.parseAtlas.bind(this);
        this.loadimg = this.loadimg.bind(this);
        this.drawSprite = this.drawSprite.bind(this);
    }

    loadAtlas(atlasimg){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200){
                this.parseAtlas(request.responseText);
            }
        };
        request.open("GET", '/atlas', true);
        request.send();
        this.loadimg(atlasimg);
    }

    parseAtlas(atlasJSON) {
        var atlas = JSON.parse(atlasJSON);
        for (let name in atlas.frames){
            var frame = atlas.frames[name].frame;
            this.sprites.push({name: name, x: frame.x, y: frame.y, w: frame.w, h: frame.h});
        }
        this.jsonLoaded = true;
    }

    loadimg(imgName) {
        this.image.onload = function () {
            this.imgLoaded = true;
        };
        this.image.src = imgName;
    }

    drawSprite(ctx, name, x, y){
        if(!this.imgLoaded || !this.jsonLoaded){
            setTimeout(function () {
                this.drawSprite(ctx, name, x, y);
            }, 100)
        } else {
            var sprite = this.getSprite(name);
            if(!mapManager.isVisible(x, y, sprite.w, sprite.h))
                return;
            x-= mapManager.view.x;
            y-= mapManager.view.y;
            ctx.drawImage(this.image, sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h);
        }
    }

    getSprite(name) {
        for (let i=0; i<this.sprites.length; i++){
            var s = this.sprites[i];
            if (s.name === name)
                return s;
        }
        return null;
    }
}