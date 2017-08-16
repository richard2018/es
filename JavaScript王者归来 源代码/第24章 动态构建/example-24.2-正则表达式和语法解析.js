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

	//���� jsharp ������
	JSVM.getCompiler().setParser("jsharp", new function()
		{
			//����������ʽ����
			//ƥ�����ֿռ�
			var regExp_ns = /(^|\s|;|})(\s*)(namespace)(\s+)((\w+)(\.\w+)*)(\s*)/;	
			//ƥ��usingָ��
			var regExp_using = /(^|\s|;|})(\s*)(using)(\s+)((\w+\.)*(\w+))(\s*)/g;
			//ƥ��class����
			var regExp_class = /(^|\s|;|})(\s*)(class)(\s+)(\w*(\.\w*)*)((\s+):(\s+)(\w*(\.\w*)*))?(\s*)\(/;
			//ƥ��base�ķ�
			var regExp_base = /([^A-Za-z0-9_\$]+)base([^A-Za-z0-9_\$]+)/g;
			//ƥ��ע��
			var regExps_comments = [/(\s|^)+\/\/([^\n\r])*/g, /(\/\*)\/?(([^\*]\/)|[^\/])*(\*\/)/g];
			//ƥ��ʹ����ַ�������
			var regExps_strings = [/("(\\"|[^"\n\r]|(\\\r\n))*")/g, /('(\\'|[^'\n\r]|(\\\r\n))*')/g];
			var strings_tmpPrefix = "${COMPILE_CONST_" + new Date().getTime();
			var strings_tmpSuffix = "}";

			this.parse = function(code)
			{
				//��ʱ�滻���ַ�������������ַ������ݶ�ƥ��ͽ�������Ӱ��
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
				//���ǵ�֮ǰ����Ҳ�ᵽ��һ�����������Ǹ�����������JSVM���﷨
				//����������������ƣ�ֻ����������JSharp���﷨
				//ǰ���ǽ��ַ��������滻����������������ƥ�����滻������﷨
				//�Ӷ������Ϸ���JavaScript����
				for (var i = 0; i < constStrs.length; i++)
				{
					code = code.replace(constStrs[i],
						(strings_tmpPrefix + i + strings_tmpSuffix));
				}
				// remove comments
				code = code.replace(regExps_comments[0], "");
				code = code.replace(regExps_comments[1], "");
				//�������ֿռ�����
				code = code.replace(regExp_ns, "$1_$package(\"$5\")");
				var packageName = RegExp.$5;
				//����usingָ��
				code = code.replace(regExp_using, "$1var $7 = _$import(\"$5\")");
				//����base�����ࣩ����
				code = code.replace(regExp_base, "$1$class.$super$2");
				//����class
				if (regExp_class.test(code))
				{
					//�ֱ�Գ������������������͸�����н����ʹ���
					//class�����������������Ķ�����
					//class core.system.Console [extends core.system.Base]
					//�������е�����Ϊ��ѡ
					
					//ƥ������
					var className = RegExp.$5;
					//ƥ�丸����
					var superName = RegExp.$7.replace(/(\s*):(\s+)/, "");
					//�������������������ֿռ������
					var shortClassName = className;
					
					//���½�������ƥ��ʹ���
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
					//�������
				}
//����û��ƥ�䵽class�ؼ���
				else	
				{
					//�׳��쳣
					throw new Exception(0x0081,	"JSVM jsharp-parser@compiler "
						+ "error: can't found keyword 'class'.");
				}
				//�ָ�����ʱ�滻�����ַ�������
				for (var i = 0; i < constStrs.length; i++)
				{
					code = code.replace((strings_tmpPrefix + i
					+ strings_tmpSuffix),	constStrs[i]);
				}
				//���ؽ�����Ĵ���
				return code;
			}
});
//ʵ��using������using��һ���������滻�ɶ���
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
