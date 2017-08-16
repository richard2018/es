/*******************************************\
  游戏人日期选择类(2006-06-27)
  This JavaScript was writen by Dron.
  @2003-2008 Ucren.com All rights reserved.
   sman 2006-8-11 友情客串(修改样式，增加按文本框值自动选择，及当前选中日期加重，保存文本框onfocus事件，修改日历定位代码)

\*******************************************/
DronFw.Class.Calendar = function (obj)
{
	var o = this;
	var nowIs = new Date();
	var yy = nowYear = nowIs.getFullYear();
	var mm = nowMonth = nowIs.getMonth() + 1;
	var dd = nowDate = nowIs.getDate();
	o.Element = window.document.getElementById(obj);
	o.Element.oldOnfocus = o.Element.onfucus;
	o.Element.oldOnblur = o.Element.onblur;
	if (!o.Element.format) o.Element.format = "yy-mm-dd";
	o.Element.onfocus = function ()
	{
		var y = nowYear, m = nowMonth, d = nowDate, tt;
		var yyreg = new RegExp(this.format.replace("yy","(\\d+)").replace("mm","\\d+").replace("dd","\\d+"));
		var mmreg = new RegExp(this.format.replace("yy","\\d+").replace("mm","(\\d+)").replace("dd","\\d+"));
		var ddreg = new RegExp(this.format.replace("yy","\\d+").replace("mm","\\d+").replace("dd","(\\d+)"));
		if (tt=this.value.match(yyreg)) y = tt[1];
		if (tt=this.value.match(mmreg)) m = tt[1];
		if (tt=this.value.match(ddreg)) d = tt[1];
		o.showDayLists(y,m,d);
		var e = this;
		var x = e.offsetLeft;
		var y=e.offsetTop;
		while(e=e.offsetParent){
			x+=e.offsetLeft;
			y+=e.offsetTop;
		}
		o.DivObject.style.left = x + "px";
		o.DivObject.style.top = y + this.offsetHeight + "px";

		o.DivObject.style.display = "block";
		o.Element.oldOnfocus();
	}
	o.getDaysCount = function (yea,mon){return (new Date(yea,mon,0)).getDate();}
	o.getFirstDay = function (yea,mon){return (new Date(yea,mon-1,1)).getDay();}
	o.innerHTMLToTd = function (n,str)
	{
		var tds = o.DivObject.getElementsByTagName("td");
		tds[n+8].innerHTML = str;
		tds[n+8].onclick = (str=="&nbsp;")?null:function ()
		{
			dd = this.innerHTML.replace(/[^\d]/g,"");
			o.Element.value = o.Element.format.replace(/yy/g ,yy).replace(/mm/g ,mm).replace(/dd/g ,dd);
			o.DivObject.style.display = "none";
		};
	}
	o.showDayLists = function (yea,mon,day)
	{
		var ms = o.getDaysCount(yea,mon);	
		var fd = o.getFirstDay(yea,mon);
		mon =(""+mon).replace(/^0+/g,"");
		day = (""+day).replace(/^0+/g,"");

		var sels = o.DivObject.getElementsByTagName("select"); //年月下拉
		sels[0].value = yea;
		sels[1].value = mon;
		//画格子
		for(var i=0;i<42;i++) o.innerHTMLToTd(i,"&nbsp;");
		for(var i=1;i<=ms;i++){
			var TdValue = i
			if (sels[0].value==yea&&sels[1].value==mon&&day==i) TdValue = ("<b><font color=\"green\">"+i+"</font></b>")
			if (nowYear==yea&&nowMonth==mon&&nowDate==i) TdValue = ("<b><font color=\"red\">"+i+"</font></b>")
			o.innerHTMLToTd(i+fd-1,TdValue);
		}

		sels[0].onchange = function (){o.showDayLists(yy=this.value,mm);}
		sels[1].onchange = function (){o.showDayLists(yy,mm=this.value);}
	}
	o.init = function ()
	{
		var s = "<table cellspacing=\"0\" cellpadding=\"2\" border=\"0\" width=\"200\" height=\"161\" bgcolor=\"#ECF2FC\" style=\"padding: 2px;border: 1px solid #333333;\" >\
			<tr height=\"20\" bgcolor=\"#0A246A\">\
				<td colspan=\"7\">\
					<select style=\"width:70px;\" _DronFw_Calendar=\"true\">";
		for(var i=nowYear-50;i<=nowYear+50;i++)
		s = s.concat("<option" + (i==nowYear?" selected=\"selected\"":"") + " value=\"" +i+ "\">" +i+ "年</option>");
		s = s.concat("</select><select style=\"width:50px;\" _DronFw_Calendar=\"true\">");
		for(var i=1;i<=12;i++)
		s = s.concat("<option" +(i==nowMonth?" selected=\"selected\"":"")+ " value=\"" +i+ "\">" +i+ "月</option>");
		s = s.concat("</select>&nbsp;&nbsp;<a onclick=\"this.parentNode.parentNode.parentNode.parentNode.parentNode.style.display=\'none\'\" style=\"color:#FFFFFF;cursor: hand;\">关闭日历</a>\
				</td>\
			</tr>\
			<tr height=\"20\" align=\"center\">");
		s = s.concat("<td bgcolor=\"#F5F2D8\" width=\"20\">日</td>");
		for(var i=1;i<7;i++)
		s = s.concat("<td width=\"20\" bgcolor=\"#ECF2FC\" >" +"日一二三四五六".charAt(i)+ "</td>");
		s = s.concat("</tr>");
		for(var i=0;i<6;i++)
		{
			s = s.concat("<tr height=\"20\" bgcolor=\"#ECF2FC\" align=\"center\" style=\"cursor: hand;\">\
				<td width=\"20\" bgcolor=\"#F5F2D8\" onmouseover=\"this.style.backgroundColor=\'#ffffff\'\" onmouseout=\"this.style.backgroundColor=\'\'\"></td>");
			for(var j=0;j<5;j++)
			s = s.concat("<td width=\"20\" onmouseover=\"this.style.backgroundColor=\'#ffffff\'\" onmouseout=\"this.style.backgroundColor=\'\'\"></td>");
			s = s.concat("<td width=\"20\" bgcolor=\"#ECF2FC\" onmouseover=\"this.style.backgroundColor=\'#ffffff\'\" onmouseout=\"this.style.backgroundColor=\'\'\"></td>\
			</tr>");
		}
		s = s.concat("</table>");
		o.DivObject = window.document.createElement("div");
		o.DivObject.style.position = "absolute";
		o.DivObject.style.display = "none";
		window.document.body.appendChild(o.DivObject);
		o.DivObject.innerHTML = s;
	}
	o.init();
}