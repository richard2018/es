/*******************************************\
  游戏人选框类(2006-9-16)
  This JavaScript was writen by Dron.
  @2003-2008 Ucren.com All rights reserved.
\*******************************************/
if (!DronFw.Class.DragDrop) DronFw.Import("DragDrop");
DronFw.Class.vBorder = function (obj)
{
	var me = this, omouse, isMoved;
	if (!obj) return false;
	var o = typeof(obj)=="object" ? obj : document.getElementById(obj);
	var gif = DronFw.Path + "classes/_vBorder/v.gif";
	var ngif = DronFw.Path + "classes/_vBorder/n.gif";
	var mHTML = "<table cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" height=\"100%\" border=\"0\">\
					<tr>\
						<td width=\"1\" height=\"1\"></td>\
						<td uu></td>\
						<td width=\"1\"></td>\
					</tr>\
					<tr>\
						<td width=\"1\" uu></td>\
						<td><div style=\"width:1px;height:1px;overflow:hidden;\">&nbsp;</div></td>\
						<td width=\"1\" uu></td>\
					</tr>\
					<tr>\
						<td width=\"1\" height=\"1\"></td>\
						<td uu></td>\
						<td width=\"1\"></td>\
					</tr>\
				</table>";
	me.BorderDiv = (function ()
	{
		var div = document.createElement("div");
		with (div.style)
		{
			position = "absolute";
			left = top = width = height = "0px";
		}
		document.body.appendChild(div);
		new DronFw.Class.DragDrop(div);
		return div;
	})();
	me.SelectStart = function (e)
	{
		e = e||event;
		isMoved = true;
		var nmouse = 
		{
			x : e.clientX,
			y : e.clientY
		};
		with (me.BorderDiv.style)
		{
			left = Math.min(omouse.x, nmouse.x)+document.body.scrollLeft + 2 + "px";
			top = Math.min(omouse.y, nmouse.y)+document.body.scrollTop + 2 + "px";
			width = Math.abs(omouse.x - nmouse.x) + "px";
			height = Math.abs(omouse.y - nmouse.y) + "px";
		};
	}
	me.SelectEnd = function ()
	{
		if (!isMoved) with (me.BorderDiv.style)
		{
			left = top = "-10px";
			width = height = "2px";
		}
		o.onmousemove = document.onmouseup = document.onselectstart = null;
		me.BorderDiv.innerHTML = mHTML.replace(/uu/g, "background=\"" +gif+ "\"");
	}
	o.onmousedown = function (e)
	{
		e = e||event;
		var ie = /msie/i.test(navigator.userAgent);
		if (ie) {if (document.onmouseup || e.button!=1) return ;}
		else{if (document.onmouseup || e.button!=0) return ;}
		me.BorderDiv.innerHTML = mHTML.replace(/uu/g, "bgcolor=\"#808080\"");
		isMoved = false;
		omouse =
		{
			x : e.clientX,
			y : e.clientY
		};
		o.onmousemove = me.SelectStart;
		document.onmouseup   = me.SelectEnd;
		document.onselectstart = function(){return false;};
	};
}