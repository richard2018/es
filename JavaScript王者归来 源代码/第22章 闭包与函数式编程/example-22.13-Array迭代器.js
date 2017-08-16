//这个数组方法遍历数组的每一个成员并用一个函数去调用这个成员，计算结果
//把结果放入一个数组中返回
Array.prototype.each = function(closure)
{
	var ret = [];
	for(var i = 0; i  this.length; i++)
	{
		ret.push(closure(this[i]));
	}
	return ret;
}
