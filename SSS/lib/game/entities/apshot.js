ig.module(
	'game.entities.apshot'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
ApShot = ig.Entity.extend({
	size: {x:8, y:12},
	maxVel: {x:200, y:400},
	animSheet: new ig.AnimationSheet('media/ap-bullet.png', 8, 12),
	type: ig.Entity.TYPE.B,
	health: 100,
	flip: 0,
	sound: new ig.Sound('media/sounds/dsSound.*'),



	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim('idle', 0.2, [0]);
		this.currentAnim.flip.x = this.flip;
		this.vel.y=-400;
	},
	update: function(){
		this.parent();
		if(this.pos.y < 5){
			this.kill();
		}
	}
});
});
