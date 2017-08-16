//这个例子和例22.11十分相似，实际上名字空间管理是模块管理中最重要的一个环节
//这个函数用来声明名字空间，它和例22.11的$package函数一模一样
//例如：$package("com.x51js.core");直接创建一个名为com.x51js.core的域
function $package(ns)
{
	//对ns字符串以"."把每个域分割开来
	var domains = ns.split(".");
	var domain = window;
	for(var i = 0; i < domains.length; i++)
	{
		//循环遍历每一个域
		//当该域未定义的时候，创建
		if(!domain[domains[i]])
			domain[domains[i]] = {};	
//名字空间的关键问题是避免冲突，所以只有在domain[domains[i]]不存在的情况下才
//开放新的域
		//将当前域设为此次循环的域
		domain = domain[domains[i]];
	}	
	return domain;
}
$package("cn.orenji.akira.geometry"); //创建一个新的名字空间 cn.orenji.akira.geometry
//在新的名字空间中定义Point2D类型
cn.orenji.akira.geometry = 
(function(){
function Point2D(x, y)
{
	this.x = x;
	this.y = y;
}
return {Point2D:Point2D};
})();
//用with语句访问这个名字空间
with(cn.orenji.akira.geometry)
{
	alert(Point2D);
}
