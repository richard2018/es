function MyDate()
{
	this.base = Date;
	this.base.apply(this, arguments);
}
var date = new MyDate();
alert(date.toGMTString); 
//���Ķ����ĳЩ�������ܱ�����̳У�ԭ���Ǻ��Ķ��󲢲��������Զ����һ���������
//�ڹ��캯������и�ֵ���ʼ������
