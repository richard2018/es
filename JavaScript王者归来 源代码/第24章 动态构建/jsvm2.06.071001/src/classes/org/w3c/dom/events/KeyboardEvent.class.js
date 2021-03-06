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

package org.w3c.dom.events;

import org.w3c.dom.events.Event;

class KeyboardEvent extends Event (sType, oEvt)
{
	super.call(this, sType);
  this.event = oEvt;
	this.keyCode = oEvt.keyCode || oEvt.charCode;
}

var $p = KeyboardEvent.prototype;

/**
 * Used to indicate whether the 'alt' key was 
 * depressed during the firing of the event. 
 */
$p.getAltKey = function ()
{
	return this.event.altKey;
}


/**
 * Used to indicate whether the 'ctrl' key was 
 * depressed during the firing of the event. 
 */
$p.getCtrlKey = function ()
{
	return this.event.ctrlKey;
}


/**
 * Used to indicate whether the 'shift' key was 
 * depressed during the firing of the event. 
 */
$p.getShiftKey = function ()
{
	return this.event.shiftKey;
}
 
 
    
/**   
 * During keyboard events caused by the depression or 
 * release of a keycode. 
 */
$p.getKeyCode = function ()
{
	return this.keyCode;
}


$p.preventDefault = function()
{
    super.prototype.preventDefault.call(this);
    this.event.returnValue = false;
    if (System.isIeBrowser())
    {
    	try {this.event.keyCode = 0x0;}
    	catch (ex){}
    }
}

$p.dispose = function()
{
    BiEvent.prototype.dispose.call(this);
    this.event = null;
    this.keyCode = 0x0;
}

KeyboardEvent.KEYCODE_BACKSPACE = 8;
KeyboardEvent.KEYCODE_TAB = 9;
KeyboardEvent.KEYCODE_ENTER = 13;
KeyboardEvent.KEYCODE_SHIFT = 16;
KeyboardEvent.KEYCODE_CTRL = 17;
KeyboardEvent.KEYCODE_ALT = 18;
KeyboardEvent.KEYCODE_ESC = 27;
KeyboardEvent.KEYCODE_SPACE = 32;
KeyboardEvent.KEYCODE_LEFT = 37;
KeyboardEvent.KEYCODE_UP = 38;
KeyboardEvent.KEYCODE_RIGHT = 39;
KeyboardEvent.KEYCODE_DOWN = 40;

KeyboardEvent.KEYCODE_INSERT = 45;
KeyboardEvent.KEYCODE_DELETE = 46;
KeyboardEvent.KEYCODE_PAGEUP = 33;
KeyboardEvent.KEYCODE_PAGEDOWN = 34;
KeyboardEvent.KEYCODE_END = 35;
KeyboardEvent.KEYCODE_HOME = 36;

KeyboardEvent.KEYCODE_NUMPAD_0 = 96;
KeyboardEvent.KEYCODE_NUMPAD_1 = 97;
KeyboardEvent.KEYCODE_NUMPAD_2 = 98;
KeyboardEvent.KEYCODE_NUMPAD_3 = 99;
KeyboardEvent.KEYCODE_NUMPAD_4 = 100;
KeyboardEvent.KEYCODE_NUMPAD_5 = 101;
KeyboardEvent.KEYCODE_NUMPAD_6 = 102;
KeyboardEvent.KEYCODE_NUMPAD_7 = 103;
KeyboardEvent.KEYCODE_NUMPAD_8 = 104;
KeyboardEvent.KEYCODE_NUMPAD_9 = 105;
KeyboardEvent.KEYCODE_NUMPAD_MULTIPLY = 106;
KeyboardEvent.KEYCODE_NUMPAD_PLUS = 107;
KeyboardEvent.KEYCODE_NUMPAD_MINUS = 109;
KeyboardEvent.KEYCODE_NUMPAD_DIVIDE = 111;

KeyboardEvent.KEYCODE_F1 = 112;
KeyboardEvent.KEYCODE_F2 = 113;
KeyboardEvent.KEYCODE_F3 = 114;
KeyboardEvent.KEYCODE_F4 = 115;
KeyboardEvent.KEYCODE_F5 = 116;
KeyboardEvent.KEYCODE_F6 = 117;
KeyboardEvent.KEYCODE_F7 = 118;
KeyboardEvent.KEYCODE_F8 = 119;
KeyboardEvent.KEYCODE_F9 = 120;
KeyboardEvent.KEYCODE_F10 = 121;
KeyboardEvent.KEYCODE_F11 = 122;
KeyboardEvent.KEYCODE_F12 = 123;

KeyboardEvent.KEYCODE_NUM_LOCK = 144;