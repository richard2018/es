var p1 = new Point(1,2);
var points = [];
var PointPrototype = function(){};
PointPrototype.prototype = p1;
for(var i = 0; i < 10000; i++)
{
	points[i] = new PointPrototype(); 
	//����PointPrototype�Ĺ��캯���ǿպ�����������Ĺ���Ҫ��ֱ�ӹ���//p1������öࡣ
}
