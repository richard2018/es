/*
	����Ϊ˵�� DataVess ����ʱд��һ�����ӽű�������ʱ��Ƚϼ���д�ò�̫��
	��Ȼ DataVess �໹����෽������û���õ���
	���磬���ݵ���ӡ�ɾ�����޸ĵȵ�
	�Ժ󽫻������������и���ϸ��˵�� DataVess ��
	Author:Dron | http://ucren.com
*/
function Pager(obj,pageSize)
{
	var pageCount = Math.ceil(obj.count/pageSize,10);
	var ActivePage = 1;//��ǰҳ
	this.showPage = function (n)
	{
		if (n>pageCount) return false;
		var s = "";
		for (var i=(n-1)*pageSize; i<(n*pageSize); i++)
		{
			if (i>=obj.count) break;
			obj.go(i);
			s += "<tr align=\"left\">";
			s += "<td>" + obj.read("BookName") + "</td>";
			s += "<td>" + obj.read("Works") + "</td>";
			s += "<td>" + obj.read("RelDate") + "</td>";
			s += "<td>" + obj.read("Price") + "</td>";
			s += "</tr>";
		}
		s = n + "<table cellspacing=\"1\" cellpadding=\"2\">\
				<tr align=\"center\">\
					<td width=\"250\">�鼮����</td>\
					<td width=\"80\">����</td>\
					<td width=\"80\">��������</td>\
					<td width=\"80\">�۸�</td>\
				</tr>" + s + "</table>";
		$("pbody").innerHTML = s;
		return false;
	}
	this.search = function (str)
	{
		var s = "";
		var searchBooks = books.search("BookName",".indexOf(\"" + str + "\")!=-1");
		for (var i=0; i<searchBooks.length; i++)
		{
			obj.go(searchBooks[i]);
			s += "<tr align=\"left\">";
			s += "<td>" + obj.read("BookName").replace(str,"<font color=red>" +str+ "</font>") + "</td>";
			s += "<td>" + obj.read("Works") + "</td>";
			s += "<td>" + obj.read("RelDate") + "</td>";
			s += "<td>" + obj.read("Price") + "</td>";
			s += "</tr>";
		}
		s = "<table cellspacing=\"1\" cellpadding=\"2\">\
				<tr align=\"center\">\
					<td width=\"250\">�鼮����</td>\
					<td width=\"80\">����</td>\
					<td width=\"80\">��������</td>\
					<td width=\"80\">�۸�</td>\
				</tr>" + s + "</table>";
		$("pbody").innerHTML = s;
		return false;
	}
	this.prePage = function(){(ActivePage==1)||(this.showPage(--ActivePage));return false;}
	this.nexPage = function(){(ActivePage==pageCount)||(this.showPage(++ActivePage));return false;}
	var s = "<a href=\"#\" onclick=\"return prePage()\">��һҳ</a>&nbsp;";
	for(var i=1;i<=pageCount;i++)
	s += "<a href=\"#\" onclick=\"return showPage(" + i + ")\">" + i + "</a>&nbsp;";
	s += "<a href=\"#\" onclick=\"return nexPage()\">��һҳ</a>";
	s += " &nbsp; &nbsp; &nbsp; &nbsp;<input id=\"sinput\" value=\"����\" type=\"input\"><input type=\"button\" value=\"����\" onclick=\"return search($(\'sinput\').value)\">";
	$("pagebar").innerHTML = s;
	this.showPage(1);
}
//��ĵ���
var a = new Pager(books,8);
var prePage = a.prePage;
var nexPage = a.nexPage;
var showPage = a.showPage;
var search = a.search;