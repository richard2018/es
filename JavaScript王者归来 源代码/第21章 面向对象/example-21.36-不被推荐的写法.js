function add()
{
	return this.a + this.b;
}
add.call({a:1, b:2}); //这种定义了一个函数然后作为某个具体对象方法进行调用的方式不被推荐
add.call({a:’x’, b:’y’});

function Point(x, y)
{
	this.dist = function()
	{
		return Math.sqrt(x*x + y*y);
	}
}
var p = new Point(1,2); //将p.disp()作为p2的对象方法来用，也不被推荐
var p2 = new Point(2,3);
p.dist.call(p2);
