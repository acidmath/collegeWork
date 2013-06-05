ig.module(
	'game.entities.spreadshot'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
SpreadShot = ig.Entity.extend({
	size: {x:2, y:4},
	maxVel: {x:200, y:400},
	animSheet: new ig.AnimationSheet('media/spreadbullet.png', 2, 4),
	collision: ig.Entity.COLLIDES.ACTIVE,
	type: ig.Entity.TYPE.B,
	health: 1,
	flip: 0,
	sound: new ig.Sound('media/sounds/dsSound.*'),


	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim('idle', 0.2, [0]);
	},

	update: function(){
		this.parent();
		if(this.pos.y < 5){
			this.kill();
		}
	}
        
});

SpreadShotLeft = ig.Entity.extend({
	size: {x:2, y:4},
	maxVel: {x:200, y:400},
	animSheet: new ig.AnimationSheet('media/spreadbullet.png', 2, 4),
	collision: ig.Entity.COLLIDES.ACTIVE,
	type: ig.Entity.TYPE.B,
	health: 1,
	flip: 0,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim('idle', 0.2, [0]);
		this.currentAnim.flip.x = this.flip;
		this.vel.y=-500;
                this.vel.x=-100;
	},	
	update: function(){
		this.parent();
		if(this.pos.y < 5){
			this.kill();
		}
	}
        
});

SpreadShotRight = ig.Entity.extend({
	size: {x:2, y:4},
	maxVel: {x:200, y:400},
	animSheet: new ig.AnimationSheet('media/spreadbullet.png', 2, 4),
	collision: ig.Entity.COLLIDES.ACTIVE,
	type: ig.Entity.TYPE.B,
	health: 1,
	flip: 0,
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim('idle', 0.2, [0]);
		this.currentAnim.flip.x = this.flip;
		this.vel.y=-500;
                this.vel.x=100;
	},
	update: function(){
		this.parent();
		if(this.pos.y < 5){
			this.kill();
		}
	}
        
});
});
