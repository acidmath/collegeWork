ig.module(
		'game.entities.player'
)
.requires(
		'impact.entity'
)

.defines(function(){

EntityPlayer = ig.Entity.extend({
	 size: {x:48, y:48},
	 maxVel: {x:450, y:0},
	 animSheet: new ig.AnimationSheet('media/space mailman-transparency.png', 48, 48),
	 weapon: [.35, 0],
	 type: ig.Entity.TYPE.B,
	 checkAgainst: ig.Entity.TYPE.A,
	 invince: false,
	 
	 init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim('idle', 0.2, [0,1,2,3,2,1]);
		this.addAnim('invince', 0.1, [0, 4]);

		if(ig.game.lives < 3)
			this.currentAnim = this.anims.invince;
	 },
	 
	 
	 update: function(){
			this.parent();

			if(this.anims.invince.loopCount == 15 )
				this.currentAnim = this.anims.idle;

			this.vel.x = 0;
			this.weapon[1] += ig.system.tick;
		 
			if(ig.input.state('left')){
					if(this.pos.x > 1)
					this.vel.x -= 275
					
			}

			if(ig.input.state('right')){
				if(this.pos.x < ig.system.width - this.size.x - 1)
					this.vel.x += 275;
				 
			}

			if(ig.input.state('fire')){
				
				
				if(this.weapon[1] > this.weapon[0]){
					this.fire();
					
					this.weapon[1] = 0.0;
				 }

				
			}
			
			if(ig.input.state('sfire')){
				
				
				if(this.weapon[1] > this.weapon[0]){
					this.weapon[1] = 0.0;
					this.dshot.play();
					ig.game.spawnEntity( SpreadShotLeft,
						this.pos.x + 12,
						this.pos.y + 4, settings );
					ig.game.spawnEntity( SpreadShot,
						this.pos.x + 24,
						this.pos.y + 4, settings );
					ig.game.spawnEntity( SpreadShotRight,
						this.pos.x + 36,
						this.pos.y + 4, settings );
				 }
				
			}

				
		},
		fire: function(){
			var shot;
			switch(ig.game.weaponType){
						case 0: 
							for(var i = 0; i <= 1; i++){
								var pos = 9;
								if(i){
									pos = 36;
								}
								var settings = {flip: i};
								shot = ig.game.spawnEntity( DoubleShot,
									this.pos.x + pos,
									this.pos.y + 4, settings );
							
							}
							break;
						case 1: 
							for( var j = -1 ; j < 2; j++){
								var velX = j * 100;
								var posX = (24 + j * 12) + this.pos.x;
								var posY = this.pos.y + 4;
								var settings = {vel: {x:velX, y:-500}, pos: {x:posX, y:posY}};
								shot = ig.game.spawnEntity( SpreadShot, 0, 0, settings);
							}
							break;
						case 2:
							shot = ig.game.spawnEntity( ApShot,
									this.pos.x + 20,
									this.pos.y + 4, settings );
									break;
					
					}
			if(ig.game.mute)	shot.sound.play();
			
		},

		check: function(other){
			ig.game.spawnEntity(Explosion, this.pos.x,this.pos.y);
		if(this.currentAnim != this.anims.invince)
			this.kill();
			other.kill();
		},

		kill: function(){
			this.parent();

			ig.game.lives--;
			if(ig.game.lives > 0){
				ig.game.player = ig.game.spawnEntity(EntityPlayer, this.pos.x, this.pos.y);
			}
			else{
				ig.game.menu = true;
			}
		}

	});
	
	


	    
});
