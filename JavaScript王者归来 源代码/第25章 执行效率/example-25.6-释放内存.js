function foo(id)
{
	var domObj = document.getElementById(id);
	domObj.onclick = function(){
		alert(this.tagName);
	}
	domObj = null; //删除引用
	if(isIE) 
		setTimeout(CollectGarbage, 10); //IE专用，回收资源
}
