//Iterator ������ԭ��
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
	/�����Լ�ʵ��Array��next��hasNext����
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
//�������ǿ����õ��������������ˣ���������������
var arr = [1,2,3,4];
var it = arr.iterator();
while(it.hasNext())
{
	alert(it.item());
	it.next();
}
