function Point()
{
	//……
}
//Point继承Object，这个通常可以省略，因为自定义类型的缺省原型为Object
Point.prototype = new Object();
function Point2D()
{
	//……
}
//Point2D继承Point
Point2D.prototype = new Point();
function ColorPoint2D()
{
	//……
}
//ColorPoint2D又继承Point2D
ColorPoint2D.prototype = new Point2D();
