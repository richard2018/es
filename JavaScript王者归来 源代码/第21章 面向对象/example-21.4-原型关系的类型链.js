function ClassA()
{
	//……
}
ClassA.prototype = new Object();  //这个可以省略
function ClassB()
{
	//……
}
ClassB.prototype = new ClassA(); //ClassB以ClassA的对象为原型
function ClassC()
{
	//……
}
ClassC.prototype = new ClassB(); //ClassC以ClassB的对象为原型

var obj = new ClassC();
alert(obj instanceof ClassC);  //true
alert(obj instanceof ClassB);  //true
alert(obj instanceof ClassA);  //true
alert(obj instanceof Object);  //true
