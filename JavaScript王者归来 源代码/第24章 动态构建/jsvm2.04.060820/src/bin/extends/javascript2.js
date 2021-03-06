/**
 * The JavaScript2.0 Parser 1.5 for JSVM
 * Copyright (c) 2006 Akira Wu, Under BSD License
 * @Author: Akira Wu
 * @Date: 2006.05.19
 * @Since: JSVM 2.03
 
 * @Version: V1.5.1 
 * |2006-05-26 fixed a bug on constructor overloading in firefox.
 * |2006-05-31 add extern declaration keywords for application mode.
 * |2006-06-20 fixed a bug on Class.prototype.$implements.
 * |2006-06-20 add static/final/abstract identifiers for class declaration.
 * @Latest modified: 2006.06.24*/

_JSVM_Namespace.runtimeEnvironment.loadModule("extends/javascript2", function()

{
var Class = _JSVM_Namespace.kernel.Class;
var Object = _JSVM_Namespace.kernel.Object;

if(Class.prototype.$implements) return;

Class.prototype.$implements = function()
{
	for(var i = 0; i < arguments.length; i++)
	{
		var type = arguments[i];

		try
		{
			if (typeof(type) == "string")
			{
				type = _JSVM_Namespace.kernel.Class.forName(type);
			}
			var iter = type.newInstance(Class.__$implements$call__);
			for (var each in iter)
			{
				var obj = iter[each];
				if(typeof(obj) == "function")
				{
					this.prototype[each] = obj;
				}
			}
			this.$interfaces = this.$interfaces || [];
			this.$interfaces.push(type);
		}
		catch(ex)
		{
			throw new Exception(0x0018, "Class.$implements(type...) fail.", ex);
		}
	}
	return this.prototype;
}

Class.__$implements$call__ = Class.__$extends$call__ = {};

Class.prototype.$extends = function(clz)
{
	try
	{
		if (typeof(clz) == "string")
		{
			clz = Class.forName(clz);
		}
		if (typeof(clz) != "function")
		{
			throw new Exception(0x0017, "class.$extends(Class) error:"
				+ " the super class '" + clz + "' is an invalid class.");
		}
		this.prototype = new clz(Class.__$extends$call__);
		this.$class = this.prototype.constructor = this;
		this.$super = clz;
		return this.prototype;
	}
	catch(ex)
	{
		throw new Exception(0x0018, "class.$extends(Class) fail.", ex);
	}
}

Object.prototype.$convert = function(asType)
{
	try{
		var ret = null;

		if(typeof(this.convert) == "function")
		{
			ret = this.convert(asType);
		}
		if(ret != null)
		{
			return ret;
		}

		ret = new asType();

		var obj = Class.forName("js.lang.Cloneable").cloneObject(this);

		for(var each in ret)
		{
			if(!/^((prototype$)|(window$)|(\_*\$))/.test(each) && typeof(ret[each]) != "function")
			{
				ret[each] = obj[each];
			}
		}

		return ret;
	}
	catch(ex)
	{
		return null;
	}
}
Object.$typeof = function(obj, shortName)
{
	if(obj && obj.getClass)
	{
		if(shortName)
		{
			var ret = obj.getClass().getName().split(/\./g);
			return ret[ret.length - 1];
		}
		else 
		{
			return obj.getClass().getName();
		}
	}
	else if(obj instanceof Array)
	{
		return "array";
	}
	else 
	{
		return typeof(obj);
	}
}

 var jsre = _JSVM_Namespace.runtimeEnvironment, JSVM = jsre.JSVM;;
 var Exception = _JSVM_Namespace.kernel.Exception;

 /* set javascript2 paresr */
 JSVM.getCompiler().setParser("javascript2", new function()
  {
   // define RegExp variable
   var regExp_import_short = /(^|\s|;|})(\s*)(import)(\s+)((\w+\.)*(\w+))(\s*)/g;
   var regExp_import_long = /(^|\s|;|})(\s*)(import)(\s+)((\w+)\s*=\s*)((\w+\.)*(\w+))(\s*)/g;
   var regExp_class = /(^|\s|;|}\s*)(public\s+|internal\s+|private\s+)?(static|abstract|final)?\s*(\n\r\s*)*class\s+(\w+)(\s+extends\s+[\w.]+)?(\s+implements\s+([\w.]+)(\s*,\s*[\w.]+)*)?(\s*)/;
   var regExp_interface = /(^|\s|;|}\s*)(public\s+|internal\s+|private\s+)?(interface)(\s+\w+)/g;
   var regExp_super = /([^A-Za-z0-9_\$]+)super([^A-Za-z0-9_\$]+)/g;
   
   //property Attributes
   var regExp_property = /(public|private)(\s+)(static)?\s*(\n\r\s*)*var([^;]*;)/;

   //function Attributes
   var regExp_function = /(public|private)(\s+)(static|override)?(\s*)(\n\r\s*)*(function)(\s+)(\w+)(\s*)/;

   var regExp_const = /(const)(\s+)(\w+)(\s*)(=)(\s*)(\n\r\s*)*(\w+);/;

   var regExps_comments = [/(\s|^)+\/\/([^\n\r])*/g, /(\/\*)\/?(([^\*]\/)|[^\/])*(\*\/)/g];
   var regExps_strings = [/("(\\"|[^"\n\r]|(\\\r\n))*")/g, /('(\\'|[^'\n\r]|(\\\r\n))*')/g];

   var strings_tmpPrefix = "${COMPILE_CONST_" + new Date().getTime();
   var strings_tmpSuffix = "}";
   
   var regExp_package = /(^|\s|;|})(\s*)(package)(\s+)((\w+)(\.\w+)*)(\s*)/;

   var regExp_asExpr = /((\w+\.)*(\w+))(\s+)as(\s+)((\w+\.)*(\w+))/g;

   var regExp_ass = /(get|set)(\s+)(\w+)/g;

   var regExp_overload = /(public|private)?(\s+static)?(\s*)(\n\r\s*)*(function)(\s+)(\w+)\(\s*((\.\.\.)|(void)|(([\w]*\:[\w.]+)\s*(\,\s*([\w]*\:[\w.]+))*))\s*\)/;
   var regExp_event = /(public|private)(\s+)(event)/g;

   var regExp_extern = /(extern)(\s+)(var|function)?\s*(\n\r\s*)*([\$\w]+);/;
   var regExp_override = /(abstract)(\s*)(\n\r\s*)*(function)(\s+)(\w+)(\(.*\))/g;

   this.parse = function(code)
   {
    // store string constant
    var constStrs = [];
    var tmpStrs = code.match(regExps_strings[0]);
    if (tmpStrs != null)
    {
     constStrs = constStrs.concat(tmpStrs);
    }
    var tmpStrs = code.match(regExps_strings[1]);
    if (tmpStrs != null)
    {
     constStrs = constStrs.concat(tmpStrs);
    }

    // remove comments
    code = code.replace(regExps_comments[0], "");
    code = code.replace(regExps_comments[1], "");

    for (var i = 0; i < constStrs.length; i++)
    {
     code = code.replace(constStrs[i],
      (strings_tmpPrefix + i + strings_tmpSuffix));
    }

	var privateHandler = "var _$privateHandlerMap = {};";
	privateHandler += "var _$getCurrentPrivateHandler = function (){var hash =  this.hashCode();return (hash in _$privateHandlerMap) ? _$privateHandlerMap[hash] : (_$privateHandlerMap[hash] = {});};";

    // proc package
    code = code.replace(regExp_package, "$1_$package(\"$5\");"+privateHandler);
    var packageName = RegExp.$5;
    // proc import
    code = code.replace(regExp_import_long, "$1var $6 = $9 = _$import(\"$7\")");
    code = code.replace(regExp_import_short, "$1var $7 = _$import(\"$5\")");
    // proc super
    code = code.replace(regExp_super, "$1$class.$super$2");

	//getter and setter
	code = code.replace(regExp_ass, "function $1$3");
	
	//events
	code = code.replace(regExp_event,"$1 var");
	code = code.replace(regExp_interface, "$1$2abstract class$4");

	code = code.replace(regExp_override,"public function $6$7"
		+"{var NotSupportException = new Class.forName('js.lang.NotSupportException');throw new NotSupportException('method $6$7 must be overrided.');}");

    while (regExp_class.test(code))
    {
	 var defin = "if(arguments[0] == Class.__$extends$call__) return;";
	 var classType = RegExp.$3;
     var shortClassName = RegExp.$5;
     var superName = RegExp.$6;
	 var implementList = RegExp.$7;
     var className = packageName + "." + shortClassName;
     var classVisibility = RegExp.$2.replace(/\s+/g,"");
	 var superName = superName.replace(/\s+extends\s+/,"");
	 var implementList = implementList.replace(/\s+implements\s+/,"");
     
	 var subCode = code.split(/[^$]class\s+/g);

	 if(classType == "static")
	 {
		 defin += 
			 "var NotSupportException = new Class.forName('js.lang.NotSupportException');throw new NotSupportException('static class ' + this.getClass().getName()+ ' cannot be instantiated.');";
	 }
	 else if(classType == "abstract")
	 {
		 constStrs.push("abstract class or interface");
		 defin += 
			 "var NotSupportException = new Class.forName('js.lang.NotSupportException');throw new NotSupportException('"+strings_tmpPrefix + (constStrs.length - 1) + strings_tmpSuffix+" ' + this.getClass().getName()+ ' cannot be instantiated.');";
	 }
	 else if(classType == "final")
	 {
		 defin = "if(arguments[0] == Class.__$extends$call__){var NotSupportException = new Class.forName('js.lang.NotSupportException');throw new NotSupportException('final class ' + this.getClass().getName()+ ' cannot be inherited.');}"+defin;
	 }

     var str = "\r\nvar $class = ";
	 if(classVisibility == "public")
	 {
		str += className + " = ";
	 }


	 str += "function(){return " + "$" 
      + shortClassName + ".apply(this,arguments);};\r\n"
      + "var " + shortClassName + " = $class;\r\n";
     if (superName == "")
     {
      str += "$class.$extends(_JSVM_Namespace.kernel.Object);";
     }
     else
     {
      str += "$class.$extends(" + superName + ");";
     }
	 str += "$class.$implements(" + implementList + ");";

	 var overloaded = {};
	 while (regExp_overload.test(subCode[1]))
	 {
		 var pre = RegExp.$1 + RegExp.$2 + " " + RegExp.$5 + " " + RegExp.$7;
		 var name = RegExp.$7;
		 var scode = "";
		 var args = RegExp.$8;
		 var idx = [];
		 var arg = [];
		 
		 if(args == "void")
			 idx.push("void");
		 else if(args == "...")
		 {
			 idx.push("...");
			 args = "";
		 }

		 else
		 {
			 args = args.split(/,/g);
			 
			 for(var i = 0; i < args.length; i++)
			 {
				var pair = args[i].replace(/\s+/g,"").split(/\:/g);
				idx.push(pair[1]);
				if(pair[0] != "") arg.push(pair[0]);
			 }
		 }

		 if(!overloaded[name])
		 {
			 overloaded[name] = true;
		     scode += pre + "(){var argstr = arguments.length > 0?'':'void'; var largstr = arguments.length > 0?'':'void'; for (var i = 0; i < arguments.length; i++){ argstr+=_JSVM_Namespace.kernel.Object.$typeof(arguments[i],true).replace(/\\./g,'');largstr+=_JSVM_Namespace.kernel.Object.$typeof(arguments[i]).replace(/\\./g,'');}try{if(_$"+name+ "[argstr.toLowerCase()]) return _$"+name+"[argstr.toLowerCase()].apply(this, arguments); else if(_$"+name+"[largstr.toLowerCase()]) return _$"+name+"[largstr.toLowerCase()].apply(this, arguments); else return _$"+name+"['...'].apply(this,arguments);}catch(ex){var ArgumentException = new Class.forName('js.lang.ArgumentException');throw new ArgumentException('class ' + this.getClass().getName()+ ' method "+name+" overloading failed.');}};var _$"+name+"={};";
		 }

		 idx = idx.join("").toLowerCase();
		 subCode[1] = subCode[1].replace(regExp_overload, scode + ";_$" + name + "['" + idx + "']=function("+arg.join(",")+")");
		 //alert(subCode[1]);
	 }

	 //externs
	 while(regExp_extern.test(subCode[1]))
	 {
		 var property = RegExp.$5;

		 var stuff = "(application.externDomain ? application.externDomain(this) : {})." + property;
 		 property = property != "$" ? property : "\\$";
		
		 var regExt = new RegExp("([^\\.\\s\\n\\r\\w])(\\s*)(\\n\\r\\s)*("+property+")(?!(\\w)|({COMPILE_CONST_)|((\\s*)(\\n\\r\\s)*\\:))","g");
		 subCode[1] = subCode[1].replace(regExp_extern, "%<####>%"); //take pos...
		 subCode[1] = subCode[1].replace(regExt, "$1$2"+stuff);
		 subCode[1] = subCode[1].replace(/\%\<\#\#\#\#\>\%/g, "");
	 }
	 //members
	 while (regExp_property.test(subCode[1]))
	 {
		var visibility = RegExp.$1;
		var ctype = RegExp.$3;
		var property = RegExp.$5;
		var propertyName = property.split(/=/)[0].replace(/(^[\s\n\t\r]*)|([;\s\n\r\t]*$)/g, "");

		if(ctype != "static")
		{
			if(visibility == "public"){
				defin += "this." + property;
			}
			else{
				defin += "_$getCurrentPrivateHandler.call(this)." + property;
				var regProp = new RegExp("this\\.(\\s*)((\\r\\n)(\\s*))*"+propertyName+"(?!\\w+)","g");
				subCode[1] = subCode[1].replace(regProp,"_$getCurrentPrivateHandler.call(this)." + propertyName);
			}
			subCode[1] = subCode[1].replace(regExp_property, "");
		}
		else if(ctype == "static")
		{
			if(visibility == "public"){
				subCode[1] = subCode[1].replace(regExp_property, shortClassName + "." + property);
			}
			else 
			{
				var regProp = new RegExp(shortClassName+"\\.(\\s*)((\\r\\n)(\\s*))*"+propertyName+"(?!\\w+)","g");
				subCode[1] = subCode[1].replace(regProp, "_$" + visibility + shortClassName + "." + propertyName);
				var regDes = "_$" + visibility + shortClassName + "." + property;
				regDes = "var _$" + visibility + shortClassName + "={};" + regDes;
				subCode[1] = subCode[1].replace(regExp_property,regDes);
			}
		}
	 }
	 
	 while (regExp_function.test(subCode[1]))
	 {
		var visibility = RegExp.$1;
		var ctype = RegExp.$3;
		var name = RegExp.$8.replace(/(^[\s\n\t\r]*)|([\s\n\r\t]*$)/g, "");

		if(ctype != "static")
		{
			if(visibility == "public"){
				subCode[1] = subCode[1].replace(regExp_function, shortClassName + ".prototype." + name + "=function");
			}
			else
			{
				var funName = "_$" + visibility + shortClassName + "_" + name;

				subCode[1] = subCode[1].replace(regExp_function, "var " + funName + "=function");
				var regProp = new RegExp("this\\.(\\s*)((\\r\\n)(\\s*))*" + name + "(?!\\w+)","g");
				subCode[1] = subCode[1].replace(regProp, "(function(obj){return function(){return "+ funName + ".apply(obj,arguments);};})(this)");
			}
		}
		else if(ctype == "static")
		{
			if(visibility == "public"){
				subCode[1] = subCode[1].replace(regExp_function, shortClassName + "." + name + "=function");
			}
			else
			{
				var funName = "_$" + visibility + shortClassName + "_static"+ name;
				subCode[1] = subCode[1].replace(regExp_function, "var " + funName + "=function");
				var regProp = new RegExp(shortClassName+"\\.(\\s*)((\\r\\n)(\\s*))*"+name+"(?!\\w+)","g");
				subCode[1] = subCode[1].replace(regProp, "(function(obj){return function(){return "+ funName + ".apply(obj,arguments);};})("+shortClassName+")");
			}
		}
	 }
	 while (regExp_const.test(subCode[1]))
	 {
		 var name = RegExp.$3;
		 var value = RegExp.$8;
		 var regExp = new RegExp(shortClassName + "." + name + "(?!\\w+)", "g");
		 subCode[1] = subCode[1].replace(regExp, value);
		 subCode[1] = subCode[1].replace(regExp_const, "");
	 }
	 //constructors
	 var regExp_con = new RegExp("function "+shortClassName + "\\((.*)\\)(\\s*)((\\r\\n)(\\s*))*{");
	 
	 var addition = "";

	 if(regExp_con.test(subCode[1]))
	 	 subCode[1] = subCode[1].replace(regExp_con,  "$" + shortClassName + " = function($1){" + defin);
	 else
		 addition = "$" + shortClassName + "= function(){" + defin + ";}";

	 code = subCode.join(" class ");
	 code = code.replace(regExp_class, "$1" + str);
	 code = code.replace(regExp_asExpr, "$1.$convert($6)");
	 code += addition;
    }

    // restore string constant
    for (var i = 0; i < constStrs.length; i++)
    {
     code = code.replace((strings_tmpPrefix + i
     + strings_tmpSuffix), constStrs[i]);
    }
    return code;
   }
  });
});

