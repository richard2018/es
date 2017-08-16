# language: JSVM2

/**
 * @fileoverview js.dom.EventManager class {@link http://jsvm.org/}
 * @file		EventManager.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */

package js.dom;

import js.lang.BObject;
import js.lang.NotSupportException;
import js.lang.ArgumentException;
import js.lang.System;
import js.util.ArrayList;

/**
 * the js.dom.EventManager instance.
 * Inherit from BObject
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends BObject
 * @class This is the EventManager class.  
 * @constructor
 * @param <Object> cs
 * @return an EventManager class
 */

class EventManager extends BObject () {

	/* Don't let anyone instantiate this class 
	 */
	throw new NotSupportException(EventManager.getName()
		+ " cannot be instantiated.");
}

/**
 * @private
 */

var listenerList = new ArrayList();

var registerListener = function(target, type, handler, scope, useCapture) {
	var listener = createEventListenerByHanlder(handler, scope || target);
	listenerList.add({"target" : target, "type" : type
		, "handler" : handler, "scope" : scope
		, "useCapture" : useCapture
		, "listener" : listener});
	return listener;
}

var unregisterListener = function(target, type, handler, scope, useCapture) {
	var i = 0, l = listenerList.size();
	for (; i < l; i++) {
		var o = listenerList.get(i);
		if (o.target == target && o.type == type &&
			o.handler == handler && o.scope == scope
			&& o.useCapture == useCapture) {
			listenerList.remove(o);
			return o.listener;
		}
	}
}

var createEventListenerByHanlder = function(handler, scope) {
	return function (evt) {
		return handler.call(scope, (evt || window.event));
	}
}

System.addVMDestroyListener(function() {
	var o, i = 0, objs = listenerList.toArray();
	while(o = objs[i++]) {
		EventManager.detachEvent(o.target, o.type
			, o.handler, o.scope, o.useCapture);
	}
});


/**
 * Binds the specified function to an event that fires
 * on the object when the function is called.
 *
 * @param   target	event target.
 * @param   type	event type.
 * @param   handler pointer that specifies the function previously set using the attachEvent method.
 * @param   scope	event listener.
 * @param   useCapture	use capture
 * @returns	Returns one of the following possible values:
 *					<code>true</code> The function is bound successfully to the event. 
 *					<code>false</code> The function is not bound to the event. 
 * @type boolean
 */
EventManager.addEventListener = function(target, type, handler, scope, useCapture) {
	try	{
		useCapture = (useCapture == true);
		var fpNotify = registerListener(target, type, handler, scope, useCapture);
		if (target.addEventListener) {
			target.addEventListener(type, fpNotify, useCapture);
		} else if (target.attachEvent) {
			target.attachEvent("on" + type, fpNotify);
			if (useCapture && target.setCapture) {
				target.setCapture();
			}
		}
	} catch (ex) {
		throw new ArgumentException(EventManager.getName()
			+ ".attachEvent() arguments error.", ex);
	}
}

/**
 * Unbinds the specified function from the event, 
 * so that the function stops receiving notifications 
 * when the event fires on the object.
 *
 * @param   target	event target.
 * @param   type	event type.
 * @param   handler pointer that specifies the function previously set using the attachEvent method.
 * @param   scope	event listener.
 * @param   useCapture	use capture
 */
EventManager.removeEventListener = function(target, type, handler, scope, useCapture) {
	try {
		useCapture = (useCapture == true);
		var fpNotify = unregisterListener(target, type, handler, scope, useCapture);
		if (fpNotify == null) {
			return;
		}
		if (target.removeEventListener) {
			target.removeEventListener(type, fpNotify, useCapture);
		} else if (target.detachEvent) {
			target.detachEvent("on" + type, fpNotify);
			if (useCapture && target.releaseCapture) {
				target.releaseCapture();
			}
		}
	} catch (ex) {
		throw new ArgumentException(EventManager.getName()
			+ ".detachEvent() arguments error.", ex);
	}
}

/*
 * @see #addEventListener
 * @see #removeEventListener
 * @Deprecated
 */ 
EventManager.attachEvent = EventManager.addEventListener;
EventManager.detachEvent = EventManager.removeEventListener;
