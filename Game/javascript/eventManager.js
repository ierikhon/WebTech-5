var eventManager = {
  preventOtherActions: false,
  prevPos: {},
  curPos: {},
  action: [],
  players: [],
  setup: function () {
      document.body.addEventListener("keydown", this.onKeyDown);
  },
    fight: function (pos_x, pos_y, army) {
        eventManager.curPos.x = pos_x;
        eventManager.curPos.y = pos_y;
        eventManager.guard = game.getguard(pos_x, pos_y);
        eventManager.treasure = game.gettreasure(pos_x, pos_y);
        let losses = Math.floor(eventManager.guard.ammount * Math.round(Math.random() + 1) / 4);
        eventManager.outcome = losses;
        eventManager.income = parseInt(eventManager.treasure.ammount);
        if (losses >= eventManager.players[eventManager.actual].army)
            losses = 'EVERYTHING';
        else losses += ' of your units';
        $('#modal').show();
        $('#1').text('aginst ' + eventManager.guard.name + ' for ' + eventManager.treasure.ammount + ' gold');
        $('#2').text('You may loose ' + losses);
        $('#left').val('Player Army: ' + army);
        $('#right').val('Enemy Army: ' + eventManager.guard.ammount);
    },
    onKeyDown: function (event) {
      if(event.keyCode === 37 && !this.preventOtherActions){
          this.preventOtherActions = true;
          if (physicsManager.isAcsessible(eventManager.players[eventManager.actual].pos_x - 32, eventManager.players[eventManager.actual].pos_y)) {
              if (eventManager.players[eventManager.actual].waypoints !== 0) {
                  eventManager.prevPos.x = eventManager.players[eventManager.actual].pos_x;
                  eventManager.prevPos.y = eventManager.players[eventManager.actual].pos_y;
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
                  eventManager.prevPos.x = eventManager.players[eventManager.actual].pos_x;
                  eventManager.prevPos.y = eventManager.players[eventManager.actual].pos_y;
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
                  eventManager.prevPos.x = eventManager.players[eventManager.actual].pos_x;
                  eventManager.prevPos.y = eventManager.players[eventManager.actual].pos_y;
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
                  eventManager.prevPos.x = eventManager.players[eventManager.actual].pos_x;
                  eventManager.prevPos.y = eventManager.players[eventManager.actual].pos_y;
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

function purchase(){
    let ammount = $('#pl1amm').val();
    if (ammount>0 && ammount*500 <= game.eventManager.players[game.eventManager.actual].gold){
        game.eventManager.players[game.eventManager.actual].army = parseInt(game.eventManager.players[game.eventManager.actual].army) + parseInt(ammount);
        game.eventManager.players[game.eventManager.actual].gold -= ammount*500;
        console.log('awsasfsaf0');
    }
    else { $('#Message').val('Wrong value') }
}

function endTurn() {
        if (eventManager.actual === 0){
            eventManager.actual = 1;
        } else {
            eventManager.actual = 0;
        }
        eventManager.players[eventManager.actual].waypoints = 16;
}

function run() {
    eventManager.players[eventManager.actual].pos_x = eventManager.prevPos.x;
    eventManager.players[eventManager.actual].pos_y = eventManager.prevPos.y;
    $('#modal').hide();
}

function attack() {
    eventManager.players[eventManager.actual].army -= eventManager.outcome;
    eventManager.players[eventManager.actual].gold += eventManager.income;
    eventManager.players[eventManager.actual].pos_x = eventManager.curPos.x;
    eventManager.players[eventManager.actual].pos_y = eventManager.curPos.y;
    $('#modal').hide();
    if (eventManager.players[eventManager.actual].army <= 0) {
        $('#modal_end').show();
        $('#3').text('Player ' + eventManager.actual+1 + ' defeated!')
    }
    else {
        game.eraseentity(eventManager.guard.pos_x, eventManager.guard.pos_y);
        game.eraseentity(eventManager.treasure.pos_x, eventManager.treasure.pos_y);
        game.physicsManager.unclaimPosition(eventManager.guard.pos_x, eventManager.guard.pos_y);
        game.physicsManager.unclaimPosition(eventManager.treasure.pos_x, eventManager.treasure.pos_y);
    }
}

function gameover() {
    location.reload();
}
