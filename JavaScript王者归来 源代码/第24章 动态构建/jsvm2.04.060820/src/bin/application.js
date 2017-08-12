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
| 2005-12-06 | Fixed some bugs,for example:window.onload,document.onkeydown.  |
| 2006-02-09 | Setted Mainframe application attribute to 'yes' and fixed      |
|            | run method, window_onload function.                            |
| 2006-02-20 | Removed the lisenter of window onbeforeunload event.           |
| 2006-03-05 | Changed the 'webforms' variable to a normal object.            |
| 2006-05-22 | Removes some event listeners of the application page.          |
| 2006-05-25 | Changed the application disengage the js.lang.System class.    |
|-----------------------------------------------------------------------------|
| Created 2005-01-02 | All changes are in the log above. | Updated 2006-05-25 |
\----------------------------------------------------------------------------*/

/**
 * JSVM, core module
 * @file:	application.js
 * @function:	initialize application runtime environment
 * @author:	Wan Changhua
 * @date:	2005.01.02
 *
 */

_JSVM_Namespace.runtimeEnvironment.loadModule("application", function()

{

	var jsre = _JSVM_Namespace.runtimeEnvironment, JSVM = jsre.JSVM;

window.application = new function()
{

	this.title = "Web Application";
	this.main = "url(" + jsre.jsvmHome + "/bin/res/__web.htm)";
	this.moduleUrl = "off";
	this.mainFrame = null;
	this.state = 0;
	
	var isIe = (jsre.navigator == "ie");
	var isMoz = (jsre.navigator == "moz");

	/**
	 * for IE platform:
	 * System can't catch the exception
	 * from anther window
	 */
	var shareProxyClassloader =
		isIe ?	new function ()
		{
			var classloader = JSVM.getClassloader();
			this.loadClass = function(name)
			{
				try	{
					return classloader.loadClass(name);
				}	catch(ex)	{
					JSVM.console.output("Application throw exceptions: ");
					ex.printStackTrace();
					return null;
				}
			}
			this.loadPackage = function(name)
			{
				try	{
					return classloader.loadPackage(name);
				}	catch(ex)	{
					ex.printStackTrace();
					return null;
				}
			}
			this.loadLib = function(obj)
			{
				try	{
					return classloader.loadLib(obj);
				}	catch(ex)	{
					ex.printStackTrace();
					return null;
				}
			}
		} : JSVM.getClassloader();

	this.getShareClassloader = function ()
	{
		return shareProxyClassloader;
	}

	// Get window & document handle
	this.getWindow = function()
	{
		return window;
	}
	this.getDocument = function()
	{
		return document;
	}
	this.live = function ()
	{
		return (window.closed == false);
	}

	// Get Current Application ContextPath
	var ctxpath = null;
	this.getContextPath = function ()
	{
		return (ctxpath != null) ? ctxpath :
			(ctxpath = document.URL.replace(/[^\\\/]*$/, ""));
	}

	// Get Parameter from URL
	this.getParameter = function (name)
	{
		var re = new RegExp("([\?]|&)(" + name + "=)([^&]*)");
		return re.test(window.location.search) ?
			unescape(RegExp.$3) : null;
	}

	// Define Properties
	var properties = {};
	this.setProperty = function (name, val)
	{
		properties[name] = val;
	}
	this.getProperty = function (name)
	{
		return properties[name];
	}

	// set property: main
	this.setMain = function(main)
	{
		this.main = main;
	}

	this.showMainForm = function(url)
	{
		this.mainFrame.location.href = url;
	}

	// application quit
	this.exit = function()
	{
		this.state = 2;
		window.opener = null;
		window.close();
	}

/**
	* @description: Application initialize:
	*		1.Create some share components.
	*		1.Create a full-frame (w/h:100%/100%) for WebContainer
	*		2.Default window event handle function
	*		3.Disable some System-Hotkey. example:F1,F5..
 	*/
	this.initialize = function()
	{
		var application = this;
		var tmpvar = null;
		this.main = jsre.config.getParameter("main");

		document.clear();
		if (isMoz && jsre.extModules.length > 0)
		{
			document.write('<body topmargin="0" leftmargin="0" bottommargin="0" rightmargin="0">'
				+ '<iframe frameborder="0" id="Mainframe" name="Mainframe" '
				+ 'style="width:100%;height:100%"></iframe></body>');
		}
		else
		{
			document.write('<frameset rows="*"><frame application="yes" frameborder="0"'
				+ ' id="Mainframe" name="Mainframe" scrolling="yes" /></frameset>');
		}

		var window_onload = function()
		{
			application.mainFrame = window.Mainframe;
			if (/^url\((.*)\)$/.test(application.main))
			{
				application.showMainForm(RegExp.$1);
			}
			else if (/^class\((.*)\)$/.test(application.main))
			{
				try
				{
					var mainClass= RegExp.$1;
					var args = (location.hash == "") ? [] : 
						location.hash.substring(1).split("&");
					for (var i = 0 ; i < args.length; i++)
					{
						args[i] = unescape(args[i]);
					}
					Class.forName(mainClass).main(args);
				}
				catch (ex)
				{
					JSVM.console.output("application main-class run error: "
						+ ex.toString());	
				}
			}
		}
		
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
			window.attachEvent("onload", window_onload);
			document.attachEvent("onkeydown", 
				doc_onkeydown);
		}
		else
		{
			window.addEventListener("load", window_onload, false);
			document.addEventListener("keydown", 
				doc_onkeydown, false);
		}
		this.state = 1;
	}

}

// initialize application
application.initialize();

});