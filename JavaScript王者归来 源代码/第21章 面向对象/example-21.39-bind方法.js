Function.prototype.bind = function(owner)  //Prototype框架中实现过类似的bind方法
{
	//原理同上一个例子一样，只是换了一种形式
	var $fun = this;
	return function(){
		$fun.apply(owner, arguments);
	}
}

//构造一个foo对象
var foo = {};

//bind(foo)将foo.bar方法永久地绑定为foo的对象方法，甚至将它赋给别的类型作为对象方法
//也不会改变this引用的值
foo.bar = (function(){
	alert(this == foo);
}).bind(foo);	
//用setTimeout“异步”调用foo.bar方法，在一般情况下，this的值本应该是window
//但bind过之后，“this == foo”得到true
setTimeout(foo.bar, 100);
