lambda = function(args, code)
{
	//����o����code�������������
	if(code instanceof Array)
	{
		//��Function����һ���µĺ���
		var fun = new Function(args, 
			"for(var i = 0; i < arguments.length; i++) arguments[i] = LispScript.Run(arguments[i]);return LispScript.Run("+code.toEvalString()+");");
		
		//�Ӻ�����Ϣ����Ķ�ջ�е�������ȫ��
		var globalFuncName = __funList.pop();
		//��ȫ������fun_funName
		fun._funName = globalFuncName;
		//������ȫ����Ϊ�գ���self[globalFuncName]����֮ǰ����ĺ���
		if(globalFuncName != null)
			self[globalFuncName] = fun;

		return fun;
	}

	return [];
};
