//��һ�ֹ��취��new Object
var a = new Object();
a.x = 1, a.y = 2;

//�ڶ��ֹ��취������ֱ����
var b = {x : 1, y : 2};

//�����ֹ��취����������
function Point(x, y)
{
	this.x = x;
	this.y = y;
}
var p = new Point(1,2);
