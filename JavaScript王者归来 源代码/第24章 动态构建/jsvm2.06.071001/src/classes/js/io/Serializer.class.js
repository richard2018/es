# language: JSVM2

/**
 * @fileoverview js.io.Serializer class {@link http://jsvm.org/}
 * @file		Serializer.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM1.0
 */

package js.io;

import js.lang.StringBuffer;
import js.io.IOException;
import js.util.HashMap;

/**
 * Create a new Serializer instance.
 * Inherit from JObject
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends js.lang.JObject
 * @class js.io.Serializer is a utility class for serialize
 * @constructor
 * @final
 * @deprecated
 */
class Serializer() {}

/**
 * serialize an object to string
 * @param {Object} obj an object to be serialized.
 * @return the result of serialized object
 * @type String
 */
Serializer.serialize = function(obj) {
	var sb = new StringBuffer();
	switch (typeof obj) {
		case 'object' :
			if (null == obj) {
				sb.append('null');
			} else if (typeof obj.serialize == 'function') {
				sb.append(obj.serialize());
			} else if (obj instanceof Array) {
				sb.append('[');
				var astr = [];
				for (var i = 0;i < obj.length; i++) {
					astr[i] = Serializer.serialize(obj[i]);
				}
				sb.append(astr.join(","));
				sb.append(']');
			} else {
				sb.append('{');
				var nc = false;
				for (var name in obj) {
					if (/^\$$/.test(name)) {
						continue;
					}
					var value = obj[name];
					var type = typeof(value);
					if (type != 'undefined' && type != 'function') {
						if (nc) {
							sb.append(',');
						} else {
							nc = true;
						}
						sb.append(Serializer.serialize(name));
						sb.append(':');
						sb.append(Serializer.serialize(value));
					}
				}
				sb.append('}');
			}
			break;
		case 'boolean' :
			sb.append(obj.toString());
			break;
		case 'number' :
			sb.append(isFinite(obj) ? String(obj) : 'null');
			break;
		case 'string' :
			sb.append('"');
			var l = obj.length;
			for (i = 0; i < l; i++) {
				var c = obj.charAt(i);
				if (c >= ' ') {
					if (c == '\\' || c == '"') {
						sb.append('\\');
					}
					sb.append(c);
				} else {
					switch (c){
						case '\b' :
							sb.append('\\b');
							break;
						case '\f' :
							sb.append('\\f');
							break;
						case '\n' : 
							sb.append('\\n');
							break;
						case '\r' : 
							sb.append('\\r');
							break;
						case '\t' : 
							sb.append('\\t');
							break;
						default:
							sb.append('\\u00');
							sb.append(c.charCodeAt().toString(16));
					}
				}
			}
			sb.append('"');
			break;
		default : 
			sb.append('null'); 
			break;
	}
	return sb.toString();
}

/**
 * unserialize a string to object
 * @param {String} str a string
 * @return an object
 * @type Object
 */
Serializer.unserialize = function(str) {
	return eval(str);
}
