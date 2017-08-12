/**
 * @fileoverview js.lang.JObject class {@link http://jsvm.org/}
 * @file		JObject.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */

$package("js.lang");


/**
 * Create a new JObject instance. Deprecate access 
 * _JSVM_Namespace.kernel.Object, best by js.lang.JObject.
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @class This is the basic JSVM class.  
 * @constructor
 * @return A new JObject
 * @deprecated
 */

js.lang.JObject = _JSVM_Namespace.kernel.Object;
js.lang.JObject.$super = Object;
