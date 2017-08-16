//从服务器获取数据
//参数url表示服务器地址
//page表示获取指定分页的数据
function getDataFromServer(url, page)
{
	//构造XMLHttp对象
	var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
	//注册onreadystatechange事件
	xmlHttp.onreadystatechange = StateChange;
		//获取服务器数据，以GET方式
	xmlHttp.open("GET",url,true); 
	xmlHttp.send("page="+page); //获取当前页的数据
	//实时显示状态信息
	window.status = "正在装载栏目数据，请稍侯......."
} 
function StateChange()
{
	if(this.readyState==4)	//请求已经处理完毕
	{
		if(this.status==200)		//获取数据成功
		{
				//变更状态
			window.status = "已完成";
				//发起DateReady事件
				EventManager.dispatchEvent("DateReady", {data:this.responseXML.DocumentElement});
		}
			//否则，抛出异常
		else
		{
				throw new Error("抱歉，装载数据失败。原因：" + xh.statusText);
		}
	}
}
//连接testServer获取第2页的数据
getDataFromServer("testServer",2);
