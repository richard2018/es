function Point()
{
	//����
}
//Point�̳�Object�����ͨ������ʡ�ԣ���Ϊ�Զ������͵�ȱʡԭ��ΪObject
Point.prototype = new Object();
function Point2D()
{
	//����
}
//Point2D�̳�Point
Point2D.prototype = new Point();
function ColorPoint2D()
{
	//����
}
//ColorPoint2D�ּ̳�Point2D
ColorPoint2D.prototype = new Point2D();
