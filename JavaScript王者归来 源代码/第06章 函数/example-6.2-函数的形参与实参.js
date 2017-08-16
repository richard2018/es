function max(x, y){
	return x > y ? x : y;
}
Vector2D.cross = function(v1, v2)
{
	return v1.x * v2.y ¨C v1.y * v2.x;
}
var square = new Function("n", "return n*n");
