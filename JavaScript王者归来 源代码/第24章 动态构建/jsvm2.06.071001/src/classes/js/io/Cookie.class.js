# language: JSVM2

/**
 * @fileoverview js.io.Cookie class {@link http://jsvm.org/}
 * @file		Cookie.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */

package js.io;

import js.lang.BObject;

/**
 * Create a new Cookie instance.
 * Inherit from BObject
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends BObject
 * @class this is a cookie utility class
 * @constructor
 * @return A new Cookie instance
 * @see BObject js.lang.BObject is the base class for this
 */
class Cookie extends BObject (domain, path, expires) {
	this.__subfix = "";
	this.__subfix += (domain == null) ? "" 
		: ("; domain=" + domain);
	this.__subfix += (path == null) ? "" 
		: ("; path=" + path);
	this.__subfix += (expires == null) ? "" 
		: ("; expires=" + expires.toGMTString());
}

var $p = Cookie.prototype;

/**
 * Sets cookie
 * @param {String} name the name of cookie item
 * @param {String} value the value of cookie item
 */
$p.setValue = function (name, value) {
	document.cookie = name + "=" + escape(value) 
		+ this.__subfix + ";";
}

/**
 * Returns cookie value with name.
 * @return  a string
 * @type String
 */
$p.getValue = function (name) {
	return (new RegExp(" " + name + "=([^;]*)").test(
		" " + document.cookie)) ?
			unescape(RegExp.$1) : null;
}
