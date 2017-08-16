//�ṩHttpRequest���캯�������ݲ�ͬ�汾��XmlHttpRequest������
HttpRequest = function(){
	//��ⲻͬ�汾��XMLHttp������������ɹ��򷵻ظö���
	var _req = $try(
		  function() {return new ActiveXObject('Msxml2.XMLHTTP')},
		  function() {return new ActiveXObject('Microsoft.XMLHTTP')},
		  function() {return new XMLHttpRequest()}
		) || null;
	return _req;
}

//Ajax��������
//����url��ʾ�����URL��ַ��string����
//async��ͬ���첽��־��boolean����
//charset���ַ�����string����
//��ѡ��user��password�Ƿ��������ܵ��û���������
AjaxProxy = function(url, async, charset, user, password){
	//ʵ��EventManager�ӿ�
	core.events.EventManager.call(this);

	//�������
	this.url = url;
	this.async = async || true;
	this.charset = charset || "utf-8";
	this.user = user || null;
	this.password = password || null;
	
	//����XMLHttp����
	this._req = new HttpRequest();

	//������첽��ʽ������Ϊonreadystatechange�¼�ָ�ɴ���������������ṩ����
//��ϸ�����¼�����
	if(this.async){ 
		var $pointer = this;
		this._req.onreadystatechange = function()
		{	
			switch($pointer._req.readyState)
			{
				//������ݲ�ͬ��readyState״̬����ͬ���¼�
				//���ǵõ�13���е��Զ����¼�ģ������������ˣ���ع�һ��
				case 0:
					//����uninitialized�¼����ĵ�δװ��
					$pointer.dispatchEvent("uninitialized", {req:$pointer._req, readyStateText:"Uninitialized"});
					break;
				case 1:
					//����loading�¼����ĵ�����װ��
					$pointer.dispatchEvent("loading", {req:$pointer._req, readyStateText:"Loading"});
					break;
				case 2:
					//����onloaded�¼����ĵ�װ�����
					$pointer.dispatchEvent("loaded", {req:$pointer._req, readyStateText:"Loading"});
					break;
				case 3:
					//����interactive�¼����ĵ�װ����ϣ����ֿ���
					$pointer.dispatchEvent("interactive", {req:$pointer._req, readyStateText:"Interactive"});
					break;
				case 4:
					//����complete�¼����ĵ�װ����ϣ�����
					$pointer.dispatchEvent("complete", {req:$pointer._req, readyStateText:"Complete"});
			}
		}
	}
}
//send������������ָ��������ͨ��POST/GET��ʽ�ύ��������
//provider��һ���հ������������ݸ�ʽ���ύǰ���н�һ���Ĵ���
AjaxProxy.prototype.send = function(method, data, provider){
	//����ô���������״̬������
	if(this.lock) return;
	//����methodָ�����ͷ�ʽ��ȱʡ��GET��ʽ����
	method = method || "GET";
	//Ҫ���͵ĵ�ַ
	var url = this.url;
	//����ṩ��provider���ȵ���provider��������
	if(data && provider) data = provider(data);
	//�����get��ʽ�����������ӵ����͵�URL
	if(data && method == "GET"){
		url = url.indexOf("?") != -1 ? url + "&" + data : url + "?" + data;
	}
	//��������
	this._req.open(method, url, this.async, this.user, this.password);
	//����HTTPͷ
	this._req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset="+this.charset);
//��������
	if(data){
		this._req.send(data);
	}
	else this._req.send();
}
//��POST��ʽ��������
AjaxProxy.prototype.post = function(data){
	this.send("POST", data);
}
//��GET��ʽ��������
AjaxProxy.prototype.get = function(data){
	this.send("GET", data);
}
//��POST��ʽ�ύJSON���󵽷�����
AjaxProxy.prototype.postJSON = function(json){
	//���ǽ���һ��JSON���󣬽���ת��ΪҪ���͵��ַ�����ʽ���з���
	//����JSON�����ڵ�7���Ѿ��򵥽��ܹ���
	this.send("POST", data, function(data){
		var ret = [];
		for(var each in data){
			ret.push(encodeURIComponent(each) + "=" + encodeURIComponent(data[each]));
		}
		return ret.join("&");
	});
}
