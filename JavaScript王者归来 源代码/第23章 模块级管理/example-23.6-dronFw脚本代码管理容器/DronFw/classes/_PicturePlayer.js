/*******************************************\
  游戏人图片轮播器类(2006-10-9)
  This JavaScript was writen by Dron.
  @2003-2008 Ucren.com All rights reserved.
\*******************************************/

if (!DronFw.Class.DataVess) DronFw.Import("DataVess");
DronFw.Class.PicturePlayer = function ()
{
	var adiv, bdiv, PictureData, pics, buts, currentIndex = 0, ie=/msie/i.test(navigator.userAgent);
	var me = this;
	this.timer;
	this.timeout = 3000;
	this.createPlayer = function (tid, w, h, f)
	{
		var pobj = document.getElementById(tid);

		var div = document.createElement("div");
		with (div.style)
		{
			position = "relative";
			width = w + "px";
			height = h + "px";
		}
		pobj.appendChild(div);

		adiv = document.createElement("div");
		with (adiv.style)
		{
			position = "absolute";
			width = w + "px";
			height = h + "px";
		}
		div.appendChild(adiv);

		bdiv = document.createElement("div");
		with (bdiv.style)
		{
			position = "absolute";
			bottom = "0";
			width = w + "px";
			height = "18px";
			backgroundColor = "#000";
			filter = "Alpha(Opacity=50)";
			clear = "both";
		}
		div.appendChild(bdiv);
	};
	this.loadData = function (f)
	{
		PictureData = new DronFw.Class.DataVess(["Name", "Title", "Src", "Url"]);
		PictureData.load(f);

		DronFw.Wait(
			function (){return PictureData.status=="loaded";},
			function ()
			{
				var s = "";
				for (var i=0; i<PictureData.count; i++)
				{
					PictureData.go(i);
					var itemdiv = document.createElement("div");
					itemdiv.style.cursor = "hand";
					itemdiv.style.position = "absolute";
					itemdiv.style.left = itemdiv.style.top = "0";
					itemdiv.style.width = itemdiv.style.height = "100%";
					itemdiv.style.backgroundImage = "url(" + PictureData.read("Src") + ")";
					itemdiv.style.filter = "RevealTrans(transition=12)";
					itemdiv.setAttribute("title", PictureData.read("Title"))
					if (i==0) itemdiv.style.visibility = "visible";
					else itemdiv.style.visibility = "hidden";
					adiv.appendChild(itemdiv);
					itemdiv.onclick = function ()
					{
						window.open(PictureData.read("Url"));
					}

					s += "<div style=\"cursor:default;width:16px;height:16px;border:1px solid #fff;margin:1px 0 0 1px;float:left;color:#fff;text-align:center;\">" + (i+1) + "</div>";
				};
				s += "&nbsp;";
				bdiv.innerHTML = s;
				pics = adiv.getElementsByTagName("div");
				buts = bdiv.getElementsByTagName("div");
				buts[0].style.backgroundColor = "#080";
				setTimeout(function ()
				{
					me.play(1);
				},me.timeout);

				for (var i=0; i<PictureData.count; i++)
				{
					buts[i].onclick = function ()
					{
						me.play(parseInt(this.innerHTML,10)-1);
					}
				}
			}
		);
	};
	this.play = function (n)
	{
		clearTimeout(me.timer);
		var rand = Math.floor(Math.random()*23);
		for (var i=0; i<PictureData.count; i++)
		{
			if (n==i)
			{
				ie && (pics[i].filters[0].transition = rand);
				ie && (pics[i].filters[0].Apply());
				pics[i].style.visibility = "visible";
				pics[i].style.zIndex = DronFw.Class.PicturePlayer.zIndex++;
				ie && (pics[i].filters[0].play());
				buts[i].style.backgroundColor = "#080";
				pics[i-1<0?(PictureData.count-1):(i-1)].style.visibility = "visible";
				pics[i+1>(PictureData.count-1)?0:(i+1)].style.visibility = "hidden";
			}
			else
			{
				buts[i].style.backgroundColor = "#000";
			}
		};
		me.timer = setTimeout(function ()
		{
			me.play((n+1)<PictureData.count?(n+1):0);
		},me.timeout)
	};
};
DronFw.Class.PicturePlayer.zIndex = 100;