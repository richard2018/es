//����һ��Point����
function Point(dimension)
{
	this.dimension = dimension || 0;
	this.isRegular = function()
	{
		this.dimension > 0;
	}
}
//����һ��Point2D���ͣ��̳�Point����
function Point2D(x, y)
{
	Point.call(this, 2);
	var ponds = [];
	this.ponds.push(x, y);
	this.x = {
		valueOf:function(){return this.ponds[0]},
		toString:function(){return this.ponds[0]}
};
	this.y = {
		valueOf:function(){return this.ponds[1]},
		toString:function(){return this.ponds[1]}
};
}	
//����ColorPoint2Dʱ��ִ��Point2D.call()���⵼��Point2D�Ĺ��죬��Pointer2D����ʱ
//��ִ��Point�Ĺ��죬���ִӶ�������Ĺ��쿪ʼ����ִ�и��๹�캯���Ĺ���
//�ͽ��������ع��족
function ColorPoint2D(x, y, c)
{
	Point2D.call(this, x, y);
	this.color = c;
};
