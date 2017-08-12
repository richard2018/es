//这个函数在例22.11、22.15见到过类似的
function $package(name)
{
	//拆分名字空间域字符串
	var domains = name.split(".");
	var cur_domain = window;

	//循环遍历每一级子域
	for(var i = 0; i < domains.length; i++)
	{
		var domain = domains[i];
		//如果该域的空间未被创建
		if(typeof(cur_domain[domain]) == "undefined")
			//创建域
			cur_domain[domain] = {};
		//设置当前域为此次循环的域
		cur_domain = cur_domain[domain];
	}

	return cur_domain;
}
