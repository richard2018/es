Function.prototype.bind = function(owner)  //Prototype�����ʵ�ֹ����Ƶ�bind����
{
	//ԭ��ͬ��һ������һ����ֻ�ǻ���һ����ʽ
	var $fun = this;
	return function(){
		$fun.apply(owner, arguments);
	}
}

//����һ��foo����
var foo = {};

//bind(foo)��foo.bar�������õذ�Ϊfoo�Ķ��󷽷������������������������Ϊ���󷽷�
//Ҳ����ı�this���õ�ֵ
foo.bar = (function(){
	alert(this == foo);
}).bind(foo);	
//��setTimeout���첽������foo.bar��������һ������£�this��ֵ��Ӧ����window
//��bind��֮�󣬡�this == foo���õ�true
setTimeout(foo.bar, 100);
