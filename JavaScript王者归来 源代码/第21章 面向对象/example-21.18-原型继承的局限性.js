function MyDate()
{
}
MyDate.prototype = new Date();
var date = new MyDate();
alert(date.toGMTString);
//ԭ�ͼ̳з��ı����ƺ�������һ�����ڻ���˻���ķ�����Ȼ�������˳Ծ����ǣ����㳢�Ե���date�����toString��toGMTString����ʱ��Internet Explorer�׳�һ��������쳣��˵������[object]���������ڶ��󡱡����ܴ��ɣ�����ԭ�ͼ̳з����ǲ��ܽ�����Ķ���ļ̳����⡣
