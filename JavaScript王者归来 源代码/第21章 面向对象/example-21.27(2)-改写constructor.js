function ArrayList()
{
	var ret = new Array();
	ret.constructor = this.constructor;
		//改写constructor可以让实例继承的对象的constructor属性值显得稍稍“正常”一些
	return ret;
}
