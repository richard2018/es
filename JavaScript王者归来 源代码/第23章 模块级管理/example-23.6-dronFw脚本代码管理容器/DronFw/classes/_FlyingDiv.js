/*******************************************\
  FlyingDiv¿‡(2006-10-21)
  This JavaScript was writen by Dron.
  @2003-2008 Ucren.com All rights reserved.
\*******************************************/

if (!DronFw.Class.FrameAction) DronFw.Import("FrameAction");
DronFw.Class.FlyingDiv = function (obj, MinX, MinY)
{
	var Obj = typeof(obj)=="string" ? document.getElementById(obj) : obj;
	var MaxX = Obj.style.left ? parseInt(Obj.style.left) : Obj.clientLeft;
	var MaxY = Obj.style.top ? parseInt(Obj.style.top) : Obj.clientTop;
	var MaxW = Obj.style.width ? parseInt(Obj.style.width) : Obj.clientWidth;
	var MaxH = Obj.style.height ? parseInt(Obj.style.height) : Obj.clientHeight;
	var xch = MaxX - MinX, ych = MaxY - MinY;
	var StepX = [MinX + xch/4, MinX + xch/2, MinX + xch * 3 / 4];
	var StepY = [MinY + ych/4, MinY + ych/2, MinY + ych * 3 / 4];
	var StepW = [MaxW/4, MaxW/2, MaxW * 3 / 4];
	var StepH = [MaxH/4, MaxH/2, MaxH * 3 / 4];
	var vdiv = document.createElement("div"), objid;
	vdiv.id = objid = "id" + new Date().valueOf();
	vdiv.style.position = "absolute";
	vdiv.style.left = MinX + "px";
	vdiv.style.top = MinY + "px";
	vdiv.style.width = vdiv.style.height = "0px";
	vdiv.style.overflow = "hidden";
	vdiv.style.border = "1px solid #808080";
	vdiv.style.display = "none";
	document.body.appendChild(vdiv);

	this.Show = function ()
	{
		var fa = new DronFw.Class.FrameAction(32);
		fa.load([
			"$(\"" + objid + "\").style.display = \"block\";",
			"$(\"" + objid + "\").style.left = \"" + StepX[0] + "px\";\
			 $(\"" + objid + "\").style.top = \"" + StepY[0] + "px\";\
			 $(\"" + objid + "\").style.width = \"" + StepW[0] + "px\";\
			 $(\"" + objid + "\").style.height = \"" + StepH[0] + "px\";",
			"$(\"" + objid + "\").style.left = \"" + StepX[1] + "px\";\
			 $(\"" + objid + "\").style.top = \"" + StepY[1] + "px\";\
			 $(\"" + objid + "\").style.width = \"" + StepW[1] + "px\";\
			 $(\"" + objid + "\").style.height = \"" + StepH[1] + "px\";",
			"$(\"" + objid + "\").style.left = \"" + StepX[2] + "px\";\
			 $(\"" + objid + "\").style.top = \"" + StepY[2] + "px\";\
			 $(\"" + objid + "\").style.width = \"" + StepW[2] + "px\";\
			 $(\"" + objid + "\").style.height = \"" + StepH[2] + "px\";",
			"$(\"" + objid + "\").style.display = \"none\";\
			 $(\"" + Obj.id + "\").style.display = \"block\";"
		]);
		fa.start();
	};

	this.Hide = function ()
	{
		var fa = new DronFw.Class.FrameAction(32);
		fa.load([
			"$(\"" + objid + "\").style.display = \"block\";\
			 $(\"" + Obj.id + "\").style.display = \"none\";",
			"$(\"" + objid + "\").style.left = \"" + StepX[2] + "px\";\
			 $(\"" + objid + "\").style.top = \"" + StepY[2] + "px\";\
			 $(\"" + objid + "\").style.width = \"" + StepW[2] + "px\";\
			 $(\"" + objid + "\").style.height = \"" + StepH[2] + "px\";",
			"$(\"" + objid + "\").style.left = \"" + StepX[1] + "px\";\
			 $(\"" + objid + "\").style.top = \"" + StepY[1] + "px\";\
			 $(\"" + objid + "\").style.width = \"" + StepW[1] + "px\";\
			 $(\"" + objid + "\").style.height = \"" + StepH[1] + "px\";",
			"$(\"" + objid + "\").style.left = \"" + StepX[0] + "px\";\
			 $(\"" + objid + "\").style.top = \"" + StepY[0] + "px\";\
			 $(\"" + objid + "\").style.width = \"" + StepW[0] + "px\";\
			 $(\"" + objid + "\").style.height = \"" + StepH[0] + "px\";",
			"$(\"" + objid + "\").style.display = \"none\";"
		]);
		fa.start();
	};
}