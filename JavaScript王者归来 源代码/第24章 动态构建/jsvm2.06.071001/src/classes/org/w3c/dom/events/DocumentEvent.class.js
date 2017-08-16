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

import js.lang.BObject;
import js.util.HashMap;

import org.w3c.dom.DOMException;

import org.w3c.dom.events.Event;

/**
 * The DocumentEvent interface provides a mechanism by which
 * the user can create an Event of a type supported by the 
 * implementation. It is expected that the DocumentEvent interface
 * will be implemented on the same object which implements the Event model.
 * @class
 */
class DocumentEvent extends Event () {}

var $p = DocumentEvent.prototype;

/**
 * @Return The newly created Event 
 * @throws DOMException - NOT_SUPPORTED_ERR: Raised if the implementation
 *   does not support the type of Event interface requested
 * @type Event
 */
$p.createEvent = function (sType)
{
	return new Event(sType);
}