ig.module(
	'impact.timer'
)
.defines(function(){

ig.Timer = ig.Class.extend({
	target: 0,
	base: 0,
	last: 0,
	pause: false,
	
	init: function( seconds ) {
		this.base = ig.Timer.time;
		this.last = ig.Timer.time;
		
		this.target = seconds || 0;
	},
	
	
	set: function( seconds ) {
		this.target = seconds || 0;
		this.base = ig.Timer.time;
	},
	
	
	reset: function() {
		this.base = ig.Timer.time;
	},
	
	
	tick: function() {
		if(!this.pause){
			var delta = ig.Timer.time - this.last;
			this.last = ig.Timer.time;
			return delta;
		}
		else{
			this.last = ig.Timer.pauseTime;
			return 0;
		}
	},
	
	
	delta: function() {
		
		return ig.Timer.time - this.base - this.target;
	}
});

ig.Timer._last = 0;
ig.Timer.time = 0;
ig.Timer.pauseTime = 0;
ig.Timer.timeScale = 1;
ig.Timer.maxStep = 0.05;

ig.Timer.step = function() {
	var current = Date.now();
	var delta = (current - ig.Timer._last) / 1000;
	var plusTime = Math.min(delta, ig.Timer.maxStep) * ig.Timer.timeScale;
	
	if(!this.pause){
		if(ig.Timer.time != ig.Timer.pauseTime)
			ig.Timer.pauseTime = ig.Timer.time;
		ig.Timer.time += plusTime;
		
	}
	ig.Timer.pauseTime += plusTime;
	
	ig.Timer._last = current;

};

});