_JSVM_Namespace.runtimeEnvironment.loadModule("moz",function(){var jsre=_JSVM_Namespace.runtimeEnvironment;var Exception=_JSVM_Namespace.kernel.Exception;var defaultClassloader4Moz=new function(){var cacheEnable=true;var classResourceBases=[];var libResources=[];var classHome=null;var libHome=null;var logger=null;var cache=null;var CacheComponent=function(){var dict={};this.getClass=function(name){return dict[name];};this.putClass=function(name,code){dict[name]=code;}};var resourceLoader=new function(){var xmlHttp=null;try{xmlHttp=new XMLHttpRequest();}catch(ex){throw new Exception(0x0020,"moz.js/Create ResourceLoader Error: Can't Create XmlHttp object.",ex);};this.loadTxtResource=function(src){try{xmlHttp.open("GET",src,false);xmlHttp.send(null);}catch(ex){xmlHttp.abort();throw new Exception(0x0021,"moz.js/ResourceLoader/loadTxtResource(String): Can't load Resource [src:"+src+"] {XmlHttp.send() Error:"+ex.message+"}",ex);};if(xmlHttp.status==200||xmlHttp.status==0){return xmlHttp.responseText;};throw new Exception(0x0021,"moz.js/ResourceLoader/loadTxtResource(String): Can't load Resource [src:"+src+"] {HTTP-STATUS:"+xmlHttp.status+"}",null);}};var loadLibFromObject=function(obj){try{var entity=obj.entity;for(var c in entity){cache.putClass(c,entity[c]);}}catch(ex){throw new Exception(0x002E,"moz.js/Classloader:loadLibFromObject(Object): fail. [obj:"+obj+"]",ex);}};var loadScriptLib=function(src){document.write("<script language=\"javascript\" src=\""+((/^(\.|\\|\/|(\w){2,8}:)/.test(src))?src:(libHome+"/"+src))+"\"></script>");};this.loadClassSource=function(name){var err;var classDirs=[classHome].concat(classResourceBases);for(var i=0;i<classDirs.length;i++){var path=classDirs[i]+"/"+name.replace(/\./gi,"/")+".jsc";try{return resourceLoader.loadTxtResource(path);}catch(ex){err=ex;if((ex instanceof Exception)&&(ex.number & 0x0000FFFF)==0x0021){continue;}}};throw new Exception(0x0024,"moz.js/Classloader/loadClassSource(String): Can't load ["+name+"] Class Resource.",err);};this.initialize=function(){cache=new CacheComponent();for(var i=0;i<libResources.length;i++){this.loadLib(libResources[i]);}};this.loadClass=function(name){try{var code=cache.getClass(name);if(null!=code){return code;};code=this.loadClassSource(name);if(cacheEnable&&code!=null){cache.putClass(name,code);};return code;}catch(ex){throw new Exception(0x002B,"moz.js/Classloader.loadClass(String): Class: '"+name+"' NotFound.",ex);}};this.loadPackage=function(name){throw new Exception(0x001B,"moz.js/Classloader.loadPackage(String) not implemented.");};this.loadLib=function(arg){try{switch(typeof(arg)){case "string":loadScriptLib(arg);break;case "object":loadLibFromObject(arg);break;}}catch(ex){logger.log(new Exception(0x002C,"ie.js/Classloader.loadLib(arg): fail [arg:"+arg+"]",ex));}};this.setCacheEnable=function(b){cacheEnable=(b==true);};this.getCacheEnable=function(){return cacheEnable;};this.setClasspath=function(cp){if(cp!=null&&cp!=""){var cps=cp.replace(/;$/,"").split(";");for(var i=0;i<cps.length;i++){if(/\.(\w)+$/.test(cps[i].toLowerCase())){var l=libResources.length;libResources[l++]=cps[i];}else{var l=classResourceBases.length;classResourceBases[l++]=cps[i].replace(/\/$/,"");}}}};this.setClassHome=function(ch){classHome=ch;};this.getClassHome=function(){return classHome;};this.setLibHome=function(lh){libHome=lh;};this.getLibHome=function(){return libHome;};this.setLogger=function(lg){logger=lg;}};var tmp=null;defaultClassloader4Moz.setClassHome(((tmp=jsre.config.getParameter("class_home"))==null)?(jsre.jsvmHome+"/classes"):tmp.replace("${jsvmHome}",jsre.jsvmHome));defaultClassloader4Moz.setLibHome(((tmp=jsre.config.getParameter("lib_home"))==null)?(jsre.jsvmHome+"/lib"):tmp.replace("${jsvmHome}",jsre.jsvmHome));defaultClassloader4Moz.setClasspath(jsre.classpath.replace("${jsvmHome}",jsre.jsvmHome));defaultClassloader4Moz.setLogger(jsre.JSVM.logger);defaultClassloader4Moz.setCacheEnable(!jsre.debug);defaultClassloader4Moz.initialize();jsre.JSVM.setClassloader(defaultClassloader4Moz);});