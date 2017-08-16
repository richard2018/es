//这个函数用来创建名字空间
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
	
$package("cn.orengi.akira.test"); //声明一个新的名字空间
//在这个名字空间上定义了一个Point类型
cn.orengi.akira.test = (function(){
	function Point(x, y)
	{
		this.x = x;
		this.y = y;
	}
	return {Point:Point};
})();

alert(cn.orengi.akira.test);

with(cn.orengi.akira.test)
{
	//在这个名字空间下对定义的Point类型生成对象
	var p = new Point(2,3);
	alert(p.x);
	alert(p.y);
}
