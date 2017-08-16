# language: JSVM2

/**
 * @fileoverview js.dom.StyleSheet class {@link http://jsvm.org/}
 * @file		StyleSheet.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */

package js.dom;

import js.lang.System;
import js.lang.BObject;
import js.lang.NotSupportException;

/**
 * Create a new js.dom.StyleSheet instance.
 * Inherit from BObject
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends BObject
 * @class This is the StyleSheet class.
 * @constructor
 * @param <Object> cs
 * @return A new StyleSheet object
 */

class StyleSheet extends BObject (cs) {
	/**
	 * check browser
	 */
	if (!(System.isIeBrowser() || System.isMozBrowser())) {
		throw new NotSupportException(StyleSheet.getName()
			+ "() error: does not support '"
			+ System.getPlatform() + "'");
	}
	/**
	 * @private
	 */
	this.__sst = cs;
}

var $p = StyleSheet.prototype;

/**
 * Creates a new style rule for the styleSheet object,
 * and returns the index into the rules collection.
 * @param <String> sSelector that specifies the selector for the new rule.
 *				Single contextual selectors are valid
 * @param <String> sStyle that specifies the style assignments for this style rule.
 *				This style takes the same form as an inline style specification.
 *				For example, "color:blue" is a valid style parameter.
 * @param <int> iIndex Integer that specifies the location in the rules collection to add the new style rule.
 *				If an index is not provided, the rule is added to the end of the collection by default.
 */
$p.addRule = function (sSelector, sStyle , iIndex) {
	if (iIndex == null) {
		iIndex = (js.lang.System.isIeBrowser()) ? this.__sst.rules.length
			: this.__sst.cssRules.length;
	}
	if (js.lang.System.isIeBrowser()) {
		this.__sst.addRule(sSelector, sStyle , iIndex);
	}
	if (js.lang.System.isMozBrowser()) {
		this.__sst.insertRule(sSelector + " { " + sStyle + "} ", iIndex);
	}
}

/**
 * Deletes an existing style rule for the styleSheet object,
 * and adjusts the index of the rules collection accordingly.
 * @param <int> iIndex Integer that specifies the index value of the rule to be deleted from the style sheet.
 *				If an index is not provided, the first rule in the rules collection is removed.
 */
$p.removeRule = function(iIndex) {
	if (js.lang.System.isIeBrowser()) {
		this.__sst.removeRule(iIndex);
	}
	if (js.lang.System.isMozBrowser()) {
		this.__sst.deleteRule(iIndex);
	}
}

/**
 * Creates a new StyleSheet object
 * @param <Document> doc Document that specifies the document object of the StyleSheet to be created on the document.
 *				default is current document.
 * @returns a new StyleSheet object
 * @type StyleSheet
 */
StyleSheet.create = function (doc) {
	if (!(System.isIeBrowser() || System.isMozBrowser())) {
		throw new NotSupportException(StyleSheet.getName()
			+ ".create() error: does not support '"
			+ System.getPlatform() + "'");
	}
	doc = doc || document;
	var elmt = doc.createElement("style");
	var heads = doc.getElementsByTagName("HEAD");
	if (heads.length > 0) {
		heads[0].appendChild(elmt);
	} else if (doc.body != null) {
		doc.body.appendChild(elmt);
	} else {
		doc.write("<style/>");
	}
	var len = doc.styleSheets.length;
	return new StyleSheet(doc.styleSheets.item(len - 1));
}

/**
 * Adds a LINK element object if the URL contains style information
 * @param <String> url the url of the css file
 * @param <Document> doc The document that the style sheet apply it.
 * @returns a new LinkElement object
 * @type LinkElement
 */
StyleSheet.addCssLink = function (url, doc) {
	doc = doc || document;
	var elmt = doc.createElement("link");
	elmt.setAttribute("id", BObject.createUniqueId());
	var heads = doc.getElementsByTagName("HEAD");
	if (heads.length > 0) {
		heads[0].appendChild(elmt);
	} else if (doc.body != null) {
		doc.body.appendChild(elmt);
	} else {
		var uid = BObject.createUniqueId();
		doc.write("<link id=\"" + uid
			+ "\" rel=\"stylesheet\" href=\""
			+ url	+ "\" />");
		return doc.getElementById(uid);
	}
	elmt.setAttribute("rel", "stylesheet");
	elmt.setAttribute("href", url);
	return elmt;
}
