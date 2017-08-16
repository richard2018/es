/*******************************************\
  游戏人GridTable类(2006-10-10)
  This JavaScript was writen by Dron.
  @2003-2008 Ucren.com All rights reserved.
\*******************************************/
DronFw.Class.GridTable = function ()
{
	this.Titles = false;
	this.Widths = false;
	this.Aligns = [];
	this.Items = [];
	this.AddItem = function (ar, fun)
	{
		for (var i=0; i<ar.length; i++) ar[i] = "<td align=\"" + this.Aligns[i] + "\">" + (this.Aligns[i].toLowerCase()=="left"?"&nbsp;":"") + ar[i] + "</td>";
		this.Items[this.Items.length] = "<tr onmouseout=\"className=''\" onmouseover=\"className='on'\" onclick=\"" + fun + "\">" + ar.join("") + "</tr>";
	}
	this.CreateTable = function ()
	{
		if (!this.Titles) return ;
		if (!this.Widths) return ;
		var s1 = "";
		for (var i=0; i<this.Titles.length; i++)
		{
			s1 += "<td width=\"" +this.Widths[i]+ "\" class=\"tit\">\
				<div class=\"mover\" onmousedown=\"DronFw.Class.GridTable.mousedown(this.parentNode, event)\"></div>\
				<div class=\"lable\">" +this.Titles[i]+ "</div>\
			</td>";
		};
		var s = "<div class=\"gridtable\"><table cellspacing=\"1\" cellpadding=\"0\" border=\"0\"><tr>" +
		s1 + "</tr>" + this.Items.join("") + "</table></div>";
		return s;
	}
}
DronFw.Class.GridTable.mousedown = function (obj, e)
{
	DronFw.Class.GridTable.defaultWidth = obj.offsetWidth;
	DronFw.Class.GridTable.defaultLeft = e.clientX;
	DronFw.Class.GridTable.handleObj = obj;
	if (!obj.initWidth) obj.initWidth = obj.offsetWidth;
	document.onmousemove = function ()
	{
		var initWidth = DronFw.Class.GridTable.handleObj.initWidth;
		var newWidth = DronFw.Class.GridTable.defaultWidth + (e.clientX-DronFw.Class.GridTable.defaultLeft);
		newWidth = newWidth<initWidth?initWidth:newWidth;
		DronFw.Class.GridTable.handleObj.width = newWidth;
	};
	document.onmouseup = function ()
	{
		document.onselectstart = document.onmousemove = document.onmouseup = null;
	};
	document.onselectstart = function ()
	{
		return false;
	};
};
(
	function ()
	{
		var head = document.getElementsByTagName("head")[0];
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = DronFw.Path + "classes/_GridTable/css.css";
		link.type = "text/css";
		link.media = "all";
		head.appendChild(link);
	}
)();