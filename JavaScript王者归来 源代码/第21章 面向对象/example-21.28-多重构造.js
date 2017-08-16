//定义一个Point类型
function Point(dimension)
{
	this.dimension = dimension || 0;
	this.isRegular = function()
	{
		this.dimension > 0;
	}
}
//定义一个Point2D类型，继承Point类型
function Point2D(x, y)
{
	Point.call(this, 2);
	var ponds = [];
	this.ponds.push(x, y);
	this.x = {
		valueOf:function(){return this.ponds[0]},
		toString:function(){return this.ponds[0]}
};
	this.y = {
		valueOf:function(){return this.ponds[1]},
		toString:function(){return this.ponds[1]}
};
}	
//构造ColorPoint2D时将执行Point2D.call()，这导致Point2D的构造，而Pointer2D构造时
//再执行Point的构造，这种从对象自身的构造开始依次执行父类构造函数的过程
//就叫做“多重构造”
function ColorPoint2D(x, y, c)
{
	Point2D.call(this, x, y);
	this.color = c;
};
