/*******************************************\
  String ����չ����(2006-8-8)
  ���ĵ�ԭ���ߣ�zmm�������޸��벹�䣺dron
\*******************************************/
// �ϲ�����հ�Ϊһ���հ�
String.prototype.resetBlank = function()
{
	return this.replace(/\s+/g," ");
}
// ��ȥ��߿հ�
String.prototype.LTrim = function()
{
	return this.replace(/^\s+/g,""); 
} 
// ��ȥ�ұ߿հ�
String.prototype.RTrim = function()
{
	return this.replace(/\s+$/g,""); 
}
// ��ȥ���߿հ�
String.prototype.trim = function()
{
	return this.replace(/(^\s+)|(\s+$)/g,""); 
}
// ��������
String.prototype.getNum = function()
{
	return this.replace(/[^\d]/g,"");
}
// ������ĸ
String.prototype.getEn = function()
{
	return this.replace(/[^A-Za-z]/g,""); 
}
// ��������
String.prototype.getCn = function()
{
	return this.replace(/[^\u4e00-\u9fa5\uf900-\ufa2d]/g,"");
}
// �õ��ֽڳ���
String.prototype.getRealLength = function()
{
	return this.replace(/[^\x00-\xff]/g,"--").length;
}
// �����ȡָ�����ȵ��ִ�
String.prototype.left = function(n)
{
	return this.slice(0,n);
}
// ���ҽ�ȡָ�����ȵ��ִ�
String.prototype.right = function(n)
{
	return this.slice(this.length-n);
}
// HTML����
String.prototype.HTMLEncode = function()
{
	var re = this;
	var q1 = [/\x26/g,/\x3C/g,/\x3E/g,/\x20/g];
	var q2 = ["&amp;","&lt;","&gt;","&nbsp;"];
	for(var i=0;i<q1.length;i++)
	re = re.replace(q1[i],q2[i]);
	return re;
}
// Unicodeת��
String.prototype.ascW = function()
{
	var strText = "";
	for (var i=0; i<this.length; i++) strText += "&#" + this.charCodeAt(i) + ";";
	return strText;
}
