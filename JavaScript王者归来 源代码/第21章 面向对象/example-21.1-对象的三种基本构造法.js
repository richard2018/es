//第一种构造法：new Object
var a = new Object();
a.x = 1, a.y = 2;

//第二种构造法：对象直接量
var b = {x : 1, y : 2};

//第三种构造法：定义类型
function Point(x, y)
{
	this.x = x;
	this.y = y;
}
var p = new Point(1,2);
