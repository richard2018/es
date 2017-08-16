function getChatContent(email, name) //获得指定对象的聊天记录
{
	with(core.web.remote.ajax)
	{
		try{
			var ajax = new AjaxProxy("data/chatContents/"+email+".xml");
			ajax.oncomplete = function(evt){
				var xmlDoc;
				if(evt.req.statusText == "Unknown") 
					//如果在本地执行这个例子，因为浏览器采用的协议默认是file://，所以不能直接得到xmlDoc
				{
					xmlDoc = new ActiveXObject("Microsoft.XmlDom"); //还得拿一个DOM对象来解析一下
					if(!xmlDoc.loadXML(evt.req.responseText)){
						throw (xmlDoc.parseError);
					}
				}
				else
				{
					xmlDoc = evt.req.responseXML;
				}
				var chatList = xmlDoc.documentElement.childNodes;
				$("chats").innerHTML = "";
				for(var i = 0; i < chatList.length; i++)
				{					
					var oli = document.createElement("li");
					if(chatList[i].tagName == "message")
					{
						oli.innerHTML = '<span class="fn">我</span>:'+chatList[i].text;
					}
					else if(chatList[i].tagName == "reply")
					{
						oli.innerHTML = '<span class="fn">'+name+'</span>:'+chatList[i].text;
					}

					$("chats").appendChild(oli);
				}
				window.scrollTo(1,document.body.scrollHeight);
			}
			ajax.post("a=1");
		}
		catch(ex)
		{
			alert(ex.message);
		}
	}
}