# language: JSVM2

/**
 * @fileoverview js.util.ArrayList class {@link http://jsvm.org/}
 * @file		ArrayList.jsc
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @since		JSVM1.0
 */

package js.util;

import js.lang.Cloneable;
import js.lang.ArgumentException;


/**
 * Create a new ArrayList instance.
 * Inherit from Cloneable
 * @author	Wan Changhua
 * @version	2.01, 10/23/05
 * @extends Cloneable
 * @class This is the array class.
 * @constructor
 */
class ArrayList extends Cloneable () {

	/**
	 * @private
	 */
	this.__array = [];
}

var $p = ArrayList.prototype;

/**
 * Returns an array containing all of the elements in this list
 * in the correct order.
 * @return an array containing all of the elements in this list
 * 	       in the correct order.
 * @type Array
 */
$p.toArray = function() {
	return this.__array.concat([]);
}

/**
 * Searches for the first occurence of the given argument, testing 
 * for equality using the <tt>equals</tt> method. 
 *
 * @param   o   an object.
 * @return  the index of the first occurrence of the argument in this
 *          list; returns <tt>-1</tt> if the object is not found.
 * @type int
 */
$p.indexOf = function(o) {
	var l = this.__array.length;
	for (var i = 0; i < l; i++) {
		if (this.__array[i] == o) {
			return i;
		}
	}
	return -1;
}

/**
 * Returns the index of the last occurrence of the specified object in
 * this list.
 *
 * @param   o   the desired element.
 * @return  the index of the last occurrence of the specified object in
 *          this list; returns -1 if the object is not found.
 * @type int
 */
$p.lastIndexOf = function(o) {
	var l = this.__array.length - 1;
	for (var i = l; i >= 0; i--) {
		if (this.__array[i] == o) {
			return i;
		}
	}
	return -1;
}

/**
 * Appends the specified element to the end of this list.
 *
 * @param arg1 index at which the specified element is to be inserted.
 * @param arg2 element to be appended to this list.
 */
$p.add = function(arg1, arg2) {
	if (arguments.length == 1) {
		this.__array.push(arg1);
	} else {
		var l1 = this.__array.length;
		var a1 = this.__array.slice(0, arg1);
		var a2 = this.__array.slice(arg1, l1);
		var l2 = a1.length;
		a1[l2] = arg2;
		this.__array = a1.concat(a2);
	}
}

 /**
  * Appends all of the elements in the specified Collection to the end of
  * this list, in the order that they are returned by the
  * specified Collection's Iterator.  The behavior of this operation is
  * undefined if the specified Collection is modified while the operation
  * is in progress.  (This implies that the behavior of this call is
  * undefined if the specified Collection is this list, and this
  * list is nonempty.)
  *
  * @param c the elements to be inserted into this list.
  * @return <tt>true</tt> if this list changed as a result of the call.
  * @throws  ArgumentException if the specified collection is not an Array instance.
  */
$p.addAll = function(a) {
	if (a instanceof Array) {
		this.__array = this.__array.concat(a);
	} else if (typeof(a.toArray) == "function"
		&& ((a = a.toArray()) instanceof Array)) {
		this.__array = this.__array.concat(a);
	} else {
		throw new ArgumentException(this.getClass().getName()
			+ ".addAll(): arguments error.");
	}
}


/**
 * Removes the element at the specified position in this list.
 * Shifts any subsequent elements to the left (subtracts one from their
 * indices).
 *
 * @param i the index of the element to removed.
 * @return the element that was removed from the list.
 */
$p.removeAt = function(i) {
	var l = this.__array.length;
	if (i < 0 || i >= l) {
		return null;
	}
	var o = this.__array[i];
	this.__array = this.__array.slice(0, i).concat(
		this.__array.slice(i + 1, l));
	return o;
}

/**
 * Removes the element at the specified position in this list.
 * Shifts any subsequent elements to the left (subtracts one from their
 * indices).
 *
 * @param o the element to removed.
 */
$p.remove = function(o) {
	var i = this.indexOf(o);
	if (i == -1) {
		return this;
	}
	return this.removeAt(i);
}


 /**
  * Returns <tt>true</tt> if this list contains the specified element.
  *
  * @param elem element whose presence in this List is to be tested.
  * @return  <code>true</code> if the specified element is present;
  *		<code>false</code> otherwise.
  * @type boolean
  */
$p.contains = function(o) {
	return this.indexOf(o) != -1;
}


/**
 * Removes all of the elements from this list.  The list will
 * be empty after this call returns.
 */
$p.clear = function() {
	this.__array.length = 0;
}


/**
 * Returns the number of elements in this list.
 *
 * @return  the number of elements in this list.
 * @type int
 */
$p.size = function() {
	return this.__array.length;
}


/**
 * Returns the element at the specified position in this list.
 *
 * @param  i index of element to return.
 * @return the element at the specified position in this list.
 * @type Object
 */
$p.get = function(i) {
	var size = this.size();
	if (i >= 0 && i < size) {
		return this.__array[i];
	} else {
		return null;
	}
}


/**
 * Returns a shallow copy of this <tt>ArrayList</tt> instance.  (The
 * elements themselves are not copied.)
 *
 * @return  a clone of this <tt>ArrayList</tt> instance.
 * @type ArrayList
 */
$p.clone = function() {
	var o = new ArrayList();
	o.addAll(this.__array);
	return o;
}
