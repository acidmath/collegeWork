ig.module(
	'game.entities.pointer'
)
.requires(
	'impact.entity'
)

.defines(function(){

Pointer = ig.Entity.extend({
	type: 4,
	size: {x:1, y: 1},	


	init: function( x, y, settings ) {
	this.parent(x,y,settings);
},
	update: function(){
	this.pos.x = ig.input.mouse.x;
	this.pos.y = ig.input.mouse.y;
//	console.log(ig.input.mouse.x);
	this.parent();
}
});
});
