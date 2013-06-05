ig.module( 
	'game.entities.galaxy' 
)
.requires(
	'impact.entity'
)
.defines(function(){


Galaxy = ig.Entity.extend({
	
	animSheet: new ig.AnimationSheet( 'media/galaxy64.png', 64, 64 ),
	maxVel: {x: 150, y: 250},
	zIndex: -1,
	
	init: function( x, y, settings ) {
		this.addAnim( 'idle', 0.1, [0] );
		this.parent( x, y, settings );
		
		var vel = Math.floor((Math.random()*35 + 15));
		
		this.vel.y  = vel;
		
	},
	
	
	update: function() {
		this.parent();

		if(this.pos.y > ig.system.height + 64){
			this.kill();
		}
		
		this.currentAnim.angle += ig.system.tick/1.4;

	}
})
});
