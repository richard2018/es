//��δ����ڵ�2�µ���2.4�������Ѿ�������
(function(){

//�����ⲿ�ӿ�
//Request���Žӿڸ��ⲿ���ṩ�����ӿڣ�getParameter��getParameterValues
//�����ⲿ��JavaScript�ļ��Ϳ���ͨ������Request.getParameter()��ִ����Ӧ�Ķ���
	Request = {	getParameter:getParameter,
				getParameterValues:getParameterValues
			  }; 
	//�õ�URL��Ĳ���������URL��http://abc?x=1&y=2
//��ôgetParameter("x") �õ�1
	function getParameter(paraName,wnd)
	{
		//������ṩwnd��������Ĭ��Ϊ��ǰ����
		if(wnd == null) wnd = self;

		//�õ���ַ���ϡ�?����ߵ��ַ���
		var paraStr = wnd.location.search.slice(1);

		//���ݡ�&�����ŷָ��ַ���
		var paraList = paraStr.split(/\&/g);
		for (var i = 0; i < paraList.length; i++)
		{
			//��������ʽ�ж��ַ����Ƿ��ǡ�paraName=value���ĸ�ʽ
			//����������ʽ�������ڱ���ĵ�10�����н���ϸ������
			var pattern = new RegExp("^"+paraName+"[?=\\=]","g");
			if(pattern.test(paraList[i]))
			{
				//���ǣ��򷵻ؽ�����value������
				return decodeURIComponent(paraList[i].split(/\=/g)[1]);
			}
		}
	}

//����ж���ظ���paraName������£����������������һ������������ֵ������
//����http://abc?x=1&x=2&x=3 ��getParameterValues("x")�õ�[1,2,3]
	function getParameterValues(paraName,wnd)
	{
		if(wnd == null) wnd = self;
		var paraStr = wnd.location.search.slice(1);
		var paraList = paraStr.split(/\&/g);

		var values = new Array();
		for (var i = 0; i < paraList.length; i++)
		{
			//������жϲ��ֺ�getParameter()��������
			//�����Ƕ�Ӧÿһ��paramName��value�ж��
			var pattern = new RegExp("^"+paraName+"[?=\\=]","g");
			if(pattern.test(paraList[i]))
			{
				//����������paramName=value�Ľ����value������һ��������
				values.push(decodeURIComponent(paraList[i].split(/\=/g)[1]));
			}
		}
		//���ؽ������
		return values;
	}
})();
