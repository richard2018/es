/*******************************************\
  游戏人颜色值操作类(2006-10-1)
  This JavaScript was writen by Dron.
  @2003-2008 Ucren.com All rights reserved.
\*******************************************/
DronFw.Class.ColorCalcer = function ()
{
	this.HexToRgb = function (str)
	{
		var r = /^\#?[0-9a-f]{6}$/;
		if (!r.test(str)) return window.alert("输入错误的hex颜色值");
		str = str.replace("#", "");
		var hxs = str.match(/../g);
		for (var i=0; i<3; i++) hxs[i] = parseInt(hxs[i], 16);
		return hxs;
	}
	this.RgbToHex = function (a, b, c)
	{
		var r = /^\d{1,3}$/;
		if (!r.test(a) || !r.test(b) || !r.test(c)) return window.alert("输入错误的rgb颜色值");
		var hexs = [a.toString(16), b.toString(16), c.toString(16)];
		for (var i=0; i<3; i++) if (hexs[i].length==1) hexs[i] = "0" + hexs[i];
		return "#" + hexs.join("");
	}
	this.getDarkColor = function (color, level)
	{
		var r = /^\#?[0-9a-f]{6}$/;
		if (!r.test(color)) return window.alert("输入错误的hex颜色值");
		var rgbc = this.HexToRgb(color);
		for (var i=0; i<3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
		return this.RgbToHex(rgbc[0],rgbc[1],rgbc[2]);
	}
	this.getLightColor = function (color, level)
	{
		var r = /^\#?[0-9a-f]{6}$/;
		if (!r.test(color)) return window.alert("输入错误的hex颜色值");
		var rgbc = this.HexToRgb(color);
		for (var i=0; i<3; i++) rgbc[i] = Math.floor((255-rgbc[i])*level+rgbc[i]);
		return this.RgbToHex(rgbc[0],rgbc[1],rgbc[2]);
	}
	this.getWebSafeColor = function (color)
	{
		var r = /^\#?[0-9a-f]{6}$/;
		if (!r.test(color)) return window.alert("输入错误的hex颜色值");
		var rgbc = this.HexToRgb(color);
		for (var i=0; i<3; i++)
		{
			var q1 = Math.floor(rgbc[i]/51) * 51;
			var q2 = Math.ceil(rgbc[i]/51) * 51;
			if (Math.abs(q1-rgbc[i])<=Math.abs(q2-rgbc[i])) rgbc[i] = q1;
			else rgbc[i] = q2;
		}
		return this.RgbToHex(rgbc[0],rgbc[1],rgbc[2]);
	}
}