function EventManager(owner)
{
	//事件的所有者，默认为对象自身
	owner = owner || this;

	//dispatchEvent()方法用来发起事件
	//eventType是事件类型
	//eventArgs是事件参数
	this.dispatchEvent = function(eventType, eventArgs)
	{
		//得到事件列表
		var events = owner["on"+eventType];
		//如果事件列表不是一个数组，应该要转换成数组
		if(events && typeof(events) == "function")
			events = [events];
		if(owner && events)
		{
			//遍历列表中的事件处理函数，依次调用它们
			//事件处理函数是由下面将要看到的addEventListener方法注册的
			for(var i = 0; i < events.length; i++)
			{
				setTimeout(
					(function(i){return	function(){events[i](eventArgs)}
					})(i), 1
				);
			}
		}
	}
//addEventListener()负责绑定事件处理句柄
//即把由dispatchEvent()发起的事件交给具体的方法来处理
//addEventListener()允许对一个eventType绑定多个事件处理句柄
	this.addEventListener = function(eventType, closure)
	{
		if(owner["on"+eventType] == null)
		{
			owner["on"+eventType] = [];
		}
		var events = owner["on"+eventType];
		//处理一下类型，因为有可能事件是用简单模型注册的
		//这个时候events的类型将是function，要把它转成数组
		if(events && typeof(events) == "function")
			events = [events];		
		//将closure函数放入事件处理句柄列表
		events.push(closure);
	}
	//removeEventListener是addEventListener的反向操作
	this.removeEventListener = function(eventType, closure)
	{
		var events = owner["on"+eventType];
		if(events && typeof(events) == "function")
			events = [events];		
		
		for(var i = 0; i < events.length; i++)
		{
			//遍历事件处理句柄列表，找到要注销的事件处理函数
			//将它从列表中删除
			if(events[i] == closure)
				events.splice(i, 1);
		}
	}
}

//随机序列生成器，同前面的例子一样
function randomSerials(len)
{
	function randomSignal()
	{
		return Math.random() > 0.5 ? 1 : 0;
	}
	var ret = [];
	for(var i = 0; i < len; i++)
	{
		ret.push(randomSignal());
	}
	return ret;
}

//差分系统类型，实现EventManger接口
function Differ(obl)
{
	var buffer = new Array(obl);
	var time = 0;

//通过构造实现 EnventManager 接口，关于这方面的内容
//在本书第五部分将会有更加详细的讨论
	EventManager.call(this);  
	
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

//将信号序列输入差分系统，和前面的例子类似
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
					//发起signalchange事件，这时直接应用从EventManager接口继承的
					//dispatchEvent方法
					this.dispatchEvent("signalchange", 
{input:serials, time:time, buffer:buffer.slice(0)});
		}
	}
}

//产生一个长度为20的随机信号数列
var inputSerials = randomSerials(20);
alert(inputSerials);

//构造一个带宽为20的差分系统
var diff10 = new Differ(20);

//输入随机信号并读取输出
diff10.input(inputSerials);
alert(diff10.readBuffer());

var eventHandler1 = function(eventArgs){
	//查看信号时序
alert(eventArgs.time);
}

var eventHandler2 = function(eventArgs){
	//查看信号出现时的缓存区状态
alert(eventArgs.buffer);
}

//注册diff10的singalchange事件到eventHandler1和eventHandler2
diff10.addEventListener("signalchange",eventHandler1);
diff10.addEventListener("signalchange",eventHandler2);
//再次输入随机信号，观察事件触发
diff10.input(inputSerials);

//取消eventHandler1的注册
diff10.removeEventListener("signalchange",eventHandler1);
