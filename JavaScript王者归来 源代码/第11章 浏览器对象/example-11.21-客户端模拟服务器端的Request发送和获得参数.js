//这段代码在第2章的例2.4中我们已经见过了
(function(){

//定义外部接口
//Request开放接口给外部，提供两个接口：getParameter和getParameterValues
//这样外部的JavaScript文件就可以通过调用Request.getParameter()来执行相应的动作
	Request = {	getParameter:getParameter,
				getParameterValues:getParameterValues
			  }; 
	//得到URL后的参数，例如URL：http://abc?x=1&y=2
//那么getParameter("x") 得到1
	function getParameter(paraName,wnd)
	{
		//如果不提供wnd参数，则默认为当前窗口
		if(wnd == null) wnd = self;

		//得到地址栏上“?”后边的字符串
		var paraStr = wnd.location.search.slice(1);

		//根据“&”符号分割字符串
		var paraList = paraStr.split(/\&/g);
		for (var i = 0; i < paraList.length; i++)
		{
			//用正则表达式判断字符串是否是“paraName=value”的格式
			//关于正则表达式的内容在本书的第10章中有较详细的讨论
			var pattern = new RegExp("^"+paraName+"[?=\\=]","g");
			if(pattern.test(paraList[i]))
			{
				//若是，则返回解码后的value的内容
				return decodeURIComponent(paraList[i].split(/\=/g)[1]);
			}
		}
	}

//如果有多个重复的paraName的情况下，下面这个方法返回一个包含了所有值的数组
//例如http://abc?x=1&x=2&x=3 ，getParameterValues("x")得到[1,2,3]
	function getParameterValues(paraName,wnd)
	{
		if(wnd == null) wnd = self;
		var paraStr = wnd.location.search.slice(1);
		var paraList = paraStr.split(/\&/g);

		var values = new Array();
		for (var i = 0; i < paraList.length; i++)
		{
			//上面的判断部分和getParameter()方法类似
			//区别是对应每一个paramName的value有多个
			var pattern = new RegExp("^"+paraName+"[?=\\=]","g");
			if(pattern.test(paraList[i]))
			{
				//将所有满足paramName=value的结果的value都放入一个数组中
				values.push(decodeURIComponent(paraList[i].split(/\=/g)[1]));
			}
		}
		//返回结果数组
		return values;
	}
})();
