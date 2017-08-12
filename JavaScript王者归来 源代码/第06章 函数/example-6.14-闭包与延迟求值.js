//bigFunctionA和bigFunctionB模拟两个要执行很多步骤的复杂函数
var bigFunctionA = function()
{
	var s = 0;
	for(var i = 0; i < 10000; i++)
	{
		s += i;
	}
	return s;
}

var bigFunctionB = function()
{
	var s = "a";
	for(var i = 0; i < 100; i++)
	{
		s += i;
	}
	return s;
}
//但是randowThrow一次只需要执行其中的一个方法
function randomThrow = function(s1, s2)
{
	if(Math.readom() > 0.5)
		return s1(); //只有符合条件时才需要执行s1
	return s2();  
}

randomThrow(bigFunctionA, bigFunctionB);
