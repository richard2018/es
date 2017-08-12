# language: jsvm2

/**
 * @fileoverview js.lang.Cloneable class {@link http://jsvm.org/}
 * @file		Cloneable.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM2.0
 */

package js.lang;

import js.lang.JObject;
import js.lang.ArgumentException;

/**
 * A class extends the <code>js.lang.Cloneable</code> class to 
 * indicate to the clone() method that it 
 * is legal for that method to make a 
 * field-for-field copy of instances of that class. 
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends JObject
 * @class js.lang.Cloneable is the base class for all can be cloned class.
 * @constructor
 * @throws ArgumentException if param error
 * @return A new Cloneable
 * @see JObject js.lang.JObject is the base class for this
 */

class Cloneable () {}

var $p = Cloneable.prototype;

/**
 * Creates and returns a copy of this object.  The precise meaning 
 * of "copy" may depend on the class of the object. The general 
 * intent is that, for any object x, the expression:
 * The method clone for class Object performs a 
 * specific cloning operation. 
 * The class does not itself extends the class 
 * Cloneable, so calling the clone method on an object 
 * whose class is Object will result in throwing an
 * exception at run time.
 *
 * @exception  ArgumentException  if the object's class does not
 *               support the <code>Cloneable</code> class. Subclasses
 *               that override the <code>clone</code> method can also
 *               throw this ArgumentException to indicate that an instance cannot
 *               be cloned.
 * @return a clone of this instance.
 * @type Object
 */
$p.clone = function () {
	var co = this.getClass().newInstance();
	for (var p in this) {
		var v = this[p];
		if (typeof(v) == "function") {
			continue;
		}
		co[p] = v;
	}
	return co;
}

/**
 * Creates and returns a copy of this parameter.  
 * @param {Object} obj an object
 * @exception  ArgumentException  if the parameter can not been cloned.
 * @return a clone of this parameter.
 * @type Object
 */
Cloneable.cloneObject = function (o) {
	if (o instanceof Cloneable) {
		return o.clone();
	}
	var type = typeof(o);
	switch (type) {
		case "undefined" :
		case "boolean" : 
		case "string" : 
		case "number" : return o;
		case "function" : return o;
		case "object" : 
			if (o == null) {
				return null;
			} else if (o instanceof Date) {
				return new Date(o.getTime());
			} else if (o instanceof Number) {
				return new Number(o.valueOf());
			} else if (o instanceof Boolean) {
				return new Boolean(o.valueOf());
			} else if (o instanceof Error) {
				return new Error(o.number, o.message);
			} else if (o instanceof Array) {
				return o.concat([]);
			} else if (o instanceof JObject) {
				throw new ArgumentException(Cloneable.getName()
					+ ".cloneObject(o) error, coundn't clone a '"
					+ o.getClass().getName()
					+ "' instance.");
			} else if (o instanceof Object) {
				var co = {};
				for (var k in o) {
					co[k] = Cloneable.cloneObject(o[k]);
				}
				return co;
			} else {
				throw new ArgumentException(Cloneable.getName()
					+ ".cloneObject(o) error: unknow type.");
			}
		default : break;
	}
	throw new ArgumentException(Cloneable.getName()
		+ ".cloneObject(o) error, [type: " 
		+ type + "]");
}
