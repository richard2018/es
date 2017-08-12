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

import js.lang.System;

import org.w3c.dom.DOMException;
import org.w3c.dom.events.Event;

/**
 * The <code>MouseEvent</code> interface provides specific contextual 
 * information associated with Mouse events.
 */
class MouseEvent extends Event (sType, oEvt)
{
	super.call(this, sType);
  this.event = oEvt;
}

var $p = MouseEvent.prototype;

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
 * During mouse events caused by the depression or
 * release of a mouse button, button is used to indicate
 * which mouse button changed state.
 */
$p.getButton = function ()
{
	return (System.isIeBrowser() &&	this.event.type == "click") ? 
		1 : this.event.button;
}

/**
 * The horizontal coordinate at which the event occurred
 * relative to the DOM implementation's client area.
 */
$p.getClientX = function ()
{
	return this.event.clientX;
}

/**
 * The vertical coordinate at which the event occurred relative
 * to the DOM implementation's client area.
 */
$p.getClientY = function ()
{
	return this.event.clientY;
}

/**
 * Used to indicate whether the 'meta' key was
 * depressed during the firing of the event.
 */
$p.getMetaKey = function ()
{
	// TODO
	throw new DOMException(MouseEvent.getName() +
		".getMetaKey() has not implemented.");
}

/**
 * @private
 */
var isIE = System.isIeBrowser();

/**
 * Used to identify a secondary EventTarget
 * related to a UI event.
 */
$p.getRelatedTarget = function ()
{
	var relEl = null;
	if (isIE)
	{
		if (this.event.type == "mouseover")
		{
			relEl = this.event.fromElement;
		}
		else if (this.type == "mouseout")
		{
			relEl = this.event.toElement;
		}
		else
		{
			relEl = this.event.srcElement;
		}
	}
	else
	{
		relEl = this.event.relatedTarget;
	}
	try
	{
		while (relEl != null &&
			relEl.referenceObject == null)
		{
			relEl = relEl.parentNode;
		}
	}
	catch (ex)
  {
  	return null;
 	}
 	return (relEl == null) ? 
 		null : relEl.referenceObject;
}

/**
 * Used to identify a secondary EventTarget
 * related to a UI event.
 */
$p.getScreenX = function ()
{
	return this.event.screenX;
}

/**
 * The horizontal coordinate at which the event occurred
 * relative to the origin of the screen coordinate system.
 */
$p.getScreenY = function ()
{
	return this.event.screenY;
}



MouseEvent.BTN_LEFT = isIE ? 1 : 0;
MouseEvent.BTN_RIGHT = isIE ? 2 : 1;
MouseEvent.BTN_MIDDLE = isIE ? 4 : 2;
