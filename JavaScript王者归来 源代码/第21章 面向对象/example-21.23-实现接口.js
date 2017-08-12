IPoint = {x:undefined, y:undefined}
var Point = {}
Point.protoype = new IPoint();
var p = new Point();
for(var each in p)
{
	alert(each); //包含有属性x和y，因为Point实现了IPoint接口
}
