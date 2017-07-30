//var fact = (func, n) => ( n==0 ? 1 :  n * func(func, n-1) )
//console.info(fact(fact, 5))

var v = ( (func, x) => func(func, x) ) (  //函数体
	(func, n) => ( n==0 ? 1 :  n * func(func, n-1) ), //第一个调用参数
	5 //第二调用参数
);
console.info(v)


function sum(x, total) {
	if (x === 1) {
		return x + total;
	}
	return sum(x - 1, x + total);
}
var t1 = 2;
var s1 = sum(3,t1);
console.info("s1 : " + s1);