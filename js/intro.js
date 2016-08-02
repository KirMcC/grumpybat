Game.Intro = function (game) {};

Game.Intro.prototype = {
    
    create: function () {
     game.add.sprite(0, 0, 'sky');
    this.cursor = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //var logo = game.add.sprite(w/2, -150, 'logo');
		//logo.anchor.setTo(0.5, 0.5);
		//game.add.tween(logo).to({ y: 150 }, 1000, Phaser.Easing.Bounce.Out).start();
    
    var item;
    var shadow;
    var tween;
   
                //ADDS THE SOUND ICON IN THE MENU SCREEN, OPTION TO TURN SOUND ON OR OFF BEFORE PLAY
                this.sound_toggle = this.game.add.button(w-70, 50, 'sound', this.toggle_sound, this);
		        this.sound_toggle.alpha = 0;
        		game.add.tween(this.sound_toggle).delay(500).to({ alpha: 1}, 500).start();
                this.sound_toggle.input.useHandCursor = true;
        
               this.music = game.add.sound('backmus'); 
    	       this.music.play('', 0, 0.2, true);
        
              
                


        shadow = game.add.sprite(w/2, 340, 'shadow');

        // Set shadow's size 0 so that it'll be invisible at the beginning.
        shadow.scale.setTo(0.0, 0.0);

        // Also set the origin to the center since we don't want to
        // see the shadow scale to the left top.
        shadow.anchor.setTo(0.5, 0.5);
        game.add.tween(shadow.scale).to({x: 1.0, y: 1.0}, 2400, Phaser.Easing.Bounce.Out, true);

        // Add characters on top of shadows.
        item = game.add.sprite(w/2, -200, 'logo');

        // Set origin to the center to make the rotation look better.
        item.anchor.setTo(0.5, 0.5);

        // Add a simple bounce tween to the logos position.
        tween = game.add.tween(item).to( { y: 200 }, 2400, Phaser.Easing.Bounce.Out, true);
        
        
        
        //start animation loop for intro screen
         //  This sprite is using a texture atlas for all of its animation data
        animchar = game.add.sprite(0, 360, 'char');
        animchar.scale.setTo(1.5, 1.5);

        //  Here we add a new animation called 'run'
        //  We haven't specified any frames because it's using every frame in the texture atlas
        animchar.animations.add('run');

        //  And this starts the animation playing by using its key ("run")
        //  10 is the frame rate (10fps)
        //  true means it will loop when it finishes
        animchar.animations.play('run', 10, true);

        
        
        var label = game.add.text(w/2, h-50, 'Press the SPACE key to Jump!', 
                                  { font: '25px Arial', fill: '#fff' });
        
		label.anchor.setTo(0.5, 0.5);
		label.alpha = 0;
		game.add.tween(label).delay(500).to({ alpha: 1}, 500).start();	
},


update: function () {

    
    animchar.x += 2; //Sets the box x postion adds 2 each time

    if (animchar.x > game.world.width) //checks if box.x value is more than the canvas width
    {
        animchar.x = -50; //If true the char will restart at x -50
    }

    
   if (this.cursor.isDown)
			this.game.state.start('main');		
    
     
	
    
},
    
   toggle_sound: function(sound) {
                    if (this.sound_toggle.frame == 0) {
                        
                         this.music.pause();
                         this.sound_toggle.frame = 1
                        
                    }
                    else if(this.sound_toggle.frame == 1) {
                        
                       this.music.resume();
                    this.sound_toggle.frame = 0

                    }
                },


    
};