IPoint = {x:undefined, y:undefined}
var Point = {}
Point.protoype = new IPoint();
var p = new Point();
for(var each in p)
{
	alert(each); //����������x��y����ΪPointʵ����IPoint�ӿ�
}
