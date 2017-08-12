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

class Event (sType)
{
	/**
	 * Retrieves the event name from the event object.
	 */
	this.type = sType || "event";

	this.target = null;
	this.currentTarget = null;
	
	/**
	 * Sets or retrieves whether the current event should 
	 * bubble up the hierarchy of event handlers.
	 */
	this.bubbles = true;

	/**
	 * @private
	 */
	this.__defaultPrevented = false;
	
	/**
	 * @private
	 */
	this.cancelable = true;
	
	/**
	 * @private
	 */
	this.__propagationStopped = false;

	/**
	 * @private
	 */
	this.__phase = Event.CAPTURING_PHASE;
	
	/**
	 * @private
	 */
	this.__timestamp = new Date().getTime();
}

var $p = Event.prototype;


/**
 * The name of the event (case-insensitive). The name must be an XML name.
 */
$p.getType = function()
{
	return this.type;
}

/**
 * Used to indicate the <code>EventTarget</code> to which the event was 
 * originally dispatched. 
 */
$p.getTarget = function()
{
	return this.target;
}

/**
 * Used to indicate the <code>EventTarget</code> whose 
 * <code>EventListeners</code> are currently being processed. This is 
 * particularly useful during capturing and bubbling. 
 */
$p.getCurrentTarget = function()
{
	return this.currentTarget;
}




/**
 * Used to indicate whether or not an event is a bubbling event. If the 
 * event can bubble the value is true, else the value is false. 
 */
$p.getBubbles = function()
{
	return this.bubbles;
}


/**
 * Stops the propagation of events further along in the DOM.
 */
$p.stopPropagation = function()
{
    this.__propagationStopped = true;
}

/** 
 * Retrieves whether the current event should stop propagation.
 */
$p.getPropagationStopped = function()
{
    return this.__propagationStopped;
}


/**
 * Used to indicate whether or not an event can have its default action 
 * prevented. If the default action can be prevented the value is true, 
 * else the value is false. 
 */
$p.getCancelable = function() 
{
	return this.cancelable;
}

/**
 * Used to indicate which phase of event flow is currently being 
 * evaluated. 
 */
$p.getEventPhase = function ()
{
	return this.__phase;
}

/**
 *  Used to specify the time (in milliseconds relative to the epoch) at 
 * which the event was created. Due to the fact that some systems may 
 * not provide this information the value of <code>timeStamp</code> may 
 * be not available for all events. When not available, a value of 0 
 * will be returned. Examples of epoch time are the time of the system 
 * start or 0:0:0 UTC 1st January 1970. 
 */
$p.getTimeStamp = function ()
{
	return this.__timestamp;
}

/**
 * Cancels the event (if it is cancelable).
 */
$p.preventDefault = function()
{
	if (this.getCancelable())
	{
		this.__defaultPrevented = true;
  }
}

$p.getDefaultPrevented = function()
{
    return this.__defaultPrevented;
}


/**
 * The <code>initEvent</code> method is used to initialize the value of an 
 * <code>Event</code> created through the <code>DocumentEvent</code> 
 * interface. This method may only be called before the 
 * <code>Event</code> has been dispatched via the 
 * <code>dispatchEvent</code> method, though it may be called multiple 
 * times during that phase if necessary. If called multiple times the 
 * final invocation takes precedence. If called from a subclass of 
 * <code>Event</code> interface only the values specified in the 
 * <code>initEvent</code> method are modified, all other attributes are 
 * left unchanged.
 * @param eventTypeArgSpecifies the event type. This type may be any 
 *   event type currently defined in this specification or a new event 
 *   type.. The string must be an XML name. Any new event type must not 
 *   begin with any upper, lower, or mixed case version of the string 
 *   "DOM". This prefix is reserved for future DOM event sets. It is 
 *   also strongly recommended that third parties adding their own 
 *   events use their own prefix to avoid confusion and lessen the 
 *   probability of conflicts with other new events.
 * @param canBubbleArgSpecifies whether or not the event can bubble.
 * @param cancelableArgSpecifies whether or not the event's default 
 *   action can be prevented.
 */
$p.initEvent = function (sType, bBubbles, bCancelable)
{
	this.type = sType;
	this.bubbles = bBubbles;
	this.cancelable = bCancelable;
}


/**
 * The current event phase is the capturing phase.
 */
Event.CAPTURING_PHASE = 1;
/**
 * The event is currently being evaluated at the target 
 * <code>EventTarget</code>.
 */
Event.AT_TARGET = 2;
/**
 * The current event phase is the bubbling phase.
 */
Event.BUBBLING_PHASE = 3;
