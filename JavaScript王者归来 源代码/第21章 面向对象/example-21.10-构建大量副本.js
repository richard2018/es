var p1 = new Point(1,2);
var points = [];
var PointPrototype = function(){};
PointPrototype.prototype = p1;
for(var i = 0; i < 10000; i++)
{
	points[i] = new PointPrototype(); 
	//由于PointPrototype的构造函数是空函数，因此它的构造要比直接构造//p1副本快得多。
}
