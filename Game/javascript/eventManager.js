var eventManager = {
  preventOtherActions: false,
  action: [],
  setup: function () {
      document.body.addEventListener("keydown", this.onKeyDown);
  },
  onKeyDown: function (event) {
      if(event.keyCode === 37 && !this.preventOtherActions){
          this.preventOtherActions = true;
          if (physicsManager.isAcsessible(game.player1.pos_x - 32, game.player1.pos_y)) {
              if (game.player1.waypoints !== 0) {
                  game.player1.pos_x -= 32;
                  game.player1.waypoints -= 1;
              }
          }
          this.preventOtherActions = false;
      }
      if(event.keyCode === 38 && !this.preventOtherActions){
          this.preventOtherActions = true;
          if (physicsManager.isAcsessible(game.player1.pos_x, game.player1.pos_y - 32)) {
              if (game.player1.waypoints !== 0) {
                  game.player1.pos_y -= 32;
                  game.player1.waypoints -= 1;
              }
          }
          this.preventOtherActions = false;
      }
      if(event.keyCode === 39 && !this.preventOtherActions){
          this.preventOtherActions = true;
          if (physicsManager.isAcsessible(game.player1.pos_x + 32, game.player1.pos_y)) {
              if (game.player1.waypoints !== 0) {
                  game.player1.pos_x += 32;
                  game.player1.waypoints -= 1;
              }
          }
          this.preventOtherActions = false;
      }
      if(event.keyCode === 40 && !this.preventOtherActions){
          this.preventOtherActions = true;
          if (physicsManager.isAcsessible(game.player1.pos_x, game.player1.pos_y + 32)) {
              if (game.player1.waypoints !== 0) {
                  game.player1.pos_y += 32;
                  game.player1.waypoints -= 1;
              }
          }
          this.preventOtherActions = false;
      }
      if(event.keyCode === 13 && !this.preventOtherActions){
          if (game.player1 === game.player_1){
              game.player1 = game.player_2;
          } else { game.player1 = game.player_1}
          game.player1.waypoints = 16;
      }
  }

};