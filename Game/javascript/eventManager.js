var eventManager = {
  action: [],
  setup: function () {
      document.body.addEventListener("keydown", this.onKeyDown);
  },
  onKeyDown: function (event) {
      if(event.keyCode === 37){
          if (game.player1.waypoints !== 0){
              game.player1.pos_x -= 32;
              game.player1.waypoints -= 1;
          }

      }
      if(event.keyCode === 38){
          if (game.player1.waypoints !== 0){
              game.player1.pos_y -= 32;
              game.player1.waypoints -= 1;
          }
      }
      if(event.keyCode === 39){
          if (game.player1.waypoints !== 0){
              game.player1.pos_x += 32;
              game.player1.waypoints -= 1;
          }
      }
      if(event.keyCode === 40){
          if (game.player1.waypoints !== 0){
              game.player1.pos_y += 32;
              game.player1.waypoints -= 1;
          }
      }
      if(event.keyCode === 13){
          if (game.player1 === game.player_1)
            game.player1 = game.player_2;
          else game.player1 = game.player_1;
          game.player1.waypoints = 16;
      }
  }

};