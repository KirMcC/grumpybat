var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameDiv', {update: this.update });

game.state.add('Boot', Game.Boot);
game.state.add('Load', Game.Load);
game.state.add('Intro', Game.Intro);
game.state.add('Over', Game.Over);
game.state.add('main', Game.Main);

game.state.start('Boot');