ig.module(
	'game.entities.enemy'
)
.requires(
	'impact.entity'
)

.defines(function(){
	


Enemy = ig.Entity.extend({
    //8 means enemy
	type: '8',
	//checkAgainst bullet
	checkAgainst: ig.Entity.TYPE.B,
	size: {x:16, y: 20},
	animSheet: new ig.AnimationSheet('media/mailbox2.png', 16, 20),
	maxVel: {x:450, y:450},
	speedF: 1,
	zigs: [],
      fnum: null,
	
//	enemyShot: [1, 0],


	init: function( x, y, settings ) {
		
		this.parent( x, y, settings );
		this.addAnim('open', 0.2, [0,1,2], true);
		this.addAnim('close', 0.1, [2,1,0], true);
		this.anims.open.flip.y = 1;
		this.anims.close.flip.y = 1;
		this.vel.y = 150 + this.speedF;
            this.fnum = settings;
		// console.log(this.vel.y);

	

	// var zags = ~~(ig.game.playTime.delta()/60);

 //        for(zags; zags > 0 ; x--){
 //        	var rand = Math.floor(Math.random() * 3);
 //        	this.zigs.push(rand);
 //        }
	
	


	},
	check: function(other){
		ig.game.spawnEntity(Explosion, this.pos.x,this.pos.y);		
		this.kill();
		ig.game.score += 20;
		if(other.currentAnim != other.anims.invince)
			other.receiveDamage(1);
	},


	update: function(){
		this.parent();
		// this.enemyShot[1] += ig.system.tick;
//		if(this.enemyShot[1] > this.enemyShot[0]){
		if(this.anims.open.loopCount){
			this.anims.open.rewind();
			this.currentAnim = this.anims.close.rewind();
			ig.game.spawnEntity(EnemyShot, this.pos.x + this.size.x/2, this.pos.y+this.size.y/2);
//			this.enemyShot[1] = 0;
		}

		if(this.anims.close.loopCount){
			this.anims.close.rewind();
			this.currentAnim = this.anims.open.rewind();

		}

		// change later to accomidate for AI
		if(this.pos.y > ig.system.height + 5){
                  //formation.updateStats();
                  //ig.Formation.stats[0] += 10;
                  ig.game.form.updateStats(this.fnum);
			this.kill();
		}

		if(this.pos.y >= -20){
			this.type = ig.Entity.TYPE.A;
		}
	}
	
	
})
});
