function ClassA()
{
	//����
}
ClassA.prototype = new Object();  //�������ʡ��
function ClassB()
{
	//����
}
ClassB.prototype = new ClassA(); //ClassB��ClassA�Ķ���Ϊԭ��
function ClassC()
{
	//����
}
ClassC.prototype = new ClassB(); //ClassC��ClassB�Ķ���Ϊԭ��

var obj = new ClassC();
alert(obj instanceof ClassC);  //true
alert(obj instanceof ClassB);  //true
alert(obj instanceof ClassA);  //true
alert(obj instanceof Object);  //true
