ig.module( 
	'game.entities.star' 
)
.requires(
	'impact.entity'
)
.defines(function(){


Star = ig.Entity.extend({
	
	animSheet: new ig.AnimationSheet( 'media/Star.png', 5, 5 ),
	maxVel: {x: 150, y: 350},
	zIndex: -1,
	
	init: function( x, y, settings ) {
		this.addAnim( 'large', 0.18, [0,1] );
		this.addAnim( 'small', 0.18, [2,3] );
		this.parent( x, y, settings );
		
		var vel = Math.floor((Math.random()*70 + 130));
		
		if(vel <= 155){
			this.currentAnim = this.anims.small.rewind();
		}
		
		this.vel.y  = vel;		
		
	},
	
	
	update: function() {
		this.parent();
		
		if(this.pos.y > ig.system.height + 64){
			this.kill();
		}

	}
})
});
