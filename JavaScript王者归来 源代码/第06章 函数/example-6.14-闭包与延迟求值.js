//bigFunctionA��bigFunctionBģ������Ҫִ�кܶಽ��ĸ��Ӻ���
var bigFunctionA = function()
{
	var s = 0;
	for(var i = 0; i < 10000; i++)
	{
		s += i;
	}
	return s;
}

var bigFunctionB = function()
{
	var s = "a";
	for(var i = 0; i < 100; i++)
	{
		s += i;
	}
	return s;
}
//����randowThrowһ��ֻ��Ҫִ�����е�һ������
function randomThrow = function(s1, s2)
{
	if(Math.readom() > 0.5)
		return s1(); //ֻ�з�������ʱ����Ҫִ��s1
	return s2();  
}

randomThrow(bigFunctionA, bigFunctionB);
