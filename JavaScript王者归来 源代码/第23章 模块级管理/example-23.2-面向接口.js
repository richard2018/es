//��δ�����������21.24�Ѿ���������
__namespace__({core:{data:{xml:
(function(){
	//�հ��е�˽�г�ԱxmlDomFactory
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
	//ע�������return��䣬�����ñհ��������������������ֻ����Ҫ���ŵĽӿ�
//ͨ��return��䷵�ظ�ʹ����
	return {xmlDomFactory:xmlDomFactory,XmlDomFactory:xmlDomFactory,XMLDomFactory:xmlDomFactory}
})()
}}})
