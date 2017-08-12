# language: JSVM2

/**
 * @fileoverview js.net.XmlHttp class {@link http://jsvm.org/}
 * @file		XmlHttp.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */

package js.net;

import js.lang.NotSupportException;
import js.lang.System;

/**
 * Create a new XmlHttp instance.
 * Inherit from js.lang.JObject
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends JObject
 * @class This is the xmlhttp class.
 * @constructor
 * @throws NotSupportException if current browser does not support XmlHttp/XMLHttpRequest.
 * @return  a <code>XMLHttpRequest</code> instance if the current browser is moz.
 *          a <code>Microsoft.XMLHTTP</code> instance otherwise.
 */
class XmlHttp() {
	this.init();
}

var $p = XmlHttp.prototype;

/**
 * @type XMLHttpRequest
 */
$p.getXMLHttpRequest = function () {
	return this.__request;
}

$p.init = function () {
	this.__request = XmlHttp.create();
}

$p.destroy = function () {
	this.__request = null;
}

/**
 * Retrieves a new XmlHttp instance.
 * @return  a <code>Microsoft.XMLHTTP</code> instance if the current browser is ie.
 *          a <code>XMLHttpRequest</code> instance otherwise.
 * @type XmlHttp
 */
XmlHttp.create = function () {
	return System.RE.getXMLHttpRequest();
}
