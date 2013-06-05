ig.module(
	'game.entities.explosion'
)
.requires(
	'impact.entity'
)

.defines(function(){
	Explosion = ig.Entity.extend({
		animSheet: new ig.AnimationSheet('media/explosion.png', 32, 32),
		explodeSound: new ig.Sound('media/sounds/bomb.*'),
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.explodeSound.volume = 0.2;
			this.addAnim('idle', 0.13, [1,2,3,4,5,6,7], true);

			if(ig.game.mute) 
				this.explodeSound.play();
			
		},
		update: function(){
			this.parent();

			if (this.currentAnim.loopCount)
				this.kill();

		}

	})

	});
