/*----------------------------------------------------------------------------\
|                                JSVM 2.0                                     |
|-----------------------------------------------------------------------------|
|                         Created by Wan.Changhua                             |
|                      (Email,MSN: wch3116@hotmail.com)                       |
|                      For JSVM Team (http://jsvm.org/)                       |
|-----------------------------------------------------------------------------|
| An object based javascript framework, targeted at rich web applications,    |
| JSVM (JavaScript Virtual Machine) is implemented in JavaScript. Currently   |
| only internet explorer 5.5 and later and firefox and opera are supported.   |
|-----------------------------------------------------------------------------|
|                   Copyright (c) 2004 - 2005 Homolo JSVM Team                |
|-----------------------------------------------------------------------------|
|                                                                             |
| BSD - FreeBSD Copyright Information License                                 |
|                                                                             |
| Permission is hereby granted, free of charge, to any person obtaining a     |
| copy of this software and associated documentation files (the "Software"),  |
| to deal in the Software without restriction, including without limitation   |
| the rights to use, copy, modify, merge, publish, distribute, sublicense,    |
| and/or sell copies of the Software, and to permit persons to whom the       |
| Software is furnished to do so, subject to the following conditions:        |
|                                                                             |
| The above copyright notice and this permission notice shall be included     |
| in all copies or substantial portions of the Software.                      |
|                                                                             |
| This software is provided "as is", without warranty of any kind, express or |
| implied, including  but not limited  to the warranties of  merchantability, |
| fitness for a particular purpose and noninfringement. In no event shall the |
| authors or  copyright  holders be  liable for any claim,  damages or  other |
| liability, whether  in an  action of  contract, tort  or otherwise, arising |
| from,  out of  or in  connection with  the software or  the  use  or  other |
| dealings in the software.                                                   |
|                                                                             |
|-----------------------------------------------------------------------------|
| Dependencies: ../../jsre.js, ../../rtenv.conf, ../*.js                      |
|-----------------------------------------------------------------------------|
| 2005-01-02 | Created by Wan Changhua.                                       |
|-----------------------------------------------------------------------------|
| Created 2006-01-17 | All changes are in the log above. | Updated 2006-01-17 |
\----------------------------------------------------------------------------*/

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

	/* set jsharp paresr */
	JSVM.getCompiler().setParser("jsharp", new function()
		{
			// define RegExp variable
			// var regExp_ns = /(^|\s|;|})(\s*)(package)(\s+)((\w+\.)*(\w+))(\s*)/;
			var regExp_ns = /(^|\s|;|})(\s*)(namespace)(\s+)((\w+)(\.\w+)*)(\s*)/;
			var regExp_using = /(^|\s|;|})(\s*)(using)(\s+)((\w+\.)*(\w+))(\s*)/g;
			var regExp_class = /(^|\s|;|})(\s*)(class)(\s+)(\w*(\.\w*)*)((\s+):(\s+)(\w*(\.\w*)*))?(\s*)\(/;
			var regExp_base = /([^A-Za-z0-9_\$]+)base([^A-Za-z0-9_\$]+)/g;
			var regExps_comments = [/(\s|^)+\/\/([^\n\r])*/g, /(\/\*)\/?(([^\*]\/)|[^\/])*(\*\/)/g];
			var regExps_strings = [/("(\\"|[^"\n\r]|(\\\r\n))*")/g, /('(\\'|[^'\n\r]|(\\\r\n))*')/g];
			var strings_tmpPrefix = "${COMPILE_CONST_" + new Date().getTime();
			var strings_tmpSuffix = "}";

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
				for (var i = 0; i < constStrs.length; i++)
				{
					code = code.replace(constStrs[i],
						(strings_tmpPrefix + i + strings_tmpSuffix));
				}
				// remove comments
				code = code.replace(regExps_comments[0], "");
				code = code.replace(regExps_comments[1], "");
				// proc namespace
				code = code.replace(regExp_ns, "$1_$package(\"$5\")");
				var packageName = RegExp.$5;
				// proc using
				code = code.replace(regExp_using, "$1var $7 = _$import(\"$5\")");
				// proc base
				code = code.replace(regExp_base, "$1$class.$super$2");

				if (regExp_class.test(code))
				{
					var className = RegExp.$5;
					var superName = RegExp.$7.replace(/(\s*):(\s+)/, "");
					var shortClassName = className;
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
				}
				else
				{
					throw new Exception(0x0081,	"JSVM jsharp-parser@compiler "
						+ "error: can't found keyword 'class'.");
				}
				// restore string constant
				for (var i = 0; i < constStrs.length; i++)
				{
					code = code.replace((strings_tmpPrefix + i
					+ strings_tmpSuffix),	constStrs[i]);
				}
				return code;
			}
		});

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
});