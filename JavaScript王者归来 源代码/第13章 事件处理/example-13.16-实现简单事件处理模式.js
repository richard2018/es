//dispatchEvent函数是用来指派事件的
//参数owner是事件的所有者，eventType是事件的类型，eventArgs是事件参数
function dispatchEvent(owner, eventType, eventArgs)
{
	if(owner && owner["on"+eventType])
		setTimeout(function(){owner["on"+eventType](eventArgs)}, 1);
}
//定义一个随机序列生成器，生成一串长度为len的随机0-1序列
function randomSerials(len)
{
	function randomSignal()
	{
		return Math.random() > 0.5 ? 1 : 0;
	}
	var ret = [];
	for(var i = 0; i < len; i++)
	{
		//生成随机的0-1信号
		ret.push(randomSignal());
	}
	return ret;
}
//定义一个差分系统类型，obl为系统的输入信号的长度（带宽）
function Differ(obl)
{
	//输入信号缓存
	var buffer = new Array(obl);
	//时序
var time = 0;
	
	//读取缓存的信号并且清空缓存
	this.readBuffer = function()
	{
		var buf = buffer;
		
		buffer = new Array(obl);
		time = 0;

		return buf;
	}

	//得到缓存容量
	this.bufferSize = function()
	{
		return obl;
	}
	
	//将信号序列输入差分系统
	this.input = function(serials)
	{
		for(var i = 1; i < serials.length; i++)
		{
				//一个差分信号系统，当输入序列由0到1或者1到0变化的时候
				//产生一个高电平信号1，否则为低电平信号0
				var signal = Math.abs(serials[i] - serials[i - 1]);
				buffer[time++ % obl] = signal;
				//如果产生高电平信号1
				if(signal) 
					//发起一个信号改变事件，把输入序列，时序和瞬时的缓冲值作为参数
					dispatchEvent(this, "signalchange", 
{input:serials, time:time, buffer:buffer.slice(0)});
		}
	}
}

//生成一个长度为20的随机0-1序列
var inputSerials = randomSerials(20);
alert(inputSerials);
//创建一个带宽为20的差分系统
var diff10 = new Differ(20);
//将信号输入差分系统
diff10.input(inputSerials);
//查看最终的输出
alert(diff10.readBuffer());

//注册onsignalchange事件
diff10.onsignalchange = function(eventArgs)
{
	//在事件中显示信号出现的时序
	alert(eventArgs.time);
}
//再次输入信号，观察事件触发
diff10.input(inputSerials);
