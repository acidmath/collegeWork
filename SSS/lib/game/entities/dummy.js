ig.module(
	'game.entities.dummy'
)
.requires(
	'impact.entity',
      'impact.formation'
)

.defines(function(){

Dummy = ig.Entity.extend({
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	size: {x:16, y: 20},	
	maxVel: {x:450, y:450},
	speedF: 1,


	init: function( x, y, settings ) {
      this.parent(x,y,settings);
      this.vel.y = 151;
},
      update: function()
{
      this.parent();
}
});
});