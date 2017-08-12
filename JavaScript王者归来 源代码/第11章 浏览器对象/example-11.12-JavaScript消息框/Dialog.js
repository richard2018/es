/**
	Class Name :Dialog Class
	Create on  :2003.8.19
	Collect By : Lee
	Depend on  : valid Function , SysErr Function
	Exception throws : valid Class is not exists，SysErr is not exixts
*/
(function()
{
	Dialog = {
		showBlockWebDialog		: showBlockWebDialog ,
		showWebDialog   : showWebDialog ,
		showModalDialog : __showModalDialog,
		selectGroup :selectGroup,
		sendGroupMessage:sendGroupMessage,
		openNormalWin:openNormalWin,
		openNormalFullWin:openNormalFullWin,
		openNormalFullNamedWin:openNormalFullNamedWin
	};
	
		
	function openNormalWin(url,w,h){
		var xPoint = (window.screen.width-w)/2+"px";
		var yPoint = (window.screen.height-h)/2+"px";
		var feature = "left="+xPoint+",top="+yPoint+",height="+h+"px,width="+w+"px,resizable=no,scrollbars=no,menubar=no,status=no";
		window.open(url,('p'+Math.random()).replace(/\./gi,''),feature);
	};
	
	// 可以全屏幕
	function openNormalFullWin(url,w,h){
		var xPoint = (window.screen.width-w)/2+"px";
		var yPoint = (window.screen.height-h)/2+"px";
		var feature = "left="+xPoint+",top="+yPoint+",height="+h+"px,width="+w+"px,resizable=yes,scrollbars=no,menubar=no,status=yes";
		window.open(url,('p'+Math.random()).replace(/\./gi,''),feature);
	};
	
	// 可以全屏幕，指定窗口名字
	function openNormalFullNamedWin(url,w,h,name){
		var xPoint = (window.screen.width-w)/2+"px";
		var yPoint = (window.screen.height-h)/2+"px";
		var feature = "left="+xPoint+",top="+yPoint+",height="+h+"px,width="+w+"px,resizable=yes,scrollbars=no,menubar=no,status=yes";
		window.open(url,name,feature);
	};	
		
	function showBlockWebDialog(url, w, h) { //线程中止方式的对话框会中断脚
		
		if(!w) w = 503;
		if(!h) h = 385;
		
		var dwh = "dialogWidth:" + w + "px; dialogHeight:" + h + "px;";
		var ret =  showModelessDialog(url, window, "status:no;center:yes;help:no;minimize:no;maximize:no;border:thin;" + dwh);
		if(typeof(ret) =="string" &&  ret =="reloadParent")
		{
				window.location.reload();
		}
		return ret;
	};

	function showWebDialog(url, w, h){     //线程非中止方式，不会中断脚本
		
		if(!w) w = 503;
		if(!h) h = 385;
		var dwh = "dialogWidth:" + w + "px; dialogHeight:" + h + "px;";
		var ret = showModalDialog(url, window , "status:no;center:yes;help:no;minimize:no;maximize:no;border:thin;" + dwh);
		
		if(typeof(ret) =="string" && ret =="reloadParent")
		{
			window.location.reload();
		}

		return ret;
	};
	
	///resource/jsp/system/sendGroupMessageDlg.jsp
	function selectGroup(oGroupID,oGroupName)
	{
	
		var ret = Dialog.showWebDialog("/resource/jsp/system/showGroupTreeDlg.jsp",250,400);
		
		if(ret!=null && ret != "")
		{
			oGroupName.value = ret.split(",")[1];
			oGroupID.value = ret.split(",")[0];
		}
	};
	
	function sendGroupMessage(groupID,sTitle,sBody,toSelf)
	{
		if(!toSelf) toSelf = 1;
		var ret = Dialog.showWebDialog("/resource/jsp/system/sendGroupMessageDlg.jsp?groupID="+groupID+"&title="+sTitle+"&body="+sBody+"&toSelf="+toSelf,600,480);
		return ret;
	};
	function __showModalDialog(url, w, h, dialogArgs)
	{
		if(!w) w = 503;
		if(!h) h = 385;
		var dwh = "dialogWidth:" + w + "px; dialogHeight:" + h + "px;";
		
		if(dialogArgs == null)
		{
			dialgoArgs = self;  //new Array();
		}
			
		var ret = showModalDialog(url, dialogArgs, "status:no;center:yes;help:no;minimize:no;maximize:no;border:thin;" + dwh);
		
		return ret;
	};
})();
	