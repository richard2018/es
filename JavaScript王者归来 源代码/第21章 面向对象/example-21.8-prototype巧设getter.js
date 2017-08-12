function Point(x, y)
{
	if(x) this.x = x;
	if(y) this.y = y;
}
Point.prototype.x = 0;
Point.prototype.y = 0;

function LineSegment(p1, p2)
{
	//私有成员
	var m_firstPoint = p1;
	var m_lastPoint = p2;
	var m_width = {
		valueOf : function(){return Math.abs(p1.x - p2.x)},
		toString : function(){return Math.abs(p1.x - p2.x)}
	}
	var m_height = {
		valueOf : function(){return Math.abs(p1.y - p2.y)},
		toString : function(){return Math.abs(p1.y - p2.y)}
	}
	
//getter
	this.getFirstPoint = function()
	{
		return m_firstPoint;
	}
	this.getLastPoint = function()
	{
		return m_lastPoint;
	}

	//公有属性
	this.length = {
		valueOf : function(){return Math.sqrt(m_width*m_width + m_height*m_height)},
		toString : function(){return Math.sqrt(m_width*m_width + m_height*m_height)}
	}
}
//构造p1、p2两个Point对象
var p1 = new Point;
var p2 = new Point(2,3);
//用p1、p2构造line1一个LineSegment对象
var line1 = new LineSegment(p1, p2);
//取得line1的第一个端点（即p1）
var lp = line1.getFirstPoint();
//不小心改写了lp的值，破坏了lp的原始值而且不可恢复
//因为此时p1的x属性发生了变化
lp.x = 100;  
alert(line1.getFirstPoint().x);
alert(line1.length); //就连line1.lenght都发生了改变

将this.getFirstPoint()改写为下面这个样子：
this.getFirstPoint = function()
{
	function GETTER(){};	//定义一个临时类型
	//将m_firstPoint设为这个类型的原型
	GETTER.prototype = m_firstPoint;
	//构造一个这个类型的对象返回
	return new GETTER();
}
