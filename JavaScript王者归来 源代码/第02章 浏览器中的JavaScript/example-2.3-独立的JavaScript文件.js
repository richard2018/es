/*
Simple Menu
Code By Lee.
��ֻ��һ������ʾ�������ӣ����е����ݿ��ܳ����˶�������½ڵĶ����ܹ����ķ�Χ������û�й�ϵ���������������Щ��������ݣ��������¿�
*/	
var actioveMenu = {};
//��ʾ�˵�
function showMenu(oElement,oMenu,oEvent){
	var oResPoint = {};
	oResPoint.x = -2;
	oResPoint.y = oElement.offsetHeight-1;
	//�ж��˵����Ƿ���¼���������ͬ����ʾ
	if(oEvent==null)
	{
		//�ı�Ԫ�ص���ʽ����ʾ�˵�
		//���ò˵�Ԫ�ر߿�
		oElement.style.border = 'solid #526d8c 1px';
		oElement.style.borderBottom = 'solid #b4b4b4 0px';
		//���ñ���ɫ
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
	//����ҳ��Ԫ�ص�ƫ��������ʹ�ò˵����ֵ�λ����ȷ
	while(oElement.offsetParent)
	{
		oResPoint.x = oResPoint.x + oElement.offsetLeft+oElement.clientLeft -oElement.scrollLeft;
		oResPoint.y = oResPoint.y + oElement.offsetTop+oElement.clientTop -oElement.scrollTop;
		oElement = oElement.offsetParent;
	}
	oMenu.style.left = oEvent ? oEvent.x: (oResPoint.x);
	oMenu.style.top =  oEvent ? oEvent.y: (oResPoint.y);
	oMenu.style.display="";
	
//���������ֹ�¼����ϴ����������¼����ڵ�13���н�Ϊ��ϸ������
	window.event.cancelBubble = true;
}

//document.attachEventע��onmousedown�¼���document��IE��Ч
//������갴���¼����������ҳ���зǲ˵�������ʱ���ز˵�
//������Щ�����������Ķ��˵�12�º��ͷ�����
document.attachEvent("onmousedown", 
function (){
	if(actioveMenu.menu)
	{
		//���˵�����
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
