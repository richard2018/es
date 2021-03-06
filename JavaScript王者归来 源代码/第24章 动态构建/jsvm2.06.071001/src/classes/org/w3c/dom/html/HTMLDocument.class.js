# language: JSVM2

/**
 * Copyright (c) 2000 World Wide Web Consortium,
 * (Massachusetts Institute of Technology, Institut National de
 * Recherche en Informatique et en Automatique, Keio University). All
 * Rights Reserved. This program is distributed under the W3C's Software
 * Intellectual Property License. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE.
 * See W3C License http://www.w3.org/Consortium/Legal/ for more details.
 */

package org.w3c.dom.html;

import js.util.HashMap;

import org.w3c.dom.Document;
import org.w3c.dom.events.EventTarget;
import org.w3c.dom.events.Event;

class HTMLDocument extends Document ()
{
	super.call(this);
	EventTarget.call(this);
	this.__title = null;
	this.__domain = null;
	this.__referrer = null;
	this.__body = null;
}

var $p = HTMLDocument.prototype;

/**
 * The title of a document as specified by the <code>TITLE</code> element 
 * in the head of the document. 
 */
$p.getTitle = function ()
{
	return this.__title;
}

$p.setTitle = function (sTitle)
{
	this.__title = sTitle;
}

/**
 *  The element that contains the content for the document. In documents 
 * with <code>BODY</code> contents, returns the <code>BODY</code> 
 * element. In frameset documents, this returns the outermost
 * <code>FRAMESET</code> element. 
 */
$p.getBody = function ()
{
	return this.__body;
}

$p.setBody = function (body)
{
	this.__body = body;
}


/**
 *  Returns the URI  of the page that linked to this page. The value is an 
 * empty string if the user navigated to the page directly (not through a 
 * link, but, for example, via a bookmark). 
 */
$p.getReferrer = function ()
{
	return this.__referrer;
}

/**
 *  The domain name of the server that served the document, or 
 * <code>null</code> if the server cannot be identified by a domain name. 
 */
$p.getDomain = function ()
{
	return this.__domain;
}

/**
 *  The cookies associated with this document. If there are none, the 
 * value is an empty string. Otherwise, the value is a string: a 
 * semicolon-delimited list of "name, value" pairs for all the cookies 
 * associated with the page. For example, 
 * <code>name=value;expires=date</code> . 
 */
$p.getCookie = function () {}
$p.setCookie = function (sValue) {}

/**
 *  Note. This method and the ones following  allow a user to add to or 
 * replace the structure model of a document using strings of unparsed 
 * HTML. At the time of  writing alternate methods for providing similar 
 * functionality for  both HTML and XML documents were being considered. 
 * The following methods may be deprecated at some point in the future in 
 * favor of a more general-purpose mechanism.
 * <br> Open a document stream for writing. If a document exists in the 
 * target, this method clears it.
 */
$p.open = function ()
{
	this.dispatchEvent(new Event("open"));
}

/**
 *  Closes a document stream opened by <code>open()</code> and forces 
 * rendering.
 */
$p.close = function ()
{
	this.dispatchEvent(new Event("close"));
}

/**
 *  Write a string of text to a document stream opened by
 * <code>open()</code> . The text is parsed into the document's structure 
 * model.
 * @param text  The string to be parsed into some structure in the 
 *   document structure model.
 */
$p.write = function (sText) {}

/**
 *  Write a string of text followed by a newline character to a document 
 * stream opened by <code>open()</code> . The text is parsed into the 
 * document's structure model.
 * @param text  The string to be parsed into some structure in the 
 *   document structure model.
 */
$p.writeln = function (sText) {}