function MyClass()
{
	//以下这种定义方式确保了this指针不被篡改
	var $point = this;
	$point.foo = function()
	{
		//因为函数构造的时候会产生一个“闭包”
		//所以在调用方法时，实际的$point总是指向构造时的“this”
		//这样就避免了“this”的错误
		return $point.foo.apply($point, arguments)
	}
}
