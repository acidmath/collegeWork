ig.module(
	'game.entities.menu'
)
.requires(
	'impact.entity'
)

.defines(function(){

Menu = ig.Entity.extend({
	checkAgainst: 4,
	size: {x:480, y: 20},	
	message: null,
	option: 0,
	ref: {x:0, y:0},

	init: function( x, y, settings ) {
		this.parent(x,y,settings);
		switch(this.option){
			case 0 : this.message = "Resume";
				break;
			case 1 : this.message = "Restart";
				break;
			case 2: this.message = "Main Menu";
				break;
		}

	},
	
	check: function(){
		if(ig.input.pressed('click')){
			switch(this.option){
				case 0 : ig.main.unpause(ig.game);
					break;
				case 1 : ig.game.start();
						//ig.main.unpause();
					break;
				case 2: ig.music.stop();
						ig.main.unpause(ig.game);
						ig.system.setGame(MyGame);
					break;
			}
		}
	},
	draw: function(){
		this.parent();
		ig.game.font.draw(this.message, this.ref.x, this.ref.y, ig.Font.ALIGN.CENTER);
	} 
});
});
