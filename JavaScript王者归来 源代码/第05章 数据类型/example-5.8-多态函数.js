//$�������м�����;��
//ֱ�ӵ��÷���һ���յ�function(){}
//��������length���ԵĶ���ת��Ϊһ��ArrayList
//��ʵ����Iteratorԭ�͵Ķ���ת��Ϊһ��ArrayList
//�����ַ���,ת���Ը��ַ���ΪID��DOM���󣬴�����������ֱ�ӷ���
//�������ַ���������ַ���ת��Ϊ�Ѹ��ַ���ΪID��DOM�����������󲻱䣬�����б�
function $(){
	var _args = Array.apply([], arguments);
	if(_args.length == 0)
		return $void;  //�����������������һ���պ���
//ͨ����arguments.length���Կ���֪��������ʵ�θ�����������½��л�����ϸ����
	if(_args.length == 1)
	{
		var obj = $id(_args[0]) || _args[0];
		if(obj instanceof Iterator) //���������һ������������תΪ����
			return obj.toArray();
		if(obj.length)  //��������ǳ��Ȳ�Ϊ1�ļ���
		{
			var _set = [];
			for(var i = 0; i < obj.length; i++)
				_set.push(obj[i]);
			return _set;  //תΪArrayList
		}
		return obj;
	}
	return _args.each(function(obj){
		return $id(obj) || obj;         //����ж���������ֱ����$id
	});
}
function $id(id){
	return document.getElementById(id);  //����id����DOM����
}
