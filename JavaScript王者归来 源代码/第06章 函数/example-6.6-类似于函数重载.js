function Point()
	{
		if(arguments.length == 0){		//如果没有传实参
			this.x = 0;
			this.y = 0;   //默认的x、y属性都设为0
	}
	else if(arguments.length < 2){  //如果实参数量少于2 
		var p = arguments[0]; 
		if(p instanceof Point){  //判断实参类型如果为Point，那么执行属性拷贝
			this.x = p.x;
			this.y = p.y;
		}
		else if(typeof p == "number" || p instanceof Number){  
	//如果是数值，那么这个值作为当前Point的x属性值，而y属性值为默认0
			this.x = Number(p);
			this.y = 0;
		}
		else
			throw new TypeError("参数类型错误！"); 
	//如果这个参数既不是Point又不是Number，抛出类型错误异常
	}
	else if(arguments.length == 2)
	{
		var x = arguments[0];
		var y = arguments[1];
		//否则当参数数量为两个并且为Number类型的时候，把它们分别作为
		//Point的x属性和y属性的值
		if((typeof x == "number" || x instanceof Number) && 
	(typeof y == "number" || y instanceof Number)){
	this.x = x;
	this.y = y;
				}
				else
					throw new TypeError("参数类型错误！");
	}
	else
		throw new typeError("参数类型错误！");
}
