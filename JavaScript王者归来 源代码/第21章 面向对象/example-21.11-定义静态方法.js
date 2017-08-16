function Point(x, y)
{
	this.x = x;
	this.y = y;
}
Point.prototype.distance = function(){
	return Math.sqrt(this.x * this.x + this.y * this.y);
}
