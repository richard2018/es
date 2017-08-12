//定义Point2D类型
function Point2D(x, y)
{
	//_init是Point2D类型的构造函数
	function _init(x, y)
	{
		this.x = x;
		this.y = y;
	}

	if(x != null && y != null)
		_init.call(this, x, y);
}
//这个例子里将构造函数抽象成了_init()方法，这样更加灵活便于控制

//定义ColorPoint2D类型，继承Point2D类型
function ColorPoint2D(x, y, c)
{
	//_init是ColorPoint2D类型的构造函数
	function _init(x, y, c)
	{
		Point2D.call(this, x, y);
		this.color = c;
	}
	if(x != null && y != null && c!= null)
		_init.call(this, x, y, c);
}
