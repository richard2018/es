<%@ language="JavaScript" codepage="65001" %>
<%
	function Bin2Str(binary)
	{
		var rec = new ActiveXObject("ADODB.RecordSet");
		rec.Fields.Append("DDD",201,1);
		rec.open();
		rec.addNew();
		rec(0).appendChunk(binary);
		rec.update();
		var result = rec(0).value;
		rec.Close();
		return result;
	}

	var url, char, reg;
	if (Request("url")+""!="undefined") url = Request("url") + "";
	if (Request("char")+""!="undefined") char = Request("char") + "";
	else char = "gb2312";
	if (Request("reg")+""!="undefined") reg = Request("reg") + "";
	if (typeof(url)=="undefined")
	{
		Response.Write("");
		Response.End();
	}

	var ajax = new ActiveXObject("Microsoft.xmlhttp");
	var rbody, rtext;
	ajax.open("get", url, false);
	ajax.send(null);

	if (ajax.status==0 || ajax.status==200) rbody = ajax.responseBody;
	else
	{
		Response.Write("");
		Response.End();
	}

	if (char=="gb2312") rtext = Bin2Str(rbody);
	else rtext = ajax.responseText;

	if (typeof(reg)!="undefined")
	{
		var rExp = new RegExp(reg);
		var temptest = rtext.match(rExp);
		if (temptest && temptest[1]) rtext = temptest[1];
	}

	Response.Write(rtext);
%>