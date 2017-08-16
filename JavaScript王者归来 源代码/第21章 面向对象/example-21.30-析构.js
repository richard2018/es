var Disposable = {
	dispose : function()
	{
		//遍历并回收对象的每一个属性，注意这里递归检查dispose()
		for(var each in this)
		{
			if(this[each] instanceof Disposable)
			{
				this[each].dispose();
			}
			this[each] = null;
		}
	}
}
function Point()
{
	……
}
//通过原型“继承”的方式给Point类型的对象dispose()方法
Point.prototype = Disposable;
