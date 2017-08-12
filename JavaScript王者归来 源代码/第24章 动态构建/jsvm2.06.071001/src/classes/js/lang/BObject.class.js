# language: jsvm2

/**
 * @fileoverview js.lang.BObject class {@link http://jsvm.org/}
 * @file		BObject.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */

package js.lang;

import js.lang.System;
import js.lang.NotSupportException;


/**
 * Create a new BObject instance.
 * Inherit from JObject
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends JObject
 * @class js.lang.BObject is a class that work on browser.
 * @constructor
 * @throws NotSupportException if platform is not a browser
 * @return A new BObject
 * @see JObject js.lang.JObject is the base class for this
 */

class BObject() {

	/* check platform
 	*/
	if (!(System.isIeBrowser() || System.isMozBrowser() || System.isOperaBrowser())) {
		throw new NotSupportException("BObject only support IE5+,Moz or Opera!");
	}

	this.uniqueID = BObject.createUniqueId();

	if (!isCalledByExtends()) {
		this.init();
		var obj = this;
		System.addVMDestroyListener(function () {
				obj.destroy();
			});
	}

}


var $p = BObject.prototype;

/**
 * abstract method
 */
$p.init = function () {}

/**
 * abstract method
 */
$p.destroy = function () {}

/**
 * The Unique Id prefix
 * @private
 * @type String
 */
var uidPrefix = "_jbo_" + new Date().getTime().toString(16) + "_";

/**
 * The Unique Id sequence
 * @private
 * @type String
 */
var sequence = 0;

/**
 * Create an unique id
 * @param {Object} obj an object
 * @return a Unique Id
 * @type String
 */
BObject.createUniqueId = function () {
	return uidPrefix + (sequence++);
}

/**
 * retrieve an unique id, if has not, create it
 * @return a Unique Id
 * @type String
 */
$p.getUniqueId = function () {
	if (!this.hasOwnProperty("uniqueID")) {
		this.uniqueID = BObject.createUniqueId();
	}
	return this.uniqueID;
}

/**
 * the global container
 * @private
 * @type Object
 */
var container = {};

/**
 * put self into the global container
 * @param {boolean} bool if make self become a globale variable
 */
$p.globalize = function (bool) {
	var uid = this.getUniqueId();
	// put self into the global container
	container[uid] = this;
	// whether become a windows's property
	if (bool == true) {
		window[uid] = this;
	}
}

/**
 * un globalize
 */
$p.unglobalize = function () {
	var uid = this.getUniqueId();
	// remove from the global container
	delete container[uid];
	window[uid] = null;
}

/**
 * Retrieve an object by the uniqueID
 * @param {String} sId the uniqueID of object
 * @return an object from container by uniqueID
 * @type Object
 */
BObject.getGlobalObjectByUniqueId = function (sId) {
	return container[sId];
}

/**
 * Retrieve all objects from the global container
 * @return all objects in the container
 * @type Array
 */
BObject.getAllGlobalObjects = function () {
	var objs = [], i = 0;
	for (var uid in container) {
		objs[i++] = container[uid];
	}
	return objs;
}


// destroy global variables
System.addVMDestroyListener(
	BObject.destroyGlobalVariables = function () {
		for (var uid in container) {
			window[uid] = null;
		}
		container = {};
	});
	

/**
 * Determines if the current context is called by $extends function
 * @private
 */
var isCalledByExtends = function () {
	var caller = arguments.callee.caller;
	while (caller = caller.caller) {
		if (caller == Class.prototype.$extends) {
			return true;
		}
	}
	return false;
}

