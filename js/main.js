Game.Main = function(game) {};


var myLoop;


// Create our 'main' state that will contain the game
 Game.Main.prototype = {

				
    
create: function() { 
    
               
           
                // Set the physics system
                game.physics.startSystem(Phaser.Physics.ARCADE);
    

                this.jumpSound = game.add.audio('jump');
                this.thudSound = game.add.audio('thud');

                game.add.sprite(0, 0, 'sky');
                // Display the bird on the screen
                
                //Creates the char with animation
                box = game.add.sprite(200, 200, 'char');
                box.animations.add('walk');
                box.animations.play('walk', 10, true);
               
               
                
                
                //ADDING THE GAP FOR COLLISION
                gasp = game.add.sprite(200, 100, 'gasp');
                game.physics.arcade.enable(gasp);

                // Add gravity to the bird to make it fall
                game.physics.arcade.enable(box);
                box.body.gravity.y = 1000;  

                // Call the 'jump' function when the spacekey is hit
                var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                spaceKey.onDown.add(this.jump, this); 


                //CREATING THE PIPES BY CALLING THE FUNCTIOSN CREATED WITHIN THE UPDATE FUNCTION
                this.pipes = game.add.group(); // Create a group  
                this.pipes.enableBody = true;  // Add physics to the group  
                this.pipes.createMultiple(20, 'pipe'); // Create 20 pipes 

                this.timer = game.time.events.loop(1500, this.addRowOfPipes, this); 
              

                //SCORING SYSTEM
                score = 0;
                highscore = 0;
                
                this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#4c4c4c" });
    
                //Gets the current highscore in the localStorage
                this.highScore = game.add.text(395, 20, "HighScore: " + localStorage.getItem("highscore"),{ font: "30px Arial", fill: "#4c4c4c" });
    
                
                

                box.anchor.setTo(-0.2, 0.5); 


                },

update: function() {  
                // If the bird is out of the world (too high or too low), call the 'restartGame' function
                if (box.inWorld == false)
                    this.restartGame();

                //Collsion detection
                game.physics.arcade.overlap(box, this.pipes, this.hitPipe, null, this);
                game.physics.arcade.overlap(gasp, this.pipes, this.updateScore, null, this);

                //SOME ANIMATIONS GOING ON HERE FOR THE MAIN CHAR
                if (box.angle < 20)  
                box.angle += 1;
    
    
    
               
                 
},


        // Make the bird jump 
            jump: function() {  

                 if (box.alive == false)  
                return;
            
                // Add a vertical velocity to the bird
                box.body.velocity.y = -350;
                game.add.tween(box).to({angle: -20}, 100).start();
                

                this.jumpSound.play();    
            },

            // Restart the game
            restartGame: function() {  
                // Start the 'main' state, which restarts the game
                game.state.start('Over');
            },


                    addOnePipe: function(x, y) {  
                // Get the first dead pipe of our group
                var pipe = this.pipes.getFirstDead();

                // Set the new position of the pipe
                pipe.reset(x, y);

                // Add velocity to the pipe to make it move left
                pipe.body.velocity.x = -200; 

                // Kill the pipe when it's no longer visible 
                pipe.checkWorldBounds = true
            
                pipe.outOfBoundsKill = true;
                        
                
                
                
                
                    },


                addRowOfPipes: function() {
                    //makes sures the object within the hole is activated
                    gasp.alive = true;
                    
                    // Pick where the hole will be
                    var hole = gasp;
                        
                    hole = Math.floor(Math.random() * 5) + 1;

                    // Add the 6 pipes 
                    for (var i = 0; i < 8; i++)
                        if (i != hole && i != hole + 1)
                            this.addOnePipe(600, i * 60 + 10);
                        

                           
                    
                },
    
               
    
                updateScore: function () {
                    
                   
                    //disables the gasp object to stop overcounting of score
                    if (gasp.alive == false)
                    return;
                    gasp.alive = false;
                    score +=1; 
                    this.labelScore.text = score;
                    localStorage.setItem("score", score);
                    
                    if (score > localStorage.getItem("highscore")) {
                        localStorage.setItem("highscore", score);
                        this.highScore.text = "HighScore: " + localStorage.getItem("highscore");
                    
                    
                }
     
     
            
                
                    
                    
                    
                },
    
            

                hitPipe: function() {  
                // If the bird has already hit a pipe, we have nothing to do
                if (box.alive == false) {
                    
                      box.loadTexture('dead', 0);//Changes the sprite to dead char
                      return;
                    
                }
                
                  
                this.thudSound.play();    

                 
               
                // Set the alive property of the bird to false
                box.alive = false;
                
                    

                // Prevent new pipes from appearing
                game.time.events.remove(this.timer);

                // Go through all the pipes, and stop their movement
                this.pipes.forEachAlive(function(p){
                    p.body.velocity.x = 0;
                }, this);
                        
               
               
                
                
                },
     
     
     
     
        
    
               
    
    
                


};

// Add and start the 'main' state to start the game
//game.state.add('main', mainState);  
//game.state.start('main'); 