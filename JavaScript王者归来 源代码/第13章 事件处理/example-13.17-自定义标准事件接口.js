function EventManager(owner)
{
	//�¼��������ߣ�Ĭ��Ϊ��������
	owner = owner || this;

	//dispatchEvent()�������������¼�
	//eventType���¼�����
	//eventArgs���¼�����
	this.dispatchEvent = function(eventType, eventArgs)
	{
		//�õ��¼��б�
		var events = owner["on"+eventType];
		//����¼��б���һ�����飬Ӧ��Ҫת��������
		if(events && typeof(events) == "function")
			events = [events];
		if(owner && events)
		{
			//�����б��е��¼������������ε�������
			//�¼��������������潫Ҫ������addEventListener����ע���
			for(var i = 0; i < events.length; i++)
			{
				setTimeout(
					(function(i){return	function(){events[i](eventArgs)}
					})(i), 1
				);
			}
		}
	}
//addEventListener()������¼�������
//������dispatchEvent()������¼���������ķ���������
//addEventListener()�����һ��eventType�󶨶���¼�������
	this.addEventListener = function(eventType, closure)
	{
		if(owner["on"+eventType] == null)
		{
			owner["on"+eventType] = [];
		}
		var events = owner["on"+eventType];
		//����һ�����ͣ���Ϊ�п����¼����ü�ģ��ע���
		//���ʱ��events�����ͽ���function��Ҫ����ת������
		if(events && typeof(events) == "function")
			events = [events];		
		//��closure���������¼��������б�
		events.push(closure);
	}
	//removeEventListener��addEventListener�ķ������
	this.removeEventListener = function(eventType, closure)
	{
		var events = owner["on"+eventType];
		if(events && typeof(events) == "function")
			events = [events];		
		
		for(var i = 0; i < events.length; i++)
		{
			//�����¼��������б��ҵ�Ҫע�����¼�������
			//�������б���ɾ��
			if(events[i] == closure)
				events.splice(i, 1);
		}
	}
}

//���������������ͬǰ�������һ��
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

//���ϵͳ���ͣ�ʵ��EventManger�ӿ�
function Differ(obl)
{
	var buffer = new Array(obl);
	var time = 0;

//ͨ������ʵ�� EnventManager �ӿڣ������ⷽ�������
//�ڱ�����岿�ֽ����и�����ϸ������
	EventManager.call(this);  
	
	//��ȡ������źŲ�����ջ���
	this.readBuffer = function()
	{
		var buf = buffer;
		
		buffer = new Array(obl);
		time = 0;

		return buf;
	}

	//�õ���������
	this.bufferSize = function()
	{
		return obl;
	}

//���ź�����������ϵͳ����ǰ�����������
	this.input = function(serials)
	{
		for(var i = 1; i < serials.length; i++)
		{
				//һ������ź�ϵͳ��������������0��1����1��0�仯��ʱ��
				//����һ���ߵ�ƽ�ź�1������Ϊ�͵�ƽ�ź�0
				var signal = Math.abs(serials[i] - serials[i - 1]);
				buffer[time++ % obl] = signal;
				//��������ߵ�ƽ�ź�1
				if(signal) 
					//����signalchange�¼�����ʱֱ��Ӧ�ô�EventManager�ӿڼ̳е�
					//dispatchEvent����
					this.dispatchEvent("signalchange", 
{input:serials, time:time, buffer:buffer.slice(0)});
		}
	}
}

//����һ������Ϊ20������ź�����
var inputSerials = randomSerials(20);
alert(inputSerials);

//����һ������Ϊ20�Ĳ��ϵͳ
var diff10 = new Differ(20);

//��������źŲ���ȡ���
diff10.input(inputSerials);
alert(diff10.readBuffer());

var eventHandler1 = function(eventArgs){
	//�鿴�ź�ʱ��
alert(eventArgs.time);
}

var eventHandler2 = function(eventArgs){
	//�鿴�źų���ʱ�Ļ�����״̬
alert(eventArgs.buffer);
}

//ע��diff10��singalchange�¼���eventHandler1��eventHandler2
diff10.addEventListener("signalchange",eventHandler1);
diff10.addEventListener("signalchange",eventHandler2);
//�ٴ���������źţ��۲��¼�����
diff10.input(inputSerials);

//ȡ��eventHandler1��ע��
diff10.removeEventListener("signalchange",eventHandler1);
