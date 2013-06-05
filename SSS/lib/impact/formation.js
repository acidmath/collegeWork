//place this line in the main update
//
//if(this.form.update(this.formTimer.delta())) this.formTimer.set(0);


ig.module(
	'impact.formation'
)
.requires(
	'impact.entity',
	  'impact.game',
	'impact.impact'
)
.defines(function(){


ig.Formation = ig.Class.extend({

	formTimer: null,
	enemies: 0,
	enemyArr: null,
	  dummy: null,
	form: 1,
	  delta: 0,
	  pi: 3.14,
	  totalEnemyArr: [],
	  pause: false,
      stats: [],
	  
	  init: function()
	  {            
			this.enemies = 0;
			this.enemyArr = [];
                  this.stats[3] = 100;
                  this.stats[1] = 100;
                  this.stats[2] = 100;
	  },

	  spawnFormation: function(f)
	  {
            var xInit = Math.random()*(ig.system.width-100) + 100;

            if(f==3)
            {
                  var s = ig.game.spawnEntity(Enemy, xInit, -48, 3);
                        this.enemyArr[0] = s;
                  this.totalEnemyArr = [];
                  for(var i = 0; i<this.enemies; i++)
                  {
                        var t = ig.game.spawnEntity(Enemy, xInit, -48, 3);
                        this.enemyArr[i] = t;
                        this.totalEnemyArr.push(t);
                  }
            }
		if(f==1)
            {
                  var t = ig.game.spawnEntity(Enemy, xInit, -48, 1);
                  this.enemyArr[0] = t;
                  this.totalEnemyArr = [];
                  for(var i = 1; i<this.enemies; i++)
                  {
                        var s = ig.game.spawnEntity(Enemy, xInit, -48*i, 1);
                        this.enemyArr[i] = s;
                        this.totalEnemyArr.push(s);
                  }
            }

            if(f==2){
				var t = ig.game.spawnEntity(Enemy, xInit, -64-196, 2);
				this.dummy = ig.game.spawnEntity(Dummy, xInit, -64-196, 2);
				this.enemyArr[0] = t;
				this.totalEnemyArr = [];
				for(var i=1; i<this.enemies; i++){
	//                        console.log("spawning at: (" + 24*Math.cos(i*2*this.pi/this.enemies)+ig.system.width/2 + ", " + 24*Math.sin(i*2*this.pi/this.enemies) + ")\n");
					var s = ig.game.spawnEntity(Enemy, xInit, 24*Math.sin(i*2*this.pi/this.enemies-196), 2);
					this.enemyArr[i] = s;
					this.totalEnemyArr.push(s);
				}
			}
			
	  },

      updateStats: function(f)
{
            this.stats[f] += 2;
            console.log("formation " + f + " increased to " + this.stats[f]);
},


	update: function(delta){
		if(!ig.game.pause){
		if(delta > 5)
		{
                  if(this.enemies<10) this.enemies += 1;

                  var f = Math.random()*(this.stats[3]+this.stats[1] + this.stats[2]);

                  if(f<this.stats[3]) this.form = 3;
                  else if(f<(this.stats[1] + this.stats[3])) this.form = 1;
                  else this.form = 2;

                  console.log("f: " + f + " this.form: " + this.form + "\n");

                  this.spawnFormation(this.form);

			return true;
		}
		else{

                  if(this.form==3)  
                  {
                        for(var i = 0; i<this.enemies; i++)
                        {
                              if(this.enemyArr[i].pos.y < ig.system.height/2)
                              {
                                    this.enemyArr[i].pos.x = this.enemyArr[i].pos.x + ((i-this.enemies/2)/(this.enemies*200)*ig.system.width);
                              }
                              else
                              {
                                    this.enemyArr[i].pos.x = this.enemyArr[i].pos.x - ((i-this.enemies/2)/(this.enemies*200)*ig.system.width);
                              }
                        }
                  }

							  
			if(this.form==1)
			{
				for(var i=0; i<this.enemies; i++)
				{
					this.enemyArr[i].pos.x = this.enemyArr[i].pos.x + (this.enemyArr[i].vel.y/50)*Math.cos(delta*2.094*4);
					this.enemyArr[i].pos.y = this.enemyArr[i].pos.y + (this.enemyArr[i].vel.y/50)*Math.sin(delta*2.094*4);
				}
			}
			 
			if(this.form==2)
			{
				for(var i=1; i<this.enemies; i++)
				{
/*
					this.enemyArr[i].pos.x = this.enemyArr[0].pos.x + 48*Math.cos(delta*5 + i*(2*this.pi/(this.enemies-1)));
					this.enemyArr[i].pos.y = this.enemyArr[0].pos.y + 48*Math.sin(delta*5 + i*(2*this.pi/(this.enemies-1)));
*/
					this.enemyArr[i].pos.x = this.dummy.pos.x + 48*Math.cos(delta*5 + i*(2*this.pi/(this.enemies-1)));
					this.enemyArr[i].pos.y = this.dummy.pos.y + 48*Math.sin(delta*5 + i*(2*this.pi/(this.enemies-1)));
				  
				}
			}
			
			
			
				  return false;
		}
		}else{
		return false;
		}
		

	  }
});

});
