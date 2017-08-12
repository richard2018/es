//dispatchEvent����������ָ���¼���
//����owner���¼��������ߣ�eventType���¼������ͣ�eventArgs���¼�����
function dispatchEvent(owner, eventType, eventArgs)
{
	if(owner && owner["on"+eventType])
		setTimeout(function(){owner["on"+eventType](eventArgs)}, 1);
}
//����һ���������������������һ������Ϊlen�����0-1����
function randomSerials(len)
{
	function randomSignal()
	{
		return Math.random() > 0.5 ? 1 : 0;
	}
	var ret = [];
	for(var i = 0; i < len; i++)
	{
		//���������0-1�ź�
		ret.push(randomSignal());
	}
	return ret;
}
//����һ�����ϵͳ���ͣ�oblΪϵͳ�������źŵĳ��ȣ�����
function Differ(obl)
{
	//�����źŻ���
	var buffer = new Array(obl);
	//ʱ��
var time = 0;
	
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
	
	//���ź�����������ϵͳ
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
					//����һ���źŸı��¼������������У�ʱ���˲ʱ�Ļ���ֵ��Ϊ����
					dispatchEvent(this, "signalchange", 
{input:serials, time:time, buffer:buffer.slice(0)});
		}
	}
}

//����һ������Ϊ20�����0-1����
var inputSerials = randomSerials(20);
alert(inputSerials);
//����һ������Ϊ20�Ĳ��ϵͳ
var diff10 = new Differ(20);
//���ź�������ϵͳ
diff10.input(inputSerials);
//�鿴���յ����
alert(diff10.readBuffer());

//ע��onsignalchange�¼�
diff10.onsignalchange = function(eventArgs)
{
	//���¼�����ʾ�źų��ֵ�ʱ��
	alert(eventArgs.time);
}
//�ٴ������źţ��۲��¼�����
diff10.input(inputSerials);
