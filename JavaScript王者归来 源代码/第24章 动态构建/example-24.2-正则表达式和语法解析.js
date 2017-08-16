/**
 * JSVM, extend module
 * @file:	jsharp.js
 * @function:	load jsharp parser
 * @author:	Wan Changhua
 * @date:	2006.01.17
 *
 */

_JSVM_Namespace.runtimeEnvironment.loadModule("extends/jsharp", function()
{
	var jsre = _JSVM_Namespace.runtimeEnvironment, JSVM = jsre.JSVM;
	var Exception = _JSVM_Namespace.kernel.Exception;

	//设置 jsharp 解析器
	JSVM.getCompiler().setParser("jsharp", new function()
		{
			//定义正则表达式变量
			//匹配名字空间
			var regExp_ns = /(^|\s|;|})(\s*)(namespace)(\s+)((\w+)(\.\w+)*)(\s*)/;	
			//匹配using指令
			var regExp_using = /(^|\s|;|})(\s*)(using)(\s+)((\w+\.)*(\w+))(\s*)/g;
			//匹配class定义
			var regExp_class = /(^|\s|;|})(\s*)(class)(\s+)(\w*(\.\w*)*)((\s+):(\s+)(\w*(\.\w*)*))?(\s*)\(/;
			//匹配base文法
			var regExp_base = /([^A-Za-z0-9_\$]+)base([^A-Za-z0-9_\$]+)/g;
			//匹配注释
			var regExps_comments = [/(\s|^)+\/\/([^\n\r])*/g, /(\/\*)\/?(([^\*]\/)|[^\/])*(\*\/)/g];
			//匹配和处理字符串常量
			var regExps_strings = [/("(\\"|[^"\n\r]|(\\\r\n))*")/g, /('(\\'|[^'\n\r]|(\\\r\n))*')/g];
			var strings_tmpPrefix = "${COMPILE_CONST_" + new Date().getTime();
			var strings_tmpSuffix = "}";

			this.parse = function(code)
			{
				//暂时替换掉字符串常量，免得字符串内容对匹配和解析产生影响
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
				//还记得之前我们也提到过一个解析器，那个解析器解析JSVM的语法
				//这个解析器和它类似，只不过它解析JSharp的语法
				//前面是将字符串常量替换，后面是利用正则匹配来替换特殊的语法
				//从而产生合法的JavaScript代码
				for (var i = 0; i < constStrs.length; i++)
				{
					code = code.replace(constStrs[i],
						(strings_tmpPrefix + i + strings_tmpSuffix));
				}
				// remove comments
				code = code.replace(regExps_comments[0], "");
				code = code.replace(regExps_comments[1], "");
				//解析名字空间声明
				code = code.replace(regExp_ns, "$1_$package(\"$5\")");
				var packageName = RegExp.$5;
				//解析using指令
				code = code.replace(regExp_using, "$1var $7 = _$import(\"$5\")");
				//解析base（基类）声明
				code = code.replace(regExp_base, "$1$class.$super$2");
				//解析class
				if (regExp_class.test(code))
				{
					//分别对长类型名、短类型名和父类进行解析和处理
					//class定义是类似于这样的东西：
					//class core.system.Console [extends core.system.Base]
					//中括号中的内容为可选
					
					//匹配类名
					var className = RegExp.$5;
					//匹配父类名
					var superName = RegExp.$7.replace(/(\s*):(\s+)/, "");
					//短类名，即不包括名字空间的类名
					var shortClassName = className;
					
					//以下进行正则匹配和处理
					if (className.indexOf(".") == -1)
					{
						className = packageName + "." + className;
					}
					else
					{
							shortClassName = className.replace(/\w*\./g, "");
					}
					var str = "\r\nvar $class = "
						+ className	+	" = function(){return $"
						+ shortClassName + ".apply(this,arguments);};\r\n"
						+ "var " + shortClassName	+ " = $class;\r\n";
					if (superName == "")
					{
						str += "$class.$extends(_JSVM_Namespace.kernel.Object);";
					}
					else
					{
						str += "$class.$extends("	+ superName + ");";
					}
					str += "\r\nvar $" + shortClassName + " = function(";
					code = code.replace(regExp_class, "$1" + str);
					//处理完毕
				}
//假如没有匹配到class关键字
				else	
				{
					//抛出异常
					throw new Exception(0x0081,	"JSVM jsharp-parser@compiler "
						+ "error: can't found keyword 'class'.");
				}
				//恢复被暂时替换掉的字符串常量
				for (var i = 0; i < constStrs.length; i++)
				{
					code = code.replace((strings_tmpPrefix + i
					+ strings_tmpSuffix),	constStrs[i]);
				}
				//返回解析后的代码
				return code;
			}
});
//实现using方法，using把一个长域名替换成短名
window.using = function(name)
{
	try
	{
		var clazz = jsre.JSVM.loadClass(name);
		var shortName = name.replace(/(.*)\./, "");
		if ("undefined"	== typeof(window[shortName]))
		{
			window[shortName] = clazz;
		}
	}
	catch(ex)
	{
		ex.printStackTrace();
		throw ex;
	}
}
