//这段代码我们在例21.24已经见到过了
__namespace__({core:{data:{xml:
(function(){
	//闭包中的私有成员xmlDomFactory
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
	//注意下面的return语句，我们用闭包将整个代码包含进来，只把需要开放的接口
//通过return语句返回给使用者
	return {xmlDomFactory:xmlDomFactory,XmlDomFactory:xmlDomFactory,XMLDomFactory:xmlDomFactory}
})()
}}})
