//定义Base类型
function Base()
{
	//Base类型的公有方法Foo()
	this.Foo = function()
	{
		return 10;
	}
	//Base类型的公有方法Bar()
	this.Bar = function()
	{
		alert(this.Foo() + 10);
	}
}
//定义Drivide类型，继承Base类型
function Drivide()
{
	//Drivide类型的公有方法Foo()
	this.Foo = function()
	{
		return 20;
	}
}
//原型继承
Drivide.prototype = new Base();
//构造一个Drivide对象
var d = new Drivide();
d.Bar(); //得到30而不是20，d.Bar()的时候因为“this”引用的是Drivide类型的对象d
//所以d.Bar()执行时调用的this.Foo()是Drivide类型中定义的Foo()，尽管Bar()在Drivide中
//并没有被重载
