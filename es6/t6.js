// es5的写法
//let cat = 'ken'
//let dog = 'lili'
//let zoo = {cat1: cat, dog1: dog}
//console.log(zoo)  //Object {cat: "ken", dog: "lili"}

// es6的写法
let cat = 'ken'
let dog = 'lili'
let zoo = {cat, dog}
console.log(zoo)  //Object {cat: "ken", dog: "lili"}

let dog2 = {type1: 'animal', many: 2}
let { type1, many} = dog2
console.log(type1, many)   //animal 2


function animals(...types){
	console.log(types)
}
animals('cat', 'dog', 'fish') //["cat", "dog", "fish"]
animals();


var name = 'zach'

//while (true) {
//var name = 'obama'
//console.log(name) //obama
//break
//}
function t1() {
	var name = 'obama'
	console.log("t1 : " + name) //obama
}
t1();
console.log("log: " + name) //obama