function List()
{
	var m_elements = []; //˽�г�Ա���ڶ������޷�����
	
	m_elements = Array.apply(m_elements, arguments);
	
	//�������ԣ�����ͨ����.����������±�������
	this.length = {
		valueOf:function(){
			return m_elements.length;
		},
		toString:function(){
			return m_elements.length;
		}
	}

	this.toString = function()
	{
		return m_elements.toString();
	}

	this.add = function()
	{
		m_elements.push.apply(m_elements, arguments);
	}
}
