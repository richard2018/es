# language: JSVM2

/**
 * @fileoverview js.util.Properties class {@link http://jsvm.org/}
 * @file		Properties.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */
 
package js.util;

import js.lang.Cloneable;
import js.lang.ArgumentException;
import js.io.IOException;
import js.net.XmlHttp;
import js.net.XmlDom;
import js.util.HashMap;


/**
 * Creates an empty property list with no default values.
 * Inherit from Cloneable
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends Cloneable
 * @class This is the properties class.
 * @constructor
 */
class Properties extends Cloneable () {
	/**
	 * @private
	 */
	this.__ctx = new HashMap();
}

var $p = Properties.prototype;

 /**
  * Searches for the property with the specified key in this property list.
  * If the key is not found in this property list, the default property list,
  * and its defaults, recursively, are then checked. The method returns the
  * default value argument if the property is not found.
  *
  * @param   key            the hashtable key.
  * @param   defaultValue   a default value.
  *
  * @return  the value in this property list with the specified key value.
  * @type String
  */
$p.getProperty = function (key, defaultValue) {
	var val = this.__ctx.get(key);
	return (val == null) ? defaultValue : val;
}


/**
 * Calls the <tt>HashMap</tt> method <code>put</code>. Provided for
 * parallelism with the <tt>getProperty</tt> method. Enforces use of
 * strings for property keys and values. The value returned is the
 * result of the <tt>HashMap</tt> call to <code>put</code>.
 *
 * @param key the key to be placed into this property list.
 * @param value the value corresponding to <tt>key</tt>.
 */
$p.setProperty = function (key, value) {
	if (key == null || key == "") {
		throw new ArgumentException(this.getClass().getName()
			+ ".setProperty(key, value) error: key can't be null and empty.");
	}
	this.__ctx.put(key, String(value));
}


/**
 * Removes all property from this property list.
 */
$p.clear = function () {
	return this.__ctx.clear();
}


/**
 * Returns an iterator of all the keys in this property list,
 * including distinct keys in the default property list if a key
 * of the same name has not already been found from the main
 * properties list.
 *
 * @return  an iterator of all the keys in this property list, including
 *          the keys in the default property list.
 * @type Iterator
 */
$p.propertyNames = function () {
	return this.__ctx.keys();
}


/**
 * Reads a property list (key and element pairs) from the input
 * stream.  
 *
 * @param      sURL   the input stream url.
 * @exception  IOException  if an error occurred when reading from the
 *               input stream.
 */
$p.load = function (sURL) {
	var xmlHttp = XmlHttp.create();
	try {
		xmlHttp.open("GET", sURL, false);
		xmlHttp.send(null);
	} catch (ex) {
		throw new IOException(this.getClass().getName()
			+ ".load(sURL) Fail. Cound not access the resource [sURL:"
			+ sURL + "].", ex);
	}
	if (xmlHttp.status != 200 && xmlHttp.status != 0) {
		throw new IOException(this.getClass().getName()
			+ ".load() Fail. Cound not access the resource [url:"
			+ sURL + ", HTTP-STATUS: "
			+ xmlHttp.status + "].", ex);
	}
	var text = xmlHttp.responseText;
	var ps = text.replace(/#([^"\n\r]*)((\r\n)|$)/g, "")
		.replace(/\[([^"\n\r]*)\]/g, "")
		.replace(/\r\n(\s)*\r\n/g, "\r\n")
		.split("\r\n");
	for (var i = 0; i < ps.length; i++) {
		var p = ps[i];
		var x = p.indexOf("=");
		if (x != -1) {
			var n = p.substring(0, x).replace(/(^\s+)|\s+$/g, "");
			var v = p.substring(x + 1).replace(/(^\s+)|\s+$/g, "");
			this.setProperty(n, v);
		}
	}
}

/**
 * Loads all of the properties represented by the XML document
 * on the specified input stream into this properties table.
 *
 * @param      sURL   the input stream url.
 * @exception  IOException  if an error occurred when reading from the
 *               input stream.
 */
$p.loadFromXML = function (sURL) {
	var doc = XmlDom.create();
	doc.setAsync(false);
	if (!doc.load(sURL)) {
		throw new IOException(this.getClass().getName()
			+ ".loadFromXML(sURL) Fail. Cound not load from the resource [sURL:"
			+ sURL + "].", ex);
	}
	var root = doc.getDocumentElement();
	var ptNodes = XmlDom.utility.selectNodes(root, "entity");
	var l = ptNodes.length;
	for (var i = 0; i < l; i++) {
		var node = ptNodes[i];
		this.setProperty(node.getAttribute("key"), XmlDom.utility.getText(node));
	}	
}

/**
 * Prints this property list out to the specified output stream.
 * This method is useful for debugging.
 *
 * @param   out   an output stream.
 */
$p.list = function (out) {
	out = out || System.out;
	var iterator = this.propertyNames();
	while(iterator.hasNext())
	{
		var pn = iterator.next();
		out.println(pn + "=" + this.getProperty(pn));
	}
}

/**
 * Returns a shallow copy of this <tt>Properties</tt> instance: the keys and
 * values themselves are not cloned.
 *
 * @return a shallow copy of this properties.
 * @type Properties
 */
$p.clone = function () {
	var ps = new Properties();
	ps.__ctx = this.__ctx.clone();
	return ps;
}
