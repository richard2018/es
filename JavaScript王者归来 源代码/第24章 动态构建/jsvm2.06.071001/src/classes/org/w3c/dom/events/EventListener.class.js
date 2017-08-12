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


/**
 * The EventListener class is the primary method for handling events. 
 * Users implement the EventListener class and register their listener 
 * on an EventTarget using the AddEventListener method. The users should also 
 * remove their EventListener from its EventTarget after they have completed 
 * using the listener. 
 * @class
 */
class EventListener (fHandler, oOwner)
{
	this.handler = fHandler;
	this.owner = (oOwner != null && 
		typeof(oOwner) == "object") ? oOwner : null;
}

var $p = EventListener.prototype;

/**
 * This method is called whenever an event occurs of the 
 * type for which the EventListener interface was registered.
 * @param {Event} oEvt 
 */
$p.handleEvent = function (oEvt, async)
{
	var h = this.handler, o = (this.owner || this);
	var func = function(){return h.call(o, oEvt);};
	return (async == true) ? setTimeout(func) : func();
}