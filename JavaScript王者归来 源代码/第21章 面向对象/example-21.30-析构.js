var Disposable = {
	dispose : function()
	{
		//���������ն����ÿһ�����ԣ�ע������ݹ���dispose()
		for(var each in this)
		{
			if(this[each] instanceof Disposable)
			{
				this[each].dispose();
			}
			this[each] = null;
		}
	}
}
function Point()
{
	����
}
//ͨ��ԭ�͡��̳С��ķ�ʽ��Point���͵Ķ���dispose()����
Point.prototype = Disposable;
