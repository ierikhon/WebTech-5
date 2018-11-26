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
            px:0, py:0
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
        return !(x + width < this.view.x || y + height < this.view.y || x > this.view.w || y > this.view.h);
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
    }
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
mapManager.loadMap();
mapManager.draw(ctx);




