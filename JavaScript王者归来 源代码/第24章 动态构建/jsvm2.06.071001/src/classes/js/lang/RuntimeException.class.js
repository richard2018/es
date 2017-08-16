# language: JSVM2

/**
 * @fileoverview js.lang.RuntimeException class {@link http://jsvm.org/}
 * @file		RuntimeException.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */

package js.lang;

import js.lang.Exception;


/**
 * Constructs a new runtime exception with the
 * specified detail message and cause
 * Inherit from Exception
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends Exception
 * @class RuntimeException is the superclass of those 
 *  exceptions that can be thrown during the normal 
 *  operation of the JavaScript Virtual Machine. 
 * @constructor
 * @return A new RuntimeException
 * @see Exception js.lang.Exception is the base class for this
 */

class RuntimeException extends Exception () {
	super.apply(this, arguments.length > 0 ? 
		arguments : ["Runtime Exception."]);
}