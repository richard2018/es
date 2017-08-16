/*******************************************\
  游戏人Clip类(2006-8-30)
  This JavaScript was writen by Dron.
  @2003-2008 Ucren.com All rights reserved.
\*******************************************/
DronFw.Class.Clip = function ()
{
	this.Cut = function (obj, dir, pi, mo)
	{
		var o = (typeof(obj)=="string") ? document.getElementById(obj) : obj;
		if (typeof(pi)!="number") return ;
		var sWidth = o.offsetWidth;
		var sHeight = o.offsetHeight;
		o.style.position = "absolute";
		var sLeft = o.offsetLeft;
		var sTop = o.offsetTop;

		switch (dir.toLowerCase())
		{
			case "right":
				o.style.clip = "rect(auto " + (sWidth-pi) + "px auto auto)";
				break;
			case "bottom":
				o.style.clip = "rect(auto auto " + (sHeight-pi) + "px auto)";
				break;
			case "left":
				o.style.clip = "rect(auto auto auto " +pi+ "px)";
				break;
			default:
				o.style.clip = "rect(" +pi+ "px auto auto auto)";
				break;
		}
		if (mo) switch (dir.toLowerCase())
		{
			case "right":
				o.style.left = (sLeft+pi) + "px";
				break;
			case "bottom":
				o.style.top = (sTop+pi) + "px";
				break;
			case "left":
				o.style.left = (sLeft-pi) + "px";
				break;
			default:
				o.style.top = (sTop-pi) + "px";
				break;
		}
	}
}