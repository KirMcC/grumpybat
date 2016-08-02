Game = {};

var w = 600 ;
var h = 540;
var gasp;
var box;
var trueScore = 1;

function rand(num){ 
    
    return Math.floor(Math.random() * num) 
};

Game.Boot = function (game) {};
Game.Boot.prototype ={
    
    preload: function() {
        this.load.image('preloaderBar', 'assets/loading-bar.png');
    },
    
     create: function() {
         
        this.state.start('Load'); 
         
     } 
    
};



Game.Load =function (game) {};

Game.Load.prototype ={
    
    preload: function() { 
        
        //SETS A PRELOADER AT BEGINNING OF GAME
        game.stage.backgroundColor = '#b4e1f8';
	    label = game.add.text(w/2, h/2, 'loading...', { font: '30px Arial', fill: '#fff'     });
		label.anchor.setTo(0.5, 0.5);
        
        this.preloadBar = this.add.sprite((w-300)/2,
            (h+35)/2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
   
    // Load the bird sprite
    game.load.image('logo', 'assets/intro-design.png');
    game.load.image('sky', 'assets/background.png');
    //game.load.image('bird', 'assets/bird.png');
    game.load.spritesheet('char', 'assets/char2.png', 73, 55, 8);
    game.load.image('dead', 'assets/deadchar.png');
    game.load.image('pipe', 'assets/stones.png');
    game.load.image('gasp', 'assets/gasp.png');
    game.load.spritesheet('sound', 'assets/sound.png',28, 25);
    game.load.spritesheet('gameover', 'assets/game-over.png', 70, 90);

        
        
    game.load.audio('jump', 'assets/jump.wav');
    game.load.audio('thud', 'assets/thud.wav');
    game.load.audio('backmus', 'assets/background2.mp3');
        
    game.load.spritesheet('shadow', 'assets/shadow.png', 130, 15);
   
},
    
    create: function() {
        
        game.state.start('Intro');
        
    }

    
    
};