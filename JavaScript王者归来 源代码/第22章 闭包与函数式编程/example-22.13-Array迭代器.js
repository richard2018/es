//������鷽�����������ÿһ����Ա����һ������ȥ���������Ա��������
//�ѽ������һ�������з���
Array.prototype.each = function(closure)
{
	var ret = [];
	for(var i = 0; i  this.length; i++)
	{
		ret.push(closure(this[i]));
	}
	return ret;
}
