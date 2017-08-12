(function(){

	//�����Ƕ���һ�����������������⿪�ż���ӿں����ؼ����г��ֵ��쳣
	oController = {
		addNumber : function(tok){if(errorState()) return errorResult(); else return addNumber(tok)},
		addOper :  function(tok){if(errorState()) return errorResult(); else return addOper(tok)},
		doFun :  function(tok){if(errorState()) {return errorResult();} else return doFun(tok)},
		cleanError : cleanError
	}

	//�����������ı���
	var memery = 0;
	
	//���Ƿ��Ŷ�Ӧ�ļ�������������һ���հ��Ķ��ձ�������
	var opMap = {
		"+":function(a,b){return b + a},	//����ӷ�����ıհ�
		"-":function(a,b){return b - a},	//�����������ıհ�
		"*":function(a,b){return b * a},	//����˷�����ıհ�
		"/":function(a,b){return b / a},	//�����������ıհ�
		"=":function(a,b){return a},		//�������ս��
		"C":init,							//����	
		"CE":init,							//����
		"sqrt":function(a){return Math.sqrt(a)},	//���㿪��
		"1/x":function(a){return 1/a},			//���㵹��
		"%":function(a){return a/100},			//������
		"+/-":function(a){return -a},			//������
		"MS":function(a){memery = a; return a},	//����
		"M+":function(a){memery += a; return a},	//�ۼӼ���
		"MR":function(a){return memery},		//�Ӽ����ж�ȡ
		"MC":function(a){memery = 0; return a}	//�������
	}
	
	//�����洢��ֵ�������������뻺������ݽṹ
	var oMemery = {
		numStack : [],	//�洢��ֵ
		operStack : [],	//�洢�ַ���
		inBuffer : ""	//������ʾ����
	}

	//�������г��ֵ������쳣�����У����ظ����������д���
	function errorState()
	{
		with(oMemery)
		{
			var n = numStack[numStack.length - 1];

			return n == Infinity || isNaN(n);
		}
	}
	//�������쳣����������ṩ�����쳣ʱ����ֵ�������ֵ��ջ����ֵ��
	function errorResult()
	{
		with(oMemery)
		{
			return formatBuff(numStack[numStack.length - 1]);
		}
	}
	//����쳣���Ӵ����лָ�
	function cleanError()
	{
		with(oMemery)
		{
			numStack[numStack.length - 1] = 0;
		}
	}

	function init()  //��ʼ��
	{
		with(oMemery)
		{
			numStack.length = 0;	//�����ֵ��ջ
			operStack.length = 0;	//��ղ�������ջ
			numStack.push(0);	//����ֵ��ջ������һ��0��Ϊջ��
			inBuffer = "";	//������뻺��
			return inBuffer;	//����պ�Ļ���ֵ��ʵ�����ǿ��ַ���''������
		}
	}

	function doOper()   //������ʽ
	{
		with(oMemery)
		{
			if(operStack.length) //����������ջ����ֵ
			{
				try
				{
					//ȡ��ջ���������Ӧ�Ĳ�������
					var op = opMap[operStack.pop()];	
					var args = [];

					//�÷�����Ҫ�ṩ����������������ͨ�����op.length�õ�
					for(var i = 0; i < op.length; i++)	
					{
						//����ֵ��ջ������ȡ��Ӧ�Ĳ��������д���
						args.push(numStack.pop());	
					}
					//������ʵ�ʽ��м��㣬���Ѽ���������ѹ���ջ
					numStack.push(op.apply(this, args));	
				}
				catch(ex)
				{
					alert(ex.message);
				}
			}
			return numStack[numStack.length - 1];
		}
	}
	
	//��ʽ����ʾ����ֵ����Ҫ��Ϊ�˷��ϼ�������ϰ�ߣ�����0��ʾ��0.����С���㣩
	function formatBuff(buf)
	{
		if(buf == "") 
			return "0.";
		else{
			buf = parseFloat(buf);
			return /\./.test(buf) ? buf : buf + ".";
		}
	}

	function addNumber(tok)  //������ֵ
	{
		with(oMemery)
		{
			try
			{
				var token;
				if(tok == "\b") //����������һ���˸�
					token = inBuffer.slice(0,-1);	//��ô�ѻ����е�����ȥ��һ��
				else 
					token = inBuffer + tok.toString();	//������������������
				//�����ֵ�ĵ�һλ��С���㣬��ʾ��ʱ��Ҫ��һ��0
				if(token.slice(0,1) == ".") token = 0 + token;
				//�ж�������պ�Ľ���Ƿ�������ֵ�ĸ�ʽ
				if(/^([\d]+(\.)?[\d]*)?$/.test(token))
				{
					inBuffer = token;	//������㣬��ȷ�Ͻ��ܣ�д�뻺��
				}

				return formatBuff(inBuffer);
				
			}
			catch(ex)
			{
				alert(ex.message);
			}
		}
	}

	function addOper(tok) //���������
	{
		with(oMemery)
		{
			try
			{
				//�������������ֵ������������ֵ��ջ
				if(inBuffer != "")	
					numStack.push(parseFloat(inBuffer));
				//����Ӳ�������ջ�н�ǰһ������Ĳ����������õ�ǰ���������
				else
					operStack.pop();	
				var ret = doOper();	//������ʽ
				operStack.push(tok);	//�������������������ջ
				inBuffer = "";	//������뻺��
				return formatBuff(ret);
			}
			catch(ex)
			{
				alert(ex.message);
			}
		}
	}

	function doFun(tok) //������
	{
		with(oMemery)
		{
			try{
				//������һЩ������sqrt
				var fun = opMap[tok];
				//������뻺��������
				if(inBuffer == "") 
					inBuffer = numStack.pop(); //����ֵ��ջ��ȡ��
				else
					operStack.push(tok);	//���򽫺��������������ջ

				//���㺯�����ý����������ֵ��ջ
				numStack.push(fun(parseFloat(inBuffer)));	

				inBuffer = ""; //��ջ���

				return formatBuff(numStack[numStack.length - 1]);
			}
			catch(ex){
				alert(ex.message);
			}
		}
	}
	
	init();	//����ִ��ǰ�涨��ĳ�ʼ������
})();