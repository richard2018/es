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
| Dependencies: ../../jsre.js, ../runtime.js                                  |
|-----------------------------------------------------------------------------|
| 2006-05-25 | Created by Wan Changhua.                                       |
|-----------------------------------------------------------------------------|
| Created 2006-05-25 | All changes are in the log above. | Updated 2006-05-25 |
\----------------------------------------------------------------------------*/

/**
 * JSVM, debugger
 * @file:	debugger.js
 * @author:	Wan Changhua
 * @date:	2006.05.25
 * @requires runtime
 */

_JSVM_Namespace.runtimeEnvironment.loadModule("debugger", function()
{
	var jsre = _JSVM_Namespace.runtimeEnvironment
		, JSVM = jsre.JSVM, logger = jsre.logger;

	Class.forName("js.lang.System").setProperty("debug", "on");

	var cmdWindow = function () {
		var winHDL = Class.forName("js.dom.Window").newInstance(
			"<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">"
			+ "<title>Debug Command Window</title>"
			+ "<script>function execCmd(){owner.execCmd(document.getElementById('cmdTxt').value);}"
			+ "function focusCmd(){document.getElementById('cmdTxt').focus();}"
			+ "function hideCmd(){window.owner.hide();}"
			+ "function resetCmd(){document.getElementById('cmdTxt').value='';}"
			+ "function closeCmd(){window.close();}\r\n"
			+ "document.onkeydown=function(){var evt=window.event||arguments[0];"
			+ "if(evt.keyCode==88&&evt.altKey){execCmd();}"
			+ "else if(evt.keyCode==82&&evt.altKey){resetCmd();}"
			+ "else if(evt.keyCode==67&&evt.altKey){closeCmd();}"
			+ "else if(evt.keyCode==72&&evt.altKey){hideCmd();}}"
			+ "</script></head><body style=\"padding:0px;background-color:white;color:black;font-family:verdana,tahoma,helvetica;font-size:12px;\""
			+ " scroll=\"auto\" onload=\"focusCmd()\"><textarea id='cmdTxt' style='width:360px;height:240px;overflow:auto'></textarea><br/>"
			+ "<button onclick='execCmd()'>Execute(<u>X</u>)</button><button onclick='resetCmd()'>Reset(<u>R</u>)</button>"
			+ "<button onclick='hideCmd()'>Hide(<u>H</u>)</button><button onclick='closeCmd()'>Close(<u>C</u>)</button>"
			+ "</body></html>");
		winHDL.width = "390px";
		winHDL.height = "300px";
		winHDL.resizable = 0;
		winHDL.scrollbars = "no";
		winHDL.status = 0;		
		winHDL.execCmd = function (s) {
			try {
				eval(s);
			} catch (e)	{
				js.lang.System.out.println(e.message);
			}
		}		
		return winHDL;
		
	}();

	/**
	 * Shows command window for debug
	 */
	var showCommandWindow = function () {
		cmdWindow.show();
		cmdWindow.handle.focusCmd();
	}

	Class.forName("js.dom.EventManager").attachEvent(document, "keydown"
		, function (evt) {
			if (evt.keyCode == 68 && evt.ctrlKey && evt.altKey) {
				showCommandWindow();
			} else if (evt.keyCode == 76 && evt.ctrlKey && evt.altKey) {
				printJSVMLogs();
			}
		});

	/**
	 * Prints JSVM's all logs
	 */
	var printJSVMLogs = function () {
		var logs = logger.getLogs();
		var s = "JSVM's logs \r\n ---------------";
		for(var i = 0, l = logs.length; i < l; i++) {
			var log = logs[i];
			s += "\r\n[" + log.date.toString() 
				+ "] " + log.message;
		}
		JSVM.console.write(s);
	}

});

