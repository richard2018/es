//������������������ֿռ�
//���磺$package("com.x51js.core");ֱ�Ӵ���һ����Ϊcom.x51js.core����
function $package(ns)
{
	//��ns�ַ�����"."��ÿ����ָ��
	var domains = ns.split(".");
	var domain = window;
	for(var i = 0; i < domains.length; i++)
	{
		//ѭ������ÿһ����
		//������δ�����ʱ�򣬴���
		if(!domain[domains[i]])
			domain[domains[i]] = {};	
//���ֿռ�Ĺؼ������Ǳ����ͻ������ֻ����domain[domains[i]]�����ڵ�����²�
//�����µ���
		//����ǰ����Ϊ�˴�ѭ������
		domain = domain[domains[i]];
	}	
	return domain;
}
	
$package("cn.orengi.akira.test"); //����һ���µ����ֿռ�
//��������ֿռ��϶�����һ��Point����
cn.orengi.akira.test = (function(){
	function Point(x, y)
	{
		this.x = x;
		this.y = y;
	}
	return {Point:Point};
})();

alert(cn.orengi.akira.test);

with(cn.orengi.akira.test)
{
	//��������ֿռ��¶Զ����Point�������ɶ���
	var p = new Point(2,3);
	alert(p.x);
	alert(p.y);
}
