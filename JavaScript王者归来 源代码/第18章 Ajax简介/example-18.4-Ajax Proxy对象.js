//提供HttpRequest构造函数，兼容不同版本的XmlHttpRequest构造器
HttpRequest = function(){
	//检测不同版本的XMLHttp对象，如果构建成功则返回该对象
	var _req = $try(
		  function() {return new ActiveXObject('Msxml2.XMLHTTP')},
		  function() {return new ActiveXObject('Microsoft.XMLHTTP')},
		  function() {return new XMLHttpRequest()}
		) || null;
	return _req;
}

//Ajax代理类型
//参数url表示请求的URL地址，string类型
//async是同步异步标志，boolean类型
//charset是字符集，string类型
//可选的user和password是服务器接受的用户名和密码
AjaxProxy = function(url, async, charset, user, password){
	//实现EventManager接口
	core.events.EventManager.call(this);

	//保存参数
	this.url = url;
	this.async = async || true;
	this.charset = charset || "utf-8";
	this.user = user || null;
	this.password = password || null;
	
	//建立XMLHttp对象
	this._req = new HttpRequest();

	//如果是异步方式，继续为onreadystatechange事件指派代理或者拦截器，提供更加
//精细化的事件控制
	if(this.async){ 
		var $pointer = this;
		this._req.onreadystatechange = function()
		{	
			switch($pointer._req.readyState)
			{
				//这里根据不同的readyState状态发起不同的事件
				//还记得第13章中的自定义事件模型吗？如果忘记了，请回顾一下
				case 0:
					//发起uninitialized事件，文档未装载
					$pointer.dispatchEvent("uninitialized", {req:$pointer._req, readyStateText:"Uninitialized"});
					break;
				case 1:
					//发起loading事件，文档正在装载
					$pointer.dispatchEvent("loading", {req:$pointer._req, readyStateText:"Loading"});
					break;
				case 2:
					//发起onloaded事件，文档装载完毕
					$pointer.dispatchEvent("loaded", {req:$pointer._req, readyStateText:"Loading"});
					break;
				case 3:
					//发起interactive事件，文档装载完毕，部分可用
					$pointer.dispatchEvent("interactive", {req:$pointer._req, readyStateText:"Interactive"});
					break;
				case 4:
					//发起complete事件，文档装载完毕，结束
					$pointer.dispatchEvent("complete", {req:$pointer._req, readyStateText:"Complete"});
			}
		}
	}
}
//send方法，用来将指定的数据通过POST/GET方式提交到服务器
//provider是一个闭包，用来对数据格式在提交前进行进一步的处理
AjaxProxy.prototype.send = function(method, data, provider){
	//如果该代理处于锁定状态，返回
	if(this.lock) return;
	//参数method指定发送方式，缺省以GET方式发送
	method = method || "GET";
	//要发送的地址
	var url = this.url;
	//如果提供了provider，先调用provider处理数据
	if(data && provider) data = provider(data);
	//如果是get方式，将数据连接到发送的URL
	if(data && method == "GET"){
		url = url.indexOf("?") != -1 ? url + "&" + data : url + "?" + data;
	}
	//建立连接
	this._req.open(method, url, this.async, this.user, this.password);
	//设置HTTP头
	this._req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset="+this.charset);
//发送数据
	if(data){
		this._req.send(data);
	}
	else this._req.send();
}
//以POST方式发送数据
AjaxProxy.prototype.post = function(data){
	this.send("POST", data);
}
//以GET方式发送数据
AjaxProxy.prototype.get = function(data){
	this.send("GET", data);
}
//以POST方式提交JSON对象到服务器
AjaxProxy.prototype.postJSON = function(json){
	//这是接收一个JSON对象，将它转换为要发送的字符串格式进行发送
	//关于JSON对象，在第7章已经简单介绍过了
	this.send("POST", data, function(data){
		var ret = [];
		for(var each in data){
			ret.push(encodeURIComponent(each) + "=" + encodeURIComponent(data[each]));
		}
		return ret.join("&");
	});
}
