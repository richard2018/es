//�����������22.11��22.15���������Ƶ�
function $package(name)
{
	//������ֿռ����ַ���
	var domains = name.split(".");
	var cur_domain = window;

	//ѭ������ÿһ������
	for(var i = 0; i < domains.length; i++)
	{
		var domain = domains[i];
		//�������Ŀռ�δ������
		if(typeof(cur_domain[domain]) == "undefined")
			//������
			cur_domain[domain] = {};
		//���õ�ǰ��Ϊ�˴�ѭ������
		cur_domain = cur_domain[domain];
	}

	return cur_domain;
}
