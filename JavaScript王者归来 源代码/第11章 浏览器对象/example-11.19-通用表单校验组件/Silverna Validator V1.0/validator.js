//@require /js/core/attribute.js

function Validate(pattern,msg)  //ValidateAttribute 对象定义

{
	this.patternName = pattern;
	this.message = msg;
}Validate.prototype = new Attribute();
function ValidateAttribute(pattern,msg)
{
	return new Validate(pattern,msg);
}
function ValidatePack(target,validate,checkValue) //未能通过校验的对象
{
	this.target = target;
	this.validate = validate;
	this.checkValue = checkValue;
	
	ValidatePack.prototype.getMessage = function()
	{
		var msg = "";
		
		if(this.target.tag != null)
		{
			msg += "\"" + this.target.tag + "\" ";
		}
		else
		{
			msg += "\"" + this.target.name + "\" ";
		}
		if(this.checkValue == true)
		{
			msg += "必须"+ this.validate.message + "！";
		}
		else if(this.checkValue == false)
		{
			msg += "不能"+ this.validate.message + "！";
		}
		else if(!isNaN(this.checkValue))
		{
			msg += this.validate.message + "限制为" + this.checkValue + "！";
		}
		else
			msg += this.validate.message + "(" + this.checkValue + ")";		
			
		return msg;
	}
}

function ValidateEventArgs()
{
	this.results = new Array();
	this.checkedObjects = new Array();
	
	ValidateEventArgs.prototype.getResult = function()
	{
		var msg = "";
		
		for (var i = 0; i < this.results.length; i++)
		{
			msg += this.results[i].getMessage() + "\n";
		}
		return msg;
	}	
}


function Validator()
{
	//用来存放校验结果的堆栈
	this.validateResult = new ValidateEventArgs(); //new Array();
	//用来存放已检验对象的队列
	this.checkObjects = new Array();
	
	Validator.prototype.checkPassedEvent = function(sender, event)
	{
		if (sender.onCheckPassed != null) return eval(sender.onCheckPassed);
		else return this.onCheckPassed(sender,event);
	};
	//校验失败事件
	Validator.prototype.checkFailedEvent = function(sender,event)  
	{
		if (sender.onCheckFailed != null) return eval(sender.onCheckFailed);
		else return this.onCheckFailed(sender,event);
	};
	
	//校验未通过的对象保存在参数e中传送到此处进行处理（可重载）
	Validator.prototype.onCheckFailed = function(form,e)
	{
		var messageContainers = "";

		if(form == null)
			messageContainers = document.getElementsByTagName("span");
		else
			messageContainers = form.document.getElementsByTagName("span");
		var showOnPage = false;
		for (var i = 0; i < messageContainers.length; i++)
		{
			if (form == null || messageContainers[i].formName == form.name)
			{
				messageContainers[i].innerText = e.getResult().replace(/\n\r/g,"<br/>");
				messageContainers[i].style.display = "block";
				showOnPage = true;
			}
		}
		if(!showOnPage)	alert(e.getResult());
		try{
			e.results[0].target.focus();
			e.results[0].target.value = e.results[0].target.value;
		}
		catch(e){}
		finally{return false;}
	}
	//校验成功
	Validator.prototype.onCheckPassed = function(form,e)
	{
		return true;
	}
	
	//form或者dom对象列表...
	Validator.prototype.check = function(oElement)
	{
		if(oElement == null || (oElement.nodeType == 1 && oElement.tagName.toLowerCase() == "form"))
		{
			return this._form_check(oElement);
		}
		else
		{
			return this._dom_check(arguments);
		}
	}
	
	//对一般元素进行校验
	Validator.prototype._dom_check = function(elements)
	{
		this.validateResult = new ValidateEventArgs();

		this.__validate(elements);

		if (this.validateResult.results.length > 0)
			return this.checkFailedEvent(elements, this.validateResult);
		else
			return this.checkPassedEvent(elements, this.validateResult);
	}
	//对页面表单的input,select,textarea域进行校验
	Validator.prototype._form_check = function(form)
	{
		this.validateResult = new ValidateEventArgs();
		
		var InputList = null;
		var SelectList = null;
		var TextareaList = null;

		if(form == null)
		{
			InputList = document.getElementsByTagName("input");
			SelectList = document.getElementsByTagName("select");
			TextareaList = document.getElementsByTagName("textarea");
		}
		else
		{
			InputList = form.document.getElementsByTagName("input");
			SelectList = form.document.getElementsByTagName("select");
			TextareaList = form.document.getElementsByTagName("textarea");
		}
		
		this.__validate(InputList,form); 
		this.__validate(SelectList,form); 
		this.__validate(TextareaList,form);
		
		if (this.validateResult.results.length > 0)
			return this.checkFailedEvent(form, this.validateResult);
		else
			return this.checkPassedEvent(form, this.validateResult);
	};
	Validator.prototype.__validate = function(list,form)
	{
		var retVal = true;

		for (var i = 0; i < list.length; i++)
		{
			if((form == null || list[i].form == form) && list[i].ValidatePatterns != null&&!list[i].disabled)
			{
				//获得校验标记（组）
				this.validateResult.checkedObjects.push(list[i]);
				var patternList = eval("[\""+list[i].ValidatePatterns.replace(/[|;]/g,"\",\"")+"\"]");
				var bTest = true;
				
				for (var j = 0; bTest && j < patternList.length; j++) 
				{
					var patternName = patternList[j].split(/[=:]/)[0];
					var checkValue = patternList[j].split(/[=:]/)[1] != null?eval(patternList[j].split(/[=:]/)[1]):true;
					for (each in this)  //执行校验
					{
						if(bTest && this[each].__attributes != null)
						{
							if(this[each].__attributes["Validate"].patternName == patternName)
							{
								if(!this[each].call(this,list[i],checkValue)) //调用校验方法
								{
									//alert(this[each].__attributes["Validate"].message);
									this.validateResult.results.push(new ValidatePack(list[i], 
											this[each].__attributes["Validate"],checkValue));
									retVal = false;
									bTest = false;
									break;
								}
							}
						}
					}
				}
			}
		}
		return retVal;
	};
	//以下添加实际的校验方法
	[Validate("Empty","为空")]
	Validator.prototype.isAllowEmpty = function(attribute,checkValue)
	{
	 	return checkValue ==  Validator.RegEmpty.test(attribute.value);

	};
	[Validate("Integer","为整数")]
	Validator.prototype.isInteger = function(attribute,checkValue)
	{
		return Validator.RegEmpty.test(attribute.value) 
				|| checkValue == Validator.RegInt.test(attribute.value);
	};
	[Validate("Number","为数值")]
	Validator.prototype.isNumber = function(attribute,checkValue)
	{
		return Validator.RegEmpty.test(attribute.value) 
				|| checkValue ==  Validator.RegFloat.test(attribute.value);
	};
	[Validate("Positive","大于0")]
	Validator.prototype.isPositive = function(attribute,checkValue)
	{
		return   this.isNumber(attribute,true) && (checkValue == (parseFloat(attribute.value) > 0));
	};
	[Validate("Negative","小于0")]
	Validator.prototype.isNegative = function(attribute,checkValue)
	{
		return this.isNumber(attribute,true)  && (checkValue == (parseFloat(attribute.value) < 0));
	};	
	[Validate("Money","为货币标准格式")]
	Validator.prototype.isMoney = function(attribute,checkValue)
	{
		return 	Validator.RegEmpty.test(attribute.value) 
				|| checkValue ==  Validator.RegMoney.test(attribute.value);
	};
	[Validate("CellPhone","为手机号码标准格式")]
	Validator.prototype.isCellPhone = function(attribute,checkValue)
	{
		return Validator.RegEmpty.test(attribute.value) 
				|| checkValue == Validator.RegCellPhone.test(attribute.value);
	};
	[Validate("Phone","为电话号码标准格式")]
	Validator.prototype.isPhone = function(attribute,checkValue)
	{
		return Validator.RegEmpty.test(attribute.value) 
				|| checkValue ==  (Validator.RegCellPhone.test(attribute.value) 
				|| Validator.RegSPhone.test(attribute.value)
				|| Validator.RegLPhone.test(attribute.value));
	};
	[Validate("Email","为Email标准格式")]
	Validator.prototype.isEmail = function(attribute,checkValue)
	{
		return Validator.RegEmpty.test(attribute.value) 
				|| checkValue ==  Validator.RegEmail.test(attribute.value);
	};
	[Validate("URL","为网页地址标准格式")]
	Validator.prototype.isURL = function(attribute,checkValue)
	{
		return Validator.RegEmpty.test(attribute.value) 
				|| checkValue == Validator.RegURL.test(attribute.value);
	};
	[Validate("Date","为日期标准格式（yyyy-mm-dd）及有效日期")]
	Validator.prototype.isUDate = function(attribute,checkValue)
	{
		var text = attribute.value;
		if(Validator.RegEmpty.test(text))
			return checkValue ==  true;
		if(text.length!=10)
			return checkValue ==  false;
	
		var year=text.substring(0,4);
		var month=text.substring(5,7) - 1;
		var day=text.substring(8);
		var date=new Date(year,month,day);
		
		var newyear=date.getYear();
		if(newyear<1900) newyear=newyear+1900;
		var newmonth=date.getMonth()+1;
		var newday=date.getDate();
		newmonth = (newmonth <= 9 ? "0":"") + newmonth;
		newday = (newday <= 9 ? "0":"") + newday;
		var newdate=newyear+"-"+newmonth+"-"+newday;
		if(date=="NaN" || newdate!=text )
			return checkValue ==  false;
		return checkValue ==  true;
	};
	[Validate("MaxLength","最大长度")]
	Validator.prototype.isExceedMaxLength = function(attribute, checkValue)
	{
		return Validator.RegEmpty.test(attribute.value) 
				|| checkValue >= attribute.value.length;
	};
	[Validate("MinLength","最小长度")]
	Validator.prototype.isExceedMinLength = function(attribute, checkValue)
	{
		return Validator.RegEmpty.test(attribute.value) 
				|| checkValue <= attribute.value.length;
	};
	Attribute.useAttributes(Validator);
}
Validator.RegEmpty = /^[\s\n\r\t]*$/;
Validator.RegInt = /^([+-])?0|([1-9][0-9]*)$/;    //整数
Validator.RegFloat = /^([+-])?0|([1-9][0-9]*)([.][0-9]+)?$/;    //浮点数
Validator.RegMoney = /^([+-])?(0|[1-9][0-9]*)(.[0-9]{1,2})?$/; //货币
Validator.RegSPhone = /^[0-9]{6,8}([-][0-9]{1,6})?$/;  //电话号码（短）
Validator.RegLPhone = /^[0-9]{3,4}[-][0-9]{6,8}([-][0-9]{1,6})?$/;    //电话号码（长）
Validator.RegCellPhone = /^[0-9]{11}$/; //手机号码
Validator.RegEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;   //电子邮件
Validator.RegURL = /^http:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;  //网页地址

Validator.createInstance = function()
{
	return new Validator();
}

