function Point(x, y)
{
	if(x) this.x = x;
	if(y) this.y = y;
}
Point.prototype.x = 0;
Point.prototype.y = 0;

function LineSegment(p1, p2)
{
	//˽�г�Ա
	var m_firstPoint = p1;
	var m_lastPoint = p2;
	var m_width = {
		valueOf : function(){return Math.abs(p1.x - p2.x)},
		toString : function(){return Math.abs(p1.x - p2.x)}
	}
	var m_height = {
		valueOf : function(){return Math.abs(p1.y - p2.y)},
		toString : function(){return Math.abs(p1.y - p2.y)}
	}
	
//getter
	this.getFirstPoint = function()
	{
		return m_firstPoint;
	}
	this.getLastPoint = function()
	{
		return m_lastPoint;
	}

	//��������
	this.length = {
		valueOf : function(){return Math.sqrt(m_width*m_width + m_height*m_height)},
		toString : function(){return Math.sqrt(m_width*m_width + m_height*m_height)}
	}
}
//����p1��p2����Point����
var p1 = new Point;
var p2 = new Point(2,3);
//��p1��p2����line1һ��LineSegment����
var line1 = new LineSegment(p1, p2);
//ȡ��line1�ĵ�һ���˵㣨��p1��
var lp = line1.getFirstPoint();
//��С�ĸ�д��lp��ֵ���ƻ���lp��ԭʼֵ���Ҳ��ɻָ�
//��Ϊ��ʱp1��x���Է����˱仯
lp.x = 100;  
alert(line1.getFirstPoint().x);
alert(line1.length); //����line1.lenght�������˸ı�

��this.getFirstPoint()��дΪ����������ӣ�
this.getFirstPoint = function()
{
	function GETTER(){};	//����һ����ʱ����
	//��m_firstPoint��Ϊ������͵�ԭ��
	GETTER.prototype = m_firstPoint;
	//����һ��������͵Ķ��󷵻�
	return new GETTER();
}
