/*
Simple Menu
Code By Lee.
这只是一个用来示范的例子，其中的内容可能超过了读到这个章节的读者能够理解的范围，但是没有关系，你可以先跳过这些具体的内容，继续往下看
*/	
var actioveMenu = {};
//显示菜单
function showMenu(oElement,oMenu,oEvent){
	var oResPoint = {};
	oResPoint.x = -2;
	oResPoint.y = oElement.offsetHeight-1;
	//判定菜单项是否绑定事件，以作不同的显示
	if(oEvent==null)
	{
		//改变元素的样式以显示菜单
		//设置菜单元素边框
		oElement.style.border = 'solid #526d8c 1px';
		oElement.style.borderBottom = 'solid #b4b4b4 0px';
		//设置背景色
		oElement.style.background = '#E7EEF5';
		oElement.style.padding="0px";
		oElement.hasEvent = false;
	}
	else
	{
		oElement.hasEvent = true;
	}
	actioveMenu.menu = oMenu;
	actioveMenu.ele = oElement;
	//计算页面元素的偏移量，以使得菜单出现的位置正确
	while(oElement.offsetParent)
	{
		oResPoint.x = oResPoint.x + oElement.offsetLeft+oElement.clientLeft -oElement.scrollLeft;
		oResPoint.y = oResPoint.y + oElement.offsetTop+oElement.clientTop -oElement.scrollTop;
		oElement = oElement.offsetParent;
	}
	oMenu.style.left = oEvent ? oEvent.x: (oResPoint.x);
	oMenu.style.top =  oEvent ? oEvent.y: (oResPoint.y);
	oMenu.style.display="";
	
//下面这句阻止事件向上传播，关于事件，在第13章有较为详细的讨论
	window.event.cancelBubble = true;
}

//document.attachEvent注册onmousedown事件到document，IE有效
//处理鼠标按下事件，在鼠标在页面中非菜单区域按下时隐藏菜单
//关于这些处理，可以在阅读了第12章后回头来理解
document.attachEvent("onmousedown", 
function (){
	if(actioveMenu.menu)
	{
		//将菜单隐藏
		actioveMenu.menu.style.display = "none";
	 	oElement =actioveMenu.ele;
	 	if(!oElement.hasEvent)
	 	{
			oElement.style.border = '';
			oElement.style.padding="1px";
			oElement.style.background = '';
	 	}
	}
	actioveMenu = {};
}
);
