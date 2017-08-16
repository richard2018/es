//Iterator 迭代器原型
function Iterator(){}
Iterator.prototype.next = $abstract;
Iterator.prototype.hasNext = $abstract;
Iterator.prototype.toArray = function(){
	var _set = [this.item()];
	while(this.hasNext())
	{
		_set.push(this.item());
		this.next();
	}
	return _set;
}	

Array.prototype.iterator = function(){
	var _it = new Iterator();
	var _cursor = 0;
	var _arr = this;
	/我们自己实现Array的next和hasNext方法
	_it.next = function(){
		_cursor++;
		return _it;
	}
	_it.item = function(){
		return _arr[_cursor];
	}
	_it.hasNext = function(){
		return _cursor < _arr.length - 1;
	}
	return _it;
}
//于是我们可以用迭代器遍历数组了，就象下面这样：
var arr = [1,2,3,4];
var it = arr.iterator();
while(it.hasNext())
{
	alert(it.item());
	it.next();
}
