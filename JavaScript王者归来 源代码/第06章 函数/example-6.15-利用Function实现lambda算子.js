lambda = function(args, code)
{
	//如果給出的code参数是数组对象
	if(code instanceof Array)
	{
		//用Function构造一个新的函数
		var fun = new Function(args, 
			"for(var i = 0; i < arguments.length; i++) arguments[i] = LispScript.Run(arguments[i]);return LispScript.Run("+code.toEvalString()+");");
		
		//从函数信息保存的堆栈中弹出函数全名
		var globalFuncName = __funList.pop();
		//将全名赋给fun_funName
		fun._funName = globalFuncName;
		//如果这个全名不为空，用self[globalFuncName]引用之前构造的函数
		if(globalFuncName != null)
			self[globalFuncName] = fun;

		return fun;
	}

	return [];
};
