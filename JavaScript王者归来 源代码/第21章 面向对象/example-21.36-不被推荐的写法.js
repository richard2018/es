function add()
{
	return this.a + this.b;
}
add.call({a:1, b:2}); //���ֶ�����һ������Ȼ����Ϊĳ��������󷽷����е��õķ�ʽ�����Ƽ�
add.call({a:��x��, b:��y��});

function Point(x, y)
{
	this.dist = function()
	{
		return Math.sqrt(x*x + y*y);
	}
}
var p = new Point(1,2); //��p.disp()��Ϊp2�Ķ��󷽷����ã�Ҳ�����Ƽ�
var p2 = new Point(2,3);
p.dist.call(p2);
