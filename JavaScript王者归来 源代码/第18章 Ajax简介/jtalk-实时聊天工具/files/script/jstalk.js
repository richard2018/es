function getUserInfo() //获得用户信息
{
	with(core.web.remote.ajax)
	{
		try{
			var ajax = new AjaxProxy("data/userInfo.xml");
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
				var name = xmlDoc.documentElement.getElementsByTagName("name")[0].text;
				var intro = xmlDoc.documentElement.getElementsByTagName("intro")[0].text;
				var face = xmlDoc.documentElement.getElementsByTagName("face")[0].text;
				var email = xmlDoc.documentElement.getElementsByTagName("email")[0].text;

				$("username").innerText = name;
				$("twitterStatus").value = intro;
				$("myface").childNodes[0].src = face;
			}
			ajax.post("a=1");
		}
		catch(ex)
		{
			alert(ex.message);
		}
	}
}
function getFriendList()
{
	with(core.web.remote.ajax)
	{
		try{
			var ajax = new AjaxProxy("data/friends.xml");
			ajax.oncomplete = function(evt){
				var xmlDoc;
				if(evt.req.statusText == "Unknown") 
				{
					xmlDoc = new ActiveXObject("Microsoft.XmlDom"); 
					if(!xmlDoc.loadXML(evt.req.responseText)){
						throw (xmlDoc.parseError);
					}
				}
				else
				{
					xmlDoc = evt.req.responseXML;
				}
				var userList = $("userList");
				var friends = xmlDoc.documentElement.getElementsByTagName("friend");
				for(var i = 0; i < friends.length; i++)
				{
					var oli = document.createElement("li");
					var name = friends[i].getAttribute("name");
					var intro = friends[i].getAttribute("intro");
					var face = friends[i].getAttribute("face");
					var status = friends[i].getAttribute("status");
					(function(oli, friend){
						oli.innerHTML = '<a title="双击进行聊天" href="#"><img class="face" src="files/face/'+face+'" width="32" height="32"/><span class="status '+status+'" >'+name+'</span><span class="twitter">'+intro+'</span></a>';
						oli.ondblclick = function(){
							addTab(friend);
						}
					})(oli, friends[i]);
					userList.appendChild(oli);
				}
				//alert(friends);
			}
			ajax.post("a=1");
		}
		catch(ex)
		{
			alert(ex.message);
		}
	}
}

function addTab(friend)
{
	var name = friend.getAttribute("name");
	var status = friend.getAttribute("status");
	var email = friend.getAttribute("email");

	var tab = $id("_tab_"+email) || document.createElement("li");
	tab.innerHTML = '<div><span class="status '+status+'">'+name+'<a href="#" onclick="removeTab(this)">X</a></span></div>';
	
	if(!tab.id){
		tab.id = "_tab_"+email;
		tab.onclick = function(){activeTab(friend);};
		tab.content = friend;
		$("nav").childNodes[0].appendChild(tab);
	}
	activeTab(friend);
	//if(status == "chat") tab.className = 'hasChat';
}

function activeTab(friend){
	var name = friend.getAttribute("name");
	var status = friend.getAttribute("status");
	var email = friend.getAttribute("email");
	var intro = friend.getAttribute("intro");
	var face = friend.getAttribute("face");

	var bar = $("nav").childNodes[0].childNodes;

	for(var i = 1; i < bar.length; i++)
	{	
		if(bar[i].id == "_tab_"+email)
		{
			bar[i].className = 'on';
		}
		else
			bar[i].className = '';
	}
	$("chatWin").style.display = "block";
	$("panelName").innerText = name;
	$("panelEmail").innerText = email;
	$("panelIntro").innerText = intro;
	$("panelFace").src = "files/face/" + face;

	frames[0].getChatContent(email, name);
}
function removeTab(obj)
{
	var tab = obj.parentElement.parentElement.parentElement;
	tab.parentElement.removeChild(tab);
	$("chatWin").style.display = "none";
	var aT = $("nav").childNodes[0].childNodes[1];
	if(aT) activeTab(aT.content);
}
getUserInfo();
getFriendList();

