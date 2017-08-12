function Foo()
{
	//如果this引用的构造函数是arguments.calle引用的对象
	//说明是通过new操作符执行的构造函数
	if(this.constructor == arguments.callee)
	{
		alert("Object Created");
	}
	//如果this是window，那么是全局调用
	else if(this == window)
	{
		alert("Normal call");
	}
	else	//否则是作为其他对象的方法来调用
	{
		alert("called by "+this.constructor);
	}
}
Foo();  //全局函数调用中，this的值为window
Foo.call(new Object()); //作为一个Object对象的成员方法来调用
new Foo();	//被new操作符调用，执行对象构造
