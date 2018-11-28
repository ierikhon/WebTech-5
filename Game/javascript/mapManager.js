var mapManager = {
    mapData: null,
    tLayer: null,
    xCount: 0,
    yCount: 0,
    tSize: {x:32, y:32},
    mapSize: {x:64, y:64},
    tilesets: [],
    view: {x:0, y:0, w:512, h:512},
    parseMap: function parseMap(tilesJSON) {
        this.mapData = JSON.parse(tilesJSON);
        this.xCount = this.mapData.width;
        this.yCount = this.mapData.height;
        this.tSize.x = this.mapData.tilewidth;
        this.tSize.y = this.mapData.tileheight;
        this.mapSize.x = this.xCount*this.tSize.x;
        this.mapSize.y = this.yCount*this.tSize.y;

        for (let i=0; i<this.mapData.tilesets.length; i++){
            var img = new Image();
            img.onload = function (){
                mapManager.imgLoadCount++;
                if (mapManager.imgLoadCount === mapManager.mapData.tilesets.length){
                    mapManager.imgLoaded = true;
                }
            };
            img.src = this.mapData.tilesets[i].image;
            var t = this.mapData.tilesets[i];
            var ts = {
                firstgid: t.firstgid,
                image: img,
                name: t.name,
                xCount: Math.floor(t.imagewidth / mapManager.tSize.x),
                yCount: Math.floor(t.imageheight / mapManager.tSize.y)
            };
            this.tilesets.push(ts);
        }
        this.jsonLoaded = true;
    },
    imgLoadCount: 0,
    imgLoaded: false,
    jsonLoaded: false,
    draw: function draw(ctx) {
        if(!mapManager.imgLoaded || !mapManager.jsonLoaded){
            setTimeout(function () {
                mapManager.draw(ctx);
            }, 100);
        } else {
            if (this.tLayer === null)
                for (let id = 0; id<this.mapData.layers.length; id++) {
                    var layer = this.mapData.layers[id];
                    if (layer.type === 'tilelayer') {
                        this.tLayer = layer;
                        break;
                    }
                }
            for (let i=0; i<this.tLayer.data.length; i++){
                if(this.tLayer.data[i]!==0){
                    var tile = this.getTile(this.tLayer.data[i]);
                    var pX = (i % this.xCount)*this.tSize.x;
                    var pY = Math.floor(i / this.xCount)*this.tSize.y;

                    if (!this.isVisible(pX, pY, this.tSize.x, this.tSize.y))
                        continue;
                    pX -= this.view.x;
                    pY -= this.view.y;
                    ctx.drawImage(tile.img, tile.px, tile.py, this.tSize.x, this.tSize.y, pX, pY, this.tSize.x, this.tSize.y)
                }
            }
        }
    },
    getTile: function getTile(tileIndex) {
        var tile = {
            img: null,
            px:0, py:0,
        };
        var tileset = this.getTileset(tileIndex);
        tile.img = tileset.image;
        var id = tileIndex - tileset.firstgid;
        var x = id % tileset.xCount;
        var y = Math.floor(id / tileset.xCount);
        tile.px = x * mapManager.tSize.x;
        tile.py = y * mapManager.tSize.y;
        return tile;
    },
    getTileset: function getTileset(tileIndex) {
        for (let i = mapManager.tilesets.length - 1; i>=0; i--){
            if (mapManager.tilesets[i].firstgid <= tileIndex){
                return mapManager.tilesets[i];
            }
        }
        return null;
    },
    isVisible: function isVisible(x, y, width, height) {
        return !(x + width < this.view.x || y + height < this.view.y || x > this.view.x + this.view.w || y > this.view.h + this.view.y);
    },
    loadMap: function loadMap() {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200){
                mapManager.parseMap(request.responseText);
            }
        };
        request.open("GET", '/map', true);
        request.send();
    },
    parseEntities: function () {
        if (!mapManager.imgLoaded || !mapManager.jsonLoaded) {
            setTimeout(function () {
                mapManager.parseEntities();
            }, 100);
        } else {
            try {
                for (let i=0; i<10; i++) {
                    var obj = Object.create(game.factory['Gold']);
                    var guard = Object.create(game.factory['Skeleton']);
                    obj.name = 'gold'+i;
                    obj.pos_x = Math.floor(Math.random()*64)*32;
                    obj.pos_y = Math.floor(Math.random()*64)*32;
                    obj.size_x = 32;
                    obj.size_y = 32;
                    obj.guard = guard;

                    guard.name = 'guard'+i;
                    guard.pos_x = obj.pos_x + 32;
                    guard.pos_y = obj.pos_y;
                    guard.size_x = 32;
                    guard.size_y = 32;

                    game.entities.push(guard);
                    game.entities.push(obj);
                }
            } catch (ex) {
            }

        }
    },

    centerAt: function (x, y) {
        if (x < this.view.w / 2) {
            this.view.x = 0;
        } else if (x > this.mapSize.x - this.view.w / 2) {
            this.view.x = this.mapSize.x - this.view.w;
        } else {
            this.view.x = x - (this.view.w / 2);
        }

        if (y < this.view.h / 3) {
            this.view.y = 0;
        } else if (y > this.mapSize.y - this.view.h) {
            this.view.y = this.mapSize.y - this.view.h;
        } else {
            this.view.y = y - (this.view.h / 3);
        }
    }
};
