Function.prototype.extends = function(obj)
{
	for(var each in obj)
	{
		this.prototype[each] = obj[each];	
		//对对象的属性进行一对一的复制，但是它又慢又容易引起问题
		//所以这种“继承”方式一般不推荐使用
	}
}
var Point2D = function(){
	//……
}
Point2D.extends(new Point())
{
	//……
}
