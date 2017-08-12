/*******************************************\
  游戏人Window2类(Window之升级版 2006-10-24)
  This JavaScript was writen by Dron.
  @2003-2008 Ucren.com All rights reserved.
\*******************************************/
DronFw.Class.Window2 = function ()
{
	//User
	this.Left = 0;
	this.Top = 0;
	this.Width = 300;
	this.Height = 200;
	this.Icon = "";
	this.Title = "新窗体";
	this.MinButton =
	this.MaxButton =
	this.CloButton = true;

	//System
	this.MinStatus =
	this.MaxStatus = false;

	var handle = DronFw.Class.Window2.createHandle(16);
	var me = this;
	var isIe = /msie/i.test(navigator.userAgent);

	this.Show = function ()
	{
		if (me.Window)
		{
			me.Window.style.display = "block";
			DronFw.Class.Window2.currentWindow.TitleDiv.className = "window_title window_title_sliver";
			me.Window.TitleDiv.className = "window_title"
			DronFw.Class.Window2.currentWindow = me.Window;
			return me.Window.style.zIndex = DronFw.Class.Window2.zIndex++;
		}
		me.Window = document.createElement("div");
		var w = me.Window;
		w.id = handle;
		w.quote = me;
		w.style.position = "absolute";
		w.style.left = me.Left + "px";
		w.style.top = me.Top + "px";
		w.style.width = (isIe ? me.Width : (me.Width-2)) + "px";
		w.style.height = (isIe ? me.Height : (me.Height-4)) + "px";
		w.style.zIndex = DronFw.Class.Window2.zIndex++;
		document.body.appendChild(w);
		w.innerHTML = "\
		<div class=\"window_borderout\">\
			<div class=\"window_borderin\">\
				<div class=\"window_title\" ondblclick=\"$(\'" +handle+ "\').quote.ChangeMax();\">\
					<div class=\"window_title_button\">\
						<input type=\"button\" style=\"background:#d6d3ce url('" + DronFw.Path + "classes/_Window2/min.gif') no-repeat -2px -2px;" + (me.MinButton ? "" : "display:none;") + "\" value=\"\"><input type=\"button\" style=\"background:#d6d3ce url('" + DronFw.Path + "classes/_Window2/res.gif') no-repeat -2px -2px;" + (me.MaxButton ? "" : "display:none;") + "\" onclick=\"$(\'" + handle + "\').quote.ChangeMax();\" value=\"\"><input type=\"button\" style=\"background:#d6d3ce url('" + DronFw.Path + "classes/_Window2/clo.gif') no-repeat -2px -2px;" + (me.CloButton ? "" : "display:none;") + "\" value=\"\" onclick=\"$(\'" + handle + "\').quote.Close();\">\
					</div>" + (me.Icon ? ("<span style=\"display:inline;width:16px;height:16px;background:url(" +me.Icon+ ") no-repeat;font-size:16px;margin-right:2px;\">&#12288;</span>") : "") + me.Title+ "</div>\
				<div class=\"window_body\"></div>\
			</div>\
		</div>";
		w.onmousedown = function (e)
		{
			e = e || event;
			var srcElement = isIe ? e.srcElement : e.target;
			w.style.zIndex = DronFw.Class.Window2.zIndex++;
			DronFw.Class.Window2.currentWindow.TitleDiv.className = "window_title window_title_sliver";
			w.TitleDiv.className = "window_title"
			DronFw.Class.Window2.currentWindow = w;
			if (/window_title/.test(srcElement.className) && !me.MaxStatus) return me.Drag(e, w);
		}
		var divs = w.getElementsByTagName("div");
		w.TitleDiv = divs[2];
		me.Content = divs[4];
		if (DronFw.Class.Window2.currentWindow) DronFw.Class.Window2.currentWindow.TitleDiv.className = "window_title window_title_sliver";
		DronFw.Class.Window2.currentWindow = w;
		me.Content.style.width = (me.Width - 4) + "px";
		me.Content.style.height = (me.Height - 22) + "px";
	}
	this.Drag = function (e, w)
	{
		w.oldLeft = me.Left;
		w.oldTop = me.Top;
		w.oldMleft = e.clientX;
		w.oldMtop = e.clientY;
		document.onmousemove = function (e)
		{
			e = e || event;
			w.style.left = (me.Left = w.oldLeft + (e.clientX - w.oldMleft)) + "px";
			w.style.top = (me.Top = w.oldTop + (e.clientY - w.oldMtop)) + "px";
		}
		document.onmouseup = function (e)
		{
			document.onmousemove = document.onselectstart = null;
		}
		document.onselectstart = function ()
		{
			return false;
		}
	}
	this.ChangeMin = function ()
	{
		//Coming soon...
	}
	this.ChangeMax = function ()
	{
		if (!me.MaxButton) return ;
		if (me.MaxStatus)
		{
			me.Window.style.left = me.Left + "px";
			me.Window.style.top = me.Top + "px";
			me.Window.style.width = me.Width + "px";
			me.Window.style.height = me.Height + "px";
			me.Content.style.width = (me.Width - 4) + "px";
			me.Content.style.height = (me.Height - 22) + "px";
		}
		else
		{
			me.Window.style.left = 0;
			me.Window.style.top = 0;
			me.Window.style.width = document.body.clientWidth + "px";
			me.Window.style.height = document.body.clientHeight + "px";
			me.Content.style.width = (document.body.clientWidth - 4) + "px";
			me.Content.style.height = (document.body.clientHeight - 22) + "px";
		}
		me.MaxStatus = !me.MaxStatus;
	}
	this.Close = function ()
	{
		me.Window.style.display = "none";
	}
};
DronFw.Class.Window2.zIndex = 1000;
DronFw.Class.Window2.currentWindow = false;
DronFw.Class.Window2.createHandle = function (n)
{
	var words = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var re = "";
	for(var i=0; i<n; i++)
	{
		var xRandom = Math.floor(Math.random() * 62);
		re += words.charAt(xRandom);
	}
	return re;
};
(
	function ()
	{
		var head = document.getElementsByTagName("head")[0];
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = DronFw.Path + "classes/_Window2/win2.css";
		link.type = "text/css";
		link.media = "all";
		head.appendChild(link);
	}
)();