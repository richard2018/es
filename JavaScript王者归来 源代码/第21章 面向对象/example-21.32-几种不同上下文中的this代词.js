function Foo()
{
	//���this���õĹ��캯����arguments.calle���õĶ���
	//˵����ͨ��new������ִ�еĹ��캯��
	if(this.constructor == arguments.callee)
	{
		alert("Object Created");
	}
	//���this��window����ô��ȫ�ֵ���
	else if(this == window)
	{
		alert("Normal call");
	}
	else	//��������Ϊ��������ķ���������
	{
		alert("called by "+this.constructor);
	}
}
Foo();  //ȫ�ֺ��������У�this��ֵΪwindow
Foo.call(new Object()); //��Ϊһ��Object����ĳ�Ա����������
new Foo();	//��new���������ã�ִ�ж�����
