# language: JSVM2

/**
 * @fileoverview js.io.WebPrinter class {@link http://jsvm.org/}
 * @file		WebPrinter.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */

package js.io;

import js.lang.BObject;
import js.lang.System;
import js.dom.Window;

/**
 * Create a new WebPrinter instance.
 * Inherit from BObject
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends BObject
 * @class js.io.WebPrinter is a class that is a Web Printer
 * @constructor
 * @requires Window
 * @throws NotSupportException if platform is not a browser
 * @return A new WebPrinter
 * @see BObject js.lang.BObject is the base class for this
 */
class WebPrinter extends BObject () {

	/*
	 * @private
	 */
	var ds = WebPrinter.defaultStyle;

	/**
	 * The Output-Window. 
	 * @private
	 * @type Window
	 */	
	this.outputWindow = new Window("<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><title>"
		+ "Web Printer</title>"
		+ "<script>function write(s){"
		+ (System.isIeBrowser() ? "document.body.insertAdjacentHTML(\"beforeEnd\", s);" : "document.body.innerHTML+=s;")
		+ "setTimeout(\"document.body.scrollTop=document.body.scrollHeight;\",10);}"
		+ "function clear(){document.body.innerHTML=\"\";}"
		+ "document.onkeydown=function(){if(event.keyCode==116||(event.ctrlKey&&event.keyCode==78))"
		+ "{event.keyCode=0;event.returnValue = false;}}"
		+ "</script></head><body style=\"" + ds.style + "\""
		+ " scroll=\"auto\"></body></html>");
	this.outputWindow.width = ds.width;
	this.outputWindow.height = ds.height;
	this.outputWindow.resizable = ds.resizable;
	this.outputWindow.scrollbars = ds.scrollbars;
	this.outputWindow.status = ds.status;
}

/**
 * WebPrinter default-style Object
 * @type Object
 */
WebPrinter.defaultStyle = 
{
	style : "background-color:white;color:black;font-family:MS Sans Serif;font-size:12px;",
	width : 640,
	height : 480,
	resizable : 1,
	status : 0,
	scrollbars : "yes"
};

var $p = WebPrinter.prototype;

/**
 * The content of this Output-Window. 
 * @type String
 */
$p.prompt = "";

/**
 * Show Output-Window.
 * @see Window#show
 */
$p.showOutputWindow = function() {
	if (!this.outputWindow.isActive()) {
		this.outputWindow.show();
		if (this.prompt != "") {
			this.outputWindow.handle.write(this.prompt);
		}
	}
}

/**
 * Close Output-Window.
 * @see Window#close
 */
$p.closeOutputWindow = function() {
	this.outputWindow.close();
}

/**
 * Print string in Output-Window.
 * @param {String} s The content to print
 * @see Window#write
 */
$p.write = function(s) {
	this.showOutputWindow();
	this.outputWindow.handle.write(String(s));
}

/**
 * Print htmlEncoded-String in Output-Window.
 * @param {String} s The content to print
 * @see Window#write
 */
$p.print = function(s) {
	s = encodeHTML(String(s));
	this.write(s);
}

/**
 * Print htmlEncoded-String as a line in Output-Window.
 * @param {String} s The content to print
 * @see #print
 */
$p.println = function(s) {
	this.print(s + "\r\n");
}

/**
 * Print an exception in Output-Window.
 * @param {Error} ex The exception to print
 * @see #write
 */
$p.printError = function(ex) {
	this.write("<XMP style=\"color:red\">" + ex + "</XMP>");
}

/**
 * Print html in Output-Window.
 * @param {String} s The html to print
 * @see #write
 */
$p.printHTML = function(s) {
	this.write(String(s));
}

/**
 * Clear Output-Window content
 * @see Window#clear
 */
$p.clear = function() {
	if (this.outputWindow.isActive()) {
		this.outputWindow.handle.clear();
	}
}

/**
 * destroy
 * @see Window#destroy
 */
$p.close = function() {
	this.outputWindow.close();
}


/** 
 * Encode as HTML
 * @private
 * @type String
 */
var encodeHTML = function (s) {
	return s.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\r\n/g, "<br />")
		.replace(/\t/g, "&nbsp;&nbsp;&nbsp; ");
}