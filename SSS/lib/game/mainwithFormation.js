ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	// 'impact.debug.debug',
	'game.entities.galaxy',
	'impact.font',
	'game.entities.player',
	'game.entities.star',
	'game.entities.enemy',
	'game.entities.doubleshot',
	'game.entities.explosion'
)
.defines(function(){

MyGame = ig.Game.extend({

	
	// Load a font
	pi: 3.14159265,
	font: new ig.Font( 'media/04b03.font.png' ),
	galaxyTimer: null,
	starTimer: null,
	fps:0,
	playTime: new ig.Timer(0),
	formTimer: null,
	bHud: null,
	BH: null,
	enemies: 0,
	enemyArr: null,
	form: 1,

	init: function() {
	
//		Math.log(val)/Math.log(10)

		ig.input.bind( ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.SPACE, 'fire');
		// 24 is half of the demension of player
		this.player = this.spawnEntity(EntityPlayer, ig.system.width/2 - 24, ig.system.height * (4/5));
		
		var random = Math.ceil((Math.random()*3 + 1.75));
		this.galaxyTimer = new ig.Timer(random);
		
		random = (Math.random()*1.8 + .25);
		this.starTimer = new ig.Timer(random);
		this.formTimer = new ig.Timer(6);
		
		//this.enemy = this.spawnEntity(Enemy, 0,0);

		this.bHud = new ig.AnimationSheet('media/hud.png', 50, 50);
		this.hud = new ig.Animation(ig.game.bHud, 0.1, [0]);

	// 
		
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		ig.game.sortEntitiesDeferred();
		this.parent();
		if(this.formTimer.delta() > 4)
		{
			console.log("hey hey");			
			this.enemyArr = [];
			if(this.enemies<10&&this.form==0)
			{
				this.enemies++;
			}			
			this.form++;
			this.form = this.form%3;
			
			if(this.form==1)
			{
				
			   
				for(var i=0; i<Math.ceil(this.enemies/2); i++)
				{
					var t1  = this.spawnEntity(Enemy, ig.system.width/10 + i*48,i*48,null);
					var t2 = this.spawnEntity(Enemy, ig.system.width/10 + i*48, i*-48, null);
					this.enemyArr[i*2] = t1;
					this.enemyArr[i*2+1] = t2; 
				}
			}
			
			else if(this.form==0)
			{
				for(var i=0; i<Math.ceil(this.enemies/2); i++)
				{
					var t1 = this.spawnEntity(Enemy, ig.system.width/10+i*48, (2*i)*-20);
					var t2 = this.spawnEntity(Enemy, ig.system.width/10 + i*48, (2*i+1)*-20);
					this.enemyArr[i*2] = t1;
					this.enemyArr[i*2+1] = t2;
				}
			}
			
			else if(this.form==2)
			{
				var t = this.spawnEntity(Enemy, ig.system.width/2, -64);
				this.enemyArr[0] = t;
				for(var i=1; i<this.enemies; i++)
				{
					var t = this.spawnEntity(Enemy, 24*Math.cos(i*2*this.pi/this.enemies)+ig.system.width/2, 24*Math.sin(i*2*this.pi/this.enemies));
					this.enemyArr[i] = t;
				}
			}
			this.formTimer.set(0);
		}
		else{
			if(this.form==1)
			{
				for(var i=0; i<this.enemies+this.enemies%2; i++)
				{
					this.enemyArr[i].pos.x = this.enemyArr[i].pos.x + (this.enemyArr[i].vel.y/50)*Math.cos(this.formTimer.delta()*2.094*4);
					this.enemyArr[i].pos.y = this.enemyArr[i].pos.y + (this.enemyArr[i].vel.y/50)*Math.sin(this.formTimer.delta()*2.094*4);
				}
			}
			 
			if(this.form==2)
			{
				for(var i=1; i<this.enemies; i++)
				{
					this.enemyArr[i].pos.x = this.enemyArr[0].pos.x + 48*Math.cos(this.formTimer.delta()*5 + i*(2*this.pi/(this.enemies-1)));
					this.enemyArr[i].pos.y = this.enemyArr[0].pos.y + 48*Math.sin(this.formTimer.delta()*5 + i*(2*this.pi/(this.enemies-1)));
				}
			}
			
			/*
			if(this.form==2)
			{
				for(var i=0; i<this.enemies+this.enemies%2; i++)
				{
					;
				}
			}
			*/
		}
			
		/*
		if(this.galaxyTimer.delta() > 0){
			var x = Math.ceil(Math.floor((Math.random()*ig.system.width) - 64));
			
			var random = Math.ceil((Math.random()*3 + 7));

			var time = Math.ceil(this.playTime.delta());

			// var spdFactor = Math.log((time/60) + 1); 

			var settings = {speedF: (Math.sqrt(time) + 1)};



			this.spawnEntity(Enemy, x, -48, settings);
			this.galaxyTimer.set(random);	
		}
		*/
		
		if(this.starTimer.delta() > 0){
			var x = Math.ceil(Math.floor(Math.random()*ig.system.width));
			this.spawnEntity(Star, x, -48);
			
			this.starTimer.set(.08);	
		}
		
		this.fps = 1.0 / ig.system.tick;
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		var x = 0,
			y = 0;
		
		this.font.draw( ~~this.fps.toString() , x, y, ig.Font.ALIGN.LEFT );
		this.hud.draw(0, ig.system.height*(11/12));

	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 480, 600, 1 );

});
