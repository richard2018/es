/*----------------------------------------------------------------------------\
|                                JSVM 2.0                                     |
|-----------------------------------------------------------------------------|
|                         Created by Wan Changhua                             |
|                      (Email,MSN: wch3116@hotmail.com)                       |
|                   For Homolo Co., Ltd. (http://jsvm.org/)                   |
|-----------------------------------------------------------------------------|
| An object based javascript framework, targeted at rich web applications,    |
| JSVM (JavaScript Virtual Machine) is implemented in JavaScript. Currently   |
| only internet explorer 5.5 and later and firefox and opera are supported.   |
|-----------------------------------------------------------------------------|
|                 Copyright (c) 2004 - 2005 Homolo Co., Ltd.                  |
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
| 2006-02-09 | Setted __jsvm2_app_frame application attribute to 'yes'    |
|            | and fixed run method, window_onload function.                  |
| 2006-02-20 | Removed the lisenter of window onbeforeunload event.           |
| 2006-03-05 | Changed the 'webforms' variable to a normal object.            |
| 2006-05-22 | Removes some event listeners of the application page.          |
| 2006-05-25 | Changed the application disengage the js.lang.System class.    |
| 2007-01-13 | Fixed some bugs and added a switch: 'frame'.                   |
| 2007-03-09 | Refashioned application.                                       |
|-----------------------------------------------------------------------------|
| Created 2005-01-02 | All changes are in the log above. | Updated 2007-03-09 |
\----------------------------------------------------------------------------*/

/**
 * JSVM, ext module
 * @file:	application.js
 * @function:	initialize application
 * @author:	Wan Changhua
 * @date:	2006.03.09
 *
 */

_JSVM_Namespace.runtimeEnvironment.loadModule("application", function()

{

	var jsre = _JSVM_Namespace.runtimeEnvironment, JSVM = jsre.JSVM;
	var isMoz = /gecko/i.test(navigator.userAgent);
	var isIe = /msie/i.test(navigator.userAgent);

	window.application = new function()
	{
	
		this.title = "Web Application";
		this.main = "url(" + jsre.jsvmHome + "/bin/res/__web.htm)";
		this.frame = null;
	
		/**
		 * Gets the window of the application.
		 */
		this.getWindow = function() {
			return window;
		}
	
		/**
		 * Determines whether this page is alive.
		 */
		this.isAlive = function () {
			return (window.closed == false);
		}
	
		/**
		 * Quits the current application.
		 */ 
		this.exit = function() {
			window.opener = null;
			window.close();
		}
	
		/**
		 * Gets a parameter from URL with name.
		 */ 
		this.getParameter = function (name) {
			var re = new RegExp("([\?]|&)(" + name + "=)([^&]*)");
			return re.test(window.location.search) ?
				unescape(RegExp.$3) : null;
		}
	
		// the container of appliction properties.
		var properties = {};
	
		/**
		 * Sets the value of the specified property.
		 */ 
		this.setProperty = function (name, val) {
			properties[name] = val;
		}
		/**
		 * Gets a property with name.
		 */ 
		this.getProperty = function (name) {
			return properties[name];
		}
	
		/**
		 * Shows a url in the main frame
		 */ 
		this.showForm = function(url) {
			if (this.frame) {
				this.frame.src = url;
			}	
		}
	
	
		/**
		 * application initialize
	 	 */
		this.initialize = function() {
	
			var application = this;
	
			// auto create work frame.
			var frame = jsre.config.getParameter("frame");
			if (frame == "auto") {
				frame = "___frame__" + new Date().getTime();
				if (isMoz) {
					document.write('<body topmargin="0" leftmargin="0" bottommargin="0" rightmargin="0">'
						+ '<iframe frameborder="0" id="' + frame + '" name="' + frame 
						+ '" style="width:100%;height:100%"></iframe></body>');
				} else {
					document.write('<frameset rows="*"><frame application="yes" frameborder="0" id="'
						+ frame + '" name="' + frame + '" scrolling="yes" /></frameset>');
				}
			}
	
			application.main = jsre.config.getParameter("main");
				
			/**
			 * the event handler on window load
			 */
			var onAppInitialize = function() {
	
				if (frame != null) {
					application.frame = document.getElementById(frame);
				}
				
				if (/^url\((.*)\)$/.test(application.main))	{
					application.showForm(RegExp.$1);
				} else if (/^class\((.*)\)$/.test(application.main)) {
					try	{
						var mainClass= RegExp.$1, params = {};
						var hash = window.location.hash;
						if (hash != "") {
							var ps = hash.substring(1).split("&");
							for (var i = 0 ; i < ps.length; i++) {
								var pstr = ps[i], pos = pstr.indexOf("=");
								if (pos != - 1) {
									params[pstr.substring(0, pos)] = unescape(pstr.substring(pos + 1));
								}
							}
						}
						var clz = Class.forName(mainClass);
						if (!clz.main) {
							throw "can't find method: 'main'.";
						} else {
							clz.main(params);
						}
					} catch (ex) {
						JSVM.console.write("application main-class run error: "
							+ ex.toString());
					}
				}
			}
	
			/**
			 * the event handler for window unload
			 */
			var onAppDestroy = function () {
				deon(document, "keydown", onDocKeydown);
				application.frame = null;
			}
	
			/**
			 * the event handler on documnet keydown
			 */
			var onDocKeydown = function () {
				var evt = arguments[0] || window.event;
				if ((evt.ctrlKey && ",17,66,70,78,80,".indexOf("," + evt.keyCode + ",") != -1) || evt.keyCode == 116) {
					try { evt.returnValue = false; } catch (ex) {}
					try { evt.preventDefault(); } catch (ex) {}
				}
			}
	
			/**
		     * Appends an event handler
		     */
			var on = function (el, type, func) {
				if (!isIe) {
					el.addEventListener(type, func, false);				
				} else {
					el.attachEvent('on' + type, func);
				}
			}
	
			/**
		     * Removes an event handler
		     */
			var deon = function (el, type, func) {
				if (!isIe) {
					el.removeEventListener(type, func, false);				
				} else {
					el.detachEvent('on' + type, func);
				}
			}
	
			/**
			 * Adds those event handler.
			 */
			on(document, "keydown", onDocKeydown);
			on(window, "load", onAppInitialize);
			on(window, "unload", onAppDestroy);
	
		}
	
	}
	
	// Invoke initialize
	application.initialize();

});