function Point()
	{
		if(arguments.length == 0){		//���û�д�ʵ��
			this.x = 0;
			this.y = 0;   //Ĭ�ϵ�x��y���Զ���Ϊ0
	}
	else if(arguments.length < 2){  //���ʵ����������2 
		var p = arguments[0]; 
		if(p instanceof Point){  //�ж�ʵ���������ΪPoint����ôִ�����Կ���
			this.x = p.x;
			this.y = p.y;
		}
		else if(typeof p == "number" || p instanceof Number){  
	//�������ֵ����ô���ֵ��Ϊ��ǰPoint��x����ֵ����y����ֵΪĬ��0
			this.x = Number(p);
			this.y = 0;
		}
		else
			throw new TypeError("�������ʹ���"); 
	//�����������Ȳ���Point�ֲ���Number���׳����ʹ����쳣
	}
	else if(arguments.length == 2)
	{
		var x = arguments[0];
		var y = arguments[1];
		//���򵱲�������Ϊ��������ΪNumber���͵�ʱ�򣬰����Ƿֱ���Ϊ
		//Point��x���Ժ�y���Ե�ֵ
		if((typeof x == "number" || x instanceof Number) && 
	(typeof y == "number" || y instanceof Number)){
	this.x = x;
	this.y = y;
				}
				else
					throw new TypeError("�������ʹ���");
	}
	else
		throw new typeError("�������ʹ���");
}
