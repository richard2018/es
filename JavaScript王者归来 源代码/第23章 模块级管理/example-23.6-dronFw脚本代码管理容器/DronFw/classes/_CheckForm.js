/*******************************************\
  通用表单验证类(2006-8-29)
  原作者：佚名	封装：Dron
\*******************************************/
DronFw.Class.CheckForm = function ()
{
	function GetValue(el)
	{
		function GetValueChoose(el)
		{
			var sValue = "";
			var tmpels = document.getElementsByName(el.name);
			for(var i=0;i<tmpels.length;i++)
			{
				if(tmpels[i].checked)
				{
					sValue += "0";
				}
			}
			return sValue;
		}
		function GetValueSel(el)
		{
			var sValue = "";
			for(var i=0;i<el.options.length;i++)
			{
				if(el.options[i].selected && el.options[i].value!="")
				{
					sValue += "0";
				}
			}
			return sValue;
		}
		var sType = el.type;
		switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "file":
			case "textarea": return el.value;
			case "checkbox":
			case "radio": return GetValueChoose(el);
			case "select-one":
			case "select-multiple": return GetValueSel(el);
		}
	}
	function GoBack(el)
	{
		var sType = el.type;
		switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "file":
			case "textarea": el.focus();var rng = el.createTextRange(); rng.collapse(false); rng.select();
			case "checkbox":
			case "radio": var els = document.getElementsByName(el.name);els[0].focus();
			case "select-one":
			case "select-multiple":el.focus();
		}
	}
	this.Check = function(oForm)
	{
		var els = oForm.elements;
		for(var i=0;i<els.length;i++)
		{
			if(els[i].check)
			{
				var sReg = els[i].check;
				var sVal = GetValue(els[i]);
				var reg = new RegExp(sReg,"i");
				if(!reg.test(sVal))
				{
					alert(els[i].warning);
					GoBack(els[i])  
					return false;
				}
			}
		}
	}
}
