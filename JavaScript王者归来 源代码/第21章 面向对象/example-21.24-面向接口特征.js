__namespace__({core:{data:{xml:
(function(){
	//封闭的函数区域
	//定义一个私有的xmlDomFactory对象
	var xmlDomFactory = {
		__doc__ : function(){
			/**
				xmlDom Factory
			**/
		},
		__name__ : "<Factory xmlDomFactory>",
		create : function()
		{
			  return $try(arguments,
				  function(){return new ActiveXObject('MSXML2.DOMDocument4.0')},
				  function(){return new ActiveXObject('MSXML2.DOMDocument3.0')}, 
				  function(){return new ActiveXObject('MSXML2.DOMDocument')},
				  function(){return new ActiveXObject('Microsoft.XmlDOM')},
				  function(){return document.implementation.createDocument("","doc",null)}
			)||null;
		}
	}
	//开放的接口对外部开放三个大小写不同的接口，但是全都指向xmlDomFactory
	//以兼容不同的标准
	return {
		xmlDomFactory:xmlDomFactory,
		XmlDomFactory:xmlDomFactory,
		XMLDomFactory:xmlDomFactory
	}
})()
}}})
