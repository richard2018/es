class Animal {
	constructor(){
		this.type = 'animal'
	}
	says(say){
		setTimeout( () => {
			console.log(this.type + ' says ' + say)
		}, 1000)
	}
}
 var animal = new Animal()
 animal.says('hi')  //animal says hi 