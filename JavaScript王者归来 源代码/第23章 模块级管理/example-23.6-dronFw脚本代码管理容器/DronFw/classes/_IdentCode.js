/*******************************************\
  游戏人伪验证码类(2006-11-13)
  This JavaScript was writen by Dron.
  @2003-2008 Ucren.com All rights reserved.
\*******************************************/
DronFw.Class.IdentCode = function ()
{
	this.value = 0;
	function createRandomWord(n)
	{
		var words = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		var re = "";
		for(var i=0; i<n; i++) re += words.charAt(Math.floor(Math.random() * 62));
		return re;
	};
	this.CreateInto = function(obj)
	{
		var obj = typeof(obj)=="string" ? document.getElementById(obj) : obj;
		var div = document.createElement("div");
		with (div.style)
		{
			position = "relative";
			width = "70px"; height = "20px";
			border = "1px solid #00f";
			fontSize = "16px"; fontWeight = "bold";
			textAlign = "center";
			color = "#00f";
			cursor = "default";
		}
		var inp = document.createElement("input");
		inp.style.width = inp.style.height = "0px";
		obj.appendChild(div);
		obj.appendChild(inp);
		div.onmousemove = function () {return inp.focus();};
		this.value = createRandomWord(4).toUpperCase();
		div.innerHTML = "<span>" + this.value.split("").join("</span> <span>") + "</span>";
		var span = div.getElementsByTagName("span");
		for (var i=0; i<4; i++)
		{
			var r = Math.floor(Math.random() * 5) - 2;
			with (span[i].style)
			{
				position = "relative";
				top = r + "px";
			}
		}
		for (var i=0; i<150; i++)
		{
			var x = Math.floor(Math.random() * 68) + 1;
			var y = Math.floor(Math.random() * 18) + 1;
			var rd = document.createElement("div");
			with (rd.style)
			{
				position = "absolute";
				top = y + "px"; left = x + "px";
				height = width = "1px";
				overflow = "hidden";
				backgroundColor = "#00f";
			}
			div.appendChild(rd);
		}
	}
}