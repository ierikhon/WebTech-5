var eventManager = {
  preventOtherActions: false,
  action: [],
  players: [],
  setup: function () {
      document.body.addEventListener("keydown", this.onKeyDown);
  },
    fight: function (pos_x, pos_y, army) {
        let guard = game.getguard(pos_x, pos_y);
        $('#modal').show();
        $('#left').val('Player Army: ' + army);
        $('#right').val('Enemy Army: ' + guard.ammount);
    },
    onKeyDown: function (event) {
      if(event.keyCode === 37 && !this.preventOtherActions){
          this.preventOtherActions = true;
          if (physicsManager.isAcsessible(eventManager.players[eventManager.actual].pos_x - 32, eventManager.players[eventManager.actual].pos_y)) {
              if (eventManager.players[eventManager.actual].waypoints !== 0) {
                  eventManager.players[eventManager.actual].pos_x -= 32;
                  eventManager.players[eventManager.actual].waypoints -= 1;
                  if (physicsManager.isClaimed(eventManager.players[eventManager.actual].pos_x, eventManager.players[eventManager.actual].pos_y)){
                      eventManager.fight(eventManager.players[eventManager.actual].pos_x, eventManager.players[eventManager.actual].pos_y, eventManager.players[eventManager.actual].army);
                  }
              }
          }
          this.preventOtherActions = false;
      }
      if(event.keyCode === 38 && !this.preventOtherActions){
          this.preventOtherActions = true;
          if (physicsManager.isAcsessible(eventManager.players[eventManager.actual].pos_x, eventManager.players[eventManager.actual].pos_y - 32)) {
              if (eventManager.players[eventManager.actual].waypoints !== 0) {
                  eventManager.players[eventManager.actual].pos_y -= 32;
                  eventManager.players[eventManager.actual].waypoints -= 1;
                  if (physicsManager.isClaimed(eventManager.players[eventManager.actual].pos_x, eventManager.players[eventManager.actual].pos_y)){
                      eventManager.fight(eventManager.players[eventManager.actual].pos_x, eventManager.players[eventManager.actual].pos_y, eventManager.players[eventManager.actual].army);
                  }
              }
          }
          this.preventOtherActions = false;
      }
      if(event.keyCode === 39 && !this.preventOtherActions){
          this.preventOtherActions = true;
          if (physicsManager.isAcsessible(eventManager.players[eventManager.actual].pos_x + 32, eventManager.players[eventManager.actual].pos_y)) {
              if (eventManager.players[eventManager.actual].waypoints !== 0) {
                  eventManager.players[eventManager.actual].pos_x += 32;
                  eventManager.players[eventManager.actual].waypoints -= 1;
                  if (physicsManager.isClaimed(eventManager.players[eventManager.actual].pos_x, eventManager.players[eventManager.actual].pos_y)){
                      eventManager.fight(eventManager.players[eventManager.actual].pos_x, eventManager.players[eventManager.actual].pos_y, eventManager.players[eventManager.actual].army);
                  }
              }
          }
          this.preventOtherActions = false;
      }
      if(event.keyCode === 40 && !this.preventOtherActions){
          this.preventOtherActions = true;
          if (physicsManager.isAcsessible(eventManager.players[eventManager.actual].pos_x, eventManager.players[eventManager.actual].pos_y + 32)) {
              if (eventManager.players[eventManager.actual].waypoints !== 0) {
                  eventManager.players[eventManager.actual].pos_y += 32;
                  eventManager.players[eventManager.actual].waypoints -= 1;
                  if (physicsManager.isClaimed(eventManager.players[eventManager.actual].pos_x, eventManager.players[eventManager.actual].pos_y)){
                      eventManager.fight(eventManager.players[eventManager.actual].pos_x, eventManager.players[eventManager.actual].pos_y, eventManager.players[eventManager.actual].army);
                  }
              }
          }
          this.preventOtherActions = false;
      }
  }
};

function endTurn() {
        if (eventManager.actual === 0){
            eventManager.actual = 1;
        } else {
            eventManager.actual = 0;
        }
        eventManager.players[eventManager.actual].waypoints = 16;
}