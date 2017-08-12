function MyDate()
{
	this.base = Date;
	this.base.apply(this, arguments);
}
var date = new MyDate();
alert(date.toGMTString); 
//核心对象的某些方法不能被构造继承，原因是核心对象并不像我们自定义的一般对象那样
//在构造函数里进行赋值或初始化操作
