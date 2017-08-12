/*******************************************\
	版权信息
\*******************************************/
DronFw.Class.MarqueeBar = (function ()
{
	function MarqueeBar(srcParElem,barWidth,barHeight,sleepTime,scrollDir,halign,valign)
	{
		this.mID;
		this.container = srcParElem;
		this.width  = barWidth;
		this.height = barHeight;
		this.sleepTime = (sleepTime == undefined)? MarqueeDefaultSleepTime : Math.abs(sleepTime);;
		this.hAlign    = (halign == undefined)? "LEFT" : halign;
		this.vAlign    = (valign == undefined)? "MIDDLE" : valign;
		this.direction = (scrollDir == undefined||(scrollDir != MarqueeBar.H && scrollDir != MarqueeBar.V))? MarqueeBar.H : scrollDir;
		this.marqueeBar   = null;
		this.msgContainer = null;
		this.templateRow  = null;
		this.status       = -1;
		this.frameCount   = 10;
		this.scrollDelay  = 50;
		this.msgQueue     = [];
		this.step;
		this.setTm            
		this.init = function()
		{
			if(typeof this.container == "string")
			{
				this.container = document.getElementById(this.container);
			}
			if(this.container == undefined)
			{
				alert("Error: " + ERROR_CONTAINERNOTFOUND);
				return -1;
			}

			this.setFrameCount(this.frameCount);

			this.marqueeBar = document.createElement("DIV");
			with(this.marqueeBar)
			{
				style.top  = "0px";
				style.left = "0px";
				style.width  = this.width + "px";
				style.height = this.height + "px";
				style.overflow = "hidden";
				style.position = "relative";
			}
			if(this.container.style.position == "block" || 
				this.container.style.position == "")
			{
				this.container.style.position = "relative";
			}
			this.style = this.marqueeBar.style;
			this.container.appendChild(this.marqueeBar);

			this.msgContainer  = document.createElement("TABLE");
			with(this.msgContainer)
			{    
				cellPadding = 0;
				cellSpacing = 0;
				style.top   = 0;
				style.left  = 0;
				style.width       = "100%";
				style.position    = "relative";
				style.overflowX   = "hidden";
				style.tableLayout = "fixed";
			}
			this.marqueeBar.appendChild(this.msgContainer);    
			var msgTemp = this.msgContainer.insertRow(0).insertCell(0);
			this.setStyle(msgTemp);

			MarqueeCollection[(this.mID = MarqueeCount++)] = this;    
		}
		this.add = function(label,link)
		{
			this.msgQueue.push(new Array(label,link));
		}
		this.start = function()
		{
			if(this.status > 0 && this.start.caller != MarqueeBar ||
				 this.container == undefined)
			{
				return;
			}
			if(this.status == 0)
			{
				this.restart();
				return;
			}
			this.status = 1;
			this.run();    
		}
		this.run = function()
		{
			if(this.status == 0)
			{  
				return;    
			}    
			//消息数为0，转到休眠,并等待是否有新消息;
			if(this.msgQueue.length == 0)
			{ 
				this.msgContainer.rows[0].cells[0].innerHTML = MarqueeBarNoMsg;
				this.msgContainer.rows[0].cells[0].reflectClass = this;
				this.sleep();
				return;        
			}
			Js.removeListener(this.msgContainer.rows[0].cells[0],"mouseover",MarqueeBar.pause,false);
			Js.removeListener(this.msgContainer.rows[0].cells[0],"mouseout",MarqueeBar.restart,false);
			var newMsg = (this.direction == MarqueeBar.H)? this.msgContainer.insertRow(1).insertCell(0) : this.msgContainer.rows[0].insertCell(1);
			newMsg.reflectClass = this;
			newMsg.innerHTML = "<SPAN style='width:100%;' onclick=Javascript:{try{eval(\"" + this.msgQueue[0][1] + "\");}catch(ex){alert(\"错误命令:\"+ex.description);}} style='cursor:hand'>"
						+ this.msgQueue[0][0] 
						+ "</SPAN>";
			this.setStyle(newMsg);    
			this.move();    
		}
		this.move = function()
		{    
			if(this.status == 0)
			{   
				return;
			}
			if(this.direction == MarqueeBar.H)
			{
				if(Math.abs(this.msgContainer.offsetTop - this.step) < this.height)
				{    
					this.msgContainer.style.top = this.msgContainer.offsetTop - this.step;
					setTimeout("MarqueeCollection["+this.mID+"].move()",this.scrollDelay);
				}
				else
				{       
					this.msgContainer.deleteRow(0);
					this.msgContainer.style.top = 0;
					this.msgQueue.push(this.msgQueue.shift());
					if(this.status == 1)
					this.sleep();
				}
			}
			else if(this.direction == MarqueeBar.V)
			{
				if(Math.abs(this.msgContainer.offsetLeft - this.step) < this.width)
				{
					this.msgContainer.style.left = this.msgContainer.offsetLeft - this.step;
					setTimeout("MarqueeCollection["+this.mID+"].move()",this.scrollDelay);
				}
				else
				{       
					this.msgContainer.rows[0].deleteCell(0);
					this.msgContainer.style.left = 0;
					this.msgQueue.push(this.msgQueue.shift());
					if(this.status == 1)
					this.sleep();
				}
			}    
		}
		this.sleep = function()
		{    
			Js.addListener(this.msgContainer.rows[0].cells[0],"mouseover",MarqueeBar.pause,false);
			Js.addListener(this.msgContainer.rows[0].cells[0],"mouseout",MarqueeBar.restart,false);

			if(this.sleep.caller == null)
			{    
				return;
			}
			this.setTm = setTimeout("MarqueeCollection["+this.mID+"].run()",this.sleepTime);    
		}

		this.pause = function()
		{   
			clearTimeout(this.setTm);        
			this.status = 0;
		}
		this.restart = function()
		{
			if(this.status == 1)
			{
				return;
			}
			this.setTm = setTimeout("MarqueeCollection["+this.mID+"].run()",this.sleepTime);
			this.status = 1;
		}
		this.setStyle = function(obj)
		{
			obj.style.overflow = "hidden";
			obj.style.width = this.width + "px";
			obj.style.height = this.height + "px";
			obj.style.font = "12px Verdana";

			try
			{    obj.align = this.hAlign;    }
			catch(ex)
			{    obj.align = "LEFT";    }
			try
			{    obj.parentNode.vAlign = this.vAlign;    }
			catch(ex)
			{    obj.parentNode.vAlign = "MIDDLE";    }
		}
		this.setSleepTime = function(t)
		{
			this.sleepTime = Math.abs(t);
		}
		this.setFrameCount = function(n)
		{
			this.frameCount = Math.abs(n);
			this.step = Math.floor(((this.direction == MarqueeBar.H)? this.height : this.width) / this.frameCount);
			if(this.step == 0)this.step = 1;
		}
		this.setScrollDelay = function(n)
		{
			this.scrollDelay = Math.abs(n);
		}
		this.setHAlign = function(halign)
		{
			this.hAlign = halign;
		}

		this.setVAlign = function(valign)
		{
			this.vAlign = valign;
		}

		this.setBackground = function(bgStyle)
		{
			this.marqueeBar.style.background = bgStyle;
		}
		this.setBorder = function(borderStyle)
		{
			this.marqueeBar.style.border = borderStyle;
		}

		this.init();
	}

	MarqueeBar.H = MarqueeBar.h = "HORIZONTAL";
	MarqueeBar.V = MarqueeBar.v = "VERTICAL";

	MarqueeBar.pause = function()
	{
		var srcElement = Js.getSrcElement(arguments[0]);
		while(srcElement.parentNode != null && srcElement.reflectClass == null)
		{
			srcElement = srcElement.parentNode;
		}
		if(srcElement.reflectClass != undefined)
		{
			srcElement.reflectClass.pause();
		}
	}

	MarqueeBar.restart = function()
	{
		var srcElement = Js.getSrcElement(arguments[0]);
		while(srcElement.parentNode != null &&     srcElement.reflectClass == null)
		{
			srcElement = srcElement.parentNode;
		}
		if(srcElement.tagName == "TD")
		{
			srcElement.reflectClass.restart();
		}    
	}

	function Js(){}

	Js.getSrcElement = function(e)
	{
		return (e.target == null)? e.srcElement: e.target;
	}

	Js.addListener = function(srcObj,evt,dstFunc,flag)
	{
		if(srcObj.attachEvent)
		{
			srcObj.attachEvent("on"+evt,dstFunc);
		}
		else if(srcObj.addEventListener)
		{
			srcObj.addEventListener(evt,dstFunc,flag);
		}
	}

	Js.removeListener = function(srcObj,evt,dstFunc,flag)
	{
		if(srcObj.attachEvent)
		{
			srcObj.detachEvent("on"+evt,dstFunc);
		}
		else if(srcObj.removeEventListener)
		{
			srcObj.removeEventListener(evt,dstFunc,flag);
		}
	}

	return MarqueeBar;
})();