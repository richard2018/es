function List()
{
	var m_elements = []; //私有成员，在对象外无法访问
	
	m_elements = Array.apply(m_elements, arguments);
	
	//公有属性，可以通过“.”运算符或下标来访问
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
