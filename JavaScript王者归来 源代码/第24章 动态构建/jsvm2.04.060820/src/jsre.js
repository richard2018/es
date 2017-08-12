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
| Dependencies: ./rtenv.conf, ./bin/*.js                                      |
|-----------------------------------------------------------------------------|
| 2005-01-02 | Renamed filename to jsre.js and updated the version to 2.01.   |
| 2005-11-08 | Ignored error when Userdata is invalid.                        |
| ....         																																|
| 2006-03-05 | Updated the currentVersion property to "2.02.060305".          |
| 2006-05-15 | Added _JSVM_Namespace.runtimeEnvironment.loadModule method.    |
| 2006-05-22 | Fixed a bug about the extmodules property of module page.      |
| 2006-05-25 | Added _JSVM_Namespace object the destroy method.               |
| 2006-07-01 | Fixed a bug of the module's extmodules property.               |
|-----------------------------------------------------------------------------|
| Created 2005-01-02 | All changes are in the log above. | Updated 2006-07-01 |
\----------------------------------------------------------------------------*/

/**
 * Define JSVM Namespace and
 * JSVM Runtime Environment Variable
 * @file:	jsre.js
 * @author:	Wan Changhua
 * @date:	2006.05.17
 */

/*@cc_on @*/
/*@if (!@_jsvm_loaded) @*/

/* JSVM Namespace Object */

window._JSVM_Namespace = new function()
{
	/* Device Number */
	this.deviceNumber = 0x3116;

	/* JSVM Runtime Environment Object */
	this.runtimeEnvironment = new function()
	{
		this.currentVersion = "2.04.060820";
		this.navigator = "unknow";
		this.jsvmHome = ".";
		this.mode = "standalone";
		this.classpath = "";
		this.debug = false;

		this.window = window;
		this.element = null;
		this.parent = null;
		this.JSVM = null;
		this.resources = {};
		this.extModules = [];
		this.logs = [];
		this.state = 1;

		/* define interface */

		this.config = {
			getParameter : function(){}
		};
		this.live = function()
		{
			return (this.window.closed == false);
		}
		this.log = function(log)
		{
			this.logs[this.logs.length] = log;
		}
		this.getParent = function()
		{
			if (this.parent != null)
			{
				try
				{
					this.parent.live();
				}
				catch(ex)
				{
					this.parent = null;
				}
			}
			return this.parent;
		}

		var hasCache = true, ex;

		this.loadModule = function(name, module)
		{
			// if the state is not 1, then can't load any modules;
			if (this.state != 1)
			{
				throw "JSVM runtime-environment has crashed.";
			}

			var jsre = this, execEty = null;
			if (module != null)
			{
				execEty = function()	{
					module();	// module.call(this);
					jsre.setResource("$code{" + name + "}", module);
					return true;
				}
			}
			else
			{
				var code = null;
				if (hasCache && (code = jsre.getResource(
					"$code{" + name + "}")) != null)
				{
					execEty = function()	{
						eval("(" + code	+ ")();");
						return true;
					}
				}
				else
				{
					hasCache = false;
					execEty = function() {
						var tmpRes;
						document.write("<script language='javascript' src='"
							+ jsre.jsvmHome	+ "/bin/"
							+ (((tmpRes = jsre.config.getParameter(name))
								== null) ? (name + ".js") : tmpRes)
							+ "'></script>");
					}
				}
			}

			try
			{
				if (execEty())
				{
					this.log("JSVM runtime-environment load module '"
						+ name + "' succ.");
				}
			}
			catch (ex)
			{
				this.state = 0;
				this.log(ex);
				this.log("JSVM runtime-environment load module '"
					+ name + "' fail.");
			}
		}

		this.getResource = function(name)
		{
			return this.resources[name];
		}
		this.setResource = function(name, obj)
		{
			this.resources[name] = String(obj);
		}
		this.destroy = function ()
		{
			this.JSVM.destroy();
			this.element = null;
		}

	}

	/* Kernel Component */
	this.kernel = {};

	/* Development Kit */
	this.developmentKit = {};

	/* Plug-In */
	this.plugIn = {};

};

_JSVM_Namespace.initialize = function(element)
{

// begin of function
var ex, resTmp, tmp, p;

try
{

/* Define JSVM Runtime Environment Variable */
var jsre = this.runtimeEnvironment;
jsre.element = element;

jsre.log("JSVM runtime-environment initialize...");

var ua, jh, src, mode, debug;

/* jsre.navigator */
jsre.navigator = (/opera/i.test(ua = navigator.userAgent)) ?
	"opera" : ((/gecko/i.test(ua)) ? "moz" :
	((/msie/i.test(ua)) ? "ie" : "other"));

var getCFGAttribute = function(name)
{
	var attr = jsre.element.attributes[name];
	return (attr) ? attr.value : null;
}

/* jsre.mode [standalone|application|module|auto]*/

jsre.log("JSVM runtime-environment get system properties...");

jsre.jsvmHome = ((jh = getCFGAttribute("jsvm_home")) != null) ?
	jh : ((index = (src =getCFGAttribute("src")).replace(/\\/g,"/").lastIndexOf(
		"/")) == -1) ? "." : src.substring(0, index);

jsre.mode = ((mode = getCFGAttribute("mode")) == null) ?
	jsre.mode : (",standalone,application,module,auto,".indexOf(
		mode = mode.toLowerCase()) == -1) ?	jsre.mode : mode;

/* Search _JSVM_Namespace for parent */
if (jsre.mode == "module" || jsre.mode == "auto")
{
	var winHDL = window, pJsvmNs;
	while (true)
	{
		if ((pJsvmNs = (winHDL.opener != null
			&& winHDL.opener.closed == false && winHDL.opener._JSVM_Namespace)
					|| (winHDL.dialogArguments && winHDL.dialogArguments._JSVM_Namespace)
					|| (winHDL.dialogArguments && winHDL.dialogArguments.window
						&& winHDL.dialogArguments.window._JSVM_Namespace))
				&& pJsvmNs.runtimeEnvironment.mode == "application")
		{
			jsre.parent =	pJsvmNs.runtimeEnvironment;
			jsre.mode = "module";
			break;
		}
		if (winHDL == winHDL.parent &&
			winHDL.opener == null &&
				!(winHDL.dialogArguments &&
					winHDL.dialogArguments.window))
		{
			if (jsre.mode == "auto")
			{
				jsre.mode = "standalone";
			}
			break;
		}
		if (winHDL.parent.closed == false &&
			(pJsvmNs = winHDL.parent._JSVM_Namespace) != null &&
			pJsvmNs.runtimeEnvironment.mode == "application")
		{
			jsre.parent =	pJsvmNs.runtimeEnvironment;
			jsre.mode = "module";
			break;
		}
		winHDL = (((winHDL.parent != winHDL) ? winHDL.parent : null)
			|| winHDL.opener || (winHDL.dialogArguments
				&& winHDL.dialogArguments.window));
	}
}

if (jsre.mode != "module")
{
	/* jsre.classpath */
	jsre.classpath = ((cp = getCFGAttribute(
		"classpath"))	!= null) ? cp : "";

	/* jsre.debug */
	jsre.debug = ((debug = getCFGAttribute("debug")) != null
		&& (debug.toLowerCase()	== "true")) ? true : false;

	var rtInf = "";
	if (getCFGAttribute("configurable") == "on")
	{
		if (/ jsvm2Config=([^;]*)/.test(" " + document.cookie))
		{
			rtInf = unescape(RegExp.$1);
		}
		else
		{
			try
			{
				var xmlHttp = (jsre.navigator != "ie") ? (new XMLHttpRequest())
					: (new ActiveXObject("Microsoft.XMLHTTP"));
				xmlHttp.open("GET", jsre.jsvmHome + "/rtenv.conf", false);
				xmlHttp.send(null);
				var stus = xmlHttp.status;
				if (stus != 0	&& stus != 200)
				{
					throw "JSVM-NS can't find config file.";
				}
				document.cookie = "jsvm2Config=" +
					escape(rtInf = xmlHttp.responseText
						.replace(/#([^"\n\r]*)((\r\n)|$)/g, "")
						.replace(/\[([^"\n\r]*)\]/g, "")
						.replace(/\r\n(\s)*\r\n/g, "\r\n"));
			}
			catch (ex)
			{
				throw "JSVM-NS load config file error: " + ex;
			}
			finally
			{
				xmlHttp = null;
			}
		}
	}

	var cfg = jsre.config = new function()
	{
		var content = rtInf, params = {};
		var parseParam = function(name)
		{
			var re = new RegExp("(\\^|\\r\\n)( |\\t)*("
				+ name + ")( |\\t)*=( |\\t)*(.*)($|\\r\\n)");
			return re.test(content) ? RegExp.$6.replace(/\s+$/g, "") : null;
		}
		this.getParameter = function(name)
		{
			return ((p = params[name]) != null ||	(p = params[name]
				= getCFGAttribute(name)) != null) ?
				p :	(params[name] = parseParam(name));
		}
	}

	jsre.extModules = jsre.extModules.concat(
		((tmp = cfg.getParameter("extmodules")) == null ||
			tmp == "") ? [] : tmp.replace(/,$/, "").split(","));
	jsre.classpath = ((tmp = cfg.getParameter("classpath"))
		== null) ? "" : tmp;

}
else
{
	var rjsre = jsre.getParent();
	if (rjsre == null)
	{
		throw "The module-page can't find appliation.";
	}
	jsre.navigator = rjsre.navigator;
	jsre.classpath = rjsre.classpath;
	jsre.debug = rjsre.debug;
	jsre.extModules = jsre.extModules;
	jsre.config = new function()
	{
		var config = rjsre.config;
		this.getParameter = function(name)
		{
			return config.getParameter(name);
		}
	}
	jsre.getResource = function(name)
	{
		return this.getParent().getResource(name);
	}
	jsre.setResource = function(name, obj)
	{
		this.getParent().setResource(name, obj);
	}
}

jsre.log("JSVM runtime-environment load modules ... ");

jsre.loadModule("kernel");

switch (jsre.mode)
{
	case "standalone" :
		jsre.loadModule("runtime");
		break;
	case "application" :
		jsre.loadModule("runtime");
		jsre.loadModule("application");
		break;
	case "module" :
		jsre.loadModule("runtime.module");
		jsre.loadModule("module");
		break;
	default : break;
}

// load extends modules
for (var i = 0; i < jsre.extModules.length; i++)
{
	var m = jsre.extModules[i].replace(/\.[j|J][s|S]$/g ,"");
	jsre.loadModule((/[\\|\/]/.test(m))? m : ("extends/" + m));
}


}
catch(ex)
{
	jsre.log((!ex.description) ? ex.toString()
		: ("Error: " + ex.description));
	jsre.log("JSVM namespace load jsre.js error!");
	alert("JSVM load error , logs: \r\n ---------\r\n"
		+ "URL: " + document.URL + "\r\n ---------\r\n"
		+ jsre.logs.join("\r\n"));

}
finally
{
	element = null;
}

// end of function

};

_JSVM_Namespace.destroy = function()
{
	_JSVM_Namespace.runtimeEnvironment.destroy();
}

/* Get self element */
var scripts = document.getElementsByTagName("SCRIPT");
var element = scripts[scripts.length - 1];

/* Initialize JSVM Runtime Environment */
_JSVM_Namespace.initialize(element);
scripts = element = void(0);

if (window.addEventListener)
{
	window.addEventListener("unload", _JSVM_Namespace.destroy, false);
}
else
{
	window.attachEvent("onunload", _JSVM_Namespace.destroy);
}


/*@set @_jsvm_loaded = true; @*/
/*@else @*/
/*@end @*/