//��������������Ƕ�̬�����ⲿ��js�ļ�
function import(jsFile){
	//����.js��չ��
	jsFile = /\.js$/.test(jsFile) ? jsFile : jsFile + ".js";
	//���ĵ��д���script���
	var s = document.createElement("script");
	//����srcΪjsFile��ʾ�Ľű�·��
	s.src = jsFile;
var h = document.getElementsByTagName("head");
//�����������script��ǵ�DOMԪ����ӵ�head��ǵ�������ȥ
//�Ӷ�ʵ�ֽű�������
	h && h[0].appendChild(s);
}

//�����û���ɫ��ͬ��ѡ�����벻ͬ�Ŀ��ƽű�
if(user == "admin")
	import("admin.js");   //�����ⲿ�ļ�
else
	import("user.js");
