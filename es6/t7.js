const find = ( f => f(f) ) ( f =>
	(next => (x, y, i = 0) =>
		( i >= x.length) ?  null :
			( x[i] == y ) ? i :
				next(x, y, i+1))((...args) =>
					(f(f))(...args)))
 
let arr = [0,1,2,3,4,5]
console.log(find(arr, 2))
console.log(find(arr, 8))

///////

MakePowerFn = (power) => (
	(base) => (Math.pow(base, power))
)
var f1 = MakePowerFn(2);
console.info("f1 : " + f1(4));


function fact(func, n) {
	return n==0 ? 1 :  n * func(func, n-1);
}
 
var v1 = fact(fact, 4); //输出120
console.info("v1 : " + v1);
