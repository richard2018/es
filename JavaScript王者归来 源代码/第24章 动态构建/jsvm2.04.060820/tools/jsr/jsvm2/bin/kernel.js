_JSVM_Namespace.runtimeEnvironment.loadModule("kernel",function(){var jsre=_JSVM_Namespace.runtimeEnvironment;if(jsre.JSVM!=null){throw("kernel.js/JSVM already exist!");};var Class=_JSVM_Namespace.kernel.Class=Function;Class.prototype.$super=null;Class.prototype.$class=Class;Class.prototype.$name="Class";Class.prototype.$window=window;Class.forName=function(name){return jsre.JSVM.loadClass(name);};Class.create=function(name,constructor,base){var clazz=(constructor==null)?new Class():function(){return constructor.apply(this,arguments);};clazz.$extends(base||_JSVM_Namespace.kernel.Object);clazz.$name=name;return clazz;};Class.prototype.newInstance=function(){var s="new this(";for(var i=0;i<arguments.length;i++){s+="arguments["+i+"],";};return eval(s.replace(/,$/,"")+");");};Class.prototype.isInstance=function(o){return(o instanceof this)||(o!=null&&o.instanceOf!=null&&o.instanceOf(this.getName()));};Class.prototype.getName=function(){return this.$name;};Class.prototype.getSuperclass=function(){return this.$super;};Class.prototype.$extends=function(clazz){try{if(typeof((typeof(clazz)!="string")?clazz:(clazz=Class.forName(clazz)))!="function"){throw new Exception(0x0017,"Class.$extends(clazz) error:"+" the super class '"+clazz+"' is an invalid class.");};var p=this.prototype=new clazz();p.$class=p.constructor=this;this.$super=clazz;return p;}catch(ex){throw new Exception(0x0018,"class.$extends(clazz) fail.",ex);}};if(typeof(Class.prototype.call)!="function"){Class.prototype.call=function(obj){if(obj==null||typeof(obj)!="object"){throw new Exception(0x0010,"Class.call() argument is not a object!");};obj.__10b7bd87308899eaa62fc9cce5620376=this;var args=[];for(var i=0;i<arguments.length-1;i++){args[i]="arguments["+(i+1)+"]";};var r=eval("obj.__10b7bd87308899eaa62fc9cce5620376("+args.join(",")+");");delete obj.__10b7bd87308899eaa62fc9cce5620376;return r;}};if(typeof(Class.prototype.apply)!="function"){Class.prototype.apply=function(obj,_arguments){if(obj==null||typeof(obj)!="object"){throw new Exception(0x0011,"Class.apply() argument is not a object!");};obj.__10b7bdb5dd95e4f2708cfa36f3569503=this;var args=[];for(var i=0;i<_arguments.length;i++){args[i]="_arguments["+i+"]";};var r=eval("obj.__10b7bdb5dd95e4f2708cfa36f3569503("+args.join(",")+");");delete obj.__10b7bdb5dd95e4f2708cfa36f3569503;return r;}};var Object=_JSVM_Namespace.kernel.Object=function(){};Object.$name="Object";Object.prototype.$class=Object;Object.prototype.$___hc=0x0;Object.prototype.window=window;Object.prototype.getClass=function(){return this.$class;};Object.prototype.live=function(){return(this.window.closed==false);};Object.prototype.hashCode=function(){return(this.$___hc!=0)?this.$___hc:(this.$___hc=(0x10000000+Math.round(Math.random()*0x10000000)));};Object.prototype.toString=function(){return("[Object "+this.getClass().getName()+"@"+this.hashCode().toString(16)+"]");};Object.prototype.instanceOf=function(c){return(this instanceof(typeof(c)=="string"?Class.forName(c):c));};Object=window.Object;var Package=_JSVM_Namespace.kernel.Package=function(name){this.getName=function(){return name;};this.getChildClass=function(clzname){return Class.forName(name+"."+clzname);}};Package.$name="Package";Package.prototype.$class=Package;Error.$super=null;Error.$name="Error";Error.prototype.$class=Error;Error.prototype.getName=function(){return this.name;};Error.prototype.getMessage=function(){return this.message;};Error.prototype.getCause=function(){return null;};if(Error.prototype.name==null){Error.prototype.name="Error";Error.prototype.getMessage=function(){return this.description;}};var Exception=_JSVM_Namespace.kernel.Exception=function(number,message,cause){this.number=_JSVM_Namespace.deviceNumber*0x10000+number;this.message=message;this.cause=cause;};Exception.$extends(_JSVM_Namespace.kernel.Object);Exception.prototype.constructor=Exception.prototype.$class=Exception;Exception.$name="Exception";Exception.prototype.getName=function(){return this.getClass().getName();};Exception.prototype.getMessage=function(){return this.message;};Exception.prototype.getCause=function(){return this.cause;};Exception.prototype.toString=Error.prototype.toString=function(){return this.getName()+":"+this.getMessage();};Exception.prototype.printStackTrace=Error.prototype.printStackTrace=function(){var s=this.toString();var e=this.cause;while(e!=null){s+="\r\n\tat "+e.toString();e=e.cause;}(arguments.length>0&&typeof(arguments[0].println)=="function")?arguments[0].println(s):jsre.JSVM.console.output(s+"\r\n");};_JSVM_Namespace.kernel.JSVM_V2_04_060820=function(){if(this==window){throw new Error("create instance must by \"new\" .");};this.version="2.04.060820";this.state=0;var classloader=null;this.setClassloader=function(oClassloader){classloader=oClassloader;this.logger.log("JSVM set classloader succ.");};this.getClassloader=function(){return classloader;};this.console=null;this.setConsole=function(oConsole){this.console=oConsole;this.logger.log("JSVM set console succ.");};var container=null;this.setContainer=function(oContainer){container=oContainer;this.logger.log("JSVM set container succ.");};this.getContainer=function(){return container;};var compiler=null;this.setCompiler=function(oCompiler){compiler=oCompiler;this.logger.log("JSVM set compiler succ.");};this.getCompiler=function(){return compiler;};var engine=null;this.setEngine=function(oEngine){engine=oEngine;this.logger.log("JSVM set engine succ.");};this.getEngine=function(){return engine;};this.loadClass=function(name){try{var clazz=container.getClass(name);if(clazz!=null){return clazz;};var code=container.getClassCode(name);if(code==null){code=classloader.loadClass(name);code=compiler.compile(code);container.putClassCode(name,code);};clazz=engine.defineClass(name,code);container.putClass(name,clazz);return clazz;}catch(ex){var err=new Exception(0x0018,"kernel.js/JSVM.loadClass() fail."+" [classname:"+name+"]",ex);this.logger.log(err);throw err;}};this.loadPackage=function(name){var err=new Exception(0x001B,"kernel.js/JSVM.loadPackage() not implemented.");this.logger.log(err);throw err;};this.logger=new function(){var list=[];this.onchange=null;this.log=function(s){var l=list.length;var d=new Date();list[l]=['[',d.toLocaleString(),':',d.getMilliseconds(),' JSVM] ',s].join('');if(this.onchange!=null){this.onchange(list[l]);}};this.getLogs=function(){return list.concat([]);}};this.initialize=function(){};this.destroy=function(){}};var JSVM=jsre.JSVM=new _JSVM_Namespace.kernel.JSVM_V2_04_060820();JSVM.initialize();JSVM.logger.log("JSVM initialized.");JSVM.setContainer(new function(){var classesCache={};this.putClass=function(name,entity){classesCache[name]=entity;};this.getClass=function(name){return classesCache[name];};var classesCodeCache={};this.putClassCode=function(name,code){classesCodeCache[name]=code;};this.getClassCode=function(name){return classesCodeCache[name];};this.clear=function(){classesCache={};classesCodeCache={};};this.getClassesCache=function(){return classesCache;};this.getClassesCodeCache=function(){return classesCodeCache;}});JSVM.setConsole(new function(){this.output=function(msg){window.alert(msg);};this.input=function(pmt){window.prompt(pmt);}});JSVM.setCompiler(new function(){var parsers={"native":{parse:function(s){return s;}}};this.setParser=function(name,parser){parsers[name.toLowerCase()]=parser;JSVM.logger.log("JSVM compiler set the '"+name+"' parser succ.");};this.getParser=function(name){return parsers[name.toLowerCase()];};var regexp_lang=/^(\s*)#( *)(language)( *):( *)(\S+)(\s*)/;this.compile=function(sourceCode){var code=sourceCode;if(regexp_lang.test(code)){code=code.replace(regexp_lang,"");var language=RegExp.$6;var parser=this.getParser(language);if(parser!=null){try{code=parser.parse(code);}catch(ex){throw new Exception(0x001A,"kernel.js/JSVM.compiler.compile() error. [code: "+sourceCode+"]");}}else{throw new Exception(0x001C,"kernel.js/JSVM.compiler.compile() error. the parser for '"+language+"' can't been found.");}};return "(function(){"+code+"})();";}});JSVM.setEngine(new function(){var engine=this;var _$import=function(name){return JSVM.loadClass(name);};var _$package=function(name){engine.definePackage(name);};this.executor=new function(){var jsre,JSVM,engine,typeOf,isPackage,isClass;this.execute=function(code){try{eval(code);}catch(ex){var flag=false;var cause=ex.cause;while(cause!=null){if(cause.number==_JSVM_Namespace.deviceNumber*0x10000+0x0012){flag=true;break;};cause=cause.cause;};throw new Exception(0x0012,"kernel.js/JSVM.engine.executor.execute() fail. "+(flag?"":"[code: "+code+"]"),ex);}}};var typeOf=function(name){try{return eval("typeof "+name);}catch(ex){return "undefined";}};var isPackage=function(name){return(typeOf(name)=="object"&&(eval(name)instanceof Package));};var isClass=function(name){return(typeOf(name)=="object"&&(eval(name)instanceof Class));};var classLock=new function(){var lockeds={};this.lock=function(name){lockeds[name]=1;};this.unlock=function(name){lockeds[name]=0;};this.isLocked=function(name){return(lockeds[name]==1);}};this.defineClass=function(name,code){try{if(classLock.isLocked(name)){throw new Exception(0x0013,"kernel.js/JSVM.engine.defineClass() fail. class: '"+name+"' is locked.",ex);};classLock.lock(name);this.executor.execute(code);eval("var c=eval(name);c.prototype"+".$class=c;c.$name=name;");return c;}catch(ex){throw new Exception(0x001E,"kernel.js/JSVM.engine.defineClass() fail.",ex);}finally{classLock.unlock(name);}};this.definePackage=function(name){if(isPackage(name)){return;};if(typeOf(name)=="undefined"){var idx=name.lastIndexOf(".");if(idx>-1){this.definePackage(name.substring(0,idx));};return eval("window."+name+"=new Package(name);");};throw new Exception(0x0014,"kernel.js/JSVM.engine.definePackage() fail. {'"+name+"' has been defined.}");}});JSVM.setClassloader(new function(){var tmp,ex;var classResourceBases=[];var libResources=[];var classHome=((tmp=jsre.config.getParameter("class_home"))==null)?(jsre.jsvmHome+"/classes"):tmp.replace("${jsvmHome}",jsre.jsvmHome);var libHome=((tmp=jsre.config.getParameter("lib_home"))==null)?(jsre.jsvmHome+"/lib"):tmp.replace("${jsvmHome}",jsre.jsvmHome);var logger=JSVM.logger;var cache={"dict":{},"getClass":function(name){return this.dict[name];},"putClass":function(name,code){this.dict[name]=code;}};var resourceLoader=new function(){this.loadTxtResource=function(src){try{var xmlHttp=(jsre.navigator=="ie")?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();xmlHttp.open("GET",src,false);xmlHttp.send(null);var stus=xmlHttp.status;if(stus==200||stus==0||stus==304){return xmlHttp.responseText;}}catch(ex){throw new Exception(0x0021,"ie.js/ResourceLoader/loadTxtResource(String): Can't load Resource [src:"+src+"] {XmlHttp.send() Error:"+ex.getMessage().replace(/\r\n$/,"")+"}",ex);}finally{xmlHttp=null;};throw new Exception(0x0021,"ie.js/ResourceLoader/loadTxtResource(String): Can't load Resource [src:"+src+"] {HTTP-STATUS:"+stus+"}",null);}};var loadLibFromObject=function(obj){try{var entity=obj.entity;for(var c in entity){cache.putClass(c,entity[c]);}}catch(ex){throw new Exception(0x002E,"moz.js/Classloader:loadLibFromObject(Object): fail. [obj:"+obj+"]",ex);}};var loadScriptLib=function(src){document.write("<script language=\"javascript\" src=\""+((/^(\.|\\|\/|(\w){2,8}:)/.test(src))?src:(libHome+"/"+src))+"\"></script>");};this.loadClassSource=function(name){var err;var classDirs=[classHome].concat(classResourceBases);for(var i=0;i<classDirs.length;i++){var path=classDirs[i]+"/"+name.replace(/\./gi,"/")+".jsc";try{return resourceLoader.loadTxtResource(path);}catch(ex){err=ex;if((ex instanceof Exception)&&(ex.number & 0x0000FFFF)==0x0021){continue;}}};throw new Exception(0x0024,"ie.js/Classloader/loadClassSource(String): Can't load ["+name+"] Class Resource.",err);};this.initialize=function(){for(var i=0;i<libResources.length;i++){this.loadLib(libResources[i]);}};this.loadClass=function(name){try{var code=cache.getClass(name);if(null!=code){return code;};code=this.loadClassSource(name);if(code!=null){cache.putClass(name,code);};return code;}catch(ex){throw new Exception(0x002B,"ie.js/Classloader.loadClass(String): Class: '"+name+"' NotFound.",ex);}};this.loadPackage=function(name){throw new Exception(0x001B,"ie.js/Classloader.loadPackage(String) not implemented.");};this.loadLib=function(arg){try{switch(typeof(arg)){case "string":loadScriptLib(arg);break;case "object":loadLibFromObject(arg);break;}}catch(ex){logger.log(new Exception(0x002C,"ie.js/Classloader.loadLib(arg): fail [arg:"+arg+"]",ex));}};this.setClasspath=function(cp){if(cp!=null&&cp!=""){var cps=cp.replace(/;$/,"").split(";");for(var i=0;i<cps.length;i++){if(/\.(\w)+$/.test(cps[i].toLowerCase())){var l=libResources.length;libResources[l++]=cps[i];}else{var l=classResourceBases.length;classResourceBases[l++]=cps[i].replace(/\/$/,"");}}}};this.setClassHome=function(ch){classHome=ch;};this.getClassHome=function(){return classHome;};this.setLibHome=function(lh){libHome=lh;};this.getLibHome=function(){return libHome;};this.setLogger=function(lg){logger=lg;};this.setClasspath(jsre.classpath.replace("${jsvmHome}",jsre.jsvmHome));this.initialize();});});