/*******************************************\
  Dron Framework Boot File (Version:2.8.2)
  This JavaScript was writen by Dron.
  @2003-2008 Ucren.com All rights reserved.
\*******************************************/
(
	function (w, tax, o, s, gaf, acf, apf, ca, wa, ip)
	{
		var xo = tax();
		if (!xo)
		{
			w.alert("DronFw无法正常运行，可能原因：\n1)  浏览器的安全级别调得过高\n2)  浏览器被第三方软件禁用AX");
			return ;
		};
		if (o)
		{
			o.Class = {};
			o.Path = gaf(s, "src").replace("boot.js", "");
			o.JsPath = "jsfiles";
			o.Call = function (us)
			{
				return ca(o.JsPath, us);
			};
			o.Wait = function (uc, uf)
			{
				return wa(uc, uf, this);
			};
			o.Import = function (us)
			{
				return ip(o.Path + "classes", "_" + us, xo);
			};
		}
		else o = w.DronFw;
		var cl, pl;
		cl = gaf(s, "loadClass");  cl && acf(cl.split(";"), o.Import);
		pl = gaf(s, "loadPrototype");  pl && apf(o.Path + "prototypes", pl.split(";"), ip, xo);
		w.$ || (
			w.$ = function (us)
			{
				return document.getElementById(us);
			}
		);
	}
)
//-----------------------------------------------------------------------------
(
	window,
	function ()
	{
		var ie = /msie/i.test(navigator.userAgent);
		if (ie)
		{
			for (var i=0; i<5; i++)
			{
				try
				{
					var xo = new ActiveXObject(["Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "Msxml2.XMLHTTP.3.0", "MSXml2.XMLHTTP", "Microsoft.XMLHTTP"][i]);
					return xo;
				}
				catch (e)
				{
					
				}
			};
			return false;
		}
		else
		{
			try
			{
				var xo = new XMLHttpRequest();
				return xo;
			}
			catch (e)
			{
				return false;
			}
		}
	},
	(
		function ()
		{
			if (window.DronFw) return false;
			window.DronFw = {};
			return window.DronFw;
		}
	)(),
	(
		function ()
		{
			var s = document.getElementsByTagName("script");
			return s[s.length-1];
		}
	)(),
	function (o, s)
	{
		return o.getAttribute(s);
	},
	function (t, f)
	{
		for (var i in t) f(t[i]);
	},
	function (p, t, f, o)
	{
		for (var i in t) f(p, "_" + t[i], o);
	},
	function (p, s)
	{
		var n = document.createElement("script");
		var h = document.getElementsByTagName("head");
		n.type = "text/javascript";
		n.src = p + "/" + s + ".js";
		h && h[0].appendChild(n);
	},
	function (c, f, o)
	{
		if (c()) return f();
		setTimeout(
			function ()
			{
				o.Wait(c, f);
			},
			50
		);
	},
	function (p, s, o)
	{
		o.open("get", p + "/" + s + ".js", false);
		o.send(null);
		if (o.status==0 || o.status==200) (new Function (o.responseText))();
	}
);