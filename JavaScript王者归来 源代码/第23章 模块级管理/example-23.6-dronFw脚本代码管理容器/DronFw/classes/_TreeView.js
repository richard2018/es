/*******************************************\
  游戏人 TreeView 类(2006-9-25)
  This JavaScript was writen by Dron.
  @2003-2008 Ucren.com All rights reserved.
\*******************************************/
DronFw.Class.TreeView = function()
{
	var me = this;
	this.TopObj = null;
	this.ActiveNode = null;
	this.CreateTreeInto = function (obj)
	{
		var obj = typeof(obj)=="string" ? document.getElementById(obj) : obj;
		obj.className = "dronTree";
		this.TopObj = obj;
	}
	this.AddItem = function (Name, Id, IntoId, fun, op)
	{
		function onclick_fun()
		{
			if (me.ActiveNode)
			{
				me.ActiveNode.className="nname";
				me.ActiveNode.parentNode.getElementsByTagName("span")[CheckEndNode(me.ActiveNode)?2:1].style.backgroundPosition = "0 0";
			}
			this.className="nname_act";
			this.parentNode.getElementsByTagName("span")[CheckEndNode(this)?2:1].style.backgroundPosition = "0 -16px";
			me.ActiveNode = this;
		}
		function ondblclick_fun()
		{
			var lis = this.parentNode.parentNode.getElementsByTagName("div")[1];
			if (!lis) return eval(this.parentNode.fun);
			lis.style.display = (lis.style.display=="block") ? "none" : "block";
			var listatu = this.parentNode.getElementsByTagName("span")[0];
			listatu.innerHTML = (lis.style.display=="none") ? "<span>+</span>" : "<span>-</span>";
		}
		
		var IntoObj, parNode;
		if (IntoId=="")
		{
			IntoObj = this.TopObj;
			if (this.hasRoot) return window.alert("Root Node 已存在，不能重复创建！");
			this.hasRoot = true;
		}
		else
		{
			var parNode = document.getElementById(IntoId).parentNode;
			var temp = parNode.getElementsByTagName("div")[1];
			if (!temp)
			{
				var temp = document.createElement("div");
				temp.className = "nl";
				parNode.appendChild(temp);
				if (parNode.getElementsByTagName("div")[0].open) temp.style.display = "block";

				var ol = document.createElement("ol");
				temp.appendChild(ol);
				
				var fold = parNode.getElementsByTagName("div")[0].getElementsByTagName("span")[0];
				if (parNode.getElementsByTagName("div")[0].root) fold.style.background = "#fff url(" + DronFw.Path + "classes/_TreeView/style1/rootstatus.gif) no-repeat 0 0";
				else fold.style.backgroundImage = "url(" + DronFw.Path+ "/classes/_TreeView/style1/nstatus.gif)";
				fold.innerHTML = (temp.style.display=="block") ? "<span>-</span>" : "<span>+</span>";

			}
			else ol = temp.getElementsByTagName("ol")[0];
			IntoObj = document.createElement("li");
			ol.appendChild(IntoObj);
		}

		var nn = document.createElement("div");
		nn.id = Id;
		nn.className = "nn";
		nn.fun = fun;
		if (!IntoId) nn.root = true;
		if (op) nn.open = true;
		IntoObj.appendChild(nn);

		var span = document.createElement("span");
		span.className = "nline";
		span.style.backgroundPosition = "0 -16px";
		nn.appendChild(span);
		if (parNode)
		{
			if (parNode.lastNline) parNode.lastNline.style.backgroundPosition = "0 0";
			parNode.lastNline = span;
		}
		span.onclick = ondblclick_fun;

		span = document.createElement("span");
		span.className = "nico";
		nn.appendChild(span);
		span.onclick = ondblclick_fun;

		span = document.createElement("span");
		span.className = "nname";
		span.innerHTML = Name;
		nn.appendChild(span);
		span.onclick = onclick_fun;
		span.ondblclick = ondblclick_fun;

		span = document.createElement("span");
		span.innerHTML = "&nbsp;";
		nn.appendChild(span);

		if (IntoObj.parentNode.lastNode) IntoObj.parentNode.lastNode.style.background = "#fff url(" +DronFw.Path+ "/classes/_TreeView/style1/tvline.gif) repeat-y -1px 0";
		IntoObj.parentNode.lastNode = IntoObj;
	}

	function CheckEndNode(obj)
	{
		if (obj.ednd) return obj.ednd==2;
		obj.ednd = obj.parentNode.parentNode.getElementsByTagName("div")[1] ? 2 : 1;
		return obj.ednd==2;
	}
};
(
	function ()
	{
		var head = document.getElementsByTagName("head")[0];
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = DronFw.Path + "classes/_TreeView/style1/css.css";
		link.type = "text/css";
		link.media = "all";
		head.appendChild(link);

		document.onselectstart = function ()
		{
			return false;
		}
	}
)();