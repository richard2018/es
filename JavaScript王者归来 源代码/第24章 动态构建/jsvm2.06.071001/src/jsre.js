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
| Dependencies: ./bin/*.js                                      |
|-----------------------------------------------------------------------------|
| 2005-01-02 | Renamed filename to jsre.js and updated the version to 2.01.   |
| 2005-11-08 | Ignored error when Userdata is invalid.                        |
| ....         																																|
| 2006-03-05 | Updated the currentVersion property to "2.02.060305".          |
| 2006-05-15 | Added _JSVM_Namespace.runtimeEnvironment.loadModule method.    |
| 2006-05-22 | Fixed a bug about the extmodules property of module page.      |
| 2006-05-25 | Added _JSVM_Namespace object the destroy method.               |
| 2006-07-01 | Fixed a bug of the module's extmodules property.               |
| 2006-11-02 | Fixed a bug of the module's extmodules property.               |
| 2006-11-02 | Changed getCFGAttribute function,added 'jsvm_config' variable. |
| 2007-03-02 | Added some comments, changed the way of definition.            |
| 2007-07-04 | refashion JSVM namespace and runtime environment.              |
|-----------------------------------------------------------------------------|
| Created 2005-01-02 | All changes are in the log above. | Updated 2007-07-04 |
\----------------------------------------------------------------------------*/

/**
 * Define JSVM namespace and runtime environment.
 * @file:	jsre.js
 * @author:	Wan Changhua
 * @date:	2006.05.17
 */

/*@cc_on @*/
/*@if (!@_jsre_loaded) @*/

/* JSVM Namespace Object */

(window.__jsre_loader = function () {

window._JSVM_Namespace =
{

	/* Device Number */
	"deviceNumber" : 0x3116,

	/* JSVM Runtime Environment */
	"runtimeEnvironment" : {

		"currentVersion" : "2.06.071001",
		"window" : window,
		"jsvmHome" : ".",
		"classpath" : "",
		"JSVM" : null,
		"modules" : "",
		"state" : 0,

		/**
		 * Determines whether JSVM is alive.
		 */
		"isAlive" : function() {
			return (!this.window.closed);
		},

		// jsre.config
		"config" : function () {

			// Gets the config for jsvm
			var config = {};
			return {
				/**
			 	 * Returns the value of the specified parameter
				 */
				"getParameter" : function (name) {
					return config[name] || (config.el && config.el.getAttribute(name));
				},
				/**
				 * Initializes or destroies the config
				 */
				"init" : function (cfg) {
					config = cfg || {};
				},
				"destroy" : function () {
					config = null;
				}
			};
		}(),

		// resource container
		"resource" : function (){

			var topHDL;
			try {
				(topHDL = (opener && opener.top) || top).eval("");
			} catch (ex) {
				try {
					(topHDL = parent).eval("");
				} catch (ex) {
					topHDL = window;
				}
			}

			if (!topHDL.__jsre_res) {
				topHDL.eval("window.__jsre_res = {}");
			}
			var res = window.__jsre_res =
				topHDL.__jsre_res;

			return {
				/**
				 */
				"get" : function (name) {
					return res[name];
				},
				/**
				 */
				"put" :function(name, val) {
					res[name] = val;
				}
			};
		}(),

		// logger
		"logger" : function () {
			var logs = [];
			return {
				/**
				 * Logs a message.
				 */
				"log" : function (o) {
					logs.push({"message": o
						, "date" : new Date()});
				},
				/**
				 * Gets an array of the all logs.
				 */
				"getLogs" : function() {
					return logs.concat([]);
				}
			};
		}(),

		/**
		 * Returns an XMLHttpRequest instance.
		 */
		"getXMLHttpRequest" : function () {
			// Create XMLHttpRequest Object
			var progId, progIds = ["MSXML2.XMLHTTP.6.0"
				, "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
			return function () {
				if (!window.ActiveXObject) {
					return new XMLHttpRequest();
				} else if (progId != null) {
					return new ActiveXObject(progId);
				} else {
					for (var i = 0; i < progIds.length; i++) {
						try	{
							return new ActiveXObject(progId = progIds[i]);
						} catch (ex) {
							progId = null;
						}
					}
				}
			};
		}(),

		/**
		 * Loads a module.
		 */
		"loadModule" : function () {

			var hasCache = true, moduleStates = {};

			return function(name, module) {

				var jsre = _JSVM_Namespace.runtimeEnvironment
					, logger = jsre.logger, ex;

				// Stop load module when the state is not 1;
				if (jsre.state < 0) {
					throw "JSVM runtime-environment has crashed.";
				}
				var execEty = null;
				if (module != null) {
					execEty = function() {
						module();
						jsre.resource.put("$code{" + name + "}", module.toString());
						return true;
					}
				} else {
					// Checks whether module has loaded.
					if (moduleStates[name] > 0) {
						return;
					} else {
						moduleStates[name] = 1;
					}
					var code = jsre.resource.get("$code{" + name + "}");
					if (hasCache && code != null) {
						execEty = function() {
							eval("(" + code	+ ")();");
							return true;
						}
					} else {
						hasCache = false;
						execEty = function() {
							var tmpRes = jsre.config.getParameter("${" + name + "}");
							document.write("<script src='"
								+ jsre.jsvmHome	+ "/bin/"
								+ (tmpRes || (name + ".js"))
								+ "?" + jsre.currentVersion
								+ "'></script>");
						}
					}
				}
				try	{
					if (execEty()) {
						logger.log("JSVM Load module '" + name + "' succeed.");
					}
				} catch (ex) {
					jsre.state = -1;
					logger.log("JSVM Load module '" + name + "' failed.");
					logger.log(ex);
				}

			}
		}(),


		/**
		 * Initializes JSVM namespace.
		 */
		"initialize" : function(config) {

			var jsre = this, logger = jsre.logger, ex;

			try {

				// initialize jsre.config
				logger.log("JSVM Initializing runtime-environment on '" + document.URL + "'");
				jsre.config.init(config);
				logger.log("JSVM Retrieving system properties...");
				// set jsre.jsvmHome
				jsre.jsvmHome = jsre.config.getParameter("jsvm_home") || jsre.config.getParameter("src")
					.replace(/\\/g, "/").replace(/[^\/]*$/, ".");
				// get the classpath settings.
				jsre.classpath = jsre.config.getParameter("classpath") || "";
				// get the modules settings.
				jsre.modules = jsre.config.getParameter("modules") || "";
				logger.log("JSVM Start loading modules ... ");
				jsre.loadModule("kernel");
				jsre.state = 1;
				// loads extend modules
				var modules = jsre.modules.split(",");
				for (var i = 0; i < modules.length; i++) {
					if (modules[i] != "") {
						jsre.loadModule(modules[i]);
					}
				}
				jsre.state = 2;
				// if JSVM is ready, initialize it.
				if (jsre.JSVM) {
					jsre.JSVM.initialize();
				}
				logger.log("JSVM Initialization started.");
				jsre.state = 4;

			} catch(ex) {
				logger.log("JSVM Initialize error: " + (ex.message || ex));
				jsre.state = -9;
				var s = [], logs = logger.getLogs();
				for (var i = 0; i < logs.length; i++) {
					var d = logs[i].date;
					s.push(["\r\n[", d.toLocaleString()
						, ":" ,d.getMilliseconds(), "] "
						, logs[i].message].join(""));
				}
				alert("JSVM Error, URL: " + document.URL
					+ "\r\n\r\nlogs: \r\n---" + s.join(""));

			} finally {
				if (window.addEventListener) {
					window.addEventListener("unload",
						jsre.destroy, false);
				} else {
					window.attachEvent("onunload",
						jsre.destroy, false);
				}
			}

		},
		/**
		 * Destroys JSVM namespace.
		 */
		"destroy" : function () {
			var jsre = _JSVM_Namespace.runtimeEnvironment;
			jsre.config.destroy();
			if (jsre.JSVM) {
				jsre.JSVM.destroy();
			}
		}

	},

	/* Kernel Component */
	"kernel" : {},

	/* Components */
	"component" : {},

	/* Development Kit */
	"developmentKit" : {},

	/* Plug-In */
	"plugIn" : {},

	/**
	 * apply jsvm to the specifed window
	 */
	"apply" : function (winHDL, cfg) {

		var jsre = this.runtimeEnvironment, logger = jsre.logger;
		// execute jsre load function.
		if (winHDL && !winHDL.__jsre_loader) {
			winHDL.eval("(window.__jsre_loader = " + __jsre_loader + ")();");
		} else {
			logger.log("_JSVM_Namespace apply fail: error arguments! ");
			return;
		}
		// initalize config.
		var config = cfg || winHDL.jsvm_config || winHDL.eval("new Object");
		if (!config.jsvm_home) {
			if (!(/^[\/|file:]/.test(jsre.jsvmHome))) {
				config.jsvm_home = document.URL.replace(/\\/g, "\/")
					.replace(/[^\/]*$/, "") + jsre.jsvmHome;
			} else {
				config.jsvm_home = jsre.jsvmHome;
			}
		}
		// copy modules settings.
		if (!config.modules) {
			config.modules = jsre.modules;
		}
		// nitalize runtime environment.
		winHDL._JSVM_Namespace.runtimeEnvironment.initialize(config);
		logger.log("_JSVM_Namespace has applied to URL: "
			+ winHDL.document.URL);

	}
};

})();

/* Initialize JSVM Runtime Environment */
var config = window.jsvm_config || {};
var scripts = document.getElementsByTagName("SCRIPT");
config.el = scripts[scripts.length - 1];
// initialize JSVM runtime environment.
_JSVM_Namespace.runtimeEnvironment.initialize(config);
scripts = config = void(0);

/*@set @_jsre_loaded = true; @*/
/*@else @*/
/*@end @*/