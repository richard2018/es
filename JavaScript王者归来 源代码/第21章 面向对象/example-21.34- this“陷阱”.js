//����Base����
function Base()
{
	//Base���͵Ĺ��з���Foo()
	this.Foo = function()
	{
		return 10;
	}
	//Base���͵Ĺ��з���Bar()
	this.Bar = function()
	{
		alert(this.Foo() + 10);
	}
}
//����Drivide���ͣ��̳�Base����
function Drivide()
{
	//Drivide���͵Ĺ��з���Foo()
	this.Foo = function()
	{
		return 20;
	}
}
//ԭ�ͼ̳�
Drivide.prototype = new Base();
//����һ��Drivide����
var d = new Drivide();
d.Bar(); //�õ�30������20��d.Bar()��ʱ����Ϊ��this�����õ���Drivide���͵Ķ���d
//����d.Bar()ִ��ʱ���õ�this.Foo()��Drivide�����ж����Foo()������Bar()��Drivide��
//��û�б�����
