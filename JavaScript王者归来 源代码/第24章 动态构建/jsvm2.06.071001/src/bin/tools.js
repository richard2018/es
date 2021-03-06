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
| Dependencies: ../../jsre.js, ../runtime.js                                  |
|-----------------------------------------------------------------------------|
| 2006-12-07 | Created by Wan Changhua.                                       |
|-----------------------------------------------------------------------------|
| Created 2006-12-07 | All changes are in the log above. | Updated 2006-12-07 |
\----------------------------------------------------------------------------*/

/**
 * JSVM, extend tools
 * @file:	tools.js
 * @function:	load tools
 * @author:	Wan Changhua
 * @date:	2006.12.07
 *
 */

_JSVM_Namespace.runtimeEnvironment.loadModule("tools", function()
{
	var jsre = _JSVM_Namespace.runtimeEnvironment, JSVM = jsre.JSVM;

	/**
	 *	plug-in SimpleTree
	 */
	JSVM.getEngine().definePackage("jsvm.tools");

	jsvm.tools.TreeNode = function (text, value) {

		this.id = createUID();
		globalNodes[this.id] = this;

		this.text  = text;
		this.value = value;
		this.attributes = {};
		this.childNodes = [];

		this.checked = false;
		this.open = false;

		this.appendChild = function (cn) {
			this.childNodes.push(cn);
		}

		this.setAttribute = function (name, value) {
			this.attributes[name] = value;
		}

		this.getAttribute = function (name) {
			return this.attributes[name];
		}

		this.hasChild = function () {
			return this.childNodes.length > 0;
		}

		this.getElement = function () {
			return document.getElementById("div_" + this.id);
		}

		this.getChildElement = function () {
			return document.getElementById("cn_" + this.id);
		}

		this.getCheckBox = function () {
			return document.getElementById("cb_" + this.id);
		}

		this.getICON = function () {
			return document.getElementById("icon_" + this.id);
		}

		this.changeCheck = function () {
			var el = this.getCheckBox();
			if (el.checked) {
				this.check();
			} else {
				this.uncheck();
			}
		}

		this.check = function () {
			this.checked = true;
			var el = this.getCheckBox();
			el.checked = true;
			for (var i = 0; i < this.childNodes.length; i++) {
				this.childNodes[i].check();
			}
		}

		this.uncheck = function () {
			this.checked = false;
			var el = this.getCheckBox();
			el.checked = false;
			for (var i = 0; i < this.childNodes.length; i++) {
				this.childNodes[i].uncheck();
			}
		}

		this.toggle = function () {
			if (this.open) {
				this.collapse();
			} else {
				this.expand();
			}
		}
		
		this.expandAll = function () {
			this.expand();
			for (var i = 0; i < this.childNodes.length; i++) {
				this.childNodes[i].expandAll();
			}
		}
		
		this.expand = function () {
			this.open = true;
			if (this.hasChild()) {
				this.getICON().innerHTML = "6";
			}
			var el = this.getChildElement();
			el.style.display = "";
		}
			
		this.collapse = function () {
			this.open = false;
			if (this.hasChild()) {
				this.getICON().innerHTML = "4";
			}
			var el = this.getChildElement();
			el.style.display = "none";	
		}
			
		collapse = function () {
			this.expand();
			for (var i = 0; i < this.childNodes.length; i++) {
				this.childNodes[i].collapseAll();
			}
		}

		this.getCheckedChildNodes = function () {
			var ccns = [];
			for (var i = 0; i < this.childNodes.length; i++) {
				var cn = this.childNodes[i];
				if (cn.checked) {
					ccns.push(cn);
				}
				if (cn.hasChild()) {
					ccns = ccns.concat(cn.getCheckedChildNodes());
				}
			}
			return ccns;
		}

		this.toString = function (n) {

			if (n == null) {
				n = 0;
			}
			var sb = [];
			sb.push('<div id="div_' + this.id + '">');
			sb.push(getSpaceCharHTML(n));
			if (this.hasChild()) {
				sb.push(getControlableIconHTML(this.id));
			} else {
				sb.push(getLeafIconHTML());
			}
			sb.push(' <input type=checkbox id="cb_');
			sb.push(this.id);
			sb.push('" style="width:11pt;height:11pt" onclick="jsvm.tools.TreeNode.checkNode(\'');
			sb.push(this.id);
			sb.push('\');"> <label for="cb_');
			sb.push(this.id);
			sb.push('" title="');
			sb.push((this.value || '').replace(/&/g, '&amp').replace(/"/g, '&quot;'));
			sb.push('">');
			sb.push(this.text);
			sb.push('</label>');
			sb.push('<div id="cn_');
			sb.push(this.id);
			sb.push('" style="display:none">');
			for (var i = 0; i < this.childNodes.length; i++) {
				sb.push(this.childNodes[i].toString(n + 1));
			}
			sb.push('</div>');
			sb.push('</div>');
			return sb.join('');

		}

		this.build = function (el) {
			// prevent dom leak
			if (el.nodeName == null && typeof el == "string") {
					el = document.getElementById(el);
			}
			if (el != null) {
				el.innerHTML = this.toString();
			}
		}

	}

	var seqNumber = 0;
	var globalNodes = {};
	var createUID = function () {
		return "__n" + (seqNumber++);
	}

	var getSpaceCharHTML = function (n) {
		if (n == null || n == 0) {
				return "";
			}
		var sb = ['<font face="Webdings" color="white">'];
		for (var i = 0; i < n; i++) {
			sb.push('g');
			}
		sb.push('</font>');
		return sb.join('');
	}
	var getControlableIconHTML = function (id) {
		return '<font face="Webdings" style="cursor:pointer" id="icon_' + id + '" onclick="jsvm.tools.TreeNode.toggleNode(\'' + id + '\')">4</font>';
	}
	var getLeafIconHTML = function () {
		return '<font face="Webdings" color="white">g</font>';
	}

	jsvm.tools.TreeNode.get = function (id) {
		return globalNodes[id];
	}
	jsvm.tools.TreeNode.checkNode = function (id) {
		jsvm.tools.TreeNode.get(id).changeCheck();
	}
	jsvm.tools.TreeNode.toggleNode = function (id) {
		jsvm.tools.TreeNode.get(id).toggle();
	}

	jsvm.tools.JSArchivePackager = {};

	// defines constants
	var str_regexps = [/("(\\"|[^"\n]|(\\\n))*")/g, /('(\\'|[^'\n]|(\\\n))*')/g];
	var str_prefix = '${14a2af98-ba5a-4391-a7ab-06eeddf874c4', str_suffix = '}';
	var regExps_regexps = /(\/(\\\/|[^\/\n])*\/)/g;

	var getConstantString = function (t, i, rnd) {
		return str_prefix + rnd + "|" + t + i + str_suffix;
	}

	// compress source code.
	var compress = function (src) {

		var ds = src.replace(/\r\n/g, '\n');

		// create a random string
		var rnd = new Date().getTime() + "." + Math.round(Math.random() * 1000);

		// replace string expression.
		var constStrs = (ds.match(str_regexps[0]) || []).concat(ds.match(str_regexps[1]) || []);
		for (var i = 0; i < constStrs.length; i++) {
			ds = ds.replace(constStrs[i], getConstantString("S", i, rnd));
		}

		// remove comments.
		ds = ds.replace(/([^\\]|^)\/\/([^\n])*/g, '$1').replace(/(\/\*)\/?(([^\*]\/)|[^\/])*(\*\/)/g, '');

		// replace regexp expression.
		var constRegExps = ds.match(regExps_regexps) || [];
		for (var i = 0; i < constRegExps.length; i++) {
			ds = ds.replace(constRegExps[i], getConstantString("R", i, rnd));
		}

		// remove space charset.
		var ss = null;
		while(ds != ss) {
			ss = ds;
			ds = ss.replace(/(\ |\t)(=|>|<|\{|\}|\(|\)|\+|\-|\*|\?|\:|\;|\,)/g, '$2')
				.replace(/(=|>|<|\{|\}|\(|\)|\+|\-|\*|\?|\:|\;|\,)(\ |\t)/g, '$1')
				.replace(/(\ |\t)==/g, '==')
				.replace(/==(\ |\t)/g, '==')
				.replace(/(\ |\t)!=/g, '!=')
				.replace(/!=(\ |\t)/g, '!=')
				.replace(/(\ |\t)<=/g, '<=')
				.replace(/<=(\ |\t)/g, '<=')
				.replace(/(\ |\t)>=/g, '>=')
				.replace(/>=(\ |\t)/g, '>=')
				.replace(/(\ |\t)&&/g, '&&')
				.replace(/&&(\ |\t)/g, '&&')
				.replace(/(\ |\t)\|\|/g, '||')
				.replace(/\|\|(\ |\t)/g, '||');
		}

		// remove blank line.
		var ss = null;
		while(ds != ss) {
			ss = ds;
			ds = ss.replace(/\n\n/g, '\n')
				.replace(/\n(\s)+/g, '\n')
				.replace(/(\s)+\n/g, '\n')
				.replace(/(\n)*\{(\n)*/g, '{')
				.replace(/(\n)*\}/g, '}')
				.replace(/(\n)*\((\n)*/g, '(')
				.replace(/(\n)*\)/g, ')')
				.replace(/\{\n\{/g, '{{')
				.replace(/\}\n\}/g, '}}')
				.replace(/\)\n\)/g, '))')
				.replace(/\(\n\(/g, '((')
				.replace(/(\n)else/g, 'else')
				.replace(/(\n)catch/g, 'catch')
				.replace(/(\n)finally/g, 'finally')
				.replace(/\n(\+|\-|\*|\&|\||=|\.|\?|:|\,|;|>|<)/g, '$1')
				.replace(/(\+|\-|\*|\&|\||=|\.|\?|:|\,|;|>|<)\n/g, '$1')
				.replace(/\n&&/g, '&&')
				.replace(/&&\n/g, '&&')
				.replace(/\n\|\|/g, '||')
				.replace(/\|\|\n/g, '||')
				.replace(/\n>=/g, '>=')
				.replace(/>=\n/g, '>=')
				.replace(/\n<=/g, '<=')
				.replace(/<=\n/g, '<=')
				.replace(/\n\!=/g, '!=')
				.replace(/\!=\n/g, '!=')
				.replace(/(;|\{)(\}+)\n+\]/g, '$1$2]')
				.replace(/(;|\{)(\}+)(\n+)([^\]])/g, '$1$2;$4');
		}

		// restore regexp expression.
		for (var i = constRegExps.length - 1; i >= 0; i--) {
			ds = ds.replace(getConstantString("R", i, rnd), constRegExps[i]);
		}

		// restore string expression.
		for (var i = constStrs.length - 1; i >= 0; i--) {
			ds = ds.replace(getConstantString("S", i, rnd),	constStrs[i]);
		}

		ds = ds.replace(/(^\s+)|\s+$/g, "");
		return ds;
	}

	var convertToStringPart = function (s0, c) {
		var s = s0.replace(/\\/g, "\\\\");
		s = (c == "'") ? s.replace(/'/g, "\\'") : s.replace(/"/g, "\\\"");
		return s.replace(/\t/g, "\\t").replace(/\r/g, "\\r")
			.replace(/\n/g, "\\n");
	}

	/**
	 * Converts a string variable to a string expression
	 */
	var convertToStringExpression = function (s, c) {
		var bc = c || "\"";
		return bc + convertToStringPart(s, c) + bc;
	}


	/**
	 * document event listener
	 */
	var listener = function (evt) {
		if (evt.keyCode == 120 && evt.ctrlKey) {
			jsvm.tools.JSArchivePackager.packJSArchive();
		}
	}

	/**
	 * Starts listening hotkey
	 */
	jsvm.tools.JSArchivePackager.startListenHotkey = function () {
		Class.forName("js.dom.EventManager").addEventListener(document, "keydown", listener);
	}
	/**
	 * Stops listening hotkey
	 */
	jsvm.tools.JSArchivePackager.stopListenHotkey = function () {
		Class.forName("js.dom.EventManager").removeEventListener(document, "keydown", listener);
	}
	
	jsvm.tools.JSArchivePackager.startListenHotkey();

	// add listener.
	Class.forName("js.lang.System").addVMDestroyListener(function (){
			jsvm.tools.JSArchivePackager.stopListenHotkey();
		});


	var selectorHDL = null;
	var getSelectorWindow = function () {
		if (selectorHDL != null) {
			return selectorHDL;
		}
		selectorHDL = Class.forName("js.dom.Window").newInstance(
		
				"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">"
				+ "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">"
				+ "<title>JSVM JavaScript Archive Packager V0.1</title>"
				+ "<style>"
				+ "body {padding:0px;background-color:white;color:black;font-family:MS Sans Serif;font-size:12px;}\r\n"
				+ ".panel {border:2px inset;width:440px;height:320px;overflow:auto;padding:5px}\r\n"
				+ ".button {margin-top:2px}\r\n"
				+ "</style>"
				+ "<script>"
				+ "opener._JSVM_Namespace.apply(window);$import('js.lang.System');"
				+ "var fso=null;var getFileSystemObject=function(){if(fso!=null){return fso;}try{fso=new ActiveXObject(\"Scripting.FileSystemObject\");return fso;}catch(e){throw \"Not support 'Scripting.FileSystemObject'!\";}};"
				+ "var classHome=null;var getTreeNodeByClassHome=function(){classHome=document.getElementById('jsrepath').value;if(classHome!=''){classHome=classHome.replace(/jsre\\.js$/,'classes');}else{classHome=System.getClassHome();}if(/^file:\\/\\//.test(classHome)){classHome=classHome.replace(/^file:\\/\\//, '');};try {classHome=getFileSystemObject().getFolder(classHome).path;}catch(e){throw 'Security Error! FSO can not access the real path (classHome):'+classHome;};var root=new jsvm.tools.TreeNode(\"Class Home\", classHome);finishChildNodes(root);return root;};var finishChildNodes=function(node){var folder=getFileSystemObject().getFolder(node.value);var files=new Enumerator(folder.Files);for(;!files.atEnd();files.moveNext()){var file=files.item();if(/\\.class\\.js$/.test(file.name)){var childNode=new jsvm.tools.TreeNode(file.name, file.path);var className=file.path.replace(classHome,\"\").replace(\".class.js\",\"\").replace(/^\\\\/, \"\").replace(/\\\\/g, \".\");childNode.setAttribute(\"className\", className);node.appendChild(childNode);}}var folders=new Enumerator(folder.SubFolders);for(;!folders.atEnd();folders.moveNext()){var subfolder=folders.item();if(subfolder.name!=\"CVS\"){var childNode=new jsvm.tools.TreeNode(subfolder.name, subfolder.path);finishChildNodes(childNode);node.appendChild(childNode);}}};\r\n"
				+ "var out={print:function(s){System.out.print(s);document.getElementById('divPanel3').insertAdjacentHTML(\"beforeEnd\",s);},println:function(s){System.out.println(s);document.getElementById('divPanel3').insertAdjacentHTML(\"beforeEnd\",s+'<br/>');}};"
				+ "var currIndex=0;function showPanel(n){if(n<4)currIndex=n;hideAllPanel();document.getElementById('divPanel'+n).style.display='';}\r\n"
				+ "function hideAllPanel(){for(var i=0;i<4;i++)document.getElementById('divPanel'+i).style.display='none';}\r\n"
				+ "var allClassTree=null;"
				+ "function listAllClasses(){try {System.gc();allClassTree=getTreeNodeByClassHome();allClassTree.build('allClassTreeContainer');allClassTree.expand();}catch(e){alert(e.message||e);}}\r\n"
				+ "function listLibClasses(){var path=document.getElementById('jsarpath').value;if(path==''){alert('Must enter the js archive location.');return;}var lib=jsvm.tools.JSArchivePackager.loadLibInfo(path);var sb=[];for(var clz in lib.entity){if(clz==null||clz=='null'){continue;}var id='libclz_'+clz;sb.push('<input type=checkbox checked name=\\'lib-class\\' id=\\''+id+'\\' value=\\''+clz+'\\'> <label for=\\''+id+'\\'>'+clz+'</label>');};document.getElementById('libClassesContainer').innerHTML=sb.join('<br/>')||'No class found';}\r\n"
				+ "function listLoadedClasses(){try {var classes=opener.jsvm.tools.JSArchivePackager.getLoadedClasses();var sb=[];for(var i=0;i<classes.length;i++){var clz=classes[i],id='loadclz_'+clz;sb.push('<input type=checkbox checked name=\\'loaded-class\\' id=\\''+id+'\\' value=\\''+clz+'\\'> <label for=\\''+id+'\\'>'+clz+'</label>');};document.getElementById('loadedClassesContainer').innerHTML=sb.join('<br/>')||'No class found';}catch(e){alert(e.message||e);}}\r\n"
				+ "function getSelectedAllClasses(){if(allClassTree==null)return[];var classes=[];var nodes=allClassTree.getCheckedChildNodes();for(var i=0;i<nodes.length;i++){var className=nodes[i].getAttribute('className');if(className!=null){classes.push(className);}}return classes;}\r\n"
				+ "function getSelectedLibClasses(){var els=document.getElementsByName('lib-class');var clzes=[];for(var i=0;i<els.length;i++){if(els[i].checked){clzes.push(els[i].value);}}return clzes;}\r\n"
				+ "function getSelectedLoadedClasses(){var els=document.getElementsByName('loaded-class');var clzes=[];for(var i=0;i<els.length;i++){if(els[i].checked){clzes.push(els[i].value);}}return clzes;}\r\n"
				+ "function getJSARClasses(){if(currIndex==0){return getSelectedAllClasses();}else if(currIndex==1){return getSelectedLibClasses();}else if(currIndex==2){return getSelectedLoadedClasses();}else{alert('err currIndex');}}\r\n"
				+ "function buildJSAR(){"
				+ "try{var path = document.getElementById('ja_path').value;"
				+ "if(path==''){alert('Must enter the path of export!');return;}\r\n"
				+ "if(getFileSystemObject().fileExists(path)&&!confirm('File: \\''+path+'\\' already exists, overwrite it?')){return;};"
				+ "var config={path: path,name: document.getElementById('ja_name').value,version: document.getElementById('ja_version').value,author: document.getElementById('ja_author').value,classes:getJSARClasses(),isOverwrite:true,ignoreError:document.getElementById('js_ignore').checked};"
				//+ "document.getElementById('panel3').click();
				+ "setTimeout(function(){jsvm.tools.JSArchivePackager.exportJSArchive(config, out);});"
				+ "}catch(ex){alert(ex);}}\r\n"
				+ "</script></head><body scroll=\"auto\" onload=\"showPanel(0)\">"
				+ "<div style='margin-bottom:5px'>"
				+ "<input type=radio name='panelSwith' id='panel0' onclick='showPanel(0);' checked><label for='panel0'>All Class</label>&nbsp;&nbsp;"
				+ "<input type=radio id='panel1' name='panelSwith' onclick='showPanel(1);'><label for='panel1'>File Class</label>&nbsp;&nbsp;"
				+ "<input type=radio id='panel2' name='panelSwith' onclick='showPanel(2);'><label for='panel2'>Loaded Class</label>&nbsp;&nbsp;"
				+ "<input type=radio id='panel3' name='panelSwith' onclick='showPanel(3);'><label for='panel3'>Execute Logs</label>"
				+ "</div>"
				+ "<div id='divPanel0' class='panel' style='display:none;'><div><strong>jsvm2/jsre.js location:</strong>&nbsp;<input type=file id='jsrepath' style='height:22px'><input type=button style='height:22px' value=' list ' onclick='listAllClasses();'></div><div id='allClassTreeContainer'>no data</div></div>"
				+ "<div id='divPanel1' class='panel' style='display:none;'><div><strong>js archive location:</strong>&nbsp;<input id='jsarpath' type=file style='height:22px'><input type=button style='height:22px' value=' list ' onclick='listLibClasses();'></div><div id='libClassesContainer'>no data</div></div>"
				+ "<div id='divPanel2' class='panel' style='display:none;'><div><strong>all loaded classes in memory.</strong>&nbsp;&nbsp;<a href='#' onclick='listLoadedClasses();return false;'>list & refresh</a></div><div id='loadedClassesContainer'>no data</div></div>"
				+ "<div id='divPanel3' class='panel' style='display:none;' contentEditable=true>JavaScript Archive Packager :\r\n</div>"
				+ "<fieldset style='margin-top:5px;margin-bottom:5px;padding:5px;width:440px;'><legend style='padding:2px'>JS Archive Information</legend>"
				+ "Name: <input type='text' style='width:120px' id='ja_name' />&nbsp;"
				+ "Author: <input type='text' style='width:120px' id='ja_author' />&nbsp;Version:<input type='text' style='width:60px' value='1.0' id='ja_version' />"
				+ "<br/>Path:<input type='file' style='width:300px;margin-left:9px' id='ja_path' />&nbsp;<input type='checkbox' id='js_ignore' checked /> <label for='js_ignore'>ignore error</label><br/>"
				+ "</fieldset>"
				+ "<input type='button' class='button' value='export' onclick='buildJSAR();' />&nbsp;&nbsp;"
				+ "<input type='button' class='button' value='close' onclick='window.close();' />"
				+ "</body></html>");
			selectorHDL.width = "480px";
			selectorHDL.height = "500px";
			selectorHDL.resizable = 0;
			selectorHDL.scrollbars = "no";
			selectorHDL.status = 0;
			return selectorHDL;

	}

	/**
	 * Packs a JSArchive
	 */
	jsvm.tools.JSArchivePackager.packJSArchive = function () {
		getSelectorWindow().show();
	}

	jsvm.tools.JSArchivePackager.getLoadedClasses = function () {
		var clzes = [];
		var classes = js.lang.System.VM.getContainer().getClasses();
		for (var c in classes) {
			if (js.lang.System.VM.getClassloader().findClass(c) != null) {
				clzes.push(c);
			}
		}
		return clzes;
	}



	/**
	 * check security
	 */
	var createFileSystemObject = function () {
		if (!js.lang.System.isIeBrowser()) {
			throw "Only support IE!";
		}
		try {
			return new ActiveXObject("Scripting.FileSystemObject");
		} catch (ex) {
			throw "Can not create fileSystemObject.";
		}
	}

	/**
	 * Saves to file.
	 */
	var saveToFile = function (path, content) {
		try {
			var f = createFileSystemObject().createTextFile(path);
			f.writeLine(content);
		} catch (ex) {
			throw Class.forName("js.lang.Exception").newInstance('save failed.', ex);
		} finally {
			if (f != null) {
				f.close();
				f = null;
			}
		}
	}
	
	jsvm.tools.JSArchivePackager.loadLibInfo = function (path) {
			var info;
			var _JSVM_Namespace = {
				"runtimeEnvironment": {
					"JSVM": {
						"getClassloader": function () {
							return {
								"loadLib" : function (lib) {
									info = lib;
								}
							}
						}
					}
				}
			};
			try {
				var xhrt = js.lang.System.RE.getXMLHttpRequest();
				xhrt.open("GET", path, false);
				xhrt.send(null);
				eval(xhrt.responseText);
				return info;
			} catch (ex) {
				throw ex;
			} finally {
				xhrt = null;
			}
		}

	/**
	 * export js archive file
	 */
	jsvm.tools.JSArchivePackager.exportJSArchive = function (config, out) {

		try {

			if (out == null) {
					out = js.lang.System.out;
				}

			var fso = createFileSystemObject();
			var sPath = config.path;
			var sName = config.name;
			var sVer = config.version;
			var sAuthor = config.author;
			var classes = (config.classes || []).sort();
			var isOverwrite = config.isOverwrite;
			var ignoreError = config.ignoreError;
			if (fso.fileExists(sPath) && !isOverwrite) {
				if (!confirm("The target file exist. overwrite it?")) {
					return 0;
				}
			}
			var sNowTime = new Date().toGMTString();
			out.println("Export: JSVM2 Library on " + sNowTime);
			out.println("Copyright (c) 2004, 2006, Homolo Information Technology Co., Ltd. All rights reserved.");
			var sb = Class.forName("js.lang.StringBuffer").newInstance();
			sb.append("/**\r\n* Created in ").append(sNowTime).append("\r\n*/\r\n");
			sb.append("_JSVM_Namespace.runtimeEnvironment\r\n");
			sb.append("	.JSVM.getClassloader().loadLib(\r\n");
			sb.append("{\r\n").append("manifest :\r\n");
			sb.append("{\r\n");
			sb.append("'name' : '").append(convertToStringPart(sName))
				.append("',\r\n");
			sb.append("'uri' : '").append(convertToStringPart(sPath.replace(/.*\\/, "")))
				.append("',\r\n");
			sb.append("'version' : '").append(convertToStringPart(sVer))
				.append("',\r\n");
			sb.append("'lastModified' : '").append(sNowTime).append("',\r\n");
			sb.append("'author' : '").append(convertToStringPart(sAuthor))
				.append("',\r\n");
			sb.append("'remark' : ''\r\n},\r\n");
			sb.append("entity :\r\n").append("{\r\n");
			var sc = 0, fc = 0;
			for (var i = 0, l = classes.length; i < l; i++) {
				var className = classes[i];
				out.print("Compress class: " + className + "\t");
				try {
					// load the specifed class
					Class.forName(className);
					var code = js.lang.System.VM.getContainer().getClassCode(className);
					if (code == null) {
						code = js.lang.System.VM.getCompiler().compile(
							js.lang.System.VM.getClassloader().loadClass(className));
					}
					code = compress(code);
				} catch (ex) {
					if (ignoreError == true) {
						ex.printStackTrace();
						out.println("\t...\tfailed.");
						fc++;
						continue;
					} else {
						throw ex;
					}
				}
				sb.append("'").append(className).append("' : ");
				sb.append(convertToStringExpression(code, "'"));
				sb.append(" ,\r\n");
				out.println("\t...\tsuccessful.");
				sc++;
			}
			sb.append("'null':null\r\n}});");
			out.println("js archive file content is ready. total = " + (sc + fc) 
				+ " , success = " + sc + ", failure = " + fc + " .");
			saveToFile(sPath, sb.toString());
			out.println("exported to: '" + sPath + "'.");
			out.println("");
			return 1;
		} catch (ex) {
			ex.printStackTrace();
			out.println("export failed.");
			return 2;
		}
	}

});