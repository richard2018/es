# language: JSVM2

/**
 * @fileoverview js.dom.Window class {@link http://jsvm.org/}
 * @file		Window.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */

package js.dom;

import js.lang.System;
import js.lang.BObject;

/**
 * Create a new js.dom.Window instance.
 * Inherit from BObject
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends BObject
 * @class This is the basic web window class.
 * @constructor
 * @param {String} src
 * @return A new Window object
 */
class Window extends BObject (src) {

	super.call(this);

	/**
	 * Sets or retrieves the source code of the Window
	 * @type String
	 */
	this.sourceCode = src;

	/**
	 * Sets or retrieves the width of the Window
	 * @type int
	 */
	this.width = null;

	/**
	 * Sets or retrieves the height of the Window
	 * @type int
	 */
	this.height = null;

	/**
	 * Sets or retrieves the top of the Window
	 * @type int
	 */
	this.top = null;

	/**
	 * Sets or retrieves the left of the Window
	 * @type int
	 */
	this.left = null;

	/**
	 * Specifies whether to display resize handles at the corners of the window.
	 * The default is yes. [ yes | no | 1 | 0 ]
	 * @type String
	 */
	this.toolbar = null;

	/**
	 * Specifies whether to display the input field for entering URLs directly into the browser.
	 * The default is yes. [ yes | no | 1 | 0 ]
	 * @type String
	 */
	this.location = null;

	/**
	 * Specifies whether to add directory buttons.
	 * The default is yes. [ yes | no | 1 | 0 ]
	 * @type String
	 */
	this.directories = null;

	/**
	 * Specifies whether to display the menu bar.
	 * The default is yes. [ yes | no | 1 | 0 ]
	 * @type String
	 */
	this.menubar = null;

	/**
	 * Specifies whether to display horizontal and vertical scroll bars.
	 * The default is yes. [ yes | no | 1 | 0 ]
	 * @type String
	 */
	this.scrollbars = null;

	/**
	 * Specifies whether to display resize handles at the corners of the window.
	 * The default is yes. [ yes | no | 1 | 0 ]
	 * @type String
	 */
	this.resizable = null;

	/**
	 * Specifies whether to display status at the corners of the window.
	 * The default is yes. [ yes | no | 1 | 0 ]
	 * @type String
	 */
	this.status = "yes";

	/**
	 * Window name
	 * @private
	 * @type String
	 */
	this.name = "window_" + new Date().getTime();

	/**
	 * The reference to the opened window object
	 * The default is yes. [ yes | no | 1 | 0 ]
	 * @type oNewWindow
	 */
	this.handle = null;
}

var $p = Window.prototype;

/**
 * Retrieve window style
 * @return window style string
 * @type String
 */
$p.getWindowStyle = function () {
	return (((this.width != null) ?	("width=" + this.width + ",") : "")
		+ ((this.height != null) ? ("height=" + this.height + ",") : "")
		+ ((this.top != null) ?	("top=" + this.top + ",") : "")
		+ ((this.left != null) ? ("left=" + this.left + ",") : "")
		+ ((this.toolbar != null) ?	("toolbar=" + this.toolbar + ",") : "")
		+ ((this.location != null) ? ("location=" + this.location + ",") : "")
		+ ((this.directories != null) ?	("directories=" + this.directories + ",") : "")
		+ ((this.menubar != null) ?	("menubar=" + this.menubar + ",") : "")
		+ ((this.scrollbars != null) ? ("scrollbars=" + this.scrollbars + ",") : "")
		+ ((this.resizable != null) ?	("resizable=" + this.resizable + ",") : "")
		+ ((this.status != null) ? ("status=" + this.status + ",") : "")
		).replace(/,$/, "");
}

/**
 * Shows current web window width argument
 * @param {Variable} arg a argument
 * @return a window handle
 * @type Object
 * @see #open
 */
$p.show = function(arg) {
	if (this.isActive()) {
		this.focus();
	} else {
		this.open(arg);
	}
}

/**
 * Opens a new window and loads the document specified by the given URL (Window.getCommonWebURL()),
 * or opens a blank document if a source is not provided.
 * @return an window handle
 * @type Object
 */
$p.open = function (arg) {
	if (this.isActive()) {
		this.close();
	}
	var handle = this.handle = window.open(
		(/HTTPS:/i.test(document.URL) ?
		Window.getCommonWebURL() : "about:blank")
		, this.name
		, this.getWindowStyle());
	handle.document.open();
	handle.document.write(this.sourceCode);
	handle.window.windowArguments = {"arguments" : arg, "window" : window};
	handle.window.owner = this;
	handle.window.setInterval("try{if(!owner.isAlive())window.close();}"
		+ "catch(e){window.close();}", 1000);
	handle.document.close();	
	return handle;
}

/**
 * Hides the current window
 * @return an window handle
 * @type Object
 */
$p.hide = function () {
	if (this.isActive()) {
		window.focus();
	}
}

/**
 * Closes the current browser Window
 * @return an object
 * @type void
 */
$p.close = function() {
	if (this.isActive()) {
		this.handle.close();
	}
	this.handle = null;
}
/**
 * Focuses the current browser Window
 * @type void
 */
$p.focus = function () {
	if (this.isActive()) {
		this.handle.focus();
	}
}

/**
 * Determines if the current window is active.
 * @return  <code>true</code> if the current window is active.
 *          <code>false</code> otherwise.
 * @type boolean
 */
$p.isActive = function() {
	try {
		return (this.handle != null &&
			this.handle.closed == false);
	} catch (ex) {
		return false;
	}
}

/**
 * Returns the value of Window
 * @return an window handle
 * @type Object
 */
$p.valueOf = function () {
	return this.handle;
}

/**
 * Retrieves the common web url
 * @return an url string
 * @type String
 */
Window.getCommonWebURL = function () {
	return (System.getSystemHome()
		+ "/res/__web.htm");
}
