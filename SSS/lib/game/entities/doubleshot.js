ig.module(
	'game.entities.doubleshot'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
DoubleShot = ig.Entity.extend({
	size: {x:4, y:8},
	maxVel: {x:200, y:400},
	animSheet: new ig.AnimationSheet('media/bullet.png', 4, 8),
	type: ig.Entity.TYPE.B,
	health: 1,
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
