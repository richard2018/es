Function.prototype.extends = function(obj)
{
	for(var each in obj)
	{
		this.prototype[each] = obj[each];	
		//�Զ�������Խ���һ��һ�ĸ��ƣ�������������������������
		//�������֡��̳С���ʽһ�㲻�Ƽ�ʹ��
	}
}
var Point2D = function(){
	//����
}
Point2D.extends(new Point())
{
	//����
}
