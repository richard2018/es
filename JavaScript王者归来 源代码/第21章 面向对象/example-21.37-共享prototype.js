//����һ�������ԭ�Ͷ���
var abPrototype = {
	a:null, b:null, add:function(){return this.a + this.b}
}
//����strCls����
var strCls = function(a,b){
	this.a = a;
	this.b = b;
}
//����ԭ�ͣ�ֵ���Ƽ��ķ�ʽ
strCls.prototype = new abPrototype();
//����numCls����
var numCls = function(a,b){
	this.a = a;
	this.b = b;
}
//numCls��strCls����abPrototypeΪԭ��
numCls.prototype = new abPrototype();

//����strCls����
var strcls = new strCls(1, 2);
//����numCls����
var numcls = new numCls('a', 'b');
//ִ��ԭ�ͷ���add()
strcls.add();
numcls.add();
