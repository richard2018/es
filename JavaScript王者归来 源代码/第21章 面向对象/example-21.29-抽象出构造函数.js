//����Point2D����
function Point2D(x, y)
{
	//_init��Point2D���͵Ĺ��캯��
	function _init(x, y)
	{
		this.x = x;
		this.y = y;
	}

	if(x != null && y != null)
		_init.call(this, x, y);
}
//��������ｫ���캯���������_init()�������������������ڿ���

//����ColorPoint2D���ͣ��̳�Point2D����
function ColorPoint2D(x, y, c)
{
	//_init��ColorPoint2D���͵Ĺ��캯��
	function _init(x, y, c)
	{
		Point2D.call(this, x, y);
		this.color = c;
	}
	if(x != null && y != null && c!= null)
		_init.call(this, x, y, c);
}
