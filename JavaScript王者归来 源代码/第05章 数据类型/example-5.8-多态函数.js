//$函数，有几个用途：
//直接调用返回一个空的function(){}
//将包含有length属性的对象转换为一个ArrayList
//把实现了Iterator原型的对象转换为一个ArrayList
//传入字符串,转换以该字符串为ID的DOM对象，传入其它对象直接返回
//传入多个字符串或对象，字符串转换为已该字符串为ID的DOM对象，其他对象不变，返回列表
function $(){
	var _args = Array.apply([], arguments);
	if(_args.length == 0)
		return $void;  //如果不带参数，返回一个空函数
//通过读arguments.length属性可以知道函数的实参个数，后面的章节中会有详细讨论
	if(_args.length == 1)
	{
		var obj = $id(_args[0]) || _args[0];
		if(obj instanceof Iterator) //如果对象是一个迭代器对象，转为数组
			return obj.toArray();
		if(obj.length)  //如果对象是长度不为1的集合
		{
			var _set = [];
			for(var i = 0; i < obj.length; i++)
				_set.push(obj[i]);
			return _set;  //转为ArrayList
		}
		return obj;
	}
	return _args.each(function(obj){
		return $id(obj) || obj;         //如果有多个参数，分别调用$id
	});
}
function $id(id){
	return document.getElementById(id);  //根据id返回DOM对象
}
