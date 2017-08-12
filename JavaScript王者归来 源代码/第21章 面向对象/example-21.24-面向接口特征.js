__namespace__({core:{data:{xml:
(function(){
	//��յĺ�������
	//����һ��˽�е�xmlDomFactory����
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
	//���ŵĽӿڶ��ⲿ����������Сд��ͬ�Ľӿڣ�����ȫ��ָ��xmlDomFactory
	//�Լ��ݲ�ͬ�ı�׼
	return {
		xmlDomFactory:xmlDomFactory,
		XmlDomFactory:xmlDomFactory,
		XMLDomFactory:xmlDomFactory
	}
})()
}}})
