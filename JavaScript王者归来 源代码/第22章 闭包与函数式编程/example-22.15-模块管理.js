//������Ӻ���22.11ʮ�����ƣ�ʵ�������ֿռ������ģ�����������Ҫ��һ������
//������������������ֿռ䣬������22.11��$package����һģһ��
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
$package("cn.orenji.akira.geometry"); //����һ���µ����ֿռ� cn.orenji.akira.geometry
//���µ����ֿռ��ж���Point2D����
cn.orenji.akira.geometry = 
(function(){
function Point2D(x, y)
{
	this.x = x;
	this.y = y;
}
return {Point2D:Point2D};
})();
//��with������������ֿռ�
with(cn.orenji.akira.geometry)
{
	alert(Point2D);
}
