# language: JSVM2

/**
 * Copyright (c) 2000 World Wide Web Consortium,
 * (Massachusetts Institute of Technology, Institut National de
 * Recherche en Informatique et en Automatique, Keio University). All
 * Rights Reserved. This program is distributed under the W3C's Software
 * Intellectual Property License. This program is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE.
 * See W3C License http://www.w3.org/Consortium/Legal/ for more details.
 */

package org.w3c.dom.html;

import org.w3c.dom.DOMException;
import org.w3c.dom.events.EventTarget;
import org.w3c.dom.Element;

class HTMLElement extends Element (tagName)
{

	super.call(this, tagName);
	EventTarget.call(this);
	this.globalize();

	this.__entity = null;	
	this.__className = "";	
	this.__builded = false;	

}

var $p = HTMLElement.prototype;


/**
 *  The element's identifier. See the  id attribute definition in HTML 4.0.
 */
$p.getId = function ()
{
	return "_he_" + this.getUniqueId();
}

/**
 * The class attribute of the element. This attribute has been renamed
 * due to conflicts with the "class" keyword exposed by many languages.
 * See the  class attribute definition in HTML 4.0.
 */
$p.getClassName = function ()
{
	return this.__className;
}

$p.setClassName = function (className)
{
	this.__className = className;
	var entity = this.getEntity();
	if (entity != null)
	{
		entity.setAttribute("className", className);
	}
}


/**
 * Override the insertBefore method of superclass
 */
$p.insertBefore = function (newChild, refChild)
{
	super.prototype.insertBefore.call(this, newChild, refChild);
	newChild.parent = this;
	return newChild;
}


/**
 * Override the replaceChild method of superclass
 */
$p.replaceChild = function (newChild, oldChild)
{
	super.prototype.replaceChild.call(this, newChild, oldChild);
	oldChild.parent = null;
	newChild.parent = this;
	return oldChild;
}


/**
 * Override the removeChild method of superclass
 */
$p.removeChild = function (oldChild)
{
	super.prototype.removeChild.call(this, oldChild);
	oldChild.__parentNode = null;
	return oldChild;
}

/**
 * Override the appendChild method of superclass
 */
$p.appendChild = function (newChild)
{
	super.prototype.appendChild.call(this, newChild);
	newChild.parent = this;
	return newChild;
}

/**
 *
 */
$p.getEntity = function (autoCreate)
{
	return (this.__entity == null && autoCreate) ? 
		this.createEntity() : this.__entity;
}

/**
 *
 */
$p.build = function (elmt)
{
	elmt = elmt || document.body;
	if (!this.__builded)
	{
		elmt.appendChild(this.getEntity(true));
		this.__builded = true;
	}
}


/**
 *
 */
var __htmlTag = "SPAN";

/**
 * @private method
 */
$p.createEntity = function (tagName)
{
	try
	{
		var entity = this.__entity;
		if (entity == null)
		{
			entity = this.__entity = document.createElement(tagName || __htmlTag);
			entity.setAttribute("id", this.getId());
			entity.setAttribute("ownerHTMLElement", this);
			entity.setAttribute("classType", this.getClass().getName());
			entity.setAttribute("className", this.getClassName());
		}
		return entity;
	}
	catch (ex)
	{
		throw new DOMException(this.getClass().getName()
			+ ".createEntity() error.", ex);
	}
}

/**
 * @deprecated
 */
$p.destroy = function ()
{
	this.dispose();
}


$p.dispose = function ()
{
	var nodes = this.getChildNodes();
	for (var i = 0; i < nodes.length; i++)
	{
		nodes[i].dispose();
	}
	var entity = this.__entity;
	if (entity != null)
	{
		entity.removeAttribute("ownerHTMLElement");
		if (entity.parentNode != null)
		{
			entity.parentNode.removeChild(entity);
		}
		this.__entity = null;
	}
	this.__builded = false;
}

$p.isVisible = function ()
{
	return (this.getEntity() && this.getEntity().display == "");
}

$p.setVisible = function (b)
{
	var entity = this.getEntity();
	if (entity != null)
	{
		entity.style.display = b ? "" : "none";
	}
}

/**
 * @deprecated
 */
$p.show = function ()
{
	this.setVisible(true);
}

/**
 * @deprecated
 */
$p.hide = function ()
{
	this.setVisible(false);
}


$p.focus = function ()
{
	var entity = this.getEntity();
	if (entity != null)
	{
		entity.focus();
	}
}

$p.blur = function ()
{
	var entity = this.getEntity();
	if (entity != null)
	{
		entity.blur();
	}
}
