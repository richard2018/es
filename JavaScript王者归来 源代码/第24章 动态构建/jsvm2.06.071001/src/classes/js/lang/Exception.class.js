// # language: native

/**
 * @fileoverview js.lang.Exception class {@link http://jsvm.org/}
 * @file		Exception.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */

$package("js.lang");

/**
 * Create a new Exception instance.
 * @class This is the basic Exception class.  
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends _JSVM_Namespace.kernel.Exception
 * @constructor
 * @return A new Exception
 */

(js.lang.Exception = function () {
	_JSVM_Namespace.kernel.Exception.apply(this, arguments);	
}).$extends(_JSVM_Namespace.kernel.Exception);
 