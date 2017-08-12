/*----------------------------------------------------------------------------\
|                                JSVM 2.0                                     |
|-----------------------------------------------------------------------------|
|                         Created by Wan Changhua                             |
|                      (Email,MSN: wch3116@hotmail.com)                       |
|                   For Homolo Co., Ltd. (http://jsvm.org/)                   |
|-----------------------------------------------------------------------------|
| An object based javascript framework, targeted at rich web applications,    |
| JSVM (JavaScript Virtual Machine) is implemented in JavaScript. Currently   |
| only internet explorer 5.5 and later and firefox and opera are supported.   |
|-----------------------------------------------------------------------------|
|                 Copyright (c) 2004 - 2005 Homolo Co., Ltd.                  |
|-----------------------------------------------------------------------------|
|                                                                             |
| BSD - FreeBSD Copyright Information License                                 |
|                                                                             |
| Permission is hereby granted, free of charge, to any person obtaining a     |
| copy of this software and associated documentation files (the "Software"),  |
| to deal in the Software without restriction, including without limitation   |
| the rights to use, copy, modify, merge, publish, distribute, sublicense,    |
| and/or sell copies of the Software, and to permit persons to whom the       |
| Software is furnished to do so, subject to the following conditions:        |
|                                                                             |
| The above copyright notice and this permission notice shall be included     |
| in all copies or substantial portions of the Software.                      |
|                                                                             |
| This software is provided "as is", without warranty of any kind, express or |
| implied, including  but not limited  to the warranties of  merchantability, |
| fitness for a particular purpose and noninfringement. In no event shall the |
| authors or  copyright  holders be  liable for any claim,  damages or  other |
| liability, whether  in an  action of  contract, tort  or otherwise, arising |
| from,  out of  or in  connection with  the software or  the  use  or  other |
| dealings in the software.                                                   |
|                                                                             |
|-----------------------------------------------------------------------------|
| Dependencies: ../jsre.js, ../rtenv.conf, ./*.js                             |
|-----------------------------------------------------------------------------|
| 2005-01-02 | Renamed filename to jsre.js and updated the version to 2.01.   |
| 2005-11-11 | Added Error,Exception Class public method: getCause.           |
| 2005-11-14 | Canceled the operation that the class $extends _JSVM_Namespace.|
|            | -kernel.Object when it's $super property is null.              |
| 2005-12-06 | Fixed a bug of the isClass function & modified default engine. |
| 2005-12-30 | Added isInstance(Object obj) method for all classes.           |
| 2006-05-15 | Added the Class.create(classname, constructor) method.         |
| 2006-05-25 | Changed temp method name of call() & apply() to an uuid string.|
| 2006-06-04 | Fixed a bug: the native parser definition on firefox v1.0.     |
| 2006-11-14 | Remove the JSVM logger, use JSVM-NS.runtimeEnvironment.logger  |
| 2007-01-20 | Added some comments and APIs: $import(name), $package(name).   |
|-----------------------------------------------------------------------------|
| Created 2005-01-02 | All changes are in the log above. | Updated 2007-03-30 |
\----------------------------------------------------------------------------*/

/**
 * JSVM, core module
 * @file:	kernel.js
 * @function:	defines JSVM & core components
 * @author:	Wan Changhua
 * @date:	2005.01.02
 *
 */

_JSVM_Namespace.runtimeEnvironment.loadModule("kernel", function()

{
	/**
	 * Defines some alias variables
	 */
	var jsre = _JSVM_Namespace.runtimeEnvironment, ex;
	var logger = jsre.logger;

	if (jsre.JSVM != null) {
		throw "kernel.js/JSVM already exist!";
	}

	/**
	 * The definition of the Class.
	 */
	var Class = _JSVM_Namespace.kernel.Class = Function;

	/**
	 * Loads and return the type with the specified name.
	 * @param name class name
	 * @type Class
	 */
	Class.forName = function(name) {
		return jsre.JSVM.loadClass(name);
	}

	/**
	 * Create the type with the specified name,
	 * constructor and super type.
	 */
	Class.create = function(name, constructor, superClass) {
		var clazz = constructor || new Class();
		clazz.$extends(superClass || _JSVM_Namespace.kernel.Object);
		clazz.$name = name;
		return clazz;
	}

	/**
	 * Extends class prototype
	 */
	Class.prototype.$super = null;
	Class.prototype.$class = Class;
	Class.prototype.$window = window;
	Class.prototype.$name = "Class";

	/**
	 * Create a new instance of this class
	 */
	Class.prototype.newInstance = function() {
		for (var a = [], i = 0, l = arguments.length; i < l; i++) {
			a.push("arguments[" + i +"]");
		}
		return eval("new this(" + a.join(",") + ")");
	}

	/**
	 * Returns the name of the entity represented
	 *  by this class object,as a String.
	 */
	Class.prototype.getName = function() {
		return this.$name;
	}

	/**
	 * Returns the class representing the superclass
	 *  of the entity represented by this class.
	 */
	Class.prototype.getSuperclass = function() {
		return this.$super;
	}

	/**
	 * Makes itself extend the specified class
	 */
	Class.prototype.$extends = function(clazz) {
		try {
			if (typeof((typeof(clazz) != "string") ? clazz
				: (clazz = Class.forName(clazz))) != "function") {
				throw new Exception("Class.$extends() Error: the super "
					+ "class '" + clazz + "' is invalid.");
			}
			var p = this.prototype = new clazz();
			p.$class = p.constructor = this;
			this.$super = clazz;
			return p;
		} catch(ex) {
			throw new Exception("class.$extends() Error.", ex);
		}
	}

	/**
	 * Defines the Object type
	 */
	var JObject = _JSVM_Namespace.kernel.Object = function(){};
	JObject.$name = "Object";
	JObject.prototype.$class = JObject;
	JObject.prototype.$___hc = 0x0;
	JObject.prototype.window = window;

	/**
	 * Returns the runtime class of an object.
	 */
	JObject.prototype.getClass = function() {
		return this.$class;
	}

	/**
	 * Determines whether this object is alive
	 */
	JObject.prototype.isAlive = function () {
		return (this.window.closed == false);
	}

	/**
	 * Returns the hash code of this object
	 */
	JObject.prototype.hashCode = function () {
		return (this.$___hc != 0) ? this.$___hc
			: (this.$___hc = (0x10000000 + Math.round(
			Math.random() * 0x10000000)));
	}

	/**
	 * Returns a string representation of the object.
	 */
	JObject.prototype.toString = function () {
		return ("[Object " + this.getClass().getName()
			+ "@" + this.hashCode().toString(16) + "]");
	}

	/**
	 * Determines whether this object is an
	 * istanceof the specified type
	 */
	JObject.prototype.instanceOf = function (c) {
		return (this instanceof (typeof(c)
			== "string"	? Class.forName(c) : c));
	}


	/**
	 * Defines the Package type.
	 */
	var Package = _JSVM_Namespace.kernel.Package =
		Class.create("Package", function(name) {
			this.getName = function() {
				return name;
			}
			this.getChildClass = function(clzname) {
				return Class.forName(name
					+ "." + clzname);
			}
		});


	/**
	 * Defines the Exception type.
	 */
	var Exception = _JSVM_Namespace.kernel.Exception =
		Class.create("Exception", function(message, cause) {
			this.number = _JSVM_Namespace.deviceNumber * 0x10000 + 0x1;
			this.message = message || "no message";
			this.cause = cause;
		});

	/**
	 * Returns the name of this exception.
	 */
	Exception.prototype.getName = function () {
		return this.getClass().getName();
	}

	/**
	 * Returns the message of this exception.
	 */
	Exception.prototype.getMessage = function () {
		return this.message;
	}

	/**
	 * Returns the cause of this exception.
	 */
	Exception.prototype.getCause = function () {
		return this.cause;
	}

	/**
	 * Returns a string representation of the exception.
	 */
	Exception.prototype.toString = function() {
		return this.getName() + ":" + this.getMessage();
	}

	/**
	 * Prints this throwable and its backtrace
	 *  to the standard exception stream.
	 */
	Exception.prototype.printStackTrace = function(printer) {
		var s = this.toString();
		var e = this.cause;
		while(e != null) {
			s += "\r\n\tat ";
			if (e instanceof Error) {
					s += "Error:" + e.number 
						+ "," + e.message;
			} else {
				s += e.toString();
			}
			e = e.cause;
		}
		if (!printer) {
			jsre.JSVM.console.write(s + "\r\n");
		} else {
			printer.println(s);
		}
	}


	/**
	  * Define JSVM Type
	  */
	_JSVM_Namespace.kernel.JSVM_V2_04_060820 = function () {

		// Check call way
		if (this == window) {
			return new _JSVM_Namespace.kernel.JSVM_V2_04_060820();
		}

		this.version = "2.06";

		// jsvm core component

		// component: Classloader
		var classloader = new function() {

			var classHome = jsre.jsvmHome + "/classes";
			var extName = jsre.config.getParameter("extension-name") || "class.js";
			var libHome = jsre.jsvmHome + "/lib";

			/**
			 * Finds class from cache
			 * @param name class name
			 */
			this.findClass = function (name) {
				return jsre.resource.get("$class-code{" + name + "}");
			}

			/**
			 * Finds class from cache
			 * @param name class name
			 * @param code class code
			 */
			this.putClass = function (name, code) {
				jsre.resource.put("$class-code{" + name + "}", code);
			}

			/**
			 * the Resourceloader of Classloader
			 */
			var resourceLoader = {
				loadResource : function(src) {
					try {
						var xmlHttp = jsre.getXMLHttpRequest();
						xmlHttp.open("GET", src, false);
						xmlHttp.send(null);
						var st = xmlHttp.status;
						if (st == 200 || st == 0 || st == 304) {
							return xmlHttp.responseText;
						}
					} catch (ex) {
						throw new Exception("kernel.js/Classloader.loadResource()"
							+ " Load failed, location: [" + src + "]", ex);
					} finally {
						xmlHttp = null;
					}
					throw new Exception("kernel.js/Classloader.loadResource()"
						+ " Load failed, location: [" + src + "],"
						+ " HTTP-STATUS: [" + st + "]", null);
				}
			}

			/**
			 * Loads libaray object
			 */
			var loadObjectLibrary = function(obj) {
				try {
					logger.log("JSVM/Classloader load libaray: '"
						+ obj.manifest.name + "[v" + obj.manifest.version + "]'");
					var entity = obj.entity;
					for(var c in entity) {
						classloader.putClass(c, entity[c]);
					}
				} catch (ex) {
					throw new Exception("kernel.js/Classloader:loadObjectLibrary()"
						+ " Load failed: [" + obj	+ "]", ex);
				}
			}

			/**
			 * Sets libaray loaded flag.
			 * @param nane library file location
			 */
			var setLoadedLibrary = function (lib) {
				jsre.resource.put("$loaded-flag{" + lib + "}", "true");
			}

			/**
			 * Gets libaray loaded flag.
			 * @param nane library file location
			 */
			var isLoadedLibrary = function (lib) {
				 return jsre.resource.get("$loaded-flag{" + lib + "}") == "true";
			}

			/**
			 * Loads libaray file
			 * @param src the script url
			 */
			var loadScriptLibrary = function(src) {
				if (!isLoadedLibrary(src)) {
					setLoadedLibrary(src);
					logger.log("JSVM/Classloader start loading srcipt-libaray: '" + src + "'");
					document.write("<script language=\"javascript\" src=\""
						+ ((/^(\.|\\|\/|(\w){2,8}:)/.test(src)) ?
							src : (libHome + "/" + src))
						+ "\"></script>");
				}
			}

			/**
			 * Loads a class code with spacified name
			 * @param name class name
			 */
			this.loadClassSource = function(name) {
				return resourceLoader.loadResource(classHome + "/" 
					+ name.replace(/\./gi,"/") + "." + extName);
			}

			/**
			 * Loads a class with specified name
			 * @param name class name
			 */
			this.loadClass = function(name) {
				if (name == null) {
					throw new Exception("kernel.js/Classloader.loadClass()"
						+ " name is null.");
				}
				try {
					var code = this.findClass(name);
					if (null != code) {
						return code;
					}
					code = this.loadClassSource(name);
					if (code != null) {
						this.putClass(name, code);
					}
					return code;
				} catch (ex) {
					throw new Exception("kernel.js/Classloader.loadClass()"
						+ " Not found class: " + name, ex);
				}
			}

			/**
			 * loads a package with specified name
			 * @param _packagename package name
			 */
			this.loadPackage = function(name) {
				throw new Exception("kernel.js/Classloader.loadPackage()"
					+ " Not implemented.");
			}

			/**
			 * Loads the library
			 * @param arg the lirary (type: url or object)
			 */
			this.loadLib = function (arg) {
				try {
					if (typeof(arg) == "string") {
							loadScriptLibrary(arg);
						} else {
							loadObjectLibrary(arg);
						}
				} catch (ex) {
					var err = new Exception("kernel.js/Classloader.loadLib()"
						+ " Error argument: [" + arg + "]", ex);
					logger.log(err);
					throw err;
				}
			}

			/**
			 * Sets the classpath
			 * @param cp the classpath
			 */
			this.setClasspath = function(cp) {
				if (cp != null && cp != "") {
					var cps = cp.replace(/;$/, "").split(";");
					for (var i = 0; i < cps.length; i++) {
						this.loadLib(cps[i]);
					}
				}
			}

			/**
			 * Sets the class home
			 */
			this.setClassHome = function(arg) {
				classHome = arg;
			}

			/**
			 * Returns the class home
			 */
			this.getClassHome = function() {
				return classHome;
			}

			/**
			 * Sets the library home
			 */
			this.setLibHome = function(arg) {
				libHome = arg;
			}

			/**
			 * Returns the library home
			 */
			this.getLibHome = function() {
				return libHome;
			}

		};

		/**
		 * Sets the classloader
		 */
		this.setClassloader = function(arg) {
			classloader = arg;
		}

		/**
		 * Returns the classloader
		 */
		this.getClassloader = function() {
			return classloader;
		}

		/**
		 * Defines default console
		 */
		this.console = {
			/**
			 * Writes
			 */
			"write" : function(msg) {
				window.alert(msg);
			},
			/**
			 * Reads
			 */
			"read" : function(pmt) {
				window.prompt(pmt);
			}};

		/**
		 * Sets the console of JSVM
		 */
		this.setConsole = function(arg) {
			this.console = arg;
		}

		/**
		 * Defines default container
		 */
		var container = new function() {

			/**
			 * class container
			 */
			var classes = {};

			/**
			 * Puts the class into container
			 */
			this.putClass = function(name, entity) {
				classes[name] = entity;
			}

			/**
			 * Returns the class by specified name
			 */
			this.getClass = function(name) {
				return classes[name];
			}

			/**
			 * class code container
			 */
			var classCodes = {};

			/**
			 * Puts the class code into container
			 */
			this.putClassCode = function(name, code) {
				classCodes[name] = code;
			}

			/**
			 * Returns the class code by specified classname
			 */
			this.getClassCode = function(name) {
				return classCodes[name];
			}

			/**
			 * Clears all classes and class codes
			 */
			this.clear = function () {
				classes = {};
				classCodes = {};
			}

			/**
			 * Returns a list of all loaded classes that
			 *  were cached by this container.
			 */
			this.getClasses = function () {
				var o = {}, p;
				for (p in classes) {
					o[p] = classes[p];
				}
				return o;
			}

			/**
			 * Returns a list of all loaded class codees that
			 *  were cached by this container.
			 */
			this.getClassCodes = function () {
				var o = {}, p;
				for (p in classCodes) {
					o[p] = classCodes[p];
				}
				return o;
			}
		};

		/**
		 * Sets container for JSVM
		 */
		this.setContainer = function(arg) {
			container = arg;
		}

		/**
		 * Returns the current container of JSVM
		 */
		this.getContainer = function() {
			return container;
		}

		/**
		 * Defines default compiler for JSVM
		 */
		var compiler = new function() {

			/**
			 * Defines parser container
			 */
			var parsers = {"native" : {parse : function(s){return s;}}};

			/**
			 * Sets the parser of the specified name
			 */
			this.setParser = function(name, parser) {
				parsers[name.toLowerCase()] = parser;
			}

			/**
			 * Retrieves the parser of the specified name
			 */
			this.getParser = function(name) {
				return parsers[name.toLowerCase()];
			}

			var regexp_lang = /^(\s*)#( *)(language)( *):( *)(\S+)(\s*)/;

			/**
			 * Compiles the source code
			 */
			this.compile = function (sourceCode) {
				var code = sourceCode;
				if (regexp_lang.test(code)) {
					code = code.replace(regexp_lang, "");
					var lang = RegExp.$6;
					var parser = this.getParser(lang);
					if (parser != null) {
						try {
							code = parser.parse(code);
						} catch(ex) {
							throw new Exception("kernel.js/JSVM.compiler.compile()"
								+ " Parse failed: [" + sourceCode + "]");
						}
					} else {
						throw new Exception("kernel.js/JSVM.compiler.compile()"
							+ " Not found parser: '" + lang + "'.");
					}
				}
				return code;
			}
		};

		/**
		 * Sets the compiler by the specified compiler
		 */
		this.setCompiler = function(arg) {
			compiler = arg;
		}

		/**
		 * Retrieves the compiler by the specified name
		 */
		this.getCompiler = function() {
			return compiler;
		}

		/**
		 * Defines the default engine.
		 */
		var engine = new function() {

			var engine = this;

			/**
			 * Defines API for all js class scope
			 */

			/**
			 * Imports and returns the class by specified name
			 */
			var _$import = function(name) {
				return JSVM.loadClass(name);
			}, $import = _$import;

			/**
			 * Defines the package by the specified name
			 */
			var _$package = function(name) {
				engine.definePackage(name);
			}, $package = _$package;

			/**
			 * Defines the executor for the current engine
			 */
			this.executor = new function() {

				// Mask these variables
				var jsre, JSVM, engine, typeOf, isPackage, isClass;
				var ExecuteException = Class.create("ExecuteException"
					, function () {
						return this.getSuperclass().apply(this, arguments);
					}, Exception);

				/**
				 * Executes the js-class code.
				 */
				this.execute = function(code) {
					try {
						(function(){eval(code)})();
					} catch (ex) {
						var flag = false;
						var cause = ex.cause;
						while (cause != null) {
							if (cause instanceof ExecuteException) {
								flag = true;
								break;
							}
							cause = cause.cause;
						}
						throw new ExecuteException("kernel.js/executor.execute() fail. "
							+ (flag ? "" : "[code: " + code + "]") , ex);
					}
				}
			}

			/**
			 * Retrieves the type of the variable
			 * by the specified name.
			 */
			var typeOf = function(name) {
				try {
					return eval("typeof " + name);
				} catch (ex) {
					return "undefined";
				}
			}

			/**
			 * Determines whether the type of the variable
			 *  is Package by the specified name
			 */
			var isPackage = function(name) {
				return (typeOf(name) == "object");
				}
			/**
			 * Determines whether the type of the variable
			 *  is Class by the specified name
			 */
			var isClass = function(name) {
				return (typeOf(name) != "undefined");
				}

			/**
			 * Defines the container for these locked class
			 */
			var lockeds = {};

			/**
			 * Determines whether the class is
			 * locked by the specified name
			 */
			var isLocked = function(name) {
					return (lockeds[name] == 1);
				}

			/**
			 * Locks the specified class
			 */
			var lock = function(name) {
					lockeds[name] = 1;
				}
			/**
			 * Unlocks the specified class
			 */
			var unlock = function(name) {
					lockeds[name] = 0;
				}

			/**
			 * Defines a class by name and code
			 */
			this.defineClass = function(name, code) {
				try {
					if (isLocked(name)) {
						throw new Exception("kernel.js/JSVM.engine.defineClass()"
							+ " Class: '" + name + "' is locked.");
					}
					lock(name);
					this.executor.execute(code);
					var c = eval(name);
					if (typeof(c) == "function") {
						c.prototype.$class = c;
						c.$name = name;
					} else {
						logger.log("JSVM Warn: the class '" + name
							+ "' is not a function instance !");
					}
					return c;
				} catch (ex) {
					throw new Exception("kernel.js/JSVM.engine.defineClass() Error.", ex);
				} finally {
					unlock(name);
				}
			}
			/**
			 * Defines a package by name.
			 */
			this.definePackage = function(name) {
				if (isPackage(name) || typeOf(name) == "object") {
					return;
				} else if (typeOf(name) == "undefined") {
					var idx = name.lastIndexOf(".");
					if (idx > -1) {
						this.definePackage(name.substring(0, idx));
					}
					eval("window." + name + "=new Package(name);");
				} else {
					throw new Exception("kernel.js/JSVM.engine.definePackage()"
						+ " Var '" + name + "' always exists.");
				}
			}
		};

		/**
		 * Sets the engine for JSVM
		 */
		this.setEngine = function(o) {
			engine = o;
		}

		/**
		 * Returns the engine of JSVM
		 */
		this.getEngine = function() {
			return engine;
		}

		/**
		 * Loads the class with the specified name.
		 */
		this.loadClass = function(name) {
			try {
				// get a class from container with name.
				var clazz = container.getClass(name);
				if (clazz == null) {
					// determine whether this variable exists.
					try {
						var obj = eval(name), type = typeof(obj);
						if (type == "object" || type == "function") {
							logger.log("warn: the class '" + name 
								+ "' already exists outside of JSVM container.");
							return obj;
						}
					} catch (ex) {
						// do nothing.
					}
					// get class code from container with name.
					var code = container.getClassCode(name);
					if (!code) {
						// get class code from classloader with name.
						code = classloader.loadClass(name);
						// compile the resource code.
						code = compiler.compile(code);
						// put the class code into container.
						container.putClassCode(name, code);
					}
					// define class by engine.
					clazz = engine.defineClass(name, code);
					// put the class into container.
					container.putClass(name, clazz);
				}
				return clazz;
			} catch (ex) {
				var err = new Exception("kernel.js/JSVM.loadClass()"
					+ " Not found class: " + name, ex);
				logger.log(err);
				throw err;
			}
		}

		/**
		 * Loads a package with the specified name.
		 */
		this.loadPackage = function(name) {
			var err = new Exception("kernel.js/JSVM.loadPackage() Not implemented.");
			logger.log(err);
			throw err;
		}

		/**
		 * Initializes JSVM
		 */
		this.initialize = function() {
			classloader.setClasspath(jsre.classpath);
		}

		/**
		 * Destroies JSVM
		 */
		this.destroy = function() {
			container.clear();
		}

	}

	// Creates and initialize an instance of JSVM
	window.JSVM = jsre.JSVM = new _JSVM_Namespace.kernel.JSVM_V2_04_060820();

	if (jsre.state == 4) {
		JSVM.initialize();
	}
	//logger.log("JSVM initialized.");

	/**
	 * defines a link for Class
	 */
	window.Class = Class;

	/**
	 * Imports a class with specified name.
	 */
	window._import = window.$import = function (name) {
		try {
			var clazz = JSVM.loadClass(name);
			var shortName = name.replace(/(.*)\./, "");
			if ("undefined"	== typeof(window[shortName])) {
				window[shortName] = clazz;
			}
		} catch(ex) {
			ex.printStackTrace();
			throw ex;
		}
	}


});
