function MyClass()
{
	//�������ֶ��巽ʽȷ����thisָ�벻���۸�
	var $point = this;
	$point.foo = function()
	{
		//��Ϊ���������ʱ������һ�����հ���
		//�����ڵ��÷���ʱ��ʵ�ʵ�$point����ָ����ʱ�ġ�this��
		//�����ͱ����ˡ�this���Ĵ���
		return $point.foo.apply($point, arguments)
	}
}
