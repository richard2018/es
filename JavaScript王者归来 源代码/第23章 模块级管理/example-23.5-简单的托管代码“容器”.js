//这个函数的作用是动态引入外部的js文件
function import(jsFile){
	//处理.js扩展名
	jsFile = /\.js$/.test(jsFile) ? jsFile : jsFile + ".js";
	//在文档中创建script标记
	var s = document.createElement("script");
	//设置src为jsFile表示的脚本路径
	s.src = jsFile;
var h = document.getElementsByTagName("head");
//将这个创建的script标记的DOM元素添加到head标记的内容中去
//从而实现脚本的载入
	h && h[0].appendChild(s);
}

//根据用户角色不同，选择载入不同的控制脚本
if(user == "admin")
	import("admin.js");   //引入外部文件
else
	import("user.js");
