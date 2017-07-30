class Animal {
	constructor(){
		this.type = 'animal'
	}
	says(say){
		console.log(this.type + ' says 1 ' + say)
		var self = this;
		setTimeout(function(){
			console.log(this.type + ' says timeout ' + say)
		}, 1000)
		
		setTimeout(function(){
				console.log(self.type + ' says timeout2 ' + say)
		}.bind(this), 1000)
	}
}

var animal = new Animal()
animal.says('hi')  //undefined says hi