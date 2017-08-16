function BaseClass()
{
	var _A = function()
	{
		return "a from base & ";
	}
	this.methodB = function()
	{
		return _A() + "b";
	}
	this.methodA = _A;
}
function DerivedClass()
{
	this.methodA = function()
	{
		return "a from drived & ";	
}
}
DerivedClass.prototype = new BaseClass();
DerivedClass.prototype.base = new BaseClass();
var b = new BaseClass();
var d = new DerivedClass();
alert(b.methodB());
alert(d.methodB());
alert(d.base.methodB());
