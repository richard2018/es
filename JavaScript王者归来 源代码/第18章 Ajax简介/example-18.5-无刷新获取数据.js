//�ӷ�������ȡ����
//����url��ʾ��������ַ
//page��ʾ��ȡָ����ҳ������
function getDataFromServer(url, page)
{
	//����XMLHttp����
	var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
	//ע��onreadystatechange�¼�
	xmlHttp.onreadystatechange = StateChange;
		//��ȡ���������ݣ���GET��ʽ
	xmlHttp.open("GET",url,true); 
	xmlHttp.send("page="+page); //��ȡ��ǰҳ������
	//ʵʱ��ʾ״̬��Ϣ
	window.status = "����װ����Ŀ���ݣ����Ժ�......."
} 
function StateChange()
{
	if(this.readyState==4)	//�����Ѿ��������
	{
		if(this.status==200)		//��ȡ���ݳɹ�
		{
				//���״̬
			window.status = "�����";
				//����DateReady�¼�
				EventManager.dispatchEvent("DateReady", {data:this.responseXML.DocumentElement});
		}
			//�����׳��쳣
		else
		{
				throw new Error("��Ǹ��װ������ʧ�ܡ�ԭ��" + xh.statusText);
		}
	}
}
//����testServer��ȡ��2ҳ������
getDataFromServer("testServer",2);
