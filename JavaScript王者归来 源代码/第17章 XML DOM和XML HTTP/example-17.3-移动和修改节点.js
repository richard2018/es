/*
��javascript����xml
	*/
var doc = new ActiveXObject("Msxml2.DOMDocument"); 
//ie5.5+,CreateObject("Microsoft.XMLDOM") 
//�����ĵ�
//doc.load("b.xml");
//�����ļ�ͷ
var p = doc.createProcessingInstruction("xml","version='1.0'  encoding='gb2312'");
//����ļ�ͷ
doc.appendChild(p);
//����ֱ�Ӽ���ʱ��ø��ӵ�
//var root = doc.documentElement;
//���ַ�ʽ�������ӵ�
//var root = doc.createElement("students");
var root = doc.createNode(1,"students","");
//�����ӽӵ�
var n = doc.createNode(1,"ttyp","");
//ָ���ӽӵ��ı�
//n.text = " this is a test";
//������ӵ�
var o = doc.createElement("sex");
o.text = "��";    //ָ�����ı�
//��������
var r = doc.createAttribute("id");
r.value="test";
//�������
n.setAttributeNode(r);
//�����ڶ�������    
var r1 = doc.createAttribute("class");
r1.value="tt";
//�������
n.setAttributeNode(r1);
//ɾ���ڶ�������
n.removeAttribute("class");
//�����ӵ�
n.appendChild(o);
//����ı��ӵ�
n.appendChild(doc.createTextNode("this is a text node."));
//���ע��
n.appendChild(doc.createComment("this is a comment\n"));
//����ӽӵ�
root.appendChild(n);
//���ƽӵ�
var m = n.cloneNode(true);
root.appendChild(m);
//ɾ���ӵ�
root.removeChild(root.childNodes(0));
//�������ݶ�
var c = doc.createCDATASection("this is a cdata");
c.text = "hi,cdata";
//������ݶ�
root.appendChild(c);
//��Ӹ��ӵ�
doc.appendChild(root);
//���ҽӵ�
var a = doc.getElementsByTagName("ttyp");
//var a = doc.selectNodes("//ttyp");
//��ʾ�Ľӵ������
for(var i= 0;i<a.length;i++)
{
	alert(a[i].xml);
	for(var j=0;j<a[i].attributes.length;j++)
	{
		alert(a[i].attributes[j].name);
	}
}
//�޸Ľڵ�,����XPATH��λ�ڵ�
var b = doc.selectSingleNode("//ttyp/sex");
b.text = "Ů";
//alert(doc.xml);
//XML���棨��Ҫ�ڷ���ˣ��ͻ�����FSO��
//doc.save();
//�鿴���ӵ�XML
if(n)
{
	alert(n.ownerDocument.xml);
}

