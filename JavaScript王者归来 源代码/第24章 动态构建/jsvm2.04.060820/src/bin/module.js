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
|                    Copyright (c) 2004 - 2005 JSVM Team                      |
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
| Dependencies: ../jsre.js, ../rtenv.conf, ./*.js                             |
|-----------------------------------------------------------------------------|
| 2005-01-02 | Renamed filename to jsre.js and updated the version to 2.01.   |
| 2005-12-06 | Fixed some bugs,for example:window.onload,document.onkeydown.. |
| 2006-05-22 | Removes some event listeners of the module page.               |
|-----------------------------------------------------------------------------|
| Created 2005-01-02 | All changes are in the log above. | Updated 2006-05-22 |
\----------------------------------------------------------------------------*/

/**
 * JSVM, core module
 * @file:	module.js
 * @function:	init module runtime environment
 * @author:	Wan Changhua
 * @date:	2005.01.02
 *
 */


_JSVM_Namespace.runtimeEnvironment.loadModule("module", function()

{

var jsre = _JSVM_Namespace.runtimeEnvironment, JSVM = jsre.JSVM;
var Exception =	_JSVM_Namespace.kernel.Exception;

/* search application jsre */
var shareJsre = jsre.getParent();
while (shareJsre != null)
{
	if (shareJsre.mode == "application")
	{
		// define global variable: appliation
		window.application = shareJsre.window.application;
		break;
	}
	shareJsre = shareJsre.getParent();
}
if (window.application == null)
{
	throw new Exception(0x0061, "module must run under the application!");
}


/* Replace the default Classloader by ProxyClassloader */
JSVM.setClassloader(new function()
	{
		var shareClzloader = application.getShareClassloader();
		this.loadClass = function(name)
		{
			var err = null;
			try
			{
				var cls = shareClzloader.loadClass(name);
				if (cls != null)
				{
					return cls;
				}
			}
			catch(ex)
			{
				err = ex;
			}
			throw new Exception(0x002B,
					"module.js/proxy classloader.loadClass():"
					+ " class not found.", err);
		}

		this.loadPackage = function(name)
		{
			return shareClzloader.loadPackage(name);
		}
		this.loadLib = function (obj)
		{
			return shareClzloader.loadLib(obj);
		}

	});


/* Replace the default Container by ProxyContainer */

JSVM.setContainer(new function()
	{
		var selfContainer = JSVM.getContainer();
		var shareContainer = shareJsre.JSVM.getContainer();
		this.putClass = function(name, entity)
		{
			selfContainer.putClass(name, entity);
		}
		this.getClass = function(name)
		{
			return selfContainer.getClass(name);
		}
		/* ClassCode Cache */
		this.putClassCode = function(name, code)
		{
			shareContainer.putClassCode(name, code);
		}
		this.getClassCode = function(name)
		{
			return shareContainer.getClassCode(name);
		}
	});

/* Replace the default Compiler by ProxyCompiler */
JSVM.setCompiler(new function()
	{
		var compiler = shareJsre.JSVM.getCompiler();
		this.compile = function(code)
		{
			try
			{
				return compiler.compile(code);
			}
			catch (ex)
			{
				throw new Exception(0x002D,
					"module.js/proxy compiler.compile(): the "
						+ "share-jsre had destroyed.", ex);
			}
		}
		this.setParser = function() {}
	});

JSVM.setConsole(new function ()
	{
			var appConsole = shareJsre.JSVM.console;
			this.output = function (s)
			{
				appConsole.output(s);
			}
			this.input = function ()
			{
				return appConsole.input();
			}
	});

	window.web = new function ()
	{

		var application = window.application;
		this.state = 0;

		this.getWindow = function()
		{
			return window;
		}
		this.getDocument = function()
		{
			return document;
		}
		this.getApplication = function ()
		{
			return application;
		}
		this.live = function ()
		{
			return (window.closed == false);
		}
		this.close = function()
		{
			window.close();
		}

		this.initialize = function()
		{
			
			// run the thread of auto check application
			window.setInterval(function(){try{application.live();} 
				catch (ex) {window.close();}}, 1000);
					
			var doc_onkeydown = function (arg)
			{
				var evt = arg || event;
				if ((evt.ctrlKey && ",17,66,70,78,80,".indexOf(
							"," + evt.keyCode + ",") != -1)
					|| evt.keyCode == 116)
				{
					try { evt.keyCode = 0; } catch (ex) {}
					try { evt.returnValue = false; } catch (ex) {}
					try { evt.preventDefault(); } catch (ex) {}
				}
			}

			if (jsre.navigator == "ie")
			{
				document.attachEvent("onkeydown", doc_onkeydown);
			}
			else
			{
				document.addEventListener("keydown", 
					doc_onkeydown, false);
			}
			this.state = 1;
		}
	}

	web.initialize();

});