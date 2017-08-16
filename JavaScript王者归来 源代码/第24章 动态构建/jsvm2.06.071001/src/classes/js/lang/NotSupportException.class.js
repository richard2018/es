# language: JSVM2

/**
 * @fileoverview js.lang.NotSupportException class {@link http://jsvm.org/}
 * @file		NotSupportException.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */

package js.lang;

import js.lang.Exception;


/**
 * Constructs a new unsupported exception with the
 * specified detail message and cause
 * Inherit from Exception
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends Exception
 * @class this is a NotSupportException class
 * @constructor
 * @return A new NotSupportException
 * @see Exception js.lang.Exception is the base class for this
 */

class NotSupportException extends Exception () {
	super.apply(this, arguments.length > 0 ? 
		arguments : ["System don't support!"]);
}