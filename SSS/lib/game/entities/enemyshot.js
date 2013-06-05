ig.module(
	'game.entities.enemyshot'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EnemyShot = ig.Entity.extend({
	type: ig.Entity.TYPE.A,
	size: {x:9, y:14},
	maxVel: {x:200, y:400},
	animSheet: new ig.AnimationSheet('media/letter2.png', 9, 14),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim('idle', 0.2, [0]);
		this.vel.y=300;
	},

	update: function(){
		this.parent();
		if(this.pos.y > ig.system.height + 5){
			this.kill();
		}
	}
});
});
