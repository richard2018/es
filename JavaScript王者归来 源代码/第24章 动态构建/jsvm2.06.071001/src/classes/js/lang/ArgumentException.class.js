# language: JSVM2

/**
 * @fileoverview js.lang.ArgumentException class {@link http://jsvm.org/}
 * @file		ArgumentException.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM1.0
 */

package js.lang;

import js.lang.Exception;

/**
 * Create a new ArgumentException instance.
 * Inherit from Exception
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends Exception
 * @class this is a ArgumentException class
 * @constructor
 * @return A new ArgumentException
 * @see Exception js.lang.Exception is the base class for this
 */

class ArgumentException extends Exception () {
	super.apply(this, arguments.length > 0 ? 
		arguments : ["Arguments Illegal."]);
}

