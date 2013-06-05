ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
//	'impact.debug.debug',
//	'plugins.perpixel',
	'game.entities.galaxy',
	'impact.font',
	'game.entities.player',
	'game.entities.pointer',
	'game.entities.star',
	'game.entities.enemy',
	'game.entities.dummy',
	'game.entities.doubleshot',
	'game.entities.spreadshot',
	'game.entities.apshot',
	'game.entities.explosion',
	'game.entities.enemyshot',
	'game.entities.menu',
	'impact.formation'
	
)
.defines(function(){

MyGame = ig.Game.extend({

	
	// Load a font
	font: new ig.Font( 'media/font.png' ),
	normalShot: null,
	spreadShot: null,
	apShot: null,
	liveImage: null,
	enemyTimer: null,
	starTimer: null,
	playTime: new ig.Timer(0),
	bHud: null,
	BH: null,
	menu: true,
	mute: true,
	formTimer: null,
	form: null,
	weaponType: 0,
	pause: false,
	pointer: null,
	nShot: null,
	sShot: null,
	aShot: null,
	liveStock: null,
	lives: 3,
	score: 0,
	menus: [],
	
	init: function() {
	
		ig.music.add('media/sounds/messinchip2.*');
		ig.music.volume = 0.5;
		ig.music.play();

		ig.input.bind( ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind( ig.KEY.UP_ARROW, 'up');
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind(ig.KEY.SPACE, 'fire');
		ig.input.bind(ig.KEY.ENTER, 'start');
		ig.input.bind(ig.KEY.M, 'mute');
		ig.input.bind(ig.KEY.P, 'pause');
		ig.input.bind(ig.KEY.MOUSE1, 'click');

		this.pointer = this.spawnEntity(Pointer, 0, 0);
		
		this.bHud = new ig.AnimationSheet('media/hud.png', 50, 50);
		this.hud = new ig.Animation(ig.game.bHud, 0.1, [0]);
		this.normalShot = new ig.AnimationSheet('media/Nbullet.png', 50, 50);
		this.spreadShot = new ig.AnimationSheet('media/Sbullet.png', 50, 50);
		this.apShot = new ig.AnimationSheet('media/APbullet.png', 50, 50);
		this.liveImage = new ig.AnimationSheet('media/space mailman-icon.png', 24, 24);
		this.nShot = new ig.Animation(ig.game.normalShot, 0.1, [0]);
		this.sShot = new ig.Animation(ig.game.spreadShot, 0.1, [0]);
		this.aShot = new ig.Animation(ig.game.apShot, 0.1, [0]);
		this.liveStock = new ig.Animation(ig.game.liveImage, 0.1, [0]);

	// 
		
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
			
		this.keyboardCheck();

		if(!this.menu){
			if(!this.pause){
				this.score += ig.system.tick * 10;
				this.weaponSwitch();
				this.spawnStar();

				if(this.form.update(this.formTimer.delta())) this.formTimer.set(0);	

			}
		}
	},

	keyboardCheck: function(){
		if(ig.input.pressed('mute')){
			if(this.mute){
				this.mute = false;
				ig.music.pause();
			}else{
				this.mute = true;
				ig.music.play();
			}
		}
		
		var ent;
		if(ig.input.pressed('pause') && !this.menu){
			if(this.pause)
				ig.main.unpause(this);		
			else
				ig.main.pauseNow(this);
		}
		

		if(ig.input.pressed('start')){
			if(this.menu){
				this.menu = false;
				this.start();
			}
		}
	},

	spawnStar: function(){
		if(this.starTimer.delta() > 0){
			ig.game.sortEntitiesDeferred();
			var x = Math.ceil(Math.floor(Math.random()*ig.system.width));
			this.spawnEntity(Star, x, -48);
			
			this.starTimer.set(.08);	
		}
	},

	weaponSwitch: function(){
		if(ig.input.pressed('up')){
			this.weaponType += 1;
			if(this.weaponType == 3){
				this.weaponType = 0;
			}
		}

		if(ig.input.pressed('down')){
			this.weaponType -= 1;
			if(this.weaponType == -1){
				this.weaponType = 2;
			}
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		

		// Add your own drawing code here
		
		if(this.menu){
			
			this.font.draw('Press Enter to Start', ig.system.width/2 , ig.system.height/2, ig.Font.ALIGN.CENTER);
			if(this.score > 0 )
				this.font.draw('Score: ' + ~~this.score, ig.system.width/2, ig.system.height/2 + 22, ig.Font.ALIGN.CENTER);
		}

		if(!this.menu){
			this.font.draw("Score: ", ig.system.width-50, 0, ig.Font.ALIGN.RIGHT);
			this.font.draw(~~this.score + "", ig.system.width,0, ig.Font.ALIGN.RIGHT);
			this.showInstructions(this.pause);
			this.showHUD(!this.pause);				
		}


	},

	showHUD: function(notInMenu){
		if(notInMenu){
			var y;
			var x = ig.system.width - 30;
			for(var i = this.lives; i > 0; i--){
				y = ig.system.height - 30;
				this.liveStock.draw(x, y);
				x -= 24;

			}

			this.hud.draw(0, ig.system.height*(11/12));

			switch(ig.game.weaponType){
			case 0: 
				this.nShot.draw(0, ig.system.height * (11/12));
				break;
			case 1: 
				this.sShot.draw(0, ig.system.height * (11/12));
				break;
			case 2:
				this.aShot.draw(0, ig.system.height * (11/12));
				break;
		
			}
		}
	},

	showInstructions: function( isPaused ){
		if(isPaused){
			var y = 0;
			var x = 4;
			this.font.draw( "Instructions" , x, y , ig.Font.ALIGN.LEFT );
			this.font.draw( "------------" , x, y + 11, ig.Font.ALIGN.LEFT );
			this.font.draw( "Spacebar: Fire" , x, y + 33 , ig.Font.ALIGN.LEFT );
			this.font.draw( "Left/Right Arrows: Move Left/Right" , x, y + 55 , ig.Font.ALIGN.LEFT );
			this.font.draw( "Up/Down Arrows: Switch Weapon" , x, y + 77 , ig.Font.ALIGN.LEFT );
			this.font.draw( "P: Pause" , x, y + 99 , ig.Font.ALIGN.LEFT );
			this.font.draw( 'M: Mute Sound', x, y + 121, ig.Font.ALIGN.LEFT);
		}
	},

	start: function(){
		for ( var i = 0; i < this.entities.length; i++ ){
			this.entities[i].kill();
		}
		this.menu = false;
		this.weaponType = 0;
		this.lives = 3;
		this.score = 0;

		this.pointer = this.spawnEntity(Pointer, 0, 0);


		var random = Math.ceil((Math.random()*3 + 1.75));
		this.enemyTimer = new ig.Timer(random);
		
		random = (Math.random()*1.8 + .25);
		this.starTimer = new ig.Timer(random);
		this.formTimer = new ig.Timer(8);


		this.player = this.spawnEntity(EntityPlayer, ig.system.width/2 - 24, ig.system.height * (4/5));

		this.form = new ig.Formation();

		

		ig.main.unpause(this);		
		
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 480, 600, 1 );

ig.main.unpause = function(game) {
	ig.system.clock.pause = false;
	ig.system.pause = false;
	game.pause=false;
	for(var k = 0; k < game.menus.length; k++){
		game.menus[k].kill();
	}
	game.menus = [];
	// console.log("unpaused");
	for(var j=0; j < game.entities.length; j++){
		ent = game.entities[j];
		ent.pause=false;
		game.formTimer.pause = false;
		if(ent.currentAnim != null){
			ent.currentAnim.timer.pause = false;
			ent.currentAnim.alpha = 1;
		}
	}
};

ig.main.pauseNow = function(game){
	game.pause=true;
	ig.system.clock.pause = true;
	game.formTimer.pause = true;
	ig.system.pause = true;
	// console.log("Paused");

	var wMid = ig.system.width/2;
	var hMid = ig.system.height/2 - 22*2;

	var settings;

	for(var l = 0; l < 3; l++){
		var height = hMid + l * 22;
		settings = {option: l, ref: {x:wMid, y: height }};
		game.menus.push(game.spawnEntity(Menu, 0, height, settings));
	}

	for(var i=0; i < game.entities.length; i++){
		ent = game.entities[i];
		ent.pause=true;
		
		if(ent.currentAnim != null){
			ent.currentAnim.timer.pause = true;
			ent.currentAnim.alpha = 0.45;
		}
	}

};

ig.main.restart = function(game){

};


});
