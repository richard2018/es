# language: jsvm2

/**
 * @fileoverview js.util.HashMap class {@link http://jsvm.org/}
 * @file		HashMap.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM1.0
 */

package js.util;

import js.lang.JObject;
import js.lang.Cloneable;
import js.util.Iterator;


/**
 * Create a new HashMap instance.
 * Inherit from Cloneable
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends Cloneable
 * @class This is the map class.
 * @constructor
 */
class HashMap extends Cloneable () {
	this.__table = {};
}

var $p = HashMap.prototype;

/**
 * Returns an iterator of the values in this hashmap.
 * Use the Iterator methods on the returned object to fetch the elements
 * sequentially.
 *
 * @return  an iterator of the values in this hashmap.
 * @type Iterator
 */
$p.elements = function() {
	var a = [], i = 0;
	for(var h in this.__table) {
		if (!/^\$hc_/.test(h)) {
			continue;
		}
		var e = this.__table[h];
		a[i++] = e.__value;
	}
	return new Iterator(a);
}



/**
 * Returns the value to which the specified key is mapped in this idEntry
 * hash map, or <tt>null</tt> if the map contains no mapping for this key.
 * A return value of <tt>null</tt> does not <i>necessarily</i> indicate
 * that the map contains no mapping for the key; it is also possible that
 * the map explicitly maps the key to <tt>null</tt>. The
 * <tt>containsKey</tt> method may be used to distinguish these two cases.
 *
 * @param   key the key whose associated value is to be returned.
 * @return  the value to which this map maps the specified key, or
 *          <tt>null</tt> if the map contains no mapping for this key.
 * @type Object
 */
$p.get = function(key) {
	var h = hash(key);
	var e = this.__table[h];
	return (e == null) ? null 
		: e.__value;
}


/**
 * Returns <tt>true</tt> if this map contains no key-value mappings.
 *
 * @return <tt>true</tt> if this map contains no key-value mappings.
 * @type boolean
 */
$p.isEmpty = function () {
	return(this.size() == 0);
}


/**
 * Returns an iterator of the keys in this hashmap.
 *
 * @return  an iterator of the keys in this hashmap.
 * @type js.util.Iterator
 */
$p.keys = function() {
	var a = [], i = 0;
	for(var h in this.__table) {
		if (!/^\$hc_/.test(h)) {
			continue;
		}
		var e = this.__table[h];
		a[i++] = e.__key;
	}
	return new Iterator(a);
}


/**
 * Associates the specified value with the specified key in this map.
 * If the map previously contained a mapping for this key, the old
 * value is replaced.
 * @param key key with which the specified value is to be associated.
 * @param value value to be associated with the specified key.
 * @return previous value associated with specified key, or <tt>null</tt>
 *	       if there was no mapping for key.  A <tt>null</tt> return can
 *	       also indicate that the HashMap previously associated
 *	       <tt>null</tt> with the specified key.
 */
$p.put = function(key, value) {
	var h = hash(key);
	var oe = this.__table[h];
	var oldValue = (oe == null) ? null : oe.__value;
	this.__table[h] = new Entry(h, key, value);
	return oldValue;
}


 /**
  * Removes the mapping for this key from this map if present.
  *
  * @param  key key whose mapping is to be removed from the map.
  * @return previous value associated with specified key, or <tt>null</tt>
  *	       if there was no mapping for key.  A <tt>null</tt> return can
  *	       also indicate that the map previously associated <tt>null</tt>
  *	       with the specified key.
  */
$p.remove = function(key) {
	var h = hash(key);
	var oe = this.__table[h];
	delete this.__table[h];
	return (oe == null) ? null 
		: oe.__value;
}


/**
 * Returns the number of key-value mappings in this map.
 *
 * @return the number of key-value mappings in this map.
 * @type int
 */
$p.size = function() {
	var l = 0;
	for(var h in this.__table) {
		l += /^\$hc_/.test(h) ? 1 : 0;
	}
	return l;
}

/**
 * Removes all mappings from this map.
 */
$p.clear = function() {
	this.__table = {};
}


/**
 * Returns <tt>true</tt> if this map maps one or more keys to the
 * specified value.
 *
 * @param value value whose presence in this map is to be tested.
 * @return <tt>true</tt> if this map maps one or more keys to the
 *         specified value.
 * @type boolean
 */
$p.containsValue = function (value) {
	for(var key in this.__table) {
		if (this.__table[key].__value == value) {
			return true;
		}
	}
	return false;
}

/**
 * Returns <tt>true</tt> if this map contains a mapping for the
 * specified key.
 *
 * @param   key   The key whose presence in this map is to be tested
 * @return <tt>true</tt> if this map contains a mapping for the specified key.
 * @type boolean
 */
$p.containsKey = function(key) {
	var h = hash(key);
	return (typeof(this.__table[h]) 
		!= "undefined");
}

/**
 * @private
 */
var NULL_KEY = "$hc_NULL";
var hash = function (o) {
	if (o == null) {
		return NULL_KEY;
	}
	switch (typeof(o)) {
		case "string" : return ("$hc_s" + o);
		case "number" : return ("$hc_n" + o);
		case "boolean" : return ("$hc_b" + o);
		case "object" : 
			if (o instanceof String) {
				return ("$hc_s" + o.valueOf());
			}
			if (o instanceof Number) {
				return ("$hc_n" + o.valueOf());
			}
			if (o instanceof Boolean) {
				return ("$hc_b" + o.valueOf());
			}
			if (o instanceof JObject) {
				return ("$hc_j" + o.hashCode());
			}
		default : 
			return _getObjHashCode(o);
	}

}

/**
 * @private 
 */
var _hsObjs = [];
var _getObjHashCode = function (o) {
	var l = _hsObjs.length;
	for (var i = 0; i < l; i++) {
		if (_hsObjs[i] == o) {
			return "$hc_o" + i;
		}
	}
	_hsObjs[l] = o;
	return "$hc_o" + l;
}


/**
 * Returns an array containing all of the elements in this list
 * in the correct order.
 *
 * @return an array containing all of the elements in this list
 * 	       in the correct order.
 * @type Array
 */
$p.toArray = function () {
	var entities = [], i = 0;
	for(var h in this.__table) {
		entities[i++] = this.__table[h];
	}
	return entities;
}

/**
 * Returns a shallow copy of this <tt>HashMap</tt> instance: the keys and
 * values themselves are not cloned.
 *
 * @return a shallow copy of this map.
 * @type HashMap
 */
$p.clone = function () {
	var map = new HashMap();
	map.__table = Cloneable.cloneObject(this.__table);
	return map;
}


/**
  * A map entry (key-value pair). 
  * @since 2.0
  * @member HashMap
  * @ignore
  */
var Entry = function (h, k, v) {
	this.__hash = h;
	this.__key = k;
	this.__value = v;
}

var $p = Entry.prototype;

$p.getKey = function () {
	return this.__key;
}

$p.getValue = function () {
	return this.__value;
}
