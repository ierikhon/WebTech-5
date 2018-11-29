var physicsManager = {
   unacsessibleTileIDs: [],
   claimedPositions: [],
   initiate: function () {
       let buffer_obj = {};
       for (let i=0; i<mapManager.tLayer.data.length; i++){
           buffer_obj[mapManager.tLayer.data[i]] = mapManager.tLayer.data[i];
       }
       for (let i in buffer_obj){
           if (!mapManager.isAcsess(buffer_obj[i])){
               this.unacsessibleTileIDs.push(i);
           }
       }
   },
   isAcsessible: function (x, y) {
       let tileID = mapManager.tLayer.data[y/32*mapManager.xCount + x/32];
       let here = true;
       for (let id of this.unacsessibleTileIDs){
           if (id == tileID){
               here = false;
               break;
           }
       }
       return here;
   },
    claimPosition: function(x, y){
       this.claimedPositions.push({x:x, y:y});
    },
    isClaimed: function (x, y) {
        let isHere = false;
        for (pos of this.claimedPositions){
            if (pos.x == x & pos.y == y){
                isHere = true;
                break;
            }
        }
        return isHere;
    },
    unclaimPosition: function (x, y) {
        for (let index in this.claimedPositions){
            if (this.claimedPositions[index].x === x && this.claimedPositions[index].y === y){
                this.claimedPositions.splice(index, 1);
            }
        }
    }

};