/*
用javascript操作xml
	*/
var doc = new ActiveXObject("Msxml2.DOMDocument"); 
//ie5.5+,CreateObject("Microsoft.XMLDOM") 
//加载文档
//doc.load("b.xml");
//创建文件头
var p = doc.createProcessingInstruction("xml","version='1.0'  encoding='gb2312'");
//添加文件头
doc.appendChild(p);
//用于直接加载时获得根接点
//var root = doc.documentElement;
//两种方式创建根接点
//var root = doc.createElement("students");
var root = doc.createNode(1,"students","");
//创建子接点
var n = doc.createNode(1,"ttyp","");
//指定子接点文本
//n.text = " this is a test";
//创建孙接点
var o = doc.createElement("sex");
o.text = "男";    //指定其文本
//创建属性
var r = doc.createAttribute("id");
r.value="test";
//添加属性
n.setAttributeNode(r);
//创建第二个属性    
var r1 = doc.createAttribute("class");
r1.value="tt";
//添加属性
n.setAttributeNode(r1);
//删除第二个属性
n.removeAttribute("class");
//添加孙接点
n.appendChild(o);
//添加文本接点
n.appendChild(doc.createTextNode("this is a text node."));
//添加注释
n.appendChild(doc.createComment("this is a comment\n"));
//添加子接点
root.appendChild(n);
//复制接点
var m = n.cloneNode(true);
root.appendChild(m);
//删除接点
root.removeChild(root.childNodes(0));
//创建数据段
var c = doc.createCDATASection("this is a cdata");
c.text = "hi,cdata";
//添加数据段
root.appendChild(c);
//添加根接点
doc.appendChild(root);
//查找接点
var a = doc.getElementsByTagName("ttyp");
//var a = doc.selectNodes("//ttyp");
//显示改接点的属性
for(var i= 0;i<a.length;i++)
{
	alert(a[i].xml);
	for(var j=0;j<a[i].attributes.length;j++)
	{
		alert(a[i].attributes[j].name);
	}
}
//修改节点,利用XPATH定位节点
var b = doc.selectSingleNode("//ttyp/sex");
b.text = "女";
//alert(doc.xml);
//XML保存（需要在服务端，客户端用FSO）
//doc.save();
//查看根接点XML
if(n)
{
	alert(n.ownerDocument.xml);
}

