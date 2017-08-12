//创建一个AjaxProxy对象
var ajax = new AjaxProxy("testServer?page=2");
//注册oncomplete方法
ajax.oncomplete = function(evt){
	if(this.status==200)
	{
		//如果数据获取成功
		window.status = "已完成";
		//更新状态，发起DateReady事件
		EventManager.dispatchEvent("DateReady", 
		{data:this.responseXML.DocumentElement});
	}
	//否则，抛出异常
  else
  {
  	throw new Error("抱歉，装载数据失败。原因：" + xh.statusText);
  }
}
//以get方式获取数据
ajax.get();
