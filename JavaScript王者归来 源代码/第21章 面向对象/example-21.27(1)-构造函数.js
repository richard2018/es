function Point(x, y)
{
	this.x = x || 0;
	this.y = y || 0;
}
var p = new Point();
alert(p.constructor);
