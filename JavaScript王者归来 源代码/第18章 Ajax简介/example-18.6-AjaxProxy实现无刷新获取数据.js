//����һ��AjaxProxy����
var ajax = new AjaxProxy("testServer?page=2");
//ע��oncomplete����
ajax.oncomplete = function(evt){
	if(this.status==200)
	{
		//������ݻ�ȡ�ɹ�
		window.status = "�����";
		//����״̬������DateReady�¼�
		EventManager.dispatchEvent("DateReady", 
		{data:this.responseXML.DocumentElement});
	}
	//�����׳��쳣
  else
  {
  	throw new Error("��Ǹ��װ������ʧ�ܡ�ԭ��" + xh.statusText);
  }
}
//��get��ʽ��ȡ����
ajax.get();
