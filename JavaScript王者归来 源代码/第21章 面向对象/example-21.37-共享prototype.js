//定义一个共享的原型对象
var abPrototype = {
	a:null, b:null, add:function(){return this.a + this.b}
}
//定义strCls类型
var strCls = function(a,b){
	this.a = a;
	this.b = b;
}
//利用原型，值得推荐的方式
strCls.prototype = new abPrototype();
//定义numCls类型
var numCls = function(a,b){
	this.a = a;
	this.b = b;
}
//numCls和strCls都以abPrototype为原型
numCls.prototype = new abPrototype();

//构造strCls对象
var strcls = new strCls(1, 2);
//构造numCls对象
var numcls = new numCls('a', 'b');
//执行原型方法add()
strcls.add();
numcls.add();
