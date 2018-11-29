var eventManager = {
  preventOtherActions: false,
  prevPos: {},
  curPos: {},
  action: [],
  players: [],
  setup: function () {
      document.body.addEventListener("keydown", this.onKeyDown);
  },
    pvp: function (vsIndex){
      let player1 = eventManager.players[eventManager.actual];
      let player2 = eventManager.players[vsIndex];

      let losses = player2.army;
      eventManager.outcome = losses;
      eventManager.income = parseInt(player2.gold);
      if (losses >= player1.army)
          losses = 'EVERYTHING';
      else losses += ' of your units';

      $('#modal_pvp').show();
      $('#4').text('against Player ' + vsIndex + ' for ' + eventManager.income + ' gold and glory!');
      $('#5').text('You may loose ' + losses);
      $('#left2').val('Player Army: ' + player1.army);
      $('#right2').val('Enemy Army: ' + player2.army);
    },
    fight: function (pos_x, pos_y, army) {
        loadSound('/data/Amb.mp3');
        eventManager.curPos.x = pos_x;
        eventManager.curPos.y = pos_y;
        eventManager.guard = game.getguard(pos_x, pos_y);
        eventManager.treasure = game.gettreasure(pos_x, pos_y);
        let losses = Math.floor(eventManager.guard.ammount * Math.round(Math.random() + 1));
        eventManager.outcome = losses;
        eventManager.income = parseInt(eventManager.treasure.ammount);
        if (losses >= eventManager.players[eventManager.actual].army)
            losses = 'EVERYTHING';
        else losses += ' of your units';
        $('#modal').show();
        $('#1').text('against ' + eventManager.guard.name + ' for ' + eventManager.treasure.ammount + ' gold');
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
                  eventManager.checkForPvp();
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
                  eventManager.checkForPvp();
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
                  eventManager.checkForPvp();
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
                  eventManager.checkForPvp();
              }
          }
          this.preventOtherActions = false;
      }
  },
  checkForPvp: function () {
      let check = physicsManager.isOtherPlayerPos(eventManager.players[eventManager.actual].pos_x, eventManager.players[eventManager.actual].pos_y)
      if (check !== null){
          eventManager.versus = check;
          eventManager.pvp(check);
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
        eventManager.players[eventManager.actual].waypoints = 24;
}

function run() {
    eventManager.players[eventManager.actual].pos_x = eventManager.prevPos.x;
    eventManager.players[eventManager.actual].pos_y = eventManager.prevPos.y;
    $('#modal').hide();
    $('#modal_pvp').hide();
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

function attack_pvp() {
    eventManager.players[eventManager.actual].army -= eventManager.outcome;
    eventManager.players[eventManager.actual].gold += eventManager.income;
    eventManager.players[eventManager.actual].pos_x = eventManager.curPos.x;
    eventManager.players[eventManager.actual].pos_y = eventManager.curPos.y;
    $('#modal_pvp').hide();

    $('#modal_end').show();
    if (eventManager.players[eventManager.actual].army <= 0) {
        $('#3').text('Player ' + eventManager.actual + ' defeated!');
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200){
                let records_data = JSON.parse(request.responseText);
                if (records_data.army < eventManager.players[eventManager.versus].army)
                    records_data.army = eventManager.players[eventManager.versus].army;
                if (records_data.gold < eventManager.players[eventManager.versus].gold)
                    records_data.gold = eventManager.players[eventManager.versus].gold;
                $('#rec').text('Max army: ' + records_data.army + '     Max gold: ' + records_data.gold);
                $.ajax({
                    url: '/set',
                    method: 'PUT',
                    data: records_data
                });
            }
        };
        request.open("GET", '/data/records.json', true);
        request.send();
    } else
    {
        $('#3').text('Player' + eventManager.versus + ' defeated!');
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200){
                let records_data = JSON.parse(request.responseText);
                if (records_data.army < eventManager.players[eventManager.actual].army)
                    records_data.army = eventManager.players[eventManager.actual].army;
                if (records_data.gold < eventManager.players[eventManager.actual].gold)
                    records_data.gold = eventManager.players[eventManager.actual].gold;
                $('#rec').text('Max army: ' + records_data.army + '     Max gold: ' + records_data.gold);
                $.ajax({
                    url: '/set',
                    method: 'PUT',
                    data: records_data
                });
            }
        };
        request.open("GET", '/data/records.json', true);
        request.send();
    }


}

function gameover() {
    location.reload();
}
