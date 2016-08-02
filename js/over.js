Game.Over = function (game) {};

Game.Over.prototype = {
    
  create: function () {
      
      //Display the Sky
       game.add.sprite(0, 0, 'sky');
      
      
      //GAME OVER TITLE WITH ANIMATION
     
      var item;
      for (var i = 0; i < 8; i++)
    {
        item = game.add.sprite(13 + 69 * i, -90, 'gameover', i);

        // Add a simple bounce tween to each character's position.
        game.add.tween(item).to({y: 80}, 2400, Phaser.Easing.Bounce.Out, true, 200 + 200 * i, false);
    }
      
        
      
      //Shows the current score and highscore from game.
      if(score < 1)
      {
          this.labelScore = game.add.text(190, 250, "Your Score: " + score, { font: "30px Arial", fill: "#868D8D" }); }
      
    else {  
      
      this.labelScore = game.add.text(190, 250, "Your Score: " + localStorage.getItem("score"), { font: "30px Arial", fill: "#868D8D" }); };
      
    this.labelScore.alpha = 0;

    game.add.tween(this.labelScore).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
      
      
      this.highScore = game.add.text(190, 300, "HighScore: " + localStorage.getItem("highscore"),{ font: "30px Arial", fill: "#868D8D" }); 
      
      this.highScore.alpha = 0;

      game.add.tween(this.highScore).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
      
    
      
      
      
      
      this.cursor = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      var label = game.add.text(w/2, h-100, 'Press the SPACEBAR to try again!', { font: '25px Arial', fill: '#ffffff', align: 'center' });
		label.anchor.setTo(0.5, 0.5);
		label.alpha = 0;
		game.add.tween(label).delay(500).to({ alpha: 1}, 500).start();		

		game.add.tween(label).to({ angle:1 }, 500).to({ angle:-1 }, 500).loop().start();

		this.time = this.game.time.now + 500;
      
  },
    
    
update: function() {
    //Restarts the game when spacebar is pressed
    if (this.cursor.isDown)
			this.game.state.start('main');	
    
    
}
    
    
    
    
};