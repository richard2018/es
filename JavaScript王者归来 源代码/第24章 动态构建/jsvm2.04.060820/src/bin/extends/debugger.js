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
| 2006-05-25 | Created by Wan Changhua.                                       |
|-----------------------------------------------------------------------------|
| Created 2006-05-25 | All changes are in the log above. | Updated 2006-05-25 |
\----------------------------------------------------------------------------*/

/**
 * JSVM, extend module
 * @file:	debuger.js
 * @author:	Wan Changhua
 * @date:	2006.05.25
 */

_JSVM_Namespace.runtimeEnvironment.loadModule("extends/debugger", function()
{
	var jsre = _JSVM_Namespace.runtimeEnvironment, JSVM = jsre.JSVM;

	var Package = _JSVM_Namespace.kernel.Package;
	var Class = _JSVM_Namespace.kernel.Class;
	var Exception = _JSVM_Namespace.kernel.Exception;

	// set the debugsupport engine
	JSVM.setEngine(new function()
	{
		var engine = this;

		/* default API */

		var _$import = function(name)
		{
			return JSVM.loadClass(name);
		}
		var _$package = function(name)
		{
			engine.definePackage(name);
		}
			
		this.executor = new function()
		{
			/* Mask these variables */
			var jsre, JSVM, engine, typeOf, isPackage, isClass;
			this.execute = function(code)
			{
				eval(code);
			}
		}

		var typeOf = function(name)
		{
			try
			{
				return eval("typeof " + name);
			}
			catch (ex)
			{
				return "undefined";
			}
		}

		/* Check Package */
		var isPackage = function(name)
		{
			return (typeOf(name) == "object" &&
				(eval(name) instanceof Package));
		}
		/* Check Class */
		var isClass = function(name)
		{
			return (typeOf(name) == "object" &&
				(eval(name) instanceof Class));
		}

		var classLock = new function()
		{
			var lockeds = {};
			this.lock = function(name)
			{
				lockeds[name] = 1;
			}
			this.unlock = function(name)
			{
				lockeds[name] = 0;
			}
			this.isLocked = function(name)
			{
				return (lockeds[name] == 1);
			}
		}

		/* Define Class */
		this.defineClass = function(name, code)
		{
			if (classLock.isLocked(name))
			{
				throw new Exception(0x0013,
					"kernel.js/JSVM.engine.defineClass() fail. class: '"
					+ name +"' is locked.", ex);
			}
			classLock.lock(name);
			this.executor.execute(code);
			classLock.unlock(name);
			eval("var c=eval(name);c.prototype.$class=c;c.$name=name;");
			return c;
		}

		/* Define Package */
		this.definePackage = function(name)
		{
			if (isPackage(name))
			{
				return;
			}
			if (typeOf(name) == "undefined")
			{
				var idx = name.lastIndexOf(".");
				if (idx > -1)
				{
					this.definePackage(name.substring(0, idx));
				}
				return eval("window." + name
					+	"=new Package(name);");
			}
			throw new Exception(0x0014,
				"kernel.js/JSVM.engine.definePackage() fail. {'"
					+ name + "' has been defined.}");
		}
	});
	

	/* public method: load class */
	JSVM.loadClass = function(name)
	{
		var clazz = this.getContainer().getClass(name);
		if (clazz != null)
		{
			return clazz;
		}
		var code = this.getContainer().getClassCode(name);
		if (code == null)
		{
			code = this.getClassloader().loadClass(name);
			code = this.getCompiler().compile(code);
			this.getContainer().putClassCode(name, code);
		}
		clazz = this.getEngine().defineClass(name, code);
		this.getContainer().putClass(name, clazz);
		return clazz;
	}
	
	
});