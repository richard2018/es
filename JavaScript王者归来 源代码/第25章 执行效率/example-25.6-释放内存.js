function foo(id)
{
	var domObj = document.getElementById(id);
	domObj.onclick = function(){
		alert(this.tagName);
	}
	domObj = null; //ɾ������
	if(isIE) 
		setTimeout(CollectGarbage, 10); //IEר�ã�������Դ
}
