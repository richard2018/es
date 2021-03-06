# language: JSVM2

/**
 * @fileoverview js.io.IOException class {@link http://jsvm.org/}
 * @file		IOException.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */

package js.io;

import js.lang.Exception;

/**
 * Create a new IOException instance.
 * Inherit from Exception
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends Exception
 * @class this is an io exception class
 * @constructor
 * @return A new IOException
 * @see Exception js.lang.Exception is the base class for this
 */
class IOException extends Exception () {
	super.apply(this, arguments.length > 0 ? 
		arguments : ["Input/Output Error."]);
}