# language : JSVM2

/**
 * @fileoverview js.lang.System class {@link http://jsvm.org/}
 * @file		System.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM1.0
 */

package js.lang;

import js.lang.ArgumentException;
import js.lang.NotSupportException;

/**
 * The <code>System</code> class contains several useful class fields
 * and methods. Inherit from JObject and cannot be instantiated. 
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends JObject
 * @class this is an important Object
 * @constructor
 * @final
 * @throws NotSupportException then anyone try instantiate it.
 */
class System () {
	/* Don't let anyone instantiate this class 
	 */
	throw new NotSupportException(System.getName()
		+ " cannot be instantiated.");
}

/**
 * The link of _JSVM_Namespace;
 * @type _JSVM_Namespace
 */
System.NS = _JSVM_Namespace;

/**
 * The link of _JSVM_Namespace Runtime Environment;
 * @type Object
 */
System.RE = System.NS.runtimeEnvironment;

/**
 * The link of _JSVM_Namespace.runtimeEnvironment.JSVM
 * @type JSVM
 */
System.VM = System.RE.JSVM;

/**
 * retrieve JSVM Runtime Environment handle
 * @returns _JSVM_Namespace.runtimeEnvironment
 * @type Object
 */
System.getRuntimeEnvironment = function() {
	return System.RE;
}

/**
 * The current platform type
 * @private
 * @type String
 */
var _platform = null;

/**
 * Retrieve flatform type
 * @returns flatform type
 * @type String
 */
System.getPlatform = function() {
	if (_platform != null) {
		return _platform;
	}
	if (typeof(navigator) == "undefined") {
		return "not-browser";
	}
	var ua = navigator.userAgent.toLowerCase();
	if (/gecko/i.test(ua)) {
		_platform = "moz";
	} else if (/opera/i.test(ua)) {
		_platform = "opera";
	} else if (/msie/i.test(ua)) {
		if (/msie 7/i.test(ua)) {
			_platform = "ie7";
		} else if (/msie 6/i.test(ua)) {
			_platform = "ie6";
		} else if (/msie 5\.5/i.test(ua)) {
			_platform = "ie5.5";
		} else if (/msie 5\.[^5]/i.test(ua)) {
			_platform = "ie5";
		} else {
			_platform = "ie";
		}
	} else {
		_platform = "other";
	}
	return _platform;
}

// check browser type
var isIE = /ie/.test(System.getPlatform());
var isMoz = System.getPlatform() == "moz";
var isOpera = System.getPlatform() == "opera";

/**
 * Determines if the current browser is IE.
 * @return  <code>true</code> if the current browser is IE;
 *          <code>false</code> otherwise.
 * @type	boolean
 */
System.isIeBrowser = function() {
	return isIE;
}

/**
 * Determines if the current browser is MOZ.
 * @return  <code>true</code> if the current browser is MOZ;
 *          <code>false</code> otherwise.
 * @type	boolean
 */
System.isMozBrowser = function() {
	return isMoz;
}

/**
 * Determines if the current browser is MOZ.
 * @return  <code>true</code> if the current browser is MOZ;
 *          <code>false</code> otherwise.
 * @type	boolean
 */
System.isOperaBrowser = function() {
	return isOpera;
}

/**
 * Close current JSVM Window ,if the current mode is 'application', 
 * then close all module-Windows;
 */
System.exit = function () {
	if (!(System.isMozBrowser() ||
		System.isIeBrowser() ||	System.isOperaBrowser())) {
		throw new NotSupportException("The Platform Must be IE5+, Moz or Opera Browser!");
	} else if (System.getPlatform() < "ie6") {
		var str = "<object id=\"noTipClose\" "
			+ "classid=\"clsid:ADB880A6-D8FF-11CF-9377-00AA003B7A11\">"
			+ "<param name=\"Command\" value=\"close\"></object>";
		document.body.insertAdjacentHTML("beforeEnd", str);
		document.all.noTipClose.Click();
	} else {
		window.opener = null;
		window.close();
	}
}

/**
 * Rretrieve the JSVM-classloader
 * @returns the class loader for the JSVM
 * @type Classloader
 */
System.getClassloader = function () {
	return System.VM.getClassloader();
}

/**
 * Rretrieve jsvm home path
 * @returns jsvm home path
 * @type String
 */
System.getBaseHome = function () {
	return System.RE.jsvmHome;
}

/**
 * Rretrieve system home path, default: jsvmHome/bin
 * @returns system home path
 * @type String
 */
System.getSystemHome = function () {
	return System.RE.jsvmHome + "/bin";
}

/**
 * Rretrieve class home path, default: jsvmHome/classes
 * @returns class home path
 * @type String
 */
System.getClassHome = function () {
	return System.RE.jsvmHome + "/classes";
}

/**
 * Rretrieve class library path, default: jsvmHome/lib
 * @returns class library path
 * @type String
 */
System.getLibHome = function () {
	return System.RE.jsvmHome + "/lib";
}

/**
 * Rretrieve class resource path, default: jsvmHome/res
 * @returns class resource path
 * @type String
 */
System.getResourceHome = function () {
	return System.RE.jsvmHome + "/res";
}

/**
 * Rretrieve system variable with the specified name
 * @returns a system variable
 * @type String
 */
System.getSystemVariable = function (name) {
	return System.RE.config.getParameter(name);
}

/**
 * retrieve a plug-in with the specified name
 * @returns a plug-in component
 * @type String
 */
System.getPlugIn = function (name) {
	return _JSVM_Namespace.plugIn[name];
}

/**
 * Runs the garbage collector.
 * Calling the <code>gc</code> method suggests that the Java Virtual 
 * Machine expend effort toward recycling unused objects in order to 
 * make the memory they currently occupy available for quick reuse. 
 * When control returns from the method call, the Java Virtual 
 * Machine has made a best effort to reclaim space from all discarded 
 * objects.
 */
System.gc = function () {
	if (System.isIeBrowser()) {
		setTimeout(function(){CollectGarbage();});
	}
}


/**
 * Gets the system property indicated by the specified key.
 * @param key the name of the system property.
 * @param def a default value.
 * @return the string value of the system property,
 * or <code>null</code> if there is no property
 * with that key.
 */
System.getProperty = function (key, def) {
	return System.RE.resource.get("$sys_property_key__" + key) || def;
}

/**
 * Sets the system property indicated by the specified key. 
 * @param      key   the name of the system property.
 * @param      value the value of the system property.
 * @return     the previous value of the system property,
 *             or <code>null</code> if it did not have one.
 */
System.setProperty = function (key, value) {
	System.RE.resource.put("$sys_property_key__" + key, value);
}

/**
 * The output console
 */
System.out = {

	"print" : function (s) {
		System.VM.console.write(s);
	}
	,
	"println" : function (s) {
		System.VM.console.write(s + "\r\n");
	}

}

/**
 * Redefine JSVM destroy method.
 */
var listeners = [];
var oDestroy = System.VM.destroy;
System.VM.destroy = function () {
	try {
		var i = 0, hdl;
		while (hdl = listeners[i++]) {
			try { hdl(); } 
			catch (ex) {}
		}
	} catch (ex) {
	} finally {
		oDestroy.call(System.VM);
		listeners = null;
	}
}

/**
 * adds a listener on vm destroy
 * @param hdl Function
 * @type void
 */
System.addVMDestroyListener = function (hdl) {
	listeners.push(hdl);
}
