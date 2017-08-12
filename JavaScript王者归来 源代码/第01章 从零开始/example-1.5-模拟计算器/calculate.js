(function(){

	//这里是定义一个控制器，用来对外开放计算接口和拦截计算中出现的异常
	oController = {
		addNumber : function(tok){if(errorState()) return errorResult(); else return addNumber(tok)},
		addOper :  function(tok){if(errorState()) return errorResult(); else return addOper(tok)},
		doFun :  function(tok){if(errorState()) {return errorResult();} else return doFun(tok)},
		cleanError : cleanError
	}

	//用来保存记忆的变量
	var memery = 0;
	
	//这是符号对应的计算规则，这里采用一个闭包的对照表来处理
	var opMap = {
		"+":function(a,b){return b + a},	//处理加法运算的闭包
		"-":function(a,b){return b - a},	//处理减法运算的闭包
		"*":function(a,b){return b * a},	//处理乘法运算的闭包
		"/":function(a,b){return b / a},	//处理除法运算的闭包
		"=":function(a,b){return a},		//处理最终结果
		"C":init,							//清零	
		"CE":init,							//清零
		"sqrt":function(a){return Math.sqrt(a)},	//计算开方
		"1/x":function(a){return 1/a},			//计算倒数
		"%":function(a){return a/100},			//求余数
		"+/-":function(a){return -a},			//正负号
		"MS":function(a){memery = a; return a},	//记忆
		"M+":function(a){memery += a; return a},	//累加记忆
		"MR":function(a){return memery},		//从记忆中读取
		"MC":function(a){memery = 0; return a}	//清除记忆
	}
	
	//用来存储数值、操作符和输入缓存的数据结构
	var oMemery = {
		numStack : [],	//存储数值
		operStack : [],	//存储字符串
		inBuffer : ""	//输入显示缓存
	}

	//检测计算中出现的数字异常，若有，返回给控制器进行处理
	function errorState()
	{
		with(oMemery)
		{
			var n = numStack[numStack.length - 1];

			return n == Infinity || isNaN(n);
		}
	}
	//若出现异常，这个函数提供出现异常时的数值结果（数值堆栈顶的值）
	function errorResult()
	{
		with(oMemery)
		{
			return formatBuff(numStack[numStack.length - 1]);
		}
	}
	//清除异常并从错误中恢复
	function cleanError()
	{
		with(oMemery)
		{
			numStack[numStack.length - 1] = 0;
		}
	}

	function init()  //初始化
	{
		with(oMemery)
		{
			numStack.length = 0;	//清空数值堆栈
			operStack.length = 0;	//清空操作符堆栈
			numStack.push(0);	//在数值堆栈中推入一个0作为栈顶
			inBuffer = "";	//清空输入缓存
			return inBuffer;	//将清空后的缓存值（实际上是空字符串''）返回
		}
	}

	function doOper()   //计算表达式
	{
		with(oMemery)
		{
			if(operStack.length) //如果运算符堆栈中有值
			{
				try
				{
					//取得栈顶运算符对应的操作方法
					var op = opMap[operStack.pop()];	
					var args = [];

					//该方法需要提供几个操作数，可以通过检查op.length得到
					for(var i = 0; i < op.length; i++)	
					{
						//从数值堆栈中依次取相应的操作数进行处理
						args.push(numStack.pop());	
					}
					//在这里实际进行计算，并把计算结果重新压入堆栈
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
	
	//格式化显示的数值，主要是为了符合计算器的习惯，比如0显示成0.（带小数点）
	function formatBuff(buf)
	{
		if(buf == "") 
			return "0.";
		else{
			buf = parseFloat(buf);
			return /\./.test(buf) ? buf : buf + ".";
		}
	}

	function addNumber(tok)  //输入数值
	{
		with(oMemery)
		{
			try
			{
				var token;
				if(tok == "\b") //如果输入的是一个退格
					token = inBuffer.slice(0,-1);	//那么把缓存中的内容去掉一个
				else 
					token = inBuffer + tok.toString();	//否则接受新输入的数字
				//如果数值的第一位是小数点，显示的时候要补一个0
				if(token.slice(0,1) == ".") token = 0 + token;
				//判断输入接收后的结果是否满足数值的格式
				if(/^([\d]+(\.)?[\d]*)?$/.test(token))
				{
					inBuffer = token;	//如果满足，则确认接受，写入缓存
				}

				return formatBuff(inBuffer);
				
			}
			catch(ex)
			{
				alert(ex.message);
			}
		}
	}

	function addOper(tok) //输入运算符
	{
		with(oMemery)
		{
			try
			{
				//如果缓存中有数值，将它推入数值堆栈
				if(inBuffer != "")	
					numStack.push(parseFloat(inBuffer));
				//否则从操作符堆栈中将前一个输入的操作符弹出用当前操作符替代
				else
					operStack.pop();	
				var ret = doOper();	//计算表达式
				operStack.push(tok);	//将新输入的运算符推入堆栈
				inBuffer = "";	//清空输入缓存
				return formatBuff(ret);
			}
			catch(ex)
			{
				alert(ex.message);
			}
		}
	}

	function doFun(tok) //处理函数
	{
		with(oMemery)
		{
			try{
				//假如是一些函数如sqrt
				var fun = opMap[tok];
				//如果输入缓存无内容
				if(inBuffer == "") 
					inBuffer = numStack.pop(); //从数值堆栈中取数
				else
					operStack.push(tok);	//否则将函数推入操作符堆栈

				//计算函数调用结果并放入数值堆栈
				numStack.push(fun(parseFloat(inBuffer)));	

				inBuffer = ""; //清空缓存

				return formatBuff(numStack[numStack.length - 1]);
			}
			catch(ex){
				alert(ex.message);
			}
		}
	}
	
	init();	//这里执行前面定义的初始化函数
})();